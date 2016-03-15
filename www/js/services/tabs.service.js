'use strict';

/**
 * @ngdoc function
 * @name cnodejs.services:TabsService
 * @description
 * # TabsService
 * Tabs Service of the cnodejs app
 */

angular.module('starter.services')
.factory('Tabs', function() {
  return [
    {
      value: 'all',
      label: '最新',
      image: 'ion-home'
    },
    {
      value: 'share',
      label: '分享',
      image: 'ion-share'
    },
    {
      value: 'ask',
      label: '问答',
      image: 'ion-help'
    },
    {
      value: 'job',
      label: '招聘',
      image: 'ion-coffee'
    },
    {
      value: undefined,
      label: '其他'
    }
  ];
});
