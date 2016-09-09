(function() {
    'use strict';

    angular
        .module('app.project')
        .controller('costmoreController', costmoreController);

    /** @ngInject */
    function costmoreController($scope, $mdDialog, cost) {

        $scope.costData = cost;
        
        var vm = this;

        vm.closeDialog = closeDialog;

        //////////

        function closeDialog() {
            $mdDialog.hide();
        }


    }
})();
