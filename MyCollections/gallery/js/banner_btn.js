function banner_btn(){

  var oBanner=document.getElementById('banner_list');
  var aBanBtn=getElementBytagname('banner_btn','li');
  for(var i=0;i<aBanBtn.length;i++){
    aBanBtn[i].index=i;
    aBanBtn[i].onclick=function(){
      startMove(oBanner,'Left',-(this.index*922));
    }
  }
}
