var allScreen = (function(){
	var dom = createDom('div');
	var blackWraper = createDom('div');
	var showWraper = createDom('div');

	//添加css控制类
	dom.className = 'allScreen';
	blackWraper.className = 'allScreen_blackWraper';
	showWraper.className = 'allScreen_showWraper';

	//生成结构
	addChilds(dom,blackWraper);
	addChilds(blackWraper,showWraper);
	addChilds(document.body,dom);

	//添加点击关闭事件
	dom.addEventListener('click',function(e){

		!hasRoot(e.target,showWraper) &&  $(dom).fadeOut();

	},false);

	return {
		pop:function(img){
			$(dom).fadeIn();

			var imgScale = img.width/img.height;
			var scale = dom.offsetWidth/dom.offsetHeight;
			var width = (scale>imgScale)? (dom.offsetHeight-40)*imgScale : (dom.offsetWidth-200);
			var height = width/imgScale;
			var oImg = new Image();
			oImg.src = img.src;

			updateStyles(oImg,{width:'100%',height:'100%'});
			updateStyles(showWraper,{width:width+'px',height:height+'px'});
			
			showWraper.innerHTML = '';
			addChilds(showWraper,oImg);

		},
		close:function(){
			$(dom).fadeOut();
		}
	}
})()

