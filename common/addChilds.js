/**
 * Created by zxr on 2016/4/27.
 */
Object.prototype.addChilds = function(){
    for(var i=0,item;item = arguments[i++];){
        this.appendChild(item);
    }
}