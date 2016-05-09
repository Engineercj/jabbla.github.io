/*根据模板添加元素*/
function addImg(){
  var template=oAlbum.innerHTML;
  var html=[];
  for(var i=0;i<data.length;i++){
    var con=template.replace('{{index}}',data[i].index)
                    .replace('{{img}}',data[i].img)
                    .replace('{{caption}}',data[i].caption);
    html.push(con);
  }
  oAlbum.innerHTML=html.join('');
}
addImg();
