import express from "express";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Task from "./Routes/Task.js"
import cors from "cors";
const app= express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 8080;
connectDB();
app.use("/api/tasks", Task);

app.get("/", (req, res) => {
  res.send("Welcome to the Kanban Board API");
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


