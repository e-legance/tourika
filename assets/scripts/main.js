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

	function fieldValidation ( selector, echo ) {
		var success = true;

		if ( $(selector).length ) {

			if ( $(selector).val() === '' || $(selector).val() === '0' ) {
				if ( echo ) {
					$(selector).closest('.form__group').addClass('form--invalid');
				} else {
					success = false;
				}
			} else if ( !echo ) {
				$(selector).closest('.form__group').removeClass('form--invalid');
			}
		}

		return success;
	}

	function formValidation ( selector ) {
		if ( $(selector).length ) {
			var required = $(selector).find('.js-required');
			var success = true;

			$(required).each(function(i, req) {

				if ( $(req).closest('.tab-pane').length ) {
					if ( $(req).closest('.tab-pane').hasClass('active') && !fieldValidation(req, false) ) {
						success = false;
					}
				} else if( !fieldValidation(req, false) ) {
					success = false;
				}
			});

			$(selector).find('[type="submit"]').prop('disabled', !success);

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
					formValidation( $(this).closest('.js-form-validation') );
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
					formValidation( $(this).closest('.js-form-validation') );
				});
			});
		}
	}

	counter();
	anchorSmoothScroll('.js-anchor');

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

	$('.js-select-item').click(function(event) {
		if ( !$(this).hasClass('active') ) {
			var menu = $(this).parents('.js-select-menu');
			var toggle = menu.find('.js-select-toggle');
			var input = menu.find('.js-dropdown-input');
			var option = $(this).find('.js-select-option').text();

			toggle.html(option).removeClass('placeholder');
			input.val(option);

			if ( $(this).data('toggle') !== 'tab' ) {
				menu.find('.js-select-item.active').removeClass('active');
				$(this).addClass('active');
				fieldValidation(input, true);
				formValidation( $(this).closest('.js-form-validation') );
			} else {
				$(this).on('shown.bs.tab', function (e) {
					fieldValidation(input, true);
					formValidation( $(this).closest('.js-form-validation') );
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

	$('.form__control').change(function() {
		if($(this).val() !== '') {
			$(this).removeClass('empty');
		} else {
			$(this).addClass('empty');
		}

		if ( $(this).hasClass('js-required') ) {
			formValidation( $(this).closest('.js-form-validation') );
		}
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
});