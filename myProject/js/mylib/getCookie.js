define(['jquery'], function(jQuery) {
	(function() {
		function getCookie(key) {
			//"username=yintao; password=nicai"
			var cookiestr = document.cookie;
			var list = cookiestr.split("; ");
			for(var i = 0; i < list.length; i++) {
				var kv = list[i].split("=");
				if(kv[0] == key) return kv[1];
			}
			return null;
		}
		$('.accountLogin .mobile').val(getCookie("username"));
		$('.accountLogin .password').val(getCookie("password"));

		$('.loginBtn button').on('click', function() {
			let check = $('.checkbox');
			let name = $('#mobile').val();
			let pwd = $('#password').val();

			//判断是否勾选了10天免登录
			if(check.is(':checked')) {
				var d = new Date();
				d.setDate(d.getDate() + 10);
				//记录用户名和密码到cookie中
				document.cookie = "username=" + name + "; expires=" + d;
				document.cookie = "password=" + pwd + "; expires=" + d;
			}
		})
	})(jQuery)
})