/**
 * Created by zxr on 2016/4/6.
 */
//飞船对象
function Craft(){
    Craft.prototype.count++;
    this.id = Craft.prototype.count;
    this.dynamicSystem = {
        self:this,
        startFly: function(){
            var temp = document.getElementById('Craft_'+this.self.id);


            temp.className = 'craft startFly';
            console.log(this.self.id+'号飞船起飞了');
        },
        stopFly: function(){
            var temp = document.getElementById('Craft_'+this.self.id);


            temp.className = 'craft';
            console.log(this.self.id+'号飞船停止飞行了');
        },
        speed:20
    };
    this.powerSystem = {
        currentPower:0.5,
        chargePower:function(speed){},
    };
    this.signalSystem = {
        self: this,
        receive:function(signal){
            if(signal.id===this.self.id){
                if(signal.command==='start'){
                    this.self.dynamicSystem.startFly();
                }else if(signal.command==='stop'){
                    this.self.dynamicSystem.stopFly();
                }
            }
        }
    };
    this.selfDestruct = function(){
    };
}
Craft.prototype.count = 0;
//宇宙对象
var Universe = {
    Planet:{
        commander: {
            sendSignal:function(signal){
                Universe.Planet.Mediator(signal);

            }
        }
        ,
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
            var craftDom = document.createElement('div'),
                commandDom = document.createElement('div'),
                planetDom = document.getElementById('Planet'),
                UniverseDom = document.getElementById('Universe');

            //将飞船DOM插入到DOM树中
            craftDom.className = 'craft';
            craftDom.id = 'Craft_'+craft.id;
            planetDom.appendChild(craftDom);
            this.Crafts.push(craft);

            //命令DOM插入到DOM树中
            commandDom.className = 'command';
            commandDom.id = 'Craft_'+craft.id;
            commandDom.innerHTML = '对'+craft.id+'号飞船下达指令:<button class="start" type="button">开始飞行</button> <button class="stop" type="button">停止飞行</button> <button class="del" type="button">销毁</button>'
            UniverseDom.appendChild(commandDom);
            return craft;
        }else{
            console.log("宇宙飞船数量已经满了");
        }
    }
};
(function(){
    //给Universe添加事件托管
    var UniverseDom = document.getElementById('Universe');

    UniverseDom.onclick = function(e){
        var target = e.target;
        
        (function(flag){
            Universe.Planet.commander.sendSignal({id:parseInt(target.parentNode.id.charAt(6)),command:flag});
        })(target.className);
    }
})();