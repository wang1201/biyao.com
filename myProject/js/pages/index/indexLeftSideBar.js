var proinfo = $(function() {
	var $subblock = $(".subpage"),
		$head = $subblock.find('h2'),
		inter = false;
	$head.hover(function(e) {
		e.stopPropagation();
		if(!inter) {
			$(this).next().show();
		} else {
			$(this).next().hide();;
		}
		inter = !inter;
	});

	$(".prosul").find("li").on('mouseenter', function() {
		if(!$(this).hasClass('nochild')) {
			$(this).addClass("prosahover");
			$(this).find(".prosmore").removeClass('hide');
		}
	})
	$(".prosul").find("li").on('mouseleave', function() {
		if(!$(this).hasClass('nochild')) {
			if($(this).hasClass("prosahover")) {
				$(this).removeClass("prosahover");
			}
			$(this).find(".prosmore").addClass('hide');
		}
	})

})
define([], function() {
	return proinfo;
})