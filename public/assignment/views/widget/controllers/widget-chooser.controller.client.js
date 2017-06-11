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
            "Heading", "HTML", "Text", "Label", "Image", "Youtube", "Link", "Button",
            "Data table", "Repeater"
        ];

        model.canCreateWidgets = [
            "Heading", "HTML", "Image", "Youtube", "Text"
        ];
        model.createWidget = createWidget;

        function init() {
            widgetService
                .findWidgetsByPageId(model.pageId)
                .then(function (response) {
                    model.widgets = response;
                });
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
                var widget = {"widgetType": type.toUpperCase()};
                widgetService
                    .createWidget(model.pageId, widget)
                    .then(function (widget) {
                        $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id);
                    })

            }
        }


    }
})();