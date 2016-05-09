/**
 * Created by zxr on 2016/4/1.
 */
(function(){
    //table的事件处理函数
    function tableHandler(e){
        var oBtn = e.target;
        //如果是更新按钮被点击
        if(oBtn.name==='update'){
            var oUpdate = document.getElementById('update-btn'),
                oPost = document.getElementById('post-btn');

            oPost.disabled = true;
            oUpdate.disabled = false;
            //定义异步请求对象
            var title = oBtn.parentNode.parentNode.childNodes[0].innerHTML;
            XMLasynchronous('get','/admin/query',{title:title},function(err,rdata){
                var data = JSON.parse(rdata);
                //获取左边区域表单中的元素
                var oHideId = document.getElementById('hide-id'),
                    oTitle = document.getElementById('title'),
                    oSnap = document.getElementById('snap'),
                    oFiles = document.getElementById('files'),
                    aCgy = oFiles.getElementsByClassName('category'),
                    oContent = document.getElementById('form-content');

                    //给这些元素填上获取到的对象值
                    oHideId.value = data._id;
                    oTitle.value = data.title;
                    oContent.value = data.content;
                    oSnap.value = data.snap;
                    for(var i=0;i<aCgy.length;i++){
                        data.category.forEach(function(item,index,array){
                            if(item===aCgy[i].value){
                                aCgy[i].checked = true;
                            }
                        });
                    }
                    oContent.value = data.content;
            });
        }
        //如果删除按钮被点击
        else if(oBtn.name==='delete'){
            if(!confirm("你确定要删除这篇文章吗？？")){
                return;
            }
            var title = oBtn.parentNode.parentNode.childNodes[0].innerHTML;
            //发送异步请求
            XMLasynchronous('get','/admin/del',{title:title},function(err,rdata){
                if(rdata=='1'){
                    oBtn.parentNode.parentNode.parentNode.removeChild(oBtn.parentNode.parentNode);
                }else if(rdata=='-1'){
                    console.log('数据库出现错误');
                }else if(rdata=='0'){
                    console.log('数据库中无此数据');
                }
            });
        }
    }
    //给元素们添加事件
    function addEvents(){
        var oPost = document.getElementById('post-btn'),
            oUpdate = document.getElementById('update-btn'),
            oFlag = document.getElementById('flag'),
            oTable = document.getElementById('list'),
            oFiles = document.getElementById('files-admin'),
            oLinkList = document.getElementsByClassName('list-table')[0],
            oLinks = document.getElementById('links-admin');
        //分别给管理切换按钮添加事件
        var $oFiles = $(oFiles),
            $oLinks = $(oLinks);
        
        $oFiles.click(function(){
            $('#files').fadeIn();
            $('#links').fadeOut();
        });
        $oLinks.click(function(){
            $('#files').fadeOut();
            $('#links').fadeIn();
        });
        //给link提交按钮添加事件
        $('#link-btn').click(function(){
            var oLinks = document.getElementById('links'),
                oLtitle = document.getElementById('link_title'),
                oLadr = document.getElementById('link_adr'),
                aCgy = oLinks.getElementsByClassName('category'),
                cgy = [];

            for(var i=0;i<aCgy.length;i++){
                if(aCgy[i].checked==true){
                    cgy.push(aCgy[i].value);
                }
            }
            //发送异步请求
            XMLasynchronous('get','/admin/links',{title:oLtitle.value,link_adr:oLadr.value,category:cgy},function(err,rdata){
                var oList = oLinks.getElementsByClassName('list-table')[0];
                var data = JSON.parse(rdata);
                var innerHTML = oList.innerHTML;
                innerHTML += '<tr><td>'+data.title+'</td><td><button type="button" class="btn btn-link">删除</button></td></tr>';
                oList.innerHTML = innerHTML;
            });
        });
        //给link删除按钮添加事件
        oLinkList.onclick = function(e){
          if(e.target.innerHTML=='删除'){
              if(!confirm("你确定要删除这个mark链接吗？？")){
                  return;
              }
              var title = e.target.parentNode.parentNode.childNodes[0].innerHTML;
              //发送异步请求
              XMLasynchronous('get','/admin/del/link',{title:title},function(err,rdata){
                  if(rdata=='1'){
                      e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
                  }else if(rdata=='-1'){
                      console.log('数据库出现错误');
                  }else if(rdata=='0'){
                      console.log('数据库中无此数据');
                  }
              });
          }
        };
        //给table添加数据处理函数
        oTable.onclick = function(e){
          tableHandler(e);
        };
        //确定是更新操作还是添加操作
        oPost.onclick = function(){
            if(confirm('你是否检查好要录入的数据？否则取消')){
                oFlag.value = 'post';
            }else{
                return false;
            }
        };
        oUpdate.disabled = true;
        oUpdate.onclick = function(){
            if(confirm('你是否检查好要更新的数据？否则取消')){
                oFlag.value = 'update';
            }else{
                return false;
            }
        };
    }
    //初始化函数
    function init(){
        addEvents();
    }

    init();

})();
//oTable的点击事件处理函数

