 


    var myApp = angular.module("myApp", ['textAngular','ngRoute','ui-notification']);
    myApp.directive('file', function () {
        return {
            scope: {
                file: '='
            },
            link: function (scope, el, attrs) {
                el.bind('change', function (event) {
                    var file = event.target.files[0];
                    scope.file = file ? file : undefined;
                    scope.$apply();
                });
            }
        };
    });
    myApp.directive('studentDirective', function () {
        return {
            template: " Hello",
             
            restrict: 'E',
            controller: function ($scope) {
                console.log($scope);
            }
        }
    });
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
            when('/profile/:userid', {
                templateUrl: 'profile.html',
                controller: 'profile'
            }).
            when('/edit/:userid', {
                templateUrl: 'edit.html',
                controller: 'edit'
            }).
            otherwise({
                redirectTo: '/admin'
            });
    }]);
    // myApp.controller('main', function admin($scope, $http, Notification) {
    //     // console.log('Hey')
    // });

    myApp.controller('admin', function admin($scope, $http, Notification) {


    $scope.submitForm = function(){

        
        
        if($scope.email && $scope.password && $scope.file && $scope.htmlContent ){
             
             $http({
                method: 'POST',
                url: 'http://localhost:3000/insert',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: {
                    email : $scope.email,
                    password : $scope.password,
                    richText : $scope.htmlContent,
                    image: $scope.file
                },
                transformRequest: function (data, headersGetter) {
                    var formData = new FormData();
                    angular.forEach(data, function (value, key) {
                        formData.append(key, value);
                    });
                    var headers = headersGetter();
                    delete headers['Content-Type'];
                    return formData;
                }
            })
            .success(function (data) {
                Notification.success({
                    message: 'Data has been submitted succesfully', 
                    positionY: 'bottom', 
                    positionX: 'right'
                });
                 
                $scope.email = '';               
                $scope.password = '';
                $scope.htmlContent = '';
                $('input[type="file"]').val(null);
            })
            .error(function (data, status) {
                Notification.error({
                    message: 'Something went wrong.', 
                    positionY: 'bottom', 
                    positionX: 'right'
                });
            });
             
            
        }else{
            alert('please input something');
        }
    };

    });
myApp.controller('userList', function ($scope, $http, Notification,$filter,$route,$timeout) {
    $scope.url = "http://localhost:3000/";
    $http.get("http://localhost:3000/user").success(function(response) {
         Notification.success({
            message: 'Welcome to User area', 
            positionY: 'top', 
            positionX: 'right'
        });
        angular.forEach(response, function(value, key) {
            console.log(key);
        });
        $scope.user = $filter('orderBy')(response, "Fname");
         // $scope.user = response;

    });
    $scope.delete = function(id){
        $http({
            url: "http://localhost:3000/profile", 
            method: "DELETE",
            params: {user_id: id}
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            Notification.success({
                message: 'Data has been deleted successfully', 
                positionY: 'bottom', 
                positionX: 'right'
            });
            $timeout(function() {
                $route.reload();
            }, 1000);
           
            
            
             
            // $scope.user = response.data;
            // console.log(response.data;);
          }, function errorCallback(response) {
             
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
    }
});
myApp.controller('profile', function ($scope, $http,$routeParams,Notification,$route,$timeout) {
     
    $scope.profile = "Hellooo";
    $scope.url = "http://localhost:3000/";
    $http({
        url: "http://localhost:3000/profile", 
        method: "GET",
        params: {user_id: $routeParams.userid}
         
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        Notification.success({
            message: 'Welcome to User Profile page', 
            positionY: 'top', 
            positionX: 'right'
        });
        $scope.user = response.data;
        // console.log(response.data;);
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

});
myApp.controller('edit', function ($scope, $http,$routeParams,Notification,$route,$window,$location,$timeout) {
    $scope.url = "http://localhost:3000/";
    console.log(Object.getPrototypeOf($route));
    $http({
        url: "http://localhost:3000/profile", 
        method: "GET",
        params: {user_id: $routeParams.userid}
         
    }).then(function successCallback(response) {
        $scope.email = response.data[0].Fname;
        $scope.password = response.data[0].Lname;
        $scope.htmlContent = response.data[0].Description;
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    $scope.editForm = function(){
        $http({
            url: "http://localhost:3000/profile", 
            method: "PUT",
            data: {
                email : $scope.email,
                password : $scope.password,
                richText : $scope.htmlContent
            },
            params: {user_id: $routeParams.userid}
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            Notification.success({
                message: 'Data has been updated successfully', 
                positionY: 'bottom', 
                positionX: 'right'
            });
            $timeout(function() {
                $location.path( "/user" );
            }, 1000);
           
            
            
             
            // $scope.user = response.data;
            // console.log(response.data;);
          }, function errorCallback(response) {
             
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
    }
     
});