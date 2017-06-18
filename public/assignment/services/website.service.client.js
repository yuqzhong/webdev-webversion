(function () {
    angular
        .module('WAM')
        .factory('websiteService', websiteService);

    function websiteService($http) {

        var api = {
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            deleteWebsite: deleteWebsite,
            createWebsite: createWebsite,
            updateWebsite: updateWebsite,
            findAllWebsites: findAllWebsites
        };
        return api;


        function createWebsite(website) {
            var url = "/api/assignment/website";
            console.log(website.description);
            return $http.post(url, website)
                .then(function (response) {
                    return response.data;
                })
        }

        function deleteWebsite(websiteId) {
            var url = '/api/assignment/website/' + websiteId;
            // console.log(url);
            return $http.delete(url)
                .then(function (response) {
                    // console.log(response + "client service");
                    return response.data;
                });
        }

        function findWebsiteById(websiteId) {
            var url = '/api/assignment/website/' + websiteId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWebsitesByUser() {
            var url = '/api/assignment/website';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function updateWebsite(websiteId, website) {
            var url = '/api/assignment/website/' + websiteId;
            return $http.put(url, website)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllWebsites() {
            var url = '/api/assignment/website/all';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();