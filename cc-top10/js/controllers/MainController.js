/**
 * Created by postepenno on 12.06.2015.
 */

app.controller('MainController', ['$scope', 'shows', function($scope, shows) {
  shows.success(function(data) {
    //console.log(data);
    $scope.shows = data;
  });
}]);