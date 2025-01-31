var fs = require('fs');
var http = require('http');
var https = require('https');
const express = require('express')
const app = express()
var path = require('path');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('createerror');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport'); 

// routs requirement
var uploadHandler = require('./routes/upload');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dashboardRouter = require('./routes/dashboard');
var docsRouter = require('./routes/docs');
var leagues = require('./routes/leagues');
var game = require('./routes/game');
var payment = require('./routes/payment');
var classRoute = require('./routes/class');
var tutorialsRoute = require('./routes/tutorials');






// Mongo DB connect
mongoose.connect('mongodb://localhost/juniorcup', {useNewUrlParser: true, useUnifiedTopology: true}, (err) =>{
    if(err) throw err;
    else console.log('Database connected :)');
});

// express session middleware
const{
    SESS_NAME = 'sid',
    SESS_TIME = 10000 * 60 * 60 * 2 
} = process.env

app.use(session({
    name: SESS_NAME,
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: SESS_TIME ,
        sameSite: true,
        secure: false
    }
}));

// passport config
require('./config/passports')(passport);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

//Global vars
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// HTTPS key and ssl
var privateKey  = fs.readFileSync('ssl/server.key', 'utf8');
var certificate = fs.readFileSync('ssl/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

// port setup
const port = 3000

// Upload
app.use('/upload', uploadHandler);
app.use('/tutorials', tutorialsRoute);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// public path setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes Handlers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dashboard', dashboardRouter);
app.use('/docs', docsRouter);
app.use('/leagues', leagues);
app.use('/game', game);
app.use('/payment', payment);
app.use('/class', classRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    console.log(err);
    if(!req.user) res.render('error',{
        uname: false,
        user: false,
        err
    });
    else res.render('error', {
        uname: req.user.uname,
        user: req.user,
        err
    });
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

const io = require('socket.io')(httpsServer);
const io2 = require('socket.io')(httpServer);

var socketHandler = (socket, io) => {
    // console.log('a user connected');
    socket.on('disconnect', () => {
        // console.log('user disconnected');
    });
    socket.on('chatA', (msg) => {
        console.log(msg);
        io.emit('chatA', msg);
    });
    socket.on('chatB', (msg) => {
        console.log(msg);
        io.emit('chatB', msg);
    });
    socket.on('chatC', (msg) => {
        console.log(msg);
        io.emit('chatC', msg);
    });
    socket.on('chatD', (msg) => {
        console.log(msg);
        io.emit('chatD', msg);
    });
    socket.on('chatE', (msg) => {
        console.log(msg);
        io.emit('chatE', msg);
    });
    socket.on('chatF', (msg) => {
        console.log(msg);
        io.emit('chatF', msg);
    });
    socket.on('chatG', (msg) => {
        console.log(msg);
        io.emit('chatG', msg);
    });
    socket.on('chatH', (msg) => {
        console.log(msg);
        io.emit('chatH', msg);
    });
    socket.on('chatI', (msg) => {
        console.log(msg);
        io.emit('chatI', msg);
    });
    socket.on('chatJ', (msg) => {
        console.log(msg);
        io.emit('chatJ', msg);
    });
    socket.on('chatK', (msg) => {
        console.log(msg);
        io.emit('chatK', msg);
    });
}

io.on('connection', socket => socketHandler(socket, io));
io2.on('connection', socket => socketHandler(socket, io2));


httpServer.listen(3000);
httpsServer.listen(443);
console.log('Juniorcup server is started :)')

// app.listen(port, () => {
//   console.log(`Juniorcup is started at port ${port}`);
// });


var seo = require('express-seo')(app);
 
// For internatanalization, set the supported languages
seo.setConfig({
    langs: ["en", "fa"]
});
 
// Set the default tags
seo.setDefaults({
    // html: "<a href='https://www.instagram.com/junior_cup/'>Follow me on instagram</a>" // Special property to insert html in the body (interesting to insert links)
    title: "جونیورکاپ", // Page title
    // All the other properties will be inserted as a meta property
    description: {
        en: "juniorcup",
        fa: "جونیور کاپ"
    },
    image: "https://juniorcup.ir/images/landing/Juniorcup2021b-min.jpg"
});
 
// Create an seo route
seo.add("/contact", function(req, opts, next) {
    /*س
    req: Express request
    opts: Object {
        service: String ("facebook" || "twitter" || "search-engine")
        lang: String (Detected language)
    }
    */
    next({
        description: "برگزاری سیزدهمین دوره برگزاری مسابقات رباتیک جوینورکاپ"
    });
});

