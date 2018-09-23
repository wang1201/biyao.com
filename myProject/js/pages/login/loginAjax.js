require(['../../config/config'], function() {
	require(['jquery', 'templates', 'bootstrap','commonAjax','checkForm','getCookie'], function($, templates) {		
		//login
		$('.account-title a').click(function(e) {
			$(this).addClass('active').siblings().removeClass('active');
			let status = $('ul.psdLogin').css('display');
			if(status == 'none') {
				$('ul.psdLogin').css('display', 'block');
				$('ul.smsLogin').css('display', 'none');
			} else {
				$('ul.psdLogin').css('display', 'none');
				$('ul.smsLogin').css('display', 'block');
			}
		})
		$('.account-header').load('/pages/templates/common/accountHeader.html');
	})
});