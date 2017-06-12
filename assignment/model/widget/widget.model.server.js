var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('widgetModel', widgetSchema);
var websiteModel = require('../website/website.model.server');

widgetModel.findWidgetsByPage = findWidgetsByPage;
widgetModel.createWidget = createWidget;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.deleteWidgetsForPage = deleteWidgetsForPage;
widgetModel.reorderWidget = reorderWidget;
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
    return widgetModel
        .remove({_page: pageId});
}

function findWidgetsByPage(pageId) {
    return widgetModel
        .find({_page: pageId})
        .populate('_page')
        .exec();
}

function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel
        .create(widget)
        .then(function (widget) {
            // console.log(widget._id);
            return pageModel
                .addWidget(pageId, widget._id);
        });
}

function deleteWidget(pageId, widgetId) {
    return widgetModel
        .remove({_id: widgetId})
        .then(function (status) {
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

function reorderWidget(pageId, index1, index2) {

    widgetModel.find().sort({_page: 1}).exec(function(err, docs) {});

    var firstItem = widgetModel.findOne({_page: pageId});
    var firstIndex = widgetModel.indexOf(firstItem);

    var index = firstIndex + index1;

    var widget = widgets[index];
    widgets.splice(index, 1);


    widgets.splice(index2 + firstIndex, 0, widget);
    // console.log(widgets);
    res.json(widgets);

}

