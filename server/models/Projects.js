const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  githubLink: {
    type: String,
    required: true,
  },
  deployedLink: {
    type: String,
    required: false,
  },
  tags: {
    type: [String],
    required: false, // If you want tags to be a required field
    default: [], // If you want to initialize tags as an empty array
  },
  // Additional fields as needed
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Projects = mongoose.model("Project", ProjectSchema);

module.exports = Projects;
