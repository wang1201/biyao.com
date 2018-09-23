requirejs.config({
	baseUrl: "./", //相对默认位置
	paths: {
		"jquery": "https://cdn.bootcss.com/jquery/3.3.0/jquery.min",
		//"jquery" : "/js/jquery-3.0.0",
		"bootstrap": "https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min",
		"templates": '/js/mylib/template-web',
		"leftSideBar": '/js/pages/common/commonLeftSideBar',
		"checkForm": '/js/mylib/checkForm',
		"getCookie": '/js/mylib/getCookie',
		"commonAjax": '/js/pages/common/commonAjax',
		"indexFunction": '/js/pages/index/indexFunction',
		"shopCartFunction": '/js/pages/shopCart/shopCartFunction'
	},
	shim: { //依赖
		"bootstrap": {
			deps: ['jquery'], //依赖谁
		},
		"commonAjax": {
			deps: ['jquery'],
		}
	}
})