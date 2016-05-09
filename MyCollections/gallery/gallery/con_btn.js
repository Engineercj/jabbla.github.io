/*小控制按钮*/
function con_btn(){
  for(var n2=0;n2<aLi.length;n2++){
    aLi[n2].isclick=0;
    aLi[n2].index=n2;
    if(/center/.test(aPhoto[n2].className)){
      aLi[n2].className=aLi[n2].className+'active';
      aLi[n2].isclick=1;
    }
  }
  for(var i=0;i<aLi.length;i++){
    aLi[i].onclick=function(){
      for(var sum=0;sum<aLi.length;sum++){
        if(sum!=this.index){aLi[sum].isclick=0;}
        else{this.isclick++;}
      }
      if(this.isclick==1){
        var cls=aPhoto[this.index].className;

        for(var j=0;j<aPhoto.length;j++){
          if(/center/.test(aPhoto[j].className)){
            aPhoto[j].className=aPhoto[j].className.replace('center','');
            aLi[j].className=aLi[j].className.replace('active','');
            random_put();
            break;
          }
          else{continue;}
        }
        this.className=this.className+' active';
        rsort(this.index+1);
      }
      else{
        turn(aPhoto[this.index]);
      }
    }

  }
}
con_btn();
