var mongoose = require('mongoose');

var TeamSchema = new mongoose.Schema({
  teamName: String,
  username: String,
  mentor: Object,
  email: String,
  phone: String,
  affiliation: String,
  members: [Object],
  qualified: Boolean,
  dateOfRegister: Date,
  league: String
});

var Team = mongoose.model('Team', TeamSchema);
module.exports = Team;
