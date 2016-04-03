/**
 * Created by zxr on 2016/4/3.
 */


//中序遍历
var count = 0;


function firstCenter(node){
    count++;
    //得到该结点
    setTimeout(function(){
        node.style.backgroundColor = 'blue';
    },count*1000);
    setTimeout(function(){
        node.style.backgroundColor = 'white';
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
    //遍历其左树
    firstCenter(node.childElementNodes[0]);
    //遍历其右树
    firstCenter(node.childElementNodes[1]);
}
//前序遍历
function firstLeft(node){
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
    //遍历其左树
    firstLeft(node.childElementNodes[0]);
    //遍历其右树
    firstLeft(node.childElementNodes[1]);
    //得到该结点
    count++;
    setTimeout(function(){
        node.style.backgroundColor = 'blue';
    },count*1000);
    setTimeout(function(){
        node.style.backgroundColor = 'white';
    },count*1000+1000);

    if(node.childElementNodes.length===0){
        return;
    }
}
//后序遍历
function firstRight(node){
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
    //遍历其右树
    firstRight(node.childElementNodes[1]);
    //遍历其左树
    firstRight(node.childElementNodes[0]);
    //得到该结点
    count++;
    setTimeout(function(){
        node.style.backgroundColor = 'blue';
    },count*1000);
    setTimeout(function(){
        node.style.backgroundColor = 'white';
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
        oHead = document.getElementsByClassName('outter')[0];

    oCenter.onclick = function(){
        oRight.disabled = true;
        oLeft.disabled = true;
        count = 0;
        firstCenter(oHead);
        setTimeout(function(){
            oRight.disabled = false;
            oLeft.disabled = false;
        },count*1000+1000);
    };
    oLeft.onclick = function(){
        oCenter.disabled = true;
        oRight.disabled = true;
        count = 0;
        firstLeft(oHead);
        setTimeout(function(){
            oCenter.disabled = false;
            oRight.disabled = false;
        },count*1000+1000);
    };
    oRight.onclick = function(){
        oLeft.disabled = true;
        oCenter.disabled = true;
        count = 0;
        firstRight(oHead);
        setTimeout(function(){
            oLeft.disabled = false;
            oCenter.disabled = false;
        },count*1000+1000);
    }
}
//初始化函数
function init(){
    addEvent();
}
init();