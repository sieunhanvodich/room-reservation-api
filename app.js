var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var config = require('./config/config');
var indexRouter = require('./routes/index');
var userController = require('./controller/user.controller');
var cors = require('cors')
const auth = require('./auth/auth')

// connect to mongodb
mongoose.connect(config.mongodb.url, {useNewUrlParser: true}, () => console.log('connected'));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());


app.get('/', auth, (req, res) => {
  try {
    // console.log('req', req.token)
    res.json({success: 'ok'});
  } catch (err) {
    console.log(err)
  }
})

app.post('/login', userController.login)
app.get('/roomlist', (req, res) => res.send('This is roomlist'));
app.get('/booking', (req, res) => res.send('This is booking page'));




app.use('/api',indexRouter);

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
