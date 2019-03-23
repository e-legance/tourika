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

			menu.find('.js-select-item.active').removeClass('active');
			$(this).addClass('active');
			toggle.html($(this).html());
		}

		event.preventDefault();
	});
});