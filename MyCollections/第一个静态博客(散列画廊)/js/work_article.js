function work_article(){
  var oTit=getElementBytagname('work','h2');
  var oAtc=getElementBytagname('work','article');
  var oBtn=getElementBytagname('work','a');
  var oP=getElementBytagname('work','p');
  var oPop=getElementBytagname('pop_article','div');
  var oClose=getElementBytagname('pop_article','a');
  var oPopBac=document.getElementById('pop_article_bac');
  for(var i=0;i<oTit.length;i++){
    oTit[i].index=i;
    oBtn[i].index=i;
    oClose[i].index=i;
    oBtn[i].alpha=0;
    oTit[i].isBtn=0;
    oTit[i].isFlod=0;
    oPop[i].alpha=0;
    oPopBac.alpha=0;
    oTit[i].onmouseover=function(){
      oBtn[this.index].style.display='block';
      startMove(oBtn[this.index],'alpha',100);
    }
    oTit[i].onmouseout=function(){
      startMove(oBtn[this.index],'alpha',0);
      oBtn[this.index].style.display='none';
    }
    oTit[i].onclick=function(){
      if(this.isBtn==1){this.isBtn=0;}
      else{
          if(this.isFlod==1){
            startMove(oP[this.index],'Height',-15);
            this.isFlod=0;
          }
          else{
            for(var j=0;j<oTit.length;j++){
              if(j!=this.index){
                if(oTit[j].isFlod==1){startMove(oP[j],'Height',-15);}
              }
            }
            startMove(oP[this.index],'Height',90);
            this.isFlod=1;
          }
        }
    }
    oBtn[i].onclick=function(){
        oTit[this.index].isBtn=1;
        oPopBac.style.display='block';
        startMove(oPopBac,'alpha',95);
        //alert(oPopBac.style.opacity);
        oPop[this.index].style.display='block';
        startMove(oPop[this.index],'alpha',100);
    }
    oClose[i].onclick=function(){
      oPop[this.index].alpha=0;oPop[this.index].style.opacity=0;
      oPop[this.index].style.display='none';
      oPopBac.alpha=0;oPopBac.style.opacity=0;
      oPopBac.style.display='none';
    }

  }

}
function getElementBytagname(parent,tagname){
  var oParent=document.getElementById(parent);
  return(oParent.getElementsByTagName(tagname));
}
