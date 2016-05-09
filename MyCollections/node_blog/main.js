/**
 * Created by zxr on 2016/3/31.
 */
var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    server = express(),
    mongoose = require('mongoose'),
    markd = require('markdown').markdown,
    fs = require('fs'),
    db = mongoose.connection;

mongoose.connect('mongodb://localhost/blog');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    // yay!
});
server.listen(3000,function(){
});
//引入article模型
var article = require('./models/article'),
    link  = require('./models/link');

//创建一个实例
server.set('view engine','jade');
server.set('views','./views');
server.use(express.static(path.join(__dirname,'public')));
server.use(express.static(path.join(__dirname,'node_modules')));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(multer());

//设置首页路由
server.get('/',function(req,res){
    article.find({},function(err,one){
        toCgys(res,one,'index');
    });
});

//设置单个文章访问路由
server.get('/readAll',function(req,res){
    //从数据库中找出相应title的数据段
    article.findOne({title:req.query.title},function(err,item){
        if(err){
            console.log('数据库出错');
            return;
        }else if(item==null){
            res.send('数据库中无此文章数据，请重新添加');
            return;
        }
        //将数据段对应MD文章的路径取出，内容放在article.md中解析
        var tempStr = fs.readFileSync(item.content,'utf-8');
        fs.writeFileSync('./views/article.md',tempStr);
        //进行分类归纳，发送解析后的article页面
        toCgys(res,item,'article')
    });
});
//设置登录页面路由
server.get('/login',function(req,res){
    res.render('login',function(err,html){
        res.send(html);

    });
});
//设置后台管理页面访问路由
server.post('/admin',function(req,res){
    if(req.body.username!=='administrator'||req.body.password!=='2562321'){
        res.redirect('loginFault');
        return;
    }
    var arts,links;
    article.find({},function(err,one){
        if(err){
            console.log('数据库出现错误');
        }else{
            arts = one;
            link.find({},function(err,item){
                if(err){
                    console.log('数据库出现错误');
                }else{
                    links = item;
                    res.render('admin',{
                        articles: arts,
                        links:links
                    });
                }
            });
        }
    });
});
//查询文章数据库路由
server.get('/admin/query',function(req,res){
    var title = req.query.title;
    article.findOne({title:title},function(err,item){
        item.content = fs.readFileSync(item.content,'utf-8');
        res.send(item);
    });
})
//设置文章提交和更新路由
server.post('/admin/myArticle',function(req,res){
    //如果是提交
    if(req.body.flag=='post'){
        var instance = new article({
            title:req.body.title.trim(),
            author:'Gloria',
            snap:req.body.snap,
            category:req.body.category,
            head:'glo-thumb.jpg',
            comments_count:0
        });
        var filePath = './mdFiles/'+instance.title+'.md';
        fs.open(filePath,'w',function(err,fd){
            fs.writeFile(filePath,req.body.content,function(err){
                if(err){
                    console.log(err);
                    return;
                }
            });
        });
        instance.content = filePath;
        instance.save(function(err){
            if(err){
                res.send('存入数据库失败，抱歉');
            }else{
                res.send('成功存入数据库');
            }
        });

    }else if(req.body.flag=='update'){
        //更新操作，找到相同title的数据
        var _id = req.body.id;
        article.findOne({_id:_id},function(err,item){
            if(err){
                console.log('数据库异常');
                res.send('-1');
                return;
            }
            if(item==null){
                console.log('并没有找到相应的文档');
                res.send('-1');
                return;
            }
            //修改内容
            var newPath = './mdFiles/'+req.body.title+'.md';
            fs.renameSync(item.content,newPath);
            fs.writeFile(newPath,req.body.content,function(err){
                if(err){
                    console.log(err);
                    res.send('-1');
                    return;
                }
                console.log('成功修改');
            });
            //更新其它属性
            article.update({_id:_id},{$set:{
                title:req.body.title,
                snap:req.body.snap,
                content:newPath,
                category:req.body.category
            }},function(err){
                if(err){
                    console.log('数据库出错');
                    res.send('数据库出错');
                    return;
                }
                res.send('成功更新');
                return;
            })
        });
    }
});
//设置删除文章库路由
server.get('/admin/del',function(req,res){
    var title = req.query.title;
    article.remove({title:title},function(err,docs){
        if(err){
            res.send('-1');
            return;
        }else{
            if(docs==null){
                res.send('0');
                return;
            }
            res.send('1');
        }
    });
});
//设置链接上传路由
server.get('/admin/links',function(req,res){
    var instance = new link({
        title:req.query.title,
        link_adr:req.query.link_adr,
        category:req.query.category.split(',')
    });
    instance.save(function(err,item){
        if(err){
            console.log('存储数据库出现错误');
            res.send('存储数据库出现错误');
            return;
        }else{
            console.log('存储数据库成功');
            res.send(item);
        }
    });
});
//设置删除链接路由
server.get('/admin/del/link',function(req,res){
    var title = req.query.title;
    link.remove({title:title},function(err,docs){
        if(err){
            res.send('-1');
            return;
        }else{
            if(docs==null){
                res.send('0');
                return;
            }
            res.send('1');
        }
    });
});
//从link数据库取数据并到每个分类
function toCgys(res,one,view){
    var  javascript=[],
        css=[],
        css3=[],
        jquery=[],
        nodejs=[],
        html5=[];
    link.find({},function(err,item){
        if(one.length!==undefined){
            one.forEach(function(item1,index,array){
                item1.category.forEach(function(item2,index,array){
                    switch (item2){
                        case 'javascript':javascript.push(item1);break;
                        case 'css':css.push(item1);break;
                        case 'css3':css3.push(item1);break;
                        case 'jquery':jquery.push(item1);break;
                        case 'nodejs':nodejs.push(item1);break;
                        case 'html5':html5.push(item1);break;
                    }
                });
            });
            res.render(view,{
                articles:one,
                links:item,
                javascript:javascript,
                css:css,
                css3:css3,
                jquery:jquery,
                nodejs:nodejs,
                html5:html5
            });
        }else{
            article.find({},function(err,one1){
                one1.forEach(function(item1,index,array){
                    item1.category.forEach(function(item2,index,array){
                        switch (item2){
                            case 'javascript':javascript.push(item1);break;
                            case 'css':css.push(item1);break;
                            case 'css3':css3.push(item1);break;
                            case 'jquery':jquery.push(item1);break;
                            case 'nodejs':nodejs.push(item1);break;
                            case 'html5':html5.push(item1);break;
                        }
                    });

                });
                res.render(view,{
                    articles:one,
                    links:item,
                    javascript:javascript,
                    css:css,
                    css3:css3,
                    jquery:jquery,
                    nodejs:nodejs,
                    html5:html5
                },function(err,html){
                    if(err){
                        console.log(err);
                    }else{
                        //自上而下遍历评论树
                        function travelcommentTree(comment,array,fromIndex){
                            var start = "<li data-flag='"+comment.flag+"'><div class='head'><span>"+comment.username+"</span></div><p>"+comment.comment+"<span class='input'><input type='text' class='reply'><button class='submit'>发布回复</button></span><span class='meta'><a class='reply-btn'>回复</a></span></p><ul class='comment-list'>",
                                ender = "</ul></li>";
                            //插入到父元素最后一项以外的最后一个位置
                            array.splice(array.length-fromIndex,0,start,ender);
                            if(comment.childs.length<=0){
                                return;
                            }
                            fromIndex = fromIndex+1;
                            for(var i=0;i<comment.childs.length;i++){
                                travelcommentTree(comment.childs[i],array,fromIndex);
                            }

                        }
                        //遍历数据库评论库,构建相应的dom
                        var temp ,
                            single = [],
                            result = [];
                        var head = "<ul class='comment-list'>",
                            tail = "</ul>";

                        result[0] = head;
                        result[result.length] = tail;
                        one.comments.forEach(function(item3,index,array){
                            travelcommentTree(item3,result,1);
                        });
                        var jsSeg = '<script>var oResm = document.getElementsByClassName("recent_mes")[0];oResm.innerHTML += "'+result.join('')+'";</script>';

                        html +=jsSeg;
                        res.send(html);
                    }
                });
            });
        }

    });
}

