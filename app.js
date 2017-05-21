var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var index = require('./routes/index');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var app = express();

var tasks = [{"desc": "one", "reward": "oneRew"}, {"desc": "two", "reward": "twoRew"}, {"desc": "three", "reward": "threeRew"}];

app.get('/login', function(req, res) {
    res.sendfile('views/login.html');
});

app.set('tasks', tasks);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

//defining login handler routes
app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/loginSuccess',
        failureRedirect: '/loginFailure'
    })
);

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

//passport initializing
passport.use(new LocalStrategy(function(username, password, done) {
    process.nextTick(function() {
        // Auth Check Logic
    });
}));

app.get('/loginFailure', function(req, res, next) {
    res.send('Failed to authenticate');
});

app.get('/loginSuccess', function(req, res, next) {
    res.send('Successfully authenticated');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
