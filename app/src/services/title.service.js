(function () {
    'use strict';

    angular
        .module('gameFace')
        .factory('TitleService', TitleService);

    TitleService.$inject = ['$rootScope', '$route'];

    /* @ngInject */
    function TitleService($rootScope, $route) {

        setPageTitle = function () {
            $rootScope.pageName = $route.current.pageTitle;
        }

    }

}());
