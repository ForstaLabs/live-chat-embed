var chatOpen = false;
var isMobileDevice = false;

activate();

function activate() {
	$('#forsta-chat-container').append(`
		<style>
		.forsta-chat {    
			position: fixed;
			bottom: 90;
			right: 90;
			z-index: 1000;
		}
		.forsta-chat-btn {    
			position: fixed;
			bottom: 20;
			right: 20;
			z-index: 1000;
			cursor: pointer;
			outline: none;
		}
		.rotated-image {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
			transition-duration: .5s;
		}
		</style>	
	`);
}

function setChat(options) {
	var isMobileDevice = $(window).width() < 992;
	if(isMobileDevice) getMobileButton(options);
	else getDesktopButton(options);
}

function getMobileButton(options) {
	$('#forsta-chat-container').append(`
		<a class="forsta-chat-btn" id="forsta-chat-mobile" href="${buildSrc(options)}">
			<img id="chat-open" width="50" src="../client/chat-open.png">
		</a>	
	`);
}

function getDesktopButton(options) {
	$('#forsta-chat-container').append(`		
		<iframe class="forsta-chat" id="forsta-chat" width="400" height="400" href="${buildSrc(options)}"></iframe>


		<a class="forsta-chat-btn" id="forsta-chat-desktop">	
			<img id="chat-open" width="50" src="../client/chat-open.png">
			<img id="chat-close" width="50" src="../client/chat-close.png">
		</a>
	`);	
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