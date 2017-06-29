var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
// mongoose.connect('mongodb://localhost/zhong-yuqing-webdev');

var connectionString = 'mongodb://localhost/zhong-yuqing-webdev';

if(process.env.MLAB_USERNAME_WEBDEV) {
    var username = process.env.MLAB_USERNAME_WEBDEV;
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds133271.mlab.com:33271/zhong-yuqing-webdev';
}



mongoose.connect(connectionString);

require('./service/user.service.server');
require('./service/website.service.server');
require('./service/page.service.server');
require('./service/widget.service.server');