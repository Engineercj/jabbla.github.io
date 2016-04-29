/**
 * Created by zxr on 2016/4/28.
 */
var fallsLayout = function(){
    var instance;
    function waterFalls(num,cols,margin){
        this.element = createDom('div');
        this.marginBet = margin || 16;
        this.colsBet = cols || 4;
        this.num = num || 8;
        this.layouts = [];
        this.wrapers = [];
        this.$blackWraper = createDom('div');//黑色遮罩
        this.onShow = {dom:null,style:{position:'relative',top:0,left:0,zIndex:1,transform:''}};
    }
    waterFalls.prototype.init = function(){
        //初始化最外层
        this.element.className = 'falls';
        updateStyles(this.element,{paddingTop:this.marginBet+'px',paddingLeft: this.marginBet+'px'});
        //创建布局
        this.generateLayout();
        //生成黑色遮罩
        this.generateBlack();
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
    waterFalls.prototype.generateBlack = function(){
        var $blackWraper = this.$blackWraper;
        var self = this;
        $blackWraper.className = 'falls-blackWraper';
        $blackWraper.addEventListener('click',function(e){
            if(e.target===$blackWraper){
                updateStyles(this,{display:'none'});
                updateStyles(document.body,{overflow:'auto'});
                //元素状态重置
                updateStyles(self.onShow.dom,self.onShow.style);
                self.onShow.dom = null;
            }
        },false);
        addChilds(document.body,$blackWraper);
    }
    waterFalls.prototype.addImage = function(imgs){
        var WraperStack = this.wrapers;
        var self = this;
        //创建图像
        imgs.forEach(function(item,index){
            var img = new Image();
            var wraper = createDom('div');
            wraper.className = 'falls-wraper';
            //设置套子和图片属性
            updateStyles(wraper,{
                width:'100%',position:'relative',marginRight:self.marginBet+'px',height:'200px',
                marginBottom:self.marginBet+'px'
            });
            updateStyles(img,{width:'100%',display:'block'});
            WraperStack.push(wraper);
            //寻找最短的列插入
            addChilds(self.findShortest(),wraper);
            ImagesAgent.addImage(wraper,img,item);
        });
    }
    waterFalls.prototype.addEvent = function(){
        var WraperStack = this.wrapers;
        var $blackWraper = this.$blackWraper;
        var onShow = this.onShow;
        //套子点击事件
        WraperStack.forEach(function(item){
            item.addEventListener('click',showIncenter,false);
        });
        function showIncenter(){
            if(onShow.dom===this){
                return
            }
            //黑色透明遮罩显示
            updateStyles($blackWraper,{display:'block',position:'fixed'});
            //计算合适尺寸需要数据
            var itemScale = this.clientWidth/this.clientHeight;
            var tempW = $blackWraper.clientWidth-300,tempH =$blackWraper.clientHeight-100;
            var tempWc = tempW/itemScale,tempHc = tempH*itemScale;
            var use;

            //计算出合适尺寸
            use = tempWc>tempH? {width:tempHc,height:tempH}:{width:tempW,height:tempWc};
            //储存当前尺寸
            onShow.style.width = this.clientWidth+'px';
            onShow.style.height = this.clientHeight+'px';
            //图片在中间显示，改变尺寸
            updateStyles(this,{
                position:'fixed',left:'50%',top:'50%',width:use.width+'px',height:use.height+'px',
                transform:'translate(-50%,-50%)',zIndex:'100'
            })
            //设置当前DOM
            onShow.dom = this;
        }
    }
    waterFalls.prototype.findShortest = function(){
        return findMin(this.layouts,'clientHeight');
    }
    return {
        init:function(cols,margin,Blocknum){
            //改变
            if(instance){
                return instance.element
            }
            instance = new waterFalls(Blocknum,cols,margin);
            instance.init();
            return instance.element;
        },
        //添加图片
        add:function(imgs){
            //添加图片，生成套子
            instance.addImage(imgs);
            //添加事件
            instance.addEvent();
            //第一屏加载
            ImagesAgent.load();
        }
    }
}