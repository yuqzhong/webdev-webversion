(function () {
    angular
        .module('WAM')
        .service('flickrService', flickrService);

    function flickrService($http) {

        this.searchPhotos = searchPhotos;
        var key = "your-flickr-key";
        var secret = "your-flickr-secret";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();