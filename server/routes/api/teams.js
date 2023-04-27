// routes/api/teams.js
// Defines API endpoints for creating, updating, and deleting teams from the database

const sendEmail = require('../../config/email');
const express = require('express');
const bcrypt = require("bcryptjs");
const json2csv = require('json2csv').parse;
const fs = require('fs');
const path = require('path');

var app = express();
app.use(express.json());

const Team = require('../../models/Team');
const User = require('../../models/User');
const Project = require('../../models/Project');

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

// @route GET api/submit_all
// @description Compile submitted teams to send to a flat file (Compatible with UTD's current process of data collection)
// @access Public
app.get('/submit_all', async (req, res) => {

  try {
    const teams = await Team.find().lean(); 
    try {
      //Headers of the csv file as well as what information we are looking at in the teams document
      const fields = ['team_number', 'team_project_preferences', 'timings', 'members'];

      //csvData contains all data being sent to the csv file
      const csvData = await Promise.all(teams.map(async team => {
        
        //Use the member IDs from the members field to extract member information
        if (team.team_project_preferences[0] != null) {
          const projectIds = team.team_project_preferences.map(project => project._id);
          var cleanProjectNames = ""; 
          for (let i = 0; i < projectIds.length; i++) {
            var project = await Project.findOne({ _id: projectIds[i] }).exec();
            cleanProjectNames += project.name + " ";
          }
        }

        // Use the member IDs from the members field to extract member information
        const memberIds = team.members.map(member => member._id); 
        var cleanMemberNames = "";
        //Loop through each memberId and retreive each needed data
        for (let i = 0; i < memberIds.length; i++) {
          var member = await User.findOne({ _id: memberIds[i] }).exec();
          console.log("Name " + i + ": " + member.first_name);
          cleanMemberNames += member.first_name + " " + member.last_name + " | "
                            + member.email + " | " + member.address + " " + member.city 
                            + " " + member.zip + ", ";
        }
 
        //Get all timings 
        var cleanTimings = "";
        for (let i = 0; i < team.timings.length; i++) {
          cleanTimings += team.timings[i] + " | ";
        }

        //Return all needed strings to be added into csvData
        return {
          team_number: team.team_number,
          team_project_preferences: cleanProjectNames,
          timings: cleanTimings,
          members: cleanMemberNames
        };
      
      }));
      
      //Create a csv file and input the csvData previousely compiled. 
      //Note: The delimiter ', ' adds the next data to a new column
      const csv = json2csv(csvData, { fields, delimiter: ', ', defaultValue: '  ' });

      //Add filename, and save to TeamUp/server/ file because thats is where you run backend features
      var fileName = 'final_teams_info.csv';
      fs.writeFileSync(fileName, csv, 'utf-8'); 

      //send confirmation message and instructions on how to access the file
      res.send("Successfully created file: '" + fileName + "' inside your 'server' folder! If you need an updated file, please close out the file, and request again.");
    
    } catch (error) {
      console.error('Error writing CSV file:', error);
    }
  } catch {
    res.status(404).json(error).send("Error getting teams.");
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
// @param {String} team_password
app.post('/', async (req, res) => {
  var team = req.body

  if (!team.is_public) {
    // Make sure private teams include a password in the request
    if (!team.team_password || team.team_password === '') {
      res.json({ msg: 'To create a private team, you must include a team password in the request.' }).status(400)
      return
    }

    // Encrypt the team's password before saving it in the database
    encryptedPassword = await bcrypt.hash(team.team_password, 10).then();
    team.team_password = encryptedPassword 
  }

  // Assign the team number sequentially based on how many teams have already been created
  team.team_number = await Team.countDocuments({}).exec() + 1;

  // When a new team is created, it has not yet been finalized
  team.is_finalized = false

  Team.create(team)
    .then(team => res.json({ msg: 'Team ' + team.id + ' added successfully' }))
    .catch(err => res.status(400).json({ error: err }));
});

// @route POST api/team_submit
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

    //insert all needed data (the information we want the team members to see) into 'post'
    const post = await Team.findById(req.params.id, 'team_number timings members team_project_preferences')
      .lean()
      .exec();

    var displayPost = await displayTeamData(post);

    // send email confirmation for all members on the team
    for (let i = 0; i < updatedTeam.members.length; i++) {
      const member = await User.findById(updatedTeam.members[i]);
      try {
        await sendEmail(member.email, displayPost);
      } catch (error) {
        console.error(`Error sending email to ${member.email}: ${error}`);
        res.status(404).json(`Error sending email to ${member.email}: ${error}`);
        return;
      }
    }
    res.send("Congratulations, you submitted your team! All members should have received an email confirming the project preferences.");
  } catch (error) {
    res.status(404).json(error)
  }
});

