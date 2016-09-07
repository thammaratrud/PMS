(function() {
    'use strict';

    angular
        .module('app.project')
        .controller('EditController', EditController);

    /** @ngInject */
    function EditController($scope, $mdDialog, selectedProject, projectService) {

        $scope.select_project = selectedProject;
        var vm = this;
        // Data
        // Methods
        vm.closeDialog = closeDialog;

        vm.formWizard = {};
        vm.formWizard2 = {};
        vm.formWizard3 = {};
        //////////
        vm.states = ['Project Manager', 'Accounting'];


        $scope.addAttenStatus = false;
        $scope.scopeOfWorkStatus = false;

        $scope.customerDetailInfo = $scope.select_project.CustomerInfo.CustomerDetailInfo;
        $scope.scopeOfWorkInfo = $scope.select_project.ScopeInfo;

        function closeDialog() {
            $mdDialog.hide();
        }
        $scope.addAttention = function() {
            if ($scope.addAttenStatus == false) {
                $scope.addAttenStatus = true;

            } else {
                $scope.addAttenStatus = false;

            }
        }


        // step2
        $scope.attention = function() {
            $scope.addAttenStatus = false;

            var remove = $scope.customerDetailInfo.indexOf(vm.formWizard2);

            if (remove > -1) {
                $scope.customerDetailInfo.splice(remove, 1);
            }

            var project_id = $scope.select_project.ProjectID;
            var customer_id = $scope.customerDetailInfo.length + 1;
            vm.formWizard2.CustomerID = customer_id;
            vm.formWizard2.CompanyID = "1-" + project_id;
            vm.formWizard2.CustomerStateValue = "";
            $scope.customerDetailInfo.push(vm.formWizard2);
            vm.formWizard2 = {};
        }

        $scope.removeAttention = function() {
            var remove = $scope.customerDetailInfo.indexOf(vm.formWizard2);

            if (remove > -1) {
                $scope.customerDetailInfo.splice(remove, 1);
            }
            vm.formWizard2 = {};
        }

        $scope.addScopeOfWork = function() {
            if ($scope.scopeOfWorkStatus == false) {
                $scope.scopeOfWorkStatus = true;

            } else {
                $scope.scopeOfWorkStatus = false;

            }
        }

        $scope.removeScope = function() {
            var remove = $scope.scopeOfWorkInfo.indexOf(vm.formWizard3);

            if (remove > -1) {
                $scope.scopeOfWorkInfo.splice(remove, 1);
            }
            vm.formWizard3 = {};
        }

        $scope.scopeOfWork = function() {
            $scope.scopeOfWorkStatus = false;

            var remove = $scope.scopeOfWorkInfo.indexOf(vm.formWizard3);

            if (remove > -1) {
                $scope.scopeOfWorkInfo.splice(remove, 1);
            }

            var project_id = $scope.select_project.ProjectID;
            vm.formWizard3.ProjectID = project_id;
            $scope.scopeOfWorkInfo.push(vm.formWizard3);
            vm.formWizard3 = {};
        }

        $scope.sendEditProject = function() {
            console.log($scope.select_project);
            projectService.putProject($scope.select_project).then(function(response) {
                console.log('edit project success.');
                $rootScope.chart_progress();
                closeDialog();
            }, function(err) {
                console.log('edit project fail : ' + JSON.stringify(err));
            })
        }

        $scope.changeCustomerDetail = function(atten) {
            $scope.addAttenStatus = true;
            vm.formWizard2 = atten;
        }

        $scope.changeScope = function(atten) {
            $scope.scopeOfWorkStatus = true;
            vm.formWizard3 = atten;
        }

    }
})();
