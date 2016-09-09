(function() {
    'use strict';

    angular
        .module('app.project')
        .controller('AppointmentController', AppointmentController);

    /** @ngInject */
    function AppointmentController($scope, $mdDialog, selectedProject, period, projectService) {

        var select_project = selectedProject;
        var vm = this;
        
        $scope.uploadApp = period;
        $scope.AppDate = new Date(period.AppDate);
        // Methods
        vm.closeDialog = closeDialog;

        //////////

        function closeDialog() {
            $mdDialog.hide();
        }

        $scope.uploadAppointment = function() {
            var file = document.getElementById('fileInput').value;
            $scope.uploadApp.AppFile = file;
            $scope.uploadApp.AppDate = $scope.AppDate;
            $scope.uploadApp.PeriodStatus = "PERIOD_WAITING";

            angular.forEach(select_project.PeriodInfo, function(periodData) {
                if (periodData.PeriodOrder == $scope.uploadApp.PeriodOrder) {
                    periodData = $scope.uploadApp;
                }
            })

            projectService.putProject(select_project).then(function() {
                console.log('Put upload appointment success.');
                closeDialog()
            }, function(err) {
                console.log('Put upload appointment fail.');
            })


        }
    }
})();
