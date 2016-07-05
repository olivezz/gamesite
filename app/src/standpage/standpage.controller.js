(function () {
    'use strict';

    angular
        .module('gameFace')
        .controller('StandController', StandController);

    StandController.$inject = ['$rootScope'];

    /* @ngInject */
    function StandController($rootScope) {

        $rootScope.pageName ='Game Face';
        $rootScope.loggedIn = false;
        //console.log($rootScope);
    }

}());
