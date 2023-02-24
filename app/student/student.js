import mongoose, { Schema, model } from "mongoose";
import gradeSchema from "./grade-schema.js";

const studentSchema = new Schema(
  {
    first: {
      type: String,
      required: [true, "First name is required"],
      maxLength: [39, "First name must be less than 40 characters long"],
    },
    last: {
      type: String,
      required: [true, "Last name is required"],
      maxLength: [39, "Last name must be less than 40 characters long"],
    },
    github: {
      type: String,
      required: [true, "GitHub username is required"],
      maxLength: [39, "GitHub username must be less than 40 characters long"],
      // This is a custom validator. It is a function that returns true or false. It is called when you call the save method on a document & when you call the create method on a model. Ensures that the GitHub username is unique, no duplicates.
      validate: {
        async validator(github) {
          const duplicate = await mongoose.models.Student.findOne({ github });

          // Inverse the boolean value of duplicate. If duplicate is true, then return false. If duplicate is false, then return true.
          return !duplicate;
        },
        message: "Duplicate GitHub username",
      },
    },

    // This is an array of subdocuments
    grades: [gradeSchema],
    // fullName: {
    //   type: String,
    //   // This is a computed 💻 property that is not stored in the database.
    //   // It is a virtual property that is derived from other properties.
    //   // Called a getter because it gets the value of the fullName property.
    //   get() {
    //     return `${this.first} ${this.last}`;
    //   },
    //   // Called a setter because it sets the value of the fullName property.
    //   // This is called when you set the value of the fullName property.
    //   // this is also a computed 💻 property that is not stored in the database. And it is a virtual property that is derived from other properties.
    //   set(fullName) {
    //     const [first, last] = fullName.split(" ");

    //     this.first = first;
    //     this.last = last;
    //   },
    //   validate: {
    //     async validator(fullName) {
    //       const duplicate = await mongoose.models.Student.findOne({
    //         fullName,
    //       });

    //       // Inverse the boolean value of duplicate
    //       return !duplicate;
    //     },
    //     message: "Duplicate full name",
    //   },
    // },
  },
  {
    strict: "throw",
    // this toJSON method is called when you call JSON.stringify on a document. it is called when you call res.json on a document. helps with security and privacy. Send the virtual properties to the client.
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    // use versionKey to prevent the version key from being added to the document. never want the version key to be added to the document.
    versionKey: false,
  }
);
// MongoDB does not support virtual properties. So we need to create a virtual property that is not stored in the database.
// It's a computed 💻 property that is not stored in the database. A computed property for the average grade of all the grades in the grades array or a single student.
// Getting data on an on-demand basis.
studentSchema.virtual("averageGrade").get(function () {
  // acc (general name) in this case is the accumulator. It is the total of all the grades that have been added together so far.
  // Reduce takes an array of numbers and reduces it to a single number.
  const totalEarned = this.grades.reduce((acc, grade) => {
    return acc + grade.earned;
    // acc starts at 0
  }, 0);
  // reduce is the most powerful array method. It is used to reduce an array to a single value. It takes a callback function and an initial value. The initial value is the starting point of the accumulator. In this case, the initial value is 0.
  const totalPossible = this.grades.reduce((acc, grade) => {
    return acc + grade.possible;
  }, 0);
  // this says if the total possible is 0, then return 0. If the total possible is not 0, then return the total earned divided by the total possible times 100.
  if (!totalPossible) return 0;
  // .toFixed(1) rounds the number to 1 decimal place.
  return ((totalEarned / totalPossible) * 100).toFixed(1);
});
// If had an aarry of grades, you can create a tally of the number of grades that are A's, B's, C's, D's, and F's.

studentSchema
  .virtual("fullName")
  .get(function () {
    // this. is a reference to the document that is being created (ie the student document in this case)
    // If confused, console.log(this) to see what is being returned
    return `${this.first} ${this.last}`;
  })
  // If i give you a full name, I want you to split it up into first and last name and set the first and last name properties on the student document.
  .set(function (fullName) {
    const [first, last] = fullName.split(" ");

    this.first = first;
    this.last = last;
  });

// For dealing with an array of embedded documents.
// Saying look at all the grades of a student in the grades array and make sure that there are no duplicate grade names. (ie test 1 and test 1)
studentSchema.path("grades").validate(function (grades) {
  // Use OPTIONAL CHAINING to prevent an error if grade.name is undefined
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
  const lowerCasedGradeNames = grades.map((grade) => grade.name?.toLowerCase());

  // If the number of unique grade names is less than the number of grades, then there are duplicates
  return new Set(lowerCasedGradeNames).size === lowerCasedGradeNames.length;
}, "Duplicate grade name");

export default model("Student", studentSchema);
