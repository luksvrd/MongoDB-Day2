import express from "express";
import studentRoutes from "./student/routes.js";

const PORT = 3000;

const app = express();

// app.use(express.json());
app.use("/api/students", studentRoutes);

export default () => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};
