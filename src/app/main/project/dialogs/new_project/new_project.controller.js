(function() {
    'use strict';

    angular
        .module('app.project')
        .controller('NewProjectController', NewProjectController);

    /** @ngInject */
    function NewProjectController($scope, $rootScope, $mdDialog, projectData, projectService) {

        var vm = this;

        vm.closeDialog = closeDialog;
        vm.formWizard = {};
        vm.formWizard2 = {};
        vm.formWizard3 = {};

        $scope.states = ['Project Manager', 'Accounting'];
        $scope.addAttenStatus = false;
        $scope.scopeOfWorkStatus = false;
        $scope.customerDetailInfo = [];
        $scope.scopeOfWorkInfo = [];

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

        $scope.attention = function() {

            var remove = $scope.customerDetailInfo.indexOf(vm.formWizard2);

            if (remove > -1) {
                $scope.customerDetailInfo.splice(remove, 1);
            }

            $scope.addAttenStatus = false;
            if (projectData) {
                var project_id = projectData.length + 1;
            } else {
                var project_id = 1;
            }
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

            var remove = $scope.scopeOfWorkInfo.indexOf(vm.formWizard3);

            if (remove > -1) {
                $scope.scopeOfWorkInfo.splice(remove, 1);
            }

            $scope.scopeOfWorkStatus = false;

            var scope_id = $scope.scopeOfWorkInfo.length + 1;
            var project_id = projectData.length + 1;
            vm.formWizard3.ProjectID = project_id;
            // vm.formWizard3.ScopeID = scope_id;
            $scope.scopeOfWorkInfo.push(vm.formWizard3);
            vm.formWizard3 = {};
        }

        $scope.sendProject = function() {

            if (projectData) {

                var project_id = projectData.length + 1;
            } else {
                var project_id = 1;
            }

            var data = {
                "ProjectID": project_id,
                "ProjectCode": vm.formWizard.project_code,
                "ProjectName": vm.formWizard.project_name,
                "ProjectStatus": "Pause",
                "ProjectDuration": vm.formWizard.duration,
                "ScopeInfo": $scope.scopeOfWorkInfo,
                "CustomerInfo": {
                    "ProjectID": project_id,
                    "CompanyID": "1-" + project_id,
                    "CompanyName": vm.formWizard.client,
                    "CompanyAddress": vm.formWizard.company_address,
                    "CustomerDetailInfo": $scope.customerDetailInfo
                },
                "BudgetInfo": {
                    "ProjectID": project_id,
                    "Price": 0,
                    "Budget": 0,
                    "IsIncludeVat": false
                },
                "PeriodInfo": [],
                "QuotationInfo": {
                    "ProjectID": project_id,
                    "QuotationNo": "",
                    "QuotationDate": new Date(),
                    "QuotationFile": ""
                },
                "PurchaseInfo": {
                    "ProjectID": project_id,
                    "PurchaseNo": "",
                    "PurchaseDate": new Date(),
                    "PurchaseFile": "",
                    "DrillDate": new Date()
                },
                "CostInfo": [],
                "TaskInfo": [],
                "DocumentInfo": []
            }
            projectService.postProject(data).then(function(response) {

                $rootScope.getProjectData();
                closeDialog();
                console.log('Create project success.');
            }, function(err) {
                console.log('Fail : ' + JSON.stringify(err))
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
