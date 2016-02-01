/**
 * Created by admin on 16/1/25.
 */

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/floyd');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    name: String,
    birthday: String,
    weiboId: String,
    weiboToken: String,
    avatarKey: String,
    avatarHash: String,
    created: {type:Date, default:Date.now},
    modified: {type:Date, default:Date.now}
});
var albumSchema = new Schema({
	userId: {type: Schema.Types.ObjectId, ref: 'users'},
    name: String,
    desc: String,
    cover: String,
    created: {type:Date, default:Date.now},
    modified: {type:Date, default:Date.now}
});
var photoSchema = new Schema({
	albumId: {type: Schema.Types.ObjectId, ref: 'album'},
    name: String,
    desc: String,
    url: String,
    created: {type:Date, default:Date.now},
    modified: {type:Date, default:Date.now}
});
exports.PhotoModel = db.model('photo', photoSchema); 
exports.AlbumModel = db.model('album', albumSchema); 
exports.UserModel = db.model('users', userSchema); //  与users集合关联