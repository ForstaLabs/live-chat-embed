(function() {

	$.urlParam = function(name){
		var results = new RegExp('[\?&]' + name + '=([^&]*)').exec(window.location.href);
		return results[1] || null;
	}

	var options = {
		buttonColor: decodeURI($.urlParam('buttonColor')),
		show: decodeURI($.urlParam('show')),
		tag: decodeURI($.urlParam('tag')),
		title: decodeURI($.urlParam('title')),
		titleColor: decodeURI($.urlParam('titleColor')),
		titleBackground: decodeURI($.urlParam('titleBackground')),
		token: decodeURI($.urlParam('token'))
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

		if(options.show === 'false') 
			window.location.href = buildIframeSrc(options.token, 'Chat', options.tag);

		if(options.title !== null) {
			$('#title').text(options.title);
		}
		if(options.titleColor !== null) {
			$('#title').css('color', options.titleColor);
		}
		if(options.titleBackground !== null) {
			$('#title-background').css('background-color', options.titleBackground);
		}
		if(options.buttonColor !== null) {
			$('#start-chat').css('background-color', options.buttonColor);
			$('#start-chat').css('border-color', options.buttonColor);
		}
	}

	$('#start-chat').click(function() {
		var name = $('#user-name').val();
		var email = $('#user-email').val();
		var tag = $('#user-tag').val();
		var src = buildIframeSrc(options.token, name, email, options.tag);

		window.location.href = src;
		setCookie('src', src, 1);
	});

	function buildIframeSrc(token, name, email, tag) {
		return "https://app.forsta.io/@embed?token="+token+"&first_name="+name+"&email="+email+"&to="+tag+"&title=Live Chat";
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