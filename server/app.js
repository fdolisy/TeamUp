// app.js

const express = require('express');
const connectDB = require('./config/db');

const app = express();
const user_routes = require('./routes/api/users');
const team_routes = require('./routes/api/teams');
app.use('/api/users', user_routes);
app.use('/api/teams', team_routes);

// Connect Database
connectDB();

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));