require(['../../config/config'], function() {
	require(['jquery', 'templates', 'indexFunction', 'bootstrap', 'commonAjax'], function($, templates, indexFun) {
		//index
		//热搜词
		//侧边栏导航
		$.ajax({
			url: "/json/pages/index/jsonDataLeftBar.json",
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
			url: "/json/pages/index/jsonDataPageOne.json",
			type: 'get',
			dataType: "json",
			success: function(data) {
				//json的数据类型
				var modules = data.data.modules;
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

				//banner
				$('#myCarousel').load('/pages/templates/common/headerTemp.html', function() {
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
				$('.contentOne').load('/pages/templates/index/indexCategoryInfo.html', function() {
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
					indexFun.contentStyle();
				});

			}

		})
		//contentTwo
		$.ajax({
			url: "/json/pages/index/jsonDataPageTwo.json",
			type: 'get',
			dataType: "json",
			success: function(data) {
				let modules = data.data.modules;
				let list = [];
				for(let attr of modules) {
					list.push(attr.moduleInfo)
				}
				$('.contentTwo').load('/pages/templates/index/indexCategoryInfo.html', function() {
					let htmlstr02 = templates('indexCategoryInfoTwo', {
						contentData: list,
					})
					$(this).html(htmlstr02);
					indexFun.contentStyle();
				});
			}
		});
		//contentThree
		$.ajax({
			url: "/json/pages/index/jsonDataPageThree.json",
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
				$('.contentThree').load('/pages/templates/index/indexCategoryInfo.html', function() {
					let htmlstr03 = templates('indexCategoryInfoThree', {
						DataOne: infoOne,
						DataTwo: infoTwo
					})
					$(this).html(htmlstr03);
					indexFun.contentStyle();
				});
			}
		});
		//		$('.sidebar-carousel .prosul').load('/pages/templates/common/commonLeftBar.html', function() {
		//			let leftHtml = templates('leftBar', {
		//
		//			});
		//			$(this).html(leftHtml);
		//		});

		//高度一致
		$(window).resize(function() {
			indexFun.getHeight()
		});
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

		//点击a标签跳到详情
		$('.container a').attr('href', '/pages/produceDetail.html');

	})
})