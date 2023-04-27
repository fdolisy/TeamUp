// routes/api/users.js
// Defines API endpoints for creating, updating, and deleting users from the database

const express = require('express');
var app = express();
app.use(express.json());
const auth = require("./middleware/auth")
const User = require('../../models/User');
const Project = require('../../models/Project');

// @route GET api/users/:id
// @description Get single user's information by id
// @access Private
app.get('/:id', auth, async (req, res) => {

  try {
    var user = await User.findById(req.params.id)
  } catch (error) {
    res.status(404).json({ nouserfound: error })
    return
  }

  if (!user) {
    res.status(404).json({ nouserfound: "Please input a valid user ID" })
    return
  }

  project_ids = user.project_preferences;

  // include the project details in the response
  var project_details = await Promise.all(project_ids.map(async (id) => {
    var project = await Project.findById(id);
    return project;
  }))
  user = user.toJSON()
  user.project_details = project_details
  res.json(user)
});

// @route PUT api/users/:id
// @description Update user
// @access Private
app.put('/:id', auth, (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => res.json({ msg: 'Updated user ' + user.id + ' successfully' }))
    .catch(err =>
      res.status(400).json({ error: err })
    );
});

module.exports = app;