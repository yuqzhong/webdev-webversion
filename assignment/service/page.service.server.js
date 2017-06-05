const app = require('../../express');

var pages = [
    {
        "_id": "321",
        "name": "Post 1",
        "websiteId": "456",
        "description": "Lorem"
    },
    {
        "_id": "432",
        "name": "Post 2",
        "websiteId": "456",
        "description": "Lorem"
    },
    {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
];


app.get('/api/assignment/website/:websiteId/page', findPagesByWebsiteId);
app.post('/api/assignment/website/:websiteId/page', createPage);
app.get('/api/assignment/page/:pageId', findPageById);
app.put('/api/assignment/page/:pageId', updatePage);
app.delete('/api/assignment/page/:pageId', deletePage);

function createPage(req, res) {
    var page = req.body;
    page._id = (new Date()).getTime() + "";
    pages.push(page);
    res.json(page);
}

function deletePage(req, res) {
    var pageId = req.params.pageId;
    var page = pages.find(function (page) {
        return page._id === pageId;
    });
    if (page !== null) {
        var index = pages.indexOf(page);
        pages.splice(index, 1);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }

}

function findPageById(req,res) {
    var pageId = req.params.pageId;
    var page = pages.find(function (page) {
        return page._id === pageId;
    });

    if (page !== null) {
        res.json(page);
    } else {
        res.sendStatus(404);
    }
}

function findPagesByWebsiteId(req,res) {
    var results = [];
    var wId = req.params.websiteId;

    for (var w in pages) {
        if (pages[w].websiteId === wId) {
            pages[w].created = new Date();
            pages[w].accessed = new Date();
            results.push(pages[w]);
        }
    }

    res.json(results);
}

function updatePage(req,res) {
    var pageId = req.params.pageId;
    var page = req.body;

    for (var w in pages) {
        if (pages[w]._id === pageId) {
            pages[w] = page;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

