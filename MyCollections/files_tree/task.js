/**
 * Created by zxr on 2016/4/3.
 */
var preNodes = [],
    clickedNodes = [],
    oSearch = document.getElementById('search');
//清空元素栈中的颜色
function clearColor(flag){
    if(flag==='clicked'){
        if(clickedNodes.length!==0){
            clickedNodes[0].style.backgroundColor = 'transparent';
            clickedNodes[0].style.color = 'black';
            clickedNodes.pop();
        }
    }else if(flag==='pre'){
        //清空前面选中元素的颜色
        if(preNodes.length!==0){
            preNodes.forEach(function(item,index,array){
                item.style.color = 'black';
            });
            for(var i=0,length = preNodes.length;i<length;i++){
                preNodes.pop();
            }
        }
    }

}
//将当前节点中的文本和目标文本比较
function compareValue(node,value){
    if(value!==''){
        //遍历该节点中的文本节点，进行对比
        for(var u=0;u<node.childNodes.length;u++){
            if(node.childNodes[u].nodeType==3){
                if(node.childNodes[u].nodeValue.trim().search(value)>=0){
                    preNodes.push(node);
                    return;
                }
            }
        }
    }
}
//中序查询文件
function firstCenter(value,node){
    //得到该结点
    compareValue(node,value);
    //取得元素子节点
    node.childElementNodes = [];
    for(var i=0;i<node.childNodes.length;i++){
        if(node.childNodes[i].nodeType==1){
            node.childElementNodes.push(node.childNodes[i]);
        }
    }
    if(node.childElementNodes.length===0){
        return;
    }
    //循环遍历所有子树
    for(var j=0;j<node.childElementNodes.length;j++){
        firstCenter(value,node.childElementNodes[j]);
    }

}
//给找到的结点上色
function putColor(){
    if(preNodes.length!==0){
        for(var i=0;i<preNodes.length;i++){
            preNodes[i].style.color = "red";
        }
    }

}

//按钮添加事件
function addEvent(){
    var aToogleBtn = document.getElementsByClassName('toogle-btn'),
        oCenter = document.getElementById('first-center'),
        oHead = document.getElementsByClassName('container')[0];
    //给toogleBtn添加事件
    for(var i=0;i<aToogleBtn.length;i++){
        aToogleBtn[i].onclick = function(){
            toogleBtn.call(this);
        }
    }
    //给中序查询添加事件
    oCenter.onclick = function(){
        clearColor('pre');
        var pattern = new RegExp(oSearch.value)
        firstCenter(pattern,oHead);
        if(preNodes.length!==0){
            preNodes.forEach(function(item,index,array){
                var temp =  item;
                //将找到元素所在的所有文件夹展开
                while(temp.parentNode.className!=='container'){
                    if(temp.parentNode.tagName=='UL'){
                        temp = temp.parentNode;
                    }
                    temp.parentNode.className = 'unfold  icon-folder-open-alt';
                    temp = temp.parentNode;
                }

            });
        }
        putColor()
    }
    //给最外层元素添加事件托管函数
    oHead.onclick = function(e){
        outterHandler(e);
    }
}
//展开，收缩按钮事件处理函数
function toogleBtn(){
    var currentList = this.parentNode;
    console.log(currentList.className.search(/fold/));
    if(currentList.className.search(/^fold/)>=0){
        currentList.className = 'unfold  icon-folder-open-alt';
    }else{
        currentList.className = 'fold  icon-folder-close-alt';
    }
}
//事件托管函数
function outterHandler(e){
    clearColor('clicked');
    e.target.style.backgroundColor = 'blue';
    e.target.style.color = 'white';
    clickedNodes.push(e.target);
    //给删除按钮添加事件
    var oDel = document.getElementById('delete');
    oDel.onclick = function(){
        if(confirm("确定要删除此节点和其后代元素吗？")){
            if(e.target.parentNode.tagName==='LI'){
                e.target.parentNode.parentNode.removeChild(e.target.parentNode);
            }else{
                e.target.parentNode.removeChild(e.target);
            }
        }
    }
    //给添加按钮添加事件
    var oAdd = document.getElementById('add'),
        oAddtext = document.getElementById('add-text');
    oAdd.onclick = function(){
        if(confirm("确定要将此内容添加到选定元素中吗")){
            var temp = document.createElement('a');
            temp.innerHTML = oAddtext.value;
            temp.className = 'file icon-file-alt';
            e.target.nextElementSibling.appendChild(temp);
        }
    }
}

//初始化函数
function init(){
    var aLi = document.getElementsByTagName('li');
    for(var i=0;i<aLi.length;i++){
        aLi[i].className = 'fold  icon-folder-close-alt';
    }
    addEvent();
}
init();