/**
 * Created by zxr on 2016/4/10.
 */
(function(){
    var oBtn = document.getElementsByTagName('button')[0],
        oText = document.getElementById('text'),
        oInfo = document.getElementById('info');


    oBtn.onclick = function(){
        var str = oText.value,
            pattern = /[^x00-xff]+/g,
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
        if(sum>=4&&sum<=16){
            oInfo.innerHTML = '输入长度正确';
            oInfo.className = 'correct';
        }else{
            oInfo.innerHTML = '输入长度错误';
            oInfo.className = 'false';
        }
        console.log(str.length+Unicodesum);
    }
})();