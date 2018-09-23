require(['../../config/config'], function() {
	require(['jquery', 'templates', 'bootstrap', 'commonAjax'], function($, templates) {
		//由于必要网原网站更新迭代,源json无法找到详情信息
		//因此请求别的网站的，别的网站请求详情需要商品id
		//于是random几个人家有的
		//		require(['commonAjax']);
		var randomId = [979596, 3348, 942049, 4434, 1271, 2512, 595501, 952549, 982019, 975575, 962145, 971509, 982070, 982068, 982061, 979916, 1134, 2108, 6641];
		var a = parseInt(randomId.length * Math.random());
		let ajax01 = $.ajax({
			type: "get",
			url: "https://api.sephora.cn/v1/product/sku/breadcrumb?productId=" + randomId[a],
			success: function(data) {
				title = data.results;
			}
		});
		let ajax02 = $.ajax({
			type: "get",
			async: false,
			url: "https://api.sephora.cn/v1/product/sku/optionalSkuSpec?productId=" + randomId[a] + "&skuId=&channel=PC&isPromotion=false",
			success: function(data) {
				info = data.results;
				var ranum = parseInt(info.skuSaleAttrs.length * Math.random());
				skuId = info.skuSaleAttrs[ranum].skuId;

			}
		}).then(function() {
			return $.ajax({
				type: "get",
				async: false,
				url: "https://api.sephora.cn/v1/product/sku/optionalSkuSpec?productId=" + randomId[a] + "&skuId=" + skuId + "&channel=PC&isPromotion=false",
				success: function(d) {
					detail = d.results;
					sub = detail.currentSkuImagePath;
					subUrl01 = detail.currentSkuImagePath.substring(0, sub.length - 10);
					subUrl02 = detail.currentSkuImagePath.substring(sub.length - 9);
				}
			});
		})
		let ajax03 = $.ajax({
			type: "get",
			url: "https://api.sephora.cn/v1/product/sku/skuPromotionInfo?channel=PC&productId=" + randomId[a],
			success: function(data) {
				gift = data.results.skuPromotionInfoDtoList;
			}
		});

		//由于下面这个路径，不晓得是根据什么推荐的猜你喜欢，不知道
		//传的值一大堆数字是什么意义，没法根据当前去获取，于是创建一个MathRandom
		//自己随机取吧
		let MathPath = [
			"https://recommender.predict.emarsys.cn/merchants/18BC49C88D345FEB/?pv=1984318471&xp=1&f=f%3ARELATED_PC%2Cl%3A10%2Co%3A0&v=i%3A6641&cp=1&vi=751C43806F76ED02&p=3348%7C1537261204&prev_url=https%3A%2F%2Fwww.sephora.cn%2Fhot%2F%3Fk%3D%25E7%2595%2585%25E9%2594%2580%25E6%25A6%259C%25E5%258D%2595%26hasInventory%3D1%26sortField%3D1%26sortMode%3Ddesc%26currentPage%3D1%26filters%3Du60007&ti=2%2C675%2C630%2C626%2C%2C%7Cl%2C%2C642%2C642%2C642%2C%2C642%2C645%2C649%2C%2C%7Cr%2C%2C2221%2C2221%2C2221%2C%2C2223%2C2266%2C2267%2C2285%2C2220",
			"https://recommender.predict.emarsys.cn/merchants/18BC49C88D345FEB/?pv=620554829&xp=1&f=f%3ARELATED_PC%2Cl%3A10%2Co%3A0&v=i%3A3348&cp=1&vi=751C43806F76ED02&p=3348%7C1537261204&ti=",
			"https://recommender.predict.emarsys.cn/merchants/18BC49C88D345FEB/?pv=531254321&xp=1&f=f%3ARELATED_PC%2Cl%3A10%2Co%3A0&v=i%3A2512&cp=1&vi=751C43806F76ED02&p=3348%7C1537261204&prev_url=https%3A%2F%2Fwww.sephora.cn%2Fcampaign%2Fexclusiveranking20180912%2F%3Fintcmp%3DNewHome%7CSephorapicks4%7CAnimation%7CTopic%7CRanking%7C2512%7C20180912&ti=2%2C429%2C963%2C952%2C1692%2C1720%7Cl%2C%2C401%2C401%2C401%2C%2C402%2C403%2C404%2C%2C%7Cr%2C%2C2880%2C2880%2C2880%2C%2C2883%2C2951%2C2952%2C3239%2C2876",
			"https://recommender.predict.emarsys.cn/merchants/18BC49C88D345FEB/?pv=1199639621&xp=1&f=f%3ARELATED_PC%2Cl%3A10%2Co%3A0&v=i%3A595501&cp=1&vi=751C43806F76ED02&p=3348%7C1537261204&prev_url=https%3A%2F%2Fwww.sephora.cn%2Fcampaign%2Fexclusiveranking20180912%2F%3Fintcmp%3DNewHome%7CSephorapicks4%7CAnimation%7CTopic%7CRanking%7C2512%7C20180912&ti=2%2C1079%2C935%2C929%2C%2C%7Cl%2C%2C943%2C943%2C943%2C%2C943%2C946%2C948%2C%2C%7Cr%2C%2C3085%2C3085%2C3085%2C%2C3088%2C3150%2C3152%2C3428%2C3079",
			"https://recommender.predict.emarsys.cn/merchants/18BC49C88D345FEB/?pv=331675958&xp=1&f=f%3ARELATED_PC%2Cl%3A10%2Co%3A0&v=i%3A981053&cp=1&vi=751C43806F76ED02&p=3348%7C1537261204&prev_url=https%3A%2F%2Fwww.sephora.cn%2Fcampaign%2Fexclusiveranking20180912%2F%3Fintcmp%3DNewHome%7CSephorapicks4%7CAnimation%7CTopic%7CRanking%7C2512%7C20180912&ti=2%2C1359%2C1195%2C1183%2C3350%2C3388%7Cl%2C%2C1210%2C1210%2C1210%2C%2C1210%2C1212%2C1214%2C%2C%7Cr%2C%2C3006%2C3006%2C3006%2C%2C3008%2C3610%2C3611%2C3619%2C2999",
			"https://recommender.predict.emarsys.cn/merchants/18BC49C88D345FEB/?pv=1827637921&xp=1&f=f%3ARELATED_PC%2Cl%3A10%2Co%3A0&v=i%3A980400&cp=1&vi=751C43806F76ED02&p=3348%7C1537261204&prev_url=https%3A%2F%2Fwww.sephora.cn%2Fcampaign%2Fexclusiveranking20180912%2F%3Fintcmp%3DNewHome%7CSephorapicks4%7CAnimation%7CTopic%7CRanking%7C2512%7C20180912&ti=2%2C1393%2C1352%2C1344%2C%2C%7Cl%2C%2C897%2C897%2C897%2C%2C898%2C899%2C901%2C%2C%7Cr%2C%2C2751%2C2751%2C2751%2C%2C2754%2C2826%2C2827%2C2842%2C2746"
		]
		var pathRam = parseInt(MathPath.length * Math.random());
		let ajax05 = $.ajax({
			type: "get",
			url: MathPath[pathRam],
			success: function(data) {
				leftProduce = data.products;
				leftId = data.features.RELATED_PC.items;
			}
		});
		
		
		//评论接口，也是没有，找的淘宝的，那就随机几个吧
		
		let pllist, plScroce;
		let dateTime = [];
		let randomUrl2 = [
			"https://rate.tmall.com/list_detail_rate.htm?itemId=562844114345&spuId=907962833&sellerId=2549841410&order=3&currentPage=1&append=0&content=1&tagId=&posi=&picture=&groupId=&ua=",
			"https://rate.tmall.com/list_detail_rate.htm?itemId=571975606766&spuId=991535328&sellerId=3982196496&order=3&currentPage=1&append=0&content=1&tagId=&posi=&picture=&groupId=&ua=",
			"https://rate.tmall.com/list_detail_rate.htm?itemId=522166911010&spuId=893417390&sellerId=2024237896&order=3&currentPage=1&append=0&content=1&tagId=&posi=&picture=&groupId=&ua=",
			"https://rate.tmall.com/list_detail_rate.htm?itemId=37356144587&spuId=256610542&sellerId=725677994&order=3&currentPage=1&append=0&content=1&tagId=&posi=&picture=&ua="
		]
		let randomUrlPath = parseInt(randomUrl2.length * Math.random());
		let ajax06 = $.ajax({
			type: "get",
			url: randomUrl2[randomUrlPath],
			dataType: 'jsonp',
			jsonp: 'callback',
			jsonpCallback: 'jquery645',
			success: function(data) {
				pllist = data.rateDetail;
				//评分
				plScroce = parseInt(pllist.rateCount.picNum) / 100;
				//评论时间
				for(let i in pllist.rateList) {
					let data = new Date(pllist.rateList[i].gmtCreateTime.time);
					let month = Number(data.getMonth()) + 1;
					dateTime.push(data.getFullYear() + '-' + month + '-' + data.getDate() + ' ' + data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds());
				}
			}
		})
		$.when(ajax01, ajax02, ajax03, ajax05,ajax06).done(() => {
			
			//所做操作
			$('.produceInfo').load('/pages/templates/produce/produceDetail.html', function() {

				let temp01 = templates('produceDetail', {
					hierarchy: title,
					produceInfo: info,
					produceTel: detail,
					gift: gift,
					leftId: leftId,
					leftProduce: leftProduce,
					plScroce: plScroce,
					rateList: pllist.rateList,
					dateTime:dateTime,
				})
				$(this).html(temp01);

				//图片详情：没有具体链接，拼接的链接
				for(let i = 0; i < 4; i++) {
					let li = document.createElement('li');
					let img = document.createElement('img');
					img.className = 'mainImg';
					img.setAttribute('onerror', 'nofind($(this))')
					img.src = subUrl01 + (i + 2) + subUrl02 + '50x50.jpg';
					li.appendChild(img);
					$('.proImg').append(li);
				}
				for(let i = 0; i < $('.proImg').length; i++) {
					$('.biyaoImg')[i].src = subUrl01 + (i + 2) + subUrl02 + '640x640.jpg';
				}
				//评价信息
				$('#evaluate').on('click', function() {
					$(this).addClass('active').siblings().removeClass('active')
					$('.view-evaluate').show();
					$('.view-detail').hide();
				})
				//商品详情
				$('#detail').on('click', function() {
					$(this).addClass('active').siblings().removeClass('active')
					$('.view-evaluate').hide();
					$('.view-detail').show();
				})
				//点击颜色变化
				$('.mainList .size').on('click', function() {
					$(this).addClass('activeStyle').siblings().removeClass('activeStyle');
				})
				//数量增加
				$('.add').on('click', function() {
					let inputHtml = $('.inputNum').val();
					$('.inputNum').val(parseInt(inputHtml) + 1);
				});
				//数量减少
				$('.subtr').on('click', function() {
					let inputHtml = $('.inputNum').val();
					$('.inputNum').val(parseInt(inputHtml) - 1);
					if($('.inputNum').val() <= 1) {
						$('.inputNum').val('1')
					}
				});
				//加入购物车
				$('#addCart').on('click', function() {
					let inputNum = $('.inputNum').val();
					let Specification = $('.mainList').find('span').hasClass('activeStyle');
					let list = [];
					if(inputNum != '' && Specification) {
						let specife = $('span.activeStyle').text();
						let proImgBig = $(' .editor-picture p img').attr('src');
						let proImgSmall = $('.main-active img').attr('src');
						let proName = $('.editor-panel .panel-top h1').text();
						let proNameEN = $('.editor-panel .panel-top span').text();
						let price = Number($('.panel-maney i').text());
						inputNum = Number(inputNum);
						let SumPrice = (price * inputNum).toFixed(2);
						var obj = {
							proId: info.productId, //产品id
							proName: proName, //名字
							proNameEN: proNameEN,
							proPrice: price.toFixed(2), //价格
							proNum: inputNum, //数量
							proSpecif: specife, //规格
							proImgBig: proImgBig, //大图
							proImgSmall: proImgSmall, //小图
							proSumPrice: SumPrice
						}
						var cookie = document.cookie;
						if(cookie.indexOf('list') != -1) {
							let str = cookie.substr(cookie.indexOf('list='));
							//JSON.parse():字符串转为对象
							//JSO N.stringify():对象转为字符串
							list = JSON.parse(str.substring(5));
						}
						var Objindex = -1;
						var newList = list.some(function(item, index) {
							var flag = false;
							if(obj.proId == item.proId) { //判断编号是否一致，编号唯一
								flag = true;
								item.proNum++;
							}
							return flag;
						})
						if(!newList) { //如果false 也就是不存在
							list.push(obj);
						}
						var d = new Date();
						d.setDate(d.getDate() + 10);
						list = JSON.stringify(list);
						document.cookie = 'list=' + list + ';expires=' + d;
						$('#addCart').attr('href', 'shopCart.html');
					} else {
						alert('请选择规格及数量');
					}
				});
			})
		});
		//图片未找到路径时
		window.nofind = function(that) {
			that.hide();
			that.parent().remove();
		}

	})
});