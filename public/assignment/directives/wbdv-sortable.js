(function () {
    angular
        .module('wbdvDirectives',[])
        .directive('wbdvSortable', wbdvSortable)

    function wbdvSortable($http, $routeParams) {

        function linkFunction(scope, element) {
            var initial = -1, final = -1;
            $(element)
                .sortable(
                    {
                    start: function (event, ui) {
                        initial = ui.item.index();
                    },
                    stop: function (event, ui) {
                        var final = ui.item.index();
                        var pageId = $routeParams.pageId;
                        console.log(initial);
                        var url = "/api/assignment/page/" + pageId + "/widget?initial=" + initial + "&final=" + final;
                        console.log(url);
                        return $http.put(url);
                    }
                });
            console.log("Sort!");
        }
        return {
            link: linkFunction
        }
    }
})();