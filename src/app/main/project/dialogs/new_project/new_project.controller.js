(function() {
    'use strict';

    angular
        .module('app.project')
        .controller('NewProjectController', NewProjectController);

    /** @ngInject */
    function NewProjectController($scope, $mdDialog) {
        var vm = this;

        // Data
        // Methods
        vm.closeDialog = closeDialog;
        vm.sendProject = sendProject;

        vm.formWizard = {};
        vm.formWizard2 = {};
        vm.formWizard3 = {};
        //////////
        vm.states = ['1', '2', '3'];


        $scope.addAttenStatus = false;
        $scope.scopeOfWorkStatus = false;

        $scope.attentionInfo = [];
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


        // step2
        $scope.attention = function() {
            $scope.addAttenStatus = false;

            $scope.attentionInfo.push(vm.formWizard2);
            vm.formWizard2 = {};
        }
        $scope.addScopeOfWork = function() {
            if ($scope.scopeOfWorkStatus == false) {
                $scope.scopeOfWorkStatus = true;

            } else {
                $scope.scopeOfWorkStatus = false;

            }
        }
        $scope.scopeOfWork = function() {
            $scope.scopeOfWorkStatus = false;
            $scope.scopeOfWorkInfo.push(vm.formWizard3);
            vm.formWizard3 = {};
        }

        function sendProject() {
            console.log(vm.formWizard);
            console.log($scope.attentionInfo);
            console.log($scope.scopeOfWorkInfo);
            closeDialog();
        }
    }
})();
