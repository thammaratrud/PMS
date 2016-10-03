(function() {
    'use strict';

    angular
        .module('app.project')
        .controller('Upload_PO_Controller', Upload_PO_Controller);

    /** @ngInject */
    function Upload_PO_Controller($scope, $rootScope, $mdDialog, selectedProject, projectService) {

        var select_project = selectedProject;
        var vm = this;

        vm.closeDialog = closeDialog;

        $scope.checkFileSize = false;

        $scope.uploadData = {
            PurchaseDate: new Date(),
            DrillDate: new Date()
        };

        function closeDialog() {
            $mdDialog.hide();
        }
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


        $scope.uploadPO = function() {

            var fileName = "";
            var formData = new FormData();
            angular.forEach($scope.files, function(obj) {
                var fileType = obj.lfFile.name.split('.');
                var type = fileType[fileType.length - 1];
                fileName = select_project.ProjectCode + "_PurchaseOrder-" + $scope.uploadData.PurchaseNo + "." + type;
                formData.append('files[]', obj.lfFile, fileName);
            });

            projectService.upLoadFile(formData).then(function(response) {

                console.log('upload success.' + JSON.stringify(response));

                var file = fileName;
                $scope.uploadData.ProjectID = select_project.ProjectID;
                $scope.uploadData.PurchaseFile = file;
                select_project.PurchaseInfo = $scope.uploadData;

                projectService.putProject(select_project).then(function() {
                    console.log('Update po success.');
                    $rootScope.getFileList();
                }, function(err) {
                    console.log('Update po fail.');
                })
            }, function(err) {
                console.log('upload error.' + JSON.stringify(err));
            })


            closeDialog();
        }
    }
})();
