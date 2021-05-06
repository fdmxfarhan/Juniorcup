var express = require('express');
var router = express.Router();
var Gallery = require('../models/Gallery');
const Team = require('../models/Team');
const Game = require('../models/Game');
var excel = require('excel4node');

const cospaceRooms = [
    {link: 'https://juniorcupsetup.ir/cospace/', name: 'اتاق داوران'},
    {link: 'https://juniorcupsetup.ir/co_space_abou_ali_sina/', name: 'مجتمع آموزشی ابوعلی سینا'},
    {link: 'https://juniorcupsetup.ir/co_space_danesh/', name: 'دانش'},
    {link: 'https://juniorcupsetup.ir/co_space_emam_ali/', name: 'خانه علم خاکسفید - جمعیت امام علی (ع)'},
    {link: 'https://juniorcupsetup.ir/co_space_farzanegan6/', name: 'دبیرستان فرزانگان ۶'},
    {link: 'https://juniorcupsetup.ir/co_space_hakim/', name: 'دبستان فردوسی حکیم'},
    {link: 'https://juniorcupsetup.ir/co_space_marlik/', name: 'مرکز نوآوری و پژوهشسرای دانش آموزی مارلیک'},
    {link: 'https://juniorcupsetup.ir/co_space_negah_nour/', name: 'دبیرستان دوره اول نگاه نو'},
    {link: 'https://juniorcupsetup.ir/co_space_salam_resalat/', name: 'دبیرستان سلام رسالت'},
    {link: 'https://juniorcupsetup.ir/co_space_salam_sadr/', name: 'دبیرستان دوره اول سلام صدر'},
    {link: 'https://juniorcupsetup.ir/co_space_sama/', name: 'دبیرستان غیردولتی دوره اول پسرانه سما 5'},
    {link: 'https://juniorcupsetup.ir/co_space_shayestegan_nour/', name: 'دبیرستان شایستگان نور (دوره اول)'},
]
const soccerRooms = [
    {link: 'https://juniorcupsetup.ir/soccer/', name: 'اتاق داوری'},
    {link: 'https://juniorcupsetup.ir/allameh_tabatabai/', name: 'دبیرستان علامه طباطبائی'},
    {link: 'https://juniorcupsetup.ir/farzanegan_1/', name: 'دبیرستان فرزانگان 1 دوره اول'},
    // {link: 'https://juniorcupsetup.ir/farzanegan_1_1_2/', name: ''},
    {link: 'https://juniorcupsetup.ir/farzanegan4_1/', name: 'دبیرستان فرزانگان 4 - دوره اول'},
    {link: 'https://juniorcupsetup.ir/farzanegan5_1/', name: 'دبیرستان فرزانگان ۵ دوره اول'},
    {link: 'https://juniorcupsetup.ir/farzanegan_6_1/', name: 'فرزانگان 6 دوره اول'},
    {link: 'https://juniorcupsetup.ir/farzanegan6_2/', name: 'فرزانگان 6 دوره دوم'},
    {link: 'https://juniorcupsetup.ir/farzanegan4/', name: 'دبیرستان فرزانگان 4 - دوره اول'},
    {link: 'https://juniorcupsetup.ir/farzanegan5_1/', name: 'دبیرستان فرزانگان ۵ دوره اول'},
    {link: 'https://juniorcupsetup.ir/helli10/', name: 'دبیرستان علامه حلی ۱۰ دوره اول'},
    // {link: 'https://juniorcupsetup.ir/helli10_1/', name: ''},
    {link: 'https://juniorcupsetup.ir/helli2_1/', name: 'علامه حلی 2 دوره اول'},
    {link: 'https://juniorcupsetup.ir/helli2_2/', name: 'علامه حلی 2 دوره دوم'},
    // {link: 'https://juniorcupsetup.ir/helli2_3/', name: ''},
    {link: 'https://juniorcupsetup.ir/helli5/', name: 'دبیرستان علامه حلی 5 دوره دوم'},
    {link: 'https://juniorcupsetup.ir/helli7_2/', name: 'دبیرستان حلی 7'},
    {link: 'https://juniorcupsetup.ir/marlik/', name: 'مرکز نوآوری و پژوهشسرای دانش آموزی مارلیک'},
    {link: 'https://juniorcupsetup.ir/mirza/', name: 'دبیرستان استعداد های درخشان میرزا کوچک خان رشت - دوره اول'},
    {link: 'https://juniorcupsetup.ir/salam_eslam_1/', name: 'دبیرستان دخترانه سلام اسلام - دوره اول'},
    {link: 'https://juniorcupsetup.ir/salam_eslam_2/', name: 'دبیرستان سلام فرمانیه'},
    {link: 'https://juniorcupsetup.ir/teknorobiran/', name: 'تکنوروبیران'},
]
const soccer2dRooms = [
    {link: 'https://juniorcupsetup.ir/eneregy_atomic_2d/', name: 'دبیرستان انرژی اتمی'},
    {link: 'https://juniorcupsetup.ir/farzanegan5_2d/', name: 'فرزانگان ۵'},
    {link: 'https://juniorcupsetup.ir/farzanegan7_2_2d/', name: 'فرزانگان 7 دوره دوم'},
]
const programmingRooms = [

    {link: 'https://juniorcupsetup.ir/programming_helli10_1/', name: 'دبیرستان علامه حلی 10 تهران دوره اول'},
    {link: 'https://juniorcupsetup.ir/programming_farzanegan_4/', name: 'فرزانگان 4'},
    {link: 'https://juniorcupsetup.ir/programming_farzanegan5/', name: 'فرزانگان ۵'},
    {link: 'https://juniorcupsetup.ir/programming_farzanegan6_2/', name: 'فرزانگان 6 دوره دوم'},
    {link: 'https://juniorcupsetup.ir/programming_farzanegan7_2/', name: 'فرزانگان 7 دوره دوم'},
    {link: 'https://juniorcupsetup.ir/programming_marimanookian/', name: 'دبیرستان دوره دوم ماری مانوکیان'},
    {link: 'https://juniorcupsetup.ir/programming_marlik/', name: 'مرکز نوآوری و پژوهشسرای دانش آموزی مارلیک'},
    {link: 'https://juniorcupsetup.ir/programming_sampad/', name: 'سمپاد رشت'},
    {link: 'https://juniorcupsetup.ir/programming_mirza/', name: 'دبیرستان تیزهوشان دوره اول میرزاکوچک خان ناحیه 1'},
    {link: 'https://juniorcupsetup.ir/programming_free/', name: 'تیم function'},
]
const smartcarRooms = [
    {link: 'https://juniorcupsetup.ir/smart_car_farzanegan1_1/', name: 'دبیرستان فرزانگان 1 دوره اول'},
    {link: 'https://juniorcupsetup.ir/smart_car_farzanegan5_1/', name: 'دبیرستان فرزانگان ۵ دوره اول'},
    {link: 'https://juniorcupsetup.ir/smart_car_farzanegan6_1/', name: 'دبیرستان فرزانگان 6 دوره اول'},
    {link: 'https://juniorcupsetup.ir/smart_car_helli10_1/', name: 'دبیرستان دوره اول علامه حلی 10'},
    {link: 'https://juniorcupsetup.ir/smart_car_marlik/', name: 'مرکز نوآوری و پژوهشسرای دانش آموزی مارلیک'},
    {link: 'https://juniorcupsetup.ir/smart_car_mirza/', name: 'دبیرستان استعداد های درخشان میرزا کوچک خان رشت - دوره اول'},
]

