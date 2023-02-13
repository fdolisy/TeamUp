// models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  project_preferences: {
    type: [String],
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  extra_information: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model('user', UserSchema);