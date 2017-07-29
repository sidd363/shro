'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global','$location', '$http', '$document','bookObject',
    function($scope, Global, $location, $http, $document, bookObject) {
       
        $scope.global = Global;
        console.log("page loaded==", $scope.global);
        
        $scope.admin_enabled = false;
        $scope.isLogin = true; 
        if(!$scope.global.user._id){
            $scope.isLogin = false;
        }
        if($scope.global.user && $scope.global.user._id && $scope.global.user.roles.indexOf('admin') !== -1){
            $scope.admin_enabled = true;
        }
        $scope.addNewBook = function(){
            $location.url('/addNewBook');
        }
        $scope.getAllBooks = function(){
        	$http.get('/api/getAllBooks')
        	.success(function(res){
        		console.log("all books got", res);
        		$scope.bookArr = res;
        	}).error(function(error){
        		$scope.bookArr = [];
        	})
        }
        $scope.editBook = function(book){
            bookObject.addProduct(book);
        	$location.url('/editBook');
	    }
        $scope.removeBook = function(book){
            $http.post('/api/removeBook',{_id:book._id} )
        	.success(function(res){
        		console.log("all books got", res);
        		$scope.getAllBooks();
        	}).error(function(error){
        		$scope.getAllBooks();
        	})
        }
        $scope.assignedCustomers = function(book){
            $http.post('/api/assignedCustomers', book)
            .success(function(res){
                console.log("all well,assignedCustomers", res);
                if(res[0]){
                    bookObject.addProduct(book);
                    $location.url('/assignedCustomers');
                }else{
                    alert('Book has not been assigned to anyone');
                }
            }).error(function(error){
            })
            
        }

        $scope.assignCustomers = function(book){

            $http.post('/api/assignedCustomers', book)
            .success(function(res){
                console.log("all well,assignedCustomers", res);
                if(res[0]){
                    alert("book is already assigned.");
                }else{
                    bookObject.addProduct(book);
                    $location.url('/assignCustomers');
                }
            }).error(function(error){
            })
        }


        $scope.removeBookCustomer = function(book){
            $http.post('/api/removeCustomerBook',{
                userid:$scope.global.user._id,
                bookToBeRemoved : book._id
            })
            .success(function(res){
                console.log("all books got", res);
                $scope.getCustomerBooks();
            }).error(function(error){
                $scope.getCustomerBooks();
            })
        }

        $scope.getCustomerBooks = function(){
            console.log("userid==>>",$scope.global.user._id);
            if($scope.global.user._id && !$scope.admin_enabled){
                $http.get('/api/getCustomerBooks')
                .success(function(res){
                    console.log("all books got of customer", res);
                    $scope.customerBookArr = res;
                }).error(function(error){
                    $scope.customerBookArr = [];
                }) 
            }
        }
        
        $scope.addBookToCustomer = function(){
            $location.url('/addBookToCustomer');
        }



    }
]);

 