
'use strict';

(function () {


    angular
        .module('gameFace', [
            /* angular modules */
            'ngRoute'

            /* third party modules */
        ])
        .config(function ($routeProvider) {

            $routeProvider
                .when('/home', {
                    templateUrl: './src/home/home.html'
                })
                .when('/team', {
                    templateUrl: './src/team/team.html'
                })
                .otherwise({redirectTo: '/home'});
        })
    ;
}());
