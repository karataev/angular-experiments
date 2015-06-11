/**
 * Created by postepenno on 11.06.2015.
 */

app.controller('MainController', ['$scope', function($scope) {
  $scope.exercises = [
    {
      icon: 'img/pushup.jpg',
      name: 'Pushups',
      count: 20
    },
    {
      icon: 'img/squat.jpg',
      name: 'Squats',
      count: 15
    },
    {
      icon: 'img/pullup.jpg',
      name: 'Pullups',
      count: 10
    },
    {
      icon: 'img/row.jpg',
      name: 'Rows',
      count: 10
    },
    {
      icon: 'img/lunge.jpg',
      name: 'Lunges',
      count: 10
    },
    {
      icon: 'img/stepup.jpg',
      name: 'Step Ups',
      count: 10
    },
    {
      icon: 'img/situp.jpg',
      name: 'Sit Ups',
      count: 15
    }
  ];

  $scope.increase = function(ex) {
    ex.count++;
  }

  $scope.decrease = function(ex) {
    ex.count--;
  }


}]);