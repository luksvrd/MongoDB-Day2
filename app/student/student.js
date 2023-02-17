import { Schema, model } from "mongoose";
import gradeSchema from "./grade-schema.js";

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required"],
      minLength: [3, "Student name must be at least 3 characters"],
      trim: true,
      // TODO: Add a custom validator to insure only letters and one space in between words
    },

    // This is an array of subdocuments
    grades: [gradeSchema],
    // TODO: Add a virtual property to calc the average of the students grade
  },
  {
    strict: "throw",
    versionKey: false,
  }
);

// TODO: Prevent duplicate grade names (custom Hooks)

export default model("Student", studentSchema);
