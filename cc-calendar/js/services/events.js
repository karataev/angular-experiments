/**
 * Created by postepenno on 18.06.2015.
 */

app.factory('events', ['$http', function($http) {
  var url = 'data/data.json';
  return $http.get(url)
    .success(function(data) {
      return data;
    })
}])