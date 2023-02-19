const express = require('express');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
require("dotenv").config();
var app = express();
app.use(express.json());

// Load User model
const User = require('../../models/User');

// @route POST api/users/login
// @description user login system
// @access Public
// @param {String} email
// @param {String} password
app.post('/', async (req, res) => {
    try{
        email = req.body.email;
        const user = await User.findOne({email});
        // Check if user exists
        if (!user) {
          return res.status(404).json({ emailnotfound: "Email not found" });
        }
        if (await bcrypt.compare(req.body.password, user.password)) {
          const token = jwt.sign(
            { user_id: user._id, email },
            `${process.env.TOKEN_KEY}`,
            {
              expiresIn: "24h",
            }
          );
          user.token = token;
          res.status(200).json({ validSignIn: "Valid Sign in" });
        } else {
          res.status(400).json({ passwordIncorrect: "Password incorrect" });
        }
        } catch (err) {
        res.status(404).json(err)
        console.log(err)
      }
  });
  module.exports = app;