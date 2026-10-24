const { Schema, model } = require("mongoose");
const { PROGRAMS } = require("./Cohort.model");

const LANGUAGES = ["English", "Spanish", "French", "German", "Portuguese", "Dutch", "Other"];

const studentSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    linkedinUrl: { type: String, default: "" },
    languages: [{ type: String, enum: LANGUAGES }],
    program: { type: String, enum: PROGRAMS },
    background: { type: String, default: "" },
    image: { type: String, default: "https://i.imgur.com/r8bo8u7.png" },
    cohort: { type: Schema.Types.ObjectId, ref: "Cohort" },
    projects: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = model("Student", studentSchema);
