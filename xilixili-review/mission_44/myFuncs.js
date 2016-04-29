/**
 * Created by zxr on 2016/4/28.
 */
/*批量添加子元素节点*/
 function addChilds(dom,arr){
    if(arguments[1] instanceof Array){
        for(var j=0,item1;item1 = arguments[1][j++];){
            arguments[0].appendChild(item1);
        }
    }else{
        arguments[0].appendChild(arguments[1]);
    }
}
/*创建节点的简化写法*/
function createDom(str){

    return document.createElement(str);
}
/*创建image元素,并赋src*/
function createImage(src){
    var img = new Image();
    img.src = src;
    return img;
}
/*类数组元素中每一项,执行相同函数*/
function doSameWork(arr,fn){
    for(var i=0,item;item = arr[i++];){
        fn(item,i-1);
    }
}
/*针对图片剪切操作,将图片中心位置在套子中展示*/
function showINcenter(img,target){
    return {
        left:-(img.width-target.width)*0.5,
        top:-(img.height-target.height)*0.5
    }
}
/*多个元素设置相同的样式及不同*/
function updateSameProperties(array,obj,diff){
    var first = arguments[0],
        second = arguments[1];
    first.forEach(function(item){
        for(str in second){
            item.style[str] = obj[str];
        }
    });
    if(arguments.length===3){

        diff.forEach(function(item1,index,arr){
            for(str1 in item1){
                first[index].style[str1] = item1[str1];
            }
        });
    }
}
/*设置单个元素的样式*/
function updateStyles(dom,obj){
    for(str in obj){
        dom.style[str] = obj[str];
    }
}
/*随机生成任意两个数之间的数，包括两头*/
function randomNum(left,right){
    var step1 = Math.random()*(right+1-left),
        step2 = step1+left;

    if(left===right){
        return left;
    }
    return Math.floor(step2);
}
/*判断是否含有父元素*/
function hasRoot(ele,root){
    while(ele.parentNode!==undefined){
        if(ele===root){
            return true;
        }
        ele = ele.parentNode;
    }
    return false
}
/*兼容火狐和chormebody的scrollTop写法*/
function bodyScrollTop(){
    if(document.body.scrollTop===0){
        return document.documentElement.scrollTop
    }else{
        return document.body.scrollTop
    }
}
/*将类数组元素中的每一项添加进数组*/
function putInarray(arr,arry){
    for(var i=0,item;item = arr[i++];){
        arry.push(item);
    }
}
/*图片代理函数*/
function addImage(dom,image,src){
    var temp = new Image();
    image.src = 'loading.gif';
    updateStyles(image,{
        width:'16px',height:'16px',left:'50%',top:'50%',transform:'translate(-50%,-50%)',position:'absolute'
    })
    addChilds(dom,image);
    temp.src = src;
    temp.onload = function(){
        updateStyles(image,{width:'100%',transform:'',height:'100%',position:''});
        updateStyles(dom,{width:'100%',height:''});
        image.src = src;
    }
}
/*在数组中找出指定规则的最小值*/
function findMin(arr,value){
    var min = arr[0];
    if(!value){
        for(var i=1;i<arr.length;i++){
            if(parseInt(min)>parseInt(arr[i])){
                min = arr[i];
            }
        }
    }else{
        for(var j=1,item1;item1 = arr[j++];){
            if(parseInt(min[value])>parseInt(item1[value])){
                min = item1;
            }
        }
    }
    return min;
}
/*在数组中找出指定规则的最大值*/
function findMax(arr,value){
    var max = arr[0];
    if(!value){
        for(var i=1;i<arr.length;i++){
            if(max<arr[i]){
                max = arr[i];
            }
        }
    }else{
        for(var j=1,item1;item1 = arr[j++];){
            if(max[value]>item1[value]){
                max = item1;
            }
        }
    }
    return max;
}

