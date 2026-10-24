const mongoose = require("mongoose");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/cohort-tools-api";

function connectDB() {
  return mongoose
    .connect(MONGODB_URI)
    .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
    .catch((err) => {
      console.error("Error connecting to MongoDB", err);
      process.exit(1);
    });
}

module.exports = connectDB;
