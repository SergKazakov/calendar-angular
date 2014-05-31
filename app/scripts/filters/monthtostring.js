'use strict';

angular.module('app')
    .filter('monthToString', function() {
        return function(month) {
            var months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
            return months[month - 1];
        }
    });