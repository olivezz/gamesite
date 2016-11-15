(function () {
    'use strict';

    angular
        .module('gameFace')
        .service('ToastService', ToastService);

    ToastService.$inject = ['$mdToast'];

    /* @ngInject */
    function ToastService($mdToast) {

        var vm = this;

        var last = {
            bottom: true,
            top: false,
            left: false,
            right: true
        };

        vm.toastPosition = angular.extend({},last);

        vm.showSimpleToast = function(message, theme) {
            var pinTo = vm.getToastPosition();

            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position(pinTo )
                    .hideDelay(3000)
                    .theme(theme)
            );
        };

        vm.getToastPosition = function() {
            sanitizePosition();

            return Object.keys(vm.toastPosition)
                .filter(function(pos) { return vm.toastPosition[pos]; })
                .join(' ');
        };

        function sanitizePosition() {
            var current = vm.toastPosition;

            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;

            last = angular.extend({},current);
        }

    }

}());
