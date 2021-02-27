var express = require('express');
var path = require('path');
var router = express.Router();
var bodyparser = require('body-parser');
const multer = require('multer');
const mail = require('../config/mail');
const {ensureAuthenticated} = require('../config/auth');
const User = require('../models/User');
const Game = require('../models/Game');

router.use(bodyparser.urlencoded({extended: true}));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/files')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

router.post('/code', ensureAuthenticated, upload.single('myFile'), (req, res, next) => {
    
});

module.exports = router;






