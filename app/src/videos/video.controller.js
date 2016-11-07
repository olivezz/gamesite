(function () {

'use strict';

    angular
        .module('gameFace')
        .controller('VideoController', VideoController);

    VideoController.$inject = ['VideoData', '$routeParams' ];

    function VideoController(VideoData, $routeParams) {

        var vm = this;
        vm.Video = {};

        vm.create = create;
        vm.update = update;
        vm.remove = remove;
        vm.edit = edit;

        activate($routeParams.videoId);

        function create(video, form) {

            console.log(video);
            if(form.$valid) {
                console.log('vm.create() - form valid, saving...');
                VideoData.save(video)
                    .then(
                        function(response) {
                            console.log('success', response);
                        },
                        function(response) { console.log('failure', response); }
                    );
            }
        }

        function update(key) {
            var id = vm.blacklistDomains[key].id;
            blacklistData.update(id, vm.updatedName)
                .then(function (result) {
                    if (result.id === id && result.domain === vm.updatedName) {
                        vm.blacklistDomains[key] = result;
                        vm.edit(key, true);
                    }
                });
        }

        function remove(key) {
            var videoItem = vm.blacklistDomains[key];
            videoData.remove(blackItem.id)
                .then(function (result) {
                    if (result.status === 204) {
                        vm.blacklistDomains.splice(key, 1);
                    }
                });
        }

        function edit(key, done) {
            vm.updatedName = vm.blacklistDomains[key].domain;
            key++;
            var td = $('tbody tr:nth-child(' + key + ') td:nth-child(2)');
            td.find('span').toggle();
            td.find('form').toggle().find('input').select();
        }

        function activate(id) {
            VideoData.getVideo(id)
                .then(function(video) {
                    vm.Video = video;
                })
                .catch(function (error) {
                    consol.log(error);
                });
        }

    }


}());
