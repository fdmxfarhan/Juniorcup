var express = require('express');
var router = express.Router();
var Gallery = require('../models/Gallery');
const Team = require('../models/Team');



router.get('/soccer-light', (req, res, next) => {
    var {field} = req.query;
    if(!field) field = 'A';
    Team.find({league: 'فوتبالیست سبک وزن'}, (err, teams) => {
        res.render('./game/soccer-light', {
            teams,
            field
        });
    });
});

router.get('/soccer-open', (req, res, next) => {
    Team.find({league: 'فوتبالیست وزن آزاد'}, (err, teams) => {
        res.render('./game/soccer-open',{
            teams
        });
    });
});

router.get('/smartcar', (req, res, next) => {
    Team.find({league: 'خودروهای هوشمند'}, (err, teams) => {
        res.render('./game/smartcar', {teams});
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


module.exports = router;
