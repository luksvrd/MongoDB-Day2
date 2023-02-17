// Our DB client
// Where we connect node to mongoDB using mongoose
import mongoose from "mongoose";

export default () => {
  mongoose
    .connect("mongodb://localhost:27017/students")
    .then(() => {
      console.info("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB", err);
    });
};
