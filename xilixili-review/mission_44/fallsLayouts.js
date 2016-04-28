/**
 * Created by zxr on 2016/4/28.
 */
var fallsLayout = function(){
    var dom = createDom('div'),
        marginBet = 16,
        colsBet = 4,
        num = 8,
        arrH = ['200px','250px','120px','300px'],//4种高度
        LayoutStack = [],
        WraperStack = [];

    //生成布局
    function generateLayout(){
        //循环列数生成基本布局
        for(var i=0;i<colsBet;i++){
            var col = createDom('div');
            updateStyles(col,{
                width:(1/colsBet)*100+'%',float:'left',paddingRight:marginBet+'px'
            });
            LayoutStack.push(col);
        }
        dom.addChilds(LayoutStack);
    }
    //根据用户传入数量生成套子,保持各列尽量长度接近
    function generateWraper(){
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
        console.log(SumStack.length);
        //平均值
        var average = parseInt(sumLong/colsBet);
        console.log(average);
        //循环布局块
        var counter = 1;
        LayoutStack.forEach(function(item,index){
            var sum = parseInt(SumStack[0]);
            if(index!==(LayoutStack.length-1)){
               while(sum<=average){
                   var wraper = createDom('div');
                   updateStyles(wraper,{
                       width:'100%',height: SumStack[0],position:'relative',backgroundColor:'#D8D8D8',marginBottom:marginBet+'px',
                       textAlign:'center',lineHeight:SumStack[0]
                   })
                    item.addChilds(wraper);
                   WraperStack.push(wraper);
                   SumStack.shift();
                   sum +=parseInt(SumStack[0]);
               }
                sum -=parseInt(SumStack[0]);
                var dis = average-sum;
                console.log(dis);
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
                    var wraper1 = createDom('div');
                    updateStyles(wraper1,{
                        width:'100%',height: max+'px',position:'relative',backgroundColor:'#D8D8D8',marginBottom:marginBet+'px',
                        textAlign:'center',lineHeight:max+'px'
                    })
                    item.addChilds(wraper1);
                    WraperStack.push(wraper1);
                    SumStack.splice(maxIndex,1);
                }
                console.log(max+'max');
            }else{
                SumStack.forEach(function(item1){
                    var wraper = createDom('div');
                    updateStyles(wraper,{
                        width:'100%',height: item1,position:'relative',backgroundColor:'#D8D8D8',marginBottom:marginBet+'px',
                        textAlign:'center',lineHeight:item1
                    });
                    WraperStack.push(wraper);
                    item.addChilds(wraper);
                });
            }
        });
    }
    return {
        init:function(cols,margin,Blocknum){
            //改变
            marginBet = margin;
            colsBet = cols;
            num = Blocknum;
            //设置最外层dom属性
            dom.className = 'falls';
            updateStyles(dom,{paddingTop:marginBet+'px',paddingLeft: marginBet+'px'});
            generateLayout();
            generateWraper();
            return dom
        },
        //添加图片
        add:function(imgs){
            //创建图像
            imgs.forEach(function(item,index){
                var img = new Image();
                updateStyles(img,{
                    width:'100%',height:'100%',position:'absolute',left:0,top:0
                })
                WraperStack[index].addImage(img,item);
            });
        }
    }
}