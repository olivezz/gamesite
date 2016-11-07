(function () {
    'use strict';

    angular
        .module('gameFace')
        .factory('VideoData', VideoData);

    VideoData.$inject = ['$resource', '$q'];

    /* @ngInject */
    function VideoData($resource, $q) {

        var resource = $resource('/data/video/:id.json', {id: '@id'});
        return {
            getVideo: function (id) {
                var deferred = $q.defer();
                resource
                    .get(
                        {id: id},
                        function (video) {
                            deferred.resolve(video);
                        },
                        function (response) {
                            deferred.reject(response);
                        }
                    );
                console.log(deferred.promise);
                return deferred.promise;
            },
            save: function (video) {
                var deferred = $q.defer();
                video.id = 2; // we just fake the video id, it'll be saved to disk
                resource.save(
                    video,
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
