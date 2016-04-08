(function(){
    var oCommentBtn = document.getElementById('comment-btn'),
        oUsername = document.getElementById('username'),
        oEmail = document.getElementById('email');
    
    oCommentBtn.onclick = function(){

        XMLasynchronous('get','/addComment',{username:oUsername.value,eamil:oEmail.value},function(err,resText){
            if(err){
                alert('通信出错');
            }else{
                console.log(resText);
            }
        });
    }
})();