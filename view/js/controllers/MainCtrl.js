angular.module('MainCtrl', []).controller('MainController', function ($scope, service) {
    $scope.tagline = 'There and back again'
    $scope.torrents_links = []
    $scope.query = ''
    $scope.isDownloading = false
    $scope.hasNoResults = false
    $scope.noResultAlert = 'Nenhum magnet link encontrado para a pesquisa informada'

    $scope.getTorrents = () => {
        let fn = null;

        if (isUrl($scope.query)) {
            fn = service.get_by_url
        } else {
            fn = service.get_by_query
        }

        resetValues();

        fn($scope.query, res => {
            $scope.isDownloading = false;
            
            if (res.data.urls.length) {
                $scope.torrents_links = res.data.urls
            } else {
                $scope.hasNoResults = true;
            }
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

    function resetValues() {
        $scope.isDownloading = true;
        $scope.hasNoResults = false;
        $scope.torrents_links = [];
    }
});