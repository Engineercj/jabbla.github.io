/*中间图片选取*/
function rsort(n){
  for(var j=0;j<aPhoto.length;j++){

    if(/center/.test(aPhoto[j].className)){

      aPhoto[j].className=aPhoto[j].className.replace('center','');
    }

  }
  var con=aPhoto[n-1].className;
  con=con+' center';
  aPhoto[n-1].className=con;

  aPhoto[n-1].style.left=350+'px';
  aPhoto[n-1].style.top=100+'px';
  aPhoto[n-1].style.transform='rotate(360deg) scale(1.3)';
}
rsort(random([1,img_data().length]));
