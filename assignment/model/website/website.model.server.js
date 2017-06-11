var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('websiteModel', websiteSchema);
var userModel = require('../user/user.model.server');

websiteModel.findWebsitesByUser = findWebsitesByUser;
websiteModel.createWebsite = createWebsite;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.deleteWebsitesForUser = deleteWebsitesForUser;

module.exports = websiteModel;

function deleteWebsitesForUser(userId) {
    return websiteModel
        .remove({_user: userId});
}

function findWebsitesByUser(userId) {
    return websiteModel
        .find({_user: userId})
        .populate('_user')
        .exec();
    /////////////// dont know!!!!
}

function createWebsite(userId, website) {
    // console.log(website);
    website._user = userId;
    return websiteModel
        .create(website)
        .then(function (website) {
            // console.log(website);
            return userModel
                .addWebsite(userId, website._id);
        });
}
function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId, website) {
    return websiteModel.update({_id: websiteId}, {$set: website});
}

function deleteWebsite(userId, websiteId) {
    return websiteModel
        .remove({_id: websiteId})
        .then(function (status) {
            return userModel
                .deleteWebsite(userId, websiteId);
        });
}
