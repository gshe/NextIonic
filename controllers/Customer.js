'use strict';

var url = require('url');


var Customer = require('./CustomerService');


module.exports.associateUserWithWeiboIdGet = function associateUserWithWeiboIdGet (req, res, next) {
  Customer.associateUserWithWeiboIdGet(req.swagger.params, res, next);
};

module.exports.updateUserAvatarGet = function updateUserAvatarGet (req, res, next) {
  Customer.updateUserAvatarGet(req.swagger.params, res, next);
};

module.exports.updateUserBirthdayGet = function updateUserBirthdayGet (req, res, next) {
  Customer.updateUserBirthdayGet(req.swagger.params, res, next);
};

module.exports.updateUserNameGet = function updateUserNameGet (req, res, next) {
  Customer.updateUserNameGet(req.swagger.params, res, next);
};

module.exports.userByIdGet = function userByIdGet (req, res, next) {
  Customer.userByIdGet(req.swagger.params, res, next);
};

module.exports.userByWeiboIdGet = function userByWeiboIdGet (req, res, next) {
  Customer.userByWeiboIdGet(req.swagger.params, res, next);
};
