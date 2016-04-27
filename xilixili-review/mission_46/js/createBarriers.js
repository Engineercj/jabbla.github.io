/**
 * Created by zxr on 2016/4/25.
 */
var createBarriers = {
    chapter1:function(){
        var x = parseInt(Map.perWidth),y = parseInt(Map.perWidth);
        ctx.fillStyle = 'red';
        //G的第一横
        while(x<=Map.boarder.right-2*Map.perWidth){
            ctx.fillRect(x,y,Map.perWidth,Map.perHeight);
            this.barriers.push({x:x,y:y});
            x+=parseInt(Map.perWidth);
        }
        x-=parseInt(Map.perWidth);
         //G的左边
        y = parseInt(Map.perWidth)*2;
        while(y<=Map.boarder.bottom-2*Map.perHeight){
            ctx.fillRect(Map.perWidth,y,Map.perWidth,Map.perHeight);
            this.barriers.push({x:x,y:y});
            y+=parseInt(Map.perWidth);
        }
        y-=parseInt(Map.perWidth);
        //G的下边
        x = parseInt(Map.perWidth);
        while(x<=(Map.boarder.right-3*Map.perWidth)){
            ctx.fillRect(x,y,Map.perWidth,Map.perHeight);
            this.barriers.push({x:x,y:y});
            x+=parseInt(Map.perWidth);
        }
        x -=parseInt(Map.perWidth);
        //G的右边
        while(y>=2*Map.perWidth){
            ctx.fillRect(x,y,Map.perWidth,Map.perHeight);
            this.barriers.push({x:x,y:y});
            y-=parseInt(Map.perWidth);
        }
        y+=parseInt(Map.perWidth);
        //G的上边
        while(x>=2*Map.perWidth){
            ctx.fillRect(x,y,Map.perWidth,Map.perHeight);
            this.barriers.push({x:x,y:y});
            x-=parseInt(Map.perWidth);
        }

    }
}