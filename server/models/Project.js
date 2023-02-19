// models/Project.js

const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  desired_skills: {
    type: [String],
    required: true
  },
  sponsor: {
    type: String,
    required: true
  }
});

module.exports = Team = mongoose.model('project', ProjectSchema);