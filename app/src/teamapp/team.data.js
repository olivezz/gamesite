(function () {
    'use strict';

    angular
        .module('gameFace')
        .factory('TeamData', TeamData);

    TeamData.$inject = ['$resource', '$q'];

    /* @ngInject */
    function TeamData($resource, $q) {

        var resource = $resource('/data/team/:id', {id: '@id'});
        return {
            getTeam: function () {
                var deferred = $q.defer();
                console.log('teamData.getTeam()');
                resource
                    .get(
                        {id: 1},
                        function (team) {
                            deferred.resolve(team);
                        },
                        function (response) {
                            deferred.reject(response);
                        }
                    );
                var promise = deferred.promise;
                console.log(promise);
                return promise;
            },
            save: function (team) {
                var deferred = $q.defer();
                team.id = 999; // we just fake the team id, it'll be saved to disk
                resource.save(
                    team,
                    function (response) {
                        deferred.resolve(response);
                    },
                    function (response) {
                        deferred.reject(response);
                    }
                );
                console.log('save() returning promise');
                return deferred.promise;
            }
        }
    }

}());
