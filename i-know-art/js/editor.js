/**
 * Created by postepenno on 21.05.2015.
 */

var app = angular.module("app", []);

app.controller("MainCtrl", function($scope, $http) {

    $http.get("assets/data.json")
        .success(function(data, status, headers, config) {
            $scope.items = data;

            //$scope.items = data.splice(0, 1);
        });

    $scope.main.pretty = true;

    $scope.addEmptyItem = function() {
        var id = $scope.items.length;
        $scope.items.push({
            id:id,
            imgSrc:".jpg",
            sticker: {
                x:0,
                y:0,
                size:200
            },
            answers: [
                {value:"1", bingo:true},
                {value:"2"},
                {value:"3"},
                {value:"4"}
            ]
        })
    };

    $scope.main.json = undefined;
    $scope.save = function() {
        $scope.main.json = angular.toJson($scope.items, $scope.main.pretty);

    }

    $scope.stickerIncrease = function(sticker) {
        sticker.size += 10;
    }

    $scope.stickerDecrease = function (sticker) {
        sticker.size -= 10;
    }
})
