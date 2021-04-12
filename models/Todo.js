var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  date: Date,
  time: String,
  title: String,
  content: String,
  visible: {
    type: Boolean,
    default: true
  },
  done: {
    type: Boolean,
    default: false
  },

});

var Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
