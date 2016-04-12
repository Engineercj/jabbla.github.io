/**
 * Created by zxr on 2016/4/12.
 */
var tableData={
    col:10,
    row:10
};
//命令
var Command = {
    'GO':function(obj){
        if(obj.offSetHead==='up'){
            obj.position.y -= 50;
        }else if(obj.offSetHead==='left'){
            obj.position.x -= 50;
        }else if(obj.offSetHead==='right'){
            obj.position.x += 50;
        }else{
            obj.position.y += 50;
        }
        if(obj.position.y<0){
            obj.position.y += 50;
            return;
        }else if(obj.position.y>450){
            obj.position.y -= 50;
            return;
        }
        if(obj.position.x<50){
            obj.position.x += 50;
            return;
        }else if(obj.position.x>500){
            obj.position.x -= 50;
            return;
        }
        obj.dom.style.left = obj.position.x+'px';
        obj.dom.style.top = obj.position.y+'px';
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
    setHead:function(deg){
        for(str in this.head){
            if(this.head[str]===deg){
                this.offSetHead = str;
            }
        }
    },
    rotate:function(deg){
        this.dom.style.transform = 'rotate('+deg+'deg)';
        this.previous = deg;
        return deg;
    }
}
//创建棋盘
function createBoard(obj){
    var oBoard = document.createElement('table'),
        oWraper = document.createElement('div'),
        oInputLine = document.createElement('div'),
        oInput = document.createElement('input'),
        oBtn = document.createElement('button');
    //构建棋盘
    for(var i=0;i<obj.row;i++){
        var row = document.createElement('tr');

        row.style.position = 'relative';
        row.style.right= '-10px';
        for(var j=0;j<obj.col;j++){
            var col = document.createElement('td');
            //表格css样式
            col.style.width = '50px';
            col.style.height = '50px';
            col.style.borderRight = '1px solid grey';
            col.style.borderBottom = '1px solid grey';
            col.style.position = 'relative';
            col.style.boxSizing = 'border-box';
            if(i===0){
                var num = document.createElement('span');
                //数字的css样式
                num.style.display = 'block';
                num.style.position = 'absolute';
                num.style.width = '50px';
                num.style.height = '50px';
                num.style.top = '-50px';
                num.style.left = '0';
                num.style.textAlign = 'center';
                num.style.lineHeight = '50px';
                num.innerHTML = j+1;
                col.appendChild(num);
            }
            if(j===0){
                var num = document.createElement('span');
                //数字的css样式
                num.style.display = 'block';
                num.style.position = 'absolute';
                num.style.width = '50px';
                num.style.height = '50px';
                num.style.top = '0';
                num.style.left = '-50px';
                num.style.textAlign = 'center';
                num.style.lineHeight = '50px';
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
    oWraper.style.width = '570px';
    oWraper.style.height = '570px';
    oWraper.style.position = 'relative';
    oBoard.style.border = '2px solid black';
    oBoard.style.marginTop = '50px';
    oBoard.style.marginLeft = '50px';
    oBoard.style.position = 'relative';
    oBoard.style.boxSizing = 'border-box';
    oBoard.setAttribute('cellspacing','0');
    oWraper.appendChild(oBoard);
    //输入框
    oInputLine.style.marginLeft = '50px';
    oInputLine.style.marginTop = '50px';
    oInput.type = 'text';
    oInput.id = 'command';
    oBtn.id = 'btn';
    oBtn.innerHTML  = '执行';
    oInputLine.appendChild(oInput);
    oInputLine.appendChild(oBtn);
    oWraper.appendChild(oInputLine);
    document.body.appendChild(oWraper);

    //放置Dom
    function putDom(x,y){
        var oDiv = document.createElement('div'),
            oHead = document.createElement('div');

        oDiv.id = 'main';
        oDiv.style.width = '50px';
        oDiv.style.height = '50px';
        oDiv.style.backgroundColor = 'red';
        oDiv.style.transition = 'all 0.5s ease-in-out';
        oHead.style.height = '20px';
        oHead.style.backgroundColor = 'blue';

        oDiv.appendChild(oHead);

        oDiv.style.position = 'absolute';
        oDiv.style.left = ((x)*50+2)+'px';
        oDiv.style.top = ((y-1)*50)+'px';
        Div.position.x = (x)*50;
        Div.position.y = (y-1)*50;
        Div.dom = oDiv;
        oWraper.appendChild(oDiv);
    }
    putDom(6,6);
}

createBoard(tableData);

//给执行按钮添加事件
function addEvent(){
    var oBtn = document.getElementById('btn'),
        oDiv = document.getElementById('main'),
        oText = document.getElementById('command');
    oBtn.onclick = function(){
        var command = oText.value;
        Div.receiver(command);
    }
}
//事件初始化函数
function init(){
    addEvent();
}
init();