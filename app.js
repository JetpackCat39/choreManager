var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
var index = require('./routes/index');
var login = require('./routes/login');
var app = express();
var tasks = [{"desc": "one", "reward": "oneRew"}, {"desc": "two", "reward": "twoRew"}, {"desc": "three", "reward": "threeRew"}];

// mongoose.connect('ds149201.mlab.com:49201/taskmaster');

app.set('tasks', tasks);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var session = require('express-session');
session.loggedIn = false;
// function logIn() {
//     if(session.loggedIn)
//         session.loggedIn = false;
//     else
//         session.loggedIn = true;
// }
app.set('sess', session);
console.log(session.loggedIn);
if(session.loggedIn === true) {
    app.use('/', index);
} else {
    app.use('/', login);
}
app.use('/login', login);

// mongoose.connect('mongodb://admin:password@ds149201.m-lab.com:49201/taskmaster');

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
