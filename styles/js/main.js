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
	if(navigator.userAgent.match(/Trident/) && navigator.userAgent.match(/rv[ :]11/)){
		doc.setAttribute('data-useragent', 'MSIE 11.0');
	}
	/*конец*/
	/*Поиск в шапке*/
	$('.search--row').on('submit', function(event){
		if($('.search--row').find('button').hasClass('openOnEvent') == false){
			$('.openOnEvent').removeClass('openOnEvent');
			custom_selectEvents(true,false,$('.search--row').find('button'),'search--row');
			$('.search--row').find('button').addClass('openOnEvent');
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
	модальные окна
	--------------
	*/
	if($('.phone_input').length > 0){
		$('.phone_input').inputmask({"mask": "+7 (999) 999-99-99"});
	}
	$('.openModalBTN').click(function(event){
		event.preventDefault();
		_setScrollbar();
		$('body').addClass('openModal');
		var targetBlock = $(this).attr('data-targetModal');
		$('.modal').removeClass('openModal');
		$('#'+targetBlock).addClass('openModal');
	});
	function openModal(targetBlock){
		_setScrollbar();
		$('body').addClass('openModal');
		$('.modal').removeClass('openModal');
		$('#'+targetBlock).addClass('openModal');
	};
	$('.close-modal').click(function(){
		$('body').removeClass('openModal');
		_resetScrollbar();
		$(this).parents('.modal').removeClass('openModal');
	});
	$(window).click(function(event){
		if($(event.target).hasClass('modal') == true){
			if($('.mobile-menu_btn').hasClass('open-menu') == false){
				$('body').removeClass('openModal');
				_resetScrollbar();
			}
			$(event.target).removeClass('openModal');
		}
	});
	
	function _setScrollbar() {
		var rect = document.body.getBoundingClientRect();
		var _isBodyOverflowing = rect.left + rect.right < window.innerWidth;
		var _scrollbarWidth = _getScrollbarWidth();
        if(_isBodyOverflowing){
			$('body').css('padding-right',_scrollbarWidth+'px');
        }
	};
	
	function _resetScrollbar(){
		$('body').css('padding-right','0px');
	}
	
	function _getScrollbarWidth() {
		var scrollDiv = document.createElement('div');
		scrollDiv.className = 'modal-scrollbar-measure';
		document.body.appendChild(scrollDiv);
		var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
		document.body.removeChild(scrollDiv);
		return scrollbarWidth;
	};
	/*
	--------------
	Поля для ввода
	--------------
	*/
	if($('.label--input').length > 0){
		//------------------------
		//Проверка полей для ввода
		//------------------------
		function _checkPhone(value){
			var phoneFilter = /^[+]*[7]\s[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
			if(!phoneFilter.test(value)){
				return false;
			}
			return true;
		}
		function _checkPhone_Start(value){
			var phoneFilter = /^[+]*[7]\s[(]{0,1}([0-9][_]{2}|[0-9]{2}[_]|[0-9]){1,3}[)]{0,1}([-\s\./0-9]|\s([_]|[0-9]){3}[-]([_]|[0-9]){2}[-]([_]|[0-9]){2})*$/g;
			if(!phoneFilter.test(value)){
				return false;
			}
			return true;
		}
		function _validate(email){
			var emailFilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/g;
			if (!emailFilter.test(email)) {
				return false;
			}
			return true;
		}
		
		
		
		
		
		
		if($('.phone--input').length > 0){
			$('.phone--input').inputmask({"mask": "+7 (999) 999-99-99"});
		}
		
		$('.label--input input').each(function(){
			if($(this).hasClass('phone--input') == true){
				if(_checkPhone_Start($(this).val()) == true){
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
				$(this).parents('.label--input').addClass('focus');
			} else {
				if($(this).val() == ''){
					$(this).parents('.label--input').addClass('focus');
				}
			}
		}).focusout(function(){
			if($(this).hasClass('phone--input') == true){
				if(_checkPhone_Start($(this).val()) == false){
					$(this).parents('.label--input').removeClass('focus');
					$(this).parents('.label--input').removeClass('error--input');
				}
			} else {
				if($(this).val() == ''){
					$(this).parents('.label--input').removeClass('focus');
				}
			}
		});
	}
	
	
	$('form').on('submit', function(event){
		//
		var $parent = $($(this)[0]['offsetParent']);
		var $check_this = $($(this)[0]);
		if($check_this.hasClass('search--row') == false){
			var $counter = 0;
			$parent.find('[required]').each(function(){
				if($(this).hasClass('phone--input') == true){
					if(_checkPhone($(this).val()) == true){
						$(this).parents('.label--input').removeClass('error--input');
					} else {
						$(this).parents('.label--input').addClass('error--input');
						$counter++;
					}
				} else {
					if($(this).hasClass('email--input') == false){
						if($(this).val() == ''){
							$(this).parents('.label--input').addClass('error--input');
							$counter++;
						} else {
							$(this).parents('.label--input').removeClass('error--input');
						}
					} else {
						if($(this).val() != ''){
							if(_validate($(this).val()) == false){
								$counter++;
							}
						}
					}
				}
			});
			if($counter == 0){
				openModal($parent.find('.button').attr('data-targetModal'));
			}
			event.preventDefault();
		}
	});
	
	function _checkEmail(block){
		if(block.val() != ''){
			block.prop('required',true);
			if(_validate(block.val()) == false){
				block.parents('.label--input').addClass('error--input');
			} else {
				block.parents('.label--input').removeClass('error--input');
			}
		} else {
			block.prop('required',false);
		}
	}
	if($('.email--input').length > 0){
		_checkEmail($('.email--input'));
		//
		$('.email--input').keyup(function(){
			_checkEmail($(this));
		});
		$('.email--input').focusout(function(){
			if($(this).val() == ''){
				$(this).parents('.label--input').removeClass('error--input');
				$(this).prop('required',false);
			} else {
				_checkEmail($(this));
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
	/*
	--------------
	Карта
	--------------
	*/
	if($('#map--bottom').length > 0){
		ymaps.ready(init);
		function init(){ 
			// Создание карты.    
			var myMap = new ymaps.Map("map--bottom", {
				center: [55.540730, 37.489967],
				zoom: 7
			});
			var myPlacemark;
			myPlacemark = new ymaps.Placemark(myMap.getCenter(),
				{
					hideIcon: false
				},
				{
					iconLayout: 'default#image',
					iconImageHref: 'styles/img/map--logo.png',
					iconImageSize: [71, 80],
					iconImageOffset: [-35.5, -80]
				});
			myMap.geoObjects
				.add(myPlacemark);
				
			myMap.behaviors.disable('scrollZoom');
			myMap.setZoom(16)
		}
	}
});