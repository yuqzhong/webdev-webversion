(function () {
    angular
        .module('WAM')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;

        model.login = login;

        function login(username, password) {


            // var found = userService.findUserByCredentials(username, password);
            userService
                .findUserByCredentials(username, password)
                .then(function (found) {
                    $location.url('/user/' + found._id);

                }, function (error) {
                    model.message = "login " + username + " unsuccessfully," +
                        " please check the username and password and try" +
                        " again";
                })
        }
    }
})();