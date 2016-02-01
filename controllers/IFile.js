'use strict';

var url = require('url');


var IFile = require('./IFileService');


module.exports.uploadTokenGet = function uploadTokenGet (req, res, next) {
  IFile.uploadTokenGet(req.swagger.params, res, next);
};
