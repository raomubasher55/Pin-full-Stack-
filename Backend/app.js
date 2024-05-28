var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const expressSession = require('express-session');
const passport = require('passport');
const flash = require('flash');
 
var app = express();
var port = 5000; // You can change this to any port number you prefer
// app.use(cors(
//   // origin: 'http://localhost:5173',
//   // credentials: true
// ));
app.use('/images/uploads', express.static(path.join(__dirname, 'public/images/uploads')));


const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
};

app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: "your_session_secret_here" 
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  app.set('view engine', 'ejs');
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


module.exports = app;