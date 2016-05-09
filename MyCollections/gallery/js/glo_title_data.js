
var data=new Object();
var dataStr=
    "FRONT PLAN>GENERAL CONTENT: five kinds of knowledge  DETAILS: the fives' details  LEARN ROUTE: about how to learn<a>\
    CSS AMAZING DESIGNS--负边距(转自W3CFUNS)>css中的负边距(negative margin)是布局中的一个常用技巧,\
    只要运用得合理常常会有意想不到的效果.本文非常基础，老鸟可以略过。<b>\
    闲着没事做的一个模拟键盘效果页面(转自W3CFUNS)>里面是N串代码~~~~~0.0<c>\
    Flex 布局教程：语法篇(转自W3CFUNS)>Flex布局将成为未来布局的首选方案。本文介绍它的语法<d>\
    多重边框--只用一个DIV(转自W3CFUNS)>一个DIV标签用border属性只能实现一层边框，那么两层以上要怎么实现呢？\
    ";
var a=dataStr.split('<a>');
var b=a[1].split('<b>');
var c=b[1].split('<c>');
var d=c[1].split('<d>');
data.t1=a[0].split('>')[0];
data.c1=a[0].split('>')[1];
data.t2=b[0].split('>')[0];
data.c2=b[0].split('>')[1];
data.t3=c[0].split('>')[0];
data.c3=c[0].split('>')[1];
data.t4=d[0].split('>')[0];
data.c4=d[0].split('>')[1];
data.t5=d[1].split('>')[0];
data.c5=d[1].split('>')[1];
var glo_t_data=data;
