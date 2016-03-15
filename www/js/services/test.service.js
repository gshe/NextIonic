/**
 * Created by admin on 16/3/15.
 */
angular.module('starter.services')
    .factory('Test', function ($log, ENV, Storage) {
        var name = "";
        var sKey = "testKey";
        return {
            getIndex: function () {
                var index = Storage.get(sKey) || 0;
                index += 10;
                Storage.set(sKey, index);
                return index;
            },
            getName: function () {
                return this.name;
            },
            setName: function (name) {
                this.name = name;
                Storage.set(sKey, this.name);
            }

        };
    });