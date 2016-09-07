(function() {
    'use strict';

    angular
        .module('app.project')
        .controller('EstimateController', EstimateController);

    /** @ngInject */
    function EstimateController($scope, $rootScope, $mdDialog, selectedProject, projectService) {

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
        $scope.periodInfo = {};
        $scope.periodData = selected_project.PeriodInfo;
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
        $scope.period = function() {

            var remove = $scope.periodData.indexOf($scope.periodInfo);

            if (remove > -1) {
                $scope.periodData.splice(remove, 1);
            }

            $scope.periodInfo.ProjectID = selected_project.ProjectID;
            $scope.periodInfo.PeriodStatus = "Wait";
            $scope.periodInfo.InvoiceNo = "";
            $scope.periodInfo.InvoiceDate = new Date();
            $scope.periodInfo.InvoiceFile = "";
            $scope.periodInfo.AppNo = "";
            $scope.periodInfo.AppDate = new Date();
            $scope.periodInfo.AppFile = "";
            $scope.periodInfo.ReceiptNo = "";
            $scope.periodInfo.ReceiptDate = new Date();
            $scope.periodInfo.ReceiptFile = "";



            $scope.periodData.push($scope.periodInfo);
            $scope.periodInfo = {};
            $scope.estimateStatus = false;

            // "PeriodID": 1,

        }

        $scope.removePeriod = function() {
            var remove = $scope.periodData.indexOf($scope.periodInfo);

            if (remove > -1) {
                $scope.periodData.splice(remove, 1);
            }
            $scope.periodInfo = {};
        }

        //swith//
        // $scope.dataSwith = {
        //     cb1: true
        // };

        //swith//

        $scope.changePeriodItem = function(periodItem) {
            $scope.estimateStatus = true;
            $scope.periodInfo = periodItem;
        }

        $scope.sendEstimate = function() {

            var projectData = selected_project;
            $scope.budgetData.ProjectID = selected_project.ProjectID;
            projectData.BudgetInfo = $scope.budgetData;
            projectData.PeriodInfo = $scope.periodData;

            projectService.putProject(projectData).then(function() {
                console.log('Post estimate success.');
                $rootScope.chart_progress();
            }, function(err) {
                console.log('Post estimate fail.');
            })
        }
    }
})();
