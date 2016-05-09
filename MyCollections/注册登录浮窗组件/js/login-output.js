/**
 * Created by zxr on 2016/4/18.
 */
var glo_login=(function(){
    //标记当前视图
    var current;
    //=========================创建结构==============================//
    var Coverdom = document.createElement('div');
    var Coverdominner ='<div id="glo-login-wraper"> <div class="cont_tabs_login"> <ul class="ul_tabs"><li class="active"><a class="signin-btn" id="login-form-area-nav">登录</a> <span class="linea_bajo_nom"></span> </li> <li> <a id="signup-form-area-nav" class="signup-btn">注册</a> <span class="linea_bajo_nom"></span> </li> </ul> </div> <div class="login-form-area"> <div class="line"> <input type="text" class="username" name="username" placeholder="用户名"><br> </div> <div class="line"> <input type="password" class="password" name="password" placeholder="密码"><br> </div> <button class="submit" type="submit">登录</button> </div> <div class="signup-form-area" id="signup-form-area"> <div class="line"> <input type="text" class="username" name="username" placeholder="用户名"><br> <label class="username-tip tip"></label> </div> <div class="line"> <input type="text" class="email" name="email" placeholder="邮箱"><br> <label class="email-tip tip"></label> </div> <div class="line"> <input type="password" class="password" name="password" placeholder="密码"><br> <label class="password-tip tip"></label> </div> <div class="line"> <input type="password" class="confirm_password" placeholder="再次输入密码"><br> <label class="confirm_password-tip tip"></label> </div> <div class="line"> <input type="text" class="phone" name="mobile" placeholder="手机号码"><br> <label class="phone-tip tip"></label> </div> <div id="glo-select"> <div class="wraper"> <ul class="select-list province fold"> </ul> <ul class="select-list school fold"></ul> </div> </div> <button class="submit" type="submit">注册</button> </div> </div>';
    Coverdom.id = 'glo-login-cover';
    Coverdom.innerHTML =  Coverdominner;
    document.body.insertBefore(Coverdom,document.body.firstElementChild);
    //=========================获取元素==============================//
    var Wraperdom = Coverdom.querySelector('#glo-login-wraper'),    //弹出框
        LoginForm = Coverdom.querySelector('.login-form-area'),     //登录显示区域
        SignupForm = Coverdom.querySelector('.signup-form-area'),   //注册显示区域
        loginBtn = Coverdom.querySelector('.signin-btn'),           //登录导航按钮
        signupBtn = Coverdom.querySelector('.signup-btn'),          //注册导航按钮
        regSubmit = SignupForm.querySelector('.submit'),            //注册提交按钮
        logSubmit = LoginForm.querySelector('.submit');             //登录提交按钮
    //对集合内所有元素执行相同操作
    function doSameWork(obj,fn){
        for(var i=0,item;item=obj[i++];){
            fn(item);
        }
    }
    //=========================当前模块的视图栈==============================//
    var viewStack = {};
    //=========================视图类==============================//
    function Page(obj,btnText,index){
        this.index = index;
        this.view = obj;
        this.navBtn = Wraperdom.querySelector('#'+obj.className+'-nav');
        this.submitBtn = obj.querySelector('.submit');
        this.btnText = btnText;
        viewStack[index] = this;
    }
    //视图的初始化操作
    Page.prototype.init = function(){

        /*清空所有input域*/
        doSameWork(this.view.querySelectorAll('input'),function(obj){
            obj.value = '';
        });
        /*清空提示信息*/
        doSameWork(this.view.querySelectorAll('.tip'),function(obj){
            obj.innerHTML = '';
        })
        /*初始化按钮状态*/
        this.view.querySelector('button').innerHTML = this.btnText.origin;
    }
    //=========================创建视图实例==============================//
    var LoginView = new Page(LoginForm,{origin:'登录',success:'登录成功',fail:'用户名或密码错误'},'登录页面'),
        SignupView = new Page(SignupForm,{origin:'注册',success:'注册成功',fail:'服务器出现问题'},'注册页面');

    //=========================设置当前视图==============================//
    function setCurrentView(index){
        //视图栈中获取指定视图
        for(str in viewStack){
            if(str===index){
                current = viewStack[str];
                viewStack[str].init();
                $(viewStack[str].view).fadeIn();
                
                viewStack[str].navBtn.parentNode.classList.add('active');
            }else{
                $(viewStack[str].view).hide();
                viewStack[str].navBtn.parentNode.classList.remove('active');
             
            }
        }
    }
    /*注册，登录标签事件*/
    loginBtn.onclick = function(){
        setCurrentView('登录页面');
    };
    signupBtn.onclick = function(){
        setCurrentView('注册页面');
    };
    //判断结点是否存在指定父元素
    function hasRoot(child,parent){
        while(child.parentNode){
            if(child.parentNode===parent){
                return true;
            }
            child = child.parentNode;
        }
        return false;
    }
    //添加窗口消失事件
    Coverdom.addEventListener('click',function(e){
        if(!hasRoot(e.target,Wraperdom)){
            $(Coverdom).fadeOut();
            $(Wraperdom).fadeOut();
        }
    },false);
    return {
        //弹出动作
        pop:function(){
            if(window.getComputedStyle(Coverdom).display!=='none'||window.getComputedStyle(Wraperdom).display!=='none'){
                return false;
            }
            setCurrentView('登录页面');
            document.body.style.overflow = 'hidden';
            Coverdom.style.top = document.body.scrollTop+'px';
            if(arguments.length===0){
                $(Coverdom).fadeIn();
                $(Wraperdom).fadeIn();
            }else{
                arguments[0].cover(Coverdom);
                arguments[0].wraper(Wraperdom);
            }
            return true;
        },
        //关闭动作
        close:function(){
            if(window.getComputedStyle(Coverdom).display==='none'||window.getComputedStyle(Wraperdom).display==='none'){
                return false;
            }
            document.body.style.overflow = 'auto';
            if(arguments.length===0){
                $(Coverdom).fadeOut();
                $(Wraperdom).fadeOut();
            }else{
                arguments[0].cover(Coverdom);
                arguments[0].wraper(Wraperdom);
            }
            return true;
        },
        sending:function(){
            current.submitBtn.innerHTML = "<span class='icon-spinner'></span>";
        },
        success:function(){
            var data = {};
            setTimeout(function(){
                current.submitBtn.innerHTML = "<span class='icon-spinner'></span>"+current.btnText.success;
                current.submitBtn.classList.add('success');
                setTimeout(function(){
                    current.submitBtn.classList.remove('success');
                },2000);
            },2000);
                data.user = LoginForm.querySelector('.username').value.trim();
                data.password = LoginForm.querySelector('.password').value.trim();
            return data;
        },
        setCurrent:function(index){
            setCurrentView(index);
        },
        failed:function(){
            setTimeout(function(){
                current.submitBtn.innerHTML = "<span class='icon-spinner'></span>"+current.btnText.fail;
                current.submitBtn.classList.add('failed');
                setTimeout(function(){
                    current.submitBtn.classList.remove('failed');
                    setCurrentView(current.index);
                },2000);
            },2000);
        },
        getWraper:function(){
            return Wraperdom;
        },
        getCover:function(){
            return Coverdom;
        },
        getSignin:function(){
            return logSubmit;
        },
        getSignup:function(){
            return regSubmit;
        }
    }
})();

