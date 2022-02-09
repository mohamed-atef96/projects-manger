const express = require("express");
const router = express.Router();
const Task = require("../models/tasks.model");
const Project = require("../models/projects.model");


  
  //get task by Id
  router.get("/get/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const task = await Task.findById(id);
      if (!task)
        return res.status(400).json({ msg: "cannot find task with this id" });
      return res.status(200).send(task);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ msg: err.message });
    }
  });


//create new project
router.post("/create", async (req, res) => {
  const { name, projectId } = req.body;
  try {
    // validate if there is a task with the same name
    const taskExist = await Task.findOne({ name });
    if (taskExist)
      return res
        .status(400)
        .json({ msg: "There is a task with that name choose another name" });

    let task = await new Task({ name });
    task = await task.save();
    if (!task) return res.status(500).json({ msg: "error cannot create task" });

    //insert task id into it's project
    const project = await Project.findByIdAndUpdate(projectId, {
      $push: { tasks: task._id },
    });
    if (!project)
      return res.status(400).json({ msg: "cannot find project with this id" });
    return res.status(200).send(task);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: err.message });
  }
});

//complete task
router.post("/progress/:id", async (req, res) => {
  const { id } = req.params;
  const { progress } = req.body;
  const done = progress == 100 ? true : false;
  try {
    const task = await Task.findByIdAndUpdate(id, { progress, done },{new:true});
    if (!task)
      return res.status(400).json({ msg: "cannot find task with this id" });

     return res.status(200) .send(task);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: err.message });
  }
});

module.exports = router;
