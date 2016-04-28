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

