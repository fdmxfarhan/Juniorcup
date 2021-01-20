var mongoose = require('mongoose');

var TeamSchema = new mongoose.Schema({
  teamName: String,
  username: String,
  mentor: Object,
  email: String,
  phone: String,
  affiliation: String,
  members: [Object],
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
    type: Number,
    default: 500000
  }
});

var Team = mongoose.model('Team', TeamSchema);
module.exports = Team;
