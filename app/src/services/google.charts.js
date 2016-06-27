(function () {
    'use strict';

    angular
        .module('leaderBoard')
        .service('googleCharts', googleCharts);

    function googleCharts() {
        return {
            areaChart: areaChart
        };

        function areaChart(chartData, target) {

            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {

                chartData.unshift(['last Days', 'Trailing Points']);

                var data = google.visualization.arrayToDataTable(chartData);
                var backgroundColor = '#fff';
                var areaColor = '#85d5fa';

                var options = {
                    legend: {position: "none"},

                    backgroundColor: {
                        fill: backgroundColor,
                        stroke: '#fff'
                    },
                    chartArea: {
                        backgroundColor: backgroundColor
                    },
                    colors: [areaColor],
                    hAxis: {
                        minValue: 0,
                        baselineColor: 'none',
                        gridlineColor: 'none',
                        textPosition: 'none'
                    },
                    vAxis: {
                        minValue: 0,
                        baselineColor: 'none',
                        gridlineColor: 'none',
                        textPosition: 'none'
                    }
                };
                var element = document.getElementById('areaChart' + target);
                var chart = new google.visualization.AreaChart(element);
                chart.draw(data, options);

            }
        }
    }
}());

