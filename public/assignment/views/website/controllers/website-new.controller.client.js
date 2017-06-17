(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($location,
                                  websiteService,
                                  currentUser) {
        var model = this;

        model.userId = currentUser._id;
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
            // website._user = model.userId;
            console.log(website);
            websiteService
                .createWebsite(website)
                .then(function (response) {
                    $location.url('/website');
                });

        }
    }
})();