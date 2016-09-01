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

            $http.get('http://localhost:5145/api/ProjectDatas').success(function(response) {

                deferred.resolve(response);

            }).error(function(err, status) {

                deferred.reject(err);
            });

            return deferred.promise;

        }

        var _postProject = function(data) {

            var deferred = $q.defer();

            $http.post('http://localhost:5145/api/ProjectDatas', data).success(function(response) {

                deferred.resolve(response);

            }).error(function(err, status) {

                deferred.reject(err);
            });

            return deferred.promise;

        }

        var _putProject = function(data) {

            var deferred = $q.defer();

            $http.put('http://localhost:5145/api/ProjectDatas/' + data.ProjectID, data).success(function(response) {

                deferred.resolve(response);

            }).error(function(err, status) {

                deferred.reject(err);
            });

            return deferred.promise;

        };


        projectServiceFactory.getProject = _getProject;
        projectServiceFactory.postProject = _postProject;
        projectServiceFactory.putProject = _putProject;

        return projectServiceFactory;
    }

})();
