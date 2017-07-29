'use strict';

angular.module('mean.others').controller('editModalCtrl', ['$scope', 'Global','$http', '$location','bookObject',
    function($scope, Global, $http, $location, bookObject) {
        $scope.global = Global;
        $scope.book = bookObject.getProducts().pop();
        console.log("in editModalCtrl==>", $scope.book);
       
        $scope.editDetails = function(){
            console.log("edit  book", $scope.book);
            $http.post('/api/editBook', $scope.book)
        	.success(function(res){
        		console.log("all well");
        		$location.url('/');
        	}).error(function(error){
        		
        	})
        }
    
    }
]);
