(function () {
    angular
        .module('WAM')
        .controller('flickrImageSearchController', flickrImageSearchController);

    function flickrImageSearchController($routeParams, flickrService, $location) {
        var model = this;



        function init() {
            widgetService
                .findWidgetsByPageId(model.pageId)
                .then(function (response) {
                    model.widgets = response;
                });
            // console.log("hey");
        }

        init();
        
        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;
        
        function searchPhotos(searchTerm) {
            flickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            WidgetService
                .updateWidget(websiteId, pageId, widgetId, {url: url})
                .then(function (response) {
                    model.widget = response;
                });
        }
    }
})();