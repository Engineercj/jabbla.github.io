/**
 * Created by zxr on 2016/4/1.
 */
var mongoose = require('mongoose');
var articleSchema = require('../schemas/articleSchema');
var article = mongoose.model('Article',articleSchema);


module.exports = article;