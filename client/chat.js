(function() {
	$('#start-chat').click(function() {
		var firstName = $('#user-first-name').val();
		var lastName = $('#user-last-name').val();
		var tag = $('#user-tag').val();
		var src = buildIframeSrc(firstName, lastName, tag);

		window.location.href = src;
	});

	function buildIframeSrc(firstName, lastName, tag) {
		return "https://app.forsta.io/@embed?token=c1f3cf9fffdb06de01bfd97db86ec049a73b0a9b&first_name="+firstName+"&last_name="+lastName+"&email=foo@bar.com&to="+tag
	}
})();