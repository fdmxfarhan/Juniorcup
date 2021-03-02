var express = require('express');
var path = require('path');
var router = express.Router();
var bodyparser = require('body-parser');
const multer = require('multer');
const mail = require('../config/mail');
const {ensureAuthenticated} = require('../config/auth');
const User = require('../models/User');
const Game = require('../models/Game');
const mkdirp = require('mkdirp');

router.use(bodyparser.urlencoded({extended: true}));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = 'public/files/' + Date.now().toString();
        mkdirp(dir, err => cb(err, dir));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage });

router.post('/code', ensureAuthenticated, upload.single('myFile'), (req, res, next) => {
    const file = req.file;
    if (!file) {
        res.send('no file to upload');
    }
    else{
        var userFile = req.user.file;
        userFile.push({
            date: Date.now(),
            path: file.destination.slice(6),
            name: file.originalname
        });
        User.updateOne({_id: req.user._id}, {$set: {file: userFile}}, (err, doc) => {
            if(err) console.log(err);
            res.redirect('/dashboard');
        });
    }
});

module.exports = router;






