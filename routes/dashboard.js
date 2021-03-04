var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const bcrypt = require('bcryptjs');
var User = require('../models/User');
var Team = require('../models/Team');
var Game = require('../models/Game');
var shamsi = require('../config/shamsi');

const memberPrice = 750000;
const cupPrice = 750000;

// Team.deleteMany({}, (err) => console.log(err));
// Game.deleteMany({}, (err) => console.log(err));

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
    else if(req.user.role == 'refree'){
        Team.find({}, (err, teams) => {
            Game.find({}, (err, games) => {
                res.render('./dashboard/refree-dashboard',{
                    user: req.user,
                    teams,
                    games
                });
            });
        });
    }
    else if(req.user.role == 'student'){
        Team.find({_id: req.user.teamID}, (err, team) =>{
            res.render('./dashboard/student-dashboard', {
                user: req.user,
                team,
                shamsi
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

router.get('/upgrade-user', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin')
    {
        User.findById(req.query.id, (err, _user) => {
            Team.find({}, (err, teams) => {
                Team.findOne({_id: _user.teamID}, (err, currentTeam) => {
                    console.log(currentTeam);
                    res.render('./dashboard/admin-upgrade-user', {
                        id: _user._id, 
                        user: req.user,
                        teams,
                        currentTeam
                    });
                });
            });
        });
    }
    else res.send('He He...!!\nFek kardi kheyli zerangi bache?!\n:)');
});

router.get('/upgrade-to-user', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin')
    {
        User.updateMany({_id: req.query.id}, {$set: {role: 'user'}}, (err, doc) => {
            res.redirect('/dashboard/users-list');
        });
    }
    else res.send('He He...!!\nFek kardi kheyli zerangi bache?!\n:)');
});

router.get('/upgrade-to-admin', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin')
    {
        User.updateMany({_id: req.query.id}, {$set: {role: 'admin'}}, (err, doc) => {
            res.redirect('/dashboard/users-list');
        });
    }
    else res.send('He He...!!\nFek kardi kheyli zerangi bache?!\n:)');
});

router.get('/upgrade-to-refree', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin')
    {
        User.updateMany({_id: req.query.id}, {$set: {role: 'refree'}}, (err, doc) => {
            res.redirect('/dashboard/users-list');
        });
    }
    else res.send('He He...!!\nFek kardi kheyli zerangi bache?!\n:)');
});

router.get('/upgrade-to-student', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin')
    {
        User.updateMany({_id: req.query.id}, {$set: {role: 'student'}}, (err, doc) => {
            res.redirect('/dashboard/users-list');
        });
    }
    else res.send('He He...!!\nFek kardi kheyli zerangi bache?!\n:)');
});

router.post('/add-game-light', ensureAuthenticated, (req, res, next) => {
    var {idA, idB, field, round, time} = req.body;
    Team.findById(idA, (err, teamA) => {
        Team.findById(idB, (err, teamB) => {
            var newGame = new Game({teamA, teamB, field, league: teamA.league, round, time});
            newGame.save().then(doc => {
                res.redirect(`/dashboard/soccer-light?round=${round}`);
            }).catch(err => console.log(err));
        });
    });
});

router.post('/add-game-open', ensureAuthenticated, (req, res, next) => {
    var {idA, idB, field, round, time} = req.body;
    Team.findById(idA, (err, teamA) => {
        Team.findById(idB, (err, teamB) => {
            var newGame = new Game({teamA, teamB, field, league: teamA.league, round, time});
            newGame.save().then(doc => {
                res.redirect(`/dashboard/soccer-open?round=${round}`);
            }).catch(err => console.log(err));
        });
    });
});

router.post('/add-game-soccer2d', ensureAuthenticated, (req, res, next) => {
    var {idA, idB, field} = req.body;
    Team.findById(idA, (err, teamA) => {
        Team.findById(idB, (err, teamB) => {
            var newGame = new Game({teamA, teamB, field, league: teamA.league});
            newGame.save().then(doc => {
                res.redirect('/dashboard/soccer2d');
            }).catch(err => console.log(err));
        });
    });
});

