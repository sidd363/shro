(function() {
    'use strict';

    function Others($http, $q) {
        return {
            name: 'others',
            checkCircle: function(circle) {
                var deferred = $q.defer();

                $http.get('/api/others/example/' + circle).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
                return deferred.promise;

            }
        };
    }

    angular
        .module('mean.others')
        .factory('Others', Others);

    Others.$inject = ['$http', '$q'];

})();
