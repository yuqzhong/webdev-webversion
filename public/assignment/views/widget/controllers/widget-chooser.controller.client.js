(function () {
    angular
        .module('WAM')
        .controller('widgetChooserController', widgetChooserController);

    function widgetChooserController($routeParams, widgetService, $location) {
        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;

        model.widgetType = [
            "Heading","Label","HTML","Text","Link","Button","Image","Youtube",
            "Data table","Repeater"
        ];

        model.canCreateWidgets = [
            "Heading","HTML","Image","Youtube"
        ];
        model.createWidget = createWidget;

        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
            // console.log("hey");
        }

        init();

        function createWidget(type) {
            console.log(type);
            var canCreate = false;
            for (var w in model.canCreateWidgets) {
                if (model.canCreateWidgets[w] === type) {
                    canCreate = true;
                }
            }

            if (canCreate === true) {
                var widget = { "widgetType": type.toUpperCase()};
                widgetService.createWidget(model.pageId, widget);
                $location.url('/user/'+model.userId+'/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id);
            }
        }


    }
})();