import express from "express";
import Project from "../Models/Project.js";

const router = express.Router();
// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    if (!projects || projects.length === 0) {
        return res.status(404).json({ message: "No projects found" });
    }
    res.status(200).json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching projects", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json(project);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching project", error: error.message });
    }
});
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Project name is required" });
    }
    const newProject = new Project({
      name,
    });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating project", error: error.message });
  }
});

export default router;