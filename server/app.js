require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./db");
const { notFoundHandler, errorHandler } = require("./error-handling");

const PORT = process.env.PORT || 5005;
const ORIGIN = process.env.ORIGIN || "http://localhost:5173";

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
app.use(cors({ origin: [ORIGIN] }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.use("/auth", require("./routes/auth.routes"));
app.use("/api/cohorts", require("./routes/cohort.routes"));
app.use("/api/students", require("./routes/student.routes"));
app.use("/api/users", require("./routes/user.routes"));

// ERROR HANDLING
app.use(notFoundHandler);
app.use(errorHandler);

// START SERVER
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
