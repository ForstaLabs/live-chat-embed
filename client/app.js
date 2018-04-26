var flc = {};

(function() {
	flc.activate = activate;
	flc.initChat = initChat;
	
	var chatOpen = false;
	var isMobileDevice = false;

	function activate() {
		jQuery('.site-content').append('<div id="forsta-chat-container"></div>');
		jQuery('#forsta-chat-container').append('<style>.forsta-chat {position: fixed;bottom: 90;right: 90;z-index: 1000;}</style>');
		jQuery('#forsta-chat-container').append('<style>.forsta-chat-btn { position: fixed;bottom: 20;right: 20;z-index: 1000;cursor: pointer;outline: none;}</style');
		jQuery('#forsta-chat-container').append('<style>.rotated-image {-webkit-transform: rotate(360deg);transform: rotate(360deg);transition-duration: .5s;}</style');
	}

	function initChat(options) {	
		var src = buildSrc(options);
		var isMobileDevice = jQuery(window).width() < 992;
		if(isMobileDevice) getMobileButton(src, options);
		else getDesktopButton(src, options);
	}

	function getMobileButton(src, options) {
		jQuery('#forsta-chat-container').append('<a class="forsta-chat-btn" id="forsta-chat-mobile" href="'+src+'" target="_blank></a>">');
		jQuery('#forsta-chat-mobile').append('<img id="chat-open" width="50" src="'+options.openLogo+'">');
	}

	function getDesktopButton(src, options) {
		jQuery('#forsta-chat-container').append('<iframe class="forsta-chat" id="forsta-chat" width="400" height="400" src="'+src+'"></iframe>');
		jQuery('#forsta-chat-container').append('<a class="forsta-chat-btn" id="forsta-chat-desktop"></a>');
		jQuery('#forsta-chat-desktop').append('<img id="chat-open" width="60" src="'+options.openLogo+'">');
		jQuery('#forsta-chat-desktop').append('<img id="chat-close" width="60" src="'+options.closeLogo+'">');
		jQuery('#forsta-chat').hide();
		jQuery('#chat-close').hide();
		addDesktopBtnListener();
	}

	function addDesktopBtnListener(options) {
		jQuery('#forsta-chat-desktop').click(function() {
			jQuery('#forsta-chat-desktop').addClass("rotated-image");
			if(!chatOpen) {
				jQuery('#chat-open').hide();
				jQuery('#chat-close').show();
			}
			else {
				jQuery('#chat-open').show();
				jQuery('#chat-close').hide();
			}
			jQuery('#forsta-chat').slideToggle( "slow", function() {
				jQuery('#forsta-chat-desktop').removeClass("rotated-image");
				chatOpen = !chatOpen;			
			});
		});
	}

	function buildSrc(options) {
		return "https://app.forsta.io/@embed?"+ 
		"token="+options.token+
		"&first_name="+options.userName+
		"&email=foo@bar.com"+
		"&to=@"+options.to || 'support:forsta.io';
	}
})();