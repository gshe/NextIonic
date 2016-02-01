'use strict';

var url = require('url');


var ICustomer = require('./ICustomerService');


module.exports.associateUserWithWeiboIdGet = function associateUserWithWeiboIdGet (req, res, next) {
  ICustomer.associateUserWithWeiboIdGet(req.swagger.params, res, next);
};

module.exports.updateUserAvatarGet = function updateUserAvatarGet (req, res, next) {
  ICustomer.updateUserAvatarGet(req.swagger.params, res, next);
};

module.exports.updateUserBirthdayGet = function updateUserBirthdayGet (req, res, next) {
  ICustomer.updateUserBirthdayGet(req.swagger.params, res, next);
};

module.exports.updateUserNameGet = function updateUserNameGet (req, res, next) {
  ICustomer.updateUserNameGet(req.swagger.params, res, next);
};

module.exports.userByIdGet = function userByIdGet (req, res, next) {
  ICustomer.userByIdGet(req.swagger.params, res, next);
};

module.exports.userByWeiboIdGet = function userByWeiboIdGet (req, res, next) {
  ICustomer.userByWeiboIdGet(req.swagger.params, res, next);
};
