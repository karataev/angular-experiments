/**
 * Created by postepenno on 19.06.2015.
 */

app.directive("weekItem", function () {
  return {
    link: function (scope, el, attrs) {
      el.addClass("week-item");
      var title = "Неделя " + scope.item.value;
      if (scope.item.first) {
        title = "Рождение";
        el.addClass("item-first");
      }
      else if (scope.item.last) {
        title = "Смерть (гипотетически)";
        el.addClass("item-last");
      }

      el.tooltip({
        placement:"top",
        title:title
      });

      scope.$watch("item.lived", function (newVal) {
        if (newVal === true) {
          el.addClass("item-lived");
        }
        else if (newVal === false) {
          el.removeClass("item-lived");
        }
      })
    },
    replace:true,
    template:'<div></div>'
  }
})
