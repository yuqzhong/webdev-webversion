var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {tupe: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    websites: [{type: mongoose.Schema.ObjectId, ref: "websiteModel"}],
    dataCreated: {type: Date, default: Date.now}
}, {collection: "user"});


modules.exports = userSchema;