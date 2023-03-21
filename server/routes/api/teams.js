// routes/api/teams.js
// Defines API endpoints for creating, updating, and deleting teams from the database

const { Email } = require('@mui/icons-material');
const express = require('express');
var app = express();
app.use(express.json());

const Team = require('../../models/Team');
const User = require('../../models/User');

const auth = require("./middleware/auth")

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
    res.send("Congratulations! You submitted your team!");
  }
  catch {
    res.status(404)
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


// @route PUT api/teams/join/:id
// @description Allows an authenticated user to join a public/private team
// @access Private
// @param ObjectId user_id
app.put('/join/:id', auth, (req, res) => {
  Team.findById(req.params.id)
    .then(team => {

      // do not allow anyone to join a finalized team
      if (team.is_finalized) {
        res.status(400).json({ error: 'Team ' + team.id + ' is already finalized and cannot be modified' })
      } else {

        if (team.is_public) {

          // prevent duplicates of the same user in a team
          if (!team.members.includes(req.body.user_id)) {
            team.members.push(req.body.user_id)
          }

          team.save()
            .then(team => console.log('User ' + req.body.user_id + ' successfully joined team ' + team.id));

        } else {
          console.log("TODO: implement logic for private teams - see issue #17 in GitHub")
        }

        // now, update the user to contain the team ID they are a part of
        User.findById(req.body.user_id)
          .then(user => {

            // if the user is already on a team, remove them from that team
            if (user.team && user.team != team.id) {
              Team.findById(user.team)
                .then(old_team => {

                  // remove user from their old team
                  team_without_user = []
                  for (let i = 0; i < old_team.members.length; i++) {
                    if (old_team.members[i] != req.body.user_id) {
                      team_without_user.push(old_team.members[i])
                    }
                  }

                  old_team.members = team_without_user

                  // if this user was the only member on that team, delete the old team completely
                  if (team_without_user.length == 0) {
                    old_team.delete()
                      .then(old_team => console.log("Deleted team " + old_team.id))
                  } else {
                    old_team.save()
                      .then(old_team => console.log("Removed user " + req.body.user_id + " from team " + old_team.id))
                  }
                })
            }

            // add user to their new team
            user.team = team.id
            user.save()
              .then(user => console.log("Updated user " + user.id + " to store team ID " + team.id))
          })

        res.json({ mgs: 'User ' + req.body.user_id + ' successfully joined team ' + team.id })
      }
    })
    .catch(err => res.status(404).json({ noteamfound: err }));
});

module.exports = app;