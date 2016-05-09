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
        speed:30,
        moveInit:function(){
            var temp = document.getElementById('Craft_'+this.self.id),
                energy = temp.getElementsByClassName('energy')[0],
                //获取动画池
                oKeyframes = document.getElementById('keyframes'),
                //定义飞船动画，确定起始位置
                craftMove = '@keyframes fly'+this.self.id+ '{ 0%{transform:rotate('+this.self.startDeg+'deg);} 100%{transform:rotate('+(360+this.self.startDeg)+'deg);} }',
                $temp = $(temp);
            //将该飞船动画加入动画池
            oKeyframes.innerHTML = oKeyframes.innerHTML+craftMove;
            //元素应用动画
            var totalTime = (2*3.14*this.self.height)/this.speed;
            $temp.css({'animation-name':'fly'+this.self.id,'animation-duration': ''+totalTime+'s','animation-timing-function': 'linear','animation-iteration-count': 'infinite','animation-play-state':'paused'});
        },
        //开始飞行
        startFly: function(){
            var temp = document.getElementById('Craft_'+this.self.id),
                energy = temp.getElementsByClassName('energy')[0],
                $temp = $(temp),
                $energy = $(energy);


            //切换状态
            this.state = 'start';
            $temp.css({'animation-play-state':'running'});
            //消耗能量动画
            var totalSpeed = this.self.powerSystem.maxPower*(this.self.powerSystem.consumeSpeed-this.self.powerSystem.chargeSpeed);
            $energy.css({'transition':'left '+this.self.powerSystem.currentPower/totalSpeed+'s linear','left':'60px'});
            consoleLog(this.self.id+'号飞船起飞','success');
        },
        //停止飞行动作
        stopFly: function(){
            var temp = document.getElementById('Craft_'+this.self.id),
                energy = temp.getElementsByClassName('energy')[0],
                $temp = $(temp),
                $energy = $(energy);

            //暂停飞行
            this.state = 'stop';
            $temp.css({'animation-play-state':'paused'});
            //充能动画
            var totalSpeed = this.self.powerSystem.maxPower*this.self.powerSystem.chargeSpeed;
            $energy.css({'transition':'left '+(this.self.powerSystem.maxPower-this.self.powerSystem.currentPower)/totalSpeed+'s linear','left':'0px'});
            consoleLog(this.self.id+'号飞船停止飞行','warn');
        },
        speed:20
    };
    this.powerSystem = {
        self:this,
        currentPower:20000,
        maxPower:20000,
        chargeSpeed:0.02,
        consumeSpeed:0.05,
        //太阳能接收器
        solarPower:function(){
            var thisCraft = this.self,
                powerSystem = thisCraft.powerSystem;
            //每隔1000毫秒，能量增加400
            this.self.chargeTimer = setInterval(function(){
                if(powerSystem.currentPower<powerSystem.maxPower){
                    powerSystem.currentPower += powerSystem.chargeSpeed*powerSystem.maxPower;
                }
            },1000);
        },
        //能量监视器
        watchEnergy:function(){
            var thisCraft = this.self,
                powerSystem = thisCraft.powerSystem,
                dynamicSystem = thisCraft.dynamicSystem,
                craftDom = document.getElementById('Craft_'+thisCraft.id);
            //每隔1000毫秒做一次扫描
            this.self.watchTimer = setInterval(function(){
                //如果动力系统的状态为start，能量每秒减1000
                if(dynamicSystem.state==='start'){
                    powerSystem.currentPower-=(powerSystem.maxPower*powerSystem.consumeSpeed);
                }
                //格式化能量百分比显示
                if(powerSystem.currentPower>=powerSystem.maxPower){
                    thisCraft.powerSystem.currentPower = thisCraft.powerSystem.maxPower;
                }else if(powerSystem.currentPower<=0){
                    powerSystem.currentPower = 0;
                }

                craftDom.setAttribute('data-energy',parseInt(powerSystem.currentPower/powerSystem.maxPower*100)+'%'+''+thisCraft.id);
                if(powerSystem.currentPower<=0){
                    dynamicSystem.stopFly();
                    consoleLog(thisCraft.id+'号飞船能量不足','warn');
                    consoleLog(thisCraft.id+'号飞船正在用太阳能充能','success');
                    alert(thisCraft.id+'号飞船能量不足');
                }
            },1000);
        }
    };
    this.signalSystem = {
        self: this,
        //信号解析器
        Adapter:function(signal){
            if(signal instanceof  Object){
                var id = this.self.id,
                    idBinary,
                    flyState = signal.flyState,
                    flyBinary,
                    powerState = signal.powerState,
                    powerBinary;

                idBinary = addZero(id.toString(2),4);
                var commandformat = {start:1,new:2,stop:3,del:4}
                //找出指令对应的十进制，转换为二进制
                for(str in commandformat){
                    if(str===flyState){
                        flyBinary = commandformat[str].toString(2);
                    }
                }
                flyBinary = addZero(flyBinary,4);
                powerBinary = addZero(parseInt(powerState*100).toString(2),8);
                var signalBinary = idBinary.concat(flyBinary).concat(powerBinary)
                return signalBinary;

            }else{
                var idBinary = signal.slice(0,4);
                var commandBinary = signal.slice(4);
                var id = parseInt(idBinary,2);
                var command = parseInt(commandBinary,2);
                var commandformat = {start:1,new:2,stop:3,del:4}
                //找出指令对应的十进制，转换为二进制
                for(str in commandformat){
                    if(commandformat[str]===command){
                        command = str;
                    }
                }
                return {id:id,command:command};
            }

        },
        receive:function(signal){
            signal = this.Adapter(signal);
            if(signal.id===this.self.id){
                consoleLog(this.self.id+'号飞船接收到'+signal.command+'信号','success');
                switch(signal.command){
                    case 'start': this.self.dynamicSystem.startFly();break;
                    case 'stop': this.self.dynamicSystem.stopFly();break;
                    case 'del': this.self.selfDestruct();break;
                }
            }
        },
        send:function(){
            var thisCraft = this.self;

            //每隔一秒发送信号
            setInterval(function(){
                var signal = thisCraft.signalSystem.Adapter({flyState:thisCraft.dynamicSystem.state,powerState:thisCraft.powerSystem.currentPower/thisCraft.powerSystem.maxPower});
                Universe.BUS(signal);

            },1000);

        }
    };
    this.selfDestruct = function(){
        consoleLog(this.id+'号飞船启动自毁','success');
       var craftDom = document.getElementById('Craft_'+this.id),
            commandDom = document.getElementById('Command'+this.id);
        this.dynamicSystem.state = 'del';
        commandDom.parentNode.removeChild(commandDom);
        craftDom.parentNode.removeChild(craftDom);
        Universe.PopCraft();
    };
}
Craft.prototype.count = 0;
//对二进制字符串补0
function addZero(binary,length){
    var add = [];
    for(var i=0;i<length-binary.length;i++){
        add.push(0);
    }
    var add = add.join('');
    //生成指令
    return add.concat(binary);
}
//宇宙对象
var Universe = {
    Planet:{
        commander: {
            sendSignal:function(signal){
                Universe.Planet.sendAdapter(signal);
            },
            sendedSignal:[],
        },
        dataCenter:{
            screen:{},
            acepted:[],
            constructScreen:function(signal){
                var oScreen = document.getElementById('screen'),
                    oTable = oScreen.getElementsByClassName('table')[0];
                //把新建立的连接推入栈中
                if(this.acepted.every(function(item,index,array){return item.id!==signal.id})){
                    this.acepted.push({id:signal.id,flyState:signal.flyState,powerState:signal.powerState});
                }else{
                    this.acepted.forEach(function(item1,index1,array1){
                        if(item1.id==signal.id){
                            item1.flyState = signal.flyState;
                            item1.powerState = signal.powerState;
                        }
                    });
                }
                var innerHTML = '<tr><th>飞船序号</th><th>飞行状态</th><th>能量状态</th></tr>';
                for(var i=0;i<this.acepted.length;i++){
                    innerHTML += '<tr><td>'+this.acepted[i].id+'</td><td>'+this.acepted[i].flyState+'</td><td>'+this.acepted[i].powerState+'%'+'</td></tr>';
                }
                oTable.innerHTML = innerHTML;

            },
            Adapter:function(signal){
                var idBinary = signal.slice(0,4),
                    flystateBinary = signal.slice(4,8),
                    powerstateBinary = signal.slice(8),
                    signalResult = {},
                    commandformat = {start:1,new:2,stop:3,del:4};

                signalResult.id = parseInt(idBinary,2);
                signalResult.powerState = parseInt(powerstateBinary,2);
                for(str in commandformat){
                    if(commandformat[str]==parseInt(flystateBinary,2)){
                        signalResult.flyState = str;
                    }
                }
                this.constructScreen(signalResult);
            }
        },
        receiver:function(signal){
            this.dataCenter.Adapter(signal);
        },
        //信号发射器
        sendAdapter:function(signal){
            if(signal!==-1){
                var commandformat = {start:1,new:2,stop:3,del:4}
                //找出指令对应的十进制，转换为二进制
                for(str in commandformat){
                    if(str===signal.command){
                        var commandBinary =commandformat[str].toString(2);
                    }
                }

                //指令4位
                commandBinary = addZero(commandBinary,4);
                //编号4位
                var idBinary= (signal.command==='new')?  '0000': signal.id.toString(2);
                idBinary = addZero(idBinary,4);
                //组合为完整信号
                var signalBinary = idBinary.concat(commandBinary);
                consoleLog('指挥官通过Adapter发送信号'+signalBinary);
                Universe.Planet.commander.sendedSignal.push(signal);
                Universe.BUS(signal.options,signalBinary);
            }else{
                consoleLog('信号已丢失，正在重试');
                var unSignal = Universe.Planet.commander.sendedSignal.pop();
                Universe.Planet.commander.sendSignal(unSignal);
            }

        },
        tracks:[['low',130],['medium',200],['high',250]]
    },
    BUS:function(options,signal){

        var random = Math.random();
        //飞船向指挥官发送信号
        if(arguments.length===1){
            var signal = arguments[0];
            if(random>0.1){
                setTimeout(function(){
                    Universe.signalHeap(signal);
                },300);
            }
        }else{
            if(random>0.1){
                setTimeout(function(){
                    Universe.signalHeap(options,signal);
                },300);
            }else{
                setTimeout(function(){
                    Universe.Planet.commander.sendSignal(-1);
                },300);
            }
        }


    },
    signalHeap:function(options,signal){
        if(arguments.length===1){
            Universe.Planet.receiver(arguments[0]);
        }else{
            if(signal.slice(0,4)==='0000'){
                Universe.createCraft(options);
            }else{
                Universe.Crafts.forEach(function(item,index,array){
                    item.signalSystem.receive(signal);
                });
            }
        }


    },
    Crafts:[],
    createCraft:function(options){
        var craft = new Craft();

        if(this.Crafts.length<4){
            consoleLog(craft.id+'号飞船已被创建','success');
            var craftDom = document.createElement('div'),
                commandDom = document.createElement('div'),
                planetDom = document.getElementById('Planet'),
                oSignalsender = document.getElementById('signal-sender');

            //将飞船DOM插入到DOM树中
            craftDom.setAttribute('data-energy',craft.powerSystem.currentPower/craft.powerSystem.maxPower*100+'%'+''+craft.id);
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
            //随机将飞船放入一个轨道
            var Rindex = parseInt(Math.random()*3);
            craftDom.className += ' '+Universe.Planet.tracks[Rindex][0];
            $craftDom.css({height:+Universe.Planet.tracks[Rindex][1]+'px'});
            craft.height = Universe.Planet.tracks[Rindex][1];
            //初始化飞机动力系统和能量系统
            craft.dynamicSystem.speed = (options.speed!==undefined)?  options.speed : 30;
            craft.powerSystem.consumeSpeed = (options.consumeSpeed!==undefined)? options.consumeSpeed: 0.05;
            craft.powerSystem.chargeSpeed = (options.chargeSpeed!==undefined)? options.chargeSpeed : 0.02;
            consoleLog(options.speed+' '+options.consumeSpeed+' '+options.chargeSpeed);
            //初始化飞船动画
            craft.dynamicSystem.moveInit();

            //初始化太阳能系统
            craft.powerSystem.watchEnergy();
            craft.powerSystem.solarPower();
            //命令DOM插入到DOM树中
            commandDom.className = 'command';
            commandDom.id = 'Command'+craft.id;
            commandDom.innerHTML = '对'+craft.id+'号飞船下达指令:<button class="start" type="button">开始飞行</button> <button class="stop" type="button">停止飞行</button> <button class="del" type="button">销毁</button>'
            oSignalsender.appendChild(commandDom);
            craft.signalSystem.send();
            return craft;
        }else{
            Craft.prototype.count--;
            alert("宇宙飞船数量已满");
            consoleLog("宇宙飞船数量已满",'warn');
        }
    },
    PopCraft:function(){
        this.Crafts.pop();
    }
};
//向控制台输出信息函数
function consoleLog(str,flag){
    var oInfo = document.getElementById('info-list');
    oInfo.innerHTML += '<li class = "'+flag+'">'+str+'</li>';
    oInfo.scrollTop += 40;
}
(function(){
    //给信息发射器增加事件托管
    var oSignalsender = document.getElementById('signal-sender'),
        oCreate = document.getElementById('create'),
        aCheckbox = oCreate.getElementsByTagName('input'),
        createBtn = oCreate.getElementsByClassName('new')[0];
    oSignalsender.onclick = function(e){
        var target = e.target;
        (function(flag){
            if(!confirm("确定要以指挥官的角色发送"+flag+"指令吗?")){
                return;
            }
            Universe.Planet.commander.sendSignal({id:parseInt(target.parentNode.id.charAt(7)),command:flag});
        })(target.className);
    }
    //给每种checkbox添加事件
    for(var i=0;i<aCheckbox.length;i++){
        aCheckbox[i].onclick = function(){
            for(var j=0;j<aCheckbox.length;j++){
                if(this!==aCheckbox[j]){
                    if(this.parentNode===aCheckbox[j].parentNode){
                        aCheckbox[j].checked = false;
                    }
                }
            }
        }
    }
    //给创建按钮添加事件
    createBtn.onclick = function(){
        if(!confirm("确定要以指挥官的角色发送new指令吗?")){
            return;
        }
        var consunmeSpeed ,
            chargeSpeed,
            speed;
        for(var i=0;i<aCheckbox.length;i++){
            if(aCheckbox[i].checked == true){
                    switch(aCheckbox[i].className){
                        case 'forward':speed = 30;consunmeSpeed = 0.05;break;
                        case 'running':speed = 50;consunmeSpeed = 0.07;break;
                        case 'chase':speed = 80;consunmeSpeed = 0.09;break;
                        case 'plenty':chargeSpeed = 0.02;break;
                        case 'sun':chargeSpeed = 0.03;break;
                        case 'persistent':chargeSpeed = 0.04;break;
                    }
            }
        }
        consoleLog(speed+' '+chargeSpeed+' '+consunmeSpeed);
        Universe.Planet.commander.sendSignal({options:{
            speed:speed,
            chargeSpeed:chargeSpeed,
            consumeSpeed:consunmeSpeed
        }, command:'new'});
    }

    
})();