/**
 * Created by zxr on 2016/4/2.
 */
(function(){
    var aReadAll = document.getElementsByClassName('readAll');
    for(var i=0;i<aReadAll.length;i++){
        aReadAll[i].onclick = readAllhandler();
    }
    console.log(title);
    //阅读全文的事件处理函数
    function readAllhandler(){
        var title = this.parentNode.parentNode.childNodes[0].childNodes[0].innerHTML;

        console.log(title);
    }
})();