(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($routeParams, userService, $location) {

        var model = this;

        model.userId = $routeParams.userId;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            userService
                .findUserById(model.userId)
                .then(renderUser, userError);
        }
        init();
        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/');
                });
        }

        function renderUser(response) {
            model.user = response;
        }

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "User updated successfully";
                });
        }

        function userError() {
            model.error = "User not found";
        }

        // model.user = userService.findUserById(model.userId);
        var promise = userService.findUserById(model.userId);

        promise.then(function (user) {
            model.user = user;
        });
    }
})();

