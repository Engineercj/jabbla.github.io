/**
 * Created by zxr on 2016/4/26.
 */
function updateStyles(dom,obj){
    for(str in obj){
        dom.style[str] = obj[str];
    }
}