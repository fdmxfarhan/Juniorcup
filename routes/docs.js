var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


router.get('/', (req, res, next) => {
    res.render('./docs/home');
});

router.get('/soccer-sim', (req, res, next) => {
    if(req.query.page)
        res.render(`./docs/soccer-sim/${req.query.page}`, {page: parseInt(req.query.page)});
    else
        res.render(`./docs/soccer-sim/1`, {page: 0});
});
router.get('/soccer-light-python', (req, res, next) => {
    if(req.query.page)
        res.render(`./docs/soccer-light-python/${req.query.page}`, {page: parseInt(req.query.page)});
    else
        res.render(`./docs/soccer-light-python/1`, {page: 0});
});
router.get('/soccer-light-cpp', (req, res, next) => {
    if(req.query.page)
        res.render(`./docs/soccer-light-cpp/${req.query.page}`, {page: parseInt(req.query.page)});
    else
        res.render(`./docs/soccer-light-cpp/1`, {page: 0});
});
router.get('/soccer-open-cpp', (req, res, next) => {
    if(req.query.page)
        res.render(`./docs/soccer-open-cpp/${req.query.page}`, {page: parseInt(req.query.page)});
    else
        res.render(`./docs/soccer-open-cpp/1`, {page: 0});
});

router.get('/smartcar-cpp', (req, res, next) => {
    if(req.query.page)
        res.render(`./docs/smartcar-cpp/${req.query.page}`, {page: parseInt(req.query.page)});
    else
        res.render(`./docs/smartcar-cpp/1`, {page: 0});
});


module.exports = router;