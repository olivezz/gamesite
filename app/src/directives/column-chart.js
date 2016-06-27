(function () {
    'use strict';

    angular
        .module('leaderBoard')
        .directive('columnChart', columnChart);

    columnChart.$inject = [];

    /* @ngInject */
    function columnChart() {
        var directive = {
            controller: Chart,
            scope: {
                data: '='
            },
            template: '<div class="column-chart"></div>'
        };
        return directive;
    }

    Chart.$inject = ['$scope'];

    /* @ngInject */
    function Chart($scope) {

        $scope.populateChart = populateChart;

        function populateChart() {
            var data = $scope.data,
                currentValue,
                height,
                position,
                currentBar,
                chartContainer = $('.column-chart'),
                maxNegativeValue = Math.abs(data[0].netDebt),
                maxPositiveValue = Math.abs(data[ data.length - 1 ].netDebt);

            for (var i = 0; i < data.length; i++) {

                currentValue = data[i].netDebt;
                if (currentValue < 0) {
                    height = currentValue * -1 / maxNegativeValue * 100 / 2;
                    position = 50 - height;
                    if (height < 1) {
                        height = 1;
                    }
                } else if( currentValue > 0) {
                    height = currentValue / maxPositiveValue * 100 / 2;
                    position = 50;
                    if (height < 1) {
                        height = 1;
                    }
                } else{
                    height = 1;
                    position = 50;
                }
                currentBar = $(data[i].toolTip);
                currentBar.find('.bar').css({height: height, top: position + 'px'});
                chartContainer.append(currentBar);
            }
        }

        populateChart();
    }
}());

