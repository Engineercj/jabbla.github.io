window.onload = function(){
    var oCommentBtn = document.getElementById('comment-btn'),
        oUsername = document.getElementById('username'),
        oComment  = document.getElementById('comment'),
        aReply = document.getElementsByClassName('reply-btn'),
        oEmail = document.getElementById('email'),
        query = getQueryStringArgs();
    //留言发布按钮
    oCommentBtn.onclick = function(){

        XMLasynchronous('get','/addComment',{username:oUsername.value,email:oEmail.value,comment:oComment.value,title:query.title},function(err,resText){
            if(err){
                console.log(err);
            }else{
                if(resText=='1'){
                    alert('留言成功');
                    location.reload(true);
                }
            }
        });
    }
    //留言回复按钮

    for(var i=0;i<aReply.length;i++){

        aReply[i].onclick = function(){

            var input = this.parentNode.parentNode.getElementsByClassName('input')[0],
                oSubmit = input.getElementsByClassName('submit')[0];
            input.style.display = 'block';

            oSubmit.onclick = function(){
                //发布按扭事件
              var oText = input.getElementsByClassName('reply')[0],
                    flag = input.parentNode.parentNode.getAttribute('data-flag'),
                    text = oText.value,
                    title = query.title,
                    data = {title:title,flag:flag,comment:text};
                XMLasynchronous('get','/reply',data,function(err,resText){
                    if(err){
                        alert('通信错误');
                    }else{
                        alert(resText);
                        location.reload(true);
                    }
                });
            }
        }
    }

    //将地址栏中的查询字符串格式化
    function getQueryStringArgs(){
        var str = (location.search.length>0)? location.search.slice(1):'',
            item = str.length ? str.split('&'):[],
            args = {};

        //对每个项分解
        item.forEach(function(item1,index,array){
            var temp = item1.split('='),
                name = decodeURIComponent(temp[0]),
                value = decodeURIComponent(temp[1]);
            args[name] = value;
        });
        return args;
    }
};