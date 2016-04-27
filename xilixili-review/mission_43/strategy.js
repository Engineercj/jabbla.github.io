/**
 * Created by zxr on 2016/4/27.
 */
var Strategy = {
    one:function(imgs){
        //创建图像
        var img = createImage(imgs[0]);
        //设置图像属性
        updateStyles(img,{width:'100%',height:'100%',position:'absolute',top:'0',left:'0'});
        //将图像插入dom
        dom.appendChild(img);
    },
    two:function(imgs){
        //宽高数据
        var w = 0.67*parseInt(dom.style.width),
            h = parseInt(dom.style.height);

        //再套一层div再进行旋转
        var oDiv = document.createElement('div');
        //左侧剪切div
        var div1 = document.createElement('div');
        //计算剪切div的高度，和img需旋转的角度
        var line1 = Math.sqrt((w*w)/4+h*h),
            dH = w*w/(4*line1),
            H = dH+line1, //剪切DIV的长度
            W = parseInt(w*h/line1),
            arc = Math.asin(w/(2*line1))*(180/Math.PI),//img逆时针旋转的角度
            Dx = dH*(2*h/w);
        updateStyles(div1,{
            width:W+'px',height:H+'px',overflow:'hidden',position:'absolute',left:0+'px',
        });
        //左侧img
        var img1 = createImage(imgs[0]);
        updateStyles(img1,{
            width:w+'px',height:h+'px',position:'absolute',left:(W-Dx)+'px',bottom:0,
            transformOrigin: 0+' '+h+'px',transform:'rotate('+-arc+'deg)'
        });
        div1.appendChild(img1);
        oDiv.appendChild(div1);
        //右侧剪切div
        var div2 = document.createElement('div');
        updateStyles(div2,{
            width:W+'px',height:H+'px',overflow:'hidden',position:'absolute',left:W+'px',top:-dH+'px',
        });
        //右侧img
        var img2 = createImage(imgs[1]);
        updateStyles(img2,{
            width:w+'px',height:h+'px',position:'absolute',right:(W-Dx)+'px',top:0,
            transformOrigin: w+'px 0',transform:'rotate('+-arc+'deg)'
        });
        updateStyles(oDiv,{
            position:'absolute',
            transform:'rotate('+arc+'deg)',transformOrigin:'0 0',left:w-(W*h/line1)+'px',top:-W*w/(2*line1)+'px'
        })
        div2.appendChild(img2);
        oDiv.appendChild(div2);
        dom.appendChild(oDiv);
    }
}