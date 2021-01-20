var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
var User = require('../models/User');
var Team = require('../models/Team');

router.get('/', ensureAuthenticated,(req, res, next) => {
    if(req.user.role == 'user'){
        Team.find({username: req.user.username}, (err, teams) => {
            if(err) console.log(err);
            res.render('./dashboard/user-dashboard',{
                user: req.user,
                teams: teams
            });
        });
    }
    else if(req.user.role == 'admin'){
        User.find({}, (err, users) => {
            res.render('./dashboard/admin-dashboard',{
                user: req.user,
                users
            });
        });
    }
});

router.post('/register-team', ensureAuthenticated,(req, res, next) => {
    // I'm writing this part of code. but the only thing that 
    // I can think is that she left me and its all because of me. I loved her and I still do :(
    var {teamName, mentor, email, phone, affiliation, league} = req.body;
    const newTeam = new Team({username: req.user.username, teamName, mentor, email, phone, affiliation, league});
    newTeam.save().then(doc => {
        res.redirect('/dashboard');
    }).catch(err => {
        if(err) console.log(err);
    });
});

router.post('/add-member', ensureAuthenticated, (req, res, next) => {
    const {teamName, member} = req.body;
    User.findOne({username: member}, (err, user)=>{
        if(err) console.log(err);
        if(user){
            Team.findOne({teamName: teamName}, (err, team)=>{
                var flag = true;
                for(var i=0; i<team.members.length; i++){
                    if(team.members[i].username == member) flag = false;
                }
                if(flag){
                    var membersList = team.members;
                    var price = team.price;
                    price += 300000;
                    membersList.push(user);
                    Team.updateMany({teamName: teamName}, {$set: {members: membersList, price}}, (err, doc)=>{
                        res.redirect('/dashboard');
                    });
                }
                else res.send('member was added befor');
            });
        }
        else res.send('user not found');
    });
});

module.exports = router;