"use strict";

angular.module("app").directive("swTabstrip",function(){
   return{
       restrict:"E",
       transclude:true,
       scope:{},
       controller:function($scope){
           $scope.panes = [];
           $scope.select = function(pane){
               pane.selected = true;
               $scope.panes.forEach(function(curPane){
                   if(curPane !== pane){
                       curPane.selected = false;
                   }
               });
           }
           this.addPane = function(pane){//not in scope but a controller func
               $scope.panes.push(pane);
               if($scope.panes.length === 1){
                   pane.selected = true;
               }
           }
       },
       templateUrl:"templates/swTabstrip.html"
   }
});

angular.module("app").directive("swPane",function(){
    return{
        restrict:"E",
        transclude:true,
        require:"^swTabstrip",
        scope:{
            title:"@"
        },
        templateUrl:"templates/swPane.html",
        link:function(scope,el,attrs,swTabStripCtrl){
            swTabStripCtrl.addPane(scope);
        }
    }
});

angular.module("app").directive("emperor", function () {
    var name = "The Emperor";
    return{
        restrict: "E",
        scope: true,
        controller: function ($scope) {
            this.name = name;
        },
        link: function ($scope, el, attrs) { //use $scope for inherited scope
            el.data("name", name);
        }

    }
});

angular.module("app").directive("vader", function () {
    var name = "Vader";
    return{
        restrict: "E",
        scope: true,
        require: "^emperor",//^grab parent controller from directive named emperor
        controller: function ($scope) {
            this.name = name;
        },
        link: function ($scope, el, attrs, parentCtrl) {
            el.data("name", name);
            el.data("name", parentCtrl.name);
            console.log("Vader\'s master is " + parentCtrl.name);
        }

    }
});

angular.module("app").directive("starKiller", function () {
    return{
        restrict: "E",
        scope: true,
        require:["^vader","^emperor"],
        link: function ($scope, el, attrs, ctrls) {
            el.data("name", "star killer");
            if(!!ctrls[0]){
                el.data("name", ctrls[0].name);
                console.log("starKiller\'s master is " + ctrls[0].name);
                if(!!ctrls[1]){
                    console.log(ctrls[0].name+"\'s master is the fkn " + ctrls[1].name);
                }
            }
            else{
                console.log("starKiller\'s master is none");
            }

        }

    }
});

angular.module("app").factory("jediPolicy",function($q){
    return{
        advanceToKnight:function(candidate){
            var deferred = $q.defer();

            if(candidate.hasForce && (candidate.yearsOfJediTraining > 20 || candidate.isChosenOne || candidate.master === "yoda")){
                candidate.rank = "jedi knight";
                deferred.resolve(candidate);
            }
            else{
                deferred.reject(candidate);
            }

            return deferred.promise;
        }
    }
});

angular.module("app").directive("personInfoCard", function (jediPolicy) {
    return{
        restrict: "E",
        scope: {
            person: "=person",//two way binding of parent scope to person attr value
            initialCollapsed: '@collapsed'//string param | can parse binded values {{}} to string |'collapsed' specify name off attr in html | one way bind from parent also
        },
        templateUrl: "templates/personInfoCard.html",
        controllerAs: "vm",
        bindToController: true,
        controller: function () {
            this.knightMe = function (person) {
                jediPolicy.advanceToKnight(person)
                    .then(null,
                function(candidate){
                    alert(candidate.name+' not ready');
                })

            };
            this.removeFriend = function (friend) {
                var idx = this.person.friends.indexOf(friend);
                if (idx > -1) {
                    this.person.friends.splice(idx, 1);
                }
            };
        }
    }
});

angular.module("app").directive("userPanel", function () {
    return{
        restrict: "E",
        templateUrl: "templates/userPanel.html",
        transclude: true,
        scope: {
            name: "@",
            level: "=",
            initialCollapsed: "@collapsed"
        },
        controller: function ($scope) {
            $scope.collapsed = ($scope.initialCollapsed === "true");
            $scope.collapse = function () {
                $scope.collapsed = !$scope.collapsed;
            };
            $scope.nextState = function (event) {
                event.stopPropagation();
                event.preventDefault();
                $scope.level++;
                $scope.level = $scope.level % 4;
            }
        }
    }
})

angular.module("app").directive("droidInfoCard", function () {
    return{
        restrict: "E",
        scope: {
            droid: "=",//two way binding of parent scope to person attr value
            initialCollapsed: '@collapsed'//string param | 'collapsed' specify name off attr in html | one way bind from parent also
        },
        templateUrl: "templates/droidInfoCard.html"
    }
});

angular.module("app").directive("address", function () {
    return{
        restrict: "E",
        scope: true, //inherited scope
        templateUrl: "templates/address.html",
        controller: function ($scope) {
            $scope.collapsed = false;
            $scope.collapseAddress = function () {
                $scope.collapsed = true;
            };
            $scope.expandAddress = function () {
                $scope.collapsed = false;
            };
        }
    }
});

angular.module("app").directive("removeFriend", function () {
    return{
        restrict: "E",
        scope: {
            notifyParent: "&method" //expression call from parent of isolate scope (call a method from parent scope set by the attr method=)
        },
        templateUrl: "templates/removeFriend.html",
        controller: function ($scope) {
            $scope.removing = false;
            $scope.startRemove = function () {
                $scope.removing = true;
            };
            $scope.cancelRemove = function () {
                $scope.removing = false;
            };
            $scope.confirmRemove = function () {
                $scope.notifyParent();
                //$scope.notifyParent({friend:'cnt'}); override if needed
            };
        }

    }
});

