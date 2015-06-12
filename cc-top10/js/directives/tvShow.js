/**
 * Created by postepenno on 12.06.2015.
 */

app.directive('tvShow', function() {
  return {
    scope:{
      info:"="
    },
    templateUrl:'js/directives/tvShow.html'
  }
});