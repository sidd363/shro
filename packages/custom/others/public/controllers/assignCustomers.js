'use strict';

angular.module('mean.others').controller('assignCustModalCtrl', ['$scope', 'Global','$http', '$location','bookObject',
    function($scope, Global, $http, $location, bookObject) {
        $scope.global = Global;
        $scope.book = bookObject.getProducts().pop();
        console.log("in editModalCtrl==>", $scope.book);
       
        $scope.getAllUnAssignedCustomers = function(){
            console.log("getAllAssignedCustomers", $scope.book);
            $http.post('/api/unAssignedCustomers', $scope.book)
            .success(function(res){
                console.log("all well,assignedCustomers", res);
                $scope.userArr = res;
            }).error(function(error){
                $scope.userArr = [];
            })
        }

        $scope.assign = function(user){
            console.log("addBookToCustomer", $scope.book);


            $http.post('/api/assignBookToCustomer', {
                userid: user._id,
                bookToBeAdded : $scope.book._id
            })
            .success(function(res){
                console.log("all well");
                $location.url('/');
            }).error(function(error){
                
            })
        }
    
    }
]);
