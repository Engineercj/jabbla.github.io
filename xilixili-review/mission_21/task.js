/**
 * Created by zxr on 2016/3/31.
 */

var queArray = [],
    loveArray = [],
    loveIndex = 0,
    state,
    start = 0,
    pattern = new RegExp(" +|\\.+|,+|，+|`+|·+|\\n+|、+","g"),
    oTagarea = document.getElementById('tag-area'),
    oQue = document.getElementById('queue'),
    oLove = document.getElementById('love-area'),
    Love = document.getElementById('love'),
    aLo = Love.getElementsByTagName('li'),
    oConfirm = document.getElementById('confirm-btn'),
    aLi = oQue.getElementsByTagName('li');
//根据queArray[]渲染DOM
function  renderQue(){
    var oQueue = document.getElementById('queue'),
        innerHTML = '';
    queArray.forEach(function(item,index,array){
        innerHTML += '<li data-content='+'点击删除'+item+'>'+item+'</li>';
    });
    oQueue.innerHTML = innerHTML;
}


//text-area数据处理函数
function shiftToArray(str){
    var array = str.split(pattern);
    return array;
}
//tagArea事件处理函数
function tagInput(){
    start = pattern.lastIndex;
    var test = this.value.slice(start);
    if(test.search(pattern)>=0){
        pattern.exec(this.value);
        var str = test.replace(/ */g,'').trim();
        if(str===''){
            return
        }
        queArray = queArray.filter(function(item,index,array){
            return (item!==str);
        });
        queArray.push(str);
        if(queArray.length>10){
            queArray.shift()
        }
        renderQue();
    }
}
//给Tag列表添加托管事件
function deleteTag(e){
    for(var i=0;i<aLi.length;i++){
        if(aLi[i]===e.target){
            queArray.splice(i,1);
        }
    }
    renderQue();
}
//给Love列表添加托管事件
function deleteLove(e){
    console.log('a');
    for(var i=0;i<aLo.length;i++){
        if(aLo[i]===e.target){
            loveArray.splice(i,1);
        }
    }
    renderLove();
}
//给兴趣爱好按钮添加事件处理函数
function confirmBtn(){
    var temp = shiftToArray(oLove.value.trim());
    var temp1= temp.filter(function(item ,index,array){
        var boolean = loveArray.every(function(item1,index1,array1){
            return item1!== item;
        });
        return boolean&&(item!=='');
    });
    temp1 = temp1.filter(function(item,index,array){
        var boolean1 = true;
        temp1.forEach(function(item1,index1,array1){
            if(index1>index&&item===item1){
                boolean1 = false;
            }
        });
        return boolean1;
    });
    loveArray = loveArray.concat(temp1);
    renderLove();
}
//渲染兴趣爱好DOM
function renderLove(){

    var innerHTML = '';
    loveArray.forEach(function(item,index,array){
        innerHTML += '<li data-content='+'点击删除'+item+'>'+item+'</li>';
    });
    Love.innerHTML = innerHTML;
}
//给按钮们添加事件
function addEvent(){
    oTagarea.oninput = tagInput;
    oQue.onclick = function(e){
        deleteTag(e);
    }
    Love.onclick = function(e){
        deleteLove(e);
    }
    oConfirm.onclick = confirmBtn;
}
function init(){
    addEvent();
}
init();