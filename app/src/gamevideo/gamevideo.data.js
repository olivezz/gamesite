(function () {
    'use strict';

    angular
        .module('gameFace')
        .factory('gameVideoData', gameVideoData);

    gameVideoData.$inject = ['$q', '$http'];

    /* @ngInject */
    function gameVideoData($q, $http) {
        var service = {
            get: get,
            update: update,
            create: create,
            remove: remove
        };
        return service;

        function get() {
            var videos = [
                {
                    id: 1,
                    name: 'game1',
                    date: '1467300630',
                    url: 'https://www.youtube.com/watch?v=QWVrUwtQZco',
                    likes: '500'
                }
            ];
            var deferred = $q.defer();
            deferred.resolve(videos);
            return deferred.promise;
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

