var express = require('express');
var router = express.Router();
var Gallery = require('../models/Gallery');
const Team = require('../models/Team');
const Certificate = require('../models/Certificate');

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
    var todayDate = Date.now();
    var milisecUntilCompetition = (Date.parse(competitionDate) - todayDate);
    var a = Math.floor(milisecUntilCompetition/1000);
    var weeks = Math.floor(a / 604800);
    var days = Math.floor((a - weeks * 604800) / 86400);
    var hours = Math.floor((a - weeks * 604800 - days * 86400) / 3600);
    var minuts = Math.floor((a - weeks * 604800 - days * 86400 - hours * 3600) / 60);
    var secconds = Math.floor(a%60);
    // console.log(milisecUntilCompetition);
    Team.find({}, (err, teams) => {
        var soccerLightPrimaryNum = 0, soccerLightSecondaryNum = 0, soccerOpenNum = 0, smartCarNum = 0, cospaceNum = 0, programmingNum = 0;
        for(var i=0; i < teams.length; i++)
        {
            if(teams[i].league == 'فوتبالیست سبک وزن primary')  soccerLightPrimaryNum++;
            if(teams[i].league == 'فوتبالیست سبک وزن secondary')  soccerLightSecondaryNum++;
            if(teams[i].league == 'فوتبالیست وزن آزاد') soccerOpenNum++;
            if(teams[i].league == 'امداد فضای مشترک')   cospaceNum++;
            if(teams[i].league == 'برنامه نویسی')       programmingNum++;
            if(teams[i].league == 'خودروهای هوشمند')    smartCarNum++;
            
        }
        var user;
        if(req.user) user = req.user;
        else         user = false;
        res.render('index', {
            time: {weeks, days, hours, minuts, secconds},
            teams,
            soccerLightPrimaryNum,
            soccerLightSecondaryNum,
            soccerOpenNum,
            smartCarNum,
            cospaceNum,
            programmingNum,
            user
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


router.get('/about', (req, res, next) => {
    res.render('about');
});

router.get('/contact', (req, res, next) => {
    res.render('contact');
});



var mail=require('../config/mail');
router.post('/send-massage', (req, res, next) => {
    var {problem, name, mail, text} = req.body;
    if(req.body.text != '')
    {
        mail('mohammadh.z.1393@gmail.com',problem,name+'\n'+mail+'\n'+text);
        mail('fdmxfarhan@gmail.com',problem,name+'\n'+mail+'\n'+text);
        req.flash('success_msg', 'پیام شما با موفقیت ارسال شد');
    }
    else
    {
        req.flash('error_msg', 'لطفا متن پیام خود را بنویسید');
    }
    res.redirect('/contact');

});


router.get('/gb', (req, res, next)=>{
    if(req.user){
        res.render('./GBboard/info', {
        user: req.user
        });
    }
    else {
        res.render('./GBboard/info', {
        user: false
        });
    }
});

router.get('/edit-info', (req, res, next) => {
    res.render('./certificate/edit-info');
});

router.post('/edit-info', (req, res, next) => {
    var rendered = false;
    Team.find({}, (err, teams) => {
        teams.forEach(team => {
            team.members.forEach(member => {
                if(member.idNumber == req.body.idNumber)
                {
                    rendered = true;
                    res.render('./certificate/certificate', {
                        member,
                        team
                    });
                    return;
                }
            });
        });
        if(!rendered) res.send('id not found');
    })
});

router.post('/certificate', (req, res, next) => {
    var {idNumber, englishFirstName, englishLastName, englishAffiliation, league, phoneNumber, teamName, teamID} = req.body;
    if(!idNumber || !englishFirstName || !englishLastName || !englishAffiliation || !league || !phoneNumber || !teamName || !teamID)
    {
        res.send('error');
    }
    else
    {
        var englishLeague;
        if(league == "فوتبالیست سبک وزن primary")    englishLeague = 'Soccer Lihgt Weight Primary'           
        if(league == "فوتبالیست سبک وزن secondary")  englishLeague = 'Soccer Lihgt Weight Secondary'             
        if(league == "فوتبالیست وزن آزاد")           englishLeague = 'Soccer Open Weight'   
        if(league == "امداد فضای مشترک")             englishLeague = 'Cospace'   
        if(league == "برنامه نویسی")                 englishLeague = 'Programming'   
        if(league == "خودروهای هوشمند")              englishLeague = 'Smart Cars'   
        if(league == "فوتبال ۲ بعدی")                englishLeague = 'Soccer 2D'   
        if(league == "virtual rescue")               englishLeague = 'Virtual Rescue'  
        const newCertificate = new Certificate({idNumber, englishFirstName, englishLastName, englishAffiliation, englishLeague, phoneNumber, teamName, teamID});
        newCertificate.save().then(doc => {
            res.render('./certificate/seccess');
        }).catch(err => {if(err) console.log(err);});
    }
});

module.exports = router;
