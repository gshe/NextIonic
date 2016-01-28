/**
 * Created by admin on 16/1/25.
 */

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/floyd');//；连接数据库
var Schema = mongoose.Schema;
var userSchema = new Schema({
    name: String,
    birthday: String,
    weiboId : String,
    weiboToken : String,
    created: {type:Date, default:Date.now},
    modified: {type:Date, default:Date.now}
});
exports.UserModel = db.model('users', userSchema); //  与users集合关联