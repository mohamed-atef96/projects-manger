const express = require("express");
const router = express.Router();
const Project = require("../models/projects.model");

//get all projects
router.get("/getAll", async (req, res) => {
  const projects = await Project.find().populate({path:"tasks"});
  if (!projects)
    return res
      .status(500)
      .json({ msg: "error cannot retrieve  Projects right now" });
  return res.status(200).send(projects);
});

//get project by Id
router.get("/get/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id).populate({path:"tasks"});
    if (!project)
      return res.status(400).json({ msg: "cannot find project with this id" });
    return res.status(200).send(project);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: err.message });
  }
});

//create new project
router.post("/create", async (req, res) => {
  const { name } = req.body;
  const projectExist = await Project.findOne({ name });
  if (projectExist)
    return res
      .status(400)
      .json({ msg: "There is a project with that name choose another name" });

  let project = await new Project({ name });
  project = await project.save();
  if (!project)
    return res.status(500).json({ msg: "error cannot create Project" });
  return res.status(200).send(project);
});

module.exports = router;
