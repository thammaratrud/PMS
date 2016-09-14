(function() {
    'use strict';

    angular
        .module('app.project')
        .controller('Upload_PO_Controller', Upload_PO_Controller);

    /** @ngInject */
    function Upload_PO_Controller($scope, $http, $mdDialog, selectedProject, projectService) {

        var select_project = selectedProject;
        var vm = this;

        vm.closeDialog = closeDialog;

        $scope.uploadData = {
            PurchaseDate: new Date(),
            DrillDate: new Date()
        };

        function closeDialog() {
            $mdDialog.hide();
        }
        $scope.files;
        $scope.$watch('files.length', function(newVal, oldVal) {
            console.log($scope.files);
        });
        $scope.uploadPO = function() {

            var fileName = "";
            var formData = new FormData();
            angular.forEach($scope.files, function(obj) {
                var fileType = obj.lfFile.name.split('.');
                var type = fileType[fileType.length - 1];
                fileName = select_project.ProjectCode + "_PurchaseOrder." + type;
                formData.append('files[]', obj.lfFile, fileName);
            });
            $http.post('http://localhost:5145/api/Upload', formData, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }).then(function(result) {
                // do sometingh
                console.log('upload success.' + JSON.stringify(result));
            }, function(err) {
                // do sometingh
                console.log('upload error.' + JSON.stringify(err));
            });

            // var file = document.getElementById('fileInput').value;
            var file = fileName;
            $scope.uploadData.ProjectID = select_project.ProjectID;
            $scope.uploadData.PurchaseFile = file;
            select_project.PurchaseInfo = $scope.uploadData;

            projectService.putProject(select_project).then(function() {
                console.log('Put upload_po success.');
            }, function(err) {
                console.log('Put upload_po fail.');
            })

            closeDialog();
        }
    }
})();
