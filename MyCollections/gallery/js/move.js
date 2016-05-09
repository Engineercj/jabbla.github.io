// JavaScript Document
function startMove(obj,attr,target){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		if(attr=='alpha'){
			obj.speed=(target-obj.alpha)/4;
			obj.speed=obj.speed>0?Math.ceil(obj.speed):Math.floor(obj.speed);
			if(target==obj.alpha){
				clearInterval(obj.timer);
			}
			else{
				obj.style.opacity=(obj.alpha+obj.speed)/100;
				obj.alpha=obj.alpha+obj.speed;
			}
		}
		else {
			var speed=(target-obj['offset'+attr])/5;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(obj['offset'+attr]==target){
				clearInterval(obj.timer);
			}
			else{
				obj.style[attr.toLowerCase()]=obj['offset'+attr]+speed+'px';
			}
		}
	},30)
}
