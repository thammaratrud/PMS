(function() {
    'use strict';

    angular
        .module('app.project')
        .controller('AddcostController', AddcostController);

    /** @ngInject */
    function AddcostController($scope, $mdDialog) {

        var vm = this;

        // Methods
        vm.closeDialog = closeDialog;

        //////////

        function closeDialog() {
            $mdDialog.hide();
        }
    }
})();
