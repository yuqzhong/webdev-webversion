// These code snippets use an open-source library. http://unirest.io/nodejs

(function ($http) {
    angular
        .module('testMod')
        .service('testService', testService);



    function testService() {

        var api = {
            countBmi : countBmi
        };
        return api;

        function countBmi() {
            $http.post('/api/bmiCal');
        }

    }
})();
