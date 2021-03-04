var mongoose = require('mongoose');

var GameSchema = new mongoose.Schema({
  teamA: Object,
  teamB: Object,
  goalA: {
    type: Number,
    default: 0
  },
  goalB: {
    type: Number,
    default: 0
  },
  league: String,
  field: String,
  fileA: String,
  fileB: String,
  time: String,
  woneTeam: Object,
  started: {
    type: Boolean,
    default: false
  },
  round: {
    type: Number,
    default: 1
  }
});

var Game = mongoose.model('Game', GameSchema);
module.exports = Game;
