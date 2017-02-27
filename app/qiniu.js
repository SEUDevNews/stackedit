/**
 * Created by warjiang on 17-2-23.
 */
var qiniu = require("qiniu");
//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'b2cjWlox-DWUzF_7iGA2I1BAlD9lONBTUMY22wxu';
qiniu.conf.SECRET_KEY = '7qsoCQzLxxGCPHMwcSSkd0fn4QGz0rwDneXkXAop';

function uptoken(bucketname) {
	var putPolicy = new qiniu.rs.PutPolicy(bucketname);
	// putPolicy.callbackUrl = callbackUrl;
	// putPolicy.callbackBody = callbackBody;
	// putPolicy.returnUrl = returnUrl;
	// putPolicy.returnBody = returnBody;
	// putPolicy.asyncOps = asyncOps;
	// putPolicy.expires = expires;
	return putPolicy.token();
}

// var token = uptoken('devnews');
exports.getUpToken = function (req, res) {
		// return uptoken('devnews');
	res.send(200, uptoken('devnews'));
};
