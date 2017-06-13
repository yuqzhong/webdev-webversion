var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('widgetModel', widgetSchema);
// var websiteModel = require('../website/website.model.server');

widgetModel.findWidgetsByPage = findWidgetsByPage;
widgetModel.createWidget = createWidget;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.deleteWidgetsForPage = deleteWidgetsForPage;
// widgetModel.reorderWidget = reorderWidget;
widgetModel.uploadImage = uploadImage;

module.exports = widgetModel;


function uploadImage(widgetId, filename) {

    return widgetModel.findById(widgetId)
        .then(function (widget) {
            widget.url = '/assignment/uploads/' + filename;
            return widget.save();
        })
}

// interact with pageModel//
function deleteWidgetsForPage(pageId) {
    console.log(pageId);
    return widgetModel
        .remove({_page: pageId});
}

function findWidgetsByPage(pageId) {
    var pageModel = require('../page/page.model.server');

    return pageModel
        .findPageById(pageId)
        .populate('widgets')
        .exec()
        .then(function (page) {
            return page.widgets;
        })
}

function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel
        .create(widget)
        .then(function (widget) {
            // return widget;
            // console.log(widget._id);
            var pageModel = require('../page/page.model.server');

            return pageModel
                .addWidget(pageId, widget._id)
                .then(function (status) {
                    return widget;
                })
        });
}

function deleteWidget(pageId, widgetId) {
    return widgetModel
        .remove({_id: widgetId})
        .then(function (status) {
            var pageModel = require('../page/page.model.server');

            return pageModel
                .deleteWidget(pageId, widgetId);
        });
}

////////only me/////////////////////////////////

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widgetId}, {$set: widget});
}



