// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'angularMoment', 'starter.controllers', 'starter.config'])

    .run(function ($ionicPlatform, amMoment, $log) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
            if (window.cordova) {
                window.InAppBrowser = window.cordova.InAppBrowser;
            } else {
                window.InAppBrowser = {
                    open: function (url, target, params) {
                        window.open(url);
                    }
                };
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider, $logProvider, ENV) {
        $logProvider.debugEnabled(ENV.debug);
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })
            .state('app.message', {
                url: '/my/message',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/message.html',
                        controller: 'MessageCtrl'
                    }
                }
            })
            .state('app.user', {
                url: '/user/:loginname',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/user.html',
                        controller: 'UserCtrl'
                    }
                }
            })
            .state('app.topics', {
                url: '/topics/:tab',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/topics.html',
                        controller: 'TopicsCtrl'
                    }
                }
            })
            .state('app.topic', {
                url: '/topic/:id',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/topic.html',
                        controller: 'TopicCtrl'
                    }
                }
            })
            .state('app.setting', {
                url: '/setting',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/setting.html',
                        controller: 'SettingCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/topics/all');
    });

angular.module('starter.controllers', ['starter.services']);

angular.module('starter.services', ['ngResource', 'starter.config']);