router.get('/game', ensureAuthenticated, (req, res, next) => {
    if(req.user.role != 'user'){
        Game.findById(req.query.id, (err, game) => {
            User.find({teamID: game.teamA._id}, (err, teamAusers) => {
                User.find({teamID: game.teamB._id}, (err, teamBusers) => {
                    // console.log(teamAusers);
                    res.render('./dashboard/refree-game', {
                        user: req.user,
                        game,
                        teamAusers,
                        teamBusers
                    });
                });
            });
        });
    }
    else res.send('Error!!');
});

router.get('/start-game', ensureAuthenticated, (req, res, next) => {
    if(req.user.role != 'user'){
        Game.updateMany({_id: req.query.id}, {$set: {started: true}}, (err, doc) => {
            res.redirect(`/dashboard/game?id=${req.query.id}`);
        });
    }
});
router.get('/end-game-nosave', ensureAuthenticated, (req, res, next) => {
    if(req.user.role != 'user'){
        Game.updateMany({_id: req.query.id}, {$set: {started: false}}, (err, doc) => {
            res.redirect(`/dashboard/game?id=${req.query.id}`);
        });
    }
});
router.get('/end-game', ensureAuthenticated, (req, res, next) => {
    if(req.user.role != 'user'){
        Game.updateMany({_id: req.query.id}, {$set: {started: false}}, (err, doc) => {
            res.redirect(`/dashboard/game?id=${req.query.id}`);
        });
        Game.findById(req.query.id, (err, game) =>{
            if(game.goalA > game.goalB){
                Team.findById(game.teamA._id, (err, team) => {
                    Team.updateMany({_id: team._id}, {$set: {
                        goalzade: team.goalzade + game.goalA,
                        goalkhorde: team.goalkhorde + game.goalB,
                        score: team.score + 3,
                        win: team.win + 1
                    }}, (err, doc) => {if(err) console.log(err)});
                });
                Team.findById(game.teamB._id, (err, team) => {
                    Team.updateMany({_id: team._id}, {$set: {
                        goalzade: team.goalzade + game.goalB,
                        goalkhorde: team.goalkhorde + game.goalA,
                        lose: team.lose + 1
                    }}, (err, doc) => {if(err) console.log(err)});
                });
            }
            else if(game.goalA < game.goalB){
                Team.findById(game.teamA._id, (err, team) => {
                    Team.updateMany({_id: team._id}, {$set: {
                        goalzade: team.goalzade + game.goalA,
                        goalkhorde: team.goalkhorde + game.goalB,
                        lose: team.lose + 1
                    }}, (err, doc) => {if(err) console.log(err)});
                });
                Team.findById(game.teamB._id, (err, team) => {
                    Team.updateMany({_id: team._id}, {$set: {
                        goalzade: team.goalzade + game.goalB,
                        goalkhorde: team.goalkhorde + game.goalA,
                        score: team.score + 3,
                        win: team.win + 1
                    }}, (err, doc) => {if(err) console.log(err)});
                });
            }
            else{
                Team.findById(game.teamA._id, (err, team) => {
                    Team.updateMany({_id: team._id}, {$set: {
                        goalzade: team.goalzade + game.goalA,
                        goalkhorde: team.goalkhorde + game.goalB,
                        score: team.score + 1,
                        equals: team.equals + 1
                    }}, (err, doc) => {if(err) console.log(err)});
                });
                Team.findById(game.teamB._id, (err, team) => {
                    Team.updateMany({_id: team._id}, {$set: {
                        goalzade: team.goalzade + game.goalB,
                        goalkhorde: team.goalkhorde + game.goalA,
                        score: team.score + 1,
                        equals: team.equals + 1
                    }}, (err, doc) => {if(err) console.log(err)});
                });
            }
        });
    }
});

router.get('/add-goalA', ensureAuthenticated, (req, res, next) => {
    if(req.user.role != 'user'){
        Game.findById(req.query.id, (err, game) => {
            Game.updateMany({_id: req.query.id}, {$set: {goalA: game.goalA+1}}, (err, doc) => {
                res.redirect(`/dashboard/game?id=${req.query.id}`);
            });
        })
    }
});

