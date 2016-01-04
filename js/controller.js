/**
 * Created by Nilay C on 22-01-2015.
 */
var app = angular.module('myApp', ['ngRoute']);
var array = [];
var nilay;
app.factory('MathService', function() {
    var factory = {};
    factory.multiply = function(a, b) {
        return a * b
    },
    factory.add = function (a,b) {
        return a + b;
    }
    return factory;
});

//inject the factory "MathService" in a service to utilize the multiply method of factory.
app.service('CalcService', function(){
    this.square = function(a) {
        return a * a;
    },
    this.add = function (a) {
        return a + a;
    }
});
app.controller('test', function ($scope,$http, CalcService) {
    $scope.square = function() {
        $scope.result = CalcService.add($scope.number);
    }
    $scope.Name = 'Neil';
    $scope.value = 'Neil';
    //console.log(angular.equals($scope.Name, $scope.value));
    $scope.object = {},
    $scope.object['Name'] = 'Nilay',
    $scope.object.fn = function (value) {
        return value * 2;
    };
    $scope.mySwitch = true,
    $scope.test = true,
    $scope.hide = false,
    $scope.name = [
        {
            name: 'nilay'
        },
        {
            name: 'neil'
        }
    ],
    $scope.section = [
        {
            description: "here are some description-1",
            src: 'images/1.jpg'
        },
        {
            description: "here are some description-2",
            src: 'images/2.jpg'
        },
        {
            description: "here are some description-3",
            src: 'images/1.jpg'
        },
        {
            description: "here are some description-4",
            src: 'images/2.jpg'
        },
        {
            description: "here are some description-5",
            src: 'images/1.jpg'
        },
        {
            description: "here are some description-6",
            src: 'images/2.jpg'
        }
    ],
    $scope.logo = {
        src: 'images/logo.png',
        title: 'this is the title for logo'
    },
    $scope.firstname = 'nilay',
    $scope.lastname = 'chikani',
    $scope.toggle = function () {
        $scope.hide = !$scope.hide;
    },
    $http.get("data.json").success(function(response) {
        //console.log(angular.fromJson(response));
        //console.log(response);
        for ( var i = 0; i < response.length; i++ ){
            var name = response[i].Name;
            array.push(name);
            //console.log(name);
            //$scope.names = name;
        }
        //angular.forEach(response, function(value, key) {
        //    console.log(value, key, obj);
        //});
        //console.log(response.length);
        //console.log(jQuery.inArray("Alfreds Futterkiste", array));
        $scope.names = array;
        //console.log(array);
        //$.each(response, function (index, value) {
        //    var name = response[index].Name;
        //    var country = response[index].Country;
        //    //console.log(name);
        //    //console.log(country);
        });
    $scope.master = {
        firstName:"John",
        lastName:"Doe"
    };
    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
        //console.log(angular.copy($scope.master));
    };
    $scope.reset();
    $scope.message = '';
    $scope.left = function () {
        return 100 - $scope.message.length;
    };
    $scope.save = function () {
      console.log('notes is saved');
    };
    $scope.clear = function () {
        $scope.message = '';
    };
    $scope.first = '';
    $scope.second = '';
    $scope.calc = function () {
        $scope.a = parseInt($scope.first);
        $scope.b = parseInt($scope.second);
        $scope.result = $scope.a + $scope.b;
    };
    $scope.todoList = [];
    $scope.todoAdd = function() {
        $scope.todoList.push({todoText:$scope.todoInput, done:false, edit:false});
        $scope.todoInput = "";
        //console.log($scope.todoList);
    };
    $scope.edit = function () {
        $scope.todoList.forEach(function (item,index,arr) {
            if((item.done)){
                item.edit = true;
                item.todoText = '';
                console.log(item);
            }
        });
    };
    $scope.rename = function () {
        $scope.todoList.forEach(function (item,index,arr) {
            if((item.done)){
                item.edit = false;
                item.todoText = $scope.editText;
                //console.log(item);
            }
        });
    };
    $scope.remove = function() {
        $scope.todoList =  $scope.todoList.filter(function (item, index) {
            return !item.done;
            //console.log(item);
            //console.log(item);
        });
        //console.log(oldList);
        //console.log($scope.todoList);
    };
    //console.log($scope .object.fn(2));
    $scope.temp = false;

})
.directive('nilay', function () {
        var directive = {};
        directive.restrict = 'A'; /* restrict this directive to elements */
        directive.templateUrl = "template.html";
        return directive;
});

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/addStudent', {
                templateUrl: 'addStudent.htm',
                controller: 'AddStudentController'
            }).
            when('/viewStudents', {
                templateUrl: 'viewStudents.htm',
                controller: 'ViewStudentsController'
            }).
            otherwise({
                redirectTo: '/addStudent'
            });
    }]);

app.controller('AddStudentController', function($scope) {
    $scope.message = "This page will be used to display add student form";
});

app.controller('ViewStudentsController', function($scope) {
    $scope.message = "This page will be used to display all the students";
});

$(document).ready(function () {
    var array = [1,2,3,4];
    //console.log(Array.isArray('array'));
});


