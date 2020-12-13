var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    uname: String,
    email: String,
    phone: String,
    education: String,
    fullname: String,
    psw: String,
    role: String,
    card: Number
  });

var User = mongoose.model('User', UserSchema);

module.exports = User;
