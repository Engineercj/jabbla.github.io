/**
 * Created by zxr on 2016/4/6.
 */
//飞船对象
function Craft(){
    Craft.prototype.count++;
    this.id = Craft.prototype.count;
    this.dynamicSystem = {
        self:this,
        state: 'stop',
        moveInit:function(){
            var temp = document.getElementById('Craft_'+this.self.id),
                energy = temp.getElementsByClassName('energy')[0],
                oKeyframes = document.getElementById('keyframes'),
                craftMove = '@keyframes fly'+this.self.id+ '{ 0%{transform:rotate('+this.self.startDeg+'deg);} 100%{transform:rotate('+(360+this.self.startDeg)+'deg);} }',
                $temp = $(temp);

            oKeyframes.innerHTML = oKeyframes.innerHTML+craftMove;
            $temp.css({'animation-name':'fly'+this.self.id,'animation-duration': '10s','animation-timing-function': 'linear','animation-iteration-count': 'infinite','animation-play-state':'paused'});
        },
        startFly: function(){
            var temp = document.getElementById('Craft_'+this.self.id),
                energy = temp.getElementsByClassName('energy')[0],
                percent = this.self.powerSystem.currentPower/this.self.powerSystem.maxPower,
                $temp = $(temp),
                $energy = $(energy);


            //切换状态
            this.state = 'start';
            $temp.css({'animation-play-state':'running'});
            //消耗能量动画
            $energy.css({'transition':'left '+percent*33+'s linear','left':'100px'});
            consoleLog(this.self.id+'号飞船起飞了');
        },
        stopFly: function(){
            var temp = document.getElementById('Craft_'+this.self.id),
                energy = temp.getElementsByClassName('energy')[0],
                percent = this.self.powerSystem.currentPower/this.self.powerSystem.maxPower,
                $temp = $(temp),
                $energy = $(energy);

            this.state = 'stop';
            $temp.css({'animation-play-state':'paused'});
            //充能动画
            $energy.css({'transition':'left '+(1-percent)*50+'s linear','left':'0px'});
            consoleLog(this.self.id+'号飞船停止飞行了');
        },
        speed:20
    };
    this.powerSystem = {
        self:this,
        currentPower:20000,
        maxPower:20000,
        postion:0,
        solarPower:function(){
            var thisCraft = this.self;
            this.self.chargeTimer = setInterval(function(){
                if(thisCraft.powerSystem.currentPower<thisCraft.powerSystem.maxPower){
                    thisCraft.powerSystem.currentPower += 400;
                }
            },1000);
        },
        watchEnergy:function(){
            var thisCraft = this.self,
                craftDom = document.getElementById('Craft_'+thisCraft.id);

            this.self.watchTimer = setInterval(function(){
                if(thisCraft.dynamicSystem.state==='start'){
                    thisCraft.powerSystem.currentPower-=1000;
                }
                if(thisCraft.powerSystem.currentPower>=thisCraft.powerSystem.maxPower){
                    thisCraft.powerSystem.currentPower = thisCraft.powerSystem.maxPower;
                }else if(thisCraft.powerSystem.currentPower<=0){
                    thisCraft.powerSystem.currentPower = 0;
                }
                craftDom.setAttribute('data-energy',parseInt(thisCraft.powerSystem.currentPower/thisCraft.powerSystem.maxPower*100)+'%');
                if(thisCraft.powerSystem.currentPower<=0){
                    thisCraft.dynamicSystem.stopFly();
                    consoleLog(thisCraft.id+'号飞船，没油了');
                    consoleLog(thisCraft.id+'号飞船正在用太阳能充能');
                    alert(thisCraft.id+'号飞船，没油了');

                }
            },1000);
        }
    };
    this.signalSystem = {
        self: this,
        receive:function(signal){
            if(signal.id===this.self.id){
                consoleLog(this.self.id+'号飞船接收到'+signal.command+'信号');
                if(signal.command==='start'){
                    this.self.dynamicSystem.startFly();
                }else if(signal.command==='stop'){
                    this.self.dynamicSystem.stopFly();
                }else if(signal.command==='del'){
                    this.self.selfDestruct();
                }
            }
        }
    };
    this.selfDestruct = function(){
        consoleLog(this.id+'号飞船启动自毁');
       var craftDom = document.getElementById('Craft_'+this.id),
            commandDom = document.getElementById('Command'+this.id);

        commandDom.parentNode.removeChild(commandDom);
        craftDom.parentNode.removeChild(craftDom);
        Universe.PopCraft();
    };
}
Craft.prototype.count = 0;
//宇宙对象
var Universe = {
    Planet:{
        commander: {
            sendSignal:function(signal){
                consoleLog('指挥官发出了'+signal.command+'信号(过程中会有30%的丢包概率,做好重发准备)');
                Universe.Planet.Mediator(signal);
            }
        },
        Mediator:function(signal){
            var signalSend;
            if(Math.random()>0.3){
                signalSend = signal;
                setTimeout(function(){
                    Universe.signalHeap(signalSend);
                },1000);
            }
        }
    },
    signalHeap:function(signal){
        if(signal.command==='new'){
            Universe.createCraft();
        }else{
            Universe.Crafts.forEach(function(item,index,array){
                item.signalSystem.receive(signal);
            });
        }
    },
    Crafts:[],
    createCraft:function(){
        var craft = new Craft();

        if(this.Crafts.length<4){
            consoleLog(craft.id+'号飞船已被创建');
            var craftDom = document.createElement('div'),
                commandDom = document.createElement('div'),
                planetDom = document.getElementById('Planet'),
                UniverseDom = document.getElementById('Universe');

            //将飞船DOM插入到DOM树中
            craftDom.setAttribute('data-energy',craft.powerSystem.currentPower/craft.powerSystem.maxPower*100+'%');
            craftDom.innerHTML = '<div class="wraper"><span class="energy"></span></div>';
            craftDom.className = 'craft';
            craftDom.id = 'Craft_'+craft.id;
            planetDom.appendChild(craftDom);
            this.Crafts.push(craft);

            //随机生成一个飞机放置角度
            var deg = Math.random()*360,
                $craftDom = $(craftDom);

            craft.startDeg = deg;
            $craftDom.css({'transform':'rotate('+craft.startDeg+'deg)'});
            //初始化飞船动画
            craft.dynamicSystem.moveInit();

            //初始化太阳能系统
            craft.powerSystem.watchEnergy();
            craft.powerSystem.solarPower();
            //命令DOM插入到DOM树中
            commandDom.className = 'command';
            commandDom.id = 'Command'+craft.id;
            commandDom.innerHTML = '对'+craft.id+'号飞船下达指令:<button class="start" type="button">开始飞行</button> <button class="stop" type="button">停止飞行</button> <button class="del" type="button">销毁</button>'
            UniverseDom.appendChild(commandDom);
            return craft;
        }else{
            Craft.prototype.count--;
            alert("宇宙飞船数量已经满了");
            consoleLog("宇宙飞船数量已经满了");
        }
    },
    PopCraft:function(){
        this.Crafts.pop();
    }
};
//向控制台输出信息函数
function consoleLog(str){
    var oInfo = document.getElementById('info-list');
    oInfo.innerHTML += '<li>'+str+'</li>';
}
(function(){
    //给Universe添加事件托管
    var UniverseDom = document.getElementById('Universe');

    UniverseDom.onclick = function(e){
        var target = e.target;
        
        (function(flag){
            if(!confirm("确定要以指挥官的角色发送"+flag+"指令吗?")){
                return;
            }
            Universe.Planet.commander.sendSignal({id:parseInt(target.parentNode.id.charAt(7)),command:flag});
        })(target.className);
    }
})();