router.get('/add-goalB', ensureAuthenticated, (req, res, next) => {
    if(req.user.role != 'user'){
        Game.findById(req.query.id, (err, game) => {
            Game.updateMany({_id: req.query.id}, {$set: {goalB: game.goalB+1}}, (err, doc) => {
                res.redirect(`/dashboard/game?id=${req.query.id}`);
            });
        })
    }
});

router.get('/decrease-goalA', ensureAuthenticated, (req, res, next) => {
    if(req.user.role != 'user'){
        Game.findById(req.query.id, (err, game) => {
            Game.updateMany({_id: req.query.id}, {$set: {goalA: game.goalA-1}}, (err, doc) => {
                res.redirect(`/dashboard/game?id=${req.query.id}`);
            });
        })
    }
});

router.get('/decrease-goalB', ensureAuthenticated, (req, res, next) => {
    if(req.user.role != 'user'){
        Game.findById(req.query.id, (err, game) => {
            Game.updateMany({_id: req.query.id}, {$set: {goalB: game.goalB-1}}, (err, doc) => {
                res.redirect(`/dashboard/game?id=${req.query.id}`);
            });
        })
    }
});

router.get('/soccer-light', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'refree'){
        Team.find({league: 'فوتبالیست سبک وزن'}, (err, teams) => {
            Game.find({league: 'فوتبالیست سبک وزن', round: req.query.round}, (err, games) => {
                res.render('./dashboard/refree-soccer-light',{
                    user: req.user,
                    teams,
                    games,
                    round: req.query.round
                });
            });
        });
    }
});

router.get('/soccer-light-score', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'refree'){
        Team.find({league: 'فوتبالیست سبک وزن'}, (err, teams) => {
            res.render('./dashboard/refree-soccer-light-score',{
                user: req.user,
                teams
            });
        });
    }
});

router.get('/soccer-open', ensureAuthenticated, (req, res, next) => {
    var round = req.query.round;
    if(!round) round = 1;
    if(req.user.role == 'refree'){
        Team.find({league: 'فوتبالیست وزن آزاد'}, (err, teams) => {
            Game.find({league: 'فوتبالیست وزن آزاد', round: round}, (err, games) => {
                res.render('./dashboard/refree-soccer-open',{
                    user: req.user,
                    teams,
                    games,
                    round
                });
            });
        });
    }
});

router.get('/soccer-open-score', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'refree'){
        Team.find({league: 'فوتبالیست وزن آزاد'}, (err, teams) => {
            res.render('./dashboard/refree-soccer-open-score',{
                user: req.user,
                teams
            });
        });
    }
});

router.get('/soccer2d-score', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'refree'){
        Team.find({league: 'فوتبال ۲ بعدی'}, (err, teams) => {
            res.render('./dashboard/refree-soccer2d-score',{
                user: req.user,
                teams
            });
        });
    }
});

router.get('/smartcar', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'refree'){
        Team.find({league: 'خودروهای هوشمند'}, (err, teams) => {
            res.render('./dashboard/refree-smartcar',{
                user: req.user,
                teams,
            });
        });
    }
});

router.get('/soccer2d', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'refree'){
        Team.find({league: 'فوتبال ۲ بعدی'}, (err, teams) => {
            Game.find({league: 'فوتبال ۲ بعدی'}, (err, games) => {
                res.render('./dashboard/refree-soccer2d',{
                    user: req.user,
                    teams,
                    games
                });
            });
        });
    }
});

router.post('/refree-soccer-light-score', ensureAuthenticated, (req, res, next) => {
    var {teamName, id, win, lose, equals, goalzade, goalkhorde, technical, score} = req.body;
    if(req.user.role == 'refree'){
        Team.updateMany({_id: id}, {$set: {win, lose, equals, goalzade, goalkhorde, technical, score}}, (err, teams) => {
            res.redirect('/dashboard/soccer-light-score');
        });
    }
});

router.post('/refree-soccer-light-edit', ensureAuthenticated, (req, res, next) => {
    var {id, goalA, goalB, field, time, round} = req.body;
    if(req.user.role == 'refree'){
        Game.updateMany({_id: id}, {$set: {goalA, goalB, field, time}}, (err, games) => {
            res.redirect(`/dashboard/soccer-light?round=${round}`);
        });
    }
});

