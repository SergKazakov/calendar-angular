'use strict';

describe('Filter: monthToString', function () {

  // load the filter's module
  beforeEach(module('yeomanAngularApp'));

  // initialize a new instance of the filter before each test
  var monthToString;
  beforeEach(inject(function ($filter) {
    monthToString = $filter('monthToString');
  }));

  it('should return the input prefixed with "monthToString filter:"', function () {
    var text = 'angularjs';
    expect(monthToString(text)).toBe('monthToString filter: ' + text);
  });

});
