// models/Team.js

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const TeamSchema = new mongoose.Schema({

  // Team number refers to the integer ID used by UTD professors
  // This is separate from the Mongoose ObjectID used by the API endpoint
  team_number: {
    type: Number,
    required: true
  },
  members: {
    type: [ObjectId],
    required: true
  },
  is_public: {
    type: Boolean,
    required: true
  },
  is_finalized: {
    type: Boolean,
    required: true
  },
  team_project_preferences: {
    type: [String],
    required: true
  }
});

module.exports = Team = mongoose.model('team', TeamSchema);