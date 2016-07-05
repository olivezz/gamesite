
(function () {
    'use strict';

    angular
        .module('gameFace')
        .controller('TeamController', TeamController);

    TeamController.$inject = ['$rootScope'];

    /* @ngInject */
    function TeamController($rootScope) {

        $rootScope.pageName ='Team page';
        $rootScope.loggedIn = false;

    }

}());
