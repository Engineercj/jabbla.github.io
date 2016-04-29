/**
 * Created by zxr on 2016/4/28.
 */
var ImagesAgent = (function(){
    var ImageStack = [];
    //添加窗口滚动事件
    window.addEventListener('scroll',function(){
        ImagesAgent.load();
    },false);
    //判断是否在可视区,如在则加载
    function judgeLoad(){
        for(var i = ImageStack.length-1,item;item=ImageStack[i--];){
            console.log(item.dom.offsetTop+' '+document.documentElement.clientHeight+' '+document.bodyScrollTop());
            if(parseInt(item.dom.offsetTop)<=parseInt((document.documentElement.clientHeight+document.bodyScrollTop()))){
                item.dom.addImage(item.img,item.src);
                ImageStack.splice(ImageStack.indexOf(item),1);
            }
        }
    }
    return {
        //添加到图片栈
        addImage:function(dom,img,src){
            var oImg = {};
            oImg.dom = dom;
            oImg.img = img;
            oImg.src = src;
            ImageStack.push(oImg);
        },
        //加载接口
        load:function(){
            judgeLoad();
            console.log(ImageStack.length)
        }
    }
})();