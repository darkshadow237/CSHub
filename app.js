var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var engines = require('consolidate');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');
var assert = require('assert');
var engines = require('consolidate');
var session = require('express-session');
var MongoClient = require('mongodb').MongoClient;

var index = require('./routes/index');
var users = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views/'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
//app.engine('html', engines.nunjucks);
//app.set('view engine', 'html');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(session({secret:'aman'}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public/stylesheets'));
app.use(express.static(__dirname + '/public/javascripts'));
app.use(express.static(__dirname + '/public/images'));
app.use(express.static(__dirname + '/public/fonts'));
app.use(express.static(__dirname + '/public/font-awesome'));
app.use(express.static(__dirname + '/views'));

app.use('/', index);
app.use('/users', users);


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
