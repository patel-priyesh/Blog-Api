var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var auhorRouter = require('./routes/author');
var adminRouter = require('./routes/admin');
var blogRouter = require('./routes/blog');
var cors = require('cors')
var categoryrouter = require('./routes/category');

const mongoose = require("mongoose")

mongoose
    .connect('mongodb://127.0.0.1:27017/blog-api')
    .then(() => console.log('Connected!'))
    .catch((er) => console.log(er));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/author', auhorRouter);
app.use('/admin', adminRouter);
app.use('/blog', blogRouter);
app.use('/category', categoryrouter);

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
