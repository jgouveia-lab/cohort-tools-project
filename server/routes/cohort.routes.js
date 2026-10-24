const router = require("express").Router();
const Cohort = require("../models/Cohort.model");
const buildCohortFilter = require("../utils/cohort-filter");

// GET /api/cohorts?campus=Paris&program=Web%20Dev
router.get("/", async (req, res, next) => {
  try {
    const cohorts = await Cohort.find(buildCohortFilter(req.query)).sort({ startDate: -1 });
    res.json(cohorts);
  } catch (error) {
    next(error);
  }
});

router.get("/:cohortId", async (req, res, next) => {
  try {
    const cohort = await Cohort.findById(req.params.cohortId);
    if (!cohort) return res.status(404).json({ message: "Cohort not found" });
    res.json(cohort);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const cohort = await Cohort.create(req.body);
    res.status(201).json(cohort);
  } catch (error) {
    next(error);
  }
});

router.put("/:cohortId", async (req, res, next) => {
  try {
    const cohort = await Cohort.findByIdAndUpdate(req.params.cohortId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!cohort) return res.status(404).json({ message: "Cohort not found" });
    res.json(cohort);
  } catch (error) {
    next(error);
  }
});

router.delete("/:cohortId", async (req, res, next) => {
  try {
    const cohort = await Cohort.findByIdAndDelete(req.params.cohortId);
    if (!cohort) return res.status(404).json({ message: "Cohort not found" });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
