// client is how the controller accesses the database. It is passed in from the route.
// import initClient from "../client.js";
import Student from "./Student.js";

const controller = {
  // TODO: add a method to get all students
  index() {
    return Student.find({});
  },
  // TODO: add a method to get a single student by id
  // Dont need .toArrray() because we are using mongoose. Thats from native mongo
  show(id) {
    return Student.findById(id);
  },
  // TODO: add a method to create a new student
  create(newStudent) {
    return Student.create(newStudent);
  },
  // TODO: add a method to get a student's average grade
  async showStudentAverageGrade(id) {
    const student = await Student.findById(id);
    return student.averageGrade;
  },
  // TODO: add a method to update a student's name by id
  updateName(id, newName) {
    return Student.findByIdAndUpdate(id, { name: newName });
  },
  // TODO: add a method to add a new grade to a student by id
  updateStudentWithNewGrade(id, newGrade) {
    return Student.findByIdAndUpdate(id, { $push: { grades: newGrade } });
  },
  // TODO: add a method to delete a student by id
  dropStudent(id) {
    return Student.findByIdAndDelete(id);
  },
};

// await initClient();

// controller
//   .show("63eedc717b818831c4177ff6")
//   .then((student) => console.log(student))
//   .catch((err) => console.log(err.message));

export default controller;
