var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/floyd');//；连接数据库
var Schema = mongoose.Schema;
var albumSchema = new Schema({
	userId: {type: Schema.Types.ObjectId, ref: 'users'},
    name: String,
    desc: String,
    cover: String,
    created: {type:Date, default:Date.now},
    modified: {type:Date, default:Date.now}
});
exports.AlbumModel = db.model('album', albumSchema); 