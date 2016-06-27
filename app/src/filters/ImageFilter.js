(function () {
    'use strict';
    angular.module('leaderBoard')
        .filter('Image', [function () {
            return function (text) {
                if (!text) {
                    return '';
                }

                text = text.replace(/\./g, '_');
                return text + '.png';
            };
        }]);
}());