var mongoose = require('mongoose');

var TeamSchema = new mongoose.Schema({
  teamName: String,
  username: String,
  mentor: String,
  email: String,
  phone: String,
  affiliation: String,
  members: {
    type: [Object],
    default: []
  },
  qualified: {
    type: Boolean,
    default: false
  },
  dateOfRegister: Date,
  league: String,
  payed: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number
  },
  cup: Boolean,
  score: {
    type: Number,
    default: 0
  },
  win: {
    type: Number,
    default: 0
  },
  lose: {
    type: Number,
    default: 0
  },
  equals: {
    type: Number,
    default: 0
  },
  technical: {
    type: Number,
    default: 0
  },
  goalzade: {
    type: Number,
    default: 0
  },
  goalkhorde: {
    type: Number,
    default: 0
  },
  track_id: Number,
  blueFile: Object,
  redFile: Object
  
});

var Team = mongoose.model('Team', TeamSchema);
module.exports = Team;
