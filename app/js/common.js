$(function () {
	$(window).resize(function () {

		$('.slider__text').each(function () {
			$(this).css({
				position: 'absolute',
				left: ($('.slider__item').width() - $(this).outerWidth()) / 2,
				top: ($('.slider__item').height() - $(this).outerHeight()) / 2
			});
		});

	});

// To start the function:
	$(window).resize();



	//this code is for smooth scroll and nav selector
	$(document).ready(function () {

		$('.hamburger').click(function () {
			$('.hamburger').toggleClass('is-active');
		});

		$('#slider1').slick({
			dots: true,
			infinite: true,
			autoplay: true
		});

		$('#slider2').slick({
			dots: true,
			arrows: false,
			infinite: false,
			// autoplay: true,
			slidesToShow: 3,
			slidesToScroll: 3,
			responsive: [
				{
					breakpoint: 1920,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						infinite: true,
						dots: true
					}
				},
				{
					breakpoint: 1210,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				},
				{
					breakpoint: 800,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
				// You can unslick at a given breakpoint now by adding:
				// settings: "unslick"
				// instead of a settings object
			]

		}).addClass('overlay2');

		$('.header__banner .slick-list').addClass('overlay');

		var defaultColor = $('.default-color').css('color');
		$('.meta-head').attr('content',defaultColor);

		$('.features__item:first-child').css('margin-left','0');
		$('.features__item:last-child').css('margin-right','0');


		(function ( $ ) {

			$.fn.skillBars = function( options ) {

				var settings = $.extend({
					from: 0,  			// number start
					to: false,			// number end
					speed: 1000,  		// how long it should take to count between the target numbers
					interval: 100,	  // how often the element should be updated
					decimals: 0,		  // the number of decimal places to show
					onUpdate: null,	  // callback method for every time the element is updated,
					onComplete: null,	  // callback method for when the element finishes updating
					/*onComplete: function(from) {
					 console.debug(this);
					 }*/
					classes:{
						skillBarBar : '.skillbar-bar',
						skillBarPercent : '.skill-bar-percent',
					}
				}, options );

				return this.each(function(){

					var obj = $(this),
						to = (settings.to != false) ? settings.to : parseInt(obj.attr('data-percent'));
					if(to > 100){
						to = 100;
					};
					var from = settings.from,
						loops = Math.ceil(settings.speed / settings.interval),
						increment = (to - from) / loops,
						loopCount = 0,
						interval = setInterval(updateValue, settings.interval);

					obj.find(settings.classes.skillBarBar).animate({
						width: parseInt(obj.attr('data-percent'))+'%'
					}, settings.speed);

					function updateValue(){
						from += increment;
						loopCount++;
						$(obj).find(settings.classes.skillBarPercent).text(from.toFixed(settings.decimals)+'%');

						if (typeof(settings.onUpdate) == 'function') {
							settings.onUpdate.call(obj, from);
						}

						if (loopCount >= loops) {
							clearInterval(interval);
							from = to;

							if (typeof(settings.onComplete) == 'function') {
								settings.onComplete.call(obj, from);
							}
						}
					}

				});

			};

		}( jQuery ));



		$('.skillbar').skillBars({
			from: 0,
			speed: 3000,
			interval: 100,
			decimals: 0,
		});

		var map = new GMaps({
			div: '#map',
			lat: 49.843305,
			lng: 24.026609,
		});
		map.addMarker({
			lat: 49.843305,
			lng: 24.026609,
			title: 'Lima',
			click: function (e) {
				alert('You clicked in this marker');
			}
		});


		$(document).on("scroll", onScroll);

		//smoothscroll
		$('a[href^="#"]').on('click', function (e) {
			e.preventDefault();
			$(document).off("scroll");

			$('a').each(function () {
				$(this).removeClass('active');
			});
			$(this).addClass('active');

			var target = this.hash,
				menu = target;
			$target = $(target);
			$('html, body').stop().animate({
				'scrollTop': $target.offset().top + 2
			}, 500, 'swing', function () {
				window.location.hash = target;
				$(document).on("scroll", onScroll);
			});
		});
	});
	function onScroll(e) {
		var scrollPos = $(document).scrollTop();
		$('.navbar-nav li a').each(function () {
			var currLink = $(this);
			var refElement = $(currLink.attr("href"));
			if (refElement.position().top <= scrollPos+200 && refElement.position().top + refElement.height() > scrollPos+200) {
				$('.navbar-nav li a').removeClass("active");
				currLink.addClass("active");
			} else {
				currLink.removeClass("active");
			}
		});
	}

	$(window).resize();

	$(".form input").each(function(){
		var formInput = $(this).prev().text();
		$(this).attr('placeholder', formInput)
	});
	$(".form textarea").each(function(){
		var formInput = $(this).prev().text();
		$(this).attr('placeholder', formInput)
	});

	//height
	var contactHeight = $('.contact__content').outerHeight(true);
	$('#map').css('min-height', contactHeight);
	$('.contact__wrap').css('min-height', contactHeight).css('margin-top', -contactHeight);


	var aboutImg = $('.about__img img').outerHeight(true);
	$('.about__img').css('height', aboutImg);



});


