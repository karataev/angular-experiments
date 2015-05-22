/**
 * Created by postepenno on 21.05.2015.
 */

app.directive("sticker", function() {
    return {
        controller:function($scope) {

        },
        link:function(scope, el, attrs) {
            el.addClass("sticker");
            /*
             el.css({
             left:scope.item.sticker.x,
             top:scope.item.sticker.y,
             width:scope.item.sticker.size,
             height:scope.item.sticker.size

             })
             */

            scope.$watch("item.sticker.x", function(n, o) {
                el.css({left:scope.item.sticker.x + "px"});
            });
            scope.$watch("item.sticker.y", function(n, o) {
                el.css({top:scope.item.sticker.y + "px"});
            });
            scope.$watch("item.sticker.size", function(n, o) {
                el.css({
                    width:scope.item.sticker.size + "px",
                    height:scope.item.sticker.size + "px"
                });
            });
            scope.$watch("item.sticker.hide", function(newValue) {
                if (newValue === true) {
                    TweenMax.to(el, 1, {scale:0, ease:Back.easeIn})
                }
            })

        },
        template:"<p sticker-text>?</p>"
    }
});

app.directive("draggable", function($document) {
    return {
        restrict:"A",
        controller: function($scope) {
            //$scope.px = 0;
            //$scope.py = 0;
        },
        link: function(scope, el, attrs) {
            var startX, startY;

            el.css({
                cursor:"move"
            });

            el.on("mousedown", function(event) {
                event.preventDefault();

                startX = event.pageX - scope.item.sticker.x;
                startY = event.pageY - scope.item.sticker.y;
                $document.on("mousemove", mousemove);
                $document.on("mouseup", mouseup);
            });

            function mousemove(event) {
                scope.item.sticker.x = event.pageX - startX;
                scope.item.sticker.y = event.pageY - startY;
                scope.$apply();
            }

            function mouseup() {
                $document.off("mousemove", mousemove);
                $document.off("mouseup", mouseup);
            }
        }
    }
});

app.directive("stickerText", function () {
    return {
        link: function (scope, el, attrs) {
            el.addClass("sticker-question");

            scope.$watch("item.sticker.size", function (newValue) {
                var fontSize = newValue / 2;
                el.css({
                    "line-height":newValue + "px",
                    "font-size":fontSize + "px"
                })
            })
        }
    }
})
