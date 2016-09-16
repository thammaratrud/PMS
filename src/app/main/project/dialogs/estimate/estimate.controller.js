(function() {
    'use strict';

    angular
        .module('app.project')
        .controller('EstimateController', EstimateController);

    /** @ngInject */
    function EstimateController($scope, $rootScope, $mdDialog, selectedProject, projectService) {

        var vm = this;
        var selected_project = selectedProject;
        $scope.checkPeriod = 0;


        $scope.budgetData = {
            "ProjectID": selected_project.BudgetInfo.ProjectID,
            "Price": selected_project.BudgetInfo.Price,
            "Budget": selected_project.BudgetInfo.Budget,
            "IsIncludeVat": selected_project.BudgetInfo.IsIncludeVat
        };
        // Methods
        vm.closeDialog = closeDialog;
        $scope.checkPeriodPercent = false;
        $scope.estimateStatus = false;
        $scope.modeEdit = false;
        $scope.periodInfo = {};
        $scope.periodOriginal = selected_project.PeriodInfo;
        $scope.periodData = angular.copy($scope.periodOriginal);

        angular.forEach($scope.periodData, function(period) {
            $scope.checkPeriod += period.PeriodPercent;
        });
        if ($scope.checkPeriod >= 100) {
            $scope.checkPeriodPercent = false;
            $scope.checkPeriod = 0;
        } else {
            $scope.checkPeriodPercent = true;
            $scope.checkPeriod = 0;
        }
        //////////
        $scope.calculateAmout = function() {
            var checkAmout = 0;
            angular.forEach($scope.periodData, function(period) {

                checkAmout += period.PeriodPercent;

            })
            if ($scope.modeEdit == true) {
                if (checkAmout <= 100) {
                    var newAmout = ($scope.budgetData.Price * $scope.periodInfo.PeriodPercent) / 100;
                    $scope.periodInfo.PeriodAmout = parseInt(newAmout);
                } else {
                    $scope.periodInfo.PeriodPercent = $scope.periodInfo.PeriodPercent + (100 - checkAmout);
                    var newAmout = ($scope.budgetData.Price * $scope.periodInfo.PeriodPercent) / 100;
                    $scope.periodInfo.PeriodAmout = parseInt(newAmout);
                }

            } else {
                if ((checkAmout + $scope.periodInfo.PeriodPercent) <= 100) {
                    var newAmout = ($scope.budgetData.Price * $scope.periodInfo.PeriodPercent) / 100;
                    $scope.periodInfo.PeriodAmout = parseInt(newAmout);
                } else {
                    $scope.periodInfo.PeriodPercent = 100 - checkAmout;
                    var newAmout = ($scope.budgetData.Price * $scope.periodInfo.PeriodPercent) / 100;
                    $scope.periodInfo.PeriodAmout = parseInt(newAmout);
                }
            }



        }
        $scope.calculatePercent = function() {
            var chachedPercent = 0;
            angular.forEach($scope.periodData, function(period) {

                chachedPercent += period.PeriodAmout;

            })
            if ($scope.modeEdit == true) {
                if (chachedPercent <= $scope.budgetData.Price) {
                    var newPercent = ($scope.periodInfo.PeriodAmout / $scope.budgetData.Price) * 100;
                    $scope.periodInfo.PeriodPercent = parseInt(newPercent);
                } else {
                    $scope.periodInfo.PeriodAmout =  $scope.periodInfo.PeriodAmout + ($scope.budgetData.Price - chachedPercent);
                    var newPercent = ($scope.periodInfo.PeriodAmout / $scope.budgetData.Price) * 100;
                    $scope.periodInfo.PeriodPercent = parseInt(newPercent);
                }

            } else {
                if ((chachedPercent + $scope.periodInfo.PeriodAmout) <= $scope.budgetData.Price) {
                    var newPercent = ($scope.periodInfo.PeriodAmout / $scope.budgetData.Price) * 100;
                    $scope.periodInfo.PeriodPercent = parseInt(newPercent);
                } else {
                    $scope.periodInfo.PeriodAmout = $scope.budgetData.Price - chachedPercent;
                    var newPercent = ($scope.periodInfo.PeriodAmout / $scope.budgetData.Price) * 100;
                    $scope.periodInfo.PeriodPercent = parseInt(newPercent);
                }
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
            angular.forEach($scope.periodData, function(period) {
                $scope.checkPeriod += period.PeriodPercent;
            });
            if ($scope.checkPeriod >= 100) {
                $scope.checkPeriodPercent = false;
                $scope.checkPeriod = 0;
            } else {
                $scope.checkPeriodPercent = true;
                $scope.checkPeriod = 0;
            }
            $scope.periodInfo = {};
            $scope.estimateStatus = false;
            $scope.modeEdit = false;

            // "PeriodID": 1,

        }

        $scope.removePeriod = function() {
            var remove = $scope.periodData.indexOf($scope.periodInfo);

            if (remove > -1) {
                $scope.periodData.splice(remove, 1);
            }
            $scope.periodInfo = {};
            $scope.modeEdit = true;
        }

        //swith//
        // $scope.dataSwith = {
        //     cb1: true
        // };

        //swith//

        $scope.changePeriodItem = function(periodItem, periodStatus, edit) {
            if (periodStatus != 'PERIOD_RECEIPTED') {
                $scope.estimateStatus = true;
                $scope.periodInfo = periodItem;
            }

            if (edit == 'edit') {
                $scope.modeEdit = true;
            }

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
