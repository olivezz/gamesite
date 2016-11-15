/**
 * @description Tests for pie-chart directive
 */
(function () {
    "use strict";

    describe('pie-chart.js Test', function () {

        /* jshint -W109 */
        var $compile, $rootScope, $scope;

        var chartData = {
            "succeeded": 114,
            "failed": 10,
            "passed": "73%",
            "coverage": "76%"
        };

        beforeEach(module('SeniorTask'));

        beforeEach(inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $scope.chartData = chartData;
        }));

        it('should produce chart markup', function () {
            var markup = '<pie-chart data-test="chartData">';
            markup += '<canvas width="100" height="100"></canvas>';
            markup += '</pie-chart>';
            var element = $compile(markup)($scope);
            $rootScope.$digest();
            var iframe = element.find('> *:first-child')[0];
            expect(iframe.nodeName).toBe('IFRAME');
        });
    });
}());
