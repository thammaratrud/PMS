(function() {
    'use strict';

    angular
        .module('app.project')
        .controller('UploadFileController', UploadFileController);

    /** @ngInject */
    function UploadFileController($scope, $rootScope, $mdDialog, projectService, selectedProject) {

        var vm = this;
        var select_project = selectedProject;

        vm.closeDialog = closeDialog;

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


        $scope.uploadFile = function() {

            var fileName = "";
            var formData = new FormData();
            angular.forEach($scope.files, function(obj) {
                var fileType = obj.lfFile.name.split('.');
                var type = fileType[fileType.length - 1];

                fileName = select_project.ProjectCode + "_PD_" + $scope.file_name + "." + type;
                formData.append('files[]', obj.lfFile, fileName);

            });

            projectService.upLoadFile(formData).then(function(response) {

                console.log('upload success.' + JSON.stringify(response));
                $rootScope.getFileList();
                closeDialog();

            }, function(err) {

                console.log('upload error.' + JSON.stringify(err));

            })


        }
    }
})();
