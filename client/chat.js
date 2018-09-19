(function() {

	$.urlParam = function(name){
		var results = new RegExp('[\?&]' + name + '=([^&]*)').exec(window.location.href);
		return results[1] || null;
	}

	var options = {
		buttonColor: decodeURI($.urlParam('buttonColor')),
		showHeader: decodeURI($.urlParam('showHeader')),
		tag: decodeURI($.urlParam('tag')),
		token: decodeURI($.urlParam('token')),
		allowCalling: decodeURI($.urlParam('allowCalling')),
		forceScreenShare: decodeURI($.urlParam('forceScreenShare')),
	};

	activate();

	//////////////////////

	function activate() {
		$('#chat-form').hide();

		if(getCookie('src')) {
			window.location.href = getCookie('src');
			return;
		} else {
			$('#chat-form').show();
		}

		if(options.showHeader === 'false') 
			window.location.href = buildIframeSrc(options.token, 'Chat', options.tag);

		if(options.buttonColor !== null) {
			$('#start-chat').css('background-color', options.buttonColor);
			$('#start-chat').css('border-color', options.buttonColor);
		}
	}

	$('#start-chat').click(function() {
		var name = $('#user-name').val();
		var email = $('#user-email').val();
		var tag = $('#user-tag').val();
		var src = buildIframeSrc(options.token, name, email, options.tag, options.allowCalling, options.forceScreenShare);

		window.location.href = src;
		setCookie('src', src, 1);
	});

	function buildIframeSrc(token, name, email, tag, allowCalling, forceScreenShare) {
		const fullName = name.split(' ');
		const firstName = fullName[0];
		const lastName = fullName[fullName.length-1];

		let iframeSrc = `https://app.forsta.io/@embed?token=${token}&first_name=${firstName}&last_name=${lastName}&email=${email}&to=${tag}&title=Live Chat-${name}`;
		if(allowCalling === 'true')
			iframeSrc = `${iframeSrc}&allowCalling`;
		if(forceScreenShare === 'true')
			iframeSrc = `${iframeSrc}&forceScreenShare`;		
		return iframeSrc;
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