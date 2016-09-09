(function() {
    'use strict';

    angular
        .module('app.project')
        .controller('receiptmoreController', receiptmoreController);

    /** @ngInject */
    function receiptmoreController($scope, $mdDialog, receipt) {

        $scope.receiptData = receipt;
        
        var vm = this;
        vm.closeDialog = closeDialog;


        function closeDialog() {
            $mdDialog.hide();
        }


    }
})();
