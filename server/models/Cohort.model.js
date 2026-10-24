const { Schema, model } = require("mongoose");

const PROGRAMS = ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"];
const CAMPUSES = ["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "Lisbon", "Remote"];

const cohortSchema = new Schema(
  {
    cohortSlug: { type: String, required: true, unique: true },
    cohortName: { type: String, required: true },
    program: { type: String, enum: PROGRAMS },
    format: { type: String, enum: ["Full Time", "Part Time"] },
    campus: { type: String, enum: CAMPUSES },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    inProgress: { type: Boolean, default: false },
    programManager: { type: String, required: true },
    leadTeacher: { type: String, required: true },
    totalHours: { type: Number, default: 360 },
  },
  { timestamps: true }
);

module.exports = model("Cohort", cohortSchema);
module.exports.PROGRAMS = PROGRAMS;
module.exports.CAMPUSES = CAMPUSES;
