/**
 * Created by postepenno on 18.06.2015.
 */

app.controller('EventController', ['$scope', '$routeParams', 'events', function($scope, $routeParams, events) {
  events.success(function(data){
    $scope.event = data.events[$routeParams.id];
  });
}]);