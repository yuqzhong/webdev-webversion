var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    firstName: String,
    lastName: String,

    roles: [{
        type: String,
        default: 'USER',
        enum: ['USER', 'ADMIN']
    }],

    email: String,
    phone: String,
    websites: [{type: mongoose.Schema.ObjectId, ref: 'websiteModel'}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "user"});


module.exports = userSchema;