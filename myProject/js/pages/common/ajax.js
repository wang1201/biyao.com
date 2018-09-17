require(['../../config/config'], function() {
	require(['jquery', 'templates', 'bootstrap'], function($, templates) {
		//热搜词
		$.ajax({
			url: "http://www.biyao.com/classify/hotWord",
			dataType: "jsonp",
			success: function(data) {
				$('.common-header').load('../../pages/templates/common/headerTemp.html', function() {
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
				$('.display').load('../../pages/templates/common/headerTemp.html', function() {
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
		//侧边栏导航
		$.ajax({
			url: "../../../json/pages/index/jsonDataLeftBar.json",
			type: 'get',
			dataType: "json",
			success: function(data) {
				//console.log(data.list.info);
				//				$('.sidebar-carousel').load('../../pages/templates/indexLeftBar.html', function() {
				//					let htmlstrData = templates('leftBar', {
				//						listData: data.list.info
				//					})
				//					$(this).html(htmlstrData);
				//				});
			}

		})
		//中间部分,同一个json拿不同的数据(男女鞋靴之前)
		$.ajax({
			url: "../../../json/pages/index/jsonDataPageOne.json",
			type: 'get',
			dataType: "json",
			success: function(data) {
				//json的数据类型
				var modules = data.data.modules;
				console.log(modules);
				var content = [];
				for(let attr of modules) {
					//轮播图下面的三个图片
					if(attr.moduleType == '2') {
						var threeImg = attr.moduleInfo;
					}
					//精选-手风琴
					if(attr.moduleType == '1') {
						var featured = attr.moduleInfo;
					}
					//中间部分-contentOne
					if(attr.moduleType == '3') {
						content.push(attr.moduleInfo);
					}
				}
				console.log(content);

				//banner
				$('#myCarousel').load('../../pages/templates/common/headerTemp.html', function() {
					let htmlstrData = templates('indexbanner', {
						list: data.data.banners
					})
					$(this).html(htmlstrData);
					$('.myitem').eq(0).addClass('active');

					//轮播图按钮显示隐藏
					$("#myCarousel").hover(
						function() {
							$('.carousel-control').css('display', 'block');
						},
						function() {
							$('.carousel-control').css('display', 'none')
						}
					);
					//轮播图是否自动轮播
					$("#myCarousel").carousel('cycle');
				});

				//contentOne
				$('.contentOne').load('../../pages/templates/index/indexCategoryInfo.html', function() {
					let htmlstr01 = templates('indexCategoryInfoOne', {
						listImg: threeImg.moduleItems,
						featuredTile: featured.moduleTitle,
						featuredItems: featured.moduleItems,
						contentData: content,
					})
					$(this).html(htmlstr01);
					//banner下面每日上新三个图
					$("#accordion .accInfo li").eq(0).addClass('active');
					//手风琴效果
					$('#accordion .accInfo li').on('mouseover', function() {
						$(this).stop().animate({
							'width': '59.5%',
						}, 300).find('i').css('background', 'none').end().siblings('li').stop().animate({
							'width': '7%',
						}, 300).find('i').css('background', 'rgba(0,0,0,0.6)');
					})
					contentStyle();
				});

			}

		})
		//contentTwo
		$.ajax({
			url: "../../../json/pages/index/jsonDataPageTwo.json",
			type: 'get',
			dataType: "json",
			success: function(data) {
				let modules = data.data.modules;
				let list = [];
				for(let attr of modules) {
					list.push(attr.moduleInfo)
				}
				console.log(list);
				$('.contentTwo').load('../../pages/templates/index/indexCategoryInfo.html', function() {
					let htmlstr02 = templates('indexCategoryInfoTwo', {
						contentData: list,
					})
					$(this).html(htmlstr02);
					contentStyle();
				});
			}
		});
		//contentTwo
		$.ajax({
			url: "../../../json/pages/index/jsonDataPageThree.json",
			type: 'get',
			dataType: "json",
			success: function(data) {
				let modules = data.data.modules;
				let infoOne = [];
				let infoTwo = [];
				for(let attr of modules) {
					//中间部分-content
					if(attr.moduleType == '3') {
						infoOne.push(attr.moduleInfo)
					}
					//猜你喜欢和附近的人
					if(attr.moduleType == '6') {
						infoTwo.push(attr.moduleInfo)
					}
				}
				$('.contentThree').load('../../pages/templates/index/indexCategoryInfo.html', function() {
					let htmlstr03 = templates('indexCategoryInfoThree', {
						DataOne: infoOne,
						DataTwo: infoTwo
					})
					$(this).html(htmlstr03);
					window.contentStyle();
				});
			}
		});

		$(function() {
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

			//中间部分模版图片高度一致
			window.getHeight = function() {
				let img02Height = $('.category-list').children().eq(1).find('img').outerHeight();
				let h = img02Height + 'px';
				$('.category-list .template').find('img').css('height', h);
			}
			//当图片大于4个的时候，显示margin
			window.contentStyle = function() {
				//当图片大于四个的时候给前四个图加margin-bottom
				let clist = $('.category-list');
				for(let i = 0; i < clist.length; i++) {
					let liLength = clist.eq(i).find('li').length;
					if(liLength > 4) {
						for(let j = 0; j < 4; j++) {
							clist.eq(i).find('li').eq(j).css('margin-bottom', '1%');
						}

					}
				}
				//高度一致
				$(window).resize(function() {
					getHeight()
				});
				getHeight();
			}
			//加载更多、换屏
			$('.more').hover(function() {
				$(this).fadeOut(500);
				$(this).parent().next().fadeIn(500);
				$('.lastmore').css('display', 'block').show();;
			})
			$('.lastmore').hover(function() {
				$(this).fadeOut(500);
				$(this).parent().next().fadeIn(500);
			})
			//底部footer模版
			$('.footer').load('../../pages/templates/common/footerTemp.html');

		})

	})
})