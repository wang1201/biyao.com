require(['../../config/config'], function() {
require(['jquery', 'templates', 'bootstrap'], function($, templates) {
	//index
	//热搜词
	$.ajax({
		url: "http://www.biyao.com/classify/hotWord",
		dataType: "jsonp",
		success: function(data) {
			$('.common-header').load('/pages/templates/common/headerTemp.html', function() {
				let htmlStr = templates('indexTemp', {
					hotWordList: data.data.hotwords,
					defaultWord: data.data.defaultWord,
				})
				$(this).html(htmlStr);
				//搜索框自动填充
				var oInput = document.getElementById('serchInput');
				var droplist = document.getElementById('droplist');
				$(oInput).on('input', function() {
					var script = document.createElement('script');
					script.src = `https://suggest.taobao.com/sug?code=utf-8&q=${this.value}&callback=cb`;
					//回调填充内容
					document.body.appendChild(script);
				})
			});
			$('.display').load('/pages/templates/common/headerTemp.html', function() {
				let htmlStr2 = templates('navDisplayBar', {
					hotWordList: data.data.hotwords,
					defaultWord: data.data.defaultWord,
				})
				$(this).html(htmlStr2);
				require(['leftSideBar']);
				$('.leftBar dl').hover(
					function() {
						$(this).find('.dispalyProsul').show(); // 开始淡入
					},
					function() {
						$(this).find('.dispalyProsul').hide();
					}
				)
				// 滑动滚动条超过第一个屏的高度时显示的导航
				$(window).scroll(function() {
					// 滚动条距离顶部的距离 大于 200px时
					let screenHeight = document.body.clientWidth;
					console.log(screenHeight);
					if($(window).scrollTop() >= 300) {
						$('.display').fadeIn(300);
						//输入框点击时显示下拉列表
						$('.rightBar input').focus(function() {
							$(this).siblings('.rightDroplist').fadeIn(200);
						})
						//点击下拉列表的值，自动显示在输入框上
						$('.rightDroplist li').on('click', function() {
							$('.rightBar input').val($(this).text());
							$(this).parent().hide();
						})
					} else {
						$('.display').fadeOut(300);
					}
				});

			})
		}
	})

	//底部footer模版
	$('.common-footer').load('/pages/templates/common/footerTemp.html');

})

})