//评论提交路由
server.get('/addComment',function(req,res){
    article.findOne({title:req.query.title},function(err,item){
        var comment ={};
        comment.username = req.query.username;
        comment.email = req.query.email;
        comment.comment = req.query.comment;
        comment.time = new Date().toLocaleDateString();
        comment.flag = item.comments_count;
        comment.childs = [];
        item.comments.push(comment);
        item.save();
        res.send('1');
    });
});
//回复留言路由
server.get('/reply',function(req,res){
    article.findOne({title:req.query.title},function(err,item){
        var comment = {};
        item.comments_count++;
        comment.flag = item.comments_count;
        comment.parentFlag = parseInt(req.query.flag);
        comment.comment = req.query.comment;
        comment.username = '匿名用户';
        comment.childs = [];
        for(var j=0;j<item.comments.length;j++){
            var co = insertTocommentTree(item.comments[j],comment);
            if(co!==undefined){
                break;
            }
        }

       	article.update({title:item.title},{$set:{comments:item.comments,comments_count:item.comments_count}},function(err){
       		if(err){
       			console.log(err);
       		}else{
                res.send('成功提交回复');
            }
       	});

    });

});
//自上而下遍历评论树,并把提交的回复插入到正确位置
function insertTocommentTree(comment,waitInsert){
    if(comment.flag===waitInsert.parentFlag){
        comment.childs.push(waitInsert);
        return comment;
    }

    if(comment.childs.length<=0){
        return;
    }
    for(var i=0;i<comment.childs.length;i++){
        insertTocommentTree(comment.childs[i],waitInsert);
    }
}

