/**
 * @description directive to render pie charts for failure and success tests
 */
(function () {

    "use strict";

    angular
        .module('SeniorTask')
        .directive('pieChart', pieChart);

    pieChart.$inject = ['Chart'];

    /* @ngInject */
    function pieChart(Chart) {

        var directive = {
            restrict: 'E',
            scope: {
                test: '='
            },
            link: link
        };

        return directive;

        /**
         *
         * @param {object} scope
         * @param {object} element
         */
        function link(scope, element) {

            Chart.defaults.global.legend.display = false;
            var data = {
                labels: [
                    scope.test.succeeded,
                    scope.test.failed
                ],
                datasets: [
                    {
                        data: [
                            scope.test.succeeded,
                            scope.test.failed
                        ],
                        backgroundColor: [
                            '#72ac4d',
                            '#eb7d3b'
                        ]
                    }
                ]//datasets
            };

            var myPieChart = new Chart(element.find('canvas'), {
                type: 'pie',
                data: data
            });
        }
    }
}());