(function() {

	$.urlParam = function(name){
		var results = new RegExp('[\?&]' + name + '=([^&]*)').exec(window.location.href);
		return results[1] || null;
	}

	var data = {
		tag: decodeURI($.urlParam('tag')),
		token: decodeURI($.urlParam('token')),
		colorText: decodeURI($.urlParam('colorText')),
		allowCalling: decodeURI($.urlParam('allowCalling')),
		colorBackground: decodeURI($.urlParam('colorBackground')),
		forceScreenShare: decodeURI($.urlParam('forceScreenShare')),
	};

	activate();

	//////////////////////

	function activate() {
		$('#forsta-form').hide();

		if(getCookie('src')) {
			window.location.href = getCookie('src');
		} else {
			if(data.colorBackground !== null) {
				$('.forsta-btn-primary').css('background-color', data.colorBackground);
				$('.forsta-btn-primary').css('border-color', data.colorBackground);
				$('.forsta-btn-primary').css('color', data.colorText);
			}
			$('#forsta-form').show();		
			addFormListener();	
		}
	}

	function addFormListener() {
		$('#forsta-form').submit(event => {
			event.preventDefault();

			data.firstName = event.target[0].value;
			data.lastName = event.target[1].value;
			data.email = event.target[2].value;

			var src = buildSrc(data);
			console.log(src);
			window.location.href = src;
			setCookie('src', src, 1);
		});
	}

	function buildSrc(data) {
		var src = `
			https://app.forsta.io/@embed?
			token=${data.token}&
			first_name=${data.firstName}&
			last_name=${data.lastName}&
			email=${data.email}&
			to=${data.tag}&
			title=Live Chat-${data.firstName}%20${data.lastName}
		`;
		if(allowCalling === 'true')
			src = `${src}&allowCalling`;
		if(forceScreenShare === 'true')
			src = `${src}&forceScreenShare`;		
		return src;
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