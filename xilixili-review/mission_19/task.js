/**
 * Created by zxr on 2016/3/29.
 */
var queArray = [30,20,15,85,80,97,90,35,76,78,45,46,28,34],
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
        toIndex = new Array(aLi.length);
    for(var u=0;u<toIndex.length;u++){
        toIndex[u] = u;
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
                toIndex[j+1] = toIndex[j];
                toIndex[j] = temp1;
                start++;

            }
        }

    }
    //给每个过程设置延时定时器
    function doSetTime(flag){
        setTimeout(function(){
            aLi[process[flag][0]].style.backgroundColor = 'black';
            aLi[process[flag][0]].style.color = 'white';
            aLi[process[flag][0]].style.left = aLi[process[flag][0]].nowLeft +30+'px';
            aLi[process[flag][0]].nowLeft += 30;
            aLi[process[flag][1]].style.left = aLi[process[flag][1]].nowLeft -30+'px';
            aLi[process[flag][1]].nowLeft -= 30;
            setTimeout(function(){
                /*//如后面的交换都没次元素则上色
                var count = 0,
                    length = 0;
                for(str1 in process){
                    if(str1.valueOf()>flag.valueOf()){
                        if(process[str1].indexOf(process[flag][0])===undefined){
                            count++;
                        }else{
                            console.log(str1+'你丫是谁'+flag);
                        }
                        length++;
                    }
                }
                if(count==length){
                    aLi[process[flag][0]].style.backgroundColor = 'black';
                    aLi[process[flag][0]].style.color = 'white';
                    console.log(flag+'上色');
                }
                else{*/
                    console.log(flag);
                    aLi[process[flag][0]].style.backgroundColor = 'red';
                    aLi[process[flag][0]].style.color = 'black';
               /* }*/

            },500)

        },flag*1000);
    }
    for(str in process){
        doSetTime(str);
    }
    console.log(process);
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