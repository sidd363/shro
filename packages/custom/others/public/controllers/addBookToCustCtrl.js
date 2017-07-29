'use strict';

angular.module('mean.others').controller('AddBookToCustCtrl', ['$scope', 'Global','$http', '$location',
    function($scope, Global, $http, $location) {
        $scope.global = Global;
        console.log("in addBookController customer side==>");

        $scope.displayAllBooks = function(){
            $http.get('/api/getAllBooks', $scope.book)
            .success(function(res){
                console.log("all books got", res);
                $scope.bookArr = res;
            }).error(function(error){
                $scope.bookArr = [];
            })
        }
        $scope.addToMyAccount = function(book){
            console.log("book to be added==>>",book.title);
            if($scope.global.user && $scope.global.user.booksAssigned){
                for(var i=0;i<$scope.global.user.booksAssigned.length;i++){
                    if($scope.global.user.booksAssigned[i]==book._id){
                        console.log("book to be added==>>",book.title);
                        alert("This Book is already in your account");
                        return;
                    }
                    console.log("$scope.global.user.booksAssigned[i]d==>>",$scope.global.user.booksAssigned[i]);
                }
            }
            
            $http.post('/api/addBookToCustomer',{userid:$scope.global.user._id,bookToBeAdded:book._id})
            .success(function(res){
                console.log("all books got", res);
                $location.url('/');
            }).error(function(error){
                console.log("error in adding book to my account", error);
            })
        }
    
    }
]);
