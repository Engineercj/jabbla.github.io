/**
 * Created by zxr on 2016/4/28.
 */
var fallsLayout = function(){
    var instance;
    function waterFalls(num,cols,margin){
        this.element = createDom('div');
        this.arrH = ['200px','250px','120px','300px'];//4种高度
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
        //生成套子
        this.generateWraper();
        //生成黑色遮罩
        this.generateBlack();
        //添加点击事件
        this.addEvent();



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
        document.body.addChilds(this.element);

        var $cols = document.querySelectorAll('.falls-cols');
        LayoutStack.putInarray($cols);
    }
    waterFalls.prototype.generateWraper = function(){
        var LayoutStack = this.layouts;
        var WraperStack = this.wrapers;
        var colsBet = this.colsBet;
        var marginBet = this.marginBet;
        var num = this.num;
        var arrH = this.arrH;

        //计算总长度
        var sumLong = 0;
        arrH.forEach(function(item){
            sumLong += parseInt(item)
        })
        //构建总长度栈
        var times = parseInt(num/colsBet);
        var SumStack = [];
        for(var j=0;j<times;j++){
            SumStack = SumStack.concat(arrH);
        }
        sumLong = times*sumLong;
        for(var i=0;i<(num%colsBet);i++){
            sumLong += parseInt(arrH[i]);
            SumStack.push(arrH[i]);
        }
        //平均值
        var average = parseInt(sumLong/colsBet);
        //循环布局块
        LayoutStack.forEach(function(item,index){
            var sum = parseInt(SumStack[0]);
            if(index!==(LayoutStack.length-1)){
                while(sum<=average){
                    var $wraper = createDom('div');
                    $wraper.className = 'falls-wraper';
                    updateStyles($wraper,{
                        height: SumStack[0],marginBottom:marginBet+'px', lineHeight:SumStack[0]
                    })
                    item.addChilds($wraper);
                    WraperStack.push($wraper);
                    SumStack.shift();
                    sum +=parseInt(SumStack[0]);
                }
                sum -=parseInt(SumStack[0]);
                var dis = average-sum;
                //在剩余的块中寻找比dis小的
                for(var t=0,it,max=0,maxIndex=0;it = parseInt(SumStack[t++]);){
                    if(it<=dis){
                        if(max<it){
                            max = it;
                            maxIndex = t-1;
                        }
                    }
                }
                //找到
                if(max!==0){
                    var $wraper = createDom('div');
                    $wraper.className = 'falls-wraper';
                    updateStyles($wraper,{
                        height: max+'px',marginBottom:marginBet+'px',
                        lineHeight:max+'px',cursor:'pointer'
                    })
                    item.addChilds($wraper);
                    WraperStack.push($wraper);
                    SumStack.splice(maxIndex,1);
                }
            }else{
                SumStack.forEach(function(item1){
                    var $wraper = createDom('div');
                    $wraper.className = 'falls-wraper';
                    updateStyles($wraper,{
                        height: item1,marginBottom:marginBet+'px',
                        lineHeight:item1
                    });
                    WraperStack.push($wraper);
                    item.addChilds($wraper);
                });
            }
        });
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
        document.body.addChilds($blackWraper);
    }
    waterFalls.prototype.addImage = function(imgs){
        var WraperStack = this.wrapers;
        //创建图像
        imgs.forEach(function(item,index){
            var img = new Image();
            updateStyles(img,{
                width:'100%',height:'100%',position:'absolute',left:0,top:0
            })
            ImagesAgent.addImage(WraperStack[index],img,item);
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
            instance.addImage(imgs);
        }
    }
}