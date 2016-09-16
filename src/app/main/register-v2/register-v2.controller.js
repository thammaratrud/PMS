(function ()
{
    'use strict';

    angular
        .module('app.register-v2')
        .controller('RegisterV2Controller', RegisterV2Controller);

    /** @ngInject */
    function RegisterV2Controller($scope, $timeout, authService, $location)
    {
        $scope.formRegister = {};
        // Methods
        $scope.register = function() {

            // $scope.registration = {
            //     userName: $scope.formRegister.email,
            //     password: $scope.formRegister.password,
            //     confirmPassword: $scope.formRegister.passwordConfirm
            // };

            $scope.registration = {
                email: $scope.formRegister.email,
                password: $scope.formRegister.password,
                confirmPassword: $scope.formRegister.passwordConfirm
            };

            authService.saveRegistration($scope.registration).then(function(response) {
                    startTimer();
                },
                function(response) {

                });

        }

        var startTimer = function() {
                var timer = $timeout(function() {
                    $timeout.cancel(timer);
                    $location.path('/login-v2');
                }, 1000);
            }
            //////////
    }
})();