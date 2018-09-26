var flc = {};

window.jQuery || (function() {
	var scriptElem = document.createElement('script');
	scriptElem.setAttribute('src','https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js');
	document.body.appendChild(scriptElem);
})();

(function() {	
	var chatOpen = getCookie('chatOpen') === 'true';
	var chatData = {
		firstName: getCookie('firstName'),
		lastName: getCookie('lastName'),
		email: getCookie('email')
	};
	var isMobileDevice = false;

	flc.activate = activate;
	flc.initChat = initChat;

	////////////////////////

	function activate() {
		var styles = getStyles();
		jQuery('body').append(`<style>${styles}</style>`);

		if(jQuery('.site-content') === 0) {
			jQuery('.site-content').append('<div id="forsta-chat-container"></div>');
		} else {
			jQuery(document.body).append('<div id="forsta-chat-container"></div>');
		}
		
		jQuery(window).resize(() => { 
			jQuery('#forsta-chat-container').empty();
			flc.initChat() 
		});
		flc.initChat();
	}

	function addDesktopBtnListener() {
		jQuery('#forsta-chat-desktop').click(function() {
			jQuery('#forsta-chat-desktop').addClass("rotated-image");
			if(!chatOpen) {
				jQuery('#chat-open').hide();
				jQuery('#chat-close').show();
			} else {
				jQuery('#chat-open').show();
				jQuery('#chat-close').hide();
			}

			if(!chatOpen) {
				jQuery('#forsta-chat').slideToggle( "slow", function() {
					jQuery('#forsta-chat-header').slideToggle( "slow", function() {
						jQuery('#forsta-chat-desktop').removeClass("rotated-image");
						chatOpen = !chatOpen;		
						setCookie('chatOpen', chatOpen, 1);
					});
				});
			} else {
				jQuery('#forsta-chat-header').slideToggle( "slow", function() {
					jQuery('#forsta-chat').slideToggle( "slow", function() {
						jQuery('#forsta-chat-desktop').removeClass("rotated-image");
						chatOpen = !chatOpen;		
						setCookie('chatOpen', chatOpen, 1);
					});
				});
			}
		});
	}

	function addFormListener() {
		jQuery('#forsta-form').submit(event => {
			var data = {
				firstName: event.target[0].value,
				lastName: event.target[1].value,
				email: event.target[2].value,
			};

			setCookie('firstName', data.firstName, 1);
			setCookie('lastName', data.lastName, 1);
			setCookie('email', data.email, 1);

			jQuery('#forsta-chat').empty();
			jQuery('#forsta-chat').append(getIframe(data));
		});
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

	function getIframe(data) {
		var iframeSrc = getIframeSource(data);		
		return `<iframe id="forsta-iframe" width="100%" height="100%" src="${iframeSrc}" allow="camera; microphone"></iframe>`;
	}

	function getIframeSource(data) {
			var iframeSrc = `
				https://app.forsta.io/@embed?
				token=${flc.options.token}&
				first_name=${data.firstName}&
				last_name=${data.lastName}&
				email=${data.email}&
				to=${flc.options.tag}&
				title=Live Chat-${data.firstName}%20${data.lastName}
			`;
			if(flc.options.allowCalling === 'true')
				iframeSrc = `${iframeSrc}&allowCalling`;
			if(flc.options.forceScreenShare === 'true')
				iframeSrc = `${iframeSrc}&forceScreenShare`;
			return iframeSrc;			
	}

	function getDesktopButton() {
		var template = `
		<div id="forsta-chat-header"></div>
		<div class="forsta-chat" id="forsta-chat">
		</div>

		<a class="forsta-chat-btn" id="forsta-chat-desktop">
			<img id="chat-open" width="50" src="https://chat.forsta.io/client/logo.png">
			<img id="chat-close" width="25" src="https://chat.forsta.io/client/close.png">
		</a>
		`;

		var form = `
			<form class="forsta-form" id="forsta-form">
				<div class="forsta-form-group">
					<label>First Name</label>
					<input id="first-name" class="forsta-form-control" type="text">
				</div>

				<div class="forsta-form-group">
					<label>Last Name</label>
					<input id="last-name" class="forsta-form-control" type="text">
				</div>

				<div class="forsta-form-group">
					<label>Email</label>
					<input id="email"  class="forsta-form-control" type="email">
				</div>

				<input type="submit" class="forsta-btn-primary" value="Submit">
			</form>
		`;

		jQuery('#forsta-chat-container').append(template);
		
		if(chatOpen){
			jQuery('#chat-open').hide();		
			jQuery('#forsta-chat').append(getIframe(chatData));	
		} else {
			jQuery('#forsta-chat').append(form);
			jQuery('#forsta-chat').hide();
			jQuery('#forsta-chat-header').hide();
			jQuery('#chat-close').hide();
		}
	}

	function getMobileButton() {
		var mobileSrc = getMobileSrc();
		var template = `
		<a class="forsta-chat-btn" id="forsta-chat-mobile" href="${mobileSrc}" target="_blank">
			<img id="chat-open" width="50" src="https://chat.forsta.io/client/logo.png">
		</a>
		`;
		jQuery('#forsta-chat-container').append(template);
	}

	function getMobileSrc() {
		return `
			https://chat.forsta.io/client/mobile.html?
			forceScreenShare=${flc.options.forceScreenShare}&
			colorBackground=${flc.options.colorBackground}&
			allowCalling=${flc.options.allowCalling}&
			colorText=${flc.options.colorText}&
			token=${flc.options.token}&
			tag=${flc.options.tag}&
		`;
	}

	function getStyles() {
		return `
		#chat-open {
			margin-top: 17px;
		} 
		#chat-close {
			margin-top: 25px;
		}
		.forsta-btn-primary {
			background-color: ${flc.options.colorBackground};
			color: ${flc.options.colorText};
			cursor: pointer;
			display: inline-block;
			font-weight: 400;
			text-align: center;
			white-space: nowrap;
			vertical-align: middle;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			border: 1px solid transparent;
			padding: .375rem .75rem;
			font-size: 1rem;
			line-height: 1.5;
			border-radius: .25rem;
			transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
		}
		.forsta-chat {
			border: 1px solid grey;
			display: block; 
			position: fixed;
			bottom: 90px;
			right: 90px;
			z-index: 1000;
			width: 400px;
			height: 400px;
			background-color: #ffffff;
		}
		.forsta-chat-btn { 
			background-color: ${flc.options.colorBackground};
			position: fixed;
			bottom: 20px;
			right: 20px;
			z-index: 1000;
			cursor: pointer;
			outline: none; 
			display:inline-block; 
			width:75px; height:75px; 
			border-radius: 50%; 
			text-align: center;
		}
		#forsta-chat-header {
			background-image: url("${flc.options.headerURL}");
			position: fixed; 
			bottom: 490px; 
			right: 90px; 
			z-index: 1000;
			width: 403px;
			height: 178px;
			background-position: top center;
			background-size: cover;
			background-repeat: no-repeat;
		}
		.forsta-form {
			margin: 20px 10px 10px 10px;
		}
		.forsta-form-group {
			font-family: 'sans-serif';
			margin-bottom: 20px;
		}
		.forsta-form-group label {
			display: inline-block;
			margin-bottom: .5rem;
		}
		.forsta-form-group .forsta-form-control {
			display: block;
			width: 100%;
			padding: .375rem .75rem;
			font-size: 1rem;
			line-height: 1.5;
			color: #495057;
			background-color: #fff;
			background-clip: padding-box;
			border: 1px solid #ced4da;
			border-radius: .25rem;
			transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
		}
		.rotated-image {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
			transition-duration: .5s;
		}
		`;
	}

	function initChat() {
		var isMobileDevice = jQuery(window).width() < 992;
		if(isMobileDevice) {
			getMobileButton();
		} else {
			getDesktopButton();
			addDesktopBtnListener();
		}
		addFormListener();
	}

	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
})();