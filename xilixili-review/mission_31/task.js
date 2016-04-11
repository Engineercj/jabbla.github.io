/**
 * Created by zxr on 2016/4/11.
 */
(function(){
    var oCheckbox = document.getElementsByClassName('checkbox')[0],
        aCheck = oCheckbox.getElementsByTagName('input');
    //每个checkbox按钮事件
    for(var i=0;i<aCheck.length;i++){
        aCheck[i].onclick = function(){
            //将其它按钮的状态取消
            hideOther(this);
            //显示下方相应信息
            showSelect(this);
        }
    }
    //取消其他按钮状态
    function hideOther(obj){
        for(var i=0;i<aCheck.length;i++){
            if(obj!==aCheck[i]){
                aCheck[i].checked = false;
            }
        }
    }
    //显示下方信息
    function showSelect(obj){
        var oSelect = document.getElementsByClassName('select')[0],
            aLine = oSelect.getElementsByTagName('div');
        var pattern = new RegExp('^'+obj.id);

        for(var i=0;i<aLine.length;i++){
            if(pattern.test(aLine[i].id)){
                aLine[i].style.display = 'block';
            }else{
                aLine[i].style.display = 'none';
            }
        }

    }
    var data = {
        北京:['北京大学','北京理工大学','北京工业大学','清华大学'],
        西安:['西安电子科技大学','西安交通大学']
    };
    //下拉菜单初始化
    function init(){
        var oPro = document.getElementById('province'),
            oSchool = document.getElementById('school');

        for(city in data){
            oPro.innerHTML += '<option>'+city+'</option>';
        }

        data['北京'].forEach(function(item,index,array){
            oSchool.innerHTML+='<option>'+item+'</option>';
        });
    }
    init();
    //城市select事件
    var oPro = document.getElementById('province');

    oPro.onchange = function(){
        var oPro = document.getElementById('province'),
            oSchool = document.getElementById('school');

        oSchool.innerHTML = '';
        for(city in data){
            if(city===this.value){
                data[city].forEach(function(item,index,array){
                    oSchool.innerHTML += '<option>'+item+'</option>';
                });
            }
        }
    }

})();