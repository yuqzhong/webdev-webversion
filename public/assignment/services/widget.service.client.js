(function () {
    angular
        .module('WAM')
        .service('widgetService', widgetService);

    function widgetService() {
        this.createWidget = createWidget;
        this.findWidgetsByPageId = findWidgetsByPageId;
        this.findWidgetById = findWidgetById;
        this.deleteWidget = deleteWidget;
        this.updateWidget = updateWidget;

        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            {"_id":"356","widgetType":"HTML", "pageId":"321", "text":"<p>Robert S. Mueller III, a former prosecutor who served as the FBI director from 2001 to 2013, has agreed to take over the investigation as a special counsel, Deputy Attorney General Rod J. Rosenstein announced. The move marks a concession by the Trump administration to Democratic demands for the investigation to be run independently of the Justice Department. Calls for a special counsel intensified after <a href='https://www.washingtonpost.com/world/national-security/comey-misstated-key-clinton-email-evidence-at-hearing-say-people-close-to-investigation/2017/05/09/074c1c7e-34bd-11e7-b373-418f6849a004_story.html?utm_term=.6b690afe69ac'shape='rect' title='www.washingtonpost.com'>Trump fired FBI Director James B. Comey</a> last week. </p>"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        function createWidget(pageId, widget) {
            widget._id = (new Date()).getTime() + "";
            widget.pageId = pageId;
            widgets.push(widget);
        }

        function findWidgetsByPageId(pageId) {
            var results = [];

            for(var w in widgets) {
                if(widgets[w].pageId === pageId) {
                    results.push(widgets[w]);
                }
            }

            return results;
        }

        function findWidgetById(widgetId) {
            return widgets.find(function (widget) {
                return widget._id === widgetId;
            });
        }

        function deleteWidget(widgetId) {
            var widget = findWidgetById(widgetId);
            var index = widgets.indexOf(widget);
            widgets.splice(index, 1);
        }

        function updateWidget(widgetId, widget) {
            for (var w in widgets) {
                if (widgets[w]._id === widgetId) {
                    widgets[w] = widget;
                    return;
                }

            }
        }
    }
})();