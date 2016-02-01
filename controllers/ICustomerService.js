'use strict';
require('date-utils');

var UserModel = require('../database/UserModel').UserModel;
exports.associateUserWithWeiboIdGet = function(args, res, next) {
  /**
   * parameters expected in the args:
   * wbUserId (String)
   **/

  var wbUserId = args.wbUserId.value;
    UserModel.findOne({weiboId:wbUserId}, function(err, doc){
        if (err){
            res.end();
        }else{
            if (doc){
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(doc, null, 2));
            }else{
               var user = new UserModel();
                user.weiboId = wbUserId;
                user.created = new Date();
                user.modified = new Date();
                user.save(function(err2, newItem) {
                    if (err2) {
                        res.end();
                    } else {
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify(newItem, null, 2));
                    }
                });
            }
        }
    });
}
exports.updateUserBirthdayGet = function(args, res, next) {
  /**
   * parameters expected in the args:
   * userId (String)
   * userBirthday (String)
   **/

    var userId = args.userId.value;
    var userBirthday = {birthday:args.userBirthday.value, modified:new Date()};
    UserModel.findByIdAndUpdate(userId, userBirthday, function(err, doc){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(doc, null, 2));
    });
}

exports.updateUserNameGet = function(args, res, next) {
  /**
   * parameters expected in the args:
   * userId (String)
   * userName (String)
   **/
   var userId = args.userId.value;
    var userName = {name:args.userName.value, modified:new Date()};
    UserModel.findByIdAndUpdate(userId, userName, function(err, doc){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(doc, null, 2));
    });
}
exports.userByIdGet = function(args, res, next) {
  /**
   * parameters expected in the args:
   * userId (String)
   **/
  var userId = args.userId.value;
  UserModel.findById(userId, function(err, doc) {
    if (err) {
      res.end();
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(doc, null, 2));
  }
  });
}
exports.userByWeiboIdGet = function(args, res, next) {
  /**
   * parameters expected in the args:
   * wbUserId (String)
   **/
  var wbUserId = args.wbUserId.value;
  UserModel.findOne({weiboId:wbUserId}, function(err, doc){
    if (err){
        res.end();
    }else{
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(doc, null, 2));
    }
  });
}

exports.updateUserAvatarGet = function(args, res, next) {
    /**
     * parameters expected in the args:
     * userId (String)
     * avatarKey (String)
     * avatarHash (String)
     **/
    var userId = args.userId.value;
    var avatar = {avatarKey:args.avatarKey.value, avatarHash:args.avatarHash.value, modified:new Date()};

    UserModel.findByIdAndUpdate(userId, avatar, function(err, doc){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(doc, null, 2));
    });
}