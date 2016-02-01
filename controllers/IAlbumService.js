'use strict';
require('date-utils');
var AlbumModel = require('../database/UserModel').AlbumModel;
var PhotoModel = require('../database/UserModel').PhotoModel;

exports.addPhotoToAlbumGet = function(args, res, next) {
  /**
   * parameters expected in the args:
   * albumId (String)
   * photoName (String)
   * photoUrl (String)
   **/
  var albumId = args.albumId.value;
  var photoName = args.photoName.value;
  var photoUrl = args.photoUrl.value;

  var photo = new PhotoModel();
  photo.albumId = albumId;
  photo.name = photoName;
  photo.desc = photoName;
  photo.url = photoUrl;
  photo.created = new Date();
  photo.modified = new Date();

  photo.save(function(err2, newItem) {
    if (err2) {
      res.end();
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(newItem, null, 2));
    }
  });
}
exports.albumByIdGet = function(args, res, next) {
  /**
   * parameters expected in the args:
   * albumId (String)
   **/
var albumId = args.albumId.value;
  UserModel.findById(albumId, function(err, doc) {
    if (err) {
      res.end();
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(doc, null, 2));
  }
  });
  
}

exports.allAlbumsGet = function(args, res, next) {
  /**
   * parameters expected in the args:
   * userId (String)
   **/
var userId = args.userId.value;
AlbumModel.find({userId:userId}, function(err, doc){
  if (err) {
      res.end();
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(doc, null, 2));
  }
});
}

exports.createAlbumGet = function(args, res, next) {
  /**
   * parameters expected in the args:
   * userId (String)
   * albumName (String)
   * albumDesc (String)
   * cover (String)
   **/
var userId = args.userId.value;
var albumName = args.albumName.value;
var albumDesc = args.albumDesc.value;
var cover = args.cover.value;

var album = new AlbumModel();
album.name = albumName;
album.desc = albumDesc;
album.cover = cover;
album.userId = userId;
album.created = new Date();
album.modified = new Date();

 album.save(function(err2, newItem) {
                    if (err2) {
                        res.end();
                    } else {
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify(newItem, null, 2));
                    }
                }); 
}

exports.photosInAlbumGet = function(args, res, next) {
  /**
   * parameters expected in the args:
   * albumId (String)
   **/
var albumId = args.albumId.value;
  PhotoModel.find({albumId:albumId}, function(err, doc){
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(doc, null, 2));
  });
}
