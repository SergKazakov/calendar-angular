'use strict';

angular.module('app')
    .controller('CalendarCtrl', function($scope, $location, $routeParams) {
        $scope.year = parseInt($routeParams.year);
        $scope.month = parseInt($routeParams.month);
        $scope.day = parseInt($routeParams.day);

        var transition = function() {
            $location.path("/year/" + $scope.year + "/month/" + $scope.month + "/day/" + $scope.day);
        };

        $scope.prevYear = function() {
            --$scope.year;
            transition();
        };

        $scope.nextYear = function() {
            ++$scope.year;
            transition();
        };

        $scope.prevMonth = function() {
            if ($scope.month <= 1) {
                $scope.month = 12;
                $scope.prevYear();
            } else {
                --$scope.month;
                transition();
            }
        };

        $scope.nextMonth = function() {
            if ($scope.month >= 12) {
                $scope.month = 1;
                $scope.nextYear();
            } else {
                ++$scope.month;
                transition();
            }
        };

        $scope.selectDay = function(_day) {
            $scope.day = _day.number;
            transition();
        };

        $scope.today = function() {
            $scope.year = new Date().getFullYear();
            $scope.month = new Date().getMonth() + 1;
            $scope.day = new Date().getDate();
            transition();
        };

        var getWeeks = function(_year, _month, _day) {
            var dayInThisMonth = new Date(_year, _month, 0).getDate(),
                arrayOfWeeks = [],
                week = [],
                today = {
                    year: new Date().getFullYear(),
                    month: new Date().getMonth() + 1,
                    day: new Date().getDate()
                },
                firstWeekDay = new Date(_year, _month - 1, 1).getDay();

            firstWeekDay = firstWeekDay === 0 ? 7 : firstWeekDay;
            for (var weekDay = 1; weekDay < firstWeekDay; weekDay++) {
                week.push({
                    number: "",
                    isSelected: false,
                    isCurrent: false
                });
            }
            weekDay = firstWeekDay;
            for (var dayCounter = 1; dayCounter <= dayInThisMonth; dayCounter++) {
                if (week.length === 7) {
                    arrayOfWeeks.push(week);
                    week = [];
                }
                week.push({
                    number: dayCounter,
                    isSelected: dayCounter === _day,
                    isCurrent: _year === today.year && _month === today.month && dayCounter === today.day
                });
            }
            arrayOfWeeks.push(week);
            return arrayOfWeeks;
        };

        $scope.weeks = getWeeks($scope.year, $scope.month, $scope.day);
    });