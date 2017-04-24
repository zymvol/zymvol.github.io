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
            if(!that.deactivated){
                that.section_ids.forEach(function(x){
                    // Up -> down movement
                    var scrollBottom = $(this).scrollTop() + $(window).height();
                    var div_offset = $('#'+x).offset().top;
                    var distance  = (div_offset - scrollBottom);

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

                    // Down -> up movement
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
                });
			}
			else{
                that.update_current_section();
            }
			that.last_pos = $(this).scrollTop();
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

	function calculateVisibilityForDiv(div$) {
        var windowHeight = $(window).height(),
            docScroll = $(document).scrollTop(),
            divPosition = div$.offset().top,
            divHeight = div$.height(),
            hiddenBefore = docScroll - divPosition,
            hiddenAfter = (divPosition + divHeight) - (docScroll + windowHeight);

        if ((docScroll > divPosition + divHeight) || (divPosition > docScroll + windowHeight)) {
            return 0;
        } else {
            var result = 100;

            if (hiddenBefore > 0) {
                result -= (hiddenBefore * 100) / divHeight;
            }

            if (hiddenAfter > 0) {
                result -= (hiddenAfter * 100) / divHeight;
            }

            return result;
        }
    }

    function calculateAndDisplayForAllSections(){
	var results = {};
        $('.scrollyfiable').each(function () {
            var div$ = $(this);
            results[div$.attr('id')] = calculateVisibilityForDiv(div$);
        });
	return results;
    }

	ScrollSticker.prototype.update_current_section = function() {
		
                var fracs = calculateAndDisplayForAllSections();
		console.log(fracs);		
		var max_value = 0.0;
		var max_id;
		for (var section_id in fracs) {
			var currentValue = fracs[section_id];
			console.log(section_id +" "+currentValue);
			if(currentValue >= max_value){
				max_value = currentValue;
				max_id = section_id;
			}
		}
		
		this.current_section = max_id;
		console.log("NEW CURRENT SECTION: "+this.current_section);
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


	$( window )
  .mouseup(function() {
	console.log("up");
	sc.enable();
  })
  .mousedown(function() {
	console.log("down!");
	sc.disable();
  });
}
