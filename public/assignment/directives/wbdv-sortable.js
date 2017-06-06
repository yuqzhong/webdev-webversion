(function () {
    angular
        .module('wbdvDirectives',[])
        .directive('wbdvSortable', wbdvSortable)

    function wbdvSortable() {
        function linkFunction(scope, element) {
            var initial = -1, final = -1;
            $(element)
                .find(".wbdv-sortable")
                .sortable({
                    axis: 'y',
                    start: function (event, ui) {
                        initial = ui.item.index();
                        console.log(initial);
                    },
                    stop: function (event, ui) {
                        final = ui.item.index();
                        scope.callback({initial: initial, final: final});
                    }
                });

            console.log("Sort!");

        }
        return {
            templateUrl: "views/widget/templates/sorted-widgets.view.client.html",
            scope: {
                model: "=data",
                callback: "&"
            },
            link: linkFunction
        }
    }
})();