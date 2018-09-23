define(['jquery'], function(jQuery) {
	return {
		//点击个数的添加减少时，改变单个商品的合计金额
		getChage: function(that, price, num) {
			let sumPrice = (Number(price) * Number(num)).toFixed(2);
			that.parent().parent().next().text(sumPrice);
		},
		//选中了某个商品，则总金额和总个数改变
		getSum: function(that) {
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
		},
		//选中checkbox之后，再点击某个商品的加减时重新计算总金额和个数
		getSum2: function(that, symbol) {
			if(that.prop('checked')) {
				let num = Number(that.siblings('.produce').find('.inputNum').val());
				let priceOne = Number(that.siblings('.produce').find('.productPrice').text());
				$('.checkNum').text(Number($('.checkNum').text()) + symbol);
				$('.checkSum').text((Number($('.checkSum').text()) + (priceOne * symbol)).toFixed(2));
			}
		},
		//选中checkbox之后，点击删除时，总金额和个数减掉当前删除元素的金额和个数
		getSum3: function(that) {
			if(that.prop('checked')) {
				let num = Number(that.siblings('.produce').find('.inputNum').val());
				let price = Number(that.siblings('.produce').find('.productSum').text());
				$('.checkNum').text(Number($('.checkNum').text()) - num);
				$('.checkSum').text((Number($('.checkSum').text()) - price).toFixed(2));
			}
		}
	}
})