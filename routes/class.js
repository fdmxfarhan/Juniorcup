var express = require('express');
var router = express.Router();
const Class = require('../models/Class');
var excel = require('excel4node');

router.get('/', (req, res, next) => {
    Class.find({}, (err, classes) => {
        res.render('./class/classes', {
            user: req.user,
            classes,
        })
    })
});

router.post('/add-class', (req, res, next) => {
    var {title, name} = req.body;
    var newClass = new Class({title, name});
    newClass.save().then(cls => {
        res.redirect('/class');
    }).catch(err => {
        if(err) console.log(err);
    })
});

router.get('/class-view', (req, res, next) => {
    var {classID} = req.query;
    Class.findById(classID, (err, cls) => {
        res.render('./class/class-view', {
            user: req.user,
            cls,
        })
    })
});

router.post('/add-student', (req, res, next) => {
    var {classID, name} = req.body;
    Class.findById(classID, (err, cls) => {
        var students = cls.students;
        students.push({
            name: name,
            progress: 0,
            posetive: 0,
            negetive: 0,
            apsence:  0,
        });
        Class.updateMany({_id: classID}, {$set: {students}}, (err) => {
            res.redirect(`/class/class-view?classID=${classID}`)
        })
    })
});

router.get('/add-pluse', (req, res, next) => {
    var {classID, index} = req.query;
    Class.findById(classID, (err, cls) => {
        var students = cls.students;
        students[index].posetive += 1;
        Class.updateMany({_id: classID}, {$set: {students}}, (err) => {
            res.redirect(`/class/class-view?classID=${classID}`)
        })
    })
});

router.get('/add-minus', (req, res, next) => {
    var {classID, index} = req.query;
    Class.findById(classID, (err, cls) => {
        var students = cls.students;
        students[index].negetive += 1;
        Class.updateMany({_id: classID}, {$set: {students}}, (err) => {
            res.redirect(`/class/class-view?classID=${classID}`)
        })
    })
});

router.get('/zero-point', (req, res, next) => {
    var {classID, index} = req.query;
    Class.findById(classID, (err, cls) => {
        var students = cls.students;
        students[index].negetive = 0;
        students[index].posetive = 0;
        Class.updateMany({_id: classID}, {$set: {students}}, (err) => {
            res.redirect(`/class/class-view?classID=${classID}`)
        })
    })
});

router.get('/add-apsence', (req, res, next) => {
    var {classID, index} = req.query;
    Class.findById(classID, (err, cls) => {
        var students = cls.students;
        students[index].apsence += 1;
        Class.updateMany({_id: classID}, {$set: {students}}, (err) => {
            res.redirect(`/class/class-view?classID=${classID}`)
        })
    })
});

router.get('/decrease-apsence', (req, res, next) => {
    var {classID, index} = req.query;
    Class.findById(classID, (err, cls) => {
        var students = cls.students;
        students[index].apsence -= 1;
        Class.updateMany({_id: classID}, {$set: {students}}, (err) => {
            res.redirect(`/class/class-view?classID=${classID}`)
        })
    })
});
router.get('/delete-user', (req, res, next) => {
    var {classID, index} = req.query;
    Class.findById(classID, (err, cls) => {
        var students = cls.students;
        students.splice(index, 1);
        Class.updateMany({_id: classID}, {$set: {students}}, (err) => {
            res.redirect(`/class/class-view?classID=${classID}`)
        })
    })
});


module.exports = router;
