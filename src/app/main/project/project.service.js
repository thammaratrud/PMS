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

            $http.get(serviceBase + 'api/ProjectDatas').success(function(response) {

                deferred.resolve(response);

            }).error(function(err, status) {

                deferred.reject(err);
            });

            return deferred.promise;

        }

        var _postProject = function(data) {

            var deferred = $q.defer();

            $http.post(serviceBase + 'api/ProjectDatas', data).success(function(response) {

                deferred.resolve(response);

            }).error(function(err, status) {

                deferred.reject(err);
            });

            return deferred.promise;

        }

        var _putProject = function(data) {

            var deferred = $q.defer();

            $http.put(serviceBase + 'api/ProjectDatas/' + data.ProjectID, data).success(function(response) {

                deferred.resolve(response);

            }).error(function(err, status) {

                deferred.reject(err);
            });

            return deferred.promise;

        };

        var _upLoadFile = function(formData) {

            var deferred = $q.defer();

            $http.post(serviceBase + 'api/Upload', formData, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }).then(function(result) {
                // do sometingh
                deferred.resolve(result);
            }, function(err) {
                // do sometingh

                deferred.reject(err);
            });

            return deferred.promise;

        };

        var _getFileList = function(projectCode) {

            var deferred = $q.defer();

            $http.get(serviceBase + 'api/GetFileList?projectCode=' + projectCode).then(function(result) {
                // do sometingh
                deferred.resolve(result);
            }, function(err) {
                // do sometingh

                deferred.reject(err);
            });

            return deferred.promise;

        };

        var _downloadFile = function(filename) {

            var deferred = $q.defer();

            $http.get(serviceBase + 'api/Download?fileName=' + filename).then(function(result) {
                // do sometingh
                deferred.resolve(result);
            }, function(err) {
                // do sometingh

                deferred.reject(err);
            });

            return deferred.promise;

        };


        projectServiceFactory.getProject = _getProject;
        projectServiceFactory.postProject = _postProject;
        projectServiceFactory.putProject = _putProject;
        projectServiceFactory.upLoadFile = _upLoadFile;
        projectServiceFactory.getFileList = _getFileList;
        projectServiceFactory.downloadFile = _downloadFile;

        return projectServiceFactory;
    }

})();
