var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


router.get('/', (req, res, next) => {
    res.render('./docs/home');
});

router.get('/soccer-light-python', (req, res, next) => {
    if(req.query.page)
        res.render(`./docs/soccer-light-python/${req.query.page}`, {page: parseInt(req.query.page)});
    else
        res.render(`./docs/soccer-light-python/1`, {page: 0});
});

module.exports = router;