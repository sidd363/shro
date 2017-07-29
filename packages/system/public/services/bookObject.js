'use strict';

angular.module('mean.system').service('bookObject', function() {
    var productList = [];

    var addProduct = function(newObj) {
        productList.push(newObj);
    };

    var getProducts = function(){
        return productList;
    };

    return {
	    addProduct: addProduct,
	    getProducts: getProducts
    };
});