// export const fun = {
// 	/*--------通用常量配置--------*/
// 	// 当前访问的地址
// 	curr_url : window.location.href,
	
// 	/****** sunline平台 ******/
// 	// sunline域名
// 	SUNLINE_SERVER_ADDRESS : "",
// 	//上传服务器地址
// 	UPLOAD_SERVER_ADDRESS : '',
// 	/****** sunline平台 ******/

// 	/****** 好思平台 ******/
// 	// 好思域名
// 	HAOSI_SERVER_ADDRESS : '',
// 	// 好思域名关键部分截取
// 	HAOSI_SERVER_SHORT : '',
// 	// 好思域名通配符
// 	HAOSI_TONGPEIFU : '@hs//',
// 	// 好思域名通配符数组（或者需要被替换的字符，此处地址域名无需修改）
// 	HAOSI_REPLACE : ["@hs/", "http://haosi.winfreeinfo.com:9001"],
// 	/****** 好思平台 ******/

// 	DEVICE_FLAG : "saaspro",

// 	DOWN_LOAD_APP_URL : getUrl() + "/static/webstatic/mycenter/ext/share_detail.html",

// 	// 安卓下载地址
// 	ANDROID_URL : "",

// 	// IOS下载地址
// 	IOS_URL : "",

// 	SHARE_OPERATE : {
// 		DISH_SHARE: 1,
// 		VIDEO_SHARE: 2
// 	},
// 	newFunction:()=>{
// 		if (curr_url.substr("https://m.cloudccif.com") > -1) {
// 			SUNLINE_SERVER_ADDRESS = "https://m.cloudccif.com";
// 			HAOSI_SERVER_ADDRESS = "https://haosi.cloudccif.com";
// 			HAOSI_SERVER_SHORT = "https://haosi";
// 			ANDROID_URL = "http://17120431944.fx.sj.360.cn/qcms/view/t/detail?id=3914913&appinstall=0"; // 360
// 			IOS_URL = "https://itunes.apple.com/cn/app/id1296162995?mt=8";
// 			UPLOAD_SERVER_ADDRESS = "https://m.cloudccif.com:8000";
// 			// ANDROID_URL = "http://shouji.baidu.com/software/22848501.html";  // 百度
// 		} else {
// 			SUNLINE_SERVER_ADDRESS = "http://java.winfreeinfo.com";
// 			HAOSI_SERVER_ADDRESS = "http://haosi.winfreeinfo.com:9001";
// 			HAOSI_SERVER_SHORT = "http://haosi";
// 			ANDROID_URL = "https://www.pgyer.com/jyxr";
// 			IOS_URL = "https://www.pgyer.com/jyxr";
// 			UPLOAD_SERVER_ADDRESS = "http://res.winfreeinfo.com:8000";
// 		}
// 		newFunction();
// 	},
// 	getCookie:(name)=> {
// 		let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
// 		if(arr != null)
// 			return arr[2];
// 		return null;
// 	},
// 	setCookie:(name)=> {
// 		let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
// 		if(arr != null)
// 			return arr[2];
// 		return null;
// 	},
// 	browser : {
// 		versions: function() {
// 			let u = navigator.userAgent,
// 				app = navigator.appVersion;
// 			return { //移动终端浏览器版本信息
// 				trident: u.indexOf('Trident') > -1, //IE内核
// 				presto: u.indexOf('Presto') > -1, //opera内核
// 				webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
// 				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
// 				mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
// 				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
// 				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
// 				iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
// 				iPad: u.indexOf('iPad') > -1, //是否iPad
// 				webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
// 			};
// 		}(),
// 		language: (navigator.browserLanguage || navigator.language).toLowerCase()
// 	},
// 	onload:()=> {
// 		let tab_list = document.getElementById("tab_list_id");
// 		let rollback = document.getElementById("rollback_id");
// 		if(browser.versions.ios || browser.versions.android) { //如果是app打开,隐藏
// 			if(tab_list != null) {
// 				tab_list.setAttribute("style", "display:none");
// 			}
// 			if(rollback != null) {
// 				rollback.setAttribute("style", "display:none");
// 			}
// 		} else {
// 			if(tab_list != null) {
// 				tab_list.setAttribute("style", "display:block");
// 			}
// 			if(rollback != null) {
// 				rollback.setAttribute("style", "display:block");
// 			}
// 		}
	
