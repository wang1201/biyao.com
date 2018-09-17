let gulp = require('gulp');
let minifyJS = require('gulp-babel-minify'); //引入压缩js模块
let minifyCSS = require('gulp-clean-css') //引入压缩css的模块
//创建一个本地服务器，以达到实时请求的效果
let connect = require('gulp-connect');
let server = require('gulp-webserver');
//声明一个sass
let sass = require('gulp-sass');

let gulpJson = require('gulp-jsonminify');

let gulpImg = require('gulp-imagemin');

//定义一个名字叫做‘build’的任务
gulp.task('build', () => {
	//压缩并复制js
	gulp.src('./myProject/**/*.js') //读取文件
		.pipe(minifyJS()) //编译压缩处理
		.pipe(gulp.dest('./clone')) //生成到指定目录

	//复制html
	gulp.src('./myProject/**/*.html')
		.pipe(gulp.dest('./clone'))

	//压缩并复制css
	gulp.src('./myProject/**/*.scss')
		.pipe(sass({
			outputStyle: "expanded"
		}))
		.pipe(minifyCSS())
		.pipe(gulp.dest('./clone'))

	gulp.src('./myProject/**/*.css')
		.pipe(minifyCSS())
		.pipe(gulp.dest('./clone'));

	gulp.src('./myProject/**/*.json')
		.pipe(gulpJson())
		.pipe(gulp.dest('./clone'));
		
	gulp.src('./myProject/img/*')
		.pipe(gulpImg())
		.pipe(gulp.dest('./clone/img'));
})

//html监听一旦发现变化，就执行该任务，读取克隆的html文件，刷新
gulp.task('refreshHtml', () => {
	gulp.src('./myProject/**/*.html') //监控源文件
		.pipe(gulp.dest('./clone')) //源文件变动就生成到指定的目录
		.pipe(connect.reload()) //更新
})
gulp.task('refreshJS', () => {
	gulp.src('./myProject/**/*.js') 
		.pipe(minifyJS())
		.pipe(gulp.dest('./clone')) 
})
gulp.task('refreshCSS', () => {
	gulp.src('./myProject/**/*.scss') 
		.pipe(sass({
			outputStyle: "expanded"
		}).on('error', sass.logError)) //错误处理
		//.pipe(minifyCSS())//编译压缩处理
		.pipe(gulp.dest('./clone')) //复制过去

	gulp.src('./myProject/**/*.css')
		//.pipe(minifyCSS())
		.pipe(gulp.dest('./clone'))
})

gulp.task('refreshJSON', () => {
	gulp.src('./myProject/**/*.json') 
		.pipe(gulpJson()) 
		.pipe(gulp.dest('./clone')) 
})

gulp.task('refreshImg', () => {
	gulp.src('./myProject/img/*')
		.pipe(gulpImg())
		.pipe(gulp.dest('./clone/img')); 
})


gulp.task('webserver', () => {
	//创建一个服务器
	//	connect.server({
	//		root:'./clone',//指定服务器的根目录是源页面
	//		port:9091,//服务器的端口号
	//		livereload:true //服务器是否热部署（实时刷新）	
	//		//directoryListing:true,
	//		//open:true
	//	})
	//    webserver监听文件的改变
	gulp.src('./clone')
		.pipe(server({
			port: 9091,
			livereload: true,
			directoryListing: true,
			open: true,
			//	      	middleware: function (connect, opt) {
			//		      var Proxy = require('gulp-connect-proxy');
			//		      opt.route = '/proxy';
			//		      var proxy = new Proxy(opt);
			//		      return [proxy];
			//		    }
		}));
	//也就是说运行的时候，直接localhost://9091/login.html就是指的clone下的login
	//监听所有文件的变化，执行相应的任务
	gulp.watch('./myProject/**/*.html', ['refreshHtml']);
	gulp.watch('./myProject/**/*.scss', ['refreshCSS', 'refreshHtml']);
	gulp.watch('./myProject/**/*.css', ['refreshCSS', 'refreshHtml'])
	gulp.watch('./myProject/**/*.js', ['refreshJS', 'refreshHtml']);
	gulp.watch('./myProject/**/*.json',['refreshJSON']);
	gulp.watch('./myProject/img/*',['refreshImg','refreshHtml'])
})