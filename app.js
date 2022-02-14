const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const connectDb = require("./config/db.config");
const projectRoute = require("./routes/project.routes");
const taskRoute = require("./routes/task.routes");
const cors = require("cors");

//our server
const app = express();
//enable cors
app.use(cors());
//DB connection
connectDb();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

//routes
app.use("/project", projectRoute);
app.use("/task", taskRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
