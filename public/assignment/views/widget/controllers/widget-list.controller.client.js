(function () {
    angular
        .module('WAM')
        .controller('widgetListController', widgetListController);

    function widgetListController($routeParams, $sce, widgetService,currentUser) {
        var model = this;

        model.userId = currentUser._id;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        // model.widgetId = $routeParams.widgetId;
        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.widgetUrl = widgetUrl;
        // model.sortWidgets = sortWidgets;

        function init() {
            widgetService
                .findWidgetsByPageId(model.pageId)
                .then(function (response) {
                    model.widgets = response;
                })
        }

        init();

        function widgetUrl(widget) {
            return 'views/widget/templates/widget-' + widget.widgetType.toLowerCase() + '.view.client.html';
        }

        function getYouTubeEmbedUrl(linkUrl) {
            var embedUrl = "https://www.youtube.com/embed/";
            var linkUrlParts = linkUrl.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length - 1];
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function trust(html) {
            // scrubbing the html
            return $sce.trustAsHtml(html);
        }

    }
})();