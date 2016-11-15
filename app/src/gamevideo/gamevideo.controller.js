(function () {
    'use strict';

    angular
        .module('gameFace')
        .controller('VideoController', VideoController);

    VideoController.$inject = ['gameVideoData'];

    /* @ngInject */
    function VideoController(gameVideoData) {

        var vm = this;
        vm.Videos = [];

        vm.video = {
            name: '',       //string
            type: '',       //video_type
            size: '',       //integer
            noOfViews: '',  //integer
            created:  ''    //Timestamp
        }


        vm.remove = remove;
        vm.update = update;
        vm.create = create;
        vm.edit = edit;

        activate();

        function create() {
            gameVideoData.create(vm.newName)
                .then(function (result) {
                    if (result.id && vm.newName === result.domain) {
                        vm.blacklistDomains.unshift(result);
                        vm.newName = '';
                    }
                });
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

        function activate() {
            gameVideoData.get()
                .then(function (result) {
                    vm.Videos = result;
                })
                .catch(function (error) {
                    consol.log(error);
                });
        }
    }

}());

