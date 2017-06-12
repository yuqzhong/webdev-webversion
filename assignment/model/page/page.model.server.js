var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('pageModel', pageSchema);
var websiteModel = require('./../website/website.model.server');

pageModel.findPagesByWebsite = findPagesByWebsite;
pageModel.createPage = createPage;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.deletePagesForWebsite = deletePagesForWebsite;
pageModel.addWidget = addWidget;
pageModel.deleteWidget = deleteWidget;

module.exports = pageModel;

//////interact with widget////////
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
        return websiteModel
            .deletePage(websiteId, pageId);
    });
}
