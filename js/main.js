
var myApp = angular.module("myApp", ['ngRoute']);

myApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/admin', {
                templateUrl: 'admin.html',
                controller: 'admin'
            }).
            when('/user', {
                templateUrl: 'template.html',
                controller: 'userList'
            }).
            otherwise({
                redirectTo: '/'

            });
    }]);
//myApp.controller('userCtrl', function ($scope ,$http) {
//    $scope.fName = '';
//    $scope.lName = '';
//    $scope.edit = false;
//    $scope.create = false;
//    $scope.template = false;
//    $scope.button = true;
//
//
//    $http.get("http://172.16.0.180:3000") .success(function(response,data) {
//        $scope.users = response;
//    });
//
//    $scope.submit = function (id) {
//
//        if (id == 'new') {
//            $scope._actionType = 'new';
//            $scope.button = true;
//            $scope.create = true;
//            $scope.template = true;
//            $scope.edit = false;
//        }else{
//            $scope._actionType = id;
//            $scope.button = false;
//            $scope.create = false;
//            $scope.template = true;
//            $scope.edit = true;
//            $scope.users.forEach(function(index){
//                if(index.id == id){
//                    $scope.fName = index.Fname;
//                    $scope.lName = index.Lname;
//                }
//            });
//        }
//    };
//
//    $scope.save = function(action){
//
//        if(action == 'new'){
//            if ($scope.fName && $scope.lName) {
//                var data = {
//                    fname : $scope.fName,
//                    lname : $scope.lName
//                };
//                $http.post("http://172.16.0.180:3000",data)
//                    .success(function(response) {
//                    });
//                $scope.fName = '';
//                $scope.lName = '';
//                $scope.passw1 = '';
//                $scope.passw2 = '';
//            }else{
//                alert('please enter fname and lname');
//            }
//        }else{
//
//            if ($scope.fName && $scope.lName) {
//                var data = {
//                    fname : $scope.fName,
//                    lname : $scope.lName
//                };
//                $http.put("http://172.16.0.180:3000/edit/"+action,data)
//                    .success(function(response) {
//                    });
//                $scope.fName = '';
//                $scope.lName = '';
//                $scope.passw1 = '';
//                $scope.passw2 = '';
//            }else{
//                alert('please enter fname and lname');
//            }
//        }
//    };
//
//    $scope.deleteUser = function (ids) {
//        $http.delete("http://172.16.0.180:3000/delete/"+ids)
//            .success(function(response) {
//
//            });
//    };
//});
myApp.controller('admin', function($scope, $http) {

    $scope.submit = function(){
        if($scope.email && $scope.password){
            var data = {
                email : $scope.email,
                password : $scope.password
            };
            $http.post("http://localhost:3000/insert",data).success(function(response) {
                console.log(response);
            });
        }else{
            alert('please input something');
        }
    };

});
myApp.controller('userList', function($scope, $http) {
     
    $http.get("http://localhost:3000/user").success(function(response) {
        console.log(response);
        $scope.user = response;
    });
     
     
});