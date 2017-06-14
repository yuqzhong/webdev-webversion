(function () {
    angular
        .module('WAM')
        .controller('websiteListController', websiteListController);
    
    function websiteListController($routeParams,
                                   websiteService,
                                   currentUser) {
        var model = this;

        model.userId = currentUser.userId;

        function init() {
            websiteService
                .findWebsitesByUser(model.userId)
                .then(function (response) {
                    model.websites = response;
                }, userError);
        }
        init();

        function userError() {
            model.error = "User not found";
        }
    }
})();