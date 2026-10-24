const router = require("express").Router();
const Student = require("../models/Student.model");

router.get("/", async (req, res, next) => {
  try {
    const students = await Student.find().populate("cohort");
    res.json(students);
  } catch (error) {
    next(error);
  }
});

router.get("/cohort/:cohortId", async (req, res, next) => {
  try {
    const students = await Student.find({ cohort: req.params.cohortId }).populate("cohort");
    res.json(students);
  } catch (error) {
    next(error);
  }
});

router.get("/:studentId", async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.studentId).populate("cohort");
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    next(error);
  }
});

router.put("/:studentId", async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.studentId, req.body, {
      new: true,
      runValidators: true,
    }).populate("cohort");
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    next(error);
  }
});

router.delete("/:studentId", async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