// 	}
// };
// 获取上下文的路径
// export function getUrl() {
// 		let curr_url = window.location.href;
// 		let url = curr_url;
// 		console.log(url);
// 		let str1 = url.substr(url.indexOf("/") + 2, url.length - 1);
// 		let index = str1.indexOf("/") + url.indexOf("/") + 2;
// 		return url.substr(0, index);
// 	};
// // 获取页面上下文的路径
// export function  getPagePath() {
// 			return getUrl() + "/static/webstatic";
// 		}

// function setting() {
// 	function getUrl() {
// 		let curr_url = window.location.href;
// 		let url = curr_url;
// 		console.log(url);
// 		let str1 = url.substr(url.indexOf("/") + 2, url.length - 1);
// 		let index = str1.indexOf("/") + url.indexOf("/") + 2;
// 		return url.substr(0, index);
// 	};
// 	return {
// 		getUrl:getUrl,
// 		getPagePath() {
// 			return getUrl() + "/static/webstatic";
// 		}
// 	}
// }

function setting () {
	//获取上下文路径
	function getUrl() {
		var url = window.location.href;
		var str1 = url.substr(url.indexOf("/") + 2, url.length - 1);
		var index = str1.indexOf("/") + url.indexOf("/") + 2;
		return url.substr(0, index);
	}
	// 获取页面上下文的路径
	function getPagePath() {
		return getUrl() + "/static/webstatic";
	}
	function getCookie(name) {
		var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		if(arr != null)
			return arr[2];
		return null;
	}
	function setCookie(name) {
		var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		if(arr != null)
			return arr[2];
		return null;
	}
	window.onload = function() {
		var sUserAgent = navigator.userAgent.toLowerCase();
		var tab_list = document.getElementById("tab_list_id");
		var rollback = document.getElementById("rollback_id");
		if(sUserAgent.match.ios || sUserAgent.match.android) { //如果是app打开,隐藏
			if(tab_list != null) {
				tab_list.setAttribute("style", "display:none");
			}
			if(rollback != null) {
				rollback.setAttribute("style", "display:none");
			}
		} else {
			if(tab_list != null) {
				tab_list.setAttribute("style", "display:block");
			}
			if(rollback != null) {
				rollback.setAttribute("style", "display:block");
			}
		}
	
	}
	return {
		getUrl : getUrl,
		getPagePath : getPagePath,
		getCookie : getCookie,
		setCookie : setCookie,
		/*--------通用常量配置--------*/
		// 当前访问的地址
		curr_url : window.location.href,
		
		/****** sunline平台 ******/
		// sunline域名
		SUNLINE_SERVER_ADDRESS : "",
		//上传服务器地址
		UPLOAD_SERVER_ADDRESS : '',
		/****** sunline平台 ******/

		/****** 好思平台 ******/
		// 好思域名
		HAOSI_SERVER_ADDRESS : '',
		// 好思域名关键部分截取
		HAOSI_SERVER_SHORT : '',
		// 好思域名通配符
		HAOSI_TONGPEIFU : '@hs//',
		// 好思域名通配符数组（或者需要被替换的字符，此处地址域名无需修改）
		HAOSI_REPLACE : ["@hs/", "http://haosi.winfreeinfo.com:9001"],
		/****** 好思平台 ******/

		DEVICE_FLAG : "saaspro",

		DOWN_LOAD_APP_URL : getUrl() + "/static/webstatic/mycenter/ext/share_detail.html",

		// 安卓下载地址
		ANDROID_URL : "",

		// IOS下载地址
		IOS_URL : "",

		SHARE_OPERATE : {
			DISH_SHARE: 1,
			VIDEO_SHARE: 2
		},
	}
}
export default setting();

// export {fun};
// /*--------通用常量配置--------*/
// // 当前访问的地址
// var curr_url = window.location.href;

// /****** sunline平台 ******/
// // sunline域名
// var SUNLINE_SERVER_ADDRESS = "";
// //上传服务器地址
// var UPLOAD_SERVER_ADDRESS = '';
// /****** sunline平台 ******/

