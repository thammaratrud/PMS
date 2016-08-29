(function() {
    'use strict';

    angular
        .module('app.project')
        .controller('Upload_PO_Controller', Upload_PO_Controller);

    /** @ngInject */
    function Upload_PO_Controller($scope, $mdDialog) {
        
        var vm = this;

        // Methods
        vm.closeDialog = closeDialog;

        //////////

        function closeDialog() {
            $mdDialog.hide();
        }
    }
})();
