
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
                    templateUrl: './src/home/home.html',
                    controller: 'HomeController',
                    controllerAs: 'vm'
                })
                .when('/features', {
                    templateUrl: 'src/standpage/features.html',
                    /*controller: 'StandPageController',
                    controllerAs: 'vm'*/
                })
                .when('/faq', {
                    templateUrl: 'src/standpage/faq.html',
                    /*controller: 'StandPageController',
                    controllerAs: 'vm'*/
                })
                .when('/pricing', {
                    templateUrl: 'src/standpage/pricing.html',
                    /*controller: 'StandController',
                    controllerAs: 'vm'*/
                })
                .when('/teamweb', {
                    templateUrl: 'src/team/teamweb.html',
                    controller: 'TeamController',
                    controllerAs: 'vm'
                })
                .when('/test', {
                    templateUrl: './src/test/test.html',
                    controller: 'TestController',
                    controllerAs: 'vm'
                })
                .when('/gamevideos', {
                    templateUrl: './src/gamevideo/video.html',
                    controller: 'GameFaceController',
                    controllerAs: 'vm'
                })
                .otherwise({redirectTo: '/home'});
        })
        /*.run(function ($rootScope){
          $rootScope.pageName = 'Home page';
        })*/
    ;
}());
