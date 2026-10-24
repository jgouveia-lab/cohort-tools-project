// Imports cohorts.json and students.json into MongoDB.
// The JSON files use numeric ids (1, 2, 3...), so new ObjectIds are created and
// each student's numeric `cohort` is mapped to the matching cohort's ObjectId.
// Run with: npm run seed   (WARNING: it wipes the cohorts and students collections)
require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../db");
const Cohort = require("../models/Cohort.model");
const Student = require("../models/Student.model");
const cohortsData = require("../cohorts.json");
const studentsData = require("../students.json");

// Fixes values like "BERLIN" so they match the schema enum ("Berlin")
function normalizeCampus(campus) {
  return Cohort.CAMPUSES.find((c) => c.toLowerCase() === campus?.toLowerCase()) ?? campus;
}

async function seed() {
  await connectDB();

  await Student.deleteMany({});
  await Cohort.deleteMany({});

  const cohortIdMap = {};
  const cohorts = cohortsData.map(({ _id, ...cohort }) => {
    const newId = new mongoose.Types.ObjectId();
    cohortIdMap[_id] = newId;
    return { ...cohort, _id: newId, campus: normalizeCampus(cohort.campus) };
  });

  const students = studentsData.map(({ _id, cohort, ...student }) => ({
    ...student,
    cohort: cohortIdMap[cohort],
  }));

  const createdCohorts = await Cohort.insertMany(cohorts);
  const createdStudents = await Student.insertMany(students);

  console.log(`Seeded ${createdCohorts.length} cohorts and ${createdStudents.length} students`);
}

seed()
  .catch((error) => {
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
