require(['../../config/config'], function() {
	require(['jquery', 'templates', 'bootstrap'], function($, templates) {
		//index
		//热搜词
		let hotwords, defaultWord, leftBarData;
		let ajax01 = $.ajax({
			url: "http://www.biyao.com/classify/hotWord",
			dataType: "jsonp",
			success: function(data) {
				hotwords = data.data.hotwords;
				defaultWord = data.data.defaultWord;
				$('.common-header').load('/pages/templates/common/headerTemp.html', function() {
					let htmlStr = templates('indexTemp', {
						hotWordList: hotwords,
						defaultWord: defaultWord,
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

			}
		})

		let ajax02 = $.ajax({
			type: "get",
			url: "https://category.vip.com/ajax/getTreeList.php?cid=30074&tree_id=117&_=1537692539395",
			dataType: 'jsonp',
			jsonp: 'callback',
			jsonpCallback: 'jquery2',
			success: function(data) {
				leftBarData = data.data['30074'][0];
				console.log(data.data['30074'][0].cate_id);
			}
		});
		$.when(ajax01, ajax02).done(function() {
			require(['leftSideBar'])
			$('.sidebar-carousel .prosul').load('/pages/templates/common/commonLeftBar.html', function() {
				let leftHtml = templates('leftBar', {
					list: leftBarData
				});
				$(this).html(leftHtml);
			});
			//滚动距离大于一个屏的时候显示固定的分类和搜索
			$('.display').load('/pages/templates/common/headerTemp.html', function() {
				let htmlStr2 = templates('navDisplayBar', {
					hotWordList: hotwords,
					defaultWord: defaultWord,
				})
				$(this).html(htmlStr2);
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

		})
		//底部footer模版
		$('.common-footer').load('/pages/templates/common/footerTemp.html');
		/*搜索框函数《----------*/
		window.cb = function(data) {
			droplist.innerHTML = '';
			data.result.forEach((item) => {
				var li = document.createElement('li');
				li.innerText = item[0];
				droplist.appendChild(li);

			});
			//点击下拉列表的值，自动显示在输入框上
			droplist.style.display = 'block';
			$('#droplist li').on('click', function() {
				$('#serchInput').val($(this).text());
				$(this).parent().hide();
			})
		}

		//搜索框防抖
		window.debounce = function(callback, delay, context) {
			var timer = null;
			return function(e) {
				clearTimeout(timer);
				timer = setTimeout(() => {
					callback.call(context, e);
				}, delay);
			}
		}
		/*----------》搜索框函数*/
	})

})