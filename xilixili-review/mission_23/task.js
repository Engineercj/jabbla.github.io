/**
 * Created by zxr on 2016/4/3.
 */


//中序遍历
var count = 0,
    find = 0,
    preNode = [];


function firstCenter(value,node){
    count++;
    //得到该结点
    setTimeout(function(){
        node.style.backgroundColor = 'blue';
    },count*1000);
    setTimeout(function(){
        node.style.backgroundColor = 'white';
        //遍历该节点中的文本节点，进行对比
        for(var u=0;u<node.childNodes.length;u++){
            if(node.childNodes[u].nodeType==3){
                if(value===node.childNodes[u].nodeValue.trim()){
                    find++;
                    node.style.backgroundColor = 'blue';
                    preNode.push(node);
                    return;
                }
            }
        }
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
        //遍历该节点中的文本节点，进行对比
        for(var u=0;u<node.childNodes.length;u++){
            if(node.childNodes[u].nodeType==3){
                if(value===node.childNodes[u].nodeValue.trim()){
                    find++;
                    node.style.backgroundColor = 'blue';
                    preNode.push(node);
                    return;
                }
            }
        }
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
        //遍历该节点中的文本节点，进行对比
        for(var u=0;u<node.childNodes.length;u++){
            if(node.childNodes[u].nodeType==3){
                if(value===node.childNodes[u].nodeValue.trim()){
                    find++;
                    node.style.backgroundColor = 'blue';
                    preNode.push(node);
                    return;
                }
            }
        }
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
        oHead = document.getElementsByClassName('outter')[0];

    oCenter.onclick = function(){
        oRight.disabled = true;
        oLeft.disabled = true;
        count = 0;
        find = 0;
        if(preNode.length!==0){
            preNode.forEach(function(item,index,array){
                item.style.backgroundColor = 'white';
            });
        }
        firstCenter(oSearch.value,oHead);
        setTimeout(function(){
            oRight.disabled = false;
            oLeft.disabled = false;
            alert("找到了"+find+'个');
        },count*1000+1000);
    };
    oLeft.onclick = function(){
        oCenter.disabled = true;
        oRight.disabled = true;
        count = 0;
        find = 0;
        if(preNode.length!==0){
            preNode.forEach(function(item,index,array){
                item.style.backgroundColor = 'white';
            });
        }
        firstLeft(oSearch.value,oHead);
        setTimeout(function(){
            oCenter.disabled = false;
            oRight.disabled = false;
            alert("找到了"+find+'个');
        },count*1000+1000);
    };
    oRight.onclick = function(){
        oLeft.disabled = true;
        oCenter.disabled = true;
        count = 0;
        find = 0;
        if(preNode.length!==0){
            preNode.forEach(function(item,index,array){
                item.style.backgroundColor = 'white';
            });
        }
        firstRight(oSearch.value,oHead);
        setTimeout(function(){
            oLeft.disabled = false;
            oCenter.disabled = false;
            alert("找到了"+find+'个');
        },count*1000+1000);
    }
}
//初始化函数
function init(){
    addEvent();
}
init();