/**
 * Created by zxr on 2016/3/31.
 */

var queArray = [],
    state,
    oLeftin = document.getElementById('left-in'),
    oRightin = document.getElementById('right-in'),
    oLeftout = document.getElementById('left-out'),
    oTextarea = document.getElementById('text-area'),
    oSearch = document.getElementById('search'),
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
    var array = shiftToArray(oTextarea.value);
   // var queArray = array.reverse().concat(queArray);
    queArray = array.reverse().concat(queArray);
    console.log(queArray);
    test();
    renderQue();

}
//初始化右侧入添加事件处理函数
function rightIn(){
    var array = shiftToArray(oTextarea.value);
    queArray = queArray.concat(array);
    test();
    renderQue();

}
//初始化右侧出添加事件处理函数
function rightOut(){
    queArray.pop();
    test();
    renderQue();
}
//初始化左侧出添加事件处理函数
function leftOut(){
    queArray.shift();
    test();
    renderQue();
}

//所有的按钮初始状态切换
function btnToogle(boolean){
    var aBtn = document.getElementsByTagName('button');
    for(var i=0;i<aBtn.length;i++){
        aBtn[i].disabled = boolean;
    }

}

//检测集成
function test(){
    if(queArray.length==0){
        state = false;
    }else{
        state = true;
    }
    btnToogle(!state);
    oLeftin.disabled = false;
    oRightin.disabled = false;
    return state;
}
//text-area数据处理函数
function shiftToArray(str){
    var array = str.split(/ +|\.+|,+|，+|`+|·+|\n+|、+/);
    return array;
}
//查询按钮事件处理函数
function search(){
    var oQueue = document.getElementById('queue'),
        oText = document.getElementById('search-text'),
        aLi = oQueue.getElementsByTagName('li'),
        patternStr = oText.value,
        pattern = new RegExp(patternStr);
    for(var i=0;i<aLi.length;i++){
        aLi[i].style.backgroundColor = 'red';
        aLi[i].style.color = 'black';
    }
    queArray.forEach(function(item,index,array){
        if(item.search(pattern)>=0){
            aLi[index].style.backgroundColor = 'green';
            aLi[index].style.color = 'white';
        }
    });
}
//给按钮们添加事件
function addEvent(){
    oLeftin.onclick = leftIn;
    oRightin.onclick = rightIn;
    oRightout.onclick = rightOut;
    oLeftout.onclick = leftOut;
    oSearch.onclick = search;
    btnToogle(true);
    test();
}
function init(){
    addEvent();
}
init();