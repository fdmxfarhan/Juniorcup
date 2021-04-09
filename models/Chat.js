var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
  field: String,
  messages: [Object]
});

var Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
