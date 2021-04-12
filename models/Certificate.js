var mongoose = require('mongoose');

var CertificateSchema = new mongoose.Schema({
  idNumber: String,
  persianName: String,
  persianLeague: String,
  persianAffiliation: String,
  englishFirstName: String,
  englishLastName: String,
  englishLeague: String,
  englishAffiliation: String,
  teamName: String,
  teamID: String,
  phoneNumber: String
});

var Certificate = mongoose.model('Certificate', CertificateSchema);

module.exports = Certificate;
