(function () {
    'use strict';

    angular
        .module('gameFace')
        .factory('TeamData', TeamData);

    TeamData.$inject = ['$resource', '$q'];

    /* @ngInject */
    function TeamData($resource, $q) {

        var resource = $resource('/data/team/:id.json', {id: '@id'});
        return {
            getTeam: function (id) {
                var deferred = $q.defer();
                resource
                    .get(
                        {id: id},
                        function (team) {
                            deferred.resolve(team);
                        },
                        function (response) {
                            deferred.reject(response);
                        }
                    );
                return deferred.promise;
            },
            save: function (team) {
                var deferred = $q.defer();
                team.id = 2; // we just fake the team id, it'll be saved to disk
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
