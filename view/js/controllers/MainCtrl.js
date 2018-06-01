angular.module('MainCtrl', []).controller('MainController', function ($scope, service) {
    $scope.tagline = 'There and back again'
    $scope.torrents_links = [];
    $scope.query = ''
    $scope.isDownloading = false;

    $scope.getTorrents = () => {
        let fn = null;

        if (isUrl($scope.query)) {
            fn = service.get_by_url
        } else {
            fn = service.get_by_query
        }

        $scope.isDownloading = true;
        $scope.torrents_links = [];

        fn($scope.query, res => {
            $scope.isDownloading = false;
            $scope.torrents_links = res.data.urls
        })
    }

    function isUrl(input) {
        try {
            new URL($scope.query)
            return true
        } catch (e) {
            return false
        }
    }
});