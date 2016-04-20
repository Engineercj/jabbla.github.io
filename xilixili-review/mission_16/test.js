/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  var oCity = document.getElementById('aqi-city-input'),
      oAir = document.getElementById('aqi-value-input'),
      cityStr = oCity.value.trim().replace(/\s+/g,''),
      airStr = parseInt(oAir.value.trim().replace(/\s+/g,''));
      aqiData[cityStr] = airStr;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var oTable = document.getElementById('aqi-table'),
      innerHTML = '<tr><td>城市</td><td>空气污染指数</td><td>操作</td></tr>';
      for(str in aqiData){
        innerHTML += '<tr><td class="city">'+str+'</td><td>'+aqiData[str]+'</td><td><button>删除</button></td>'+'</tr>';
      }
      oTable.innerHTML = innerHTML;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(btn) {
  // do sth.
  if(btn.innerHTML=='删除'){
    for(str in aqiData){
      if(str==btn.parentNode.parentNode.childNodes[0].innerHTML)
      delete aqiData[str];
    }
    renderAqiList();
  }

}

function init() {
  var oAdd = document.getElementById('add-btn'),
      oCity = document.getElementById('aqi-city-input'),
      oAir = document.getElementById('aqi-value-input'),
      oTable = document.getElementById('aqi-table'),
      oPc = document.getElementById('city'),
      oPa = document.getElementById('air');
  oAdd.disabled = true;
  oCity.ready = -1;
  oAir.ready = -1;
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

  oAdd.onclick = addBtnHandle;
  // 给城市input添加 失焦事件
  oCity.onblur = function(){
    var pattern = /^[A-Za-z\u4e00-\u9fa5]/;
    if(this.value.match(pattern)===null){
      oPc.innerHTML='您的城市名不符合格式，注意只能包含中英文哦~~';
      this.ready = -1;
      oAdd.disabled = true;
    }else{
      oPc.innerHTML = '您的输入的城市没问题，请继续输入~~';
      this.ready = 1;
      if(oAir.ready === 1){
        oAdd.disabled = false;
      }
    }
  }
  //给空气质量指数添加失焦事件
  oAir.onblur = function(){
    var pattern = /^\d+$/;
    if(this.value.match(pattern)===null){
      oPa.innerHTML = '您的空气指数格式错误哦，只能是纯数字··';
      this.ready = -1;
      oAdd.disabled = true;
    }else{
      oPa.innerHTML = '您输入的空气指数没问题~~';
      this.ready = 1;
      if(oCity.ready === 1){
        oAdd.disabled = false;
      }
    }
  }
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  oTable.onclick = function(e){
    delBtnHandle(e.target);
  };
}

init();
