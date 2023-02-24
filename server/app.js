// app.js

const express = require('express');
const connectDB = require('./config/db');

const app = express();

const team_routes = require('./routes/api/teams');
const login_route = require('./routes/api/login');
const registration_route = require('./routes/api/registration');
//const submit_team_route = require('./routes/api/teams/:id/submit');
app.use('/api/teams', team_routes);
app.use('/api/register', registration_route)
app.use('/api/login', login_route)
//app.use('/api/teams/:id/submit', submit_team_route)

// Connect Database
connectDB();

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));