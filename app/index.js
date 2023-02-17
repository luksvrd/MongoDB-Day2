import fs from "fs/promises";

initClient();

const data = [
  {
    name: "John Doe",
    grades: [
      {
        gradeType: "exam",
        name: "Exam 1",
        earned: 85,
        possible: 100,
      },
      {
        gradeType: "homework",
        name: "Assignment 1",
        earned: 95,
        possible: 100,
      },
      {
        gradeType: "quiz",
        name: "Quiz 1",
        earned: 18,
        possible: 20,
      },
    ],
  },
  {
    name: "Jane Smith",
    grades: [
      {
        gradeType: "exam",
        name: "Exam 1",
        earned: 92,
        possible: 100,
      },
      {
        gradeType: "homework",
        name: "Assignment 1",
        earned: 88,
        possible: 100,
      },
      {
        gradeType: "quiz",
        name: "Quiz 1",
        earned: 16,
        possible: 20,
      },
    ],
  },
  {
    name: "Bob Johnson",
    grades: [
      {
        gradeType: "exam",
        name: "Exam 1",
        earned: 75,
        possible: 100,
      },
      {
        gradeType: "homework",
        name: "Assignment 1",
        earned: 80,
        possible: 100,
      },
      {
        gradeType: "quiz",
        name: "Quiz 1",
        earned: 18,
        possible: 20,
      },
    ],
  },
];

// TODO: 'JSON-ify the data array and write it to a file called "data.json"'
fs.writeFile("data.json", JSON.stringify(data));
