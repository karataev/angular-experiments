/**
 * Created by postepenno on 26.05.2015.
 */

app.directive("sticker", function () {
    return {
        restrict:"A",
        controller: function ($scope) {
            //data - for inner use!
            $scope.data = $scope.item;

        },
        link: function (scope, el, attrs) {

            el.addClass(scope.data.css);

            el.on("mousedown", function () {
                scope.selectItem(scope.data);
                scope.$apply();
            })

            scope.$watch("data.x", function (newValue, oldValue) {
                //console.log(newValue, oldValue);
                el.css({left:newValue + "px"});
                //TweenMax.to(el, 0.2, {x:newValue});
            })
            scope.$watch("data.y", function (newValue) {
                el.css({top:newValue + "px"});
                //TweenMax.to(el, 0.2, {y:newValue});
            })
            scope.$watch("data.width", function (newValue) {
                el.css({width:newValue + "px"});
                //TweenMax.set(el, {scaleX:newValue})
            })
            scope.$watch("data.height", function (newValue) {
                el.css({height:newValue + "px"});
            })
            scope.$watch("data.rotation", function (newValue) {
                //TweenMax.to(el, 0.2, {rotation:newValue});
                TweenMax.set(el, {rotation:newValue, transformOrigin:"left top"});
            })
            scope.$watch("data.selected", function (newValue) {
                if (newValue === true) {
                    el.addClass("sticker-selected");
                } else {
                    el.removeClass("sticker-selected");
                }
            })

        }
    }
})

app.directive("stickerText", function () {
    return {
        controller: function ($scope) {
            $scope.data = $scope.item;

        },
        link: function (scope, el, attrs) {
            el.addClass("sticker-text");

            scope.$watch("data.height", function (newValue) {
                el.css({
                    "line-height":newValue + "px"
                })
            })
        }
    }
})
