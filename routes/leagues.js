var express = require('express');
var router = express.Router();
var Gallery = require('../models/Gallery');
const Team = require('../models/Team');

const competitionDate = new Date('April 15, 2022 07:00:00');

var getMax = (arr) => {
    max = 0;
    for(var i=0; i<arr.length; i++)
    {
        if(arr[i] > max) max = arr[i];
    }
    return max;
}

router.get('/', (req, res, next) => {
    Team.find({}, (err, teams) => {
        var soccerLightPrimaryNum = 0, soccerLightSecondaryNum = 0, soccerOpenNum = 0, smartCarNum = 0, cospaceNum = 0, programmingNum = 0, soccer2d = 0, virtualRescueNum = 0;
        for(var i=0; i < teams.length; i++)
        {
            if(teams[i].league == 'فوتبالیست سبک وزن primary')  soccerLightPrimaryNum++;
            if(teams[i].league == 'فوتبالیست سبک وزن secondary')  soccerLightSecondaryNum++;
            if(teams[i].league == 'فوتبالیست وزن آزاد') soccerOpenNum++;
            if(teams[i].league == 'مسیریاب')   cospaceNum++;
            if(teams[i].league == 'برنامه نویسی')       programmingNum++;
            if(teams[i].league == 'خودروهای هوشمند')    smartCarNum++;
            if(teams[i].league == 'فوتبال ۲ بعدی')      soccer2d++;
            if(teams[i].league == 'RCJ-Soccer-Sim')     virtualRescueNum++;
        }
        var maxNum = getMax([soccerLightPrimaryNum, soccerLightSecondaryNum, soccerOpenNum, cospaceNum, programmingNum, smartCarNum, soccer2d, virtualRescueNum]);
        res.render('./leagues/home', {
            teams,
            soccerLightPrimaryNum,
            soccerLightSecondaryNum,
            soccerOpenNum,
            smartCarNum,
            cospaceNum,
            programmingNum,
            soccer2d,
            virtualRescueNum,
            maxNum,
            count: teams.length
        });
    })
});

router.get('/soccer-light-primary', (req, res, next) => {
    Team.find({league: 'فوتبالیست سبک وزن primary'}, (err, teams) => {
        res.render('./leagues/soccer-light-primary', {
            teams
        });
    });
});

router.get('/soccer-light-secondary', (req, res, next) => {
    Team.find({league: 'فوتبالیست سبک وزن secondary'}, (err, teams) => {
        res.render('./leagues/soccer-light-secondary', {
            teams
        });
    });
});

router.get('/soccer-open', (req, res, next) => {
    Team.find({league: 'فوتبالیست وزن آزاد'}, (err, teams) => {
        res.render('./leagues/soccer-open',{
            teams
        });
    });
});

router.get('/smartcar', (req, res, next) => {
    Team.find({league: 'خودروهای هوشمند'}, (err, teams) => {
        res.render('./leagues/smartcar', {teams});
    });
});

router.get('/cospace', (req, res, next) => {
    Team.find({league: 'مسیریاب', payed: true}, (err, teams) => {
        res.render('./leagues/cospace', {teams});
    });
});

router.get('/programming', (req, res, next) => {
    Team.find({league: 'برنامه نویسی'}, (err, teams) => {
        res.render('./leagues/programming', {teams});
    });
});

router.get('/soccer2d', (req, res, next) => {
    Team.find({league: 'فوتبال ۲ بعدی'}, (err, teams) => {
        res.render('./leagues/soccer2d', {teams});
    });
});

router.get('/virtualrescue', (req, res, next) => {
    Team.find({league: 'RCJ-Soccer-Sim'}, (err, teams) => {
        res.render('./leagues/virtualrescue', {teams});
    });
});


module.exports = router;
