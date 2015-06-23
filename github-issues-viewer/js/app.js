/**
 * Created by postepenno on 23.06.2015.
 */

var app = angular.module("app", ['ngRoute', 'cgBusy']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'MainController',
      controllerAs:'main',
      templateUrl:'views/search.html'
    })
    .when('/:id', {
      controller:'IssueDetailsController',
      controllerAs:'vm',
      templateUrl:'views/issue-details.html'
    })
    .otherwise({
      redirectTo:'/'
    })
});

app.factory('GitHub', function ($http) {

  var username = undefined;
  var repo = undefined;
  var data = undefined;

  return {
    setDetails: function (u, r) {
      username = u;
      repo = r;
    },
    searchIssues: function () {
      var query = "repo:" + username + "/" + repo;
      return $http.get('https://api.github.com/search/issues', { params: { q: query } });
    },

    getDetails: function () {
      return {username:username, repo:repo};
    },

    setData: function (d) {
      data = d;
    },

    getData: function () {
      return data;
    }
  }
})

app.controller("MainController", function ($scope, GitHub) {
  var main = this;

  main.searchError = false;

  var serviceData = GitHub.getData();
  if (serviceData) {
    var details = GitHub.getDetails();
    main.username = details.username;
    main.repo = details.repo;
    main.data = serviceData;
  }
  else {
    main.username = "angular";
    main.repo = "angular.js";
    main.data = undefined;
  }

  main.search = function (query) {
    main.data = undefined;
    main.searchError = false;

    GitHub.setDetails(main.username, main.repo);
    main.promise = GitHub.searchIssues();
    main.promise.then(
      function success(obj) {
        main.data = obj.data;
        GitHub.setData(main.data);

      },
      function error() {
        main.searchError = true;
      }
    )

  }
})

app.controller("IssueDetailsController", function ($routeParams, GitHub) {
  var vm = this;

  vm.item = GitHub.getData().items.
    filter(function (x) {
      return x.number == $routeParams.id;
    })[0];

})
