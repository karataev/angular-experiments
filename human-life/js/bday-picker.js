/**
 * Created by postepenno on 19.06.2015.
 */

app.directive("bdayPicker", function () {
  return {
    link: function (scope, le, attrs) {
      $(".bday-picker").birthdaypicker({
        defaultDate: "10-05-1984"
      });
    },
    replace:true,
    template:'<div class="well">' +
    '<h3>Когда у тебя день рождения?</h3>' +
    '<div class="bday-picker"></div>' +
    '<button class="btn btn-default" ng-click="ctrl.calcTimeBehind()">OK</button>' +
    '</div>'
  }
})
