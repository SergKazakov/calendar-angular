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
            if (_day.isOld) {
                $scope.prevMonth();
            } else if (_day.isNew) {
                $scope.nextMonth();
            } else {
                transition();
            }
        };

        $scope.today = function() {
            $scope.year = new Date().getFullYear();
            $scope.month = new Date().getMonth() + 1;
            $scope.day = new Date().getDate();
            transition();
        };

        var getWeeks = function(_year, _month, _day) {
            var dayInThisMonth = new Date(_year, _month, 0).getDate(),
                dayInPrevMonth = new Date(_year, _month - 1, 0).getDate(),
                arrayOfWeeks = [],
                week = [],
                today = {
                    year: new Date().getFullYear(),
                    month: new Date().getMonth() + 1,
                    day: new Date().getDate()
                },
                firstWeekDay = new Date(_year, _month - 1, 1).getDay();

            firstWeekDay = firstWeekDay === 0 ? 7 : firstWeekDay;
            var oldStart = firstWeekDay > 1 ? dayInPrevMonth - firstWeekDay + 2 : dayInPrevMonth - 6,
                newStart = 1;

            if (firstWeekDay === 1) {
                for (var i = 0; i < 7; i++) {
                    week.push({
                        number: oldStart++,
                        isSelected: false,
                        isCurrent: false,
                        isOld: true,
                        isNew: false
                    });
                }
            } else {
                for (var weekDay = 1; weekDay < firstWeekDay; weekDay++) {
                    week.push({
                        number: oldStart++,
                        isSelected: false,
                        isCurrent: false,
                        isOld: true,
                        isNew: false
                    });
                }
            }

            for (var dayCounter = 1; dayCounter <= dayInThisMonth; dayCounter++) {
                if (week.length === 7) {
                    arrayOfWeeks.push(week);
                    week = [];
                }
                week.push({
                    number: dayCounter,
                    isSelected: dayCounter === _day,
                    isCurrent: _year === today.year && _month === today.month && dayCounter === today.day,
                    isOld: false,
                    isNew: false
                });
            }

            while (week.length < 7) {
                week.push({
                    number: newStart++,
                    isSelected: false,
                    isCurrent: false,
                    isOld: false,
                    isNew: true
                });
            }
            arrayOfWeeks.push(week);

            if (arrayOfWeeks.length < 6) {
                week = [];
                while (week.length < 7) {
                    week.push({
                        number: newStart++,
                        isSelected: false,
                        isCurrent: false,
                        isOld: false,
                        isNew: true
                    });
                }
                arrayOfWeeks.push(week);
            }
            return arrayOfWeeks;
        };

        $scope.weeks = getWeeks($scope.year, $scope.month, $scope.day);
    });