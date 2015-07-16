"use strict";

angular.module("app").directive("personInfoCard",function(){
    return{
        restrict:"E",
        scope:{
            person:"=person",//two way binding of parent scope to person attr value
            initialCollapsed:'@collapsed'//string param | can parse binded values {{}} to string |'collapsed' specify name off attr in html | one way bind from parent also
        },
        templateUrl:"templates/personInfoCard.html",
        controller:function($scope){
            $scope.knightMe = function(person){
                person.rank = "knight";
            };
            $scope.removeFriend = function(friend){
                var idx = $scope.person.friends.indexOf(friend);
                if(idx > -1){
                    $scope.person.friends.splice(idx,1);
                }
            };
        }
    }
});

angular.module("app").directive("userPanel",function(){
    return{
        restrict:"E",
        templateUrl:"templates/userPanel.html",
        transclude:true,
        scope:{
            name:"@",
            level:"=",
            initialCollapsed:"@collapsed"
        },
        controller:function($scope){
            $scope.collapsed = ($scope.initialCollapsed === "true");
            $scope.collapse = function(){
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

angular.module("app").directive("droidInfoCard",function(){
    return{
        restrict:"E",
        scope:{
            droid:"=",//two way binding of parent scope to person attr value
            initialCollapsed:'@collapsed'//string param | 'collapsed' specify name off attr in html | one way bind from parent also
        },
        templateUrl:"templates/droidInfoCard.html"
    }
});

angular.module("app").directive("address",function(){
   return{
       restrict:"E",
       scope:true, //inherited scope
       templateUrl:"templates/address.html",
       controller:function($scope){
           $scope.collapsed = false;
           $scope.collapseAddress = function(){
               $scope.collapsed = true;
           };
           $scope.expandAddress = function(){
               $scope.collapsed = false;
           };
       }
   }
});

angular.module("app").directive("removeFriend",function(){
    return{
        restrict:"E",
        scope:{
            notifyParent:"&method" //expression call from parent of isolate scope (call a method from parent scope set by the attr method=)
        },
        templateUrl:"templates/removeFriend.html",
        controller:function($scope){
            $scope.removing = false;
            $scope.startRemove = function(){
                $scope.removing = true;
            };
            $scope.cancelRemove = function(){
                $scope.removing = false;
            };
            $scope.confirmRemove = function(){
                $scope.notifyParent();
                //$scope.notifyParent({friend:'cnt'}); override if needed
            };
        }

    }
});

angular.module("app").directive("stateDisplay",function(){
   return {
       link:function(scope,element,attrs){
           var parms = attrs['stateDisplay'].split(' ');
           var linkVar = parms[0];
           var classes = parms.slice(1);
           scope.$watch(linkVar,function(newVal){
               element.removeClass(classes.join(' '));
               element.addClass(classes[newVal]);
           });
       }
   }
});

angular.module("app").directive("userClickSelect",function(){
    return{
        restrict:"A",
        link:function(scope,element,attr){
            element.on("click",function(){
                scope.$apply(function(){
                    scope.user.selected = !scope.user.selected;
                })
            });
        }
    }
});

//Assign classes based on user.level

angular.module("app").directive("spacebarSupport",function(){
   return{
       restrict:"A",
       link:function(scope,element,attrs){
           $('body').on('keypress',function(event){
               var vidElement = element[0];
              if(event.keyCode === 32){
                  if(vidElement.paused){
                      vidElement.play();
                  }
                  else{
                      vidElement.pause();
                  }
              }
           });
       }
   }
});

angular.module("app").directive("eventPause",function($parse){ //Converts Angular expression into a function
    return{
        restrict:"A",
        link:function(scope,element,attrs){
            var fn = $parse(attrs['eventPause']); //pass function from directive to controller through attr instead of isolated scope
            element.on('pause',function(event){
                scope.$apply(function(){
                    fn(scope,{evt:event});
                });
            })
        }
    }
});

angular.module("app").directive("myClick",function($parse){
   return{
       restrict:"A",
       link:function(scope,element,attrs){
           var fn = $parse(attrs['myClick']);
           element.on("click",function(){
               scope.$apply(function(){
                   fn(scope);
               })
           })
       }
   }
});

angular.module("app").directive("userTile", function(){
   return{
       restrict:"E",
       scope:{
           user:"="
       },
       templateUrl:"templates/userTile.html"
   }
});



angular.module("app").directive("fontScale",function(){
   return{
       restrict:"A",
       link:function(scope,element,attr){
           scope.$watch(attr['fontScale'],function(newVal){
               element.css('font-size',newVal+'%');
           });
       }
   }
});

angular.module("app").directive("displayBox",function(){
   return{
       restrict:"E",
       scope:{
           messageDirective:"@message"
       },
       templateUrl:"templates/displayBox.html",
       controller:function($scope,$timeout){
           $scope.hidden = false;
           $timeout(function(){
               $scope.messageDirective = "why";
           },3000);
           $scope.close = function(){
               $scope.hidden = true;
           }
       },
       transclude:true
   }
});

angular.module("app").directive("myQuestion",function(){
   return{
       restrict:"E",
       transclude:true,
       scope:{
           questionText:"@q"
       },
       templateUrl:"templates/myQuestion.html"
   }
});







