$(function(){
	$('#dowebok').fullpage({
		// sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#f90'],
		continuousVertical: true,
		anchors: ['page1', 'page2', 'page3', 'page4','page5'],
		menu: '#menu',
		'navigation': true,
		afterLoad: function(anchorLink, index){
			if(index == 2){
				$('.section2').find('p').delay(500).animate({
					left: '0'
				}, 1500, 'easeOutExpo');
			}
			if(index == 3){
				$('.section3').find('p').delay(500).animate({
					left: '0'
				}, 1500, 'easeOutExpo');
			}
			if(index == 4){
				$('.section4').find('#p1').delay(500).animate({
					bottom: '-10'
				}, 1500, 'easeOutExpo');
				$('.section4').find('#p2').delay(1000).animate({
					bottom: '-10'
				}, 1500, 'easeOutExpo');
				$('.section4').find('#p3').delay(1500).animate({
					bottom: '-10'
				}, 1500, 'easeOutExpo');
				$('.section4').find('#p4').delay(2000).animate({
					bottom: '-10'
				}, 1500, 'easeOutExpo');
			}
			if(index == 5){
				//$('.section5').find('div').fadeIn(2000);

				$(".section5 .person").fadeIn(500);
				$(".section5 .person").animate({
					left:'50%',
					opacity:'1'
				},1500,'easeOutExpo');
				$(".section5 .speech1").delay(2500).fadeIn(500);
				$(".section5 .speech2").delay(5000).fadeIn(500);
				$(".section5 .speech3").delay(7500).fadeIn(500);
				$(".section5 .person").delay(7000).fadeOut(500);
				$(".section5 .gloria_wrapper").delay(9000).animate({
					opacity:'1',
				},500,function(){

				});
			}
		},
		onLeave: function(index, direction){
			if(index == '2'){
				$('.section2').find('p').delay(500).animate({
					left: '-120%'
				}, 1500, 'easeOutExpo');
			}
			if(index == '3'){
				$('.section3').find('p').delay(500).animate({
					left: '-120%'
				}, 1500, 'easeOutExpo');
			}
			if(index == '4'){
				$('.section4').find('#p1').delay(500).animate({
					bottom: '0'
				}, 1500, 'easeOutExpo');
				$('.section4').find('#p2').delay(1000).animate({
					bottom: '0'
				}, 1500, 'easeOutExpo');
				$('.section4').find('#p3').delay(1500).animate({
					bottom: '0'
				}, 1500, 'easeOutExpo');
				$('.section4').find('#p4').delay(2000).animate({
					bottom: '0'
				}, 1500, 'easeOutExpo');
			}
			if(index == '5'){
				//$('.section5').find('.gloria_wrapper').fadeOut(2000);
				$(".section5 .person").fadeOut(500);
				$(".section5 .speech").fadeOut(500);
				$(".section5 .person").animate({
					left:'-200',
					opacity:'0'
				},1500,function(){
					$(".section5 .gloria_wrapper").animate({
						opacity:'0'
					},500);
				});

			}
		}
	});
});
