(function() {
    'use strict';

    function Others($stateProvider) {
        $stateProvider.state('others example page', {
            url: '/templatesAdd',
            templateUrl: 'others/views/index.html'
        }).state('addNewBook ', {
            url: '/addNewBook',
            templateUrl: 'others/views/addNewBook.html'
        }).state('editBook ', {
            url: '/editBook',
            templateUrl: 'others/views/editBook.html'
        }).state('addBookToCustomer ', {
            url: '/addBookToCustomer',
            templateUrl: 'others/views/addBookToCustomer.html'
        }).state('assignedCustomers ', {
            url: '/assignedCustomers',
            templateUrl: 'others/views/assignedCustomers.html'
        }).state('assignCustomers ', {
            url: '/assignCustomers',
            templateUrl: 'others/views/assignCustomers.html'
        });
    }



    angular
        .module('mean.others')
        .config(Others);

    Others.$inject = ['$stateProvider'];
 
})();
