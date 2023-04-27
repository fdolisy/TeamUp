// app.js

require('dotenv').config({ path: './config.env' });
const express = require('express');

const http = require('http');
const https = require('https');

var path = require('path');
const connectDB = require('./config/db');

const app = express();

// route https to http
/*
app.use((req, res, next) => {
  if (req.secure) {
    return res.redirect('http://' + req.headers.host + req.url);
  }
  next();
});
*/

const cors = require('cors');
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));


/*
app.use((req, res, next) => {
  console.log('cady')
  if (req.secure) {
	  console.log('cady 2')
    return res.redirect('http://localhost:2222' + req.url);
  }
  next();
});
*/


const team_routes = require('./routes/api/teams');
const project_routes = require('./routes/api/projects');
const login_route = require('./routes/api/login');
const sso_route = require('./routes/api/sso');
const registration_route = require('./routes/api/registration');
const user_routes = require('./routes/api/users');
const team_submit_routes = require('./routes/api/teams');
const submit_all_routes = require('./routes/api/teams');

app.use('/api/login', login_route);
app.use('/api/users', user_routes);

app.use('api/team_submit', team_submit_routes);
app.use('/api/submit_all', submit_all_routes);

var SamlStrategy = require('passport-saml').Strategy;
const passport = require("passport");
const saml = require("passport-saml");
const fs = require('fs');

app.use('/api/teams', team_routes);
app.use('/api/projects', project_routes);
app.use('/api/register', registration_route);

passport.use(new SamlStrategy(
    {
        path: '/Shibboleth.sso/SAML2/POST',
        entryPoint: 'https://csa-4485-02.utdallas.edu/Shibboleth.sso/Login',
        issuer: 'csa-4485-02.utdallas.edu',
        decryptionPvk: fs.readFileSync("./saml_config/sp-cert.pem", "utf8"),
        privateCert: fs.readFileSync("./saml_config/sp-cert.pem", "utf8"),
        cert: fs.readFileSync("./saml_config/sp-cert.pem", "utf8"),
    },
    function (profile, done) {
        findByEmail(profile.email, function (err, user) {
            if (err) {
                return done(err);
            }
            return done(null, user);
        });
    })
);

app.use('/api/sso', passport.authenticate('saml', { successRedirect: '/', failureRedirect: '/', failureFlash: true }), sso_route);
app.use('/api/login', login_route);
app.use('/api/users', user_routes);

// Connect Database
connectDB();
const port = process.env.PORT || 1111;
app.listen(port, () => console.log(`Server running on port ${port}`));

/*
var httpServer = http.createServer(app);
httpServer.listen(port, () => console.log(`Server running on port ${port}`));



// Code to handle https calls
var key = fs.readFileSync(__dirname + '/selfsigned.key');
var cert = fs.readFileSync(__dirname + '/selfsigned.crt');
var options = {
  key: key,
  cert: cert
};

var httpsServer = https.createServer(options, app);

httpsServer.listen(1111, () => {
  console.log("server starting on port : " + port)
});
*/
