/**
 * Created by zxr on 2016/4/10.
 */
(function(){
    var oBtn = document.getElementsByTagName('button')[0],
        oText = document.getElementById('text'),
        oInfo = document.getElementById('info'),
        aInput = document.getElementsByTagName('input');



//字符长度校验函数
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
    oBtn.onclick = function(){
        if(StringlengthCertify(oText.value)){
            oInfo.innerHTML = '输入长度正确';
            oInfo.className = 'correct';
        }else{
            oInfo.innerHTML = '输入长度错误';
            oInfo.className = 'false';
        }
    }
    //不同输入框的验证方法
    function nameConfig(obj){
        //验证长度
        var boolean = StringlengthCertify(obj.value);
        if(!boolean){
            obj.setAttribute('data-fail','请注意您的输入长度，4-16位，中文字符占2位');
        }
        return boolean;
    }
    function psdConfig(obj){
        //验证长度
        var boolean = StringlengthCertify(obj.value);
        if(!boolean){
            obj.setAttribute('data-fail','请注意您的输入长度，4-16位，中文字符占2位');
        }
        return boolean;
    }
    function psdReConfig(obj){
        var boolean1,
            boolean2,
            oPsd = document.getElementById('password');
        //验证是否相同
        boolean1 = (obj.value===oPsd.value);
        boolean2 = StringlengthCertify(obj.value);
        if(!boolean1){
            obj.setAttribute('data-fail','请注意您的输入密码,需跟上一条密码相同');
        }
        if(!boolean2){
            obj.setAttribute('data-fail','不能为空');
        }
        return (boolean1&&boolean2);
    }
    function emailConfig(obj){
        //验证邮箱
        var boolean,
            pattern= /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/i;

        boolean = (pattern.test(obj.value));
        if(!boolean){
            obj.setAttribute('data-fail','请注意您的邮箱格式abc@xxx.xxx');
        }
        return boolean;
    }
    function phoneConfig(obj){
        //手机号验证
        var boolean,
            pattern= /^1[3|4|5|7|8]\d{9}$/;

        boolean = (pattern.test(obj.value));
        if(!boolean){
            obj.setAttribute('data-fail','请注意您的手机号是否正确');
        }
        return boolean;
    }
    //定义不同输入框的验证入口
    function textConfig(id){
        var boolean,
            obj = document.getElementById(id);
        switch(id){
            case 'name':boolean = nameConfig(obj);break;
            case 'password':boolean = psdConfig(obj);break;
            case 'psd-config':boolean = psdReConfig(obj);break;
            case 'email':boolean = emailConfig(obj);break;
            case 'phone-num':boolean = phoneConfig(obj);break;
        }
        return boolean;
    }
    //给每个输入框添加失焦和取焦事件
    for(var i=0;i<aInput.length;i++){
        //取焦事件
        aInput[i].onfocus = function(){
            showTips(this);
        }
        //失焦事件
        aInput[i].onblur = function(){
            if(textConfig(this.id)){
                this.setAttribute('data-suc','正确！');
                this.style.borderColor = 'green';
                showTips(this,'success');
                this.boolean = 1;
            }else{
                this.style.borderColor = 'red';
                showTips(this,'fail');
                this.boolean = 0;
            }
        }

    }
    //提交按钮
    oBtn.onclick = function(){
        var sum = 0;
        for(var i=0;i<aInput.length;i++){
            sum += aInput[i].boolean;
        }
        if(sum===5){
            alert('填写正确');
        }else{
            alert('请重新检查您的表单');
            return false;
        }
    }
    //每种输入框的showTips
    function showTips(obj,flag){
        var oTip = arguments[0].nextElementSibling.getElementsByTagName('span')[0];
        if(arguments.length===1){
            //显示相应的提示信息
            oTip.innerHTML = arguments[0].getAttribute('data-tip');
            oTip.style.color = 'grey';
        }else{
            if(flag==='success'){
                oTip.innerHTML = obj.getAttribute('data-suc');
                oTip.style.color = 'green';
            }else if(flag==='fail'){
                oTip.innerHTML = obj.getAttribute('data-fail');
                oTip.style.color = 'red';
            }
        }
    }

})();