router.get('/', (req, res, next) => {
    var room = req.query.room;
    if(!room) room = 'soccer';
    Team.find({}, (err, teams) => {
        var soccerLightPrimaryNum = 0, soccerLightSecondaryNum = 0, soccerOpenNum = 0, smartCarNum = 0, cospaceNum = 0, programmingNum = 0, soccer2d = 0;
        for(var i=0; i < teams.length; i++)
        {
            if(teams[i].league == 'فوتبالیست سبک وزن primary')  soccerLightPrimaryNum++;
            if(teams[i].league == 'فوتبالیست سبک وزن secondary')  soccerLightSecondaryNum++;
            if(teams[i].league == 'فوتبالیست وزن آزاد') soccerOpenNum++;
            if(teams[i].league == 'امداد فضای مشترک')   cospaceNum++;
            if(teams[i].league == 'برنامه نویسی')       programmingNum++;
            if(teams[i].league == 'خودروهای هوشمند')    smartCarNum++;
            if(teams[i].league == 'فوتبال ۲ بعدی')      soccer2d++;
        }
        var user;
        if(req.user) 
        {
            user = req.user;
        }
        else         user = false;
        res.render('./game/home', {
            teams,
            soccerLightPrimaryNum,
            soccerLightSecondaryNum,
            soccerOpenNum,
            smartCarNum,
            cospaceNum,
            programmingNum,
            soccer2d,
            count: teams.length,
            cospaceRooms,
            soccerRooms,
            programmingRooms,
            smartcarRooms,
            soccer2dRooms,
            room,
            user
        });
    })
});

