(function () {
    'use strict';
    angular.module('leaderBoard')
        .service('RestService', RestService);

    RestService.$inject = [ '$q', '$http' ];

    function RestService( $q, $http ) {
        
        return {
            getDataSetCount: getDataSetCount,
            getProjectCommitCount: getProjectCommitCount,
            getOrganizationsContributions: getOrganizationsContributions,
            getQualityLeader: getQualityLeader,
            getTechnicalDebt: getTechnicalDebt,
            getBlacklistedDomains: getBlacklistedDomains,
            getOrganizationSummary: getOrganizationSummary,
            getOrganizationContributors: getOrganizationContributors,
            getOrganizationProjects: getOrganizationProjects,
            getCodeCoverageLeader: getCodeCoverageLeader,
            getCodeCoverage: getCodeCoverage
        };
        function getDataSetCount() {
            return $http.get('/leaderboard/service/project/count')
                .then(successCallback)
                .catch(errorCallback);
        }

        function getProjectCommitCount() {
            return $http.get('/leaderboard/service/project/commit/count')
                .then(successCallback)
                .catch(errorCallback);
        }

        function getOrganizationsContributions() {
            return $http.get('/leaderboard/service/contributor/emailDomain/contributions')
                .then(successCallback)
                .catch(errorCallback);
        }

        function getQualityLeader() {
            return $http.get('/leaderboard/service/organization/leaders/quality')
                .then(successCallback)
                .catch(errorCallback);
        }

        function getTechnicalDebt(organizationName) {
            return $http.get('/leaderboard/service/organization/debt?organization=' + organizationName)
                .then(successCallback)
                .catch(errorCallback);
        }

        function getBlacklistedDomains() {
            return $http.get('/leaderboard/service/contributor/emailDomain/excluded')
                .then(successCallback)
                .catch(errorCallback);
        }

        function getOrganizationSummary(organizationName) {
            return $http.get('/leaderboard/service/organization/search?name=' + organizationName)
                .then(successCallback)
                .catch(errorCallback);
        }

        function getOrganizationContributors(organizationName) {
            return $http.get('/leaderboard/service/organization/contributors?organization=' + organizationName)
                .then(successCallback)
                .catch(errorCallback);
        }

        function getOrganizationProjects(organizationName) {
            return $http.get('/leaderboard/service/organization/projects?organization=' + organizationName)
                .then(successCallback)
                .catch(errorCallback);
        }

        function getCodeCoverageLeader() {
            return $http.get('/leaderboard/service/organization/leaders/tests')
                .then(successCallback)
                .catch(errorCallback);
        }

        function getCodeCoverage(organizationName) {
            return $http.get('/leaderboard/service/organization/coverage?organization=' + organizationName)
                .then(successCallback)
                .catch(errorCallback);
        }

        function successCallback(result) {
            return result.data;
        }

        function errorCallback(response) {
            return $q.reject('Error retrieving data. (HTTP status: ' + response.status + ')');
        }
    }
}());