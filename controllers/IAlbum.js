'use strict';

var url = require('url');


var IAlbum = require('./IAlbumService');


module.exports.addPhotoToAlbumGet = function addPhotoToAlbumGet (req, res, next) {
  IAlbum.addPhotoToAlbumGet(req.swagger.params, res, next);
};

module.exports.albumByIdGet = function albumByIdGet (req, res, next) {
  IAlbum.albumByIdGet(req.swagger.params, res, next);
};

module.exports.allAlbumsGet = function allAlbumsGet (req, res, next) {
  IAlbum.allAlbumsGet(req.swagger.params, res, next);
};

module.exports.createAlbumGet = function createAlbumGet (req, res, next) {
  IAlbum.createAlbumGet(req.swagger.params, res, next);
};

module.exports.photosInAlbumGet = function photosInAlbumGet (req, res, next) {
  IAlbum.photosInAlbumGet(req.swagger.params, res, next);
};
