// app.js

require('dotenv').config({ path: './config.env' });
const express = require('express');
const connectDB = require('./config/db');

const app = express();
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

const team_routes = require('./routes/api/teams');
const project_routes = require('./routes/api/projects');
const login_route = require('./routes/api/login');
const registration_route = require('./routes/api/registration');
const user_routes = require('./routes/api/users');
const team_submit_routes = require('./routes/api/teams');
const submit_all_routes = require('./routes/api/teams');
app.use('/api/teams', team_routes);
app.use('/api/projects', project_routes);
app.use('/api/register', registration_route);
app.use('/api/login', login_route);
app.use('/api/users', user_routes);
app.use('api/team_submit', team_submit_routes);
app.use('/api/submit_all', submit_all_routes);

// Connect Database
connectDB();
const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));