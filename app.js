var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');

var index = require('./routes/index');
var api = require('./routes/api');
var auth = require('./routes/auth');
var all = require('./routes/all');

var app = express();

var bs = require('browser-sync').create();
app.listen(3000, function () {
  bs.init({
    open: false,
    ui: false,
    notify: false,
    proxy: 'localhost:3000',
    files: ['./public/**/**.*', './**/*.ejs'],
    port: 8080
  });
  console.log('App (dev) is going to be running on port 8080 (by browsersync).');
});



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
app.use(session({ secret: 'sessionsecret' }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/api', api);
app.use('/auth', auth);
app.use('/all', all);

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
