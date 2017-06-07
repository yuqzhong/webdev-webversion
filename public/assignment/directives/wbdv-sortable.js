(function () {
    angular
        .module('wbdvDirectives',[])
        .directive('wbdvSortable', wbdvSortable);

    function wbdvSortable($http, $routeParams) {

        function linkFunction(scope, element) {
            var initial = -1, final = -1;
            $(element)
                // .find(".wbdv-sortable")
                .sortable({
                    // axis: 'y',
                    start: function (event, ui) {
                        initial = ui.item.index();
                        // console.log(initial);
                    },
                    stop: function (event, ui) {
                        var final = ui.item.index();
                        var pageId = $routeParams.pageId;
                        console.log(initial);
                        // var widgetId = ui.item.widgetId;
                        var url = "/api/assignment/page/" + pageId + "/widget?initial=" + initial + "&final=" + final;
                        console.log(url);
                        // var url = "/page/" + pageId + "/widget?initial=" + initial + "&final=" + final + "&widgetId=" + widgetId;
                        return $http.put(url);
                    }
                });
            console.log("Sort!");
        //
        }

        // function linkFunction(scope, element) {
        //     $(element).sortable();
        // }
        return {
            // templateUrl: "/views/widget/templates/sorted-widgets.view.client.html",
            // scope: {
            //     model: "=data",
            //     callback: "&"
            // },
            link: linkFunction
        }
    }
})();