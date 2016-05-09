function figure_action(){
  var aText=getElementBytagname('home','article');
  var aFig=getElementBytagname('home','figure');
  for(var i=0;i<aText.length;i++){
    aText[i].index=i;
    aText[i].onmouseout=function(){
      this.alpha=100;
      startMove(this,'alpha',0);
    }
    aText[i].onmouseover=function(){
      this.alpha=0;
      startMove(this,'alpha',100);
    }
  }
}
