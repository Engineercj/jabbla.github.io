/**
 * Created by zxr on 2016/4/28.
 */
var waterfall = function(){
    var instance;
    var EnallScreen,flag;

    function waterFalls(){
        this.element = createDom('div');
        this.marginBet = 16;
        this.colsBet = 4;
        this.num = 8;
        this.layouts = [];
        this.wrapers = [];
    }
    waterFalls.prototype.init = function(width,height,options){
        this.colsBet = options? options.cols: 4;
        //初始化最外层
        this.element.className = 'falls';
        updateStyles(this.element,{paddingTop:this.marginBet+'px',paddingLeft: this.marginBet+'px',width:width,height:height});
        //创建布局
        this.generateLayout();
    }
    waterFalls.prototype.generateLayout = function(){
        var html = '';
        var percent = (1/this.colsBet)*100;
        var marginBet = this.marginBet;
        var LayoutStack = this.layouts;

        for(var i=0;i<this.colsBet;i++){
            html += '<div class="falls-cols" style="width:'+percent+'%;float:left;padding-right:'+marginBet+'px;"></div>';
        }

        this.element.innerHTML = html;
        addChilds(document.body,this.element);
        var $cols = document.querySelectorAll('.falls-cols');
        putInarray($cols,LayoutStack);
    }
    waterFalls.prototype.addImage = function(imgs){
        var WraperStack = this.wrapers;
        var self = this;
        //创建图像
        imgs.forEach(function(item,index){
            var img = new Image();
            img.addEventListener('click',function(){
                EnallScreen.pop(this);
            },false);
            var wraper = createDom('div');
            wraper.className = 'falls-wraper';
            //设置套子和图片属性
            updateStyles(wraper,{
                width:'100%',position:'relative',height:'200px',
                marginBottom:self.marginBet+'px'
            });
            updateStyles(img,{width:'100%',display:'block'});
            WraperStack.push(wraper);
            //寻找最短的列插入
            addChilds(self.findShortest(),wraper);
            ImagesAgent.addImage(wraper,img,item);
        });
    }
    waterFalls.prototype.findShortest = function(){
        return findMin(this.layouts,'clientHeight');
    }
    return {
        init:function(width,height,options){
            //改变
            instance.init(width,height,options);
        },
        //添加图片
        setImage:function(imgs){
            //添加图片，生成套子
            instance.addImage(imgs);
            //第一屏加载
            ImagesAgent.load();
        },
        getDom:function(){
            instance = new waterFalls();
            return instance.element;
        },
        setGutter:function(x,y){
            
            var oFalls = document.querySelector('.falls');
            var aCols = document.querySelectorAll('.falls-cols');
            var aWrapers = document.querySelectorAll('.falls-wraper');

            updateStyles(oFalls,{paddingTop:y+'px',paddingLeft:x+'px'});
            updateSameProperties(Array.prototype.slice.call(aCols,0),{paddingRight:x+'px'});
            updateSameProperties(Array.prototype.slice.call(aWrapers,0),{marginBottom:y+'px'});
            
        },
        enableFullscreen:function(){
            EnallScreen = allScreen();
            flag = true;
        },
        disableFullscreen:function(){
            EnallScreen.disable();
            flag = false;
        },
        isFullscreenEnabled:function(){
            return flag;
        }
    }
}