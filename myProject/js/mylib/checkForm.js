define(['jquery'], function(jQuery) {
	(function() {
		//手机验证
		function mobile_check(that) {
			var reg = /^(13|15|17|18)\d{9}$/; //因为邮箱 xxx @ xxx . xxx     xxx 可以是 数字字母下划线 结束 可以 是 .com 或者 .com.cn

			if(that.val().search(reg) == -1) {
				checkerror(that, "手机号码格式不正确，请重新输入 ")
				return false;
			} else {
				checksuccess(that, "手机号码验证成功 ")
				return true;
			}
			return true;
		}

		//密码验证  让其只能是 6位 纯数字的密码
		function password_check(that) {
			var reg = /^\d{6,12}$/; //正则表达式 必须以数字开头和结尾  6-9位
			if(that.val().search(reg) == -1) {
				checkerror(that, "密码只能是6-12位数字，请重新输入 ")
				return false;
			} else {
				checksuccess(that, "密码验证成功 ")
				return true;
			}
			return true;
		}

		function password_check2(that) {
			var reg = /^\d{6,12}$/;
			if(that.val().search(reg) == -1) {
				checkerror(that, "密码只能是6-12位数字，请重新输入 ")
				return false;
			} else {
				if($("#password").val() !== that.val()) {
					checkerror(that, "两次输入的密码不相同，请重新输入 ")
					return false;
				} else {
					checksuccess(that, "密码确认成功 ");
					return true;
				}
			}
			return true;
		}

		function keyCode_check(that) {
			var reg = /^\d{6}$/;
			if(that.val().search(reg) == -1) {
				checkerror(that, "验证码为是6位数字，请重新输入 ")
				return false;
			} else {
				checksuccess(that, "验证码验证成功 ");
				return true;
			}
			return true;
		}

		function submitForm() {
			let smsWay = $('.accountLogin.smsLogin').css('display');
			let pwdWay = $('.accountLogin.psdLogin').css('display');
			console.log(smsWay, pwdWay);
			if(pwdWay == 'block' && smsWay == 'none') {
				if($("#mobile").val() == "" || $("#password").val() == "") {
					$(".psdError").html("数据不可为空，请填写完毕").addClass('error');
					return false;
				}
				if(!(mobile_check($('#mobile')) && password_check($('#password')))) { //只要有其中一项 返回值是 false 就会 进入 这个 语句
					$(".psdError").html("验证未通过").addClass('error');
					return false;
				} else {
					$(".psdError").html("验证通过!").addClass('success');
					return true;
				}
			}
			if(smsWay == 'block' && pwdWay == 'none') {
				if($("#mobile02").val() == "" || $("#phoneCode").val() == "") {
					$(".smsError").html("数据不可为空，请填写完毕").addClass('error');
					return false;
				}
				if(!(mobile_check($('#mobile02')) && keyCode_check($('#phoneCode')))) { //只要有其中一项 返回值是 false 就会 进入 这个 语句
					$(".smsError").html("验证未通过").addClass('error');
					return false;
				} else {
					$(".smsError").html("验证通过!").addClass('success');
					return true;
				}
			}
			return true;
		}

		function submitRegist() {
			if($("#mobile").val() == "" || $("#phoneCode").val() == "" || $("#password").val() == "" || $("#password2").val() == "") {
				$(".registError").html("数据不可为空，请填写完毕").addClass('error');
				return false;
			} else if(!(mobile_check($('#mobile')) && keyCode_check($('#phoneCode')) && password_check($('#password')) && password_check2($("#password2")))) { //只要有其中一项 返回值是 false 就会 进入 这个 语句
				$(".registError").html("验证未通过").addClass('error');
				return false;
			} else if(!($('#agree').is(':checked'))) {
				$(".registError").html("请勾选服务条款").addClass('error');
				return false;
			} else {
				$(".registError").html("验证通过!").addClass('success');
				return true;
			}
			return true
		}
		$(".form").submit(function() {
			return submitForm();
		});
		$("#registForm").submit(function() {
			return submitRegist();
		});

		function checkerror(id, content) {
			$(id).removeClass('success');
			$(id).addClass('error');
			$(id).siblings('i').html(content).css({
				'color': '#F33',
				"display": 'block'
			});;
		}

		function checksuccess(id, content) {
			$(id).removeClass('error');
			$(id).addClass('success');
			$(id).siblings('i').html(content).css({
				'color': '#32CD32',
				"display": 'block'
			});
		}
		//focus去掉内容
		$(".accountLogin li input").focus(function() {
			$(this).removeClass('error success');
			$(this).siblings('i').html('');
			$(this).val('');
			$(".loginBtn span").html('');
		});

		$("#password").blur(function() {
			password_check($(this))
		});
		$("#password2").blur(function() {
			password_check2($(this))
		});

		$("#mobile").blur(function() {
			mobile_check($(this));
		});
		$("#mobile02").blur(function() {
			mobile_check($(this));
		});
		$('#phoneCode').blur(function() {
			keyCode_check($(this))
		})
		$("#emailId").blur(email_check);
		$("#account").blur(zhanghao_yz);
		//账号验证
		function zhanghao_yz() {
			var reg = /^[A-Za-z]\w+$/; //正则表达式 必须以字母开头的账号
			if($("#account").val().search(reg) == -1) {
				$("#account").next().html("账号必须是以 字母开头的 可以包含数字字母下划线的字符串");
				/*alert("密码只能是6-9位数字");*/
				return false;
			} else {
				$("#account").next().html("账号验证成功");
				/*  alert("验证成功");*/
				return true;
			}
			return true;
		}

		//邮箱验证
		function email_check() {
			var reg = /^\w+@\w+(\.\w+){1,2}$/; //因为邮箱 xxx @ xxx . xxx     xxx 可以是 数字字母下划线 结束 可以 是 .com 或者 .com.cn
			if($("#emailId").val().search(reg) == -1) {
				$("#emailId").next().html("邮箱格式不正确 xxx @ xxx . xxx");
				/*alert("密码只能是6-9位数字");*/
				return false;
			} else {
				$("#emailId").next().html("邮箱验证成功");
				return true;
			}
			return true;
		}
	})(jQuery)
})