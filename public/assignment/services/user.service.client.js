(function () {
    angular
        .module('WAM')
        .factory('userService', userService);

    function userService($http) {

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findAllUsers: findAllUsers,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            logout: logout,
            loggedin: loggedin,
            register: register,
            checkAdmin: checkAdmin,
            unregister: unregister
        };
        return api;


        function unregister() {
            var url = "/api/assignment/unregister";
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function register(userObj) {
            var url = "/api/assignment/register";
            return $http.post(url, userObj)
                .then(function (response) {
                    return response.data;
                });
        }

        function loggedin() {
            var url = "/api/assignment/loggedin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkAdmin() {
            var url = "/api/assignment/checkAdmin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            var url = "/api/assignment/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var url = "/api/assignment/login";
            var credentials = {
                username: username,
                password: password
            };
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {
            var url = "/api/assignment/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = "/api/assignment/user?username=" + username;
            return $http.get(url)
                .then(function (response) {
                    // console.log(response);
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = '/api/assignment/user/' + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findUserByCredentials(username, password) {
            var url = "/api/assignment/user?username=" + username + "&password=" + password;
            return $http.get(url)
                .then(function (response) {
                    if (response.status == undefined) {
                        return null;
                    } else {
                        return response.data;
                    }
                })
        }

        function updateUser(userId, user) {
            console.log(user);
            var url = "/api/assignment/user/" + userId;
            // console.log(user);
            return $http.put(url, user)
                .then(function (response) {
                    // console.log(response.data);
                    return response.data;
                });
        }

        function deleteUser(userId) {
            var url = '/api/assignment/user/' + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function findAllUsers() {
            var url='/api/assignment/user';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();