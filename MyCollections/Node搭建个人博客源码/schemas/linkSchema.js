/**
 * Created by zxr on 2016/4/4.
 */
var mongoose = require('mongoose');
var linkSchema = new mongoose.Schema({
    title:String,
    link_adr:String,
    category:Array
});

module.exports = linkSchema;