/**
 * Created by postepenno on 22.06.2015.
 */

'use strict';

angular
  .module('weatherApp')
  .controller('cityCtrl', function($scope, Weather) {

    $scope.checkWeather = function() {

      var city = {
        q: $scope.city
      };

      $scope.weather = Weather.getWeather(city);
    }
  });