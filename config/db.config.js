const mongoose = require("mongoose");
function connectDb() {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("Database Connection is ready..."))
    .catch((err) => console.log(`Database Connection Error : ${err}`));
}
module.exports = connectDb
