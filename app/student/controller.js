// client is how the controller accesses the database. It is passed in from the route.
// import initClient from "../client.js";
import Student from "./Student.js";

// Dont need .toArrray() because we are using mongoose. Thats from native mongo
const controller = {
  // TODO: add a method to get all students
  index() {
    return Student.find();
  },
  // TODO: add a method to get a single student by id
  showStudent(studentId) {
    return Student.findById(studentId);
  },
  // TODO: add a method to create a new student
  create(newStudent) {
    return Student.create(newStudent);
  },
  updateGradeName4AllStudents(gradeId, newGradeName) {
    // TODO: Implement this method.
    this.updateGradeName4AllStudents(gradeId, newGradeName);
    return Student.updateMany(
      { "grades._id": gradeId },
      { $set: { "grades.$.name": newGradeName } }
    );
  },
  // TODO: add a method to update a student's name by id
  updateStudentName(studentId, newName4Student) {
    return Student.findByIdAndUpdate(studentId, { name: newName4Student });
  },
  // TODO: add a method to add a new grade to a student by id
  updateStudentWithNewGrade(studentId, newGrade) {
    return Student.findByIdAndUpdate(studentId, {
      $push: { grades: newGrade },
    });
  },
  updateStudentGrade(id, gradeId, newEarnedGrade) {
    // TODO: Implement this method.
    return Student.updateOne(
      // "grades._id": gradeId is the same as "grades": { _id: gradeId } it is pulling the gradeId of each grade in the grades array and comparing it to the gradeId passed in
      // "grades.$.earned": newEarnedGrade is the same as "grades": { earned: newEarnedGrade } it is pulling the earned grade of each grade in the grades array and comparing it to the newEarnedGrade passed in
      { _id: id, "grades._id": gradeId },
      { $set: { "grades.$.earned": newEarnedGrade } }
    );
  },
};

// await initClient();

// controller
//   .show("63eedc717b818831c4177ff6")
//   .then((student) => console.log(student))
//   .catch((err) => console.log(err.message));

export default controller;

// // TODO: add a method to get a student's average grade
// async showStudentAverageGrade(studentId) {
//   const student = await Student.findById(studentId);
//   return student.averageGrade;
// },

// // TODO: add a method to add a new grade to a student by id
// updateStudentWithNewGrade(studentId, newGrade) {
//   return Student.findByIdAndUpdate(studentId, {
//     $push: { grades: newGrade },
//   });
