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
    //根据用户传入数量生成套子
    function generateWraper(){
        //循环生成套子
        for(var i=0;i<num;i++){
            var index = i%4,
                rIndex = randomNum(index,3),    //随机生成索引
                wraper = createDom('div');      //创建套子，并赋予属性

            //设置套子属性
            updateStyles(wraper,{
                width:'100%',height:arrH[rIndex],backgroundColor:'#D8D8D8',lineHeight:arrH[rIndex],textAlign:'center',
                marginBottom:marginBet+'px',position:'relative'
            });
            wraper.innerHTML = i+1;
            WraperStack.push(wraper);
            //将选到的项交换到当前位置
            if(rIndex!==index){
                var temp = arrH[index];
                arrH.splice(index,1,arrH[rIndex]);
                arrH.splice(rIndex,1,temp);
            }

        }
        //将生成的套子依次插入到对应的布局中
        var index1 = 0;
        while(index1<WraperStack.length){
            LayoutStack[index1%colsBet].addChilds(WraperStack[index1]);
            index1++;
        }
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
                WraperStack[index].addImage(new Image(),item);
            });
        }
    }
}