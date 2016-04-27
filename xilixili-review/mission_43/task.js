/**
 * Created by zxr on 2016/4/26.
 */

var test1 = picVarious(),
    test2= picVarious(),
    test3 = picVarious(),
    test4 = picVarious(),
    test5 = picVarious(),
    test6 = picVarious();

test1Dom = test1.create({WH:['600px','400px'],imgs:['1.jpg']});
test2Dom = test2.create({WH:['600px','400px'],imgs:['1.jpg','6.jpg']});
test3Dom = test3.create({WH:['600px','400px'],imgs:['1.jpg','2.jpg','6.jpg']});
test4Dom = test4.create({WH:['600px','400px'],imgs:['1.jpg','2.jpg','3.jpg','6.jpg']});
test5Dom = test5.create({WH:['600px','400px'],imgs:['1.jpg','2.jpg','3.jpg','4.jpg','6.jpg']});
test6Dom = test6.create({WH:['600px','400px'],imgs:['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg']});

updateSameProperties([test1Dom,test2Dom,test3Dom,test4Dom,test5Dom,test6Dom],{
    marginBottom:'20px'
})
document.body.addChilds(test1Dom,test2Dom,test3Dom,test4Dom,test5Dom,test6Dom);
