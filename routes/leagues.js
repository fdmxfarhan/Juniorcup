var express = require('express');
var router = express.Router();
var Gallery = require('../models/Gallery');
const Team = require('../models/Team');

const competitionDate = new Date('April 15, 2021 07:00:00');

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
        var soccerLightNum = 0, soccerOpenNum = 0, smartCarNum = 0, cospaceNum = 0, programmingNum = 0;
        for(var i=0; i < teams.length; i++)
        {
            if(teams[i].league == 'فوتبالیست سبک وزن')  soccerLightNum++;
            if(teams[i].league == 'فوتبالیست وزن آزاد') soccerOpenNum++;
            if(teams[i].league == 'امداد فضای مشترک')   cospaceNum++;
            if(teams[i].league == 'برنامه نویسی')       programmingNum++;
            if(teams[i].league == 'خودروهای هوشمند')    smartCarNum++;
        }
        var maxNum = getMax([soccerLightNum, soccerOpenNum, cospaceNum, programmingNum, smartCarNum]);
        res.render('./leagues/home', {
            teams,
            soccerLightNum,
            soccerOpenNum,
            smartCarNum,
            cospaceNum,
            programmingNum,
            maxNum
        });
    })
});

router.get('/soccer-light', (req, res, next) => {
    Team.find({league: 'فوتبالیست سبک وزن'}, (err, teams) => {
        res.render('./leagues/soccer-light', {
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
    res.render('./leagues/smartcar');
});

router.get('/cospace', (req, res, next) => {
    res.render('./leagues/cospace');
});


module.exports = router;
