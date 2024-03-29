var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users/users');
var reportRouter = require('./routes/reports/report');
var eventsRouter = require('./routes/events/events');
var adminRouter = require('./routes/users/admin/adminAuth');
var mailRouter = require('./routes/mail/mail');
var chatsRouter = require('./routes/chats/chat');
var matchsRouter = require('./routes/matchs/match');
var testRouter = require('./routes/test/single');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/mail', mailRouter);
app.use('/chats', chatsRouter);
app.use('/matchs', matchsRouter);
app.use('/report', reportRouter);
app.use('/events', eventsRouter);
app.use('/users/admin', adminRouter);
app.use('/test', testRouter);
app.use('/public/images', express.static('public/images'));

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
  res.render('error');
});

module.exports = app;
