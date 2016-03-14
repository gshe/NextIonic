angular.module('starter.controllers')

.controller('UserCtrl', function($scope, $stateParams, $log, User) {
  var loginname = $stateParams.loginname;
  var currentUser = User.getCurrentUser();
  
  $scope.loginname = loginname;
  $scope.curUser = currentUser;
  $scope.$on('$ionicView.beforeEnter', function(){
    $scope.loadUser(true);
  });

  $scope.loadUser = function(reload){
    var userResource;
    if (reload){
      userResource = User.get(loginname);
    }else{
      userResource = User.getByLoginName(loginname);
    }

    return userResource.$promise.then(function(response){
      $scope.user = response.data;
      $log.debug($scope.user.recent_topics.length);
    });
  };

 $scope.doRefresh = function(){
   return $scope.loadUser(true).then(function(response){
     $log.debug(response);
   }).finally(function (){
      $scope.$broadcast('scroll.refreshComplete');
   });
 };

  $scope.logout = function() {
    User.logout();
  };
});
