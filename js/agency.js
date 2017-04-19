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

	function ScrollSticker(section_ids){
		this.MAX_SCROLL_DIST = 110;
	
		this.section_ids = section_ids;
	        this.last_pos = 0;	
		this.current_section = -1;
		var that = this;

		var win_height = window.innerHeight;
	        this.section_ids.forEach(function(x){
			console.log(x+" "+$("#"+x).height()+ " " + win_height)
			if($("#"+x).height() < win_height){	
				$("#"+x).height(win_height+5);
			}
		});

		this.deactivated = false;

		$(window).scroll(function(e){
			var diff = $(this).scrollTop() - that.last_pos;
			console.log(diff);
			that.section_ids.forEach(function(x){
                 	        if(!that.deactivated && Math.abs(diff) < that.MAX_SCROLL_DIST){
					//up to down	
					var scrollBottom = $(this).scrollTop() + $(window).height();
					var div_offset = $('#'+x).offset().top;
					var distance  = (div_offset - scrollBottom);
					//console.log(x+" "+distance+" "+that.sticky[x]+" "+that.current_section);
					
					if (diff > 0 // we are moving down 
					&& distance < 100  
					&& that.section_ids.indexOf(x) > that.section_ids.indexOf(that.current_section)){
						that.current_section = x;
						//console.log("DOWN! currrent section: "+that.current_section);
						that.disable();
						$('html, body').stop().animate({
							scrollTop: $("#"+x).offset().top
						}, 1000, 'easeInOutCubic', function(){that.enable();});
					}

					// Down to up
					var scrollTop = $(this).scrollTop();
					var div_offset_bottom = $('#'+x).offset().top + $('#'+x).height(); 
					var distance_to_top  = (div_offset_bottom - scrollTop);
					
					//console.log("section: " + x + " distance to top: " + distance_to_top + " current section: "+that.current_section);
					if (diff < 0 // we are moving up!
					&& distance_to_top < 100 && distance_to_top > 0
					&& that.section_ids.indexOf(x) < that.section_ids.indexOf(that.current_section)
					){
						that.current_section = x;
						/* if (that.current_section === undefined){
							that.current_section = -1;
						}*/
						console.log("moving to "+that.current_section);
						that.disable();
						$('html, body').stop().animate({
							scrollTop: $("#"+that.current_section).offset().top
						}, 1000, 'easeInOutCubic', function(){that.enable();});
					}
				}
				that.last_pos = $(this).scrollTop();
			});
		});
	};

	ScrollSticker.prototype.disable = function() {
		console.log("sc disabled!")
		this.deactivated = true;
	}

	ScrollSticker.prototype.enable = function() {
                console.log("sc enabled!");
		this.deactivated = false;
        }


	var sc  = new ScrollSticker(["video_section", "what", "why", "how", "team", "services", "contact"]);
	
	$('a.page-scroll').bind('click', function(event) {
		var $anchor = $(this);
		sc.disable();
		$('html, body').stop().animate({
		    scrollTop: $($anchor.attr('href')).offset().top
		}, 1500, 'easeInOutCubic', function(){sc.enable();});
		event.preventDefault();
	});

	//console.log($("nav").outerHeight());
}
