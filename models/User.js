var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    phone: String,
    education: String,
    fullname: String,
    password: String,
    role: String,
    card: Number
  });

var User = mongoose.model('User', UserSchema);

module.exports = User;
