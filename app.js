let createError = require('http-errors');
let express = require('express');
let path = require('path');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let todoRouter = require('./routes/TodoRoutes');
let usersRouter = require('./routes/UsersRoutes');

let config = require('./config/config');
let mongoose = require('mongoose');
let connect = mongoose.connect(config.db.url);

// Connection with database
connect
    .then((db) => console.log('Connected Successfully To Database\n'+config.db.url))
    .catch((err) => console.log(err));


let app = express();



app.use(logger(config.env));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/todo',todoRouter);
app.use('/users', usersRouter);

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
