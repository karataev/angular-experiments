/**
 * Created by postepenno on 22.06.2015.
 */

'use strict';

angular
  .module('weatherApp')
  .controller('coordinatesCtrl', function($scope, Weather) {

    $scope.checkWeather = function() {

      var coordinates = {
        lat: $scope.lat,
        lon: $scope.lon
      };

      $scope.weather = Weather.getWeather(coordinates);
    }
  });