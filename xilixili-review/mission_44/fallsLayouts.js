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
            var wraper = createDom('div'),      //创建套子，并赋予属性
                index = i%colsBet;

            //设置套子属性
            updateStyles(wraper,{
                width:'100%',height:arrH[index],backgroundColor:'#D8D8D8',lineHeight:arrH[index],textAlign:'center',
                marginBottom:marginBet+'px',position:'relative'
            });
            wraper.innerHTML = i+1;
            WraperStack.push(wraper);
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
                var img = new Image();
                updateStyles(img,{
                    width:'100%',height:'100%',position:'absolute',left:0,top:0
                })
                WraperStack[index].addImage(img,item);
            });
        }
    }
}