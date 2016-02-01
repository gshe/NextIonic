var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/floyd');//；连接数据库
var Schema = mongoose.Schema;
var photoSchema = new Schema({
	albumId: {type: Schema.Types.ObjectId, ref: 'album'},
    name: String,
    desc: String,
    url: String,
    created: {type:Date, default:Date.now},
    modified: {type:Date, default:Date.now}
});
exports.PhotoModel = db.model('photo', photoSchema); 