(function () {
    angular
        .module('WAM')
        .factory('pageService', pageService);

    function pageService($http) {
        var api = {
            createPage: createPage,
            findPagesByWebsiteId: findPagesByWebsiteId,
            findPageById: findPageById,
            deletePage: deletePage,
            updatePage: updatePage
        };
        return api;


        function createPage(websiteId, page) {
            var url = '/api/assignment/website/' + websiteId + '/page';
            return $http.post(url, page)
                .then(function (response) {
                    return response.data;
                });
        }

        function deletePage(pageId) {
            var url = '/api/assignment/page/' + pageId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPageById(pageId) {
            var url = '/api/assignment/page/' + pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPagesByWebsiteId(wId) {
            var url = '/api/assignment/website/' + wId + '/page';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updatePage(pageId, page) {
            var url = '/api/assignment/page/' + pageId;
            return $http.put(url, page)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();