(function($) {
	"use strict";
	
	var browser_height = $(window).height();
	var section_height, height_difference;
		
	// Section Auto Height
	function adjust_section()
	{
		$(".auto-height").each(function() {
			$(this).css("padding-top", 0);
			$(this).css("padding-bottom", 0);
			
			browser_height = $(window).height();
			section_height = $(this).height();
			height_difference = browser_height - section_height;
			
			if(height_difference > 0) {
				$(this).css("margin", 0);
				$(this).css("padding-top", height_difference/2);
				$(this).css("padding-bottom", height_difference/2);
			}
			else
			{
				$(this).css("padding-top", 35);
				$(this).css("padding-bottom", 35);
			}
		});
	}
	
	function adjust_affix()
	{
		$('#navigation').affix({
			offset: {
				top: 100,
				bottom: function () {
					return (this.bottom = $('.footer').outerHeight(true))
				}
			}
		});
	}

	$(document).ready(function() {
		// Auto Adjust Height
		adjust_section();
		
		// Auto Adjust Affix
		adjust_affix();
		
		// Magnific Popup
		$('.magnific-popup').magnificPopup({
			gallery: {
				enabled: true
			},
			mainClass: 'mfp-fade',
			type:'image'
		});
		
		// Featured Projects Carousels
		$("#projects").owlCarousel({
 
			  navigation : true, // Show next and prev buttons
			  slideSpeed : 300,
			  paginationSpeed : 400,
			  singleItem:true
		 
			  // "singleItem:true" is a shortcut for:
			  // items : 1, 
			  // itemsDesktop : false,
			  // itemsDesktopSmall : false,
			  // itemsTablet: false,
			  // itemsMobile : false
		 
		});
	});
})(jQuery);