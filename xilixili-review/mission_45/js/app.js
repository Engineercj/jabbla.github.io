/**
 * Created by zxr on 2016/4/30.
 */
var WoodBucket = (function(){
    var instance;
    
    return {
        init:function(obj){
            if(instance) return instance.wraper;
            instance = new woodBucket(obj);
            instance.init();
            return instance.wraper;
        },
        addImages:function(imgs){
            instance.addImages(imgs);
            
        }
    }
})()

