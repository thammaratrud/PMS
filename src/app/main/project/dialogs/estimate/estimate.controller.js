(function() {
    'use strict';

    angular
        .module('app.project')
        .controller('EstimateController', EstimateController);

    /** @ngInject */
    function EstimateController($scope, $mdDialog, selectedProject, projectService) {

        var vm = this;
        var selected_project = selectedProject;
        $scope.budgetData = {
            "ProjectID": selected_project.BudgetInfo.ProjectID,
            "Price": selected_project.BudgetInfo.Price,
            "Budget": selected_project.BudgetInfo.Budget,
            "IsIncludeVat": selected_project.BudgetInfo.IsIncludeVat
        };
        // Methods
        vm.closeDialog = closeDialog;
        $scope.estimateStatus = false;
        //////////

        function closeDialog() {
            $mdDialog.hide();
        }


        $scope.addEstimate = function() {
            if ($scope.estimateStatus == false) {

                $scope.estimateStatus = true;
            } else {
                $scope.estimateStatus = false;
            }


        }

        //swith//
        // $scope.dataSwith = {
        //     cb1: true
        // };

        //swith//
        $scope.sendEstimate = function() {

            var projectData = selected_project;
            $scope.budgetData.ProjectID = selected_project.ProjectID;
            projectData.BudgetInfo = $scope.budgetData;

            projectService.putProject(projectData).then(function() {
                console.log('Success');
            }, function(err) {
                console.log('Fail');
            })
        }
    }
})();
