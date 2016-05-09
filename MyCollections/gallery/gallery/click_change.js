/*图片点击事件判断 1.center 2.非center*/
function click_change(){
  for(var n3=0;n3<aPhoto.length;n3++){
    aPhoto[n3].index=n3;
    aPhoto[n3].onclick=function(){
      if(/center/.test(this.className)){
        turn(this);
      }
      else{
        for(var n4=0;n4<aLi.length;n4++){
          aLi[n4].className=aLi[n4].className.replace('active','');
          aLi[n4].isclick=0;
        }
        aLi[this.index].className =aLi[this.index].className+'active';
        aLi[this.index].isclick=1;
        rsort(this.index+1);
        random_put();
      }
    }
  }
}
click_change();
