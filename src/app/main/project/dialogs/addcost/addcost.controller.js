(function() {
    'use strict';

    angular
        .module('app.project')
        .controller('AddcostController', AddcostController);

    /** @ngInject */
    function AddcostController($scope, $rootScope, $mdDialog, selectedProject, projectService) {
        var select_project = selectedProject;
        var vm = this;

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
        var cost = select_project.CostInfo;
        $scope.addCost = {};
        //////////

        function closeDialog() {
            $mdDialog.hide();
        }


        $scope.data = {
            cb1: true,
            cb4: true,
            cb5: false
        };

        $scope.message = 'false';

        $scope.onChange = function(cbState) {
            $scope.message = cbState;

        };
        $scope.sendCost = function() {

            var file = document.getElementById('fileInput').value;
            $scope.addCost.ProjectID = select_project.ProjectID;
            $scope.addCost.CostEmp = angular.fromJson($scope.selectName).Name;
            $scope.addCost.EmpID = angular.fromJson($scope.selectName).EmpID;
            $scope.addCost.CostFile = file;
            $scope.addCost.Created = new Date();

            cost.push($scope.addCost);

            select_project.CostInfo = cost;

            projectService.putProject(select_project).then(function() {
                console.log('Put cost success.');
            }, function(err) {
                console.log('Put cost fail.');
            })

            $scope.selectName = {};
            $rootScope.getProjectData();
            closeDialog()
        }

        // "ProjectID": "1",

    }
})();
