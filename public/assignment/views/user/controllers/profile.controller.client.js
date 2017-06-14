(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($routeParams, userService, $location, currentUser) {

        var model = this;

        model.userId = currentUser.userId;
        model.updateUser = updateUser;
        // model.deleteUser = deleteUser;
        model.logout = logout;
        model.unregister = unregister;

        function init() {
            renderUser(currentUser);
        }
        init();

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function unregister(user) {
            userService
                .unregister()
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

