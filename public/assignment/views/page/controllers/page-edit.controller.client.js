(function () {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);
    
    function pageEditController($routeParams,
                                   $location,
                                   pageService,currentUser) {
        var model = this;

        model.userId = currentUser._id;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.deletePage = deletePage;
        model.updatePage = updatePage;

        function init() {
            pageService
                .findPagesByWebsiteId(model.websiteId)
                .then(function (response) {
                    model.pages = response;
                });
            pageService
                .findPageById(model.pageId)
                .then(function (response) {
                    model.page = angular.copy(response);
                })
        }
        init();

        function deletePage(pageId) {
            pageService
                .deletePage(model.websiteId,pageId)
                .then(function (response) {
                    $location.url('/website/' + model.websiteId + '/page');
                })

        }

        function updatePage(pageId, page) {
            pageService
                .updatePage(pageId, page)
                .then(function (response) {
                $location.url('/website/' + model.websiteId + '/page');
            })

        }
    }
})();