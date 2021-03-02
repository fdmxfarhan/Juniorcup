var express = require('express');
var router = express.Router();
var Gallery = require('../models/Gallery');
const Team = require('../models/Team');
const Game = require('../models/Game');


router.get('/', (req, res, next) => {
    Team.find({}, (err, teams) => {
        var soccerLightNum = 0, soccerOpenNum = 0, smartCarNum = 0, cospaceNum = 0, programmingNum = 0, soccer2d = 0;
        for(var i=0; i < teams.length; i++)
        {
            if(teams[i].league == 'فوتبالیست سبک وزن')  soccerLightNum++;
            if(teams[i].league == 'فوتبالیست وزن آزاد') soccerOpenNum++;
            if(teams[i].league == 'امداد فضای مشترک')   cospaceNum++;
            if(teams[i].league == 'برنامه نویسی')       programmingNum++;
            if(teams[i].league == 'خودروهای هوشمند')    smartCarNum++;
            if(teams[i].league == 'فوتبال ۲ بعدی')      soccer2d++;
        }
        res.render('./game/home', {
            teams,
            soccerLightNum,
            soccerOpenNum,
            smartCarNum,
            cospaceNum,
            programmingNum,
            soccer2d,
            count: teams.length
        });
    })
});

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
