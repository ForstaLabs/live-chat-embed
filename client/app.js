var flc = {};

(function() {
	flc.activate = activate;
	flc.initChat = initChat;
	
	var chatOpen = getCookie('chatOpen') === 'true';
	var isMobileDevice = false;


	function activate() {
		if(jQuery('.site-content') === 0) {
			jQuery('.site-content').append('<div id="forsta-chat-container"></div>');
		}
		else {
			jQuery(document.body).append('<div id="forsta-chat-container"></div>');
		}

		jQuery('body').append('<style>.forsta-chat {position: fixed;bottom: 90px;right: 90px;z-index: 1000;}</style>');
		jQuery('body').append('<style>#chat-open {margin-top: 20px;} #chat-close {margin-top: 25px;}</style>');
		jQuery('body').append('<style>.forsta-chat-btn { position: fixed;bottom: 20px;right: 20px;z-index: 1000;cursor: pointer;outline: none; display:inline-block; background-color: '+flc.options.chatColor+'; width:75px; height:75px; border-radius: 50%; text-align: center;}</style');
		jQuery('body').append('<style>.rotated-image {-webkit-transform: rotate(360deg);transform: rotate(360deg);transition-duration: .5s;}</style');
		
		jQuery(window).resize(() => { 
			jQuery('#forsta-chat-container').empty();
			flc.initChat() 
		});
		flc.initChat();
	}

	function initChat() {
		var isMobileDevice = jQuery(window).width() < 768;
		if(isMobileDevice) getMobileButton(flc.options);
		else getDesktopButton(flc.options);
	}

	function getMobileButton() {
		jQuery('#forsta-chat-container').append('<a class="forsta-chat-btn" id="forsta-chat-mobile" href="'+buildFormUrl()+'" target="_blank></a>">');
		jQuery('#forsta-chat-mobile').append('<img id="chat-open" width="50" src="https://forsta-live-chat-embed.herokuapp.com/client/arrows.png">');
	}

	function getDesktopButton() {
		jQuery('#forsta-chat-container').append('<iframe class="forsta-chat" id="forsta-chat" width="400" height="400" src="'+buildFormUrl()+'"></iframe>');
		jQuery('#forsta-chat-container').append('<a class="forsta-chat-btn" id="forsta-chat-desktop"></a>');
		jQuery('#forsta-chat-desktop').append('<img id="chat-open" width="50" src="https://forsta-live-chat-embed.herokuapp.com/client/arrows.png">');
		jQuery('#forsta-chat-desktop').append('<img id="chat-close" width="25" src="https://forsta-live-chat-embed.herokuapp.com/client/close.png">');
		
		if(chatOpen){
			jQuery('#chat-open').hide();
		} else {
			jQuery('#forsta-chat').hide();
			jQuery('#chat-close').hide();
		}
		addDesktopBtnListener();
	}

	function addDesktopBtnListener() {
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
				setCookie('chatOpen', chatOpen, 1);
			});
		});
	}

	function buildFormUrl() {
		var result = 'https://forsta-live-chat-embed.herokuapp.com/client/chat.html' + '?';
		for(var key in flc.options.form) {
			result += key + "=" + flc.options.form[key] + '&';
		}
		result = result.substring(0, result.length - 1);
		return result;
	}

	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
})();