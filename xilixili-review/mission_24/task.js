/**
 * Created by zxr on 2016/4/3.
 */


//中序遍历
var count = 0,
    find = 0,
    preNodes = [],
    oSearch = document.getElementById('search');
//清空元素栈中的颜色
function clearPreColor(){
    //清空前面选中元素的颜色
    if(preNodes.length!==0){
        preNodes.forEach(function(item,index,array){
            item.style.backgroundColor = 'white';
        });
        for(var i=0,length = preNodes.length;i<length;i++){
            preNodes.pop();
        }
    }
}
//将当前按钮以外的按钮切换状态
function otherBtnStateToogle(current,flag){
    var aButton = document.getElementsByTagName('button');
    for(var i=0;i<aButton.length;i++){
        if(current!==aButton[i]){
            switch (flag){
                case 'start':aButton[i].disabled = true;break;
                case 'end':aButton[i].disabled = false;break;
            }

        }
    }
}
//将当前节点中的文本和目标文本比较
function compareValue(node,value){
    if(oSearch.value!==''){
        //遍历该节点中的文本节点，进行对比
        for(var u=0;u<node.childNodes.length;u++){
            if(node.childNodes[u].nodeType==3){
                if(value===node.childNodes[u].nodeValue.trim()){
                    find++;
                    node.style.backgroundColor = 'blue';
                    preNodes.push(node);
                    return;
                }
            }
        }
    }
}
function firstCenter(value,node){
    count++;
    //得到该结点
    setTimeout(function(){
        node.style.backgroundColor = 'blue';
    },count*1000);
    setTimeout(function(){
        node.style.backgroundColor = 'white';
        compareValue(node,value);
    },count*1000+1000);
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
//前序遍历
function firstLeft(value,node){
    //取得元素子节点
    if(node==undefined){
        return;
    }
    node.childElementNodes = [];
    for(var i=0;i<node.childNodes.length;i++){
        if(node.childNodes[i].nodeType==1){
            node.childElementNodes.push(node.childNodes[i]);
        }
    }
    for(var j=0;j<node.childElementNodes.length;j++){
        firstLeft(value,node.childElementNodes[j]);
    }
    //得到该结点
    count++;
    setTimeout(function(){
        node.style.backgroundColor = 'blue';
    },count*1000);
    setTimeout(function(){
        node.style.backgroundColor = 'white';
        compareValue(node,value);
    },count*1000+1000);

    if(node.childElementNodes.length===0){
        return;
    }
}
//后序遍历
function firstRight(value,node){
    //取得元素子节点
    if(node==undefined){
        return;
    }
    node.childElementNodes = [];
    for(var i=0;i<node.childNodes.length;i++){
        if(node.childNodes[i].nodeType==1){
            node.childElementNodes.push(node.childNodes[i]);
        }
    }
    for(var j=node.childElementNodes.length-1;j>=0;j--){
        firstRight(value,node.childElementNodes[j]);
    }
    //得到该结点
    count++;
    setTimeout(function(){
        node.style.backgroundColor = 'blue';
    },count*1000);
    setTimeout(function(){
        node.style.backgroundColor = 'white';
        compareValue(node,value);
    },count*1000+1000);
    if(node.childElementNodes.length===0){
        return;
    }
}

//按钮添加事件
function addEvent(){
    var oCenter = document.getElementById('first-center'),
        oLeft = document.getElementById('first-left'),
        oRight = document.getElementById('first-right'),
        oSearch = document.getElementById('search'),
        oDel = document.getElementById('delete'),
        oAdd = document.getElementById('add'),
        oHead = document.getElementsByClassName('outter')[0];

    oCenter.onclick = function(){
        otherBtnStateToogle(this,'start');
        count = 0;
        find = 0;
        clearPreColor();
        firstCenter(oSearch.value,oHead);
        setTimeout(function(){
            otherBtnStateToogle(oCenter,'end');
            alert("找到了"+find+'个');
        },count*1000+1000);
    };
    oLeft.onclick = function(){
        otherBtnStateToogle(this,'start');
        count = 0;
        find = 0;
        clearPreColor();
        firstLeft(oSearch.value,oHead);
        setTimeout(function(){
            otherBtnStateToogle(oLeft,'end');
            alert("找到了"+find+'个');
        },count*1000+1000);
    };
    oRight.onclick = function(){
        otherBtnStateToogle(this,'start');
        count = 0;
        find = 0;
        clearPreColor();
        firstRight(oSearch.value,oHead);
        setTimeout(function(){
            otherBtnStateToogle(oRight,'end');
            alert("找到了"+find+'个');
        },count*1000+1000);
    }

    //给最外层元素添加事件托管函数
    oHead.onclick = function(e){
        outterHandler(e);
    }
}
//事件托管函数
function outterHandler(e){
    clearPreColor()
    //将选中颜色的元素推入prenodes
    e.target.style.backgroundColor = 'blue';
    preNodes.push(e.target);
    //给删除按钮添加事件
    var oDel = document.getElementById('delete');
    oDel.onclick = function(){
        if(confirm("确定要删除此节点和其后代元素吗？")){
            e.target.parentNode.removeChild(e.target);
        }
    }
    //给添加按钮添加事件
    var oAdd = document.getElementById('add'),
        oAddtext = document.getElementById('add-text');
    oAdd.onclick = function(){
        if(confirm("确定要将此内容添加到选定元素中吗")){
            var temp = document.createElement('div');
            temp.innerHTML = oAddtext.value;
            e.target.appendChild(temp);
        }
    }
}

//初始化函数
function init(){
    addEvent();
}
init();