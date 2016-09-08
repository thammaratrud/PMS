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
        $scope.periodOriginal = selected_project.PeriodInfo;
        $scope.periodData = angular.copy($scope.periodOriginal);
        //////////
        $scope.calculateAmout = function() {
            var checkAmout = 0;
            angular.forEach($scope.periodData, function(period) {

                checkAmout += period.PeriodPercent;

            })
            if ((checkAmout + $scope.periodInfo.PeriodPercent) <= 100) {
                var newAmout = ($scope.budgetData.Price * $scope.periodInfo.PeriodPercent) / 100;
                $scope.periodInfo.PeriodAmout = parseInt(newAmout);
            }else{
                $scope.periodInfo.PeriodPercent = 100 - checkAmout;
                var newAmout = ($scope.budgetData.Price * $scope.periodInfo.PeriodPercent) / 100;
                $scope.periodInfo.PeriodAmout = parseInt(newAmout);
            }


        }
        $scope.calculatePercent = function() {
            var chachedPercent = 0;
            angular.forEach($scope.periodData, function(period) {

                chachedPercent += period.PeriodAmout;

            })

            if ((chachedPercent + $scope.periodInfo.PeriodAmout) <= $scope.budgetData.Price) {
                var newPercent = ($scope.periodInfo.PeriodAmout / $scope.budgetData.Price) * 100;
                $scope.periodInfo.PeriodPercent = parseInt(newPercent);
            } else {
                $scope.periodInfo.PeriodAmout = $scope.budgetData.Price - chachedPercent;
                var newPercent = ($scope.periodInfo.PeriodAmout / $scope.budgetData.Price) * 100;
                $scope.periodInfo.PeriodPercent = parseInt(newPercent);
            }

        }

        function closeDialog() {
            $mdDialog.hide();
            $scope.periodData = $scope.periodOriginal;
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
            $scope.periodInfo.PeriodStatus = "";
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

            projectService.putProject(projectData).then(function(data) {
                console.log('Post estimate success.');
                closeDialog();
                $rootScope.chart_progress();
                $rootScope.reloadCost();
            }, function(err) {
                console.log('Post estimate fail.');
            })
        }
    }
})();
