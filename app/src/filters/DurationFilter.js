(function(){
    'use strict';
    angular.module('leaderBoard')
        .filter('Duration', [function () {
            return function (text) {
                var time = parseInt(text);
                if (isNaN(time)) {
                    return '';
                }

                var negative = false;
                if (time < 0) {
                    negative = true;
                    time = Math.abs(time);
                } else if (time < 1) {
                    return '0m';
                }

                var days = time / 24 / 60;
                var hours = time / 60 % 24;
                var minutes = time % 60;

                var timeString = '';
                if (!(days < 1)) {
                    timeString += Math.floor(days) + 'd ';
                }

                if (!(hours < 1)) {
                    timeString += Math.floor(hours) + 'h ';
                }

                if (!timeString) {
                    timeString += Math.floor(minutes) + 'm ';
                }

                if (negative == true) {
                    timeString = '-' + timeString;
                }

                return timeString;
            };
        }]);
}());