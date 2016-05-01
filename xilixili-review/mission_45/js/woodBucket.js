/**
 * Created by zxr on 2016/4/30.
 */
var averHeight = parseInt(document.documentElement.clientHeight/3);

//木桶类
function woodBucket(obj){
    this.rows = [];
    this.images = [];
    this.undoRows = [];
    this.width = obj.width;
}
woodBucket.prototype.init = function(){
    this.wraper = createDom('div');
    updateStyles(this.wraper,{width:this.width});
    this.wraper.className = 'woodBucket';
    document.body.appendChild(this.wraper);
    return this.wraper
}
woodBucket.prototype.addImages = function(imgs){

    var count = 0;
    var imgLength = imgs.length;
    var averHeight = parseInt(document.documentElement.clientHeight/3);
    var DW = parseInt(this.wraper.offsetWidth);
    var images = this.images;
    var self = this;
    //加载全部图片
    imgs.forEach(function(item){
        var image = {dom:createImage(item),scale:0,src:item};
        image.dom.addEventListener('load',function(){
            count++;
            image.scale = image.dom.width/image.dom.height;
            images.push(image);
            if(imgLength===count) AllLoad();
        },false);
    });
    //全部加载后
    function AllLoad(){
        //以图片文件名排序
        images.sort(function(v1,v2){
            return parseInt(v2.src.slice(5))-parseInt(v1.src.slice(5));
        });
        var nowIndex = 0,nowW = 0,stack = [],i=0;
        var scaleSum,height;
        while(nowIndex<=imgLength-1){
            var width = parseInt(averHeight*images[nowIndex].scale);
            nowW += width;
            i++;
            stack.push(images[nowIndex]);
            if(nowW>DW){
                //调整高度以适应图片宽高比
                if(i>6){
                    stack.pop();
                    nowIndex--;
                }
                scaleSum = 0;
                stack.forEach(function(item){
                    scaleSum += item.scale;
                });
                height = parseInt(DW/scaleSum);
                //创建图片和row
                creatImageInsert(stack,height);
                nowW = 0;
                stack = [];
                i=0;
            }else if(nowW===DW){
                //整体添加进row,并且初始化nowIndex,nowW,和stack
                creatImageInsert(stack,averHeight);
                nowW = 0;
                stack = [];
                i=0;
            }
            nowIndex++;
        }
        creatImageInsert.call(this,stack,averHeight);
    }
    //创建图片，批量添加到新的row中
    function creatImageInsert(arr,height){
        var row = createDom('div');
        updateStyles(row,{height:height+'px'});
        arr.forEach(function(item){
            updateStyles(item.dom,{height:'100%'});
            row.appendChild(item.dom);
        })
        self.wraper.appendChild(row);
    }

}