angular.module("app").directive("stateDisplay", function () {
    return {
        link: function (scope, element, attrs) {
            var parms = attrs['stateDisplay'].split(' ');
            var linkVar = parms[0];
            var classes = parms.slice(1);
            scope.$watch(linkVar, function (newVal) {
                element.removeClass(classes.join(' '));
                element.addClass(classes[newVal]);
            });
        }
    }
});

angular.module("app").directive("userClickSelect", function () {
    return{
        restrict: "A",
        link: function (scope, element, attr) {
            element.on("click", function () {
                scope.$apply(function () {
                    scope.user.selected = !scope.user.selected;
                })
            });
        }
    }
});

//Assign classes based on user.level

angular.module("app").directive("spacebarSupport", function () {
    return{
        restrict: "A",
        link: function (scope, element, attrs) {
            $('body').on('keypress', function (event) {
                var vidElement = element[0];
                if (event.keyCode === 32) {
                    if (vidElement.paused) {
                        vidElement.play();
                    }
                    else {
                        vidElement.pause();
                    }
                }
            });
        }
    }
});

angular.module("app").directive("eventPause", function ($parse) { //Converts Angular expression into a function
    return{
        restrict: "A",
        link: function (scope, element, attrs) {
            var fn = $parse(attrs['eventPause']); //pass function from directive to controller through attr instead of isolated scope
            element.on('pause', function (event) {
                scope.$apply(function () {
                    fn(scope, {evt: event});
                });
            })
        }
    }
});

angular.module("app").directive("myClick", function ($parse) {
    return{
        restrict: "A",
        link: function (scope, element, attrs) {
            var fn = $parse(attrs['myClick']);
            element.on("click", function () {
                scope.$apply(function () {
                    fn(scope);
                })
            })
        }
    }
});

angular.module("app").directive("userTile", function () {
    return{
        restrict: "E",
        scope: {
            user: "="
        },
        templateUrl: "templates/userTile.html"
    }
});


angular.module("app").directive("fontScale", function () {
    return{
        restrict: "A",
        link: function (scope, element, attr) {
            scope.$watch(attr['fontScale'], function (newVal) {
                element.css('font-size', newVal + '%');
            });
        }
    }
});

angular.module("app").directive("displayBox", function () {
    return{
        restrict: "E",
        scope: {
            messageDirective: "@message"
        },
        templateUrl: "templates/displayBox.html",
        controller: function ($scope, $timeout) {
            $scope.hidden = false;
            $timeout(function () {
                $scope.messageDirective = "why";
            }, 3000);
            $scope.close = function () {
                $scope.hidden = true;
            }
        },
        transclude: true
    }
});

angular.module("app").directive("myQuestion", function () {
    return{
        restrict: "E",
        transclude: true,
        scope: {
            questionText: "@q"
        },
        templateUrl: "templates/myQuestion.html"
    }
});

angular.module("app").directive("myTransclude", function ($window) {
    return{
        restrict: "A",
        transclude: 'element',
        link: function (scope, element, attr, ctrl, transclude) {
            transclude(scope, function (clone) {
                element.after(clone);
                //angular.element(document.querySelector('h1')).append(clone);
            });
        }
    }
});

angular.module("app").directive("myLazyRender", function () {
    return{
        restrict: "A",
        transclude: "element",
        priority: 1200,//ng-repeat runs at 1000 execute after it
        link: function (scope, element, attr, ctrl, transclude) {
            var hasBeenShown = false;
            var unwatchFn = scope.$watch(attr.myLazyRender, function (newValue) {
                if (newValue == true && !hasBeenShown) {
                    transclude(scope, function (clone) {
                        element.after(clone);
                    });
                    unwatchFn();
                }
            });
        }
    }
});

angular.module("app").directive("echo", function () {
    return{
        priority: 900,
        link: function () {
            console.log('echo');
        }
    }
});

angular.module("app").directive("userList", function ($compile) {
    return{
        restrict: "A",
        transclude: "element",
        link: function (scope, element, attrs, ctrl, transclude) {
            var pieces = attrs.userList.split(" ");
            var itemString = pieces[0];
            var collectionName = pieces[2];
            var elements = [];

            var repeatFn = scope.$watchCollection(collectionName, function (collection) {
                if (elements.length > 0) {
                    for (var i = 0; i < elements.length; i++) {
                        elements[i].element.remove();
                        elements[i].scope.$destroy();
                    }
                    elements = [];
                }

                for (var i = 0; i < collection.length; i++) {
                    var childScope = scope.$new(); //create new scope for each item
                    childScope[itemString] = collection[i];
                    transclude(childScope, function (clone) {
                        var template = $compile('<div class="panel panel-primary"><div class="panel-heading">{{' + itemString + '.name}}</div><div class="panel-body"/></div>');
                        var wrapper = template(childScope);
                        wrapper.find(".panel-body").append(clone);
                        element.before(wrapper);
                        var item = {};
                        item.element = wrapper;
                        item.scope = childScope;
                        elements.push(item);
                    });
                }
            });
        }

    }
});

angular.module("app").directive(function () {
    return{
        compile: function (el, attr) {

        }
    }
});


























