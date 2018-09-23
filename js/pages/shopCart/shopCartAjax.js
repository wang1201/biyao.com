require(['../../config/config'], function() {
	require(['jquery', 'templates','shopCartFunction', 'bootstrap', 'commonAjax'], function($, templates,shopCartFun) {
		var cookie = document.cookie;
		//拿到的是字符串，把username password list=去掉，截取
		var str = cookie.substr(cookie.indexOf('list='));
		str = str.substring(5);
		//再把字符串转为对象
		cookieObj = JSON.parse(str);
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
				shopCartFun.getSum($(this));

			})
			//全选反选，全选时，总金额和个数改变
			$('.select-all').click(function() {
				$('.checkoutInfo input:checkbox').prop('checked', $(this).prop('checked'));
				if($('.checkoutInfo input:checkbox').prop('checked')) {
					let num = 0;
					let pri = 0;
					let inp = $('.inputNum');
					let sum = $('.productSum');
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
			//刪除，删除时总金额和总个数改变
			$('.pount span').on('click', function() {
				$(this).parent().parent().parent().hide(400);
				shopCartFun.getSum3($(this).parent().parent().siblings('.select'));
			})
			//单个商品添加个数时，如果选中了当前元素，
			//再点击个数的添加，则改变总金额和总个数
			$('.add').on('click', function() {
				let inputHtml = $(this).siblings('.inputNum').val();
				let proprice = $(this).parent().parent().prev().text();
				$(this).siblings('.inputNum').val(parseInt(inputHtml) + 1);

				shopCartFun.getChage($(this), proprice, $(this).siblings('.inputNum').val());
				shopCartFun.getSum2($(this).parent().parent().parent().siblings('.select'), 1);
			});
			//单个商品减少个数时，如果选中了当前元素，
			//再点击个数的减少，则改变总金额和总个数
			$('.subtr').on('click', function() {
				let inputHtml = $(this).siblings('.inputNum').val();
				$(this).siblings('.inputNum').val(parseInt(inputHtml) - 1);
				let proprice = $(this).parent().parent().prev().text();
				if($(this).siblings('.inputNum').val() < 1) {
					$(this).parent().parent().parent().parent().hide(400);
				}
				shopCartFun.getChage($(this), proprice, $(this).siblings('.inputNum').val());
				shopCartFun.getSum2($(this).parent().parent().parent().siblings('.select'), -1);

			});


		})

	})
})