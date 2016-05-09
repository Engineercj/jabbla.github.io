# 表单验证组件

### 提供接口
1. glo_validate.init()
```javascript
glo_validate.init(obj);
obj = {elements:ele,rules:rules};
ele = {form:'id',Items:arr};//form中为具体表单的id,Items为待验证项数组
Items = [['className','tipClassnem'],['className','tipClassnem'],];//每项第一项是当前待验证元素的className,第二项为该项提示信息显示区域className

rules = {'className':{验证规则:flag},'className':{验证规则:flag}};

验证规则:
    require(是否必填true false)
    Length(限制长度maxLength,minLength)
    ajax(通过ajax验证url,method,data)
    email(是否是邮箱,true false)
    phone(是否是电话号码,true false)
    sameAs(与相同,目标className)

```
> 返回具有test,getFormData,方法的对象

2. glo_validate.test(obj)
> 参数为glo_validate.init()后的对象,校验函数，返回true false

3. glo_validate.getFormData(obj)
> 参数为glo_validate.init()后的对象,获取表单数据,返回{name:value}键值对