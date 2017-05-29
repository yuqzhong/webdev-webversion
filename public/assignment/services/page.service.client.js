(function () {
    angular
        .module('WAM')
        .service('pageService', pageService);

    function pageService() {
        this.createPage = createPage;
        this.findPagesByWebsiteId = findPagesByWebsiteId;
        this.findPageById = findPageById;
        this.deletePage = deletePage;
        this.updatePage = updatePage;

        var pages = [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
            ];

        function createPage(page) {
            page._id = (new Date()).getTime() + "";
            pages.push(page);
        }

        function deletePage(pageId) {
            var page = findPageById(pageId);
            var index = pages.indexOf(page);
            pages.splice(index, 1);
        }

        function findPageById(pageId) {
            return pages.find(function (page) {
                return page._id === pageId;
            });
        }

        function findPagesByWebsiteId(wId) {
            var results = [];

            for(var w in pages) {
                if(pages[w].websiteId === wId) {
                    pages[w].created = new Date();
                    pages[w].accessed = new Date();
                    results.push(pages[w]);
                }
            }

            return results;
        }

        function updatePage(pageId, page) {
            for (var w in pages) {
                if (pages[w]._id === pageId) {
                    pages[w] = page;
                    return;
                }

            }
        }
    }
})();