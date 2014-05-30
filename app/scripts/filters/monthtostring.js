'use strict';

angular.module('app')
    .filter('monthToString', function() {
        return function(month) {
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            return months[month - 1];
        }
    });