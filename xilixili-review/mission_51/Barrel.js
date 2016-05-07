/**
 * Created by zxr on 2016/4/30.
 */
var Barrel = (function(){
    var instance;
    //木桶类
    function Barrel(obj){
        this.rows = [];
        this.images = [];
        this.undoRows = [];
        this.width = obj.width;
    }
    Barrel.prototype.init = function(){
        this.wraper = createDom('div');
        updateStyles(this.wraper,{width:this.width});
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
            updateStyles(current.dom,{height:averHeight+'px'});
            self.wraper.appendChild(current.dom);
        }
        //设置当前current应有的高度以适应宽度
        function fitWidth(){
            var height = parseInt(DW/current.scale);
            console.log(height);
            updateStyles(current.dom,{height:height+'px'});
            current.height = height;
        }
        //从第一张图片开始加载
        function loadImage(index){

            if(index>=imgLength) return true;
            var image = createImage(imgs[index]);
            image.addEventListener('load',function(){

                insertImage(this);
                loadImage(index+1);
            },false);

        }
        //添加图片算法
        function insertImage(img){

            var scale = img.width/img.height;
            var width = parseInt(current.height*(current.scale+scale));
            if(width>DW){
                if(current.length<3){
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
        init:function(obj){
            if(instance) return instance.wraper;
            instance = new Barrel(obj);
            instance.init();
            return instance.wraper;
        },
        addImages:function(imgs){
            instance.addImages(imgs);
            
        }
    }
})()

