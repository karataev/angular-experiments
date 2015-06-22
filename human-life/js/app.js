/**
 * Created by postepenno on 19.06.2015.
 */

var app = angular.module("app", []);

app.controller("MainCtrl", function () {
  var ctrl = this;

  ctrl.maxYears = 65;

  ctrl.items = _.range(ctrl.maxYears*52).map(function (x) {
    return {value:x + 1, lived:false};
  });
  ctrl.items[0].first = true;
  ctrl.items[ctrl.items.length - 1].last = true;
  //console.log(this.items);

  ctrl.calcTimeBehind = function () {
    var day = $("select.birth-day").val();
    var month = $("select.birth-month").val();
    var year = $("select.birth-year").val();
    console.log(day, month, year);

    var a = moment();
    var b = moment(day + "-" + month + "-" + year, "DD-MM-YYYY");
    var c = moment(day + "-" + month + "-" + (Number(year) + ctrl.maxYears), "DD-MM-YYYY")
    ctrl.weeksBehind = a.diff(b, 'weeks');
    ctrl.weeksLeft = c.diff(a, 'weeks');
    //console.log("!!", ctrl.weeksLeft);

    clear();
    ctrl.items
      .filter(function (x) {
        return x.value <= ctrl.weeksBehind;
      })
      .forEach(function (x) {
        x.lived = true;
      })
  }

  var clear = function () {
    ctrl.items
      .forEach(function (x) {
        x.lived = false;
      })
  }

  var createTable = function (arr, cols) {
    var table = [];
    var rows = arr.length / cols;
    for (var i = 0; i < rows; i++) {
      table[i] = [];
      for (var j = 0; j < cols; j++) {
        var index = i * cols + j;
        table[i][j] = arr[index];
      }
    }
    return table;
  }

  ctrl.tableItems = createTable(ctrl.items, 52);
})


