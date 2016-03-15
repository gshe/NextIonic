angular.module('starter.controllers')

    .controller('SettingCtrl', function ($scope, $stateParams, $log, ENV, Test) {
        $scope.ENV = ENV;
        $log.debug(Test.getIndex());
        $log.debug(Test.getIndex());
        // mail feedback
        var feedbackMailAddr = 'szq30202@163.com';
        var feedbackMailSubject = 'IonicChina社区 Feedback v' + ENV.version;
        var device = ionic.Platform.device();
        var feedbackMailBody = device.platform + ' ' + device.version + ' | ' + device.model;
        $scope.feedback = function () {
            if (window.cordova && window.cordova.plugins.email) {
                window.cordova.plugins.email.open({
                    to: feedbackMailAddr,
                    subject: feedbackMailSubject,
                    body: feedbackMailBody
                });
            } else {
                window.open('mailto:' + feedbackMailAddr + '?subject=' + feedbackMailSubject);
            }
        };
    });