router.get('/soccer-light-primary', (req, res, next) => {
    var {field} = req.query;
    if(!field) field = 'A';
    var round = req.query.round;
    if(!round) round = 1;
    Team.find({league: 'فوتبالیست سبک وزن primary', payed: true}, (err, teams) => {
        Game.findOne({field: field, league: 'فوتبالیست سبک وزن primary', started: true}, (err, game) => {
            Game.find({league: 'فوتبالیست سبک وزن primary', round: round}, (err, games) => {
                if(err) console.log(err);
                // console.log(game);
                for(var i=1; i<teams.length; i++){
                    for(var j=0; j<teams.length - i; j++){
                        if(teams[j].score < teams[j + 1].score){
                            var temp = teams[j];
                            teams[j] = teams[j+1];
                            teams[j+1] = temp;
                        }
                        else if(teams[j].score == teams[j+1].score)
                        {
                            if(teams[j].goalzade - teams[j].goalkhorde < teams[j+1].goalzade - teams[j+1].goalkhorde)
                            {
                                var temp = teams[j];
                                teams[j] = teams[j+1];
                                teams[j+1] = temp;
                            }
                            else if(teams[j].goalzade - teams[j].goalkhorde == teams[j+1].goalzade - teams[j+1].goalkhorde)
                            {
                                if(teams[j].goalzade < teams[j+1].goalzade)
                                {
                                    var temp = teams[j];
                                    teams[j] = teams[j+1];
                                    teams[j+1] = temp;
                                }
                                else if(teams[j].goalzade == teams[j+1].goalzade)
                                {
                                    if(teams[j].win < teams[j+1].win)
                                    {
                                        var temp = teams[j];
                                        teams[j] = teams[j+1];
                                        teams[j+1] = temp;
                                    }
                                    else if(teams[j].win == teams[j+1].win)
                                    {
                                        if(teams[j].equals < teams[j+1].equals)
                                        {
                                            var temp = teams[j];
                                            teams[j] = teams[j+1];
                                            teams[j+1] = temp;
                                        }
                                        else if(teams[j].equals == teams[j+1].equals)
                                        {
                                            if(teams[j].goalkhorde > teams[j+1].goalkhorde)
                                            {
                                                var temp = teams[j];
                                                teams[j] = teams[j+1];
                                                teams[j+1] = temp;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                var user, team = null;
                if(req.user) 
                {
                    user = req.user;
                    teams.forEach(t => {
                        if(t._id == user.teamID) 
                            team = t;
                    });
                }
                else         user = false;
                res.render('./game/soccer-light-primary', {
                    teams,
                    field,
                    game,
                    games,
                    round,
                    user,
                    team,
                    page: '/game/soccer-light-primary'
                });
            });
        });
    });
});

router.get('/soccer-light-secondary', (req, res, next) => {
    var {field} = req.query;
    if(!field) field = 'C';
    var round = req.query.round;
    if(!round) round = 1;
    Team.find({league: 'فوتبالیست سبک وزن secondary', payed: true}, (err, teams) => {
        Game.findOne({field: field, league: 'فوتبالیست سبک وزن secondary', started: true}, (err, game) => {
            Game.find({league: 'فوتبالیست سبک وزن secondary', round: round}, (err, games) => {
                if(err) console.log(err);
                // console.log(game);
                for(var i=1; i<teams.length; i++){
                    for(var j=0; j<teams.length - i; j++){
                        if(teams[j].score < teams[j + 1].score){
                            var temp = teams[j];
                            teams[j] = teams[j+1];
                            teams[j+1] = temp;
                        }
                        else if(teams[j].score == teams[j+1].score)
                        {
                            if(teams[j].goalzade - teams[j].goalkhorde < teams[j+1].goalzade - teams[j+1].goalkhorde)
                            {
                                var temp = teams[j];
                                teams[j] = teams[j+1];
                                teams[j+1] = temp;
                            }
                            else if(teams[j].goalzade - teams[j].goalkhorde == teams[j+1].goalzade - teams[j+1].goalkhorde)
                            {
                                if(teams[j].goalzade < teams[j+1].goalzade)
                                {
                                    var temp = teams[j];
                                    teams[j] = teams[j+1];
                                    teams[j+1] = temp;
                                }
                                else if(teams[j].goalzade == teams[j+1].goalzade)
                                {
                                    if(teams[j].win < teams[j+1].win)
                                    {
                                        var temp = teams[j];
                                        teams[j] = teams[j+1];
                                        teams[j+1] = temp;
                                    }
                                    else if(teams[j].win == teams[j+1].win)
                                    {
                                        if(teams[j].equals < teams[j+1].equals)
                                        {
                                            var temp = teams[j];
                                            teams[j] = teams[j+1];
                                            teams[j+1] = temp;
                                        }
                                        else if(teams[j].equals == teams[j+1].equals)
                                        {
                                            if(teams[j].goalkhorde > teams[j+1].goalkhorde)
                                            {
                                                var temp = teams[j];
                                                teams[j] = teams[j+1];
                                                teams[j+1] = temp;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                var user, team = null;
                if(req.user) 
                {
                    user = req.user;
                    teams.forEach(t => {
                        if(t._id == user.teamID) 
                            team = t;
                    });
                }
                else         user = false;
                res.render('./game/soccer-light-secondary', {
                    teams,
                    field,
                    game,
                    games,
                    round,
                    user,
                    team,
                    page: '/game/soccer-light-secondary'
                });
            });
        });
    });
});

router.get('/soccer-open', (req, res, next) => {
    var {field} = req.query;
    if(!field) field = 'E';
    var round = req.query.round;
    if(!round) round = 1;
    Team.find({league: 'فوتبالیست وزن آزاد', payed: true}, (err, teams) => {
        Game.findOne({field: field, league: 'فوتبالیست وزن آزاد', started: true}, (err, game) => {
            Game.find({league: 'فوتبالیست وزن آزاد', round: round}, (err, games) => {
                if(err) console.log(err);
                // console.log(game);
                for(var i=1; i<teams.length; i++){
                    for(var j=0; j<teams.length - i; j++){
                        if(teams[j].score < teams[j + 1].score){
                            var temp = teams[j];
                            teams[j] = teams[j+1];
                            teams[j+1] = temp;
                        }
                        else if(teams[j].score == teams[j+1].score)
                        {
                            if(teams[j].goalzade - teams[j].goalkhorde < teams[j+1].goalzade - teams[j+1].goalkhorde)
                            {
                                var temp = teams[j];
                                teams[j] = teams[j+1];
                                teams[j+1] = temp;
                            }
                            else if(teams[j].goalzade - teams[j].goalkhorde == teams[j+1].goalzade - teams[j+1].goalkhorde)
                            {
                                if(teams[j].goalzade < teams[j+1].goalzade)
                                {
                                    var temp = teams[j];
                                    teams[j] = teams[j+1];
                                    teams[j+1] = temp;
                                }
                                else if(teams[j].goalzade == teams[j+1].goalzade)
                                {
                                    if(teams[j].win < teams[j+1].win)
                                    {
                                        var temp = teams[j];
                                        teams[j] = teams[j+1];
                                        teams[j+1] = temp;
                                    }
                                    else if(teams[j].win == teams[j+1].win)
                                    {
                                        if(teams[j].equals < teams[j+1].equals)
                                        {
                                            var temp = teams[j];
                                            teams[j] = teams[j+1];
                                            teams[j+1] = temp;
                                        }
                                        else if(teams[j].equals == teams[j+1].equals)
                                        {
                                            if(teams[j].goalkhorde > teams[j+1].goalkhorde)
                                            {
                                                var temp = teams[j];
                                                teams[j] = teams[j+1];
                                                teams[j+1] = temp;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                var user, team = null;
                if(req.user) 
                {
                    user = req.user;
                    teams.forEach(t => {
                        if(t._id == user.teamID) 
                            team = t;
                    });
                }
                else         user = false;
                res.render('./game/soccer-open', {
                    teams,
                    field,
                    game,
                    games,
                    round,
                    user,
                    team,
                    page: '/game/soccer-open'
                });
            });
        });
    });
});

router.get('/smartcar', (req, res, next) => {
    var {field} = req.query;
    if(!field) field = 'F';
    var round = req.query.round;
    if(!round) round = 1;
    Team.find({league: 'خودروهای هوشمند', payed: true}, (err, teams) => {
        Game.findOne({field: field, league: 'خودروهای هوشمند', started: true}, (err, game) => {
            Game.find({league: 'خودروهای هوشمند', round: round}, (err, games) => {
                if(err) console.log(err);
                var workbook = new excel.Workbook();
                var worksheet = workbook.addWorksheet('Sheet 1');
                var style = workbook.createStyle({
                    font: {
                    color: '#FF0800',
                    size: 12
                    },
                    numberFormat: '$#,##0.00; ($#,##0.00); -'
                });

                worksheet.cell(1,1).string(`teamName`).style(style);

                // console.log(game);
                for(var i=1; i<teams.length; i++){
                    for(var j=0; j<teams.length - i; j++){
                        if(teams[j].score < teams[j + 1].score){
                            var temp = teams[j];
                            teams[j] = teams[j+1];
                            teams[j+1] = temp;
                        }
                        else if(teams[j].score == teams[j+1].score)
                        {
                            if(teams[j].time < teams[j+1].time)
                            {
                                var temp = teams[j];
                                teams[j] = teams[j+1];
                                teams[j+1] = temp;
                            }
                        }
                    }
                }
                var user, team = null;
                if(req.user) 
                {
                    user = req.user;
                    teams.forEach(t => {
                        if(t._id == user.teamID) 
                            team = t;
                    });
                }
                else user = false;
                for (let i = 0; i < teams.length; i++) {
                    worksheet.cell(i+2,1).string(`${teams[i].teamName}`).style(style);
                }
                workbook.write('./public/smartcarList.xlsx');
                res.render('./game/smartcar', {
                    teams,
                    field,
                    game,
                    games,
                    round,
                    user,
                    team,
                    page: '/game/smartcar'
                });
            });
        });
    });
});

router.get('/cospace', (req, res, next) => {
    var {field} = req.query;
    if(!field) field = 'H';
    Team.find({league: 'امداد فضای مشترک', payed: true}, (err, teams) => {
        res.render('./game/cospace', {
            teams,
            field
        });
    });
});

router.get('/programming', (req, res, next) => {
    Team.find({league: 'برنامه نویسی', payed: true}, (err, teams) => {
        res.render('./game/programming', {teams});
    });
});

router.get('/soccer2d', (req, res, next) => {
    var field = 'L';
    Team.find({league: 'فوتبال ۲ بعدی', payed: true}, (err, teams) => {
        Game.findOne({field: field, league: 'فوتبال ۲ بعدی', started: true}, (err, game) => {
            if(err) console.log(err);
            // console.log(game);
            for(var i=1; i<teams.length; i++){
                for(var j=0; j<teams.length - i; j++){
                    if(teams[j].score < teams[j + 1].score){
                        var temp = teams[j];
                        teams[j] = teams[j+1];
                        teams[j+1] = temp;
                    }
                }
            }
            res.render('./game/soccer2d', {
                teams,
                field,
                game
            });
        });
    });
});

router.get('/virtual-rescue', (req, res, next) => {
    var {field} = req.query;
    if(!field) field = 'M';
    Team.find({league: 'virtual rescue', payed: true}, (err, teams) => {
        res.render('./game/virtual-rescue', {
            teams,
            field
        });
    });
});


module.exports = router;
