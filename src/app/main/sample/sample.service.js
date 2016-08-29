(function() {
    'use strict';

    angular
        .module('fuse')
        .factory('sampleService', sampleService);

    /** @ngInject */
    function sampleService(api, $http, $q) {

        var serviceBase = api.baseUrl;
        var authServiceFactory = {};


        var _getProject = function() {

            var deferred = $q.defer();

            // $http.get('http://localhost:5145/api/EmployeeDatas').success(function(response) {

            //     deferred.resolve(response);

            // }).error(function(err, status) {

            //     deferred.reject(err);
            // });
            // 
            var response = "Hello";
            deferred.resolve(response);
            // 
            return deferred.promise;

        };

        authServiceFactory.getProject = _getProject;

        return authServiceFactory;
    }

})();
