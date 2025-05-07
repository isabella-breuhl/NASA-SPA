const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcrypt');

const guard = require('./routes/guard');
const indexRouter = require('./routes/index');
const dscovrRouter = require('./routes/dscovrPhotos');
const roverRouter = require('./routes/roverPhotos');
const authRouter = require('./routes/auth');
const publicRouter = require('./routes/site');
const featuresRouter = require('./routes/features');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'Green Bay Packers',
  resave: false,
  saveUninitialized: true,
  cookie : {
    secure: false,
    maxAge: 3600000
  }
}));

/* Connect to database via mongoose */
mongoose.connect('mongodb://138.49.184.25:27017')
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB\n\n', err));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/api', guard);
app.use('/api/dscovrPhotos', dscovrRouter);
app.use('/api/roverPhotos', roverRouter);
app.use('/api/features', featuresRouter);
app.use('/apod', publicRouter);

app.use('*', (req, res, next) => {
  res.sendfile(__dirname + '/public/index.html');
});

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
