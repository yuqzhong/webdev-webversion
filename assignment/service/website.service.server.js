const app = require('../../express');

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];


app.get('/api/assignment/user/:userId/website', findWebsitesByUser);
app.post('/api/assignment/user/:userId/website', createWebsite);
app.get('/api/assignment/website/:websiteId', findWebsiteById);
app.put('/api/assignment/website/:websiteId', updateWebsite);
app.delete('/api/assignment/website/:websiteId', deleteWebsite);

function findWebsitesByUser(req, res) {
    var results = [];

    for(var w in websites) {
        if(websites[w].developerId === req.params.userId) {
            results.push(websites[w]);
        }
    }

    res.json(results);
}

function createWebsite(req, res) {
    var website = req.body;
    website._id = (new Date()).getTime() + "";
    websites.push(website);
    res.json(website);
}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var website =  websites.find(function (website) {
        return website._id === websiteId;
    });
    if (website !== null) {
        var index = websites.indexOf(website);
        websites.splice(index, 1);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
}

function findWebsiteById(req, res) {
    var websiteId = req.params.websiteId;
    var website =  websites.find(function (website) {
        return website._id === websiteId;
    });
    if (website !== null) {
        res.json(website);
    } else {
        res.sendStatus(404);
    }

}


function updateWebsite(req,res) {
    var websiteId = req.params.websiteId;
    var website = req.body;
    for (var w in websites) {
        if (websites[w]._id === websiteId) {
            websites[w] = website;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

