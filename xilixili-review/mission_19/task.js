/**
 * Created by zxr on 2016/3/29.
 */
var queArray = [],
    state,
    oLeftin = document.getElementById('left-in'),
    oRightin = document.getElementById('right-in'),
    oLeftout = document.getElementById('left-out'),
    oNumarea = document.getElementById('num-area'),
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
    if(!test()){
        return;
    }
    queArray.unshift(oNumarea.value);
    renderQue();

}
//初始化右侧入添加事件处理函数
function rightIn(){
    if(!test()){
        return;
    }
    queArray.push(oNumarea.value);
    renderQue();

}
//初始化右侧出添加事件处理函数
function rightOut(){
    queArray.pop(oNumarea.value);
    renderQue();
    test();
}
//初始化左侧出添加事件处理函数
function leftOut(){
    queArray.shift(oNumarea.value);
    renderQue();
    test();
}

//所有的按钮初始状态切换
function btnToogle(boolean){
    var aBtn = document.getElementsByTagName('button');
    for(var i=0;i<aBtn.length;i++){
        aBtn[i].disabled = boolean;
    }
}
//文本框onblur处理函数
function textOnblur(){
    if(!test()){
        return;
    }
}
//检测输入文本的范围
function numRangeConfig(){
        switch(this.value<=100&&this.value>=10){
            case true : return true;break;
            case false: alert('确保您输入的范围在10~100');return false;break;
        }
}

//检测队列中数字的数量
function numNumsConfig(){
    if(!(queArray.length<=60)){
        alert('队列已满，请出');
    }
    return (queArray.length<=60);
}
//检测集成
function test(){
    var numsState = numNumsConfig(),
        rangeState = numRangeConfig.call(oNumarea);

    state = (numsState&&rangeState);
    btnToogle(!state);
    if(!numsState){
        oLeftout.disabled = false;
        oRightout.disabled = false;
    }
    return state;
}
//给按钮们添加事件
function addEvent(){
    oLeftin.onclick = leftIn;
    oRightin.onclick = rightIn;
    oRightout.onclick = rightOut;
    oLeftout.onclick = leftOut;
    oNumarea.onblur = textOnblur;
    btnToogle(true);
}
function init(){
    addEvent();
    console.log(queArray);
}
init();