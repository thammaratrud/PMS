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

        $scope.estimateStatus = false;
        //////////

        function closeDialog() {
            $mdDialog.hide();
        }


        $scope.addEstimate = function() {
            if ($scope.estimateStatus == false) {

                $scope.estimateStatus = true;
            } else {
                $scope.estimateStatus = false;
            }


        }

        //swith//
        $scope.data = {
            cb1: true,
            cb4: true,
            cb5: false
        };

        $scope.message = 'false';

        $scope.onChange = function(cbState) {
            $scope.message = cbState;
        };
        //swith//

    }
})();
