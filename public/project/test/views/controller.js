(function () {
    angular
        .module('testMod')
        .controller('testController', testController);

    function testController(testService) {
        var model = this;

        model.countBmi = countBmi;

        function init() {
            console.log("hey!!! you make it!!");
        }
        init();

        function countBmi() {
            console.log("hey!");
            testService
                .countBmi()
        }
    }
})();