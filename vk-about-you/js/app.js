/**
 * Created by postepenno on 22.06.2015.
 */

var app = angular.module("app", []);

app.controller("MainCtrl", function ($scope, VKService) {
  var ctrl = this;

  ctrl.otherId = undefined;

  var initVars = function () {
    ctrl.loginUser = undefined;
    ctrl.infoUser = undefined;
    ctrl.authCanceled = undefined;
  }

  initVars();

  ctrl.readyClick = function () {

    initVars();

    if (ctrl.otherId) {
      getDetails(ctrl.otherId);
    } else {
      login();
    }
  }

  var login = function () {
    var loginSuccess = function (user) {
      ctrl.loginUser = user;
      $scope.$apply();
      getDetails(ctrl.loginUser.id);
    }
    var loginError = function () {
      ctrl.authCanceled = true;
      $scope.$apply();
    }
    VKService.login(loginSuccess, loginError);
  }

  var getDetails = function (userId) {
    VKService.get(userId, function (data) {
      ctrl.infoUser = data;
      $scope.$apply();
    })
  }

})
