(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);
    
    function profileController($routeParams, userService,$location) {

        var model = this;

        model.userId = $routeParams.userId;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        userService
            .findUserById(model.userId)
            .then(renderUser,userError);

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function () {
                   $location.url('/');
                }, function () {
                    model.error = "unable to unregister!";
                });
        }

        function renderUser(response) {
            module.user = response;
        }

        function updateUser(user) {
            userService
                .updateUser(user._id,user)
                .then(function () {
                    model.message = "user update successful";
                })
        }

        // model.user = userService.findUserById(model.userId);
        var promise = userService.findUserById(model.userId);

        promise.then(function (user) {
            model.user = user;
        });
    }
})();

