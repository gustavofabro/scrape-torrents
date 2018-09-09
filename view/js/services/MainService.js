angular.module('MainService', []).factory('service', ['$http', function($http){
    return {   
        get_by_url: function(query, cbSuccess, cbError) {
            return $http.get('/api/magnets_urls/' + encodeURIComponent(query))
                    .then(cbSuccess)
        },
        get_by_query: function(query, cbSuccess, cbError) {
            return $http.get('/api/magnets_query/' + query)
                    .then(cbSuccess)
        }     
    }
}]);