var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


router.get('/', (req, res, next) => {
    res.send('home');
});


module.exports = router;