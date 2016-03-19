
(function(){
  var $loadBar = $('#load .loadPic .loadBar');
  var $load = $('#load');
  var $main_content = $('#main-content');
  var total = $('img').length ;
  var loadedNum = 0;
  var nowPercent = 0;
  var totalTime = setTimeout(function(){
    $loadBar.addClass("satge_4");
    var timer1 = setTimeout(function(){
      $load.fadeOut();
      $main_content.fadeIn();
    },1500);
  },10000);
  $('img').load(function(){

    loadedNum++;
    nowPercent = loadedNum / total;
    if(nowPercent<=0.25){
      $loadBar.addClass("stage_1");
    }
    if(nowPercent>0.25 && nowPercent<=0.5){
      $loadBar.removeClass("stage_1");
      $loadBar.addClass("stage_2");
    }
    if(nowPercent>0.5 && nowPercent<=0.75){
      $loadBar.removeClass("stage_2");
      $loadBar.addClass("stage_3");
    }
    if(nowPercent>0.75 && nowPercent<=1){
      $loadBar.removeClass("stage_3");
      $loadBar.addClass("stage_4");
      if(nowPercent===1){
        var timer = setTimeout(function(){
          $load.fadeOut();
          $main_content.fadeIn();
        },1500);
      }
      //console.log(nowPercent);
    }
  });

})();
