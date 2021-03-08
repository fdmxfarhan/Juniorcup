var mongoose = require('mongoose');

var SettingSchema = new mongoose.Schema({
  register: 
  {
    type: Boolean,
    default: true
  },
  editTeam: 
  {
    type: Boolean,
    default: true
  },
  

});

var Setting = mongoose.model('Setting', SettingSchema);
module.exports = Setting;
