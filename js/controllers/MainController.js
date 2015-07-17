"use strict";

angular.module("app").controller("MainController", function ($scope) {
    $scope.bountyHunters = [
        {
            name: "bobby",
            age: 2111
        },
        {
            name: "brown",
            age:212
        },
        {
            name: "bell",
            age:23
        },
        {
            name: "biv",
            age:22
        }
    ];
    $scope.add = function () {
        $scope.bountyHunters.push({name: "devoe"});
    };
    $scope.remove = function () {
        $scope.bountyHunters.length--;
    };

    $scope.items = [123, 1253, 54, 345, 55];
    $scope.answers = {baseLocation: 'sm'};
    $scope.messageDirective = "how come";

    $scope.droid1 = {
        name: "starscream",
        level: 0,
        specifications: {
            manufacturer: "decepticon",
            type: "air",
            productLine: "88"
        }
    }

    $scope.person1 = {
        rank: '',
        level: 1,
        selected: false,
        name: "barge Ass",
        address: {
            street: "fu",
            city: "sydney",
            planet: "earth"
        },
        friends: ["bill", "issa", "cnt"]
    };
    $scope.person2 = {
        rank: '',
        level: 0,
        name: "lebron james",
        address: {
            street: "fu2",
            city: "sydney",
            planet: "earth"
        },
        city: "sydney",
        planet: "earth",
        friends: ["love", "delly", "cnt"]
    };
    $scope.messages = [];
    $scope.handlePause = function (evt) {
        console.log(evt);
        $scope.messages.push({text: "paused!"});
        console.log("paused");
    };

    $scope.data = {
        message: "not clicked"
    };

    $scope.clickHandler = function (p) {
        p.message = "clicked now";
    };
    $scope.size = 100;

    console.log($scope);
});
