/**
 * Created by zxr on 2016/4/24.
 */
var canvas = document.querySelector('canvas'),
    head = document.querySelector('h1'),
    ctx = canvas.getContext('2d');

head.style.lineHeight = window.screen.height*0.05+'px';
//=======================canvas自适应==========================//
    canvas.width = window.screen.width;
    canvas.height = window.screen.height-window.screen.height*0.05;
//=======================地图对象==========================//
    var Map = {
        boarder:{
            top:0,
            bottom:canvas.height,
            left:0,
            right:canvas.width
        },
        barriers:[],
        destination:{},
        perWidth:canvas.width/10,
        perHeight:canvas.width/10
    }
//=======================人物类=========================//
    var person = new Image();
    person.src="men.png";
    function SingleOne(obj){
        this.personImg = obj.personImg;
        this.x = obj.personImg.position.x;
        this.y = obj.personImg.position.y;
        this.vx = 1;
        this.vy = 1;
        this.timer = null;
    }
    //================人物生成==============//
    SingleOne.prototype.bornMe = function(){
        person.addEventListener('load',drawImg(this.personImg.clip,this.personImg.position),false);
    }
    //================人物放置==============//
    SingleOne.prototype.Put = function(position){
        drawImg(this.personImg.clip,position)();
    }
    //================人物移动==============//
    SingleOne.prototype.MoveVert = function(flag,fn){
        //改变速度方向
        this.vy = arguments[0]*Math.abs(this.vy);
        //初始化定时器
        clearInterval(this.timer);
        var self = this;
        //设置移动定时器
        this.timer = setInterval(function(){
            //撞墙检测
            self.testBarriers('Vert');
            //用户手动检测
            fn.call(self);
            //清除画布
            ctx.clearRect(self.x,self.y,Map.perWidth,Map.perHeight);
            self.Put({x:self.x,y:self.y += self.vy});
        },5);
    }
    SingleOne.prototype.MoveLandscape = function(flag,fn){
        //改变速度方向
        this.vx = arguments[0]*Math.abs(this.vx);
        //初始化定时器
        clearInterval(this.timer);
        var self = this;
        //设置移动定时器
        this.timer = setInterval(function(){
            //撞墙检测
            self.testBarriers('Landscape');
            //用户手动检测
            fn.call(self);
            //清除画布
            ctx.clearRect(self.x,self.y,Map.perWidth,Map.perHeight);
            self.Put({x:self.x += self.vx,y:self.y});
        },5);
    }
    //================人物碰撞检测==============//
    SingleOne.prototype.testBarriers = function(str){
        var next;
        if(str==='Vert'){
            next = this.y+this.vy;
            if(next+Map.perHeight>Map.boarder.bottom||next<Map.boarder.top){clearInterval(this.timer)}
        }else{
            next = this.x+this.vx;
            if(next+Map.perWidth>Map.boarder.right||next<Map.boarder.left){clearInterval(this.timer)}
        }
        return true;
    }
    //================人物目标位置误差计算==============//
    SingleOne.prototype.testError = function(target){
        var x,y,change = {};
        if(Math.abs(target.x-this.x)>Map.perWidth&&Math.abs(target.y-this.y)>Map.perHeight){
            return false;
        }
        if(Math.abs(target.x-this.x)<Map.perWidth){
            x = this.x;
        }else{
            change.whitch = 'x';
            change.vd = (target.x-this.x)/Math.abs(target.x-this.x);
            x = target.x;
        }
        if(Math.abs(target.y-this.y)<Map.perHeight){
            y = this.y;
        }else{
            change.whitch = 'y';
            change.vd = (target.y-this.y)/Math.abs(target.y-this.y);
            y = target.y;
        }
        //如果人物到了接近边缘的部分
        if(this.x<=Map.perWidth&&this.x>0&&change.whitch!=='y'){
            x = 0;
            change.whitch = 'x';
            change.vd = -1;
        }
        if(this.y<=Map.perHeight&&this.y>0&&change.whitch!=='x'){
            y = 0;
            change.whitch = 'y';
            change.vd = -1;
        }
        return {x:x,y:y,change:change};
    }
//=======================图像绘制==========================//
    function drawImg(clip,position){
        return function(){
            ctx.drawImage(person,clip.x,clip.y,150,200,position.x,position.y, Map.perWidth,Map.perHeight);
        }
    }
//=========================对象实例=======================//
    var personImg = {clip:{x:0, y:0}, position:{x:0, y:0}};
    var test  = new SingleOne({personImg:personImg});
    test.bornMe();
    //人物移动函数
    function MovePerson(target){
        var position = {};
        //点击目标x,y要有一个坐标的偏差小于perWidth
        var flag = test.testError(target);
        position.x = flag.x;
        position.y = flag.y;
        if(flag!==false){
            switch(flag.change.whitch){
                case 'y':test.MoveVert(flag.change.vd,moveTest);break;
                case 'x':test.MoveLandscape(flag.change.vd,moveTest);break;
            }
        }
        //移动检测函数
        function moveTest(){
            if(this.x===position.x&&this.y===position.y){
                clearInterval(this.timer);
            }
        }
    }
//=========================关卡类=======================//
function Chapter(map,index){
    this.map = map;
    this.index = index;
    this.scroe = 120;
}
//=========================用户控制=======================//
(function(){
    //用户点击事件
    canvas.addEventListener('click',function(e){
        var target = {x:parseInt(e.pageX-(Map.perWidth/2)), y:parseInt(Math.floor(e.pageY-window.screen.height*0.05)-(Map.perHeight/2))};
        //人物移动
        MovePerson(target);
    },false);

})();