
(function () {
    'use strict';

    var myApp = angular
        .module('gameFace', [
            /* angular modules */
            'ngRoute', 'ngResource', 'ngAnimate', 'ngMaterial', 'ngMessages'

            /* third party modules */
        ])
        .config(function ($routeProvider) {

            $routeProvider
                .when('/home', {
                    templateUrl: './src/home/home.html',
                    controller: 'HomeController',
                    controllerAs: 'vm',
                    pageTitle: 'Game Face'
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
                    templateUrl: 'src/teamweb/teamweb.html',
                    controller: 'TeamWebController',
                    controllerAs: 'vm',
                    pageTitle: 'Team Page'
                })
                .when('/test', {
                    templateUrl: 'src/teamapp/teamdetails.html',
                    controller: 'TeamController',
                    controllerAs: 'vm',
                    pageTitle: 'Team Schedule'
                })
                .when('/videos/:videoId', {
                    templateUrl: 'src/videos/videodetails.html',
                    controller: 'VideoController',
                    controllerAs: 'vm'
                })
                /*.when('/cache', {
                    templateUrl: 'src/cache/cache.html',
                    controller: 'CacheController',
                    controllerAs: 'vm'
                })*/
                .when('/gamevideos', {
                    templateUrl: 'src/gamevideo/video.html',
                    controller: 'VideoController',
                    controllerAs: 'vm'
                })
                .otherwise({redirectTo: '/home'});

        })

        /*.run(function ($rootScope){
          $rootScope.pageName = 'Home page';
        })*/;

}());
