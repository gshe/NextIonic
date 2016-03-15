angular.module('starter.controllers')

    .controller('MessageCtrl', function ($scope, $stateParams, $log, User, Messages) {
        $scope.message = Messages.getCachedMessages();

        $scope.doRefresh = function () {
            return Messages.getMessages().$promise.then(function (response) {
                $scope.message = response.data;
                $log.debug($scope.message);
            }).finally(function () {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });

        };

        $scope.onMarkAllRead = function () {
            return Messages.markAll().$promise.then(function () {
                $scope.doRefresh();
            });
        };

    });
