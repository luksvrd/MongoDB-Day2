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
      validate: {
        validator(name) {
          return /^[a-zA-Z]+(\s[a-zA-Z]+)?$/.test(name);
        },
        message:
          "Student name must only contain letters and one space in between words.",
      },
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

// It's a computed 💻 property that is not stored in the database.
studentSchema.virtual("averageGrade").get(function () {
  const totalEarned = this.grades.reduce((acc, grade) => {
    return acc + grade.earned;
  }, 0);

  const totalPossible = this.grades.reduce((acc, grade) => {
    return acc + grade.possible;
  }, 0);

  if (!totalPossible) return 0;

  return ((totalEarned / totalPossible) * 100).toFixed(1);
});

studentSchema.path("grades").validate(function (grades) {
  // Use OPTIONAL CHAINING to prevent an error if grade.name is undefined
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
  const lowerCasedGradeNames = grades.map((grade) => grade.name?.toLowerCase());

  // If the number of unique grade names is less than the number of grades, then there are duplicates
  return new Set(lowerCasedGradeNames).size === lowerCasedGradeNames.length;
}, "Duplicate grade name");

// TODO: Prevent duplicate grade names (custom Hooks)

export default model("Student", studentSchema);
