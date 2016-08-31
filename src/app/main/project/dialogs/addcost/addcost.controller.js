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


        $scope.data = {
            cb1: true,
            cb4: true,
            cb5: false
        };

        $scope.message = 'false';

        $scope.onChange = function(cbState) {
            $scope.message = cbState;
        };
    }
})();
