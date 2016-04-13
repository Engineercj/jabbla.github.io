/**
 * Created by zxr on 2016/4/12.
 */
var tableData={
    col:10,
    row:10,
    size:30
};
//命令
var Command = {
    'GO':function(obj){
        var x = obj.position.x,
            y = obj.position.y;

        if(obj.offSetHead==='up'){
            obj.position.y -= obj.size;
        }else if(obj.offSetHead==='left'){
            obj.position.x -= obj.size;
        }else if(obj.offSetHead==='right'){
            obj.position.x += obj.size;
        }else{
            obj.position.y += obj.size;
        }
        console.log(obj.range('x',obj.position.x)&&obj.range('y',obj.position.y));
        if(obj.range('x',obj.position.x)&&obj.range('y',obj.position.y)){
            obj.dom.style.left = obj.position.x+'px';
            obj.dom.style.top = obj.position.y+'px';
        }else{
            obj.position.x = x;
            obj.position.y = y;
        }
    },
    'GO 3':function(obj){
        this['GO'](obj);
        this['GO'](obj);
        this['GO'](obj);
    },
    'TUN LEF':function(obj){
        var Deg ;
        //确定方向的角度
        Deg = obj.previous-90;
        //旋转动作，记录旋转后的角度
        Deg = obj.rotate(Deg);
        //根据旋转完后的角度确定头部方向
        var finalDeg = this.judgeDir(Deg);
        //设置头部方向
        obj.setHead(finalDeg);
    },
    'TUN RIG':function(obj){
        var Deg ;
        //确定方向的角度
        Deg = obj.previous+90;
        //旋转动作，记录旋转后的角度
        Deg = obj.rotate(Deg);
        //根据旋转完后的角度确定头部方向
        var finalDeg = this.judgeDir(Deg);
        //设置头部方向
        obj.setHead(finalDeg);
    },
    'TUN BAC':function(obj){
        var Deg ;
        //确定方向的角度
        Deg = obj.previous+180;
        //旋转动作，记录旋转后的角度
        Deg = obj.rotate(Deg);
        //根据旋转完后的角度确定头部方向
        var finalDeg = this.judgeDir(Deg);
        //设置头部方向
        obj.setHead(finalDeg);


    },
    'TRA LEF':function(obj){
        var x = obj.position.x;
        obj.position.x -= obj.size;
        if(obj.range('x',obj.position.x)){
            obj.dom.style.left = obj.position.x + 'px';
        }else{
            obj.position.x = x;
        }
    },
    'TRA TOP':function(obj){
        var y = obj.position.y;
        obj.position.y -= obj.size;
        if(obj.range('y',obj.position.y)){
            obj.dom.style.top = obj.position.y + 'px';
        }else{
            obj.position.y = y;
        }
    },
    'TRA TOP 2':function(obj){
        this['TRA TOP'](obj);
        this['TRA TOP'](obj);
    },
    'TRA RIG':function(obj){
        var x = obj.position.x;
        obj.position.x += obj.size;
        if(obj.range('x',obj.position.x)){
            obj.dom.style.left = obj.position.x + 'px';
        }else{
            obj.position.x = x;
        }
    },
    'TRA BOT':function(obj){
        var y = obj.position.y;
        obj.position.y += obj.size;
        if(obj.range('y',obj.position.y)){
            obj.dom.style.top = obj.position.y + 'px';
        }else{
            obj.position.y = y;
        }
    },
    'MOV LEF':function(obj){
        obj.setHead(obj.rotate(-90));
        this['TRA LEF'](obj);
    },
    'MOV TOP':function(obj){
        obj.setHead(obj.rotate(0));
        this['TRA TOP'](obj);
    },
    'MOV RIG':function(obj){
        obj.setHead(obj.rotate(90));
        this['TRA RIG'](obj);
    },
    'MOV RIG 4':function(obj){
        this['MOV RIG'](obj);
        this['MOV RIG'](obj);
        this['MOV RIG'](obj);
        this['MOV RIG'](obj);
    },
    'MOV BOT':function(obj){
        obj.setHead(obj.rotate(180));
        this['TRA BOT'](obj);
    },
    judgeDir:function(deg){
        if(deg<0){
            deg = (parseInt(Math.abs(deg)/360)+1)*360-Math.abs(deg);
        }
        var x = deg/90;
        switch(x-4*parseInt(x/4)){
            case 0:return 0;
            case 1:return 90;
            case 2:return 180;
            case 3:return -90;
            case 4:return 0;
        }
    }
}
//方块对象
var Div = {
    head:{
        up:0,
        left:-90,
        right:90,
        down:180
    },
    previous:0,
    position:{
        x:'',
        y:''
    },
    offSetHead:'up',
    receiver:function(command){
        Command[command](this);
    },
    //通过角度设置头部朝向信息
    setHead:function(deg){
        for(str in this.head){
            if(this.head[str]===deg){
                this.offSetHead = str;
            }
        }
    },
    //旋转到一定角度，储存当前角度
    rotate:function(deg){
        this.dom.style.transform = 'rotate('+deg+'deg)';
        this.previous = deg;
        return deg;
    },
    range:function(position,value){
        switch(position){
            case 'x':return (value<=10*this.size&&value>=this.size);
            case 'y':return (value>=0&&value<=9*this.size);
        }
    }
}
//创建棋盘
function createBoard(obj){
    var oBoard = document.createElement('table'),
        oWraper = document.createElement('div'),
        oInputLine = document.createElement('div'),
        oInput = document.createElement('input'),
        oBtn = document.createElement('button'),
        oRe = document.createElement('button');
    //构建棋盘
    for(var i=0;i<obj.row;i++){
        var row = document.createElement('tr');

        row.style.position = 'relative';
        for(var j=0;j<obj.col;j++){
            var col = document.createElement('td');
            //表格css样式
            col.style.width = obj.size+'px';
            col.style.height = obj.size+'px';
            col.style.borderRight = '1px solid grey';
            col.style.borderBottom = '1px solid grey';
            col.style.position = 'relative';
            col.style.boxSizing = 'border-box';
            if(i===0){
                var num = document.createElement('span');
                //数字的css样式
                num.style.display = 'block';
                num.style.position = 'absolute';
                num.style.width = obj.size+'px';
                num.style.height =obj.size+'px';
                num.style.top = -obj.size+'px';
                num.style.left = '0';
                num.style.textAlign = 'center';
                num.style.lineHeight = obj.size+'px';
                num.innerHTML = j+1;
                col.appendChild(num);
            }
            if(j===0){
                var num = document.createElement('span');
                //数字的css样式
                num.style.display = 'block';
                num.style.position = 'absolute';
                num.style.width = obj.size+'px';
                num.style.height = obj.size+'px';
                num.style.top = '0';
                num.style.left = -obj.size+'px';
                num.style.textAlign = 'center';
                num.style.lineHeight =obj.size+'px';
                num.innerHTML = i+1;
                col.appendChild(num);
            }
            if(j===obj.col-1){
                col.style.borderRight = 'none';
            }
            if(i===obj.row-1){
                col.style.borderBottom = 'none';
            }
            row.appendChild(col);
        }
        oBoard.appendChild(row);

    }
    oWraper.style.width = obj.size*11+'px';
    oWraper.id = 'wraper';
    oWraper.style.height = obj.size*11+'px';
    oWraper.style.position = 'relative';
    oBoard.style.border = '2px solid black';
    oBoard.style.marginTop =obj.size+'px';
    oBoard.style.marginLeft = obj.size+'px';
    oBoard.style.position = 'relative';
    oBoard.style.boxSizing = 'border-box';
    oBoard.setAttribute('cellspacing','0');
    oWraper.appendChild(oBoard);
    //输入框
    oInputLine.style.marginLeft = obj.size+'px';
    oInputLine.style.marginTop = obj.size+'px';
    oInputLine.style.marginBottom = obj.size+'px';
    oBtn.id = 'btn';
    oBtn.innerHTML  = '执行';
    oRe.id='refresh';
    oRe.innerHTML = '清空';
    oInputLine.appendChild(oBtn);
    oInputLine.appendChild(oRe);
    oWraper.appendChild(oInputLine);
    document.body.appendChild(oWraper);
    //放置Dom
    function putDom(x,y){
        var oDiv = document.createElement('div'),
            oHead = document.createElement('div');

        oDiv.id = 'main';
        oDiv.style.width = obj.size+'px';
        oDiv.style.height =obj.size+'px';
        oDiv.style.backgroundColor = 'red';
        oDiv.style.transition = 'all 0.5s ease-in-out';
        oHead.style.height = '30%';
        oHead.style.backgroundColor = 'blue';

        oDiv.appendChild(oHead);

        oDiv.style.position = 'absolute';
        oDiv.style.left = ((x)*obj.size)+'px';
        oDiv.style.top = ((y-1)*obj.size+2)+'px';
        Div.position.x = (x)*obj.size;
        Div.position.y = (y-1)*obj.size;
        Div.size = obj.size;
        Div.dom = oDiv;
        oWraper.appendChild(oDiv);
    }
    putDom(6,6);
    return oWraper;
}
//执行创建动作

    var oWraper = createBoard(tableData),
        codeText = new CodeText(300,200);
    codeText.box.style.marginTop = '40px';
    document.body.appendChild(codeText.box);



