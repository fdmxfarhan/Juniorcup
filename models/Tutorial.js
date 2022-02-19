var mongoose = require('mongoose');

var TutorialSchema = new mongoose.Schema({
    name: String,
    likes: [Number],
    Comment: [[Object]],
    seen: [Number],
});

var Tutorial = mongoose.model('Tutorial', TutorialSchema);
module.exports = Tutorial;
