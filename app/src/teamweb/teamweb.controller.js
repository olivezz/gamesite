
(function () {
    'use strict';

    angular
        .module('gameFace')
        .controller('TeamWebController', TeamWebController);

    TeamWebController.$inject = ['$rootScope', '$route'];

    /* @ngInject */
    function TeamWebController($rootScope, $route) {

        $rootScope.pageName = $route.current.pageTitle;
        $rootScope.loggedIn = false;

    }

}());
