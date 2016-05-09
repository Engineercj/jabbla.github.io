window.onscroll=function(){

  var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
  var oTopbar=document.getElementById('top_bar');
  var oAside=document.getElementById('aside');
  startMove(oAside,'Top',scrollTop);
  startMove(oTopbar,'Top',scrollTop);
}
