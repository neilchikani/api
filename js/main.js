 


var myApp = angular.module("myApp", ['textAngular','ngRoute']);
myApp.directive('file', function () {
    return {
        scope: {
            file: '='
        },
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                console.log(event);
                var file = event.target.files[0];
                scope.file = file ? file : undefined;
                scope.$apply();
            });
        }
    };
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
            otherwise({
                redirectTo: '/'

            });
    }]);
myApp.controller('admin', function admin($scope, $http) {
     $scope.htmlContent = 'Hello';

    $scope.submit = function(){
        
        
        if($scope.email && $scope.password){
             
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
                    console.log(formData);
                    var headers = headersGetter();
                    delete headers['Content-Type'];

                    return formData;
                }
            })
            .success(function (data) {
                alert("data has been submitted");
            })
            .error(function (data, status) {
                alert("error occured");
            });
             
            
        }else{
            alert('please input something');
        }
    };

});
myApp.controller('userList', function ($scope, $http) {
    $scope.url = "http://localhost:3000/";
    
    $http.get("http://localhost:3000/user").success(function(response) {
         $scope.user = response;
         
    });
});