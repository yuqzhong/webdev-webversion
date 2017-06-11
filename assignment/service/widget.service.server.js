const app = require('../../express');
var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});

app.post('/api/upload', upload.single('myFile'), uploadImage);

app.post('/api/assignment/page/:pageId/widget', createWidget);
app.get('/api/assignment/page/:pageId/widget', findWidgetsByPageId);
app.get('/api/assignment/widget/:widgetId', findWidgetById);
app.put('/api/assignment/widget/:widgetId', updateWidget);
app.delete('/api/assignment/widget/:widgetId', deleteWidget);
app.put("/api/assignment/page/:pageId/widget", orderWidget);

var widgets = [
    {
        "_id": "123",
        "widgetType": "HEADING",
        "pageId": "321",
        "size": 2,
        "text": "GIZMODO"
    },
    {
        "_id": "234",
        "widgetType": "HEADING",
        "pageId": "321",
        "size": 4,
        "text": "Lorem ipsum"
    },
    {
        "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"
    },
    {
        "_id": "356",
        "widgetType": "HTML",
        "pageId": "321",
        "text": "<p>Robert S. Mueller III, a former prosecutor who served as the FBI director from 2001 to 2013, has agreed to take over the investigation as a special counsel, Deputy Attorney General Rod J. Rosenstein announced. The move marks a concession by the Trump administration to Democratic demands for the investigation to be run independently of the Justice Department. Calls for a special counsel intensified after <a href='https://www.washingtonpost.com/world/national-security/comey-misstated-key-clinton-email-evidence-at-hearing-say-people-close-to-investigation/2017/05/09/074c1c7e-34bd-11e7-b373-418f6849a004_story.html?utm_term=.6b690afe69ac'shape='rect' title='www.washingtonpost.com'>Trump fired FBI Director James B. Comey</a> last week. </p>"
    },
    {
        "_id": "456",
        "widgetType": "HTML",
        "pageId": "321",
        "text": "<p>Lorem ipsum</p>"
    },
    {
        "_id": "567",
        "widgetType": "HEADING",
        "pageId": "321",
        "size": 4,
        "text": "Lorem ipsum"
    },
    {
        "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E"
    },
    {
        "_id": "789",
        "widgetType": "HTML",
        "pageId": "321",
        "text": "<p>Lorem ipsum</p>"
    }
];

function createWidget(req, res) {
    var pageId = req.params.pageId;
    var widget = req.body;
    widget._id = (new Date()).getTime() + "";
    widget.pageId = pageId;
    widgets.push(widget);
    res.json(widget);
}

function findWidgetsByPageId(req, res) {
    var pageId = req.params.pageId;
    var results = [];

    for (var w in widgets) {
        if (widgets[w].pageId === pageId) {
            results.push(widgets[w]);
        }
    }

    res.json(results);
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;
    for (var w in widgets) {
        if (widgets[w]._id === widgetId) {
            res.json(widgets[w]);
            return;
        }
    }
    res.sendStatus(404);

}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    var widget = widgets.find(function (widget) {
        return widget._id === widgetId;
    });

    if (widget !== null) {
        var index = widgets.indexOf(widget);
        widgets.splice(index, 1);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
}

function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var widget = req.body;
    for (var w in widgets) {
        if (widgets[w]._id === widgetId) {
            widgets[w] = widget;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function uploadImage(req, res) {


    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    if (typeof req.file === 'undefined') {
        res.redirect('../assignment/index.html#!/user/' + userId + '/website/' + websiteId+ '/page/' + pageId + '/widget'
            );
        return;
    }

    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;


    var widget = widgets.find(function (widget) {
        return widget._id === widgetId;
    });
    // if (widget.url)
        widget.url = '/assignment/uploads/' + filename;

    var callbackUrl = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";

    res.redirect(callbackUrl);
}

function orderWidget(req, res) {
    var pageId = req.params.pageId;
    var index1 = parseInt(req.query.initial);
    var index2 = parseInt(req.query.final);
    // var widgetId = req.params.widgetId;

    widgets.sort(function (a, b) {
        return parseInt(a.pageId) - parseInt(b.pageId);
    });

    var firstIndex = widgets.findIndex(function (widget) {
        return widget.pageId === pageId;
    });

    var index = firstIndex + index1;

    var widget = widgets[index];
    widgets.splice(index, 1);
    // console.log(widget);
    // console.log(firstIndex);
    // console.log(index1);
    // console.log(index2);


    widgets.splice(index2 + firstIndex, 0, widget);
    // console.log(widgets);
    res.json(widgets);


}
