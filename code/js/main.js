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
	});
	
	$(window).load(function(){
		if($('#map').hasClass('map')){
			//Google Map					
			var latlng = new google.maps.LatLng(45.738028,21.224535);
			var settings = {
				zoom: 16,
				center: new google.maps.LatLng(45.738028,21.224535), 
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
			
			var contentString = '<div id="content">'+
				'<div id="siteNotice">'+
				'</div>'+
				'<h3 id="firstHeading" class="firstHeading">Mali Studio</h3>'+
				'<div id="bodyContent">'+
				'<p>Here we are!</p>'+
				'</div>'+
				'</div>';
			var infowindow = new google.maps.InfoWindow({
				content: contentString
			});
			
			var companyImage = new google.maps.MarkerImage('images/marker.png',
				new google.maps.Size(32,47),<!-- Width and height of the marker -->
				new google.maps.Point(0,0),
				new google.maps.Point(35,20)<!-- Position of the marker -->
			);

			var companyPos = new google.maps.LatLng(45.738028,21.224535);
			
			var companyMarker = new google.maps.Marker({
				position: companyPos,
				map: map,
				icon: companyImage,               
				title: "Mali",
				zIndex: 3
			});

			google.maps.event.addListener(companyMarker, 'click', function() {
				infowindow.open(map,companyMarker);
			});
		}
	});
})(jQuery);