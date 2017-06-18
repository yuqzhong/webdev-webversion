const app = require('../../express');
var pageModel = require('../model/page/page.model.server');
var passport = require('passport');


app.get('/api/assignment/website/:websiteId/page', findPagesByWebsiteId);
app.post('/api/assignment/website/:websiteId/page', createPage);
app.get('/api/assignment/page/:pageId', findPageById);
app.put('/api/assignment/page/:pageId', updatePage);
app.delete('/api/assignment/website/:websiteId/page/:pageId', deletePage);

function createPage(req, res) {
    var websiteId = req.params.websiteId;
    var page = req.body;
    pageModel
        .createPage(websiteId, page)
        .then(function (page) {
            res.json(page);
        });
}

function deletePage(req, res) {
    var pageId = req.params.pageId;
    var websiteId = req.params.websiteId;

    pageModel
        .deletePage(websiteId, pageId)
        .then(function (status) {
            res.json(status);
        });

}

function findPageById(req,res) {
    var pageId = req.params.pageId;

    pageModel
        .findPageById(pageId)
        .then(function (page) {
            res.json(page);
        });
}

function findPagesByWebsiteId(req,res) {
    var websiteId = req.params.websiteId;

    pageModel
        .findPagesByWebsite(websiteId)
        .then(function (response) {
            res.json(response);
        });
}

function updatePage(req,res) {
    var pageId = req.params.pageId;
    var page = req.body;

    pageModel
        .updatePage(pageId, page)
        .then(function (status) {
            res.json(status);
        });
}

