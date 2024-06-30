const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const { validationResult, body } = require("express-validator");
const User = require("../models/User");
const Projects = require("../models/Projects");

// add project with admin authentication
router.post(
  "/addProject",
  fetchUser,
  [
    body("title", "project name"),
    body("description", "project description"),
    body("githubLink", "project github link"),
    body("deployedLink", "project deployed link"),
    body("tags", "tags related to project"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, githubLink, deployedLink, tags } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json("User not found");
    }
    const newProject = new Projects({
      title: title,
      description: description,
      githubLink: githubLink,
      deployedLink: deployedLink || "",
      tags: tags || [""],
    });
    await newProject.save();
    res.status(200).json({ newProject });
    console.log(newProject);
  }
);

// Fetch all projects
router.get("/fetchAllProjects", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const allProjects = await Projects.find();

    res.json({ allProjects });
    // console.log(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Route for deleting a saved project
router.delete("/remove/:projectId", fetchUser, async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const userId = req.user.id;

    // Find the saved project by projectId and author
    const savedProject = await SavedProject.findOneAndDelete({
      projectId: projectId,
      user: userId,
      // projectSave: false
    });

    if (!savedProject) {
      // Return a 404 error if the saved project is not found
      return res.status(404).json({ error: "Saved project not found" });
    }

    res.json({ message: `Project no.${projectId} is successfully removed` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error " });
  }
});

module.exports = router;
