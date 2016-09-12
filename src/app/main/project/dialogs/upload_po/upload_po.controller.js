(function() {
    'use strict';

    angular
        .module('app.project')
        .controller('Upload_PO_Controller', Upload_PO_Controller);

    /** @ngInject */
    function Upload_PO_Controller($scope, $mdDialog, selectedProject, projectService) {

        var select_project = selectedProject;
        var vm = this;

        vm.closeDialog = closeDialog;
        
        $scope.uploadData = {
            PurchaseDate : new Date(),
            DrillDate : new Date()
        };

        function closeDialog() {
            $mdDialog.hide();
        }

        $scope.uploadPO = function() {

            var file = document.getElementById('fileInput').value;
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
