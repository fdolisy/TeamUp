// routes/api/users.js
// Defines API endpoints for creating, updating, and deleting users from the database

const express = require('express');
var app = express();
app.use(express.json());

const User = require('../../models/User');

// @route GET api/users
// @description Get all users
// @access Public
app.get('/', (_, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ nousersfound: err }));
});

// @route GET api/users/:id
// @description Get single user by id
// @access Public
app.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ nouserfound: err }));
});

// @route POST api/users
// @description Create a new user
// @access Public
app.post('/', (req, res) => {
  User.create(req.body)
    .then(user => res.json({ msg: 'User ' + user.id + ' added successfully' }))
    .catch(err => res.status(400).json({ error: err }));
});

// @route PUT api/users/:id
// @description Update user
// @access Public
app.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => res.json({ msg: 'Updated user ' + user.id + ' successfully' }))
    .catch(err =>
      res.status(400).json({ error: err })
    );
});

// @route DELETE api/users/:id
// @description Delete user by id
// @access Public
app.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, req.body)
    .then(user => res.json({ mgs: 'User ' + user.id + ' deleted successfully' }))
    .catch(err => res.status(404).json({ error: err }));
});

module.exports = app;