/**
 * Created by zxr on 2016/4/4.
 */
var mongoose = require('mongoose');
var linkSchema = require('../schemas/linkSchema');
var link = mongoose.model('link',linkSchema);

module.exports = link;