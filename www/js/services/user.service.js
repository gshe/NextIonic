'user strict';

angular.module('starter.services')
.factory('User', function(ENV, $log, $resource, $q, ENV, Storage) {
  var api = ENV.domain + ENV.api;
  var storageKey = 'user';
  var tokenResouce = $resource(api + '/accesstoken');
  var userResource = $resource(api + '/user/:loginname', {loginname:''});
  var curUser = Storage.get(storageKey) || {};

  return {
    login: function(accessToken){
       var $this = this;
       return tokenResouce.save({accesstoken:accessToken}, null, function(response){
         curUser.accesstoken = accessToken;
         $this.get(response.loginname).$promise.then(function(r){
          curUser = r.data;
           curUser.userId = response.userid;
           curUser.accesstoken = accessToken;
           Storage.set(storageKey, curUser);
         });
         curUser.loginname = response.loginname;
       });
    },

    logout: function(){
      curUser = {};
      Storage.remove(storageKey);
    },

    getCurrentUser:function(){
      return curUser;
    },

    getByLoginName:function(loginName){
      if (curUser && curUser.loginname === loginName){
        var userDefer = $q.defer();
        userDefer.resolve({
          data:curUser
        });
        return {
          $promise: userDefer.promise
        };
      }
      return this.get(loginName);
    },

    get:function(loginName){
      return userResource.get({loginname:loginName}, function(response){
        $log.debug('get user info from server', response);
        if (curUser && curUser.loginname === loginName){
          angular.extend(curUser, response.data);
          Storage.set(storageKey, curUser);
        }
      });
    }
  };
});
