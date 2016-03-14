angular.module('starter.controllers')

.controller('AppCtrl', function($scope, $rootScope, $ionicModal, $timeout, $stateParams, $ionicPopup, $ionicLoading, $log, ENV, Messages, Tabs, User) {
    $scope.Tabs = Tabs;
    var user = User.getCurrentUser();
    $scope.loginname = user.loginname;
    $log.debug('AppCtrl started, user', $scope.loginname);
    $scope.$on('$ionicView.beforeEnter', function() {
      // track view
      var user = User.getCurrentUser();
      $scope.loginname
    });
  // get message count
   $rootScope.getMessageCount = function() {
     Messages.getMessageCount().$promise.then(function(response) {
       $scope.messagesCount = response.data;
       setBadge($scope.messagesCount);
     }, function(response) {
       $log.log('get messages count fail', response);
     });
   };
   // set badge of app icon
var setBadge = function(num) {
  // Promot permission request to show badge notifications
  if (window.cordova && window.cordova.plugins && window.cordova.plugins.notification.badge) {
    cordova.plugins.notification.badge.hasPermission(function (granted) {
      $log.debug('Permission has been granted: ' + granted);
      if (granted) {
        $log.debug('set badge as', num);
        cordova.plugins.notification.badge.set(num);
      }
    });
  }
};

// app resume event
document.addEventListener('resume', function onResume() {
  $log.log('app on resume');
  if ($scope.loginname !== null) {
    $rootScope.getMessageCount();
  }
}, false);

  $scope.doRefresh = function(){
      // return $scope.loadUser(true).then(function(response){
      //
      // }).finally(function(){
      //
      // });
  };

  $scope.lgout=function(){
    User.logout();
    $scope.loginname =null;
    $scope.messagesCount = 0;
  };
  // error handler
  var errorMsg = {
    0: '网络出错啦，请再试一下',
    'wrong accessToken': '授权失败'
  };
  $rootScope.requestErrorHandler = function(options, callback) {
    return function(response) {
      var error;
      if (response.data && response.data.error_msg) {
        error = errorMsg[response.data.error_msg];
      } else {
        error = errorMsg[response.status] || 'Error: ' + response.status + ' ' + response.statusText;
      }
      var o = options || {};
      angular.extend(o, {
        template: error,
        duration: 1000
      });
      $ionicLoading.show(o);
      return callback && callback();
    };
   };

   // login action callback
   var loginCallback = function(response) {
     $ionicLoading.hide();
     $scope.loginname = response.loginname;
     $rootScope.getMessageCount();
   };

   $scope.onHoldLogin = function() {
       $scope.processing = true;
       if(window.cordova && window.cordova.plugins.clipboard) {
         cordova.plugins.clipboard.paste(function (text) {
           $scope.processing = false;
           if (text) {
             $log.log('get Access Token', text);
             $ionicLoading.show();
             User.login(text).$promise.then(loginCallback, $rootScope.requestErrorHandler());
           } else {
             $ionicLoading.show({
               noBackdrop: true,
               template: '粘贴板无内容',
               duration: 1000
             });
           }
         });

         // track event
         if (window.analytics) {
           window.analytics.trackEvent('User', 'clipboard login');
         }
       } else {
         $log.debug('no clipboad plugin');
       }
     };

   $scope.login = function() {
   if ($scope.processing) {
     return;
   }
   if(window.cordova && window.cordova.plugins.barcodeScanner) {
     var loginPrompt = $ionicPopup.show({
       template: 'PC端登录cnodejs.org后，扫描设置页面的Access Token二维码即可完成登录',
       title: '扫码登录',
       scope: $scope,
       buttons: [
         {
           text: '<b>我知道了</b>',
           type: 'button-positive',
           onTap: function(e) {
             e.preventDefault();
             loginPrompt.close();
             dologin();
           }
         }
       ]
     });
   } else {
     // auto login if in debug mode
     if (ENV.debug) {
       $ionicLoading.show();
       User.login(ENV.accessToken).$promise.then(loginCallback, $rootScope.requestErrorHandler());
     } else {
       $scope.data = {};
       // show login popup if no barcodeScanner in pc browser
       var loginPopup = $ionicPopup.show({
         template: '<input type="text" ng-model="data.token">',
         title: '输入Access Token',
         subTitle: 'PC端登录IonicChina后，在设置页可以找到Access Token',
         scope: $scope,
         buttons: [
           { text: '取消' },
           {
             text: '<b>提交</b>',
             type: 'button-positive',
             onTap: function(e) {
               e.preventDefault();
               if ($scope.data.token) {
                 User.login($scope.data.token).$promise.then(function(response) {
                   loginPopup.close();
                   loginCallback(response);
                 }, $rootScope.requestErrorHandler());
               }
             }
           }
         ]
       });
     }
   }
 };

 var dologin = function() {
   $scope.processing = true;
   $timeout(function() {
     $scope.processing = false;
   }, 500);
   cordova.plugins.barcodeScanner.scan(
     function (result) {
       $scope.processing = false;
       if (!result.cancelled) {
         $log.log('get Access Token', result.text);
         $ionicLoading.show();
         User.login(result.text).$promise.then(loginCallback, $rootScope.requestErrorHandler());
       }
     },
     function (error) {
       $scope.processing = false;
       $ionicLoading.show({
         noBackdrop: true,
         template: 'Scanning failed: ' + error,
         duration: 1000
       });
     }
   );

   // track event
   if (window.analytics) {
     window.analytics.trackEvent('User', 'scan login');
   }
 };
});
