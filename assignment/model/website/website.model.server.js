var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('websiteModel', websiteSchema);
var userModel = require('./../user/user.model.server');
var pageModel = require('../page/page.model.server');

websiteModel.findWebsitesByUser = findWebsitesByUser;
websiteModel.createWebsite = createWebsite;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.deleteWebsitesForUser = deleteWebsitesForUser;
websiteModel.addPage = addPage;
websiteModel.deletePage = deletePage;

module.exports = websiteModel;

// interact with pageModel//
function addPage(websiteId, pageId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            console.log(website);
            website.pages.push(pageId);
            return website.save();
        })
}

function deletePage(websiteId, pageId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            console.log(website);
            var index = website.pages.indexOf(pageId);
            console.log(index);
            website.pages.splice(index, 1);
            console.log(website);
            return website.save();
        })
}

// interact with userModel//
function deleteWebsitesForUser(userId) {
    return websiteModel
        .remove({_user: userId})
        // .then(function (status) {
        //     return pageModel.deletePagesForWebsite()
        // })
}

function findWebsitesByUser(userId) {
    return websiteModel
        .find({_user: userId})
        .populate('_user')
        .exec();
    /////////////// dont know!!!!
}

function createWebsite(userId, website) {
    website._user = userId;
    return websiteModel
        .create(website)
        .then(function (website) {
            // console.log(website._id);
            return userModel
                .addWebsite(userId, website._id);
        });
}

function deleteWebsite(userId, websiteId) {
    return websiteModel
        .remove({_id: websiteId})
        .then(function (status) {
            return userModel
                .deleteWebsite(userId, websiteId);
        });
}

////////finders/////////////////////////////////

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId, website) {
    return websiteModel.update({_id: websiteId}, {$set: website});
}

