var mongoose = require('mongoose');

var widgetSchema = mongoose.Schema({
    _page: {type: mongoose.Schema.ObjectId, ref: 'pageModel'},
    type:{type: String, enum:['HEADING','IMAGE','YOUTUBE','HTML','INPUT']},
    name: String,
    text:String,
    palaceholder:String,
    description: String,
    url:String,
    width:String,
    height:String,
    rows:Number,
    size:Number,
    class:String,
    icon:String,
    deletable:Boolean,
    formatted:Boolean,
    dataCreated: {type: Date, default: Date.now}
}, {collection: "widget"});

module.exports = widgetSchema;