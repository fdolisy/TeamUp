// routes/api/users.js
// Defines API endpoints for creating, updating, and deleting users from the database

const express = require('express');
var app = express();
app.use(express.json());
const auth = require("./middleware/auth")
const User = require('../../models/User');

// @route GET api/users/:id
// @description Get single user's information by id
// @access Private
app.get('/:id', auth, (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ nouserfound: err }));
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