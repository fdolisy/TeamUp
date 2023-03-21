// routes/api/teams.js
// Defines API endpoints for creating, updating, and deleting teams from the database

const sendEmail = require('../../config/email');
const express = require('express');
var app = express();
app.use(express.json());

const Team = require('../../models/Team');
const User = require('../../models/User');

// @route GET api/teams
// @description Get all teams
// @access Public
app.get('/', (req, res) => {

  // If the request includes ?is_public=false, do not include public teams
  if (req.query.is_public === 'false') {
    Team.find({ 'is_public': false })
      .then(teams => res.json(teams))
      .catch(err => res.status(404).json({ noteamsfound: err }));
  }

  // If the request includes ?is_public=true, do not include private teams
  else if (req.query.is_public === 'true') {
    Team.find({ 'is_public': true })
      .then(teams => res.json(teams))
      .catch(err => res.status(404).json({ noteamsfound: err }));
  }

  // Otherwise, return all teams
  else {
    Team.find()
      .then(teams => res.json(teams))
      .catch(err => res.status(404).json({ noteamsfound: err }));
  }
});

// @route GET api/teams/:id
// @description Get single team by id
// @access Public
app.get('/:id', (req, res) => {
  Team.findById(req.params.id)
    .then(team => res.json(team))
    .catch(err => res.status(404).json({ noteamfound: err }));
});

// @route POST api/teams
// @description Create a new team
// @access Public
// @param {[mongoose.Schema.Types.ObjectId]} members
// @param {Boolean} is_public
// @param {[ObjectID]} team_project_preferences
app.post('/', async (req, res) => {
  var team = req.body

  // Assign the team number sequentially based on how many teams have already been created
  team.team_number = await Team.countDocuments({}).exec() + 1;

  // When a new team is created, it has not yet been finalized
  team.is_finalized = false

  Team.create(team)
    .then(team => res.json({ msg: 'Team ' + team.id + ' added successfully' }))
    .catch(err => res.status(400).json({ error: err }));
});

// @route POST api/teams/team_submit
// @description Team submission 
// @access Public
// @param [String] timings
// @param {Boolean} is_finalized
app.put('/team_submit/:id', async (req, res) => {

  try {
    const updatedTeam = await Team.findByIdAndUpdate(req.params.id, {
      $set: {
        timings: req.body.timings,
        is_finalized: 'true'
      }
    }, { new: true });

    // send email confirmation for all members on the team
    for (let i = 0; i < updatedTeam.members.length; i++) {
      const member = await User.findById(updatedTeam.members[i]);
      try {
        await sendEmail(member.email, "this is a test from capstone - this will be a doc");
      } catch (error) {
        console.error(`Error sending email to ${member.email}: ${error}`);
        res.status(404).json(`Error sending email to ${member.email}: ${error}`);
        return;
      }
    }
    res.send("Congratulations, you submitted your team! All members should have received an email confirming the project preferences");
  } catch (error) {
    res.status(404).json(error)
  }
});

// @route PUT api/teams/:id
// @description Update team
// @access Public
app.put('/:id', (req, res) => {
  Team.findByIdAndUpdate(req.params.id, req.body)
    .then(team => res.json({ msg: 'Updated team ' + team.id + ' successfully' }))
    .catch(err => res.status(400).json({ error: err }));
});



// @route DELETE api/teams/:id
// @description Delete team by id
// @access Public
app.delete('/:id', (req, res) => {
  Team.findByIdAndRemove(req.params.id, req.body)
    .then(team => res.json({ mgs: 'Team ' + team.id + ' deleted successfully' }))
    .catch(err => res.status(404).json({ error: err }));
});

module.exports = app;