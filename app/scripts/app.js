'use strict';

angular
    .module('app', [
        'ngRoute'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/year/:year/month/:month/day/:day', {
                templateUrl: 'views/calendar.html',
                controller: 'CalendarCtrl'
            })
            .otherwise({
                redirectTo: '/year/' + new Date().getFullYear() + '/month/' + (new Date().getMonth() + 1) + '/day/' + new Date().getDate()
            });
    });