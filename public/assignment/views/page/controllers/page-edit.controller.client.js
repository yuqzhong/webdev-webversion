(function () {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);
    
    function pageEditController($routeParams,
                                   $location,
                                   pageService) {
        var model = this;

        model.userId = $routeParams.userId;
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
                    $location.url('/user/'+model.userId+'/website/' + model.websiteId + '/page');
                })

        }

        function updatePage(pageId, page) {
            pageService
                .updatePage(pageId, page)
                .then(function (response) {
                $location.url('/user/'+model.userId+'/website/' + model.websiteId + '/page');
            })

        }
    }
})();