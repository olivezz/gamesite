(function () {
    'use strict';
    angular.module('leaderBoard')
        .filter('Ordinal', [function () {
            return function (text) {
                var num = parseInt(text);
                if (isNaN(num)) {
                    return '';
                }

                var numStr = num.toString(),
                    last = numStr.slice(-1),
                    len = numStr.length,
                    ord = '';
                switch (last) {
                    case '1':
                        ord = numStr.slice(-2) === '11' ? 'th' : 'st';
                        break;
                    case '2':
                        ord = numStr.slice(-2) === '12' ? 'th' : 'nd';
                        break;
                    case '3':
                        ord = numStr.slice(-2) === '13' ? 'th' : 'rd';
                        break;
                    default:
                        ord = 'th';
                        break;
                }
                return num.toString() + ord;
            };
        }]);
}());