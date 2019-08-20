var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var config = require('./config/config');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var user = require('./models/user.model');
var userController = require('./controller/user.controller');
var cors = require('cors');
var session = require('express-session');
var roomController = require('./controller/room.controller');
var participantController = require('./controller/participant.controller');
var cors = require('cors')
const auth = require('./auth/auth');
const bookingController = require('./controller/booking.controller');
const homeController = require('./controller/home.controller');

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
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.get('/', auth, (req, res) => {
  try {
    // console.log('req', req.token)
    res.json({success: 'ok'});
  } catch (err) {
    console.log(err)
  }
})
app.get('/branch', (req, res) => {
  res.send('This is branch');
})
app.post('/login', userController.login)

app.get('/roomlist', roomController.getRoomList);
app.get('/booking', (req, res) => res.send('This is booking page'));
app.get('/info', (req, res) => {
  user.find({name: 'duong'}, function(error, user) {
    res.json(user);
  });
})

app.post('/addMember', participantController.addMember);

app.post('/deleteMember', participantController.deleteMember);

app.get('/roomlist', (req, res) => res.send('This is roomlist'));
app.get('/booking', (req, res) => res.send('This is booking page'));
app.get('/info', userController.info)

app.get('/home1', homeController.getHomeContent);
// app.get('/home1', (req, res) => json({duong: 'deptraoi'}));
app.use('/users', usersRouter);

app.get('/deleteBooking', bookingController.deleteBooking);
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
  res.send(err);
});

module.exports = app;
