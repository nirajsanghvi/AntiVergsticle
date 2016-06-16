chrome.extension.sendMessage({}, function(response) {
	var showTooltip = false;
	var showHover = true;

	chrome.storage.sync.get({
		showTooltip: false,
		showHover: true
	}, function (items) {
		showTooltip = items.showTooltip;
		showHover = items.showHover;
	});

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

		function addHover($currElement, $textElement, keywordTitle, crapTitle) {
			$currElement.hover(
				function() {
					$textElement.text(crapTitle);
				}, function() {
					$textElement.text(keywordTitle);
				}
			);
		}

		function swapTitles($currElement, $textElement, keywordTitle, crapTitle) {
			var keywordTitle = link_to_title($currElement.prop('href'));
			var crapTitle = $textElement.text();

			if (showTooltip) {
				$currElement.prop('title', crapTitle);
			}

			if (showHover) {
				addHover($currElement, $textElement, keywordTitle, crapTitle);
			}

			$textElement.text(keywordTitle);
		}

		jQuery.each(jQuery('h3 > a, .m-rock-trending-discussions .title a, .m-new-articles__story a, .m-rock-read-this a'), function(){
			swapTitles(jQuery(this), jQuery(this));	
		});

		jQuery.each(jQuery('.m-hero__slot-link'), function(){
			swapTitles(jQuery(this), jQuery(this).find('h2'));
		});
		
		jQuery.each(jQuery('a.m-carousel__item, .m-big-stories__story a, .m-big-stories__main > a, .m-video-hero__main-entry > a, .p-rock__basic-article-list a'), function(){
			swapTitles(jQuery(this), jQuery(this).find('h3'));
		});
		
		jQuery.each(jQuery('.m-rock-recent-reviews__entry-link, .m-rock-popular-features__entry, .m-video-hero__playlist-entry > a'), function(){
			swapTitles(jQuery(this), jQuery(this).find('h4'));
		});
		
		jQuery.each(jQuery('.p-entry-nav a'), function(){
			swapTitles(jQuery(this), jQuery(this).find('span'));
		});		

	}
	}, 10);
});