//预编译指令
function testFy(text){
    var lines = [],
        ary = text.split('\n');
    //对每行指令进行确认
    ary.forEach(function(item,index,array){
        var boolean = -1;
        for(str in Command){
            if(str===item){
                boolean = 1;
                break;
            }
        }
        if(boolean==-1){
            lines.push(index);
        }
    });
    return lines;
}
//给执行按钮添加事件
function addEvent(){
    var oBtn = document.getElementById('btn'),
        oRe = document.getElementById('refresh');
    //执行按钮事件
    oBtn.onclick = function(){
        var text = codeText.text.value.trim(),
            faults = testFy(text);
           if(faults.length!==0){
               aLi = codeText.line.getElementsByTagName('li');
               faults.forEach(function(item,index,array){
                   aLi[item].style.color = 'red';
               });
               console.log(aLi.length);
           }else{
               var cmds = text.split('\n');
               cmds.forEach(function(item,index,array){
                   setTimeout(function(){
                       Command[item](Div);
                   },index*500);
               });
                console.log(Div.dom);
           }

    }
    //清空按钮事件
    oRe.onclick = function(){
        codeText.text.value = '';
        codeText.line.innerHTML = '';
        codeText.lineNum = 0;
    }
}
//事件初始化函数
function init(){
    addEvent();

}
init();