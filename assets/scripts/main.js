jQuery(document).ready(function($) {
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

			menu.find('.js-select-item.active').removeClass('active');
			$(this).addClass('active');
			toggle.html(option).removeClass('placeholder');
			input.val(option);
		}

		event.preventDefault();
	});

	$(document).on('click', '.js-dropdown-keepopen .dropdown-menu', function (e) {
	  e.stopPropagation();
	});

	function counter () {
		if( !$('.js-counter').length ) {
			throw ".js-counter selector is not found!";
		}

		if( !$('.js-counter-total').length ) {
			throw ".js-counter-total selector is not found!";
		}

		var inputTotal = $('.js-counter-total');
		var total = parseInt(inputTotal.val());
		
		$('.js-counter').each(function(i, coutner) {
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
				total--;
				value.val(parseInt(value.val()) - 1);
				$('.js-counter-value').html(total);
				inputTotal.val(total);
				console.log(inputTotal.val());
				if ( parseInt( value.val() ) < 1 ) {
					value.val( 0 );
					$(this).prop('disabled', true);
				}
			});

			btnUp.click(function() {
				total++;
				value.val(parseInt(value.val()) + 1);
				$('.js-counter-value').html(total);
				inputTotal.val(total);
				console.log(inputTotal.val());

				if ( parseInt(value.val()) > 0 ) {
					btnDown.prop('disabled', false);
				}
			});
		});

	}

	counter();

	$('#defaultPopup,#defaultInline').datepick({
		rangeSeparator: '-',
		rangeSelect: true,
		monthsToShow: 2,
		minDate: 0,
		showAnim: '',
		dateFormat: 'D, M d',
		todayText: '',
		prevText: ' ', 
		nextText: ' ',
		dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		useMouseWheel: false,
		changeMonth: false,
    commandsAsDateFormat: true,
   //  renderer: {
   //  	picker: '<div class="datepick">' +
			// '<div class="datepick-nav">{link:prev}{link:next}</div>{months}' +
			// '{popup:start}<div class="datepick-ctrl">{link:clear}{link:close}</div>{popup:end}' +
			// '<div class="datepick-clear-fix"></div></div>',
			// month: '<div class="datepick-month"><div class="datepick-month-header">{monthHeader}</div>' +
			// '<div><div>{weekHeader}</div><div>{weeks}</div></div></div>',
			// weekHeader: '<div>{days}</div>',
			// dayHeader: '<div>{day}</div>',
			// week: '<div>{days}</div>',
			// day: '<div>{day}</div>',
			// daySelector: 'div'
   //  }
	});

});