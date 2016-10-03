(function() {
    'use strict';

    angular
        .module('app.project')
        .controller('AddcostController', AddcostController);

    /** @ngInject */
    function AddcostController($scope, $rootScope, $mdDialog, selectedProject, projectService) {

        var select_project = selectedProject;
        var vm = this;
        var cost = select_project.CostInfo;
        // Methods
        vm.closeDialog = closeDialog;
        $scope.optionName = [{
            EmpID: 1,
            Name: 'Kanitthakan Jaidee'

        }, {
            EmpID: 2,
            Name: 'Sarayut Kungsaranuwat'

        }];

        $scope.optionType = ['ค่าน้ำมัน', 'ค่าทางด่วน', 'ค่าจอดรถ'];
        $scope.selectName = {};
        $scope.addCost = {};
        $scope.message = 'false';
        $scope.files;
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


        $scope.data = {
            cb1: true,
            cb4: true,
            cb5: false
        };



        $scope.onChange = function(cbState) {
            $scope.message = cbState;

        };
        $scope.checkCost = function() {

            var costTotal = 0;
            if (select_project.CostInfo.length > 0) {
                angular.forEach(select_project.CostInfo, function(cost) {
                    costTotal += cost.CostAmount;
                });
                if (($scope.addCost.CostAmount + costTotal) > select_project.BudgetInfo.Budget) {
                    $scope.addCost.CostAmount = select_project.BudgetInfo.Budget - costTotal;
                }
            } else {
                if ($scope.addCost.CostAmount > select_project.BudgetInfo.Budget) {
                    $scope.addCost.CostAmount = select_project.BudgetInfo.Budget;
                }
            }

        }

        $scope.sendCost = function() {

            var fileName = "";
            var formData = new FormData();
            var dateCost = moment($scope.addCost.CostDate).format('YYYYMMDD');
            angular.forEach($scope.files, function(obj) {
                var fileType = obj.lfFile.name.split('.');
                var type = fileType[fileType.length - 1];
                fileName = select_project.ProjectCode + "_Cost" + dateCost + "(" + angular.fromJson($scope.selectName).EmpID + ")." + type;
                formData.append('files[]', obj.lfFile, fileName);
            });

            projectService.upLoadFile(formData).then(function(response) {

                console.log('upload success.' + JSON.stringify(response));

                var file = fileName;
                $scope.addCost.ProjectID = select_project.ProjectID;
                $scope.addCost.CostEmp = angular.fromJson($scope.selectName).Name;
                $scope.addCost.EmpID = angular.fromJson($scope.selectName).EmpID;
                $scope.addCost.CostFile = file;
                $scope.addCost.Created = new Date();

                cost.push($scope.addCost);

                select_project.CostInfo = cost;

                projectService.putProject(select_project).then(function() {
                    console.log('Update cost success.');
                    $rootScope.chart_progress();
                    $rootScope.reloadCost();
                    $rootScope.getFileList();
                }, function(err) {
                    console.log('Update cost fail.');
                })
            }, function(err) {
                console.log('upload error.' + JSON.stringify(err));
            })

            $scope.selectName = {};

            closeDialog()
        }

        // "ProjectID": "1",

    }
})();
