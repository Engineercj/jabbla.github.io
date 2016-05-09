/*生成随机数*/
function random(range){
  var max=Math.max(range[0],range[1]);
  var min=Math.min(range[0],range[1]);
  var differ=max-min;
  var num=(Math.random()*differ+min)<2? 1:Math.ceil(Math.random()*differ+min);
  return num;
}
