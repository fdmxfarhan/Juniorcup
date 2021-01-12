var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
var User = require('../models/User');

router.get('/', ensureAuthenticated,(req, res, next) => {
    res.render('./dashboard/user-dashboard',{
        user: req.user
    });
});
router.get('/users',(req, res, next) => {
    User.updateMany({username: 'fdmxfarhan'}, {$set: {role: 'admin'}}, (err, res) => {
        if(err) console.log(err);
    })
    User.find({}, (err, users) => {
        if(err) console.log(err);
        console.log(users);
        res.render('./dashboard/users',{
            users
        });
    });
});


module.exports = router;