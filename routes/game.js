var express = require('express');
var router = express.Router();
var Gallery = require('../models/Gallery');
const Team = require('../models/Team');
const Game = require('../models/Game');



router.get('/soccer-light', (req, res, next) => {
    var {field} = req.query;
    if(!field) field = 'A';
    Team.find({league: 'فوتبالیست سبک وزن'}, (err, teams) => {
        Game.findOne({field: field, league: 'فوتبالیست سبک وزن', started: true}, (err, game) => {
            if(err) console.log(err);
            // console.log(game);
            res.render('./game/soccer-light', {
                teams,
                field,
                game
            });
        });
    });
});

router.get('/soccer-open', (req, res, next) => {
    var field = 'D';
    Team.find({league: 'فوتبالیست وزن آزاد'}, (err, teams) => {
        Game.findOne({field: field, league: 'فوتبالیست وزن آزاد', started: true}, (err, game) => {
            if(err) console.log(err);
            // console.log(game);
            res.render('./game/soccer-open', {
                teams,
                field,
                game
            });
        });
    });
});

router.get('/smartcar', (req, res, next) => {
    var {field} = req.query;
    if(!field) field = 'E';
    Team.find({league: 'خودروهای هوشمند'}, (err, teams) => {
        res.render('./game/smartcar', {
            teams,
            field
        });
    });
});

router.get('/cospace', (req, res, next) => {
    Team.find({league: 'امداد فضای مشترک'}, (err, teams) => {
        res.render('./game/cospace', {teams});
    });
});

router.get('/programming', (req, res, next) => {
    Team.find({league: 'برنامه نویسی'}, (err, teams) => {
        res.render('./game/programming', {teams});
    });
});

router.get('/soccer2d', (req, res, next) => {
    var field = 'G';
    Team.find({league: 'فوتبال ۲ بعدی'}, (err, teams) => {
        Game.findOne({field: field, league: 'فوتبال ۲ بعدی', started: true}, (err, game) => {
            if(err) console.log(err);
            // console.log(game);
            res.render('./game/soccer2d', {
                teams,
                field,
                game
            });
        });
    });
});

module.exports = router;
