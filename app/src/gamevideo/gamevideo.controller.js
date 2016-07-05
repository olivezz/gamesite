(function () {
    'use strict';

    angular
        .module('gameFace')
        .controller('GameFaceController', GameFaceController);

    GameFaceController.$inject = ['gameVideoData'];

    /* @ngInject */
    function GameFaceController(gameVideoData) {

        var vm = this;
        vm.Videos = [];
        
        vm.remove = remove;
        vm.update = update;
        vm.create = create;
        vm.edit = edit;

        activate();

        function remove(key) {
            var blackItem = vm.blacklistDomains[key];
            blacklistData.remove(blackItem.id)
                .then(function (result) {
                    if (result.status === 204) {
                        vm.blacklistDomains.splice(key, 1);
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

        function create() {
            blacklistData.create(vm.newName)
                .then(function (result) {
                    if (result.id && vm.newName === result.domain) {
                        vm.blacklistDomains.unshift(result);
                        vm.newName = '';
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
                });
        }
    }

}());

