var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const bcrypt = require('bcryptjs');
var User = require('../models/User');
var Team = require('../models/Team');
var Game = require('../models/Game');
var Setting = require('../models/Setting');
var Todo = require('../models/Todo');
var shamsi = require('../config/shamsi');
var excel = require('excel4node');

const memberPrice = 750000 * 2;
const mentorPrice = 750000 * 2;
const cupPrice = 750000 * 2;


// Team.deleteMany({}, (err) => console.log(err));
// Game.deleteMany({}, (err) => console.log(err));

router.get('/', ensureAuthenticated,(req, res, next) => {
    if(req.user.role == 'user'){
        Team.find({username: req.user.username}, (err, teams) => {
            Setting.findOne({}, (err, setting) => {
                if(!setting)
                {
                    var newSetting = new Setting();
                    newSetting.save().then(doc => {res.redirect('/dashboard');}).catch(err => {console.log(err);});
                }
                if(err) console.log(err);
                res.render('./dashboard/user-dashboard',{
                    user: req.user,
                    teams: teams,
                    setting
                });
            });
        });
    }
    else if(req.user.role == 'admin'){
        User.find({}, (err, users) => {
            Team.find({}, (err, teams) => {
                Setting.findOne({}, (err, setting) => {
                    if(!setting)
                    {
                        var newSetting = new Setting();
                        newSetting.save().then(doc => {res.redirect('/dashboard');}).catch(err => {console.log(err);});
                    }
                    var payedAmount = 0;
                    var notPayedAmount = 0;
                    var qualifiedTeams = 0;
                    var disQualifiedTeams = 0;
                    var students = 0;
                    var cupRequest = 0;
                    for(var i=0; i<teams.length; i++)
                    {
                        if(teams[i].payed) payedAmount += teams[i].price;
                        else notPayedAmount += teams[i].price;
                        if(teams[i].qualified) qualifiedTeams++;
                        else disQualifiedTeams++;
                        students += teams[i].members.length;
                        teams[i].members.forEach(member => {
                            if(member.cup) cupRequest++;
                        });
                    }
                    res.render('./dashboard/admin-dashboard',{
                        user: req.user,
                        users,
                        payedAmount,
                        notPayedAmount,
                        qualifiedTeams,
                        disQualifiedTeams,
                        students,
                        usersNum: users.length,
                        setting,
                        cupRequest
                    });
                });
            });
        });
    }
    else if(req.user.role == 'refree'){
        Team.find({}, (err, teams) => {
            Game.find({}, (err, games) => {
                Todo.find({}, (err, todos) => {
                    // console.log(todos);
                    res.render('./dashboard/refree-dashboard',{
                        user: req.user,
                        teams,
                        games,
                        todos
                    });
                });
            });
        });
    }
    else if(req.user.role == 'student'){
        Team.findById( req.user.teamID, (err, team) =>{
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
    var price = mentorPrice;
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
            var workbook = new excel.Workbook();
            var worksheet = workbook.addWorksheet('Sheet 1');
            var style = workbook.createStyle({
                font: {
                color: '#FFFFFF',
                size: 12
                },
                numberFormat: '$#,##0.00; ($#,##0.00); -'
            });

            worksheet.cell(1,1).string(`teamName`).style(style);
            worksheet.cell(1,2).string(`mentor`).style(style);
            worksheet.cell(1,3).string(`league`).style(style);
            worksheet.cell(1,4).string(`affiliation`).style(style);
            worksheet.cell(1,5).string(`member1`).style(style);
            worksheet.cell(1,6).string(`member2`).style(style);
            worksheet.cell(1,7).string(`member3`).style(style);
            worksheet.cell(1,8).string(`member4`).style(style);
            worksheet.cell(1,9).string(`member5`).style(style);
            
            for (let i = 0; i < teams.length; i++) {
                worksheet.cell(i+2,1).string(`${teams[i].teamName}`).style(style);
                worksheet.cell(i+2,2).string(`${teams[i].mentor}`).style(style);
                worksheet.cell(i+2,3).string(`${teams[i].league}`).style(style);
                worksheet.cell(i+2,4).string(`${teams[i].affiliation}`).style(style);
                for(var j=0; j<teams[i].members.length; j++)
                {
                    if(teams[i].members[j].cup)
                        worksheet.cell(i+2,5).string(`${teams[i].members[j].fullName}` + ' (دریافت تندیس)').style(style);
                    else
                        worksheet.cell(i+2,5).string(`${teams[i].members[j].fullName}`).style(style);
                }
            }
            workbook.write('./public/teamList.xlsx');
            
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

router.get('/teams-list-notpayed', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin')
    {
        Team.find({payed: false}, (err, teams) => {
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

router.get('/teams-list-payed', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin')
    {
        Team.find({payed: true}, (err, teams) => {
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

router.post('/user-edit-team', ensureAuthenticated, (req, res, next) => {
    var {id, teamName, mentor, affiliation} = req.body;

    Team.updateMany({_id: id}, {$set: {teamName, mentor, affiliation}}, (err, raw) => {
        res.redirect(`/dashboard/team?id=${id}`);
    });

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
                        currentTeam,
                        role: _user.role
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

router.post('/add-game-light-secondary', ensureAuthenticated, (req, res, next) => {
    var {idA, idB, field, round, time} = req.body;
    Team.findById(idA, (err, teamA) => {
        Team.findById(idB, (err, teamB) => {
            var newGame = new Game({teamA, teamB, field, league: teamA.league, round, time});
            newGame.save().then(doc => {
                res.redirect(`/dashboard/soccer-light-secondary?round=${round}`);
            }).catch(err => console.log(err));
        });
    });
});

router.post('/add-game-light-primary', ensureAuthenticated, (req, res, next) => {
    var {idA, idB, field, round, time} = req.body;
    Team.findById(idA, (err, teamA) => {
        Team.findById(idB, (err, teamB) => {
            var newGame = new Game({teamA, teamB, field, league: teamA.league, round, time});
            newGame.save().then(doc => {
                res.redirect(`/dashboard/soccer-light-primary?round=${round}`);
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

router.post('/add-game-smartcar', ensureAuthenticated, (req, res, next) => {
    var {idA, field, round, time} = req.body;
    Team.findById(idA, (err, teamA) => {
        var newGame = new Game({teamA, field, league: teamA.league, round, time});
        newGame.save().then(doc => {
            res.redirect(`/dashboard/smartcar?round=${round}`);
        }).catch(err => console.log(err));
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
            Team.findById(game.teamA._id, (err, teamA) => {
                if(game.league == 'خودروهای هوشمند'){
                    Team.findById(game.teamA._id, (err, teamB) => {
                        res.render('./dashboard/refree-game', {
                            user: req.user,
                            game,
                            teamA,
                            teamB
                        });
                    });
                }
                else{
                    Team.findById(game.teamB._id, (err, teamB) => {
                        res.render('./dashboard/refree-game', {
                            user: req.user,
                            game,
                            teamA,
                            teamB
                        });
                    });
                }
            });
        });
    }
    else res.send('Error!!');
});

router.get('/start-game', ensureAuthenticated, (req, res, next) => {
    if(req.user.role != 'user'){
        Game.findById(req.query.id, (err, game) => {
            // Game.updateMany({league: game.league}, {$set: {started: false}}, (err, doc) => {
                Game.updateMany({_id: req.query.id}, {$set: {started: true}}, (err, doc) => {
                    res.redirect(`/dashboard/game?id=${req.query.id}`);
                });
            // });
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
        Game.findById(req.query.id, (err, game) =>{
            if(!game.scoreSaved){
                if(game.league == 'خودروهای هوشمند')
                {
                    Team.findById(game.teamA._id, (err, team) => {
                        Team.updateMany({_id: team._id}, {$set: {
                            score: game.goalA,
                            time: 0
                        }}, (err, doc) => {if(err) console.log(err)});
                    });
                }
                else{
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
                }
            }
        });
        Game.updateMany({_id: req.query.id}, {$set: {started: false, scoreSaved: true}}, (err, doc) => {
            res.redirect(`/dashboard/game?id=${req.query.id}`);
        });
    }
});

router.get('/soccer-light-primary', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'refree'){
        Team.find({league: 'فوتبالیست سبک وزن primary'}, (err, teams) => {
            Game.find({league: 'فوتبالیست سبک وزن primary', round: req.query.round}, (err, games) => {
                res.render('./dashboard/refree-soccer-light-primary',{
                    user: req.user,
                    teams,
                    games,
                    round: req.query.round
                });
            });
        });
    }
});

router.get('/soccer-light-secondary', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'refree'){
        Team.find({league: 'فوتبالیست سبک وزن secondary'}, (err, teams) => {
            Game.find({league: 'فوتبالیست سبک وزن secondary', round: req.query.round}, (err, games) => {
                res.render('./dashboard/refree-soccer-light-secondary',{
                    user: req.user,
                    teams,
                    games,
                    round: req.query.round
                });
            });
        });
    }
});

router.get('/soccer-light-primary-score', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'refree'){
        Team.find({league: 'فوتبالیست سبک وزن primary', payed: true}, (err, teams) => {
            var workbook = new excel.Workbook();
            var worksheet = workbook.addWorksheet('Sheet 1');
            var style = workbook.createStyle({
                font: {
                color: '#FF0800',
                size: 12
                },
                numberFormat: '$#,##0.00; ($#,##0.00); -'
            });

            worksheet.cell(1,1).string(`teamName`).style(style);
            worksheet.cell(1,2).string(`win`).style(style);
            worksheet.cell(1,3).string(`lose`).style(style);
            worksheet.cell(1,4).string(`equals`).style(style);
            worksheet.cell(1,5).string(`goalzade`).style(style);
            worksheet.cell(1,6).string(`goalkhorde`).style(style);
            worksheet.cell(1,7).string(`tafazol`).style(style);
            worksheet.cell(1,8).string(`technical`).style(style);
            worksheet.cell(1,9).string(`score`).style(style);

            for(var i=1; i<teams.length; i++){
                
                for(var j=0; j<teams.length - i; j++){
                    if(teams[j].score < teams[j + 1].score){
                        var temp = teams[j];
                        teams[j] = teams[j+1];
                        teams[j+1] = temp;
                    }
                    else if(teams[j].score == teams[j+1].score)
                    {
                        if(teams[j].goalzade - teams[j].goalkhorde < teams[j+1].goalzade - teams[j+1].goalkhorde)
                        {
                            var temp = teams[j];
                            teams[j] = teams[j+1];
                            teams[j+1] = temp;
                        }
                        else if(teams[j].goalzade - teams[j].goalkhorde == teams[j+1].goalzade - teams[j+1].goalkhorde)
                        {
                            if(teams[j].goalzade < teams[j+1].goalzade)
                            {
                                var temp = teams[j];
                                teams[j] = teams[j+1];
                                teams[j+1] = temp;
                            }
                            else if(teams[j].goalzade == teams[j+1].goalzade)
                            {
                                if(teams[j].win < teams[j+1].win)
                                {
                                    var temp = teams[j];
                                    teams[j] = teams[j+1];
                                    teams[j+1] = temp;
                                }
                                else if(teams[j].win == teams[j+1].win)
                                {
                                    if(teams[j].equals < teams[j+1].equals)
                                    {
                                        var temp = teams[j];
                                        teams[j] = teams[j+1];
                                        teams[j+1] = temp;
                                    }
                                    else if(teams[j].equals == teams[j+1].equals)
                                    {
                                        if(teams[j].goalkhorde > teams[j+1].goalkhorde)
                                        {
                                            var temp = teams[j];
                                            teams[j] = teams[j+1];
                                            teams[j+1] = temp;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            for (let i = 0; i < teams.length; i++) {
                worksheet.cell(i+2,1).string(`${teams[i].teamName}`).style(style);
                worksheet.cell(i+2,2).string(`${teams[i].win}`).style(style);
                worksheet.cell(i+2,3).string(`${teams[i].lose}`).style(style);
                worksheet.cell(i+2,4).string(`${teams[i].equals}`).style(style);
                worksheet.cell(i+2,5).string(`${teams[i].goalzade}`).style(style);
                worksheet.cell(i+2,6).string(`${teams[i].goalkhorde}`).style(style);
                worksheet.cell(i+2,7).string(`${teams[i].goalzade - teams[i].goalkhorde}`).style(style);
                worksheet.cell(i+2,8).string(`${teams[i].technical}`).style(style);
                worksheet.cell(i+2,9).string(`${teams[i].score}`).style(style);
            }
            workbook.write('./public/soccerLightPrimary.xlsx');
            res.render('./dashboard/refree-soccer-light-primary-score',{
                user: req.user,
                teams
            });
        });
    }
});

router.get('/soccer-light-secondary-score', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'refree'){
        Team.find({league: 'فوتبالیست سبک وزن secondary', payed: true}, (err, teams) => {
            var workbook = new excel.Workbook();
            var worksheet = workbook.addWorksheet('Sheet 1');
            var style = workbook.createStyle({
                font: {
                color: '#FF0800',
                size: 12
                },
                numberFormat: '$#,##0.00; ($#,##0.00); -'
            });

            worksheet.cell(1,1).string(`teamName`).style(style);
            worksheet.cell(1,2).string(`win`).style(style);
            worksheet.cell(1,3).string(`lose`).style(style);
            worksheet.cell(1,4).string(`equals`).style(style);
            worksheet.cell(1,5).string(`goalzade`).style(style);
            worksheet.cell(1,6).string(`goalkhorde`).style(style);
            worksheet.cell(1,7).string(`tafazol`).style(style);
            worksheet.cell(1,8).string(`technical`).style(style);
            worksheet.cell(1,9).string(`score`).style(style);

            for(var i=1; i<teams.length; i++){
                
                for(var j=0; j<teams.length - i; j++){
                    if(teams[j].score < teams[j + 1].score){
                        var temp = teams[j];
                        teams[j] = teams[j+1];
                        teams[j+1] = temp;
                    }
                    else if(teams[j].score == teams[j+1].score)
                    {
                        if(teams[j].goalzade - teams[j].goalkhorde < teams[j+1].goalzade - teams[j+1].goalkhorde)
                        {
                            var temp = teams[j];
                            teams[j] = teams[j+1];
                            teams[j+1] = temp;
                        }
                        else if(teams[j].goalzade - teams[j].goalkhorde == teams[j+1].goalzade - teams[j+1].goalkhorde)
                        {
                            if(teams[j].goalzade < teams[j+1].goalzade)
                            {
                                var temp = teams[j];
                                teams[j] = teams[j+1];
                                teams[j+1] = temp;
                            }
                            else if(teams[j].goalzade == teams[j+1].goalzade)
                            {
                                if(teams[j].win < teams[j+1].win)
                                {
                                    var temp = teams[j];
                                    teams[j] = teams[j+1];
                                    teams[j+1] = temp;
                                }
                                else if(teams[j].win == teams[j+1].win)
                                {
                                    if(teams[j].equals < teams[j+1].equals)
                                    {
                                        var temp = teams[j];
                                        teams[j] = teams[j+1];
                                        teams[j+1] = temp;
                                    }
                                    else if(teams[j].equals == teams[j+1].equals)
                                    {
                                        if(teams[j].goalkhorde > teams[j+1].goalkhorde)
                                        {
                                            var temp = teams[j];
                                            teams[j] = teams[j+1];
                                            teams[j+1] = temp;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            for (let i = 0; i < teams.length; i++) {
                worksheet.cell(i+2,1).string(`${teams[i].teamName}`).style(style);
                worksheet.cell(i+2,2).string(`${teams[i].win}`).style(style);
                worksheet.cell(i+2,3).string(`${teams[i].lose}`).style(style);
                worksheet.cell(i+2,4).string(`${teams[i].equals}`).style(style);
                worksheet.cell(i+2,5).string(`${teams[i].goalzade}`).style(style);
                worksheet.cell(i+2,6).string(`${teams[i].goalkhorde}`).style(style);
                worksheet.cell(i+2,7).string(`${teams[i].goalzade - teams[i].goalkhorde}`).style(style);
                worksheet.cell(i+2,8).string(`${teams[i].technical}`).style(style);
                worksheet.cell(i+2,9).string(`${teams[i].score}`).style(style);
            }
            workbook.write('./public/soccerLightSecondary.xlsx');
            res.render('./dashboard/refree-soccer-light-secondary-score',{
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
        Team.find({league: 'فوتبالیست وزن آزاد', payed: true}, (err, teams) => {
            var workbook = new excel.Workbook();
            var worksheet = workbook.addWorksheet('Sheet 1');
            var style = workbook.createStyle({
                font: {
                color: '#FF0800',
                size: 12
                },
                numberFormat: '$#,##0.00; ($#,##0.00); -'
            });

            worksheet.cell(1,1).string(`teamName`).style(style);
            worksheet.cell(1,2).string(`win`).style(style);
            worksheet.cell(1,3).string(`lose`).style(style);
            worksheet.cell(1,4).string(`equals`).style(style);
            worksheet.cell(1,5).string(`goalzade`).style(style);
            worksheet.cell(1,6).string(`goalkhorde`).style(style);
            worksheet.cell(1,7).string(`tafazol`).style(style);
            worksheet.cell(1,8).string(`technical`).style(style);
            worksheet.cell(1,9).string(`score`).style(style);

            for(var i=1; i<teams.length; i++){
                
                for(var j=0; j<teams.length - i; j++){
                    if(teams[j].score < teams[j + 1].score){
                        var temp = teams[j];
                        teams[j] = teams[j+1];
                        teams[j+1] = temp;
                    }
                    else if(teams[j].score == teams[j+1].score)
                    {
                        if(teams[j].goalzade - teams[j].goalkhorde < teams[j+1].goalzade - teams[j+1].goalkhorde)
                        {
                            var temp = teams[j];
                            teams[j] = teams[j+1];
                            teams[j+1] = temp;
                        }
                        else if(teams[j].goalzade - teams[j].goalkhorde == teams[j+1].goalzade - teams[j+1].goalkhorde)
                        {
                            if(teams[j].goalzade < teams[j+1].goalzade)
                            {
                                var temp = teams[j];
                                teams[j] = teams[j+1];
                                teams[j+1] = temp;
                            }
                            else if(teams[j].goalzade == teams[j+1].goalzade)
                            {
                                if(teams[j].win < teams[j+1].win)
                                {
                                    var temp = teams[j];
                                    teams[j] = teams[j+1];
                                    teams[j+1] = temp;
                                }
                                else if(teams[j].win == teams[j+1].win)
                                {
                                    if(teams[j].equals < teams[j+1].equals)
                                    {
                                        var temp = teams[j];
                                        teams[j] = teams[j+1];
                                        teams[j+1] = temp;
                                    }
                                    else if(teams[j].equals == teams[j+1].equals)
                                    {
                                        if(teams[j].goalkhorde > teams[j+1].goalkhorde)
                                        {
                                            var temp = teams[j];
                                            teams[j] = teams[j+1];
                                            teams[j+1] = temp;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            for (let i = 0; i < teams.length; i++) {
                worksheet.cell(i+2,1).string(`${teams[i].teamName}`).style(style);
                worksheet.cell(i+2,2).string(`${teams[i].win}`).style(style);
                worksheet.cell(i+2,3).string(`${teams[i].lose}`).style(style);
                worksheet.cell(i+2,4).string(`${teams[i].equals}`).style(style);
                worksheet.cell(i+2,5).string(`${teams[i].goalzade}`).style(style);
                worksheet.cell(i+2,6).string(`${teams[i].goalkhorde}`).style(style);
                worksheet.cell(i+2,7).string(`${teams[i].goalzade - teams[i].goalkhorde}`).style(style);
                worksheet.cell(i+2,8).string(`${teams[i].technical}`).style(style);
                worksheet.cell(i+2,9).string(`${teams[i].score}`).style(style);
            }
            workbook.write('./public/soccerOpen.xlsx');
            res.render('./dashboard/refree-soccer-open-score',{
                user: req.user,
                teams
            });
        });
    }
});

router.get('/smartcar-score', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'refree'){
        Team.find({league: 'خودروهای هوشمند', payed: true}, (err, teams) => {
            var workbook = new excel.Workbook();
            var worksheet = workbook.addWorksheet('Sheet 1');
            var style = workbook.createStyle({
                font: {
                color: '#FF0800',
                size: 12
                },
                numberFormat: '$#,##0.00; ($#,##0.00); -'
            });

            worksheet.cell(1,1).string(`teamName`).style(style);
            worksheet.cell(1,2).string(`score`).style(style);
            worksheet.cell(1,3).string(`time`).style(style);

            for(var i=1; i<teams.length; i++){
                
                for(var j=0; j<teams.length - i; j++){
                    if(teams[j].score < teams[j + 1].score){
                        var temp = teams[j];
                        teams[j] = teams[j+1];
                        teams[j+1] = temp;
                    }
                    else if(teams[j].score == teams[j+1].score)
                    {
                        if(teams[j].time < teams[j+1].time)
                        {
                            var temp = teams[j];
                            teams[j] = teams[j+1];
                            teams[j+1] = temp;
                        }
                    }
                }
            }
            for (let i = 0; i < teams.length; i++) {
                worksheet.cell(i+2,1).string(`${teams[i].teamName}`).style(style);
                worksheet.cell(i+2,2).string(`${teams[i].score}`).style(style);
                worksheet.cell(i+2,3).string(`${teams[i].time}`).style(style);
            }
            workbook.write('./public/smartcar.xlsx');
            res.render('./dashboard/refree-smartcar-score',{
                user: req.user,
                teams
            });
        });
    }
});

router.get('/soccer2d-score', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'refree'){
        Team.find({league: 'فوتبال ۲ بعدی', payed: true}, (err, teams) => {
            res.render('./dashboard/refree-soccer2d-score',{
                user: req.user,
                teams
            });
        });
    }
});

router.get('/smartcar', ensureAuthenticated, (req, res, next) => {
    var round = req.query.round;
    if(!round) round = 1;
    if(req.user.role == 'refree'){
        Team.find({league: 'خودروهای هوشمند'}, (err, teams) => {
            Game.find({league: 'خودروهای هوشمند', round: round}, (err, games) => {
                res.render('./dashboard/refree-smartcar',{
                    user: req.user,
                    teams,
                    games,
                    round
                });
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


router.post('/refree-soccer-light-primary-score', ensureAuthenticated, (req, res, next) => {
    var {teamName, id, win, lose, equals, goalzade, goalkhorde, technical, score} = req.body;
    if(req.user.role == 'refree'){
        Team.updateMany({_id: id}, {$set: {win, lose, equals, goalzade, goalkhorde, technical, score}}, (err, teams) => {
            res.redirect('/dashboard/soccer-light-primary-score');
        });
    }
});

router.post('/refree-soccer-light-secondary-score', ensureAuthenticated, (req, res, next) => {
    var {teamName, id, win, lose, equals, goalzade, goalkhorde, technical, score} = req.body;
    if(req.user.role == 'refree'){
        Team.updateMany({_id: id}, {$set: {win, lose, equals, goalzade, goalkhorde, technical, score}}, (err, teams) => {
            res.redirect('/dashboard/soccer-light-secondary-score');
        });
    }
});

router.post('/refree-soccer-light-primary-edit', ensureAuthenticated, (req, res, next) => {
    var {id, goalA, goalB, field, time, round} = req.body;
    if(req.user.role == 'refree'){
        Game.updateMany({_id: id}, {$set: {goalA, goalB, field, time}}, (err, games) => {
            res.redirect(`/dashboard/soccer-light-primary?round=${round}`);
        });
    }
});

router.post('/refree-soccer-light-secondary-edit', ensureAuthenticated, (req, res, next) => {
    var {id, goalA, goalB, field, time, round} = req.body;
    if(req.user.role == 'refree'){
        Game.updateMany({_id: id}, {$set: {goalA, goalB, field, time}}, (err, games) => {
            res.redirect(`/dashboard/soccer-light-secondary?round=${round}`);
        });
    }
});

router.post('/refree-soccer-open-edit', ensureAuthenticated, (req, res, next) => {
    var {id, goalA, goalB, field, time, round} = req.body;
    if(req.user.role == 'refree'){
        Game.updateMany({_id: id}, {$set: {goalA, goalB, field, time}}, (err, games) => {
            res.redirect(`/dashboard/soccer-open?round=${round}`);
        });
    }
});

router.post('/refree-smartcar-edit', ensureAuthenticated, (req, res, next) => {
    var {id, goalA, field, time, round} = req.body;
    if(req.user.role == 'refree'){
        Game.updateMany({_id: id}, {$set: {goalA, field, time}}, (err, games) => {
            res.redirect(`/dashboard/smartcar?round=${round}`);
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

router.get('/light-primary-delete-game', ensureAuthenticated, (req, res, next) => {
    if(req.user.role != 'user'){
        Game.deleteOne({_id: req.query.id}, (err, doc) => res.redirect(`/dashboard/soccer-light-primary?round=${req.query.round}`));
    }
});

router.get('/light-secondary-delete-game', ensureAuthenticated, (req, res, next) => {
    if(req.user.role != 'user'){
        Game.deleteOne({_id: req.query.id}, (err, doc) => res.redirect(`/dashboard/soccer-light-secondary?round=${req.query.round}`));
    }
});

router.get('/open-delete-game', ensureAuthenticated, (req, res, next) => {
    if(req.user.role != 'user'){
        Game.deleteOne({_id: req.query.id}, (err, doc) => res.redirect(`/dashboard/soccer-open?round=${req.query.round}`));
    }
});

router.get('/smartcar-delete-game', ensureAuthenticated, (req, res, next) => {
    if(req.user.role != 'user'){
        Game.deleteOne({_id: req.query.id}, (err, doc) => res.redirect(`/dashboard/smartcar?round=${req.query.round}`));
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

router.get('/admin-dq-team', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin'){
        Team.updateMany({_id: req.query.id}, {$set: {qualified: false}},(err, doc) => res.redirect('/dashboard/teams-list'));
    }
});

router.get('/admin-unpay-team', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin'){
        Team.updateMany({_id: req.query.id}, {$set: {payed: false}},(err, doc) => res.redirect('/dashboard/teams-list'));
    }
});
router.get('/admin-pay-team', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin'){
        Team.updateMany({_id: req.query.id}, {$set: {payed: true}},(err, doc) => res.redirect('/dashboard/teams-list'));
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

router.get('/toggle-cup', ensureAuthenticated, (req, res, next) => {
    Team.findById(req.query.teamID, (err, team) => {
        if(err) console.log(err);
        var members = team.members;
        var price = team.price;
        for (var i = 0; i < members.length; i++) {
            if(members[i].idNumber == req.query.idNumber)
            {
                if(members[i].cup) price -= cupPrice;
                else price += cupPrice;
                members[i].cup = !members[i].cup;
            }
        }
        Team.updateMany({_id: req.query.teamID}, {$set: {members, price}}, (err, doc) => {
            res.redirect(`/dashboard/team?id=${req.query.teamID}`);
        });
    });
});

router.get('/register-off', ensureAuthenticated, (req, res, next) => {
    Setting.find({}, (err, settings) => {
        if(settings.length == 0)
        {
            var setting = new Setting({register: false});
            setting.save().then(doc => {res.redirect('/dashboard');}).catch(err => {if(err) console.log(err)});
        }
        else
        {
            Setting.updateMany({}, {$set: {register: false}}, (err, doc) => {
                res.redirect('/dashboard');
            });
        }
    });
});

router.get('/register-on', ensureAuthenticated, (req, res, next) => {
    Setting.find({}, (err, settings) => {
        if(settings.length == 0)
        {
            var setting = new Setting({register: true});
            setting.save().then(doc => {res.redirect('/dashboard');}).catch(err => {if(err) console.log(err)});
        }
        else
        {
            Setting.updateMany({}, {$set: {register: true}}, (err, doc) => {
                res.redirect('/dashboard');
            });
        }
    });
});

router.post('/reset-pass', ensureAuthenticated, (req, res, next) => {
    var {password, confirm, id} = req.body;
    if(!password && !confirm) res.send('err');
    if(req.user.role == 'admin'){
        bcrypt.genSalt(10, (err, salt) => bcrypt.hash(password, salt, (err, hash) => {
            if(err) throw err;
            password = hash;
            User.updateMany({_id: id}, {$set: {password}}, (err, doc) => {
                res.redirect(`/dashboard/users-list`);
            });
          }));
    }
});

router.get('/reset-game-admin', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin'){
        res.render('./dashboard/admin-reset-game', {
            user: req.user
        });
    }
    else{res.send('متاسفم واقعا:( خجالت نمیکشی؟؟؟؟؟؟')}
});

router.get('/admin-confirm-reset-game', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin'){
        Game.deleteMany({}, (err) => {
            if(err) console.log(err);
            Team.updateMany({}, {$set: {
                score: 0,
                win: 0,
                lose: 0,
                equals: 0,
                technical: 0,
                goalzade: 0,
                goalkhorde: 0,
            }}, (err, doc) => {if(err) console.log(err);})
        });
        res.redirect('/dashboard');
    }
    else{res.send('متاسفم واقعا:( خجالت نمیکشی؟؟؟؟؟؟')}
});

router.post('/edit-goalA', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'refree'){
        Game.updateMany({_id: req.body.id}, {$set: {goalA: req.body.goalA}}, (err, doc) => {
            res.redirect(`/dashboard/game?id=${req.body.id}`);
        });
    }
});

router.post('/edit-goalB', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'refree'){
        Game.updateMany({_id: req.body.id}, {$set: {goalB: req.body.goalB}}, (err, doc) => {
            res.redirect(`/dashboard/game?id=${req.body.id}`);
        });
    }
});

router.get('/double-price', ensureAuthenticated, (req, res, next) =>{
    if(req.user.role == 'admin')
    {
        Team.find({payed: false}, (err, teams) => {
            for (let i = 0; i < teams.length; i++) {
                Team.updateMany({_id: teams[i]._id}, {$set: {price: (teams[i].price * 2)}}, (err, doc)=> {
                    if(err) console.log(err);
                });
            }
        });
        res.redirect('/dashboard');
    }
});

router.get('/double-price-a', ensureAuthenticated, (req, res, next) =>{
    if(req.user.role == 'admin')
    {
        Team.find({payed: false}, (err, teams) => {
            for (let i = 0; i < teams.length; i++) {
                Team.updateMany({_id: teams[i]._id}, {$set: {price: (teams[i].price / 2)}}, (err, doc)=> {
                    if(err) console.log(err);
                });
            }
        });
        res.redirect('/dashboard');
    }
});

router.post('/add-todo', ensureAuthenticated, (req, res, next) => {
    const content = req.body.content;
    if(req.user.role == 'refree')
    {
        var d = new Date();
        const newTodo = new Todo({
            content: content,
            date: Date.now(),
            time: `${d.getHours()}:${d.getMinutes()}`
        });
        newTodo.save().then(doc => {
            res.redirect('/dashboard');
        }).catch(err => {
            if(err) console.log(err);
        });
    }
});

router.get('/remove-todo', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'refree')
    {
        Todo.deleteOne({_id: req.query.id}, err =>{
            if(err) console.log(err);
            res.redirect('/dashboard');
        })
    }
});

router.get('/admin-change-idnumber', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin'){
        Team.find({}, (err, teams) => {
            res.render('./dashboard/admin-upgrade-member', {
                teams,
                user: req.user
            });
        });
    }
});

router.post('/change-idnumber', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin')
    {
        Team.findOne({_id: req.body.teamID}, (err, team) => {
            var members = team.members;
            members[req.body.number].idNumber = req.body.idNumber;
            Team.updateOne({_id: req.body.teamID}, {$set: {members}}, (err, doc) => {
                res.redirect('/dashboard/admin-change-idnumber');
            });
        });
    }
});

router.get('/refree-last-code', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'refree')
    {
        Team.findOne({_id: req.query.teamID}, (err, team) => {
            res.render('./dashboard/refree-last-code', {
                user: req.user,
                team,
                blueCode: team.lastBlueFile,
                redCode: team.lastRedFile
            });
        });
    }
});

router.get('/delete-other-users', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin')
    {
        User.find({role: 'student'}, (err, users) => {
            users.forEach(user => {
                Team.findOne({_id: user.teamID}, (err, team) => {
                    if(team)
                    {
                        if(team.league != 'خودروهای هوشمند')
                        {
                            console.log(team.teamName);
                            User.deleteOne({_id: user._id}, (err) => {
                                if(err) console.log(err);
                            });
                        }
                    }
                });
            });
            res.send('done');
        });
    }
});
module.exports = router;