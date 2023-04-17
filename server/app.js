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
app.use('/api/teams', team_routes);
app.use('/api/projects', project_routes)
app.use('/api/register', registration_route)
app.use('/api/login', login_route)
app.use('/api/users', user_routes);
app.use('api/teams/team_submit', team_submit_routes);

// SAML configuration
const passport = require("passport");
const saml = require("passport-saml");
const fs = require('fs');

const samlStrategy = new saml.Strategy(
    {
        callbackUrl: "/login-idp/callback",
        entryPoint: "https://idptest.utdallas.edu/idp/shibboleth",
        issuer: "http://csa-4485-02.utdallas.edu/",

        decryptionPvk: fs.readFileSync("./saml_config/sp-cert.pem", "utf8"),
        privateCert: fs.readFileSync("./saml_config/sp-cert.pem", "utf8"),
        cert: fs.readFileSync("./saml_config/idp_key.pem", "utf8"),
    },
    function (profile, done) {
        return done(null, profile);
    }
);

passport.use("samlStrategy", samlStrategy);

app.route("/metadata").get(function (req, res) {
    res.type("application/xml");
    res.status(200);
    res.send(
        samlStrategy.generateServiceProviderMetadata(
            fs.readFileSync("./saml_config/sp-cert.pem", "utf8"),
            fs.readFileSync("./saml_config/sp-cert.pem", "utf8")
        )
    );
});

// Connect Database
connectDB();
const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));