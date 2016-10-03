(function() {
    'use strict';

    angular
        .module('app.project')
        .controller('AppointmentController', AppointmentController);

    /** @ngInject */
    function AppointmentController($scope, $rootScope, $mdDialog, selectedProject, period, projectService) {

        var select_project = selectedProject;
        var vm = this;

        $scope.uploadApp = period;
        $scope.AppDate = new Date(period.AppDate);
        // Methods
        vm.closeDialog = closeDialog;

        //////////

        $scope.files;

        var warningType = $rootScope.warningType;
        $scope.$watch('files.length', function(newVal, oldVal) {
            $scope.checkFileSize = false;
            $scope.checkFileType = false;
            if ($scope.files != undefined) {
                if ($scope.files.length > 0) {
                    var fileType = $scope.files[0].lfFile.name.split('.');
                    $scope.types = fileType[fileType.length - 1];
                    angular.forEach(warningType, function(e) {
                        if ($scope.types == e) {
                            $scope.checkFileType = true;
                        } else {
                            if ($scope.files[0].lfFile.size > 25600000) {
                                $scope.checkFileSize = true;
                            } else {
                                $scope.checkFileSize = false;
                            }
                        }
                    })
                }
            }

        });

        function closeDialog() {
            $mdDialog.hide();
        }
        // "application/pdf"
        // "image/jpeg"
        $scope.uploadAppointment = function() {

            var fileName = "";
            var formData = new FormData();
            angular.forEach($scope.files, function(obj) {
                var fileType = obj.lfFile.name.split('.');
                var type = fileType[fileType.length - 1];
                fileName = select_project.ProjectCode + "_Appointment-" + $scope.uploadApp.AppNo + "." + type;
                formData.append('files[]', obj.lfFile, fileName);
            });

            projectService.upLoadFile(formData).then(function(response) {

                console.log('upload success.' + JSON.stringify(response));

                $scope.uploadApp.AppFile = file;
                $scope.uploadApp.AppDate = $scope.AppDate;
                $scope.uploadApp.PeriodStatus = "PERIOD_APPOINTMENT";

                angular.forEach(select_project.PeriodInfo, function(periodData) {
                    if (periodData.PeriodOrder == $scope.uploadApp.PeriodOrder) {
                        periodData = $scope.uploadApp;
                    }
                })

                var file = fileName;

                projectService.putProject(select_project).then(function() {
                    console.log('Put upload appointment success.');
                    closeDialog();
                    $rootScope.getFileList();
                }, function(err) {
                    console.log('Put upload appointment fail.');
                })
            }, function(err) {
                console.log('upload error.' + JSON.stringify(err));
            })



        }
    }
})();
