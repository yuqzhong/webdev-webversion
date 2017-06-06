(function () {
    angular
        .module('WAM')
        .controller('flickrImageSearchController', flickrImageSearchController);

    function flickrImageSearchController($routeParams, widgetService, flickrService, $location) {
        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;

        function init() {
            widgetService
                .findWidgetById(model.widgetId)
                .then(function (response) {
                    model.widget = response;
                });
        }

        init();

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function searchPhotos(searchTerm) {
            flickrService
                .searchPhotos(searchTerm)
                .then(function (response) {
                    data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            model.widget.url = url;
            console.log(url);

            widgetService
                .updateWidget(model.widgetId, model.widget)
                .then(function (response) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                });
        }
    }
})();