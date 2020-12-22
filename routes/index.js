var express = require('express');
var router = express.Router();
var Gallery = require('../models/Gallery');

router.get('/', (req, res, next) => {
    res.render('index');
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


module.exports = router;
