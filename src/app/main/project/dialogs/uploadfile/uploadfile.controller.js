(function() {
    'use strict';

    angular
        .module('app.project')
        .controller('UploadFileController', UploadFileController);

    /** @ngInject */
    function UploadFileController($scope, $mdDialog) {
       
        var vm = this;

        vm.closeDialog = closeDialog;

        function closeDialog() {
            $mdDialog.hide();
        }
    }
})();
