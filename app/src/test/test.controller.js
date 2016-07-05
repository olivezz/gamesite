(function () {
    'use strict';

    angular
        .module('gameFace')
        .controller('TestController', TestController);

    //BlacklistController.$inject = ['blacklistData', 'player'];

    /* @ngInject */
    function TestController() {

        var vm = this;
        vm.eventItems =[
            {
            name: 'test',
            date: '1/1/2013'
            },
            {
            name: 'test222',
            date: '1/1/2013'
            },
        ];


    }

}());


