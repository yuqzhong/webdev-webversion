// These code snippets use an open-source library. http://unirest.io/nodejs

(function () {
    angular
        .module('testMod')
        .service('testService', testService);



    function testService($http) {

        var api = {
            countBmi : countBmi
        };
        return api;

        function countBmi(figure) {
            // console.log(figure);
            return $http.post('/api/project/bmiCal', figure)
                .then(function (response) {
                    return response.data;
                })
        }

    }
})();
