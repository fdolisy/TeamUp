const express = require('express');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
require("dotenv").config();
var app = express();
app.use(express.json());

// Load User model
const User = require('../../models/User');
// @route POST api/users/register
// @description user login system
// @access Public
// @param {String} first_name
// @param {String} last_name
// @param {String} email
// @param {String} password
// @param {String} address
// @param {String} city
// @param {String} zip
// @param {[String]} skills
// @param {[ObjectID]} project_preferences
// @param {String} [extra_information]
app.post('/', async (req, res) => {
    try {
      email = req.body.email;
      encryptedPassword = await bcrypt.hash(req.body.password, 10).then();
      const newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        city: req.body.address,
        zip: req.body.zip,
        project_preferences: req.body.project_preferences,
        skills: req.body.skills,
        extra_information: req.body.extra_information,
        password: encryptedPassword,
      });
      const token = jwt.sign(
        { user_id: newUser._id, email },
        `${process.env.TOKEN_KEY}`,
        {
          expiresIn: "24h",
        }
      );

    // save user token
    newUser.token = token;
    newUser.save(function(err, user) {
      if (err) return res.status(404).json(err.message);
      res.status(201).json(newUser);

    })
    } catch (err) {
      res.status(404).json(err)
    }
});
module.exports = app;