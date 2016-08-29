(function() {
    'use strict';

    angular
        .module('app.project')
        .controller('AppointmentController', AppointmentController);

    /** @ngInject */
    function AppointmentController($scope, $mdDialog) {

        var vm = this;

        // Methods
        vm.closeDialog = closeDialog;

        //////////

        function closeDialog() {
            $mdDialog.hide();
        }
    }
})();
