/**
 * Created by zxr on 2016/4/30.
 */
var Barrel = function(){
    var instance;
    var EnallScreen,flag;
    //木桶类
    function Barrel(){
        this.rows = [];
        this.images = [];
        this.wraper = createDom('div');
    }
    Barrel.prototype.init = function(width,height,options){
        this.BinMin = options? options.BinMin : 3;
        this.BinMax = options? options.BinMax : 6;
        updateStyles(this.wraper,{width:width,height:height});
        this.wraper.className = 'Barrel';
        document.body.appendChild(this.wraper);
        return this.wraper
    }
    Barrel.prototype.addImages = function(imgs){

        var imgLength = imgs.length;
        var averHeight = parseInt(document.documentElement.clientHeight/3);
        var DW = parseInt(this.wraper.offsetWidth);
        var self = this;
        var current;

        newRowInsert();
        loadImage(0);

        //创建新行并插入到wraper
        function newRowInsert(){
            current = {length:0,scale:0,height:averHeight,dom:createDom('div')};
            current.dom.className = 'barrel-row';
            updateStyles(current.dom,{height:averHeight+'px'});
            self.wraper.appendChild(current.dom);
        }
        //设置当前current应有的高度以适应宽度
        function fitWidth(){
            var height = parseInt(DW/current.scale);
            updateStyles(current.dom,{height:height+'px'});
            current.height = height;
        }
        //从第一张图片开始加载
        function loadImage(index){

            if(index>=imgLength) return true;
            var image = createImage(imgs[index]);
            image.className = 'Barrel-img';
            image.addEventListener('load',function(){
                this.addEventListener('click',function(){
                    EnallScreen.pop(this);
                },false);
                insertImage(this);
                loadImage(index+1);
            },false);

        }
        //添加图片算法
        function insertImage(img){

            var scale = img.width/img.height;
            var width = parseInt(current.height*(current.scale+scale));
            if(width>DW){
                if(current.length<self.BinMin){
                    //行插入当前img
                    current.length++;
                    current.scale += scale;
                    updateStyles(img,{height:'100%'});
                    fitWidth();
                    current.dom.appendChild(img);
                }else{
                    //根据已有img的scale计算行高
                    fitWidth();
                    //以平均高度创建新行,将其插进新行
                    newRowInsert();
                    //当前行插入新的img
                    current.length++;
                    current.scale += scale;
                    updateStyles(img,{height:'100%'});
                    current.dom.appendChild(img);
                }
            }else{
                //插进当前行
                current.length++;
                current.scale += scale;
                updateStyles(img,{height:'100%'});
                current.dom.appendChild(img);

            }

        }

    }

    return {
        init:function(width,height,options){
        
            
            instance.init(width,height,options);
            return instance.wraper;
        },
        setImage:function(imgs){

            instance.addImages(imgs);
            
        },
        getDom:function(){

            instance = new Barrel();
            return instance.wraper;

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
        },
        getBarrelBinMax:function(){
            return instance.BinMax;
        },
        getBarrelBinMin:function(){
            return instance.BinMin;
        }
    }
}

