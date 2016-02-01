'use strict';
var qiniu = require('qiniu');

qiniu.conf.ACCESS_KEY = 'yps2KL8Q_8AZ-d7AM7hZ8k738tbGVq0fdMyMhIJs'
qiniu.conf.SECRET_KEY = 'gBgljhFlhCNqijSORY6LyjRYwZgwWAQyxpLsnRsn'

exports.uploadTokenGet = function(args, res, next) {
  /**
   * parameters expected in the args:
   **/

  var putPolicy = new qiniu.rs.PutPolicy("floyd");
  var token = putPolicy.token();
  var ret = {"token":token};

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(ret, null, 2));
}
