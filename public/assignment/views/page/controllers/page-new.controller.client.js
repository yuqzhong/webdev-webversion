(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);
    
    function pageNewController($routeParams,
                                   $location,
                                   pageService,
                               currentUser) {
        var model = this;

        model.userId = currentUser._id;
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
                    $location.url('/website/' + model.websiteId + '/page');
                })
        }
    }
})();