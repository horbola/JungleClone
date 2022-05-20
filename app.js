
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var robots = require('express-robots-txt');

var indexRouter = require('./routes/index');
var loggableRouter = require('./routes/loggable');
var nonLoggableRouter = require('./routes/non-loggable');
var adminRouter = require('./routes/admin');



var app = express();

app.locals.loggedIn = false;

var appUrlGlobal = "https://affiliate-program-amz.com";
var appUrlLocal = "http://localhost:3000/AmazAffClone";
app.locals.appUrl = appUrlLocal;

var appNameWrapper = "/AmazAffClone";
var appNameEmpty = "";
app.locals.appName = appNameWrapper;

// these variables are used to switching around development js files and
// production js files again and again. use this in the jade files as src
// attribute and change the variable in appropriate case.
var devRes = {
    // though path name must be precedded buy 'views'
    // in webpack.config but here it's not needed.
    assoHome: 'page/home/asso-home/asso-home.js',
    visitorHome2: 'page/home/visitor-home-2/visitor-home-2.js',
    reports: 'page/reports/reports.js',
    commissions1: 'page/reports/tabs-frags/commissions/commissions_1.js',
    FAcss: '/vendor/fontawesome-free-5.13.0-web/css/all.css',
    Bcss: '/vendor/bootstrap-4.3.1-dist/css/bootstrap.css',
    jquery: '/vendor/jquery-3.5.0.js',
    popper: '/vendor/popper-1.16.1/javascript/popper.js',
    Bjs: '/vendor/bootstrap-4.3.1-dist/js/bootstrap.js'
};
var prodRes = {
    assoHome: 'js/page/home/asso-home.js',
    visitorHome2: 'js/page/home/visitor-home-2.js',
    reports: 'js/page/reports.js',
    commissions1: 'js/page/reports/tabs-frags/commissions_1.js',
    FAcss: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css',
    Bcss: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css',
    jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js',
    popper: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js',
    Bjs: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js'
};
app.locals.jsRes = devRes;

app.use(robots(__dirname + '/robots.txt'));
app.set('view engine', 'jade');
// view, static folders and view engine setup
// separate decleration of view folders like static folders doesn't work
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(app.locals.appName+'/', indexRouter);
app.use(app.locals.appName+'/', loggableRouter);
app.use(app.locals.appName+'/', nonLoggableRouter);
app.use(app.locals.appName+'/', adminRouter);


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
  res.render('errors/404');
});

module.exports = app;
