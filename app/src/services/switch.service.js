(function () {
    'use strict';

    angular
        .module('gameFace')
        .factory('SwitchService', SwitchService);

    //TeamData.$inject = ['$resource', '$q'];

    /* @ngInject */
    function SwitchService() {

        this.setTab = function(setTab){
            return setTab;
        };
        this.isSet = function(isSet){
            return this.tab === isSet;
        };

    }

}());
