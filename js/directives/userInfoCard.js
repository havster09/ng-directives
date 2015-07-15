"use strict";

app.directive("userInfoCard",function(){
    return{
        restrict:"E",
        scope:{
            user:"=person",
            initialCollapsed:'@collapsed'//string param | 'collapsed' specify name off attr in html
        },
        templateUrl:"templates/userinfoCard.html",
        link:function(scope,element,attrs){
            element.on('click',function(){
               //console.log(scope,attrs);
            });
        },
        controller:function($scope){
            $scope.collapsed = ($scope.initialCollapsed === "true");
            $scope.knightMe = function(user){
                user.rank = "knight";
            };
            $scope.collapse = function(){
                $scope.collapsed = !$scope.collapsed;
            };
            $scope.removeFriend = function(friend){
                var idx = $scope.user.friends.indexOf(friend);
                if(idx > -1){
                    $scope.user.friends.splice(idx,1);
                }
            };
        }
    }
});

app.directive("address",function(){
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

app.directive("removeFriend",function(){
    return{
        restrict:"E",
        scope:{
            notifyParent:"&method" //call a method from parent scope set by the attr method=
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



