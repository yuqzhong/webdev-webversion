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

module.exports = pageModel;

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
