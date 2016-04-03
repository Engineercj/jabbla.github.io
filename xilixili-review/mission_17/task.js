/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {

};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}
/**
 *随机函数，随机颜色
 */
 var colors = ['red','blue','black','green','grey'];
 function random(v1,v2){
   switch (arguments.length) {
     case 1: return parseInt(Math.random()*(v1+1));break;
     case 2: return parseInt(Math.random()*(v2-v1)+v1+Math.random());break;
   }
 }
/**
 * 渲染图表
 */
function renderChart(city,cgy) {
  var oChart = document.getElementsByClassName('small-wrap')[0];
  var oBigwrap = document.getElementsByClassName('big-wrap')[0];

  oChart.innerHTML = '';
  oBigwrap.setAttribute('data-type',cgy+'s');
  var temp = chartData[city][cgy];
  var spans = 1;
  var maxAir = 700;
  switch (cgy) {
    case 'day': var width = 5;break;
    case 'week': var width = 40;break;
    case 'month': var width = 200;break;
  }
  for(str in temp){
    var color = colors[random(0,colors.length-1)];
    var single = document.createElement('span');
    single.setAttribute("data-detail",str+' '+'污染指数:'+temp[str]);
    /*根据指数，不同的高度*/
    var percent = temp[str]/maxAir,
        bottom = 400 * percent;
    single.style.backgroundColor = color;
    single.style.width = width+'px';
    single.style.bottom = -400+bottom+'px';
    single.style.left = spans*width*1.8+'px';
    oChart.appendChild(single);
    spans++;
  }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(obj) {
  // 设置对应数据
  pageState.nowGraTime = obj.value;
  // 调用图表渲染函数
  renderChart(pageState.nowSelectCity,pageState.nowGraTime);
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 设置对应数据
  pageState.nowSelectCity = this.value;
  // 调用图表渲染函数
  renderChart(pageState.nowSelectCity,pageState.nowGraTime);
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  /*图表的初始状态*/
  var oFiled = document.getElementById('form-gra-time');
  oFiled.onchange = function(e){
    graTimeChange(e.target);
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var oSelect = document.getElementById('city-select'),
      innerHTML = '';
  for(str in aqiSourceData){
    innerHTML += '<option>'+str+'</option>' ;
  }
  oSelect.innerHTML = innerHTML;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  oSelect.onchange = citySelectChange;
}


/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {

  for(str in aqiSourceData){
    // 将原始的源数据处理成图表需要的数据格式
    var temp = {"day":{},"week":{},"month":{}},
        dayNums = 1,
        weekaverage = 0,
        weektotal = 0,
        monthtotal = 0,
        monthaverage = 0,
        monthday = 1;
    for(str1 in aqiSourceData[str]){
      /*当前值*/
      var current = aqiSourceData[str][str1];
      var date = new Date(str1);
      /*日*/
      temp['day']['第'+dayNums+'天'] = current;
      /*周*/
      if((dayNums-parseInt(dayNums/7)*7)==0){
        weekaverage = weektotal/7;
        temp['week']['第'+parseInt(dayNums/7)+'周'] = parseInt(weekaverage);
        weektotal = 0;
        weekaverage = 0;
      }else{
        weektotal += current;
      }
      /*月*/

      if(date.getDate()==monthday){
        monthtotal += parseInt(current);
      }else{
        monthaverage = parseInt(monthtotal/(monthday-1));
        temp['month'][date.getMonth()+'月'] = monthaverage;
        monthtotal = current;
        monthday = 1;
      }
      dayNums++;
      monthday++;
    }
    // 处理好的数据存到 chartData 中
    chartData[str] = temp;
  }
  console.log(chartData);
}
/**
 * 图表初始呈现函数
 */
 function inirender(){
   var oFiled = document.getElementById('form-gra-time');
   var aRadio = oFiled.getElementsByTagName('input');
   var oSelect = document.getElementById('city-select');
   for(var i=0;i<aRadio.length;i++){
     if(aRadio[i].checked == true){
       pageState.nowGraTime = aRadio[i].value;
     }
   }
   pageState.nowSelectCity = oSelect.value;
   renderChart(pageState.nowSelectCity,pageState.nowGraTime);
 }
/**
 * 初始化函数
 */
function init() {
  initAqiChartData();
  inirender();
  initGraTimeForm();
  initCitySelector();

}

init();
