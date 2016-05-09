/**
 * Created by zxr on 2016/4/27.
 */
var puzzle = function(){
    var dom = createDom('div');
    var imgStack = [];
    var EnallScreen;
    var flag;
    //裁剪图片，生成套子,并将套子插入定位元素
    function cutImage(img,domr){
        //公共数据
        var domWidth = (domr.Wraper)? parseInt(domr.Wraper.style.width) : parseInt(dom.style.width);
        var domHeight = (domr.Wraper)?parseInt(domr.Wraper.style.height) : parseInt(dom.style.height);
        //获取宽高比
        var scale = img.width/img.height;
        var scaleDom = domWidth/domHeight;
        //计算水平或者垂直方向上的偏移
        var move;
        if(scaleDom>=scale){
            move = ((domWidth/scale)-domHeight)/2;
            updateStyles(img,{width:'100%',position:'absolute',top:-move+'px'});
        }else{
            move = ((domHeight*scale)-domWidth)/2;
            updateStyles(img,{height:'100%',position:'absolute',left:-move+'px'});
        }
        updateStyles(domr,{overflow:'hidden',width:'100%',height:'100%',position:'relative'});
        if(domr.Wraper) {
            //将图像插入dom
            addChilds(domr,img);
            //套子插入定位元素
            addChilds(domr.Wraper,domr);
        }else{
            addChilds(dom,img);
        }


    }
    //不同布局的策略方法
    var Layouts = {
        1:function(imgs){
            //公共数据
            var domWidth = parseInt(dom.style.width),
                domHeight= parseInt(dom.style.height);
            //创建图像
            var oImg = createDom('div');

            oImg.Wraper = createDom('div');
            dom.innerHTML = '';
            imgStack = [];
            imgStack.push(oImg);

            updateStyles(oImg.Wraper,{
                width:domWidth+'px',height:domHeight+'px',overflow:'hidden'
            });
            imgStack.forEach(function(item){
                item.className = 'img-wraper';
            });
            //图片
            imgs.forEach(function(item,index,array){
                var img = createImage(item);
                img.addEventListener('load',function(){
                    cutImage(this,imgStack[index]);
                },false)
            });
            addChilds(oImg.Wraper,oImg);
            addChilds(dom,oImg.Wraper);

        },
        2:function(imgs){
            //公共数据
            var domWidth = parseInt(dom.style.width),
                domHeight= parseInt(dom.style.height);

            //再套一层div再进行旋转
            var oDiv = createDom('div'),
                div1 = createDom('div'),
                div2 = createDom('div');
            //img
            var img1 = createImage(imgs[0]),oImg1 = createDom('div'),
                img2 = createImage(imgs[1]),oImg2 = createDom('div');

            dom.innerHTML = '';
            imgStack = [];
            imgStack.push(oImg1);
            imgStack.push(oImg2);
            imgStack.forEach(function(item){
                item.className = 'img-wraper';
                item.classList.add('right');
                item.classList.add('bottom');
            });

            //计算出的数据
            var cosDeg = Math.cos(Math.atan(domWidth/(3*domHeight)));
            var Deg = Math.acos(cosDeg)*(180/Math.PI);
            var rDeg = Math.acos(cosDeg);
            var X = cosDeg*(domWidth/3);
            var Y = Math.sin(rDeg)*(domWidth/3);
            var wH = Y+(domHeight/cosDeg);
            var oTop = Math.sin(rDeg)*domWidth;
            var oLeft = domWidth*Math.tan(rDeg)*Math.sin(rDeg);

            //属性设置
            updateSameProperties([div1,div2],{
                width:domWidth+'px',height:wH+'px',position:'absolute',overflow:'hidden'
            },[{},{top:-Y+'px',left:domWidth+'px'}]);
            updateStyles(oDiv,{
                position:'relative',transformOrigin:'0 0',transform:'rotate('+Deg+'deg)',
                top:-oTop+'px',left:-oLeft+'px'
            });
            updateSameProperties([oImg1,oImg2],{
                width:domWidth+'px',height:domHeight+'px',position:'absolute',overflow:'hidden',
                transform:'rotate('+-Deg+'deg)'
            },[
                {right:X-domWidth+'px',bottom:0,transformOrigin:'bottom left'},
                {left:X-domWidth+'px',top:0,transformOrigin:'right top'}
            ]);
            updateSameProperties([img1,img2],{
                height:'100%',position:'absolute'
            },[{left:-domWidth/4+'px'},{right:-domWidth/4+'px'}]);

            //添加结构
            addChilds(oImg1,img1);
            addChilds(oImg2,img2);
            addChilds(div1,oImg1);
            addChilds(div2,oImg2);
            addChilds(oDiv,[div1,div2]);
            addChilds(dom,oDiv);
        },
        3:function(imgs){
            //公共数据
            var domWidth = parseInt(dom.style.width),
                domHeight= parseInt(dom.style.height);

            //左边宽div
            var divBig = createDom('div'),
                divNarrow = createDom('div'),
                divUp = createDom('div'),
                divDown = createDom('div');

            divBig.Wraper = createDom('div');
            divNarrow.Wraper = createDom('div');
            divUp.Wraper = createDom('div');
            divDown.Wraper = createDom('div');

            imgStack = [];
            imgStack.push(divBig);
            imgStack.push(divUp);
            imgStack.push(divDown);




            dom.innerHTML = '';
            imgStack.forEach(function(item){
                item.className = 'img-wraper';
            });

            //设置定位套子的位置信息
            divUp.Wraper.className ='right top';
            divDown.Wraper.className ='right bottom';
            divBig.Wraper.className ='bottom left top';

            //属性设置
            updateStyles(divBig.Wraper,{
                width:0.67*domWidth+'px',height:domHeight+'px',float:'left',position:'relative',
                overflow:'hidden'
            });
            updateStyles(divNarrow.Wraper,{
                width:0.33*domWidth+'px',height:'100%',float:'left'
            });
            console.log(domWidth);
            updateSameProperties([divUp.Wraper,divDown.Wraper],{
                width:domHeight*0.5+'px',height:domHeight*0.5+'px',
                overflow:'hidden',position:'relative'
            });

            //图片
            imgs.forEach(function(item,index,array){
                var img = createImage(item);
                img.addEventListener('load',function(){
                    cutImage(this,imgStack[index]);
                },false)
            });
            addChilds(divBig.Wraper,divBig);
            addChilds(divNarrow.Wraper,[divUp.Wraper,divDown.Wraper]);
            addChilds(dom,[divBig.Wraper,divNarrow.Wraper]);
        },
        4:function(imgs){

            //公用数据部分
            var domWidth = parseInt(dom.style.width),
                domHeight = parseInt(dom.style.height);

            //左右两大块
            var divRight = createDom('div'),
                divLeft = createDom('div');


            //4个小方块
            var divLup = createDom('div'),
                divLdown = createDom('div'),
                divRup = createDom('div'),
                divRdown = createDom('div');


                divLup.Wraper = createDom('div');
                divLdown.Wraper = createDom('div');
                divRup.Wraper = createDom('div');
                divRdown.Wraper = createDom('div');

            imgStack = [];
            imgStack.push(divLup);
            imgStack.push(divLdown);
            imgStack.push(divRup);
            imgStack.push(divRdown);


            dom.innerHTML = '';
            imgStack.forEach(function(item){
                item.className = 'img-wraper';
            });

            divRup.Wraper.className = 'right top';
            divRdown.Wraper.className = 'right bottom';
            divLdown.Wraper.className = 'left bottom';
            divLup.Wraper.className = 'left top';


            //属性设置
            updateSameProperties([divLeft,divRight],{
                width:domWidth*0.5+'px',height:domHeight+'px',float:'left'
            });
            updateSameProperties([divLup.Wraper,divLdown.Wraper,divRup.Wraper,divRdown.Wraper],{
                width:domWidth*0.5+'px',height:0.5*domHeight+'px',overflow:'hidden',position:'relative'
            });

            //图片
            imgs.forEach(function(item,index,array){
                var img = createImage(item);
                img.addEventListener('load',function(){
                    cutImage(this,imgStack[index]);
                },false)
            });

            //添加结构
            addChilds(divLeft,[divLup.Wraper,divLdown.Wraper]);
            addChilds(divRight,[divRup.Wraper,divRdown.Wraper]);
            addChilds(dom,divLeft);
            addChilds(dom,divRight);
        },
        5:function(imgs){
            //公共数据
            var domWidth = parseInt(dom.style.width),
                domHeight = parseInt(dom.style.height);
            //套子
            var leftTop = createDom('div'),
                leftdoubleBottom = createDom('div'),
                leftCenterBottom = createDom('div'),
                rightTop = createDom('div'),
                rightBottom = createDom('div');
            //布局
            var left = createDom('div'),
                leftBottom = createDom('div'),
                right = createDom('div');


            leftTop.Wraper = createDom('div');
            leftdoubleBottom.Wraper = createDom('div');
            leftCenterBottom.Wraper = createDom('div');
            rightTop.Wraper = createDom('div');
            rightBottom.Wraper = createDom('div');

            imgStack = [];
            imgStack.push(leftTop);
            imgStack.push(leftdoubleBottom);
            imgStack.push(leftCenterBottom);
            imgStack.push(rightTop);
            imgStack.push(rightBottom);


            dom.innerHTML = '';

            imgStack.forEach(function(item){
                item.className = 'img-wraper';
            });

            leftTop.Wraper.className = 'left top';
            leftdoubleBottom.Wraper.className = 'left bottom';
            leftCenterBottom.Wraper.className = 'bottom';
            rightTop.Wraper.className = 'right top';
            rightBottom.Wraper.className = 'right bottom';


            //属性设置
            updateStyles(left,{
                width:0.67*domWidth+'px',height:domHeight+'px',float:'left'
            });
            updateStyles(right,{
                width:0.33*domWidth+'px',height:domHeight+'px',float:'left'
            });
            updateStyles(leftBottom,{
                width:0.67*domWidth+'px',height:0.33*domHeight+'px'
            });
            updateStyles(leftTop.Wraper,{
                width:0.67*domWidth+'px',height:0.67*domHeight+'px',overflow:'hidden',position:'relative'
            });
            updateSameProperties([leftdoubleBottom.Wraper,leftCenterBottom.Wraper],{
                width:0.5*0.67*domWidth+'px',height:0.33*domHeight+'px',float:'left',overflow:'hidden',position:'relative'
            });
            updateStyles(rightTop.Wraper,{
                width:0.33*domWidth+'px',height:domWidth*0.33+'px',overflow:'hidden',position:'relative'
            });
            updateStyles(rightBottom.Wraper,{
                width:0.33*domWidth+'px',height:domHeight-(domWidth*0.33)+'px',overflow:'hidden',position:'relative'
            });
            //图片属性

            imgs.forEach(function(item,index,array){
                var img = createImage(item);

                img.addEventListener('load',function(){
                    cutImage(this,imgStack[index]);
                },false)
            });

            //添加结构
            addChilds(dom,[left,right]);
            addChilds(left,[leftTop.Wraper,leftBottom]);
            addChilds(right,[rightTop.Wraper,rightBottom.Wraper]);
            addChilds(leftBottom,[leftdoubleBottom.Wraper,leftCenterBottom.Wraper]);

        },
        6:function(imgs){
            //公用数据
            var domWidth = parseInt(dom.style.width),
                domHeight = parseInt(dom.style.height);
            //套子
            var leftTop = createDom('div'),
                leftDoubleBottom = createDom('div'),
                leftCenterBottom = createDom('div'),
                RightTop = createDom('div'),
                RightCenter = createDom('div'),
                RightBottom = createDom('div');

            leftTop.Wraper = createDom('div');
            leftDoubleBottom.Wraper = createDom('div');
            leftCenterBottom.Wraper = createDom('div');
            RightTop.Wraper = createDom('div');
            RightCenter.Wraper = createDom('div');
            RightBottom.Wraper = createDom('div');


            //布局
            var left = createDom('div'),
                right = createDom('div'),
                leftBottom = createDom('div');

            imgStack = [];
            imgStack.push(leftTop);
            imgStack.push(leftDoubleBottom);
            imgStack.push(leftCenterBottom);
            imgStack.push(RightTop);
            imgStack.push(RightCenter);
            imgStack.push(RightBottom);



            dom.innerHTML = '';
            imgStack.forEach(function(item){
                item.className = 'img-wraper';
            });

            leftTop.Wraper.className = 'left top';
            leftDoubleBottom.Wraper.className = 'left bottom';
            leftCenterBottom.Wraper.className = 'bottom';
            RightTop.Wraper.className = 'right top';
            RightCenter.Wraper.className = 'right';
            RightBottom.Wraper.className = 'right bottom';


            updateStyles(left,{
                width:0.67*domWidth+'px',height:domHeight+'px',float:'left'
            });
            updateStyles(right,{
                width:0.33*domWidth+'px',height:domHeight+'px',float:'left'
            });
            updateStyles(leftBottom,{
                width:0.67*domWidth+'px',height:0.333*domHeight+'px'
            });

            updateStyles(leftTop.Wraper,{
                width:0.67*domWidth+'px',height:0.67*domHeight+'px',position:'relative',overflow:'hidden'
            });
            updateSameProperties([leftDoubleBottom.Wraper,leftCenterBottom.Wraper],{
                width:0.5*0.67*domWidth+'px',height:0.333*domHeight+'px',position:'relative',overflow:'hidden',float:'left'
            });
            updateSameProperties([RightTop.Wraper,RightCenter.Wraper,RightBottom.Wraper],{
                width:0.333*domWidth+'px',height:0.333*domHeight+'px',position:'relative',overflow:'hidden'
            });

            //图片属性
            imgs.forEach(function(item,index,array){
                var img = createImage(item);
                img.addEventListener('load',function(){
                    cutImage(this,imgStack[index]);
                },false)
            });

            //创建结构
            addChilds(dom,[left,right]);
            addChilds(left,[leftTop.Wraper,leftBottom]);
            addChilds(right,[RightTop.Wraper,RightCenter.Wraper,RightBottom.Wraper]);
            addChilds(leftBottom,[leftDoubleBottom.Wraper,leftCenterBottom.Wraper]);
        }
    }
    return {
        init:function(width,height){
            updateStyles(dom,{width:width,height:height,position:'relative'});
            dom.addEventListener('click',function(e){
                if(e.target.tagName==='IMG') EnallScreen.pop(e.target);
            },false)
            return dom;
        },
        setImage:function(obj){
            Layouts[obj.length](obj);
            return dom;
        },
        getImageDomElements:function(){
            return imgStack;
        },
        getDom:function(){
            return dom;
        },
        setGutter:function(x,y){
            var X = x/2 || 0;
            var Y = y/2 || x/2 || 0;
            if(imgStack.length!==2){
                imgStack.forEach(function(item){
                item.Wraper.style.paddingLeft = (item.Wraper.classList.contains('left'))? 0:X+'px';
                item.Wraper.style.paddingRight = (item.Wraper.classList.contains('right'))? 0:X+'px';
                item.Wraper.style.paddingTop = (item.Wraper.classList.contains('top'))? 0:Y+'px';
                item.Wraper.style.paddingBottom = (item.Wraper.classList.contains('bottom'))? 0:Y+'px';
                });    
            }
            
        },
        enableFullscreen:function(){
            EnallScreen = allScreen();
            flag = true;
        },
        disableFullscreen:function(){
            EnallScreen.disable();
            flag = false;
        },
        isFullscreenEnabled:function(){
            return flag;
        }
    }
}
