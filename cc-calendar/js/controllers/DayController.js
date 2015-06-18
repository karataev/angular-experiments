/**
 * Created by postepenno on 18.06.2015.
 */

app.controller('DayController', ['$scope', 'events', function($scope, events) {
  events.success(function(data) {
    $scope.day = data;
  })
}]);