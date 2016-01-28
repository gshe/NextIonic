'use strict';

var url = require('url');


var File = require('./FileService');


module.exports.uploadTokenGet = function uploadTokenGet (req, res, next) {
  File.uploadTokenGet(req.swagger.params, res, next);
};
