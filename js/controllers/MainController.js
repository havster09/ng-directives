"use strict";

angular.module("app").controller("MainController", function ($scope) {
    $scope.users = [
        {name:"Luke",job:"Jedi",planet:"Tatooine"},
        {name:"Han",job:"Pilot",planet:"fagotron"},
        {name:"Chuuy",job:"Dmknt",planet:"Tatooine"}
    ]
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
        hasForce:true,
        yearsOfJediTraining:4,
        master:"yoda",
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

    console.log($scope);

    //---------------- ui-bs accordion
    $scope.oneAtATime = true;

    $scope.groups = [
        {
            title: 'Dynamic Group Header - 1',
            content: 'Dynamic Group Body - 1',
            bodyContent:'The body of the accordion group grows to fit the contents Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque blanditiis cum cupiditate dolorem dolorum molestiae voluptatibus? Deleniti maiores neque voluptatibus? Commodi deserunt ducimus laborum saepe sunt vel, velit voluptatibus? Aliquid!'
        },
        {
            title: 'Dynamic Group Header - 2',
            content: 'Dynamic Group Body - 2',
            bodyContent:'lorem'
        }
    ];

    $scope.items = ['Item 1', 'Item 2', 'Item 3'];

    $scope.addItem = function() {
        var newItemNo = $scope.items.length + 1;
        $scope.items.push('Item ' + newItemNo);
    };

    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };

    //-----------------ui-bs alerts
    $scope.alerts = [
        { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
        { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
    ];

    $scope.addAlert = function(msg) {
        if(!msg){
            $scope.alerts.push({msg: 'none'});
        }
        else{
            $scope.alerts.push({msg: msg});
        }
    };

    $scope.closeAlert = function(index) {
        console.log(index);
        $scope.alerts.splice(index, 1);
    };

    //-------------ui-bs buttons
    $scope.singleModel = 1;

    $scope.radioModel = 'Middle';

    $scope.checkModel = {
        left: false,
        middle: true,
        right: false
    };

    //----------ui-bs collapsed
    $scope.isCollapsed = false;

    //---------ui-bs date picker
    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);
    $scope.events =
        [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

    $scope.getDayClass = function(date, mode) {
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i=0;i<$scope.events.length;i++){
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    };
});
