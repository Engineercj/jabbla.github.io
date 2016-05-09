/*3d翻转控制*/
function turn(elem){
  var oPw=elem.getElementsByClassName('photo_wrap');
  var cls=oPw[0].className;
  if(/front_photo/.test(cls)){
      oPw[0].className=cls.replace('front_photo','back_photo');
  }
  else{
    oPw[0].className=cls.replace('back_photo','front_photo');
  }

}
