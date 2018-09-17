requirejs.config({
	baseUrl:"./",//相对默认位置
	paths:{
		"jquery" : "https://cdn.bootcss.com/jquery/3.3.0/jquery.min",
		//"jquery" : "/js/jquery-3.0.0",
		"bootstrap":"https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min",
		"jsonp":"/js/mylib/getJSONP",
		"templates" : '/js/mylib/template-web',
		"leftSideBar":'/js/pages/indexLeftSideBar'
	},
	shim:{//依赖
		"bootstrap":{
			deps:['jquery'],//依赖谁
			//exports:"$"
		},
		"leftSideBar":{
			deps:['jquery'],
		}
	}
})