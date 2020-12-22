var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/gallery', (req, res, next) => {
    res.render('gallery');
});

module.exports = router;
