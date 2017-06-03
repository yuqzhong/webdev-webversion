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

function findWebsitesByUser() {
    var results = [];

    for(var w in websites) {
        if(websites[w].developerId === req.params.userId) {
            // websites[w].created = new Date();
            // websites[w].accessed = new Date();
            results.push(websites[w]);
        }
    }

    req.json(results);
}

