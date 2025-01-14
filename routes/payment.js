var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var request = require('request');
const { ensureAuthenticated } = require('../config/auth');
const User = require('../models/User');
const Team = require('../models/Team');


// router.get('/', (req, res, next) => {
//   res.render(`success-pay`);
// })
router.post('/pay-team', function(req,res, next){
  console.log(req.body);
  Team.findOne({_id: req.body.order_id}, (err, team)=>{
    if(team){
      var options2 = {
        method: 'POST',
        url: 'https://api.idpay.ir/v1.1/payment/verify',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': 'f069e17a-41ba-4af4-99c1-2c137dda9cdd',
          // 'X-API-KEY': 'fe6a4553-cd95-4dff-af2e-80594c1c18c5',
          // 'X-SANDBOX': 1,
        },
        body: {
          'id': req.body.id,
          'order_id': req.body.order_id,
        },
        json: true,
      };
      request(options2, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        if(body.status == 100){
          Team.updateMany({_id: team._id}, { $set: { payed: true , track_id: body.payment.track_id} }, (err, doc) => {
            if(err) console.log(err);
            Team.findById(team._id, (err, team) => {
              res.render(`success-pay`, {
                team
              });
            });
          });
        }
        else{
          res.send('Error!!!!!!!!!!!');
        }
      });
    }
    else res.send('Error!!!!!!!!!!!');
  });
});

router.get('/pay-team', function(req, res, next){
  Team.findOne({_id: req.query.id}, function(err, team){
    if(team.price == 0 || !team) 
    {
      res.send('error');
      return;
    }
    var options = {
      method: 'POST',
      url: 'https://api.idpay.ir/v1.1/payment',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': 'f069e17a-41ba-4af4-99c1-2c137dda9cdd',
        // 'X-API-KEY': 'fe6a4553-cd95-4dff-af2e-80594c1c18c5',
          // 'X-SANDBOX': 1,
      },
      body: {
        'order_id': team._id,
        'amount': team.price,
        'name': team.mentor,
        'uname': team.username,
        'phone': '09336448037',
        'mail': team.email,
        'desc': team.teamName,
        'callback': 'https://juniorcup.ir/payment/pay-team',
        'reseller': null,
      },
      json: true,
    };
    request(options, function (error, response, body) {
      if (error) console.log(error);
      res.redirect(body.link);
    });  
  });
});

module.exports = router;