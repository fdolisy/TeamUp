const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
var app = express();
app.use(express.json());

app.get("/", async (req, res) => {
    // TODO: hit login endpoint here
    console.log('SSO Function')
});
module.exports = app;