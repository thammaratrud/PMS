(function() {
    'use strict';

    angular
        .module('app.login-v2')
        .controller('LoginV2Controller', LoginV2Controller);

    /** @ngInject */
    function LoginV2Controller($scope, api, authService, $location) {
        
        $scope.form = {};

        $scope.logIn = function() {

            $scope.loginData = {
                userName: $scope.form.email,
                password: $scope.form.password,
                useRefreshTokens: false
            };

            authService.login($scope.loginData).then(function(response) {
                    $location.path('/project');
                },
                function(err) {
                    $scope.message = err.error_description;
                    console.log($scope.message);
                });

        }
    }
})();
