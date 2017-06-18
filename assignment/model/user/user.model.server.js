var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('userModel', userSchema);
// var bcrypt = require('bcrypt-nodejs');

userModel.createUser = createUser;
userModel.deleteUser = deleteUser;

userModel.updateUser = updateUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findAllUsers = findAllUsers;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.findUserByFacebookId = findUserByFacebookId;

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
    if (!user.roles) {
        user.roles = ['USER'];
    } else if (user.roles.indexOf(',') > -1) {
        user.roles = user.roles.split(',');
    }
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findAllUsers() {
    return userModel.find();
}

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id': googleId});
}

function findUserByFacebookId(facebookId) {
    return User.findOne({'facebook.id': facebookId});
}


function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserByCredentials(username) {
    return userModel
        // .findOne({username: username, password: password})
        // .then(function (user) {
        //     return user;
        // })

        .findOne({username: username})
        .then(function (user) {
             return user;
        })
}

function updateUser(userId, user) {
    delete user.username;
    if (!user.roles) {
        user.roles = ['USER'];
    } else if (user.roles.indexOf(',') > -1) {
        user.roles = user.roles.split(',');
    }

    return userModel.update({_id: userId}, {$set: user});
}

function deleteUser(userId) {
    var websiteModel = require('../website/website.model.server');

    return userModel
        .remove({_id: userId})
        .then(function (status) {
            return websiteModel
                .deleteWebsitesForUser(userId);
        })
}