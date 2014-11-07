(function($) {
	"use strict";
	
	var browser_height = $(window).height();
	var section_height, height_difference;
	var s;
	var $root = $('html, body');
	var navigation_height = $("#navigation").outerHeight();;
	var perfect_scrollbar_elements = $('.perfect-scrollbar');
	
	// Hide Loading
	function hide_loading()
	{
		$("#loading").fadeOut();
	}
	
	// Section Auto Height
	function adjust_section()
	{
		$(".auto-height").each(function() {
			$(this).css("padding-top", 0);
			$(this).css("padding-bottom", 0);
			
			browser_height = $(window).height();
			section_height = $(this).height();
			height_difference = browser_height - section_height - navigation_height;
			
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
	
	// Auto Adjust Affix
	function adjust_affix()
	{
		browser_height = $(window).height();
		$('#navigation').affix({
			offset: {
				top: browser_height
			}
		});
	}
	
	// Init Perfect Scroll
	function init_perfect_scroll()
	{
		perfect_scrollbar_elements.perfectScrollbar();
	}
	
	// Init Google Maps
	function init_maps()
	{
		//Google Map					
		var latlng = new google.maps.LatLng(-37.927338, 145.109272);
		var settings = {
			zoom: 16,
			center: latlng, 
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			mapTypeControl: false,
			scrollwheel: false,
			draggable: true,
			mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
			navigationControl: false,
			navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
		};

		var map = new google.maps.Map(document.getElementById("map_canvas"), settings);
		
		google.maps.event.addDomListener(window, "resize", function() {
			var center = map.getCenter();
			google.maps.event.trigger(map, "resize");
			map.setCenter(center);
		});
		
		var contentString = '<div id="content" class="text-center">'+
			'<h3 id="firstHeading" class="entry-title">Lenasia</h3>'+
			'<div id="bodyContent">'+
			'<p>Find us here</p>'+
			'</div>'+
			'</div>';
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});
		
		var companyImage = new google.maps.MarkerImage('images/custom-marker.png',
			new google.maps.Size(33,47),<!-- Width and height of the marker -->
			new google.maps.Point(0,0),
			new google.maps.Point(35,20)<!-- Position of the marker -->
		);
		
		var companyMarker = new google.maps.Marker({
			position: latlng,
			map: map,
			icon: companyImage,               
			title: "Mali",
			zIndex: 3
		});

		google.maps.event.addListener(companyMarker, 'click', function() {
			infowindow.open(map,companyMarker);
		});
	}

	$(document).ready(function() {
		// Auto Adjust Height
		adjust_section();
		
		// Auto Adjust Affix
		adjust_affix();
		
		// Activate Skroll
		if (Modernizr.touch) {
			
		}
		else {
			//s = skrollr.init();
		}
		
		// Activate Perfect Scrollbar
		init_perfect_scroll();
		
		// Smooth Scroll
		$('a[href^="#"]').click(function() {
			var href = $.attr(this, 'href');
			$root.animate({
				scrollTop: $(href).offset().top - navigation_height
			}, 750, function () {
				window.location.hash = href;
			});
			return false;
		});
		
		// Magnific Popup
		/*$('.magnific-popup').magnificPopup({
			gallery: {
				enabled: true
			},
			mainClass: 'mfp-fade',
			type:'image'
		});*/
		
		$('.project-thumbnail').each(function() { // the containers for all your galleries
			$(this).magnificPopup({
				delegate: 'a', // the selector for gallery item
				type: 'image',
				gallery: {
				  enabled:true
				}
			});
		}); 
		
		// Featured Projects Carousels
		var projects = $("#projects");
		projects.owlCarousel({
			slideSpeed : 350,
			paginationSpeed : 400,
			singleItem:true
		});
		
		// Custom Navigation Events
		$(".next").click(function(){
			projects.trigger('owl.next');
		});
		$(".prev").click(function(){
			projects.trigger('owl.prev');
		});
		
		// Tweet
		$('.tweets').twittie({
			username: 'envatomarket', // change username here
			dateFormat: '%b. %d, %Y',
			template: '{{tweet}} {{user_name}}',
			count: 10
		}, function() {
			var item = $('.tweets ul');
			
			item.children('li').first().show().siblings().hide();
			setInterval(function() {
				item.find('li:visible').fadeOut(500, function() {
					$(this).appendTo(item);
					item.children('li').first().fadeIn(500);
				});
			}, 5000);
		});
		
		// Init Google Maps
		init_maps();
	});
	
	
	$( window ).resize(function() {
		adjust_section();
		adjust_affix();
		perfect_scrollbar_elements.perfectScrollbar('update');
	});
	
	$(window).load(function() {
		adjust_section();
		adjust_affix();
		
		hide_loading();
		
		// Initiate WOW
		new WOW().init();
	});
})(jQuery);