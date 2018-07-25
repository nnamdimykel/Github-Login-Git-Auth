var express  = require('express');
var port     = process.env.PORT || 5045;
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
var passport = require('passport');
var flash    = require('connect-flash');
var expressHbs = require('express-handlebars');
var path = require('path');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var MongoStore	=	require('connect-mongo')(session);
var app      = express();

var uristring = process.env.MONGODB_URI || 'mongodb://127.0.0.1/GH-AUTH';
mongoose.connect(uristring);

require('./config/passport')(passport); // pass passport for configuration

app.engine('.hbs', expressHbs({extname: '.hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // read cookies (needed for auth)

// required for passport
app.use(session({
 secret: 'h0jbv7t7ubgdjd8627uf4t7t', // this string of text fit be anything random
 resave: false,
 saveUninitialized: false,
 store: new MongoStore({ mongooseConnection: mongoose.connection }),
 cookie: { maxAge: 180 * 60 * 1000 }
})); // session secret
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(express.static(path.join(__dirname, '/public')));

app.use(function(req, res, next) {
	res.locals.login = req.isAuthenticated(); // global function to check a user's auth state
	res.locals.session = req.session; // stores the user's session
	next();
});

// routes ======================================================================
require('./routes/index.js')(app, passport);

// launch ======================================================================
app.listen(port);
console.log('your work starts on port ' + port);
