var mongoose = require('mongoose');

var websiteSchema = mongoose.Schema({
    // _ means this is a reference to another object
    _user: {type: mongoose.Schema.ObjectId, ref: 'userModel'},
    name: String,
    description: String,
    dataCreated: {type: Date, default: Date.now}
}, {collection: "website"});


module.exports = websiteSchema;