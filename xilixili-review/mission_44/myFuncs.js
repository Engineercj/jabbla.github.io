/**
 * Created by zxr on 2016/4/28.
 */
/*批量添加子元素节点*/
Object.prototype.addChilds = function(){
    if(arguments[0] instanceof Array){
        for(var j=0,item1;item1 = arguments[0][j++];){
            this.appendChild(item1);
        }
    }else{
        for(var i=0,item;item = arguments[i++];){
            this.appendChild(item);
        }
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

console.log(document.body.scrollTop);

/*图片代理函数*/
Object.prototype.addImage = function(image,src){
    var me = this,
        temp = new Image();

    image.src = 'loading.gif.';
    updateStyles(image,{
        width:'16px',height:'16px',left:'50%',top:'50%',transform:'translate(-50%,-50%)'
    })
    this.addChilds(image);

    temp.src = src;
    temp.onload = function(){
        updateStyles(image,{
            width:'100%',height:'100%'
        })
        image.src = src;
    }
}