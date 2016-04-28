/**
 * Created by zxr on 2016/4/27.
 */
Object.prototype.addChilds = function(){
    if(arguments[0] instanceof Array){
        for(var j=0,item1;item1 = arguments[0][j++];){
            this.appendChild(item1);
        }
    }else{
        for(var i=0,item;item = arguments[i++];){
            this.appendChild(item);
        }
    }


}