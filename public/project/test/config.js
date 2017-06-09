(function () {
    angular
        .module('testMod')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/button.html',
                controller: 'testController',
                controllerAs: 'model'
            })
    }
})();