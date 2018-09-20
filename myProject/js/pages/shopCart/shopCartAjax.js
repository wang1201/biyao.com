require(['../../config/config'], function() {
	require(['jquery', 'templates', 'bootstrap', 'commonAjax'], function($, templates) {
		var cookie = document.cookie;
		//拿到的是字符串，把username password list=去掉，截取
		var str = cookie.substr(cookie.indexOf('list='));
		str = str.substring(5);
		//再把字符串转为对象
		cookieObj = JSON.parse(str);
		console.log(cookieObj);
		$('.cartContent').load('/pages/templates/shopCart/shopCart.html', function() {
			let temp = templates('shopCart', {
				data: cookieObj
			})
			$(this).html(temp);
			//全选反选
			$('.checkoutInfo input:checkbox').click(function() {
				var isFlag = $('.checkoutInfo input:checkbox').is(function() {
					return !$(this).prop('checked');
				})
				if(!isFlag) {
					$('.select-all').prop('checked', true);

				} else {
					$('.select-all').prop('checked', false);
				}
				getSum($(this));

			})

			$('.select-all').click(function() {
				$('.checkoutInfo input:checkbox').prop('checked', $(this).prop('checked'));
				if($('.checkoutInfo input:checkbox').prop('checked')) {
					let num = 0;
					let pri = 0;
					let inp = $('.inputNum');
					let sum = $('.productSum');
					console.log($('.inputNum').length);
					for(let i = 0; i<inp.length;i++){
						num += Number(inp[i].value);
						pri += Number($('.productSum')[i].innerText);
						$('.checkNum').text(num);
						$('.checkSum').text(pri);
					}
				}else{
					$('.checkNum').text('0');
					$('.checkSum').text('0.00');
				}
			})
			//刪除
			$('.pount span').on('click', function() {
				$(this).parent().parent().parent().hide(400);
				getSum3($(this).parent().parent().siblings('.select'));
			})
			//点击加的时候改变总金额
			$('.add').on('click', function() {
				let inputHtml = $(this).siblings('.inputNum').val();
				let proprice = $(this).parent().parent().prev().text();
				$(this).siblings('.inputNum').val(parseInt(inputHtml) + 1);

				getChage($(this), proprice, $(this).siblings('.inputNum').val());
				getSum2($(this).parent().parent().parent().siblings('.select'), 1);
			});
			//点击加的时候改变总金额
			$('.subtr').on('click', function() {
				let inputHtml = $(this).siblings('.inputNum').val();
				$(this).siblings('.inputNum').val(parseInt(inputHtml) - 1);
				let proprice = $(this).parent().parent().prev().text();
				if($(this).siblings('.inputNum').val() < 1) {
					$(this).parent().parent().parent().parent().hide(400);
				}
				getChage($(this), proprice, $(this).siblings('.inputNum').val());
				getSum2($(this).parent().parent().parent().siblings('.select'), -1);

			});

			//方法获取改变
			window.getChage = function(that, price, num) {
				let sumPrice = (Number(price) * Number(num)).toFixed(2);
				that.parent().parent().next().text(sumPrice);
			}
			//根据选中的checkbox算钱
			window.getSum = function(that) {
				if(that.prop('checked')) {
					let num = Number(that.siblings('.produce').find('.inputNum').val());
					let price = Number(that.siblings('.produce').find('.productSum').text());
					$('.checkNum').text(Number($('.checkNum').text()) + num);
					$('.checkSum').text((Number($('.checkSum').text()) + price).toFixed(2));

				} else {
					let num = Number(that.siblings('.produce').find('.inputNum').val());
					let price = that.siblings('.produce').find('.productSum').text();
					$('.checkNum').text(Number($('.checkNum').text()) - num);
					$('.checkSum').text((Number($('.checkSum').text()) - price).toFixed(2));
				}
			}
			//选中checkbox之后，再点击加减时算钱
			window.getSum2 = function(that, symbol) {
				if(that.prop('checked')) {
					let num = Number(that.siblings('.produce').find('.inputNum').val());
					let priceOne = Number(that.siblings('.produce').find('.productPrice').text());
					$('.checkNum').text(Number($('.checkNum').text()) + symbol);
					$('.checkSum').text((Number($('.checkSum').text()) + (priceOne * symbol)).toFixed(2));
				}
			}
			//选中checkbox之后，点击删除时算钱
			window.getSum3 = function(that) {
				if(that.prop('checked')) {
					let num = Number(that.siblings('.produce').find('.inputNum').val());
					let price = Number(that.siblings('.produce').find('.productSum').text());
					$('.checkNum').text(Number($('.checkNum').text()) - num);
					$('.checkSum').text((Number($('.checkSum').text()) - price).toFixed(2));
				}
			}

		})

	})
})