(function () {
    'use strict';

    angular
        .module('gameFace')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$rootScope', '$route'];

    /* @ngInject */
    function HomeController($rootScope, $route) {

        $rootScope.pageName = $route.current.pageTitle;
        $rootScope.loggedIn = false;
        //console.log($rootScope);

    }

}());
