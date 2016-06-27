(function () {
    'use strict';

    angular
        .module('leaderBoard')
        .factory('blacklistData', blacklistData);

    blacklistData.$inject = ['$q', '$http'];

    /* @ngInject */
    function blacklistData($q, $http) {
        var service = {
            get: get,
            update: update,
            create: create,
            remove: remove
        };
        return service;

        function get() {
            return $http.get('/leaderboard/blacklists')
                .then(successCallback)
                .catch(errorCallback);
        }

        function update(id, value) {
            return $http.patch('/leaderboard/blacklists/' + id,
                {
                    domain: value
                }
            ).then(successCallback)
                .catch(errorCallback);
        }

        function create(value) {
            return $http.post('/leaderboard/blacklists/',
                {
                    domain: value
                }
            ).then(successCallback)
                .catch(errorCallback);
        }

        function remove(id) {
            return $http.delete('/leaderboard/blacklists/' + id)
                .then(function (result) {
                    return result;
                })
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

