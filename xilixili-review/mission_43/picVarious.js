/**
 * Created by zxr on 2016/4/27.
 */
var picVarious = function(){
    var dom = createDom('div');
    //不同布局的策略方法
    var Layouts = {
        1:function(imgs){
            //创建图像
            var img = createImage(imgs[0]);
            //设置图像属性
            updateStyles(img,{width:'100%',height:'100%',position:'absolute',top:'0',left:'0'});
            //将图像插入dom
            dom.addImage(img,imgs[0]);
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
            var img1 = createImage(imgs[0]),
                img2 = createImage(imgs[1]);

            //计算出的数据
            var rotate = Math.atan(domWidth/(2*domHeight)),
                rotateDeg = rotate*(180/Math.PI),
                placeX = Math.cos(rotate)*(domWidth/3),
                line = domHeight/Math.cos(rotate),//梯形斜边
                dY = (domWidth/3)*Math.sin(rotate),//右边Wraper向上偏移量
                wraperW = (Math.sin(rotate)*domHeight)+placeX,
                wraperH = dY+line,
                oDY = wraperW*Math.sin(rotate),
                oDX = (wraperH-(domHeight*Math.cos(rotate)))*Math.sin(rotate);

            //属性设置
            updateSameProperties([div1,div2],{
                width:wraperW+'px',height:wraperH+'px',position:'absolute',overflow:'hidden'
            },[{},{top:-dY+'px',left:wraperW+'px'}]);

            updateSameProperties([img1,img2],{
                width:domWidth+'px',height:domHeight+'px',position:'absolute',transform:'rotate('+-rotateDeg+'deg)'
            },[
                {left:wraperW-placeX+'px',bottom:0,transformOrigin:'bottom left'},
                {right:wraperW-placeX+'px',top:0,transformOrigin:'right top'}
            ])

            updateStyles(oDiv,{
                position:'absolute',transformOrigin:'top left',transform:'rotate('+rotateDeg+'deg)',
                top:-oDY+'px',left:oDX+'px'
            })
            //添加结构
            div1.addImage(img1,imgs[0]);
            div2.addImage(img2,imgs[1]);
            oDiv.addChilds(div1,div2);
            dom.addChilds(oDiv);
        },
        3:function(imgs){
            //公共数据
            var domWidth = parseInt(dom.style.width),
                domHeight= parseInt(dom.style.height),
                temp0 = showINcenter({width:domWidth,height:domHeight},{width:domWidth-domHeight*0.5,height:domHeight}),
                temp1 = showINcenter({width:domWidth,height:domHeight},{width:domHeight*0.5,height:domHeight*0.5});

            //左边宽div
            var divBig = createDom('div'),
                divNarrow = createDom('div'),
                divUp = createDom('div'),
                divDown = createDom('div');

            //图片
            var img1 = createImage(imgs[0]),
                img2 = createImage(imgs[1]),
                img3 = createImage(imgs[2]);

            //属性设置
            updateStyles(divBig,{
                width:(domWidth-domHeight*0.5)+'px',height:'100%',float:'left',position:'relative',
                overflow:'hidden'
            });
            updateStyles(divNarrow,{
                width:0.33*domWidth+'px',height:'100%',float:'left'
            });
            updateSameProperties([divUp,divDown],{
                width:domHeight*0.5+'px',height:domHeight*0.5+'px',backgroundColor:'yellow',
                overflow:'hidden',position:'relative'
            });
            updateSameProperties([img1,img2,img3],{
                width:domWidth+'px',height:domHeight+'px',position:'absolute'
            }, [{top:temp0.top+'px',left:temp0.left+'px'},
                {top:temp1.top+'px',left:temp1.left+'px'},
                {top:temp1.top+'px',left:temp1.left+'px'}]);

            //插入结构
            divBig.addImage(img1,imgs[0]);
            divUp.addImage(img2,imgs[1]);
            divDown.addImage(img3,imgs[2]);
            divNarrow.addChilds(divUp,divDown);
            dom.addChilds(divBig,divNarrow);
        },
        4:function(imgs){

            //公用数据部分
            var domWidth = parseInt(dom.style.width),
                domHeight = parseInt(dom.style.height),
                temp = showINcenter({width:domWidth,height:domHeight},{width:domWidth*0.5,height:domHeight*0.5});

            //左右两大块
            var divRight = createDom('div'),
                divLeft = createDom('div');

            //图片
            var img1 = createImage(imgs[0]),
                img2 = createImage(imgs[1]),
                img3 = createImage(imgs[2]),
                img4 = createImage(imgs[3]);

            //4个小方块
            var divLup = createDom('div'),
                divLdown = createDom('div'),
                divRup = createDom('div'),
                divRdown = createDom('div');


            //属性设置
            updateSameProperties([divLeft,divRight],{
                width:domWidth*0.5+'px',height:domHeight+'px',float:'left'
            });
            updateSameProperties([divLup,divLdown,divRup,divRdown],{
                width:'100%',height:'50%',overflow:'hidden',position:'relative'
            });
            updateSameProperties([img1,img2,img3,img4],{
                width:domWidth+'px',height:domHeight+'px',top:temp.top+'px',
                left:temp.left+'px',position:'absolute'
            });

            //添加结构
            divLup.addImage(img1,imgs[0]);
            divLdown.addImage(img2,imgs[1]);
            divRup.addImage(img3,imgs[2]);
            divRdown.addImage(img4,imgs[3]);
            divLeft.addChilds(divLup,divLdown);
            divRight.addChilds(divRup,divRdown);
            dom.addChilds(divLeft);
            dom.addChilds(divRight);
        },
        5:function(imgs){
            //公共数据
            var domWidth = parseInt(dom.style.width),
                domHeight = parseInt(dom.style.height),
                temp0 = showINcenter({width:domWidth,height:domHeight},{width:domWidth*0.67,height:domHeight*0.67}),
                temp1 = showINcenter({width:domWidth,height:domHeight},{width:domWidth*0.33,height:domHeight*0.33}),
                temp2 = showINcenter({width:domWidth,height:domHeight},{width:domWidth*0.33,height:domWidth*0.33}),
                temp3 = showINcenter({width:domWidth,height:domHeight},{width:domWidth*0.33,height:domHeight-(domWidth*0.33)});
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
            //图片和套子顺序对应
            var img1 = createImage(imgs[0]),
                img2 = createImage(imgs[1]),
                img3 = createImage(imgs[2]),
                img4 = createImage(imgs[3]),
                img5 = createImage(imgs[4]);

            //属性设置
            updateStyles(left,{
                width:0.67*domWidth+'px',height:'100%',float:'left'
            });
            updateStyles(right,{
                width:0.33*domWidth+'px',height:'100%',float:'left'
            });
            updateStyles(leftBottom,{
                width:'100%',height:'33%'
            });
            updateStyles(leftTop,{
                width:'100%',height:'67%',overflow:'hidden',position:'relative'
            });
            updateSameProperties([leftdoubleBottom,leftCenterBottom],{
                width:'50%',height:'100%',float:'left',overflow:'hidden',position:'relative'
            });
            updateStyles(rightTop,{
                width:'100%',height:domWidth*0.33+'px',overflow:'hidden',position:'relative'
            });
            updateStyles(rightBottom,{
                width:'100%',height:domHeight-(domWidth*0.33)+'px',overflow:'hidden',position:'relative'
            });
            //图片属性
            updateSameProperties([img1,img2,img3,img4,img5],{
                    width:domWidth+'px',height:domHeight+'px',position:'absolute'
                },[{top:temp0.top+'px',left:temp0.left+'px'},{top:temp1.top+'px',left:temp1.left+'px'},
                    {top:temp1.top+'px',left:temp1.left+'px'},{top:temp2.top+'px',left:temp2.left+'px'},
                    {top:temp3.top+'px',left:temp3.left+'px'}]
            );
            //添加结构
            leftTop.addImage(img1,imgs[0]);
            leftdoubleBottom.addImage(img2,imgs[1]);
            leftCenterBottom.addImage(img3,imgs[2]);
            rightTop.addImage(img4,imgs[3]);
            rightBottom.addImage(img5,imgs[4]);

            dom.addChilds(left,right);
            left.addChilds(leftTop,leftBottom);
            right.addChilds(rightTop,rightBottom);
            leftBottom.addChilds(leftdoubleBottom,leftCenterBottom);

        },
        6:function(imgs){
            //公用数据
            var domWidth = parseInt(dom.style.width),
                domHeight = parseInt(dom.style.height),
                temp0 = showINcenter({width:domWidth,height:domHeight},{width:0.67*domWidth,height:0.67*domHeight}),
                temp1 = showINcenter({width:domWidth,height:domHeight},{width:0.33*domWidth,height:0.33*domHeight});
            //套子
            var leftTop = createDom('div'),
                leftDoubleBottom = createDom('div'),
                leftCenterBottom = createDom('div'),
                RightTop = createDom('div'),
                RightCenter = createDom('div'),
                RightBottom = createDom('div');

            //对应图片
            var img1 = new Image(),
                img2 = new Image(),
                img3 = new Image(),
                img4 = new Image(),
                img5 = new Image(),
                img6 = new Image();

            //布局
            var left = createDom('div'),
                right = createDom('div'),
                leftBottom = createDom('div');

            updateStyles(left,{
                width:0.67*domWidth+'px',height:'100%',float:'left'
            });
            updateStyles(right,{
                width:0.33*domWidth+'px',height:'100%',float:'left'
            });
            updateStyles(leftBottom,{
                width:'100%',height:'33%'
            });

            updateStyles(leftTop,{
                width:'100%',height:'67%',position:'relative',overflow:'hidden'
            });
            updateSameProperties([leftDoubleBottom,leftCenterBottom],{
                width:'50%',height:'100%',position:'relative',overflow:'hidden',float:'left'
            });
            updateSameProperties([RightTop,RightCenter,RightBottom],{
                width:'100%',height:'33.33%',position:'relative',overflow:'hidden'
            });

            updateSameProperties([img1,img2,img3,img4,img5,img6],{
                width:domWidth+'px',height:domHeight+'px',top:temp1.top+'px',left:temp1.left+'px',position:'absolute'
            },[{top:temp0.top+'px',left:temp0.left+'px'}]);

            //创建结构
            dom.addChilds(left,right);
            left.addChilds(leftTop,leftBottom);
            right.addChilds(RightTop,RightCenter,RightBottom);
            leftBottom.addChilds(leftDoubleBottom,leftCenterBottom);
            leftTop.addImage(img1,imgs[0]);
            leftDoubleBottom.addImage(img2,imgs[1]);
            leftCenterBottom.addImage(img3,imgs[2]);
            RightTop.addImage(img4,imgs[3]);
            RightCenter.addImage(img5,imgs[4]);
            RightBottom.addImage(img6,imgs[5]);
        }
    }
    return {
        create:function(obj){
            //设置容器宽高
            updateStyles(dom,{width:obj.WH[0],height:obj.WH[1],position:'relative'});
            Layouts[obj.imgs.length](obj.imgs);
            return dom;
        }
    }
}