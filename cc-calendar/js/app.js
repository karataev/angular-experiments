/**
 * Created by postepenno on 18.06.2015.
 */

var app = angular.module('CalendarApp', ['ngRoute']);

app.config( function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'DayController',
      templateUrl:'views/day.html'
    })
    .when('/:id', {
      controller:'EventController',
      templateUrl:'views/event.html'
    })
    .otherwise({
      redirectTo:'/'
    })
} );
