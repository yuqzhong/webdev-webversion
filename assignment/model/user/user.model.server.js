var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('userModel', userSchema);
var websiteModel = require('../website/website.model.server');

userModel.createUser = createUser;
userModel.deleteUser = deleteUser;

userModel.updateUser = updateUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findAllUsers = findAllUsers;

userModel.addWebsite = addWebsite;
userModel.deleteWebsite = deleteWebsite;


module.exports = userModel;


function deleteWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            return user.save();
        })
        .catch(function (status) {
            console.log(status);
        });
}

function addWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            // mentioned in class that when to use save & when to user update
            // save is to let mongo know that this item is updated
            return user.save();
        })
}

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findAllUsers() {
    return userModel.find();
}


function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function updateUser(userId, newUser) {
    delete newUser.username;
    return userModel.update({_id: userId}, {$set: newUser});
}

function deleteUser(userId) {
    return userModel
        .remove({_id: userId})
        .then(function (status) {
            return websiteModel
                .deleteWebsitesForUser(userId);
        })
}