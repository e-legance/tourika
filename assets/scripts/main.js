jQuery(document).ready(function($) {

	function anchorSmoothScroll ( selector, offset_top ) {

		$(selector + '[href^="#"]:not([href="#"])').click(function () {

			var offset_top = ( offset_top ) ? offset_top : 0;
			var target = $(this.hash);
			
			if ( target.length ) {
				$('html, body').animate({
					scrollTop: target.offset().top - offset_top
				}, 600);

				return false;
			}
		});
	}

	function appendCalendar (selector, title, confirm ) {
		$('<button type="button" class="dropdown__close position-relative font-family-nexa-bold d-sm-none w-100 js-calandar-close">'+ title +'</button>').insertBefore($(selector).find('.datepick-nav'));

		$(selector).append('<div class="dropdown__confirm d-sm-none mt-auto px-20 py-15 bg-white"><button type="button" class="btn btn--lg btn--orange w-100 js-calandar-close">'+ confirm +'</button></div>');
	}

	function currentSelect(selector) {
		var lastId,
			menu = $(selector),
			fromTop = $(window).scrollTop(),
			menuItems = menu.find("a"),
			scrollItems = menuItems.map(function() {
				var item = $($(this).attr("href"));
				if (item.length) {

					return item;
				}
			});

		var cur = scrollItems.map(function() {
			if ($(this).offset().top - 60 <= fromTop && $(this).offset().top + $(this).height() >= fromTop) {
				return this;
			}
		});

		// Get the id of the current element
		cur = cur[cur.length - 1];
		var id = cur && cur.length ? cur[0].id : "";
		if (lastId !== id) {

			lastId = id;
			menuItems.parent().removeClass("active");
			menuItems.filter('[href="#' + id + '"]').parent().addClass("active");
		}
	}

	function reEmailValid ( email ) {
		var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		return re.test(email);
	}

	function rePhoneNumbers ( number ) {
		var re = /^\d+(-\d+)*$/g;
		return re.test(number);
	}

	function reOnlyNumbers ( number ) {
		var re = /^[0-9]+$/;
		return re.test(number);
	}

	function reCardNumbers ( string ) {
		var re = /\d{4}-?\d{4}-?\d{4}-?\d{4}/;
		return re.test(string);
	}

	function reSringLength ( string, min, max ) {
		var re = new RegExp("^.{" + min + "," + max +"}$");
		return re.test(string);
	}

	function keyPressOnlyNumber ( selector ) {
		$(document).on('keydown', selector, function(e) {
			return (e.keyCode >= 48 && e.keyCode <= 57) || 
						 (e.keyCode >= 96 && e.keyCode <= 105) || 
						  e.keyCode === 8 || e.keyCode === 46 || 
						  e.keyCode === 37 || e.keyCode === 39;
		});
	}

	function fieldValidation ( selector, echo ) {
		var success = true;

		if ( $(selector).length ) {

			if ( $(selector).val() === '' || $(selector).val() === '0' ) {
				if ( echo ) {
					$(selector).closest('.form__group').addClass('form--invalid');
					success = false;
				} else {
					success = false;
				}
			} else if ( $(selector).attr('type') === 'email' && !reEmailValid($(selector).val()) ) {
				if ( echo ) {
					$(selector).closest('.form__group').addClass('form--invalid');
					success = false;
				} else {
					success = false;
				}
			} else if ( $(selector).attr('type') === 'radio' && !$('input[name="'+ $(selector).attr('name') +'"]:checked').length ) {
				if ( echo ) {
					$(selector).closest('.form__group').addClass('form--invalid');
					success = false;
				} else {
					success = false;
				}
			} else if ( $(selector).hasClass('js-length-2') && !reSringLength( $(selector).val(), 2, 2) ) {
				if ( echo ) {
					$(selector).closest('.form__group').addClass('form--invalid');
					success = false;
				} else {
					success = false;
				}
			} else if ( $(selector).hasClass('js-length-4') && !reSringLength( $(selector).val(), 4, 4) ) {
				if ( echo ) {
					$(selector).closest('.form__group').addClass('form--invalid');
					success = false;
				} else {
					success = false;
				}
			} else if ( $(selector).hasClass('js-card-number') && !reCardNumbers( $(selector).val() ) ) {
				if ( echo ) {
					$(selector).closest('.form__group').addClass('form--invalid');
					success = false;
				} else {
					success = false;
				}
			}else if ( $(selector).hasClass('js-phone') && !rePhoneNumbers( $(selector).val() ) ) {
				if ( echo ) {
					$(selector).closest('.form__group').addClass('form--invalid');
					success = false;
				} else {
					success = false;
				}
			} else if ( $(selector).hasClass('js-cvv') && ( !reSringLength( $(selector).val(), 3, 3) || !reOnlyNumbers( $(selector).val() ) ) ) {
				if ( echo ) {
					$(selector).closest('.form__group').addClass('form--invalid');
					success = false;
				} else {
					success = false;
				}
			} else if ( $(selector).closest('.js-card-date') ) {
				$(selector).closest('.form__group').removeClass('form--invalid');

				var cardDate = $(selector).closest('.js-card-date').find('.js-required');

				cardDate.each(function(i, e) {
					if ( $(e).hasClass('js-length-2') && !reSringLength( $(e).val(), 2, 2) ) {
						if ( echo ) {
							$(e).closest('.form__group').addClass('form--invalid');
							success = false;
						} else {
							success = false;
						}
					}
				});
			}  else if ( ( $(selector).hasClass('js-number') || $(selector).attr('type') === 'number' ) && !reOnlyNumbers( $(selector).val() ) ) {
				if ( echo ) {
					$(selector).closest('.form__group').addClass('form--invalid');
					success = false;
				} else {
					success = false;
				}
			} else {
				$(selector).closest('.form__group').removeClass('form--invalid');
			}
		}

		return success;
	}

	function formValidation ( selector, echo ) {
		if ( $(selector).length ) {
			var required = $(selector).find('.js-required');
			var success = true;

			$(required).each(function(i, req) {

				if ( $(req).closest('.tab-pane').length ) {
					if ( $(req).closest('.tab-pane').hasClass('active') && !fieldValidation(req, false) ) {
						success = false;
					}
				} else if( !fieldValidation(req, echo) ) {
					success = false;
				}
			});

			if( !echo ) {
				$(selector).find('[type="submit"]').prop('disabled', !success);
			}

			return success;
		}
	}

	function counter () {
		if( $('.js-counter-wrap').length ) {

			var counter = $('.js-counter-wrap').find('.js-counter');
			var counterWrap = null;
			var inputTotal = null;
			var total = null;

			if( !$('.js-counter').length ) {
				throw ".js-counter selector is not found!";
			}
			
			$('.js-counter').each(function(i, coutner) {

				if( !$('.js-counter-total').length ) {
					throw ".js-counter-total selector is not found!";
				}

				if ( !$(coutner).find('.js-counter-down').length  ) {
					throw ".js-counter-down selector is not found!";
				}

				if ( !$(coutner).find('.js-counter-up').length  ) {
					throw ".js-counter-up selector is not found!";
				}

				if ( !$(coutner).find('.js-counter-value').length  ) {
					throw ".js-counter-value selector is not found!";
				}

				var btnDown = $(coutner).find('.js-counter-down');
				var btnUp = $(coutner).find('.js-counter-up');
				var value = $(coutner).find('.js-counter-value');

				btnDown.click(function() {
					counterWrap = $(this).closest('.js-counter-wrap');
					inputTotal = counterWrap.find('.js-counter-total');
					total = parseInt(inputTotal.val());

					total--;
					value.val(parseInt(value.val()) - 1);
					counterWrap.find('.js-counter-text-total').html(total);
					inputTotal.val(total);
					if ( parseInt( value.val() ) < 1 ) {
						value.val( 0 );
						$(this).prop('disabled', true);
					}

					fieldValidation(inputTotal, true);
					formValidation( $(this).closest('.js-form-validation'), false );
				});

				btnUp.click(function() {
					counterWrap = $(this).closest('.js-counter-wrap');
					inputTotal = counterWrap.find('.js-counter-total');
					total = parseInt(inputTotal.val());

					total++;
					value.val(parseInt(value.val()) + 1);
					counterWrap.find('.js-counter-text-total').html(total);
					inputTotal.val(total);

					if ( parseInt(value.val()) > 0 ) {
						btnDown.prop('disabled', false);
					}

					fieldValidation(inputTotal, true);
					formValidation( $(this).closest('.js-form-validation'), false );
				});
			});
		}
	}

	counter();
	anchorSmoothScroll('.js-anchor');
	keyPressOnlyNumber('.js-number');
	currentSelect($('.about__menu'));
	$(".about__nav").stick_in_parent();

	$(window).scroll(function() {
		currentSelect($('.about__menu'));
	});


	$('.js-btn-menu').click(function() {
		$('body').toggleClass('menu--opened');
	});

	$('.js-team-carousel').owlCarousel({
		loop: true,
		nav: true,
		dots: false,
		items: 1,
		navText: [
			'<svg width="15" height="27" viewBox="0 0 15 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 1L1 13.5L13.5 26" stroke="#132968" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
			'<svg width="15" height="27" viewBox="0 0 15 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 1L14 13.5L1.5 26" stroke="#132968" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
		],
	});

	$('.js-reviews-carousel').owlCarousel({
		loop: true,
		nav: true,
		dots: false,
		items: 1,
		navText: [],
	});

	$('.js-select-item').click(function(event) {
		if ( !$(this).hasClass('selected') ) {
			var menu = $(this).parents('.js-select-menu');
			var toggle = menu.find('.js-select-toggle');
			var input = menu.find('.js-dropdown-input');
			var option = $(this).find('.js-select-option').text();

			toggle.html(option).removeClass('placeholder');
			input.val(option);

			menu.find('.js-select-item.selected').removeClass('selected');
			$(this).addClass('selected');

			if ( $(this).data('toggle') !== 'tab' ) {
				fieldValidation(input, true);
				formValidation( $(this).closest('.js-form-validation'), false );
			} else {
				$(this).on('shown.bs.tab', function (e) {
					fieldValidation(input, true);
					formValidation( $(this).closest('.js-form-validation'), false );
				});
			}
		}
	});

	$(document).on('click', '.js-dropdown-keepopen .dropdown-menu', function (e) {
		e.stopPropagation();
	});

	if ( $('.js-calendar-period').length ) {
		$('.js-calendar-period').each(function(i, e) {
			var wrap = $(e).parents('.js-calendar-wrap');
			var button = wrap.find('.js-calendar-btn');
			$(e).datepick({
				showOnFocus: false,
				showTrigger: button,
				rangeSeparator: ',',
				rangeSelect: true,
				monthsToShow: 2,
				minDate: 0,
				showAnim: '',
				todayText: '',
				prevText: ' ', 
				nextText: ' ',
				dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
				useMouseWheel: false,
				changeMonth: false,
				commandsAsDateFormat: true,
				renderer: {
					day: '{day}'
				},
				onShow: function(data) {
					appendCalendar(data, $(e).data('title'), $(e).data('confirm'));
					$('body')
						.css('top', -$(window).scrollTop())
						.addClass('dropdown--opened calendar-period');
				},
				onClose: function() {
					$('body')
						.removeClass('dropdown--opened calendar-period')
						.removeAttr('style');
				},
				onSelect: function() {
					button = wrap.find('.js-calendar-btn');
					var from = button.find('.js-calendar-from');
					var to = button.find('.js-calendar-to');
					button.removeClass('placeholder');
					$(from).html($.datepick.formatDate('D d, M', $(e).datepick('getDate')[0])).removeClass('placeholder');
					$(to).html($.datepick.formatDate('D d, M', $(e).datepick('getDate')[1])).removeClass('placeholder');
					fieldValidation($(e), true);
					formValidation( $(e).closest('.js-form-validation') );
				}
			});
		});
	}

	if ( $('.js-calendar').length ) {
		$('.js-calendar').each(function(i, e) {
			var wrap = $(e).parents('.js-calendar-wrap');
			var button = wrap.find('.js-calendar-btn');
			$(e).datepick({
				showOnFocus: false,
				showTrigger: button,
				monthsToShow: 2,
				minDate: 0,
				showAnim: '',
				todayText: '',
				prevText: ' ', 
				nextText: ' ',
				dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
				useMouseWheel: false,
				changeMonth: false,
				commandsAsDateFormat: true,
				renderer: {
					day: '{day}'
				},
				onShow: function(data) {
					appendCalendar(data, $(e).data('title'), $(e).data('confirm'));
					$('body')
						.css('top', -$(window).scrollTop())
						.addClass('dropdown--opened');
				},
				onClose: function() {
					$('body')
						.removeClass('dropdown--opened')
						.removeAttr('style');
				},
				onSelect: function() {
					button = wrap.find('.js-calendar-btn');
					$(button).html($.datepick.formatDate('D d, M', $(e).datepick('getDate')[0])).removeClass('placeholder');
					fieldValidation($(e), true);
					formValidation( $(e).closest('.js-form-validation') );
				}
			});
		});
	}

	$('button.form__control').change(function() {
		if($(this).val() !== '') {
			$(this).removeClass('empty');
		} else {
			$(this).addClass('empty');
		}

		if ( $(this).hasClass('js-required') ) {
			formValidation( $(this).closest('.js-form-validation'), false );
		}
	});

	$('.js-form-validation').submit(function() {
		return formValidation( $(this).closest('.js-form-validation'), true );
	});

	$(document).on('click', '.js-dropdown-close', function() {
		$(this).closest('.dropdown').find('[data-toggle="dropdown"]').dropdown("hide");
	});

	$(document).on('click', '.js-calandar-close', function() {
		$('.js-calendar, .js-calendar-period').datepick('hide');
	});

	$('.dropdown').on('show.bs.dropdown', function () {
		if ( $(this).find('.dropdown-menu--fixed').length	) {
			$('body')
				.css('top', -$(window).scrollTop())
				.addClass('dropdown--opened');
		}
	}).on('hidden.bs.dropdown', function () {
		$('body')
			.removeClass('dropdown--opened')
			.removeAttr('style');
	});

	$('[data-toggle="tab-only-show"]:not(.active)').click(function() {
		var nav = $(this).closest('.nav');
		var active = $(nav).find('.active');
		var target = $(this).data('target');
		var activeTarget = $(active).data('target');

		$(activeTarget).removeClass('show active');
		$(target).tab('show');
	});

	$('.js-results-toggle-search').click(function() {
		$(this).toggleClass('active');
		$('.js-results-search').stop(true).slideToggle(400);
	});

	$('.js-rating').each(function(i, e) {
		$(e).raty({
			readOnly: true,
			half: true,
			score: $(e).data('rating'),
			starType: 'span',
			starHalf: 'star-half',
			starOff: 'star-off',
			starOn: 'star-on',
			targetType: '',
			hints: ['', '', '', '', '', ''],
			noRatedMsg: ''
		});
	});

	$('.js-option').change(function() {
		var form = $(this).closest('.js-form-options');
		var proceed = form.find('.js-options-proceed');

		proceed.removeClass('d-none');
	});

	$('.js-tour-slider').on('initialized.owl.carousel', function(event) {
		var count = event.item.count < 10 ? '0' + event.item.count : event.item.count;
		var progress = ++event.item.index / event.item.count  * 100;
		$('.js-tour-slider-cur-num').html('01');
		$('.js-tour-slider-total-num').html(count);
		$('.js-tour-slider-progress').css('width', progress + "%");
	}).owlCarousel({
		items: 1,
		smartSpeed: 500,
		dots: false,
		autoHeight: true,
		autoplay: true,
		autoplayTimeout: 3000,
		autoplayHoverPause: true
	}).on('changed.owl.carousel', function(event) {
		var index = event.item.index < 10 ? '0' + (++event.item.index) : ++event.item.index;
		var progress = event.item.index / event.item.count  * 100;
		$('.js-tour-slider-cur-num').html(index);
		$('.js-tour-slider-progress').css('width', progress + "%");
	});

	$('.js-expand').click(function(event) {
		var collapse = $(this).closest('.js-expands').find('.collapse');

		if ( $(this).hasClass('active') ) {
			collapse.each(function(i, e) {
				$(e).collapse('hide');
			});
		} else {
			collapse.each(function(i, e) {
				$(e).collapse('show');
			});
		}
		
		$(this).toggleClass('active');
	});

	$('.js-destination-switch').click(function() {
		var form = $(this).closest('form');
		var destinations = form.find('.js-destination');
		var data = [];

		destinations.each(function(i, e) {
			var input = $(e).find('.js-dropdown-input');

			data[i] =  input.val();
		});

		$.each(data.reverse(), function(i, val) {
			var input = destinations.eq(i).find('.js-dropdown-input');
			var button = destinations.eq(i).find('.js-select-toggle');

			input.val(val);
			if (val !== '') {
				button.text(val).removeClass('placeholder');
			} else {
				button.text( button.data('placeholder') ).addClass('placeholder');
			}
		});
	});

	$('.js-card-number').inputmask({
		mask: "9999-9999-9999-9999",
		placeholder: 'XXXX-XXXX-XXXX-XXXX'
	});

	$('.js-phone').inputmask({
		regex: "^[0-9]+(-[0-9]+)*$",
		placeholder: ''
	});

	$('.js-cvv').inputmask({
		mask: "999",
		placeholder: ''
	});

	$('.js-length-2.js-number').inputmask({
		mask: "99",
		placeholder: ''
	});

	$('.js-length-4.js-number').inputmask({
		mask: "9999",
		placeholder: ''
	});
});