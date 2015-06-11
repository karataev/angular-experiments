/**
 * Created by postepenno on 11.06.2015.
 */


app.directive("game", function() {
  return {
    restrict:'E',
    scope:{info:"="},
    templateUrl:'js/directives/game.html'
  }
});