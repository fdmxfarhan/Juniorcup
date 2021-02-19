var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
var User = require('../models/User');
var Team = require('../models/Team');

const memberPrice = 750000;
const cupPrice = 750000;

// Team.deleteMany({}, (err) => console.log(err));

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
    var price = 750000;
    Team.findOne({teamName: teamName}, (err, foundTeam) => {
        if(!foundTeam)
        {
            Team.findOne({username: req.user.username}, (err, foundTeam) => {
                if(foundTeam) price = 0;
                const newTeam = new Team({username: req.user.username, teamName, mentor, email, phone, affiliation, league, price});
                newTeam.save().then(doc => {
                    res.redirect('/dashboard');
                }).catch(err => {
                    if(err) console.log(err);
                });
            });
        }
        else res.send('نام تیم قبلا ثبت شده');
    });
});

router.post('/add-member', ensureAuthenticated, (req, res, next) => {
    var {teamName, fullName, idNumber, birth, phone, address, cup} = req.body;
    if(teamName && fullName && idNumber && birth && phone && address){
        Team.findOne({teamName: teamName}, (err, team)=>{
            var flag = true;
            for(var i=0; i<team.members.length; i++){
                if(team.members[i].username == fullName) flag = false;
            }
            if(flag){
                var membersList = team.members;
                var price = team.price;
                price += memberPrice;
                if(cup == 'on') {price += cupPrice;cup=true;}
                else cup = false;
                membersList.push({fullName, idNumber, birth, phone, address, cup});
                Team.updateMany({teamName: teamName}, {$set: {members: membersList, price}}, (err, doc)=>{
                    res.redirect(`/dashboard/team?id=${team._id}`);
                });
            }
            else res.send('member was added befor');
        });
    } else res.send('error');
});

router.get('/remove-member', ensureAuthenticated, (req, res, next) => {
    const {idNumber, teamName} = req.query;
    Team.findOne({teamName: teamName}, (err, team)=>{
        if(err) console.log(err);
        var id = team._id;
        var membersList = [];
        var price = team.price;
        price -= memberPrice;
        for(var i=0; i<team.members.length; i++){
            if(team.members[i].idNumber != idNumber){
                membersList.push(team.members[i]);
            }
            else if(team.members[i].cup) price -= cupPrice;
        }
        
        Team.updateMany({teamName: teamName}, {$set: {members: membersList, price}}, (err, doc)=>{
            res.redirect(`/dashboard/team?id=${id}`);
        });
    });
});

router.get('/setting', ensureAuthenticated, (req, res, next) => {
    res.render('./dashboard/user-setting', {
        user: req.user
    });
});

router.get('/team', ensureAuthenticated, (req, res, next) => {
    if(req.query.id){
        Team.findById(req.query.id, (err, team)=> {
            if(err) console.log(err);
            res.render('./dashboard/teamView', {
                user: req.user,
                team
            })
        });
    }
    else res.send('error');
});

router.get('/users-list', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin')
    {
        User.find({}, (err, users) => {
            if(err) console.log(err);
            else{
                res.render('./dashboard/admin-users-list', {
                    user: req.user,
                    users: users
                });
            }
        });
    }
    else res.send('Access Denied!!')
});

router.get('/teams-list', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin')
    {
        Team.find({}, (err, teams) => {
            if(err) console.log(err);
            else{
                res.render('./dashboard/admin-teams-list', {
                    user: req.user,
                    teams: teams
                });
            }
        });
    }
    else res.send('Access Denied!!')
});

router.get('/admin-edit-team', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin')
    {
        Team.findById(req.query.id, (err, team) => {
            res.render('./dashboard/admin-edit-team', {
                user: req.user,
                team: team
            });
        });
    }
});

router.get('/delete-team', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin')
    {
        Team.deleteOne({_id: req.query.id}, (err) => {
            if(err) console.log(err);
            res.redirect(`/dashboard/teams-list`);
        });
    }
});

router.post('/admin-edit-team', ensureAuthenticated, (req, res, next) => {
    var {id, teamName, mentor, affiliation, league, price} = req.body;
    if(req.user.role == 'admin')
    {
        Team.updateMany({_id: id}, {$set: {teamName, mentor, affiliation, league, price}}, (err, raw) => {
            res.redirect(`/dashboard/admin-edit-team?id=${id}`);
        });
    }
});

module.exports = router;