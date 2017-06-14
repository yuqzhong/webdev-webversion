(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($routeParams,
                                  $location,
                                  websiteService,
                                  currentUser) {
        var model = this;

        model.userId = currentUser.userId;
        model.createWebsite = createWebsite;

        function init() {
            websiteService
                .findWebsitesByUser(model.userId)
                .then(function (response) {
                    model.websites = response;
                })
        }

        init();

        function createWebsite(website) {
            website.developerId = model.userId;
            websiteService
                .createWebsite(model.userId, website)
                .then(function (response) {
                    $location.url('/user/' + model.userId + '/website');
                });

        }
    }
})();