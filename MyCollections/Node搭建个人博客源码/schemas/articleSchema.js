/**
 * Created by zxr on 2016/4/1.
 */
var mongoose = require('mongoose');
var articleSchema = new mongoose.Schema({
    title:String,
    author:String,
    head:String,
    snap:String,
    content:String,
    category:Array,
    time:String,
    comments:Array,
    comments_count:Number
});
articleSchema.pre('save',function(next){
    this.time = new Date().toDateString();
    this.comments_count++;
    next();
});
articleSchema.pre('update',function(next){
    this.time = new Date().toDateString();
    next();
});
articleSchema.statics = {
    fetch:function(cb){
        return this
            .find({})
            .sort('meta,updateAt')
            exec(cb);
    },
    findById:function(id,cb){
        return this
            .findOne({_id:id})
            exec(cb)
    }
};
module.exports = articleSchema;