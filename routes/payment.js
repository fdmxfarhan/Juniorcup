var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var request = require('request');
const { ensureAuthenticated } = require('../config/auth');
const User = require('../models/User');
const Team = require('../models/Team');



router.post('/pay-team', function(req,res, next){
  Team.findOne({_id: req.body.order_id}, (err, team)=>{
    if(team){
      var options2 = {
        method: 'POST',
        url: 'https://api.idpay.ir/v1.1/payment/verify',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': 'f069e17a-41ba-4af4-99c1-2c137dda9cdd',
          'X-SANDBOX': 1,
        },
        body: {
          'id': req.body.id,
          'order_id': req.body.order_id,
        },
        json: true,
      };
      request(options2, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body.status);
        if(body.status == 100){
          Team.updateMany({_id: team._id}, { $set: { payed: true } }, function(err){
            if(err) console.log(err);
            res.redirect(`/dashboard/team?id=${team._id}`);
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
    var options = {
      method: 'POST',
      url: 'https://api.idpay.ir/v1.1/payment',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': 'f069e17a-41ba-4af4-99c1-2c137dda9cdd',
        'X-SANDBOX': 1,
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
    console.log(options);
    request(options, function (error, response, body) {
      if (error) console.log(error);
      console.log(body.link);
      res.redirect(body.link);
    });  
  });
});

module.exports = router;