//funcation to use in the submit_team request in order to display team data to each member's email
async function displayTeamData(post) {
  var display = "Congrats! You submitted your team to Capstone! ";
  //display team number
  display += "Your team number is: " + post.team_number + ". Remember that for future presentations.\n"
    + "This is the information we have from your submission: \n";
  display += "\n";
  //display project preferences
  for (let i = 0; i < 1; i++) {
    var projectID = post.team_project_preferences[i].toString();
    var project = await Project.findOne({ _id: projectID }).exec();
    display += "Project preference " + (1 + i) + ": " + project.name + "\n";
  }
  display += "\n";
  //display timings
  for (let i = 0; i < post.timings.length; i++) {
    var timing = post.timings[i].toString();
    display += "Preferred timing " + (1 + i) + ": " + timing + "\n";
  }
  display += "\n";
  //display each member's info
  for (let i = 0; i < post.members.length; i++) {
    var memberID = post.members[i].toString();
    var member = await User.findOne({ _id: memberID }).exec();
    display += "Member " + (i + 1) + ": "
      + member.first_name + " " + member.last_name
      + " | email: " + member.email
      + " | address: " + member.address + ", " + member.city + ", " + member.zip
      + "\n";
  }
  display += "\nPlease keep in mind this is a NO REPLY email, and it has an unmonitored inbox."
    + "\n\nBest of luck, \nTeamUp";
  return display;
}

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
// @param String password
app.put('/join/:id', auth, async (req, res) => {

  var team = await Team.findById(req.params.id)

  // do not allow anyone to join a finalized team
  if (team.is_finalized) {
    res.status(400).json({ error: 'Team ' + team.id + ' is already finalized and cannot be modified' })
    return
  }

  // make sure the password is correct for joining a private team
  if (!team.is_public) {
    req_password = req.body.team_password

    if (!req_password) {
      res.status(400).json({ error: 'Team ' + team.id + ' is private. Please include a team_password in your request' })
      return
    }

    bcrypt_result = await bcrypt.compare(req_password, team.team_password)
    if (!bcrypt_result) {
      res.status(400).json({ error: 'You have entered an incorrect team password.' })
      return
    }
  }

  // now, update the user to contain the team ID they are a part of
  var user = await User.findById(req.body.user_id)
  if (!user) {
    res.status(400).json({ error: 'Invalid user ID' })
    return
  }

  // if the user is already on a team, remove them from that team
  if (user.team && user.team != team.id) {
    var old_team = await Team.findById(user.team)

    // if the user is on a finalized team already, do not allow them to join a new team
    if (old_team.is_finalized) {
      res.status(400).json({ mgs: 'User ' + user.id + ' is already on a finalized team and cannot join a new one' })
      return
    }

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

  }

  user.team = team.id
  user.save()
    .then(user => console.log("Updated user " + user.id + " to store team ID " + team.id))

  // prevent duplicates of the same user in a team
  if (!team.members.includes(req.body.user_id)) {
    team.members.push(req.body.user_id)
  }

  team.save();
  res.json({ mgs: 'User ' + req.body.user_id + ' successfully joined team ' + team.id })
});


module.exports = app;