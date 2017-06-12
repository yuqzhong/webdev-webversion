var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('pageModel', pageSchema);

pageModel.findPagesByWebsite = findPagesByWebsite;
pageModel.createPage = createPage;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.deletePagesForWebsite = deletePagesForWebsite;
pageModel.addWidget = addWidget;
pageModel.deleteWidget = deleteWidget;
pageModel.reorderWidget = reorderWidget;

module.exports = pageModel;

//////interact with widget////////
function reorderWidget(pageId, index1, index2) {

    return pageModel
        .findById(pageId)
        .then(function (page) {
            // console.log(page);
            var widget = page.widgets[index1];
            // console.log("2");
            page.widgets.splice(index1, 1);
            page.widgets.splice(index2, 0, widget);
            // console.log("#2");
            return page.save();
        });

    // var firstItem = widgetModel.findOne({_page: pageId});
    // var firstIndex = widgetModel.indexOf(firstItem);
    //
    // var index = firstIndex + index1;
    //
    // var widget = widgets[index];
    // widgets.splice(index, 1);
    //
    //
    // widgets.splice(index2 + firstIndex, 0, widget);
    // // console.log(widgets);
    // res.json(widgets);

}

function addWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            console.log(page);
            page.widgets.push(widgetId);
            return page.save();
        })
}

function deleteWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            // console.log(website);
            var index = page.widgets.indexOf(widgetId);
            // console.log(index);
            page.widgets.splice(index, 1);
            // console.log(website);
            return page.save();
        })
}


/////////interact with website//////
function deletePagesForWebsite(websiteId) {
    return pageModel
        .remove({_website: websiteId});
}

function findPagesByWebsite(websiteId) {
    return pageModel
        .find({_website: websiteId})
        .populate('_website')
        .exec();
}

function createPage(websiteId, page) {
    // console.log(page);
    page._website = websiteId;
    return pageModel
        .create(page)
        .then(function (page) {

            var websiteModel = require('./../website/website.model.server');
            // console.log(page._id);
            return websiteModel
                .addPage(websiteId, page._id);
        });
}
function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function updatePage(pageId, page) {
    return pageModel.update({_id: pageId}, {$set: page});
}

function deletePage(websiteId, pageId) {
    return pageModel
        .remove({_id: pageId})
        .then(function (status) {

            var websiteModel = require('./../website/website.model.server');
            return websiteModel
                .deletePage(websiteId, pageId);
        });
}
