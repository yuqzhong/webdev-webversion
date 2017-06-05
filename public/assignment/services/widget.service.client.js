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
            updateWidget: updateWidget
        };
        return api;


        function createWidget(pageId, widget) {
            var url = '/api/assignment/page/' + pageId + '/widget';
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
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

        function deleteWidget(widgetId) {
            var url = '/api/assignment/widget/' + widgetId;
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
    }
})();