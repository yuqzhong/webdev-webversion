const app = require('../../express');
var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});
var widgetModel = require('../model/widget/widget.model.server');
var passport = require('passport');


app.post('/api/upload', upload.single('myFile'), uploadImage);

app.post('/api/assignment/page/:pageId/widget', createWidget);
app.get('/api/assignment/page/:pageId/widget', findWidgetsByPageId);
app.get('/api/assignment/widget/:widgetId', findWidgetById);
app.put('/api/assignment/widget/:widgetId', updateWidget);
app.delete('/api/assignment/page/:pageId/widget/:widgetId', deleteWidget);
app.put("/api/assignment/page/:pageId/widget", orderWidget);

function createWidget(req, res) {
    // console.log("in server- widget - create widget");
    var pageId = req.params.pageId;
    var widget = req.body;
    // console.log("pageId: "+pageId);
    // console.log(widget);


    widgetModel
        .createWidget(pageId, widget)
        .then(function (widget) {
            // console.log("success - in server- widget - create widget -widget:" + widget);
            res.json(widget);
        },function(err){
            // console.log("failt - in server- widget - create widget -err:" + err);

        });

}

function findWidgetsByPageId(req, res) {
    var pageId = req.params.pageId;
    // var results = [];

    widgetModel
        .findWidgetsByPage(pageId)
        .then(function (widgets) {
            res.json(widgets);
        });
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;


    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget);
        });


}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    var pageId = req.params.pageId;


    widgetModel
        .deleteWidget(pageId, widgetId)
        .then(function (status) {
            res.json(status);
        })

}

function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var widget = req.body;

    widgetModel
        .updateWidget(widgetId, widget)
        .then(function (status) {
            res.json(status);
        });
}

function uploadImage(req, res) {


    var widgetId = req.body.widgetId;
    var myFile = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    if (typeof req.file === 'undefined') {
        res.redirect('../assignment/index.html#!/website/' + websiteId + '/page/' + pageId + '/widget'
        );
        return;
    }

    // var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    // var path = myFile.path;         // full path of uploaded file
    // var destination = myFile.destination;  // folder where file is saved to
    // var size = myFile.size;
    // var mimetype = myFile.mimetype;


    widgetModel
        .uploadImage(widgetId, filename)
        .then(function (status) {
            var callbackUrl = "/assignment/#!/website/" + websiteId + "/page/" + pageId + "/widget";

            res.redirect(callbackUrl);
        });


}

function orderWidget(req, res) {
    var pageId = req.params.pageId;
    var index1 = parseInt(req.query.initial);
    var index2 = parseInt(req.query.final);

    var pageModel = require('../model/page/page.model.server');

    pageModel
        .reorderWidget(pageId, index1, index2)
        .then(function (widgets) {
            res.json(widgets);
        });
}
