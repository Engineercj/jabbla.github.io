//内联样式
/**,ul{
    margin: 0;
    padding:0;
    box-sizing: border-box;
}*/
//根据指定宽度高度构建
function CodeText(width,height){
    var oBox = document.createElement('div'),
        oLine = document.createElement('ul'),
        oText = document.createElement('textarea'),
        oBr = document.createElement('div');
    //确定盒子大小
    oBox.style.width = width+'px';
    oBox.style.height = height+'px';
    oBox.style.overflow = 'hidden';
    //根据盒子大小构建左侧列表尺寸和样式
    oLine.style.width = '10%';
    oLine.style.height = '100000%';
    oLine.style.backgroundColor = 'grey';
    oLine.style.color = 'white';
    oLine.style.listStyle = 'none';
    //构建输入框的样式
    oText.style.width = '90%';
    oText.style.height = '100%';
    oText.style.backgroundColor = 'black';
    oText.style.resize = 'none';
    oText.style.color = 'green';
    oText.style.border = 'none';
    oText.style.paddingLeft = '10px';
    oText.style.overflow = 'auto';
    oText.style.lineHeight = (height/10)+'px';
    oText.style.fontSize = '16px';

    //定位设置
    oLine.style.float = 'left';
    oLine.style.position = 'relative';
    oText.style.float = 'left';
    oBr.style.clear = 'both';

    //按顺序插入
    oBox.appendChild(oLine);
    oBox.appendChild(oText);
    oBox.appendChild(oBr);
    document.body.appendChild(oBox);
    //将dom储存
    this.width = width;
    this.height = height;
    this.box = oBox;
    this.line = oLine;
    this.line.Top = 0;
    this.text = oText;
    this.text.Top = 0;
    this.lineNum = 0;
    this.aNum = [];
    var self = this;
    //输入框绑定回车事件
    self.text.onkeyup = function(e){
        if(e.keyCode===13){
            //创建该行序号
            self.lineNum++;
            //创建序号dom并插入列表中
            var oLi = document.createElement('li');
            //定义样式
            oLi.style.width = '100%';
            oLi.style.height = self.height/10+'px';
            oLi.style.color = 'white';
            oLi.style.textAlign = 'center';
            oLi.style.lineHeight = self.height/10 +'px';
            oLi.innerHTML = self.lineNum;
            //插入列表
            self.line.appendChild(oLi);
            if(self.lineNum===10){
                combineScroll();
            }
        }
    }
//输入框的滚动事件
    self.text.onscroll = function(){
        //判断之前滚动条的位置
        if(this.previousSc<this.scrollTop){
            this.scrollTop=this.previousSc+self.height/10;
            self.line.Top -= self.height/10;
        }else if(this.previousSc>this.scrollTop){
            this.scrollTop=this.previousSc-self.height/10;
            self.line.Top += self.height/10;
        }
        self.line.style.top = self.line.Top+'px';
        this.previousSc = this.scrollTop;
        console.log(this.scrollTop);
    }
    //输入框和列表联动
    function combineScroll(){
        self.text.scrollTop=self.text.previousSc-self.height/10;
        self.line.style.top = self.text.scrollTop;
        self.text.previousSc = self.text.scrollTop;
    }
}