router.post('/refree-soccer-open-edit', ensureAuthenticated, (req, res, next) => {
    var {id, goalA, goalB, field, time} = req.body;
    if(req.user.role == 'refree'){
        Game.updateMany({_id: id}, {$set: {goalA, goalB, field, time}}, (err, games) => {
            res.redirect(`/dashboard/soccer-open?round=${round}`);
        });
    }
});

router.post('/refree-soccer-open-score', ensureAuthenticated, (req, res, next) => {
    var {teamName, id, win, lose, equals, goalzade, goalkhorde, technical, score} = req.body;
    if(req.user.role == 'refree'){
        Team.updateMany({_id: id}, {$set: {win, lose, equals, goalzade, goalkhorde, technical, score}}, (err, teams) => {
            res.redirect('/dashboard/soccer-open-score');
        });
    }
});

router.post('/refree-soccer2d-score', ensureAuthenticated, (req, res, next) => {
    var {teamName, id, win, lose, equals, goalzade, goalkhorde, technical, score} = req.body;
    if(req.user.role == 'refree'){
        Team.updateMany({_id: id}, {$set: {win, lose, equals, goalzade, goalkhorde, technical, score}}, (err, teams) => {
            res.redirect('/dashboard/soccer2d-score');
        });
    }
});

router.get('/make-member-account', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin'){
        Team.find({}, (err, teams) => {
            res.redirect('/dashboard');
            teams.forEach(team => {
                team.members.forEach(member => {
                    var newUser = new User({
                        username: member.idNumber,
                        email: 'test@gmail.com',
                        phone: member.phone,
                        fullname: member.fullName,
                        role: 'student',
                        teamName: team.teamName,
                        teamID: team._id,
                        password: member.idNumber
                    });
                    User.find({username: newUser.username}, (err, user) => {
                        if(user.length == 0){
                            bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if(err) throw err;
                                newUser.password = hash;
                                newUser.save()
                                    .then(user => console.log(newUser))
                                    .catch(err => console.log(err));
                                console.log(newUser);
                            }));
                        }
                    })
                });
            });
        });
    }
});

router.get('/delete-member-account', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin'){
        Team.find({}, (err, teams) => {
            teams.forEach(team => {
                team.members.forEach(member => {
                    User.deleteMany({username: member.idNumber}, (err, doc) => console.log('removed!'));
                });
            });
            res.redirect('/dashboard');
        });
    }
});

router.get('/remove-user', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin'){
        User.deleteOne({_id: req.query.id}, (err, doc) => res.redirect('/dashboard/users-list'));
    }
});

router.get('/remove-upload', ensureAuthenticated, (req, res, next) => {
    var path = req.query.path;
    var newFile = [];
    req.user.file.forEach(file => {
        if(file.path != path) newFile.push(file);
    });
    User.updateMany({_id: req.user._id}, {$set: {file: newFile}}, (err, doc) => {
        res.redirect('/dashboard');
    });
});

router.get('/light-delete-game', ensureAuthenticated, (req, res, next) => {
    if(req.user.role != 'user'){
        Game.deleteOne({_id: req.query.id}, (err, doc) => res.redirect('/dashboard/soccer-light?round=1'));
    }
});

router.get('/open-delete-game', ensureAuthenticated, (req, res, next) => {
    if(req.user.role != 'user'){
        Game.deleteOne({_id: req.query.id}, (err, doc) => res.redirect('/dashboard/soccer-open'));
    }
});

router.get('/soccer2d-delete-game', ensureAuthenticated, (req, res, next) => {
    if(req.user.role != 'user'){
        Game.deleteOne({_id: req.query.id}, (err, doc) => res.redirect('/dashboard/soccer2d'));
    }
});

router.get('/admin-accept-team', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin'){
        Team.updateMany({_id: req.query.id}, {$set: {qualified: true}},(err, doc) => res.redirect('/dashboard/teams-list'));
    }
});

router.post('/set-user-team', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin'){
        User.updateMany({_id: req.body.id}, {$set: {teamID: req.body.team}}, (err, doc) => {
            console.log(req.user.team);
            res.redirect('/dashboard/users-list');
        });
    }
});

module.exports = router;