/**
 * Created by postepenno on 12.06.2015.
 */

app.factory('shows', ['$http', function($http) {
  var url = 'https://s3.amazonaws.com/codecademy-content/courses/ltp4/shows-api/shows.json';
  return $http.get(url)
    .success(function(data) {
      return data;
    })
}]);