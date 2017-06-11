var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
    _website: {type: mongoose.Schema.ObjectId, ref: 'websiteModel'},
    name: String,
    title: String,
    description: String,
    widgets:[{type:mongoose.Schema.ObjectId,ref:'widgetModel'}],
    dataCreated: {type: Date, default: Date.now}
}, {collection: "page"});

module.exports = pageSchema;