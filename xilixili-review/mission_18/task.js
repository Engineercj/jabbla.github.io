/**
 * Created by zxr on 2016/3/29.
 */
var queArray = [],
    oLeftin = document.getElementById('left-in'),
    oRightin = document.getElementById('right-in'),
    oLeftout = document.getElementById('left-out'),
    oRightout = document.getElementById('right-out');
//根据queArray[]渲染DOM
function renderQue(){
    var oQueue = document.getElementById('queue'),
        innerHTML = '';
    queArray.forEach(function(item,index,array){
        innerHTML += '<li>'+item+'</li>';
    });
    oQueue.innerHTML = innerHTML;
}
//初始化左侧入添加事件处理函数
function leftIn(){
    var oNumarea = document.getElementById('num-area');
    queArray.unshift(oNumarea.value);
    renderQue();
}
//初始化右侧入添加事件处理函数
function rightIn(){
    var oNumarea = document.getElementById('num-area');
    queArray.push(oNumarea.value);
    renderQue();
}
//初始化右侧出添加事件处理函数
function rightOut(){
    var oNumarea = document.getElementById('num-area');
    queArray.pop(oNumarea.value);
    renderQue();
}
//初始化左侧出添加事件处理函数
function leftOut(){
    var oNumarea = document.getElementById('num-area');
    queArray.shift(oNumarea.value);
    renderQue();
}
//给按钮们添加事件
function addEvent(){
    oLeftin.onclick = leftIn;
    oRightin.onclick = rightIn;
    oRightout.onclick = rightOut;
    oLeftout.onclick = leftOut;
}
function init(){
    addEvent();
    console.log(queArray);
}
init();