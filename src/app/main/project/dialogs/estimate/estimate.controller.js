(function() {
    'use strict';

    angular
        .module('app.project')
        .controller('EstimateController', EstimateController);

    /** @ngInject */
    function EstimateController($scope, $mdDialog) {

        var vm = this;

        // Methods
        vm.closeDialog = closeDialog;

        //////////

        function closeDialog() {
            $mdDialog.hide();
        }
    }
})();
