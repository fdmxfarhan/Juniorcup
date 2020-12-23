var mongoose = require('mongoose');

var TeamSchema = new mongoose.Schema({
    username: String,
    leader: Object,
    members: [Object],
    qualified: Boolean,
    dateOfRegister: Date,
    league: String
  });

var Team = mongoose.model('Team', TeamSchema);

module.exports = Team;
