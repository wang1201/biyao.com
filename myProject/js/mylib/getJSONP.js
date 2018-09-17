//放在一个匿名函数里，保证作用域不影响其他，成为局部得
(function() {
	//options.type options.url option.success
	//post时 数据放在data里面一个对象{a：10，b:20}
	//对象遍历：for x in data   x:指的是key   data[x]指的是value
	//jsonp时url:'http://xxxxxxxx?&id=3&name=4'
	//http://baidu.com/?wd=${this.value}&cb=callback
	$.getData = function(options) {
		var req = window.ActiveXObject ? new ActiveXObject() : new XMLHttpRequest();
		switch(options.type) {
			case 'get':
				{
					req.open('get', options.url);
					req.onreadystatechange = function() {
						if(req.readyState == 4) {
							options.success(req.reponseText);
						}
					}
					req.send();
					break;
				}
			case 'post':
				{
					req.open('post', options.url);
					//post请求，必须写头请求
					//req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
					req.setRequestHeader("Content-type", 'application/x-www.form-urlencoded');
					req.onreadystatechange = function() {
						if(req.readyState == 4) {
							options.success(req.responseText);
						}
					}
					var dataStr = "";
					for(var key in options.data) {
						dataStr += key + '=' + options.data[key] + '&';
					}
					var rightData = dataStr.substring(0, dataStr.length - 1);
					console.log(rightData);
					req.send(rightData);
					break;
				} 
			case 'jsonp':
				{
					var script = document.createElement('script');

					//url=http://baidu.com/?wd=aaa&name='张三'
					//回调函数：&cb=自己起的
					//担心自己起的和调用该函数得其他名称重复，起一个和别的都不一样得
					var callBackName = 'MyCallBack';
					script.src = options.url + "&" + options.jsonp + '=' + callBackName;
  
					//调用回调函数
					window[callBackName] = function() {
						options.success(data);//src响应成功，把服务器上的data拿回来
						script.remove(); //删除script
						delete window[callBackName] //删除回调函数
					}
					console.log(script);
					document.body.appendChild(script);
				}

		}
	}
	window.$ = $;
})()

