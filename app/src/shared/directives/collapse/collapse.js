(function () {
    'use strict';

    angular
        .module('SeniorTask')
        .directive('collapse', collapse)
        .controller('collapseCtrl', collapseCtrl);
    /**
     * @description directive definition function
     * @return {object} directive configuration object
     */
    function collapse() {
        return {
            restrict: 'A',
            controller: 'collapseCtrl'
        };
    }

    collapseCtrl.$inject = ['$scope'];

    /**
     * @description collapse controller
     * @param {object} $scope
     */
    function collapseCtrl($scope) {

        $scope.collapsed = false;
        $scope.collapse = collapse;

        /**
         * @description toggle display of row body and row header
         * @param {string} state
         * @param {number} index
         */
        function collapse(state, index) {
            if( state !== undefined &&
                state.toLowerCase() !== 'pending' &&
                state.toLowerCase() !== 'running'){
                $scope.collapsed = index;
            }
        }
    }
}());

