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
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        function init() {
            widgetService
                .findWidgetsByPageId(model.pageId)
                .then(function (response) {
                    model.widgets = response;
                });
            widgetService
                .findWidgetById(model.widgetId)
                .then(function (response) {
                    model.widget = angular.copy(response);
                });
            // console.log(model.widget);
        }

        init();

        function getWidgetType() {
            return model.widget.widgetType;
        }

        function updateWidget() {
            // console.log("update");
            if (model.widget.size !== undefined) {
                model.widget.size = model.widget.size.split(" ")[0];
            }
            widgetService
                .updateWidget(model.widgetId, model.widget)
                .then(function (response) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                })
        }

        function deleteWidget() {
            widgetService
                .deleteWidget(model.pageId, model.widgetId)
                .then(function (response) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                }, function (response) {
                    model.error = "Cannot delete this widget!";
                })

        }

    }
})();