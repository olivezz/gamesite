(function () {
    'use strict';

    angular
        .module('gameFace')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$rootScope'];

    /* @ngInject */
    function HomeController($rootScope) {

        $rootScope.pageName ='Game Face';
        $rootScope.loggedIn = false;
        //console.log($rootScope);

    }

}());
