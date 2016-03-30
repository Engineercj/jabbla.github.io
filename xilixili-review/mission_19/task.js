/**
 * Created by zxr on 2016/3/29.
 */
var queArray = [30,20,15,85,80,97],
    state,
    oLeftin = document.getElementById('left-in'),
    oRightin = document.getElementById('right-in'),
    oLeftout = document.getElementById('left-out'),
    oNumarea = document.getElementById('num-area'),
    oSort = document.getElementById('sort'),
    oRightout = document.getElementById('right-out');
//根据queArray[]渲染DOM
function renderQue(){
    var oQueue = document.getElementById('queue');
        oQueue.innerHTML = '';
    queArray.forEach(function(item,index,array){
        var oLi = document.createElement('li');
        oLi.style.bottom = (5*item-500)+'px';
        oLi.style.left = index*30 +'px';
        oLi.nowLeft = index*30;
        oLi.innerHTML = item;
        oQueue.appendChild(oLi);
    });
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
    oLeftout.disabled = false;
    oRightout.disabled = false;
    oSort.disabled = false;
    return state;
}
//冒泡可视化
function sortView(){
    var oQueue = document.getElementById('queue'),
        aLi = oQueue.getElementsByTagName('li'),
        toIndex = new Array(aLi.length),
        aTimer =  new Array(aLi.length);
    for(var u=0;u<toIndex.length;u++){
        toIndex[u] = u;
        aTimer[u] = {};
    }
    var process = {},
        start = 0;
    for(var i=queArray.length-1;i>0;i--){
        for(var j=0;j<i;j++){
            if(queArray[j]>queArray[j+1]){
                var temp = queArray[j+1],
                    temp1 = toIndex[j+1];
                queArray[j+1] = queArray[j];
                queArray[j] = temp;
                process[start] = new Array();
                process[start][0] = toIndex[j];
                process[start][1] = toIndex[j+1];
                /*console.log(toIndex[j]+' '+toIndex[j+1]);
                console.log(Lis[toIndex[j]].offsetLeft);
                Lis[toIndex[j]].style.left = Lis[toIndex[j]].nowLeft+30+'px';
                Lis[toIndex[j]].nowLeft += 30;
                Lis[toIndex[j+1]].style.left = Lis[toIndex[j+1]].nowLeft-30+'px';
                Lis[toIndex[j+1]].nowLeft -= 30;*/
                toIndex[j+1] = toIndex[j];
                toIndex[j] = temp1;
                start++;

            }
        }

    }
    function doSetTime(flag){
        setTimeout(function(){
            aLi[process[flag][0]].backgroundColor = 'black';
            aLi[process[flag][0]].color = 'white';
            aLi[process[flag][0]].style.left = aLi[process[flag][0]].nowLeft +30+'px';
            aLi[process[flag][0]].nowLeft += 30;
            aLi[process[flag][1]].style.left = aLi[process[flag][1]].nowLeft -30+'px';
            aLi[process[flag][1]].nowLeft -= 30;
            aLi[process[flag][0]].backgroundColor = 'red';
            aLi[process[flag][0]].color = 'black';
        },flag*1000);
    }
    for(str in process){
        doSetTime(str);
    }
}
//给按钮们添加事件
function addEvent(){
    oLeftin.onclick = leftIn;
    oRightin.onclick = rightIn;
    oRightout.onclick = rightOut;
    oLeftout.onclick = leftOut;
    oNumarea.onblur = textOnblur;
    oSort.onclick = sortView;
    btnToogle(true);
}
function init(){
    addEvent();

}
init();