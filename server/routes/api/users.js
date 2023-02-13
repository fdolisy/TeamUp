// routes/api/users.js

const express = require('express');
//const router = express.Router();
var app = express();
app.use(express.json());

// Load User model
const User = require('../../models/User');

// @route GET api/users
// @description Get all users
// @access Public
app.get('/', (req, res) => {
  console.log(req.body)
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ nousersfound: 'No Users found' }));
});

// @route GET api/users/:email
// @description Get single user by email
// @access Public
app.get('/:email', (req, res) => {
  User.findById(req.params.email)
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ nouserfound: 'No User found' }));
});

// @route POST api/users
// @description add/save user
// @access Public
app.post('/', (req, res) => {
  console.log(req.body)
  User.create(req.body)
    .then(user => res.json({ msg: 'User added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this user' }));
});

module.exports = app;