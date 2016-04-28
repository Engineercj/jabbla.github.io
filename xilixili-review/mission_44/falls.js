/**
 * Created by zxr on 2016/4/28.
 */
var test1 = fallsLayout(),
    test1Dom = test1.init(4,16,8);
test1.add(['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','1.jpg','1.jpg']);

document.body.addChilds(test1Dom);