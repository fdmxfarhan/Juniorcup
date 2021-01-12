var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
var User = require('../models/User');

router.get('/', ensureAuthenticated,(req, res, next) => {
    if(req.user.role == 'user'){
        res.render('./dashboard/user-dashboard',{
            user: req.user
        });
    }
    else if(req.user.role == 'admin'){
        User.find({}, (err, users) => {
            res.render('./dashboard/admin-dashboard',{
                user: req.user,
                users
            });
        });
    }
});


module.exports = router;