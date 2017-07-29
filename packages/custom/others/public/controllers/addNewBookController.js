'use strict';

angular.module('mean.others').controller('addBookController', ['$scope', 'Global','$http', '$location',
    function($scope, Global, $http, $location) {
        $scope.global = Global;
        console.log("in addBookController==>");
        $scope.addDetails = function(){
            console.log("add new book", $scope.book);
            $http.post('/api/addBook', $scope.book)
        	.success(function(res){
        		console.log("all well");
        		$location.url('/');
        	}).error(function(error){
        		
        	})
        }
    
    }
]);
