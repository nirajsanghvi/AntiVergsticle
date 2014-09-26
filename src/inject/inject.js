chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
		
		function link_to_title(link_text){
			var link_frags = link_text.split('/');
			
			var link_title = link_frags[link_frags.length - 1];
			
			link_title = link_title.replace(/([a-z\d])([A-Z]+)/g, '$1 $2').replace(/[-\s]+/g, ' ');
			
			link_title = link_title.charAt(0).toUpperCase() + link_title.slice(1);
			
			return link_title;
		}

		jQuery.each(jQuery('h3 > a, .m-rock-trending-discussions .title a, .m-new-articles__story a, .m-rock-read-this a'), function(){
			jQuery(this).text(link_to_title(jQuery(this).prop('href')));		
		});

		jQuery.each(jQuery('.m-hero__slot-link'), function(){
			jQuery(this).find('h2').text(link_to_title(jQuery(this).prop('href')));
		});
		
		jQuery.each(jQuery('a.m-carousel__item, .m-big-stories__story a, .m-big-stories__main > a, .m-video-hero__main-entry > a, .p-rock__basic-article-list a'), function(){
			jQuery(this).find('h3').text(link_to_title(jQuery(this).prop('href')));
		});
		
		jQuery.each(jQuery('.m-rock-recent-reviews__entry-link, .m-rock-popular-features__entry, .m-video-hero__playlist-entry > a'), function(){
			jQuery(this).find('h4').text(link_to_title(jQuery(this).prop('href')));
		});
		
		jQuery.each(jQuery('.p-entry-nav a'), function(){
			jQuery(this).find('span').text(link_to_title(jQuery(this).prop('href')));
		});		

	}
	}, 10);
});