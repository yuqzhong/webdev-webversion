var app = require('./express');
// var bodyParser = require('body-parser');

var bodyParser = require('body-parser');
app.use(bodyParser.json());// parse the body
app.use(bodyParser.urlencoded({extended: true}));
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));
// app.use(app.express.static(__dirname + '/views'));

app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(session(
    {
        secret: process.env.SESSION_SECRET || 'hello',
        resave: true,
        saveUninitialized: true
    }));
app.use(passport.initialize());
app.use(passport.session());

// var ourApp = require('./lectures/angular/app.ejs');
// ourApp(app);

// require("./test/app.ejs")(app);
// require("./assignment/app");
// require("./project/app");
// require('./lectures/ejs/crud');
// require('./lectures/mongojs/index');
// require('./public/app.ejs')();

var application = {
    name: 'charterApp',
    entities: {
        "boat":{},
        'crew':{},
        'booking':{},
        'user':{}
    }
};
require('./lectures/wam/index')(application);


var port = process.env.PORT || 3000;

app.listen(port);