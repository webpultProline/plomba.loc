$(function(){
	function custom_selectEvents(status_,onactive_,parent_,parent_class_){
		window.custom_select = status_;
		window.custom_select_block = onactive_;
		window.custom_select_parent = parent_;
		window.custom_select_parent_class = parent_class_;
	}

	$(window).click(function(event){
		if(window.custom_select == true){
			if($(event.target).parents().hasClass(window.custom_select_parent_class) == false && $(event.target).hasClass(window.custom_select_parent_class) == false){
				if(window.custom_select_block == false){
					window.custom_select_parent.removeClass('openOnEvent');
				}
			}
			window.custom_select_block = false;
		}
	});
	
	/*Фиксы в IE 10*/
	var doc = document.documentElement;
	var user_agent = navigator.userAgent;
	if(navigator.userAgent.indexOf("Firefox") !== -1){
		var start_ = user_agent.split('x');
		var first_ = start_[1];
		var second_ = first_.split('/');
		var third_ = parseInt(second_[1],10);
		if(third_ >= 47 && third_ < 50){
			doc.setAttribute('data-useragent', 'Firefox');
		}
	}
	
	
	
	if(navigator.userAgent.indexOf("MSIE 10.0") !== -1){
		doc.setAttribute('data-useragent', 'MSIE 10.0');
	}
	/*конец*/
	/*Поиск в шапке*/
	$('.search--row').on('submit', function(event){
		if($(this).find('button').hasClass('openOnEvent') == false){
			$('.openOnEvent').removeClass('openOnEvent');
			custom_selectEvents(true,false,$(this).find('button'),'search--row__input');
			$(this).find('button').addClass('openOnEvent');
			event.preventDefault();
		}
	});
	/*конец*/
	/*Мобильная навигация*/
	$('.header--nav__mobile-btn').click(function(){
		if($(this).hasClass('openOnEvent') == false){
			$('.openOnEvent').removeClass('openOnEvent');
			custom_selectEvents(true,true,$(this),'header--nav__mobile');
			$(this).addClass('openOnEvent');
		} else {
			custom_selectEvents(false,false,$(this),'header--nav__mobile');
			$(this).removeClass('openOnEvent');
		}
	});
	/*конец*/
	
	
	
	
	if($('.main--carousel-row').length > 0){
		var length_slide = $('.main--carousel-row').find('.main--carousel-item').length;
		if(length_slide < 10){
			length_slide = "0"+length_slide;
		}
		$('.main--carousel--indicator__max').text(length_slide);
		
		$('.main--carousel--background-image').css('background-image','url('+$('.main--carousel-item').first().attr('data-image_carousel')+')');
	}
	
	
	
	
	
	/*карусели*/
	if($('.slider').length > 0){
		$('.slider').slick({
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: false,
			arrows: false,
			slidesToShow: 1,
			autoplay: false,
			variableWidth: false,
			centerMode: false,
			autoplaySpeed: 5000,
			prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"></button>',
			nextArrow: '<button class="slick-next" aria-label="Next" type="button"></button>',
		});
		function setOptionSlider(){
			$('.slider').each(function(){
				/*адаптив*/
				var count_def = parseInt($(this).attr('data-count_def'),10);
				var xl_count = parseInt($(this).attr('data-xl_count'),10);
				var lg_count = parseInt($(this).attr('data-lg_count'),10);
				var md_count = parseInt($(this).attr('data-md_count'),10);
				var sm_count = parseInt($(this).attr('data-sm_count'),10);
				/**/
				if(typeof $(this).attr('data-dotsSet') !== typeof undefined && $(this).attr('data-dotsSet') !== false && $(this).attr('data-dotsSet') != '0'){
					var setDots = true;
				} else {
					var setDots = false;
				}
				if(typeof $(this).attr('data-arrowNav') !== typeof undefined && $(this).attr('data-arrowNav') !== false && $(this).attr('data-arrowNav') != '0'){
					var setArrows = true;
				} else {
					var setArrows = false;
				}
				//
				if(typeof $(this).attr('data-variableWidth') !== typeof undefined && $(this).attr('data-variableWidth') !== false && $(this).attr('data-variableWidth') != '0'){
					var variableWidth = true;
				} else {
					var variableWidth = false;
				}
				if(typeof $(this).attr('data-centerMode') !== typeof undefined && $(this).attr('data-centerMode') !== false && $(this).attr('data-centerMode') != '0'){
					var centerMode = true;
				} else {
					var centerMode = false;
				}
				//
				if(typeof $(this).attr('data-autoPlay') !== typeof undefined && $(this).attr('data-autoPlay') !== false && $(this).attr('data-autoPlay') != '0'){
					var autoPlay = false;
				} else {
					var autoPlay = true;
				}
				if(typeof $(this).attr('data-infinite') !== typeof undefined && $(this).attr('data-infinite') !== false && $(this).attr('data-infinite') != '0'){
					var infinite = false;
				} else {
					var infinite = true;
				}
				//
				if(typeof $(this).attr('data-fade') !== typeof undefined && $(this).attr('data-fade') !== false && $(this).attr('data-fade') != '0'){
					var fade = false;
				} else {
					var fade = true;
				}
				
				if(typeof $(this).attr('data-scrollSlide') !== typeof undefined && $(this).attr('data-scrollSlide') !== false && $(this).attr('data-scrollSlide') != '0'){
					var scrollSlide = parseInt($(this).attr('data-scrollSlide'),10);
				} else {
					var scrollSlide = 1;
				}
				
				
				$(this).slick('slickSetOption',{
					infinite: infinite,
					slidesToScroll: 1,
					dots: setDots,
					arrows: setArrows,
					slidesToShow: count_def,
					autoplay: autoPlay,
					variableWidth: variableWidth,
					centerMode: centerMode,
					autoplaySpeed: 5000,
					fade: fade,
					responsive: [
						{
							breakpoint: 1199,
							settings: {
								slidesToShow: xl_count
							}
						},
						{
							breakpoint: 1024,
							settings: {
								slidesToShow: lg_count
							}
						},
						{
							breakpoint: 769,
							settings: {
								slidesToShow: md_count
							}
						},
						{
							breakpoint: 576,
							settings: {
								slidesToShow: sm_count,
							}
						}
					]
				},true);
			});
		}
		setOptionSlider();
		window.addEventListener('resize', function(event){
			setOptionSlider();
		});
		
		$('.slider-out_btn').click(function(){
			var action = $(this).attr('data-action');
			switch(action){
				case 'prev' : {
					$('#'+$(this).attr('data-slider')).slick('slickPrev');
				} break;
				case 'next' : {
					$('#'+$(this).attr('data-slider')).slick('slickNext');
				} break;
			}
		});
		
		if($('.main--carousel-row').length > 0){
			$('.main--carousel-row').on('beforeChange', function(event, slick, currentSlide, nextSlide){
				//console.log(nextSlide);
				var now_length = parseInt($('.main--carousel--indicator__max').text(),10)-1;
				var calc_width = 100/now_length;
				var set_width = nextSlide*calc_width;
				$('.main--carousel--indicator__bar').css('width',set_width+'%');
				
				$('.main--carousel--background-image').css('background-image','url('+$('.slick-slide[data-slick-index="'+nextSlide+'"]').find('.main--carousel-item').attr('data-image_carousel')+')');
				
			});
		}
	}
	
	/*
	--------------
	Поля для ввода
	--------------
	
			if($(this).val() != ''){
				if($(this).hasClass('form__input--phone-full') == true){
					console.log($(this).val().indexOf('_'))
					if($(this).val().indexOf('_') == -1){
						check_input++;
					}
				} else {
					check_input++;
				}
			}
	
	*/
	if($('.label--input').length > 0){
		if($('.phone--input').length > 0){
			$('.phone--input').inputmask({"mask": "+7 (999) 999-99-99"});
		}
		
		$('.label--input input').each(function(){
			if($(this).hasClass('phone--input') == true){
				if($(this).val().indexOf('_') == -1 && $(this).val() != ''){
					$(this).parents('.label--input').addClass('focus');
				}
			} else {
				if($(this).val() != ''){
					$(this).parents('.label--input').addClass('focus');
				}
			}
		});
		
		$('.label--input input').focusin(function(){
			if($(this).hasClass('phone--input') == true){
				if($(this).val().indexOf('_') == -1 && $(this).val() == ''){
					$(this).parents('.label--input').addClass('focus');
				}
			} else {
				if($(this).val() == ''){
					$(this).parents('.label--input').addClass('focus');
				}
			}
		}).focusout(function(){
			if($(this).hasClass('phone--input') == true){
				if($(this).val().indexOf('_') == -1 && $(this).val() == ''){
					$(this).parents('.label--input').removeClass('focus');
				}
			} else {
				if($(this).val() == ''){
					$(this).parents('.label--input').removeClass('focus');
				}
			}
		});
	}
	/*
	--------------
	Сервисы на главной странице
	--------------
	*/
	if($(".services-second__scroll").length > 0){
		$(".services-second__scroll").mCustomScrollbar({
			axis: 'y'
		});
	}
});