// /****** 好思平台 ******/
// // 好思域名
// var HAOSI_SERVER_ADDRESS = '';
// // 好思域名关键部分截取
// var HAOSI_SERVER_SHORT = '';
// // 好思域名通配符
// var HAOSI_TONGPEIFU = '@hs//';
// // 好思域名通配符数组（或者需要被替换的字符，此处地址域名无需修改）
// var HAOSI_REPLACE = ["@hs/", "http://haosi.winfreeinfo.com:9001"];
// /****** 好思平台 ******/

// var DEVICE_FLAG = "saaspro";

// var DOWN_LOAD_APP_URL = getUrl() + "/static/webstatic/mycenter/ext/share_detail.html";

// // 安卓下载地址
// var ANDROID_URL = "";

// // IOS下载地址
// var IOS_URL = "";


// var SHARE_OPERATE = {
// 	DISH_SHARE: 1,
// 	VIDEO_SHARE: 2
// }
// 	newFunction();
// 	function newFunction()	{
// 		if (curr_url.substr("https://m.cloudccif.com") > -1) {
// 		SUNLINE_SERVER_ADDRESS = "https://m.cloudccif.com";
// 		HAOSI_SERVER_ADDRESS = "https://haosi.cloudccif.com";
// 		HAOSI_SERVER_SHORT = "https://haosi";
// 		ANDROID_URL = "http://17120431944.fx.sj.360.cn/qcms/view/t/detail?id=3914913&appinstall=0"; // 360
// 		IOS_URL = "https://itunes.apple.com/cn/app/id1296162995?mt=8";
// 		UPLOAD_SERVER_ADDRESS = "https://m.cloudccif.com:8000";
// 		// ANDROID_URL = "http://shouji.baidu.com/software/22848501.html";  // 百度
// 	}else {
// 		SUNLINE_SERVER_ADDRESS = "http://java.winfreeinfo.com";
// 		HAOSI_SERVER_ADDRESS = "http://haosi.winfreeinfo.com:9001";
// 		HAOSI_SERVER_SHORT = "http://haosi";
// 		ANDROID_URL = "https://www.pgyer.com/jyxr";
// 		IOS_URL = "https://www.pgyer.com/jyxr";
// 		UPLOAD_SERVER_ADDRESS = "http://res.winfreeinfo.com:8000";
// 	}
// 	}
// //获取上下文路径
// function getUrl() {
// 	var url = curr_url;
// 	var str1 = url.substr(url.indexOf("/") + 2, url.length - 1);
// 	var index = str1.indexOf("/") + url.indexOf("/") + 2;
// 	return url.substr(0, index);
// }

// // 获取页面上下文的路径
// function getPagePath() {
// 	return getUrl() + "/static/webstatic";
// }

// function getCookie(name) {
// 	var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
// 	if(arr != null)
// 		return arr[2];
// 	return null;
// }

// function setCookie(name) {
// 	var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
// 	if(arr != null)
// 		return arr[2];
// 	return null;
// }

// //获取访问工具内核
// var browser = {
// 	versions: function() {
// 		var u = navigator.userAgent,
// 			app = navigator.appVersion;
// 		return { //移动终端浏览器版本信息
// 			trident: u.indexOf('Trident') > -1, //IE内核
// 			presto: u.indexOf('Presto') > -1, //opera内核
// 			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
// 			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
// 			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
// 			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
// 			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
// 			iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
// 			iPad: u.indexOf('iPad') > -1, //是否iPad
// 			webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
// 		};
// 	}(),
// 	language: (navigator.browserLanguage || navigator.language).toLowerCase()
// }

// window.onload = function() {
// 	var tab_list = document.getElementById("tab_list_id");
// 	var rollback = document.getElementById("rollback_id");
// 	if(browser.versions.ios || browser.versions.android) { //如果是app打开,隐藏
// 		if(tab_list != null) {
// 			tab_list.setAttribute("style", "display:none");
// 		}
// 		if(rollback != null) {
// 			rollback.setAttribute("style", "display:none");
// 		}
// 	} else {
// 		if(tab_list != null) {
// 			tab_list.setAttribute("style", "display:block");
// 		}
// 		if(rollback != null) {
// 			rollback.setAttribute("style", "display:block");
// 		}
// 	}

// }
