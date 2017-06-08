var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('websiteModel', websiteSchema);
var userModel = mongoose.model('', userSchema);

websiteModel.findWebsitesByUser = findWebsitesByUser;
websiteModel.createWebsite = createWebsite;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;



module.exports = websiteModel;

function findWebsitesByUser() {
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
            return userModel
                .addWebsite(userId, website._id)
        })
}
function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId, website) {
    return websiteModel.update({_id:websiteId},{$set: website});
}

function deleteWebsite(userId, websiteId) {
    return websiteModel
        .remove
    // didnt finished yet
}
