angular.module('starter.controllers')

.controller('TopicsCtrl', function($scope, $rootScope, $stateParams, $stateParams, $timeout, $ionicLoading, $ionicModal, $log, ENV, User, Tabs, Topics) {
  $log.debug('TopicsCtrl, stateParams' + $stateParams);
  $scope.currentTab = $stateParams.tab;
  $scope.tabs = Tabs;
  if ($scope.currentTab !== Topics.currentTab){
    Topics.resetData();
  }

  $scope.topics = Topics.getTopics();
  $log.debug('TopicsCtrl, Topics' + $scope.topics.length);
  $scope.hasNextPage = Topics.hasNextPage();
  $scope.loadError = false;
  $log.debug('page load, has next page ? ', $scope.hasNextPage);
  $scope.doRefresh = function() {
    Topics.currentTab($stateParams.tab);
    $log.debug('do refresh');
    Topics.refresh().$promise.then(function(response) {
        $log.debug('do refresh complete');
        $scope.topics = response.data;
        $scope.hasNextPage = true;
        $scope.loadError = false;
      }
    ).finally(function() {
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.loadMore = function() {
    $log.debug('load more');
    Topics.pagination().$promise.then(function(response) {
        $log.debug('load more complete');
        $scope.hasNextPage = false;
        $scope.loadError = false;
        $timeout(function() {
          $scope.hasNextPage = Topics.hasNextPage();
          $log.debug('has next page ? ', $scope.hasNextPage);
        }, 100);
        $scope.topics = $scope.topics.concat(response.data);
      }
    ).finally(function() {
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

  $scope.newTopicData = {
      tab: 'share',
      title: '',
      content: ''
    };

  $ionicModal.fromTemplateUrl('templates/newTopic.html', {
    tabs: Tabs,
    scope: $scope
  }).then(function(modal) {
    $scope.newTopicModal = modal;
  });

  $scope.onShowNewTopic= function(){
    $scope.newTopicModal.show();
  };
  $scope.onHideNewTopic= function(){
    $scope.newTopicModal.hide();
  };

  $scope.onSaveTopic = function () {
    $ionicLoading.show();
    Topics.saveNewTopic($scope.newTopicData).$promise.then(function(response){
      $ionicLoading.hide();
      $scope.newTopicModal.hide();
    });
  };
});
