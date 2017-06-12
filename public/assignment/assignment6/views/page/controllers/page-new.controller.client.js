(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);
    
    function pageNewController($routeParams,
                                   $location,
                                   pageService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.createPage = createPage;

        function init() {
           pageService
               .findPagesByWebsiteId(model.websiteId)
               .then(function (response) {
                   model.pages = response;
               })
        }
        init();

        function createPage(page) {
            page.websiteId = model.websiteId;
            pageService
                .createPage(page.websiteId, page)
                .then(function (response) {
                    $location.url('/user/'+model.userId+'/website/' + model.websiteId + '/page');
                })
        }
    }
})();