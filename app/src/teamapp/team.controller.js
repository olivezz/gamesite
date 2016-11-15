(function () {

'use strict';

    angular
        .module('gameFace')
        .controller('TeamController', TeamController);

    TeamController.$inject = ['TeamData', 'ToastService', '$rootScope', '$route', '$scope'];

    function TeamController(TeamData, ToastService, $rootScope, $route, $scope) {

        $rootScope.pageName = $route.current.pageTitle;

        var vm = this;
        vm.Team = {};
        vm.selection = "details";

        vm.create = create;
        vm.update = update;
        vm.remove = remove;
        vm.edit = edit;

        activate();

        function create(team, form) {

            console.log(team);
            if(form.$valid) {
                console.log('vm.create() - form valid, saving...');
                TeamData.save(team)
                    .then(
                        function(response) {
                            console.log('success', response);
                            vm.selection = "details";
                            vm.showSimpleToast("Saved success","success-toast");
                        },
                        function(response) {
                            console.log('failure', response);
                            vm.showSimpleToast("Saved failed","error-toast");
                        }
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

        function activate() {
            TeamData.getTeam(1)
                .then(function(Team) {
                    vm.Team = Team;
                })
                .catch(function (error) {
                    consol.log(error);
                });
        }

        vm.showSimpleToast = function(message,theme) {
            ToastService.showSimpleToast(message,theme);
        }

    }


}());
