(function () {
    angular
        .module('WAM')
        .service('widgetService', widgetService);

    function widgetService($http) {
        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            deleteWidget: deleteWidget,
            updateWidget: updateWidget,
            sortWidgets: sortWidgets
        };
        return api;


        function createWidget(pageId, widget) {
            // console.log('in widget.service.client -- create widget')
            var url = '/api/assignment/page/' + pageId + '/widget';
            return $http.post(url, widget)
                .then(function (response) {
                    // console.log('success - in widget.service.client -- create widget --post -- response: '+response);
                    return response.data;
                },
                function (err) {
                    console.log('fail - in widget.service.client -- create widget --post -- err: '+err);

                });
        }

        function findWidgetsByPageId(pageId) {
            var url = '/api/assignment/page/' + pageId + '/widget';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetById(widgetId) {
            var url = '/api/assignment/widget/' + widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWidget(pageId, widgetId) {
            var url = '/api/assignment/page/' + pageId+ '/widget/' + widgetId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWidget(widgetId, widget) {
            var url = '/api/assignment/widget/' + widgetId;
            return $http.put(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function sortWidgets(pageId,initial,final){
            console.log("sort client side");
            return $http.put("/page/"+pageId+"/widget?initial="+initial+"&final="+final);
        }
    }
})();