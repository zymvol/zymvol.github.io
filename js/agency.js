/*!
 * Start Bootstrap - Agnecy Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(document).ready(function(){
	main();
});

function main(){
    $('a.page-scroll').bind('click', function(event) {
	var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutCubic');
        event.preventDefault();
    });

		// Highlight the top nav as scrolling occurs
		$('body').scrollspy({
		    target: '.navbar-fixed-top'
		})

		// Closes the Responsive Menu on Menu Item Click
		$('.navbar-collapse ul li a').click(function() {
		    $('.navbar-toggle:visible').click();
		});

	
	// logo changes when we go outside the header
	// TODO: use scrollspy?
	$(window).scroll(function(){
	    if ( $(window).scrollTop() > 120 ) {
	      $('.logo').addClass('scrolling');
	    } 
	    else {
	      $('.logo').removeClass('scrolling');
	    }
	});
	
	console.log($("nav").outerHeight());
}
