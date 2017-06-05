(function () {
    angular
        .module('WAM')
        .controller('pageListController', pageListController);
    
    function pageListController($routeParams,
                                   pageService) {
        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;

        function init() {
            pageService
                .findPagesByWebsiteId(model.websiteId)
                .then(function (response) {
                    model.pages = response;
                })
        }
        init();
    }
})();