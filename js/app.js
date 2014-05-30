'use strict';

var app=angular.module("app",["ngRoute"]).config(function($routeProvider){
	$routeProvider.when("/year/:year/month/:month/day/:day", {
		templateUrl: '/partials/calendar.html',
		controller: 'CalendarCtrl'
	})
	.otherwise({
			redirectTo:"/year/"+new Date().getFullYear()+"/month/"+(new Date().getMonth()+1)+"/day/"+new Date().getDate()
	});
});

app.controller("CalendarCtrl", ["$scope", "$location", "$routeParams", function(s, l,r){

		s.year 		= parseInt(r.year); 
	    s.month 	= parseInt(r.month);
	    s.day 		= parseInt(r.day);

	    var transition=function(){
	    	console.log(s.year);
	    	l.path("/year/"+s.year+"/month/"+s.month+"/day/"+s.day);
	    };

	    s.prevYear=function () {
	    	--s.year;
	    	transition();
	    };

	    s.nextYear=function () {
	        ++s.year;
	        transition();
	    };

	    s.prevMonth=function () {
	    	if (s.month<=1){
	    		s.month=12;
	    		s.prevYear();
	    	}
	        else {
	        	--s.month;
	        	transition();
	    	}
	    };

	     s.nextMonth=function () {
	     	if (s.month>=12){
	     		s.month=1;
	     		s.nextYear();
	     	}
	         else {
	         	++s.month;
	         	transition();
	     	}
	     };

	     s.selectDay=function(_day) {
	           s.day=_day.number;
	           transition();
	     };

	     s.today=function(){
	           s.year=new Date().getFullYear();
	           s.month=new Date().getMonth()+1;
	           s.day=new Date().getDate();
	           transition();
	     }; 

		 var getWeeks = function (_year, _month, _day) {
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
              if (week.length == 7) {
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

		 s.$watchCollection("[year, month, day]", function(){
		 	s.weeks=getWeeks(s.year, s.month, s.day);
		 });
}]);

app.filter("monthToString", function(){
	return function(month){
	    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	    return months[month-1];
	}
});