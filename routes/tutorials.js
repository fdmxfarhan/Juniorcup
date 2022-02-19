var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
var bodyparser = require('body-parser');
const multer = require('multer');
const mkdirp = require('mkdirp');
const Tutorial = require('../models/Tutorial');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = 'public/files/';
        mkdirp(dir, err => cb(err, dir));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });

router.get('/add', (req, res, next) => {
    res.render('./tutorials/add');
});

router.get('/rcj', (req, res, next) => {
    var session = req.query.session;
    var darkMode = req.session.darkMode;
    if(!session) session = 1;
    session = parseInt(session);
    Tutorial.findOne({name: 'rcj'}, (err, tutorial) => {
        if(tutorial){
            tutorial.seen[session] += 1;
            Tutorial.updateMany({_id: tutorial._id}, {$set: {seen: tutorial.seen}}, (err) => {
                res.render(`./tutorials/rcj/${session}`, {session, tutorial, darkMode});
            })
        }
        else{
            var arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var newTutorial = new Tutorial({name: 'rcj', likes: arr, seen: arr})
            newTutorial.save()
                .then(doc => res.redirect(`/tutorials/rcj?session=${session}`))
                .catch(err => console.log(err));
        }
    })
});
router.get('/like', (req, res, next) => {
    var {session, tutorialID} = req.query;
    session = parseInt(session);
    Tutorial.findById(tutorialID, (err, tutorial) => {
        tutorial.likes[session] += 1;
        Tutorial.updateMany({_id: tutorial._id}, {$set: {likes: tutorial.likes}}, (err) => {
            res.redirect(`/tutorials/${tutorial.name}`);
        })
    });
});
router.get('/dark-light', (req, res, next) => {
    var {session, tutorialID, dark} = req.query;
    session = parseInt(session);
    console.log(req.session)
    Tutorial.findById(tutorialID, (err, tutorial) => {
        if(req.session.darkMode)
            req.session.darkMode = false;
        else
            req.session.darkMode = true;
        res.redirect(`/tutorials/${tutorial.name}`);
    });
});
router.post('/add', upload.single('myFile'), (req, res, next) => {
    console.log(req.file);
    res.send('done');
});


module.exports = router;