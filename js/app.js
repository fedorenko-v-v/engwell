$(document).ready(function() {
	$('.reviewsList').slick({
		dots: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1
	});

	$(".audio_player_section" ).audio_player_plugin({});

	$(window).scroll(function() {
		if($(this).scrollTop() > 200) {
			$('#btnToTop').fadeIn();
		}
		else {
			$('#btnToTop').fadeOut();
		}
	});

	$('#btnToTop').click(function() {
		$('body,html').animate({scrollTop:0},1000);
	});

	$('a[href^="#"]').on('click', function(event) {
		$('.mainMenu').removeClass('open');
		$('.listMenu a').removeClass('active');
		$(this).addClass('active');
		event.preventDefault();
		var sc = $(this).attr("href"),
		 		 dn = $(sc).offset().top;
		$('html, body').animate({scrollTop: dn}, 1000);
	});

	$('.btnMenu').on('click', function(event) {
		$('.mainMenu').toggleClass('open');
	});

});
