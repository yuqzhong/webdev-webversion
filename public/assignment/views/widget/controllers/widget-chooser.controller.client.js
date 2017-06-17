(function () {
    angular
        .module('WAM')
        .controller('widgetChooserController', widgetChooserController);

    function widgetChooserController($routeParams, widgetService, $location,currentUser) {
        var model = this;

        model.userId = currentUser._id;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;

        model.widgetType = [
            "Heading", "HTML", "Text", "Image", "Youtube"
        ];

        var toAdd = ["Label", "Link", "Button",
            "Data table", "Repeater"];

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

            // console.log(type);
            if (canCreate === true) {
                var widget = {"widgetType": type.toUpperCase()};
                console.log(widget);
                widgetService
                    .createWidget(model.pageId, widget)
                    .then(function (widget) {
                        console.log("success - create widget")
                        $location.url('/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id);
                    },function(){
                        console.log("fail - create widget")

                    })
            }
        }

    }
})();