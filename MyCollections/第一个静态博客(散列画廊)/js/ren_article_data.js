var ren_data=[];
var dataStr='German Verb conjugations<br>\
<br>\
the summary of conjugations of the irregular verbs helps with more easily rememorize<br>\
<br>\
<br>\
Mein Tagebuch<br>\
<br>\
Es freut mich darauf, dass mein Freund einen Domainen Namen gekauft hat. Das ist sehr interessant, ein Tagebuch ins Internet zu schreiben. Ich hofft, dass die Schreibung mein Deutsch verbessert.<br>\
Also....mein Tag ist ein bisschen langweilig.Ich habe tagelang sich mit der Unterricht beschäftigt. Seit einem Jahr habe ich zu jungen Kindern Unterricht gegeben. Mit Gelegenheitsarbeiten verdiene ich mich meinen kleinen Unterhalt. Das ist alles.Danke.<br>\
<br>\
<br>\
my lifeplan<br>\
<br>\
大二下：好好学习天天向上，完成德语专四考试<br>\
大三上：报考教师证，完成教师证考试<br>\
大三下：考驾照<br>\
大四：寻找实习<br>\
<br>\
<br>\
Germany film recommend<br>\
<br>\
感觉这是近几年来最好看的黑客类电影了，而且又是可以当作练习德语听力来看~反正就是A+++<br>\
双重反转真是有点没想到，第一次反的时候我以为是致命ID重现，第二次反尤其是变戏法的那段真是亮得不行，4 -> 1 -> 4 的两次变换表明一切都只是障眼法，你能看到的真相只是魔术师或者黑客让你看到的冰山一角罢了。<br>\
还有细节方面，国外真的是比国内同题材大片专业... 看国内的就是特么一个对话框能把全世界的系统都黑了。仅此一点我觉得就是5星满分了~<br>\
 最后，人类真是最大的漏洞，以后会不会发展成基于social engineering对人类的神经网络进行智能级别的渗透攻击呢？ 那也许会很有趣呢。<br>\
<br>\
<br>\
mein Tagebuch 2 11.12<br>\
<br>\
The temprature has been dropping these days. Look back this week, it’s kind of full of twists and turns. For starters, chorus contest has finally come to an end on Wednesday.I have been worried about it for three weeks. Although it didn’t end very well, but i believed it still worth the work. But after i took a call on Tuesday about another tutor , the schedule become tighter than ever. I have to work as tutor for five different families! But my boyfriend told me that i asked for it myself. Well ,that depends.<br>\
Now i’m  looking outside the window, since i live on 15th floor , i think the view is pretty grogerous, wondering how mad my boyfriend is.<br>\
<br>\
<br>\
CSS布局奇淫巧计之-强大的负边距<br>\
<br>\
css中的负边距(negative margin)是布局中的一个常用技巧，只要运用得合理常常会有意想不到的效果。<br>\
很多特殊的css布局方法都依赖于负边距，所以掌握它的用法对于前端的同学来说，那是必须的。本文非常基础，老鸟可以略过。<br>\
'
var d=dataStr.split('<br><br><br>');
for(var i=0;i<d.length;i++){
  var c=d[i].split('<br><br>');
  ren_data.push({
    head:c[0],
    content:c[1]
  });
}
