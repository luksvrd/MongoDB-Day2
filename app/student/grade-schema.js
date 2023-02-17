import { Schema } from "mongoose";

const gradeSchema = new Schema({
  grade: {
    type: String,
    enum: ["exam", "quiz", "homework", "project"],
    default: "exam",
  },
  name: {
    type: String,
    // error message if name is not provided
    required: [true, "Grade name is required"],
    minLength: [3, "Grade name must be at least 3 characters"],
    trim: true,
  },
  earned: {
    type: Number,
    // Restrict number to be between 0 and 100
    min: [0, "Earned points must be greater than 0"],
    max: [100, "Earned points must be less than 100"],
  },
  possible: {
    type: Number,
    // Restrict number to be between 0 and 100
    min: [0, "Possible points must be greater than 0"],
    max: [100, "Possible points must be less than 100"],
    required: [true, "Possible points are required"],
  },
});

export default gradeSchema;
