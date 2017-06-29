// console.log('hello from wam');


// you can dinamically decide the module of ng-app
module.exports = function (application) {
    var app = require('../../express');

//  a generic indewx page
    app.get('/wam/index.html', indexHtml);
    app.get('/wam/app.js', appJs);
    app.get('/wam/config.js', configJs);
    app.get('/wam/:entityName/templates/list/:listHtmlFileName', listHtml);
    app.get('/wam/:entityName/controllers/list/:listControllerFileName', listJs);
    app.get('/wam/:entityName/service/*', serviceJs);
    app.get('/wam/:entityName/', findAll());


    function findAll(req, res) {
        // var entityName =req.params.entityName;

        res.json( [{ 'name':'boking 123'},
            { 'name':'boking 323'},
            { 'name':'boking 423'}
        ]);

    }
    function serviceJs(req, res) {
        application.entityName = req.params.entityName;
        res.render('lectures/wam/services/service.ejs', application)
    }

    function listJs(req, res) {
        application.entityName = req.params.entityName;
        res.render('lectures/wam/controllers/list.ejs', application)
    }

    function listHtml(req, res) {
        application.entityName = req.params.entityName;
        res.render('lectures/wam/templates/list.ejs', application)
    }

    function indexHtml(req, res) {
        res.render('lectures/wam/index.ejs', application);
    }

    function appJs(req, res) {
        res.render('lectures/wam/app.ejs', application);
    }

    function configJs(req, res) {
        res.render('lectures/wam/config.ejs', application);
    }

};