(function() {
    'use strict';

    angular
        .module('app.sample')
        .controller('SampleController', SampleController);

    /** @ngInject */
    function SampleController(SampleData, sampleService) {
        var vm = this;

        // Data
        vm.helloText = SampleData.data.helloText;

        // Methods

        //////////

        sampleService.getProject().then(function(response) {
                console.log("getProject : Success." + response);
            },
            function(err) {
                console.log("getProject : Fail.");
            });

    }
})();
