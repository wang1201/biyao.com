define(['jquery'], function(jQuery) {
	return {
		//中间部分模版图片高度一致
		getHeight: function() {
			let img02Height = $('.category-list').children().eq(1).find('img').outerHeight();
			let h = img02Height + 'px';
			$('.category-list .template').find('img').css('height', h);
		},
		//获取高度改变图片高度，使其一直保持一致
		contentStyle: function() {
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
			this.getHeight();
		}

	}
})