/**
 * Created by postepenno on 26.05.2015.
 */

app.directive("buttonModifier", function () {
    return {
        scope: {
            data:"="
        },
        controller: function ($scope) {
            var dx = 20;
            $scope.moveLeft = function () {
                $scope.data.x -= dx;
            }
            $scope.moveRight = function () {
                $scope.data.x += dx;
            }
            $scope.moveUp = function () {
                $scope.data.y -= dx;
            }
            $scope.moveDown = function () {
                $scope.data.y += dx;
            }
            $scope.widthPlus = function () {
                $scope.data.width += dx;
            }
            $scope.widthMinus = function () {
                $scope.data.width -= dx;
            }
            $scope.heightPlus = function () {
                $scope.data.height += dx;
            }
            $scope.heightMinus = function () {
                $scope.data.height -= dx;
            }
            $scope.rotatePlus = function () {
                $scope.data.rotation += dx;
            }
            $scope.rotateMinus = function () {
                $scope.data.rotation -= dx;
            }
        },
        link: function (scope, el, attrs) {

        },
        templateUrl:'tmpl/manager.html'
    }
})

app.directive("draggable", function($document) {
    return {
        restrict:"A",
        controller: function ($scope) {
            $scope.data = $scope.item;
        },
        link: function(scope, el, attrs) {
            var startX, startY;

            el.css({
                cursor:"move"
            });

            el.on("mousedown", function(event) {
                event.preventDefault();

                startX = event.pageX - scope.data.x;
                startY = event.pageY - scope.data.y;
                $document.on("mousemove", mousemove);
                $document.on("mouseup", mouseup);
            });

            function mousemove(event) {
                scope.data.x = event.pageX - startX;
                scope.data.y = event.pageY - startY;
                scope.$apply();
            }

            function mouseup() {
                $document.off("mousemove", mousemove);
                $document.off("mouseup", mouseup);
            }
        }
    }
});

app.directive("resizer", function ($document) {
    return {
        link: function (scope, el, attrs) {
            el.addClass("modify-bt resize-bt");
            el.on("mousedown", function (e) {
                e.stopImmediatePropagation();
                e.preventDefault();

                scope.startX = event.pageX;
                scope.startY = event.pageY;

                $document.on("mousemove", mousemove);
                $document.on("mouseup", mouseup);
            })

            function mousemove(event) {
                var dx = event.pageX - scope.startX;
                var dy = event.pageY - scope.startY;
                scope.data.width += dx;
                scope.data.height += dy;
                scope.$apply();

                scope.startX = event.pageX;
                scope.startY = event.pageY;
            }

            function mouseup() {
                $document.off("mousemove", mousemove);
                $document.off("mouseup", mouseup);
            }

        }
    }
})

app.directive("rotator", function ($document) {
    return {
        link: function (scope, el, attrs) {
            el.addClass("modify-bt rotate-bt");

            el.on("mousedown", function (e) {
                e.stopImmediatePropagation();
                e.preventDefault();

                scope.startX = scope.data.x//event.pageX;
                scope.startY = scope.data.y//event.pageY;
                $document.on("mousemove", mousemove);
                $document.on("mouseup", mouseup);
            })

            function mousemove(event) {
                var dx = event.pageX - scope.startX;
                var dy = event.pageY - scope.startY;
                var angle = Math.atan2(dy, dx);
                angle = Math.floor(angle * 180 / Math.PI);
                //console.log(angle);
                scope.data.rotation = angle
                scope.$apply();

            }

            function mouseup() {
                $document.off("mousemove", mousemove);
                $document.off("mouseup", mouseup);
            }

        }
    }
})
