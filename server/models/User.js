// models/User.js

const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator")

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "first name is required"]
  },
  last_name: {
    type: String,
    required: [true, "last name is required"]
  },
  password: {
    type: String,
    required: [true, "a password is required"]
  },
  email: {
    type: String,
    required: [true, "UTD email is required"],
    unique: true,
    validate: {
      validator: function (email) {
        return /([a-z]{3}\d{6}@utdallas.edu|[a-zA-Z]*\.[a-zA-Z]*@UTDallas.edu)/.test(email);
      },
      message: "Not a valid UTD email",
    },
  },
  address: {
    type: String,
    required: [true, "Address is required"]
  },
  project_preferences: {
    type: [String],
    required: [true, "Project preferences are required"]
  },
  skills: {
    type: [String],
    required: false
  },
  extra_information: {
    type: String,
    required: false
  },
  token: {
    type: String
  },
});
UserSchema.plugin(uniqueValidator, { message: "Email Already Exists." });
module.exports = User = mongoose.model('User', UserSchema);