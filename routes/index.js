var express = require('express');
var router = express.Router();
var Gallery = require('../models/Gallery');
const Team = require('../models/Team');

const competitionDate = new Date('April 15, 2021 07:00:00');

router.get('/', (req, res, next) => {
    var todayDate = Date.now();
    var milisecUntilCompetition = (Date.parse(competitionDate) - todayDate);
    var a = Math.floor(milisecUntilCompetition/1000);
    var weeks = Math.floor(a / 604800);
    var days = Math.floor((a - weeks * 604800) / 86400);
    var hours = Math.floor((a - weeks * 604800 - days * 86400) / 3600);
    var minuts = Math.floor((a - weeks * 604800 - days * 86400 - hours * 3600) / 60);
    var secconds = Math.floor(a%60);
    console.log(milisecUntilCompetition);
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
        res.render('index', {
            time: {weeks, days, hours, minuts, secconds},
            teams,
            soccerLightNum,
            soccerOpenNum,
            smartCarNum,
            cospaceNum,
            programmingNum
        });
    })
});

router.get('/gallery', (req, res, next) => {
    Gallery.findOne({key: 1}, (err, gallery) => {
        if(gallery){
            var seen = gallery.seen+1;
            Gallery.updateMany({}, {$set: {seen: seen}}, (err) =>{
                console.log('seen');
            });
        }else{
            var newGallery = new Gallery({key: 1, like: 0, seen: 1, comments: []});
            newGallery.save();
        }
    });
    Gallery.find({}, (err, galleries) => {
        res.render('gallery', {galleries});
    });
});

router.get('/gallery/like', (req, res, next) => {
    var key = req.query.id;
    Gallery.findOne({key: key}, (err, gallery) => {
        if(gallery){
            var like = gallery.like+1;
            Gallery.updateMany({key: key}, {$set: {like: like}}, (err) =>{
                console.log('liked');
            });
        }else{
            var newGallery = new Gallery({key: key, like: 1, seen: 1, comments: []});
            newGallery.save();
        }
    });
    res.redirect('/gallery');
});

router.post('/gallery/comment', (req, res, next) => {
    var key = req.body.key;
    Gallery.findOne({key: key}, (err, gallery) => {
        if(gallery){
            var comments = gallery.comments;
            comments.push({date: Date.now(), text: req.body.text, user: 'Guest'});
            console.log(comments)
            Gallery.updateMany({key: key}, {$set: {comments}}, (err) =>{
                console.log('Comment Added');
            });
        }else{
            var comments = [];
            comments.push({date: Date.now(), text: req.body.text, user: 'Guest'});
            var newGallery = new Gallery({key: key, like: 0, seen: 1, comments});
            newGallery.save();
        }
    });
    res.redirect('/gallery');
});

router.get('/leagues', (req, res, next) => {
    res.render('./leagues/home');
});

module.exports = router;
