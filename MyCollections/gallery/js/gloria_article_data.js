
var glo_data=[];
var dataStr='FRONT PLAN<br>\
<br>\
GENERAL CONTENT: <br>\
1.html+CSS  2.html5+css3  3.javascript  4.jQurey  5.网页设计<br>\
DETAILS: <br>\
html+css:   a. 布局知识         b.css hack <br>\
html5+css3:  a.知识体系构建      b.结合原生js+css3制作常见特效 c.css3 hack <br>\
javascript:  a.ECMA知识体系构建(数据结构 算法知识)  b.精通DOM操作,每种操作适用情况  c.BOM <br>\
jQuery   :   (目前了解不多,暂时不打算接触) <br>\
网页设计(纯小白 瞎玩玩):   a.网页风格(配色)   b.网页结构<br>\
LEARN ROUTE:<br>\
line_1: 1.html5+css3知识体系构建(a)        2.结合原生js+css3制作常见特效(c)  3.css hack+css3 hack(d)<br>\
line_2: 1.javascript ECMA知识体系构建(b)   2.精通DOM操作,每种操作适用情况(c)  3.BOM(e)<br>\
line_3: 1.网页风格配色(c+) 2.网页结构(c+)<br>\
(a,b,c表示内容相关度,也就是可以同时涉及)<br>\
<br>\
<br>\
CSS布局奇淫巧计之-强大的负边距<br>\
<br>\
css中的负边距(negative margin)是布局中的一个常用技巧，只要运用得合理常常会有意想不到的效果。<br>\
很多特殊的css布局方法都依赖于负边距，所以掌握它的用法对于前端的同学来说，那是必须的。本文非常基础，老鸟可以略过。<br>\
链接:http://www.cnblogs.com/2050/archive/2012/08/13/2636467.html#2457812<br>\
<br>\
<br>\
闲着没事做的一个模拟键盘效果页面<br>\
<br>\
相信我.............你不会想看到它的<br>\
直接链接:http://www.w3cfuns.com/blog-5444585-5411344.html<br>\
<br>\
<br>\
Flex 布局教程：语法篇<br>\
<br>\
2009年，W3C提出了一种新的方案----Flex布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能。<br>\
直接链接地址:http://www.w3cfuns.com/blog-5481554-5411075.html<br>\
<br>\
<br>\
多重边框--只用一个DIV<br>\
<br>\
最近看到一个个多重边框的例子，在这里跟大家分享一下。<br>\
学过css的人看到或听到边框的话就会条件反射的想起border属性，可是一个DIV标签用border属性只能实现一层边框，那么两层以上要怎么实现呢？<br>\
(我是不是有点偷懒呢..哎..js数据处理这方面要学的东西还是很多的啊)<br>\
直接链接地址:http://www.w3cfuns.com/blog-5481188-5411062.html<br>\
'
var d=dataStr.split('<br><br><br>');
for(var i=0;i<d.length;i++){
  var c=d[i].split('<br><br>');
  glo_data.push({
    head:c[0],
    content:c[1]
  });
}
