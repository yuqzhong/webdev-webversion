(function () {
    angular
        .module('WAM')
        .controller('adminController', adminController);

    function adminController(currentUser) {
        var model = this;
        model.currentUser = currentUser;

    }

})();