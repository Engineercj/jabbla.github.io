# 当我们说line-height时候,都会谈论到神马
> 作为一个初入前端的小鲜肉,这几天被line-height折腾得够呛
> 所以本着 你丫欺负我,我就刨你家祖坟的精神 今天就查查你家户口本

**文中如果有什么不对的地方加我QQ387857274欢迎指正哦,前端爱好者也可以加一下,相互交流嘛**
**个人认为,要想把这货彻底弄清楚就要,得先认识一下'基线'**
## 什么是基线
![img](http://images.cnblogs.com/cnblogs_com/ZxrGloria/802816/o_baseline.jpg)
**红色这条线就是基线**
> 是不是很像英语作业本中的线格,没错就是那玩意
> **基线就是用来定位文字在一行中的显示位置,也就是说,一旦一行的基线的位置固定了,文字的位置也就固定了**

## line-height与基线的关系
**讲一讲绿线是什么鬼**
> 绿线其实是我意淫出来的0.0

绿线的用处主要就是确定每行content_area,应该和好多文章中所提到的**行内框**相似
> 绿线的跨度是由该行内font-size最大的那个元素决定
> 绿线的跨度的改变也会影响基线的位置**好比姚明很高,所以他的屁股也会很高**

**绿线跟line-height有什么关系**
![img](http://images.cnblogs.com/cnblogs_com/ZxrGloria/802816/o_4.jpg)
上方区域和下方区域的高度是一致的,我手残只能这样了
> 那么上方区域或者下方区域是如何计算的呢,就是**((line-height)-绿线的跨度)/2**
> 也就是说这行的上方区域和上一行的下方区域共同组成**行间距一号**,同样下方区域和下一行的上方区域组成**行间距二号**

好吧这里好像跟基线并没有半毛钱关系,我承认,不过也可认为是姚明和他屁股的关系,line-height 会决定本行的位置,同时也就是会影响基线

## 基线会影响谁呢

大家都知道,有`inline`,`inline-block`,`block`三种东西


一. `inline`我们把它看做一个由内容撑开的元素,**被基线影响**

二. `inline-block`**中存在基线,其中的inline元素也被基线影响,不过inline-block会继承父元素的line-height**
> 这里大家可能会产生疑问,看图,红色是父级元素p
**p设置line-height之前**
![img](http://images.cnblogs.com/cnblogs_com/ZxrGloria/802816/o_3.JPG)

**p设置line-height:600px后;两个盒子的基线被拉到下面**
![img](http://images.cnblogs.com/cnblogs_com/ZxrGloria/802816/o_2.JPG)

这里有一些关于**一行的基线到底归谁管**的问题,请往下看

三. `block`跟`inline-block`是一样一样的**区别在于`block`这货一下占一行**

## 一行的基线到底归谁管
> 你可以笼统地说是`line-height`,这句话本身是没什么问题的,不过现实情况要比想象的要复杂一点,还有就是图片和空的`inline-block`也会影响基线的位置(**很诡异吧,我也觉得**)

**情况1**
> 还是上面的图,当两个`inlin-block`不设置任何`line-height`的时候 > p元素设置`line-height:600px;`可以看到第一行的基线沉下去了
![img](http://images.cnblogs.com/cnblogs_com/ZxrGloria/802816/o_2.JPG)

**情况2**
> 当只有黄色`inline-block`设置`line-height`的时候,同时绿色的本身> 基线会向整体基线靠拢
![img](http://images.cnblogs.com/cnblogs_com/ZxrGloria/802816/o_6.jpg)

**情况3**
> 当两个货都设置不同的`line-height`呢绿色会调整自己的位置使自身基线向行基线靠拢
![img](http://images.cnblogs.com/cnblogs_com/ZxrGloria/802816/o_7.jpg)

**情况4**
> 当存在空的inline-bolck时,也会把基线下沉
![img](http://images.cnblogs.com/cnblogs_com/ZxrGloria/802816/o_QQ%e5%9b%be%e7%89%8720160320185832.png)

**情况5**
> 当行中加入图片后,本行的基线会随图片的高度而下沉,其它元素的基线也同时超主基线靠拢
![img](http://images.cnblogs.com/cnblogs_com/ZxrGloria/802816/o_0.jpg)

**这里得到的结论是:该行的`line-height`最终结果是子元素中最大的`line-height`,然后其它元素的`line-height`设置完成之后基线会朝整行基线靠拢**
**心得就是还是慎用inline-block,个人认为float比inline-block好太多,能不用就不用**
**以上都是个人观点**

**这是我研究一早上的结果,想交流的小伙伴可以加我qq387857274,共同进步**
关于更详细的知识内容见下面的参考资料
参考链接
[CSS深入理解之line-height ][1]




  [1]: http://www.imooc.com/learn/403
