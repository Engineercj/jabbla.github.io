/**
 * Created by zxr on 2016/4/5.
 */
function XMLasynchronous(method,route,data,callback){
    //URL参数构造函数
    function addURLParam(url,name,value){
        url += (url.indexOf("?") == -1? "?":"&");
        url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
        return url;
    }
    var xhr = new XMLHttpRequest();
    if(method=='get'){
        var url = route;
        for(str in data){
            url = addURLParam(url,str,data[str]);
        }
        xhr.open('get',url,true);
        xhr.send(null);
        xhr.onreadystatechange = function(){
            if(xhr.readyState===4){
                var err = 0;
                if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
                    err = false;
                    callback(err,xhr.responseText);
                }
                else{
                    err = true;
                    callback(err,xhr.status);
                }
            }
        }
    }
    if(method=='post'){
        var formData = new FormData();
        for(str in data){
            formData.append(str,data[str]);
        }
        xhr.open('post',route,true);
        xhr.send(formData);
        xhr.onreadystatechange = function(){
            if(xhr.readyState===4){
                var err = 0;
                if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
                    err = false;
                    callback(err,xhr.responseText);
                }else{
                    err = true;
                    callback(err,xhr.status);
                }
            }
        }
    }
}