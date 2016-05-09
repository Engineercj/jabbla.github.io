/*除center外图片随机存放左右区域*/
function random_put(){
    var oPhotos=[];
    for(var j=0;j<aPhoto.length;j++){
      if(/center/.test(aPhoto[j].className)==0){

        oPhotos.push(aPhoto[j]);
      }

    }
    var Right_ps=oPhotos.splice(0,Math.ceil(oPhotos.length/2));
    var Left_ps=oPhotos;

    var Awidth=oAlbum.offsetWidth;
    var Aheight=oAlbum.offsetHeight;
    var Pwidth=200;
    var Pheight=200;
    var midW=((Awidth-Pwidth)/2)-Pwidth;
    for(var n=0;n<Right_ps.length;n++){
      Right_ps[n].style.left=random([Pwidth+(Awidth-Pwidth)/2,Awidth])+'px';
      Right_ps[n].style.top=random([-Pheight+4,Aheight-4])+'px';
      Right_ps[n].angle=random([-150,150]);
      Right_ps[n].style['-webkit-transform']=' rotate('+Right_ps[n].angle+'deg)';
    }
    for(var i=0;i<Left_ps.length;i++){
      Left_ps[i].style.left=random([-Pwidth,midW])+'px';
      Left_ps[i].style.top=random([-Pheight+4,Aheight-4])+'px';
      Left_ps[i].angle=random([-150,150]);
      Left_ps[i].style['-webkit-transform']=' rotate('+Left_ps[i].angle+'deg)';

    }
}
random_put();
