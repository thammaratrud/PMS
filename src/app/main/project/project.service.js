(function() {
    'use strict';

    angular
        .module('fuse')
        .factory('projectService', projectServices);

    /** @ngInject */
    function projectServices(api, $http, $q) {

        var serviceBase = api.baseUrl;
        var projectServiceFactory = {};


        var _getProject = function() {

            var deferred = $q.defer();

            $http.get('http://www.w3schools.com/angular/customers.php').success(function(response) {

                deferred.resolve(response);

            }).error(function(err, status) {

                deferred.reject(err);
            });
            // 
            // var response = "Hello";
            // deferred.resolve(response);
            // 
            return deferred.promise;

        };

        var _getMe = function() {

            var deferred = $q.defer();

            // $http.get('http://www.w3schools.com/angular/customers.php').success(function(response) {

            //     deferred.resolve(response);

            // }).error(function(err, status) {

            //     deferred.reject(err);
            // });
            // 
            var response = [{
                name: "Kanitthakan",
                nickname: "Buay"
            }, {
                name: "Kanitthakan2",
                nickname: "Buay2"
            }];
            deferred.resolve(response);
            // 
            return deferred.promise;

        };
        projectServiceFactory.getProject = _getProject;
        projectServiceFactory.getMe = _getMe;

        return projectServiceFactory;
    }

})();
