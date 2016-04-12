/**
 * Created by zxr on 2016/4/11.
 */


//封装表单
var Form = (function(){
    //表单配置项
    var formData = [
        {
            label: '用户名',                   // 表单标签
            type: 'text',                   // 表单类型
            tagname:'input',                //表单元素类型
            class:'username',                  //元素id
            validator: function (obj){
                return StringlengthCertify(obj.value);
            },    // 表单验证规则
            rules: '必填，长度为4-16个字符',    // 填写规则提示
            success: '格式正确',              // 验证通过提示
            fail: '长度不正确'               // 验证失败提示
        },
        {
            label: '密码',                    // 表单标签
            type: 'password',                   // 表单类型
            tagname:'input',                //表单元素类型
            class:'psd',                  //元素id
            validator: function (obj) {
                return StringlengthCertify(obj.value);
            },    // 表单验证规
            rules: '必填，长度为4-16个字符',    // 填写规则提示
            success: '格式正确',              // 验证通过提示
            fail: '长度不正确'               // 验证失败提示
        },
        {
            label: '邮箱',                    // 表单标签
            type: 'text',                   // 表单类型
            tagname:'input',                //表单元素类型
            class:'email',                  //元素id
            validator: function (obj) {
                var boolean,
                    pattern= /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/i;
                boolean = (pattern.test(obj.value));
                if(!boolean){
                    obj.setAttribute('data-fail','请注意您的邮箱格式abc@xxx.xxx');
                }
                return boolean;
            },    // 表单验证规
            rules: '必填，格式为abc@xxx.xxx',    // 填写规则提示
            success: '格式正确',              // 验证通过提示
            fail: '请检查格式是否为abc@xxx.xxx'               // 验证失败提示
        },
        {
            label: '手机号',                    // 表单标签
            type: 'text',                   // 表单类型
            tagname:'input',                //表单元素类型
            class:'phone',                  //元素id
            validator: function (obj) {
                var boolean,
                    pattern= /^1[3|4|5|7|8]\d{9}$/;

                boolean = (pattern.test(obj.value));
                if(!boolean){
                    obj.setAttribute('data-fail','请注意您的手机号是否正确');
                }
                return boolean;
            },    // 表单验证规
            rules: '填入正确的手机号',    // 填写规则提示
            success: '格式正确',              // 验证通过提示
            fail: '手机号不正确'               // 验证失败提示
        }
    ];
    //长度校验
    function StringlengthCertify(str){
        var pattern = /[^x00-xff]+/g,
            Unicodesum = 0,
            sum = 0;
        //寻找字符串中中文字符，并算出出现次数
        var matches = pattern.exec(str);
        while(matches!==null){
            Unicodesum += pattern.lastIndex-matches.index;
            matches = pattern.exec(str);
        }
        sum = str.length+Unicodesum;
        //总长度验证
        return (sum>=4&&sum<=16)
    }
//单例获取
    function getSingle(fn){
        var instance ;
        return function(){
            if(instance){
                return instance;
            }
            return instance = fn.apply(this,arguments);
        }
    }
    //第一个表单风格
    function createForm1(data,formclass){
        var oForm = document.getElementsByClassName(formclass)[0],
            oBtn = document.createElement('button');
        data.forEach(function(item,index,array){
            var obj = document.createElement(item.tagname),
                objLabel = document.createElement('label'),
                oTip = document.createElement('span');
            //设置元素属性
            objLabel.innerHTML = item.label+':';
            obj.type = item.type;
            obj.className = item.class;
            //插入DOM树
            oForm.appendChild(objLabel);
            oForm.appendChild(obj);
            oForm.appendChild(oTip);
        });
        oBtn.innerHTML = '提交';
        oForm.appendChild((oBtn));
        document.body.appendChild(oForm);
    }
//给表单项添加事件
    function addEvent(data,formclass){
            data.forEach(function(item,index,array){
            var oForm = document.getElementsByClassName(formclass)[0],
                obj = oForm.getElementsByClassName(item.class)[0],
                oTip = obj.nextElementSibling;


            //添加获取焦点事件
            obj.onfocus = function(){
                oTip.innerHTML = item.rules;
            }
            //添加失焦事件
            obj.onblur = function(){
                if(item.validator(this)){
                    oTip.innerHTML = item.success;
                    oTip.style.color = 'green';
                    this.style.borderColor = 'green';
                    item.boolean = 1;
                }else{
                    oTip.innerHTML = item.fail;
                    oTip.style.color = 'red';
                    this.style.borderColor = 'red';
                    item.boolean = 0;
                }
            }
        });
        var oBtn = document.getElementsByTagName('button')[0];
        oBtn.onclick = function(){

            var boolean = data.every(function(item,index,array){
                return (item.boolean===1);
            });
            if(!boolean){
                alert('请检查您所填的表单项');
                return false
            }
        }
    }

    return {
        createForm:(function(){
            var instance = [];
            return function(formclass){
                if(instance.some(function(item,index,array){return item===formclass})){
                    alert('已存在'+formclass);
                }else{
                    instance.push(formclass);
                    createForm1(formData,formclass);
                    addEvent(formData,formclass);
                }
            }
        })()
    }
})();

Form.createForm('v_1');
