'use strict';

angular.module('starter.services')
.factory('Setting', function(ENV, $log, Storage) {
  var storageKey = 'settings';
  var settings = Storage.get(storageKey) || {
    sendFrom: false,
    saverMode: true
  };
  return {
    getSettings: function() {
      $log.debug('get settings', settings);
      return settings;
    },
    save: function() {
      Storage.set(storageKey, settings);
    }
  };
});
