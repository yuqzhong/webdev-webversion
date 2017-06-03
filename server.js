var express = require('./express');
// var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());// parse the body
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

var ourApp = require('./lectures/angular/app.js');
ourApp(app);

require ("./test/app.js")(app);
// require('./public/app.js')();
// dont know need it or not
var port = process.env.PORT || 3000;

app.listen(port);