'use strict';

angular.module('mean.others').controller('assignedCustModalCtrl', ['$scope', 'Global','$http', '$location','bookObject',
    function($scope, Global, $http, $location, bookObject) {
        $scope.global = Global;
        $scope.book = bookObject.getProducts().pop();
        console.log("in editModalCtrl==>", $scope.book);
        $scope.getAllAssignedCustomers = function(){
            console.log("getAllAssignedCustomers", $scope.book);
            $http.post('/api/assignedCustomers', $scope.book)
        	.success(function(res){
        		console.log("all well,assignedCustomers", res);
                $scope.user = res[0];
        	}).error(function(error){
        		$scope.user = {username:""};
        	})
        }

        $scope.unassign = function(){
            console.log("edit  book", $scope.book);


            $http.post('/api/removeCustomerBook', {
                userid: $scope.user._id,
                bookToBeRemoved : $scope.book._id
            })
            .success(function(res){
                console.log("all well");
                $location.url('/');
            }).error(function(error){
                
            })
        }
    }
]);
