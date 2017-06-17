const app = require('../../express');
var websiteModel = require('../model/website/website.model.server');
var passport = require('passport');

//
// var websites = [
//     { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
//     { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
//     { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
//     { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
//     { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
//     { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
//     { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
// ];


app.get('/api/assignment/website', findWebsitesByUser);
app.post('/api/assignment/website', createWebsite);
app.get('/api/assignment/website/:websiteId', findWebsiteById);
app.put('/api/assignment/website/:websiteId', updateWebsite);
app.delete('/api/assignment/website/:websiteId', deleteWebsite);

function findWebsitesByUser(req, res) {
    var userId = req.user._id;
    websiteModel
        .findWebsitesByUser(userId)
        .then(function (response) {
            res.json(response);
        });
}

function createWebsite(req, res) {
    var website = req.body;
    var userId = req.user._id;
    // console.log(website.name + " website.server");

    websiteModel
        .createWebsite(userId, website)
        .then(function (response) {
            res.json(response);
        })
}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var userId = req.user._id;


    websiteModel
        .deleteWebsite(userId, websiteId)
        .then(function (status) {
            res.json(status);
        });
}

function findWebsiteById(req, res) {
    var websiteId = req.params.websiteId;
    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            res.json(website);
        }, function (status) {
            res.send(status);
        });

}


function updateWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var website = req.body;

    websiteModel
        .updateWebsite(websiteId, website)
        .then(function (status) {
            res.send(status);
        }, function (status) {
            res.send(status);
        });
}

