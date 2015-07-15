app.controller("MainController",function($scope){
    $scope.user1 = {
        level:1,
        name:"barge ass",
        address:{
            street:"fu",
            city:"sydney",
            planet:"earth"
        },
        friends:["bill","issa","cnt"]
    };
    $scope.user2 = {
        level:0,
        name:"lebron james",
        address:{
            street:"fu2",
            city:"sydney",
            planet:"earth"
        },
        city:"sydney",
        planet:"earth",
        friends:["love","delly","cnt"]
    };
    console.log($scope);
});
