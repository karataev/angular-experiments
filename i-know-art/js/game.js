/**
 * Created by postepenno on 21.05.2015.
 */

var app = angular.module("app", ["duScroll"]);

app.controller("MainCtrl", function($scope, $http) {

    $scope.items = [];
    $scope.main.correctAnswers = 0;
    $scope.main.totalAnswered = 0;
    $scope.main.gameComplete = false;
    $scope.main.levelIndex = 0;
    $scope.main.soundsEnabled = true;
    var allItems;

    $scope.sndCorrect = new Howl({
        urls: ['assets/sndRight.mp3']
    });
    $scope.sndWrong = new Howl({
        urls: ['assets/sndWrong.mp3']
    });

    $http.get("assets/data.json")
        .success(function(data, status, headers, config) {
            //allItems = data.splice(0, 2);
            allItems = data;
            _.each(allItems, function(item) {
                item.answers = _.shuffle(item.answers);
                //console.table(item.answers);
            });
            //$scope.items = items;
            //$scope.update();
            $scope.startLevel();
        });

    $scope.startLevel = function() {
        $scope.items.push(allItems[$scope.main.levelIndex]);
    }

    $scope.nextLevel = function () {
        $scope.main.levelIndex++;
        if ($scope.main.levelIndex == allItems.length) {
            $scope.calcCorrectAnswers();
            $scope.main.gameComplete = true;
        } else {
            $scope.startLevel();
        }

    }

    $scope.update = function() {

        var answered = 0;
        for (var i = 0; i < $scope.items.length; i++) {
            var item = $scope.items[i];
            for (var j = 0; j < item.answers.length; j++) {
                var ans = item.answers[j];
                if (ans.selected === true) answered++;
            }
        }
        $scope.main.totalAnswered = answered;
        if ($scope.main.totalAnswered == $scope.items.length) $scope.main.gameComplete = true;
    };

    $scope.calcCorrectAnswers = function () {
        var result = _.countBy($scope.items, function(item) {
            var isCorrect = _.some(item.answers, function(x) {
                return x.bingo && x.selected;
            });
            if (isCorrect) return "correctAnswers";
        });
        $scope.main.correctAnswers = result.correctAnswers || 0;
    }

});

app.controller("AnswerCtrl", function($scope) {
    $scope.disableButtons = function() {
        $scope.item.answers.forEach(function(x) {
            x.disabled = true;
        });
    };

    $scope.playerAnswered = function () {
        $scope.disableButtons();
        $scope.item.sticker.hide = true;
        $scope.item.descShow = true;
        $scope.item.nextShow = true;
        //$scope.update();

    }

});

app.directive("quizAnswer", function() {
    return {
        link:function(scope, el, attrs) {
            el.on("click", function() {
                scope.ans.selected = true;
                scope.item.playerCorrect = scope.ans.bingo === true;
                scope.playerAnswered();
                scope.$apply();
            });

            scope.$watch("ans.disabled", function(newValue, oldValue) {
                if (newValue === true) {
                    el.off();
                    el.attr("disabled", "");
                    if (scope.ans.bingo) {
                        el.addClass("quiz-answer-correct");
                    }
                    if (!scope.ans.bingo && scope.ans.selected) {
                        el.addClass("quiz-answer-wrong");
                    }
                }
            });

            scope.$watch("item.selected", function(newValue) {
                if (newValue === true) {
                }
            });

        }
    }
});

app.directive("answerIcon", function() {
    return {
        link:function(scope, el, attrs) {
            el.addClass("glyphicon glyphicon-unchecked");
            scope.$watch("ans.selected", function(newValue, oldValue) {
                if (newValue === true) {
                    el.removeClass("glyphicon-unchecked");
                    el.addClass("glyphicon-check");
                }
            })
        }
    }
})

app.directive("disableDrag", function () {
    return {
        link: function (scope, el, attrs) {
            el.on("mousedown", function (e) {
                e.preventDefault();
            })

        }
    }
})

app.directive("imgDescription", function () {
    return {
        link: function (scope, el, attrs) {
            el.addClass("img-description");
            el.css({
                opacity:0
            })

            scope.$watch("item.descShow", function (newValue) {
                if (newValue === true) {
                    TweenMax.to(el, 1, {opacity:1});
                }

            });
        },
        replace: true,
        template:"<h3>{{item.desc}}</h3>"
    }
})

app.directive("nextButton", function () {
    return {
        link: function (scope, el, attrs) {
            el.addClass("btn btn-success btn-lg btn-block");

            el.on("click", function () {
                el.off();
                el.remove();
                scope.nextLevel();
                scope.$apply();
            })

            scope.$watch("item.nextShow", function (newValue) {
                if (newValue === true) {
                    el.css({display:"block"});
                    TweenMax.from(el, 1, {opacity:0});
                } else {
                    el.css({display:"none"});
                }
            })
        },
        template:"Next Painting"
    }
})

app.directive("tweenBorn", function($document) {
    return {
        link:function(scope, el, attrs) {
            var offset = 5;
            var duration = 1000;
            $document.scrollToElement(el, offset, duration);

            TweenMax.from(el, 0.5, {opacity:0, ease:Power0.easeNone});
        }
    }
});

app.directive("sounds", function () {
    return {
        controller: function ($scope) {

            var playSnd = function(snd) {
                if ($scope.main.soundsEnabled) {
                    snd.play();
                }
            }

            $scope.$watch("item.playerCorrect", function (newValue) {
                if (newValue === true) {
                    playSnd($scope.sndCorrect);
                } else if (newValue === false) {
                    playSnd($scope.sndWrong);
                }
            })
        }
    }
})