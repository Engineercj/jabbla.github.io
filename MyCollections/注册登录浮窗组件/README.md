# 注册登录浮窗组件(集成表单验证)

## 提供接口

#### glo_login.pop(obj)，组件弹出
> 无参数则调用默认动画
obj.cover控制遮罩，obj.wraper控制显示主体

#### glo_login.close(obj)，组件关闭
> 无参数则调用默认动画
obj.cover控制遮罩dom，obj.wraper控制显示主体dom

#### glo_login.sending() , 当前视图按钮变为发送状态

#### glo_login.success() , 当前视图按钮变为发送成功状态

#### glo_login.failed(), 当前视图按钮变为验证失败状态

#### glo_login.setCurrent(),改变当前视图,注册或者登录界面
> 传入字符串 '登录页面' or '注册页面'

#### glo_login.getWraper() 获取窗口
#### glo_login.getCover()  获取窗口遮罩
#### glo_login.getSignin() 获取登录按钮
#### glo_login.getSignup() 获取注册按钮


