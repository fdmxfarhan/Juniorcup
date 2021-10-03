var mongoose = require('mongoose');

var ClassSchema = new mongoose.Schema({
    name: String,
    title: String,
    students: {
        type: [Object],
        default: [],
    },
});

var Class = mongoose.model('Class', ClassSchema);

module.exports = Class;
