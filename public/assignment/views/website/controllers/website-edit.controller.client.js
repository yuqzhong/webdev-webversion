(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams,
                                   $location,
                                   websiteService) {
        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        function init() {
            websiteService
                .findWebsitesByUser(model.userId)
                .then(renderWebsite, userError);

            websiteService
                .findWebsiteById(model.websiteId)
                .then(function (response) {
                    model.website = angular.copy(response);
                }, websiteError);
        }

        init();

        function renderWebsite(response) {
            model.websites = response;
        }

        function userError() {
            model.error = "User not found";
        }

        function websiteError() {
            model.error = "Website not found";
        }

        function deleteWebsite() {
            console.log(model.userId);
            websiteService
                .deleteWebsite(model.userId, model.websiteId)
                .then(function (status) {
                    console.log(status + "controller");
                    $location.url('/user/' + model.userId + '/website');
                });

        }

        function updateWebsite(websiteId, website) {
            websiteService
                .updateWebsite(websiteId, website)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website');
                }, function () {
                    model.error = "update unsuccessfully";
                })

        }
    }
})();