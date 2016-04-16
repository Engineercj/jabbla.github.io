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
    'BUILD':function(obj){
        //根据头部朝向判断建墙方位
        var wallX = this.judgeWall(obj).x,
            wallY = this.judgeWall(obj).y;
        //判断地图范围
        if(Map.isCorrect({x:wallX,y:wallY})){
            //创建墙
            var wall = new Wall({
                x:wallX,
                y:wallY
            });
            //更新地图信息
            Map.update(wall);
            console.log('墙已创建');
            return
        }

        console.log('您的墙已经超出范围.或者该方位存在墙');
    },
    'BRU':function(obj,color){
        var targetX = this.judgeWall(obj).x,
            targetY = this.judgeWall(obj).y;

        //判断是否存在墙
        console.log(targetX+' '+targetY);
        var dom = Map.isExist({x:targetX,y:targetY});
        if(dom){
            dom.style.backgroundColor = color;
        }else{
            console.log('您所在的方向不存在墙');
        }
        console.log(color);
    },
    'MOV TO':(function(){
            var previous = 0;
            return function(obj,target){
                //检测目标位置是否有墙
                if(!Map.noWall(target)){
                    alert('设置的位置存在墙,请重新设置');
                    return
                }
                //标记目标位置
                var oWraper = document.getElementById('wraper'),
                    aTd = oWraper.getElementsByTagName('td');
                //计算目标位置在td中的位置
                aTd[previous].style.backgroundColor ='transparent';
                //将坐标转换为td的index
                var num = Map.transformToIndex(target);
                aTd[num-1].style.backgroundColor = 'green';
                previous = num-1;
                Map.findPaths(obj.position,target)();
                //遍历路径数组中的每一个节点，并应用动画
                Map.findTdoEvery(function(item,index){
                    setTimeout(function(){
                        if((item.x-obj.position.x)>0){
                            obj.turnHead('right');
                            setTimeout(function(){
                                Command['GO'](obj);
                            },500);
                        }else if((item.x-obj.position.x)<0){
                            obj.turnHead('left');
                            setTimeout(function(){
                                Command['GO'](obj);
                            },500);
                        }else if((item.y-obj.position.y)>0){
                            obj.turnHead('down');
                            setTimeout(function(){
                                Command['GO'](obj);
                            },500);
                        }else if((item.y-obj.position.y)<0){
                            obj.turnHead('up');
                            setTimeout(function(){
                                Command['GO'](obj);
                            },500);
                        }

                    },index*1000);

                });
            }
    })(),
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
    },
    judgeWall:function(obj){
        var result = {};
        switch(obj.offSetHead){
            case 'up':result.y = obj.position.y-tableData.size;result.x = obj.position.x;break;
            case 'down':result.y = obj.position.y+tableData.size;result.x = obj.position.x;break;
            case 'right':result.y = obj.position.y;result.x = obj.position.x+tableData.size;break;
            case 'left':result.y = obj.position.y;result.x = obj.position.x-tableData.size;break;
        }
        return result;
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
        for(str1 in this.head){
            if(this.head[str1]===deg){
                this.offSetHead = str1;
            }
        }
    },
    //设置头部方向，并且旋转
    turnHead:function(h){
        for(str in this.head){
            if(str===h){
                this.setHead(this.head[str]);
                this.rotate(this.head[str]);
                return true;
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
            case 'x':return (value<=10*this.size+2&&value>=this.size+2);
            case 'y':return (value>=2&&value<=9*this.size+2);
        }
    }
}
//墙对象
function Wall(obj){
    this.x = obj.x;
    this.y = obj.y;
    this.width = tableData.size;
    this.height = tableData.size;
    this.color = '808080';
    //创建墙DOM
    var wall = document.createElement('div'),
        oWraper = document.getElementById('wraper');

    wall.style.width =  this.width+'px';
    wall.style.height =  this.height+'px';
    wall.style.position = 'absolute';
    wall.style.backgroundColor = '#'+this.color;
    wall.style.top = this.y+'px';
    wall.style.left = this.x+'px';
    this.dom = wall;
    oWraper.appendChild(wall);

}
var io;
//棋盘
var Map = {
    range:{
        minX:tableData.size,
        maxX:tableData.size*9,
        minY:0,
        maxY:tableData.size*9
    },
    pathTree:[],
    exist:[],
    isCorrect:function(obj){
        var boolean1 = (obj.x<=Map.range.maxX&&obj.x>=Map.range.minX&&obj.y<=Map.range.maxY&&obj.y>=Map.range.minY),
            boolean2 ;

        //判断是否墙重合
        if(this.exist.length>0){
            boolean2 = (this.exist.every(function(item,index,array){
                return obj.x!==item.x||obj.y!==item.y;
            }));
        }else{
            boolean2 = true;
        }
        return boolean1&&boolean2;

    },
    update:function(obj){
        this.exist.push(obj);
    },
    isExist:function(obj){
        if(this.exist.length>0){
            var wall = this.exist.filter(function(item,index,array){
                return obj.x===item.x&&obj.y===item.y;
            });
            return wall[0].dom;
        }
    },
    //生成路径树函数
    findPaths:function(source,target){
        //定义两个集合
        var Used = [],
            unUsed = [],
            min ;
        //棋盘所有点,并计算好距离放入unUsed
        for(var i=0;i<10;i++){
            for(var j=0;j<10;j++){
                var x = 32+j*30,
                    y = 2+i*30;
                if(this.exist.every(function(item,index,array){return item.x!==x||item.y!==y;})){
                    if((parseInt(target.x/30)*30+2)===x&&(parseInt(target.y/30)*30+2)===y){
                        unUsed.push({x:x,y:y,target:true});
                    }else{
                        unUsed.push({x:x,y:y});
                    }
                }
            }
        }
        unUsed.forEach(function(item,index,array){
            if(item.target===true){
                io = item;
            }
        });
        //更新第一波
        for(var j=0;j<unUsed.length;j++){
            if((Math.abs(unUsed[j].x-source.x)+Math.abs(unUsed[j].y-source.y))===tableData.size){
                unUsed[j].distance = tableData.size;
                unUsed[j].source=  source;
                min = unUsed[j];
            }
        }
        return function(){
            var minimum;

            /*console.log('target'+unUsed.indexOf(io));
            console.log('minimum'+unUsed.indexOf(minimum));*/
            if(unUsed.length<=0){
                Map.Used = Used;
                return
            }
            //取出具有distance属性的节点
            for(var t=0;t<unUsed.length;t++){
                if(unUsed[t].distance!==undefined){
                    minimum = unUsed[t];
                    break;
                }
            }
            //取出unUsed中距离源点最小的
            for(var i=0;i<unUsed.length;i++){
                if(unUsed[i].distance){
                    if(minimum.distance>=unUsed[i].distance){
                        minimum = unUsed[i];
                        minimum.index = i;
                    }
                }
            }
            unUsed.splice(minimum.index,1);
            Used.push(minimum);
            //在unUsed中找出距离min为1的点，并更新
            for(var j=0;j<unUsed.length;j++){
                var distance = Math.abs(unUsed[j].x-minimum.x)+Math.abs(unUsed[j].y-minimum.y);
                //如果初始距离大雨等于经过min的距离则更新改点距离，并储存一个指向min的引用
                if(distance===tableData.size){
                    if(unUsed[j].distance===undefined){
                        unUsed[j].distance = distance+minimum.distance;
                    }
                    if(unUsed[j].distance>=(minimum.distance+distance)){
                        unUsed[j].distance = minimum.distance+distance;
                        unUsed[j].source = minimum;
                    }
                }
            }
            arguments.callee()
        };
    },
    //生成路径树
    createTree:function(){
        this.pathTree = [];
        var pathTree = this.pathTree;
        return function(target){
            if(target===undefined){
                return;
            }
            pathTree.unshift(target);
            arguments.callee(target.source);
        }
    },
    coverTree:function(callback){
        for(var i=0;i<this.pathTree.length;i++){
            callback(this.pathTree[i],i);
        }
    },
    findTdoEvery:function(callback){
        var oTarget;
        //找出target
        this.Used.forEach(function(item,index,array){
            if(item.target===true){
                oTarget = item;
            }
        });
        console.log(oTarget);
        //构造路径树
        this.createTree()(oTarget);
        //对每个节点执行回调函数
        this.coverTree(callback);
    },
    //检测目标位置是否存在墙
    noWall:function(target){
        var boolean = this.exist.every(function(item,index,array){
            return item.x!==target.x||item.y!==target.y;
        });
        return boolean;
    },
    //随机生成墙
    randomWall:function(){
        //存储取出的坐标
        var selected = [],
            oWraper = document.getElementById('wraper'),
            aTd = oWraper.getElementsByTagName('td'),
            randomNums;
        //将已存在的墙放入selected
        this.exist.forEach(function(item,index,array){
            selected.push(Map.transformToIndex(item)+1);
        });
        //将小车的位置推入selected
        selected.push(Map.transformToIndex(Div.position));

        //在1-10中随机选取数量
        randomNums = Math.ceil(Math.random()*10);
        //在1-100中选取randomNums数量个td
        for(var i=0;i<randomNums;i++){
            var Rindex = Math.ceil(Math.random()*100);
            if(selected.length>0){
                while(selected.some(function(item,index,array){return item===Rindex})){
                    Rindex = Math.ceil(Math.random()*100);
                }
            }
            //创建墙，并更新地图信息
            var wall = new Wall(this.transformToPos(Rindex));
            this.update(wall);
            selected.push(Rindex);
        }
    },
    //将坐标转换为td的index
    transformToIndex:function(position){
        return parseInt(position.y/30)*10+parseInt(position.x/30);
    },
    //将td的index转化为坐标
    transformToPos:function(index){
        var topNum = parseInt((index-1)/10),
            leftNum = (index)-parseInt((index-1)/10)*10;
        var top = topNum*30+2,
            left = leftNum*30+2;
        return {x:left,y:top};
    }
}
//创建棋盘
function createBoard(obj){
    var oBoard = document.createElement('table'),
        oWraper = document.createElement('div'),
        oInputLine = document.createElement('div'),
        oInput = document.createElement('input'),
        oBtn = document.createElement('button'),
        oRwall = document.createElement('button'),
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
    oWraper.style.width = (obj.size*11+10)+'px';
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
    oRwall.id = 'randomWall';
    oRwall.innerHTML  = '随机生成墙';
    oInputLine.appendChild(oBtn);
    oInputLine.appendChild(oRwall);
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
        oDiv.style.left = ((x)*obj.size+2)+'px';
        oDiv.style.top = ((y-1)*obj.size+2)+'px';
        Div.position.x = (x)*obj.size+2;
        Div.position.y = (y-1)*obj.size+2;
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
        if(/^BRU #[0-9A-Za-z]{6}/.test(item)){
            boolean =1;
        }
        if(/^MOV TO/.test(item)){
            boolean =1;
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
        oRe = document.getElementById('refresh'),
        oRwall = document.getElementById('randomWall');
    //执行按钮事件
    oBtn.onclick = function(){
        var text = codeText.text.value.trim(),
            faults = testFy(text);
           if(faults.length!==0){
               aLi = codeText.line.getElementsByTagName('li');
               faults.forEach(function(item,index,array){
                   aLi[item].style.color = 'red';
               });
           }else{
               var cmds = text.split('\n');
               cmds.forEach(function(item,index,array){
                   setTimeout(function(){
                       if(/^BRU #[0-9A-Za-z]{6}/.test(item)){
                           Command['BRU'](Div,item.trim().split(' ')[1]);
                       }else if(/^MOV TO/.test(item)){
                           var str = item.trim().slice(7).split(',');
                           Command['MOV TO'](Div,{x:parseInt(str[0]),y:parseInt(str[1])});
                       }
                       else{
                           Command[item](Div);
                       }

                   },index*500);
               });
           }

    }
    //清空按钮事件
    oRe.onclick = function(){
        codeText.text.value = '';
        codeText.line.innerHTML = '';
        codeText.lineNum = 0;
    }
    //随机墙按钮
    oRwall.onclick = function(){
        Map.randomWall();
    }
}
//事件初始化函数
function init(){
    addEvent();

}
init();