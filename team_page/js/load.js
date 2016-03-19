
(function(){
  var time = Date.now();
  var total = $('img').length ;
  var loadedNum = 0;
  var nowPercent = 0;
  $('img').load(function(){
    var $loadBar = $('#load .loadPic .loadBar');
    var $loadBar = $('#load .loadPic .loadBar');
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
    if(nowPercent>0.75 && nowPercent<1){
      $loadBar.removeClass("stage_3");
      $loadBar.addClass("stage_4");
    }
    if(nowPercent===1){
      var timer = setTimeout(function(){
        $('#load').fadeOut();
        $('#main-content').fadeIn();
      },1500);
    }
  })
  
})();
