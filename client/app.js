var flc = {};

(function() {
	flc.activate = activate;
	flc.initChat = initChat;
	
	var chatOpen = false;
	var isMobileDevice = false;

	function activate() {
		$('#forsta-chat-container').append('<style>.forsta-chat {position: fixed;bottom: 90;right: 90;z-index: 1000;}</style>');
		$('#forsta-chat-container').append('<style>.forsta-chat-btn { position: fixed;bottom: 20;right: 20;z-index: 1000;cursor: pointer;outline: none;}</style');
		$('#forsta-chat-container').append('<style>.rotated-image {-webkit-transform: rotate(360deg);transform: rotate(360deg);transition-duration: .5s;}</style');
	}

	function initChat(options) {	
		var src = buildSrc(options);
		var isMobileDevice = $(window).width() < 992;
		if(isMobileDevice) getMobileButton(src, options);
		else getDesktopButton(src, options);
	}

	function getMobileButton(src, options) {
		$('#forsta-chat-container').append('<a class="forsta-chat-btn" id="forsta-chat-mobile" href="'+src+'" target="_blank></a>">');
		$('#forsta-chat-mobile').append('<img id="chat-open" width="50" src="'+options.openLogo+'">');
	}

	function getDesktopButton(src, options) {
		$('#forsta-chat-container').append('<iframe class="forsta-chat" id="forsta-chat" width="400" height="400" src="'+src+'"></iframe>');
		$('#forsta-chat-container').append('<a class="forsta-chat-btn" id="forsta-chat-desktop"></a>');
		$('#forsta-chat-desktop').append('<img id="chat-open" width="60" src="'+options.openLogo+'">');
		$('#forsta-chat-desktop').append('<img id="chat-close" width="60" src="'+options.closeLogo+'">');
		$('#forsta-chat').hide();
		$('#chat-close').hide();
		addDesktopBtnListener();
	}

	function addDesktopBtnListener(options) {
		$('#forsta-chat-desktop').click(function() {
			$('#forsta-chat-desktop').addClass("rotated-image");
			if(!chatOpen) {
				$('#chat-open').hide();
				$('#chat-close').show();
			}
			else {
				$('#chat-open').show();
				$('#chat-close').hide();
			}
			$('#forsta-chat').slideToggle( "slow", function() {
				$('#forsta-chat-desktop').removeClass("rotated-image");
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