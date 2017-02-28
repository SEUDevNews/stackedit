define([
    "underscore",
	"jquery",
    "utils",
	"eventMgr",
	'webuploader',
	// "core",
	"css!bower-libs/webuploader/webuploader.css"
], function(_, $, utils,eventMgr,WebUploader) {
	var qiniuHelper = {},pagedownEditor;
	qiniuHelper.base_url = "http://img.spotty.com.cn/";
	function getUptoken(){
		$.ajax({
			url:'/getUploadToken',
			success:function (data) {
				//console.log(data);
				qiniuHelper.uploader = WebUploader.create({

					// swf文件路径
					swf: 'bower-libs/webuploader/Uploader.swf',

					// 文件接收服务端。
					server: 'http://up.qiniu.com/',

					// pick: '#picker',

					// 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
					resize: false,

					formData: {
						token: data
					},

					paste:'.editor-content',
					auto:true,
				});


				// 当有文件被添加进队列的时候
				qiniuHelper.uploader.on( 'fileQueued', function( file ) {
					console.log(file.id, file.name, 'enqueued');
				});
				qiniuHelper.uploader.on('uploadSuccess', function (file, response) {
					//console.dir(response);
					var img_url = qiniuHelper.base_url + response['hash'];
					pagedownEditor.uiManager.addImage(img_url);
					/*
					core.insertLinkCallback = function(e){
						console.log('insert link callback');
						console.dir(e);
					};
					core.insertLinkCallback(img_url);
					*/
				});

			}
		})
	}
	/*
	eventMgr.addListener("onMessage", function(d) {
		console.log(d);
	});
	*/
	eventMgr.addListener("onReady", function(isOfflineParam) {
		console.log('qiniu helper ready');
		getUptoken();
	});

	eventMgr.addListener("onPagedownConfigure",function(editor){
		//console.debug('qiniu listen editor');
		//console.dir(editor);
		pagedownEditor  = editor;
		//console.dir(pagedownEditor);
	});



	return qiniuHelper;
});
