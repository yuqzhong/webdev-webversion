(function () {
    angular
        .module('WAM')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($routeParams, $location, widgetService) {
        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;

        model.getWidgetType = getWidgetType;
        // model.notNew = notNew;
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
            model.widget = angular.copy(widgetService.findWidgetById(model.widgetId));
            console.log(model.widget);
        }

        init();

        function getWidgetType() {
            return model.widget.widgetType;
        }

        // function notNew() {
        //     var newWidget = true;
        //     for (var w in model.widgets) {
        //         if (model.widgets[w]._id === model.widget._id) {
        //             newWidget = false;
        //         }
        //     }
        //
        //     return newWidget;
        // }

        function updateWidget(widget) {
            widgetService.updateWidget(model.widgetId, widget);
            $location.url('/user/'+model.userId+'/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
        }

        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId);
            $location.url('/user/'+model.userId+'/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
        }

    }
})();