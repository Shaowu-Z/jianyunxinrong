// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
  

// export default {cc}
var util={
//  Date.prototype.Format = function(fmt) {
// 	var o = {
// 		"M+": this.getMonth() + 1, //月份
// 		"d+": this.getDate(), //日
// 		"h+": this.getHours(), //小时
// 		"m+": this.getMinutes(), //分
// 		"s+": this.getSeconds(), //秒
// 		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
// 		"S": this.getMilliseconds() //毫秒
// 	};
// 	if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
// 	for(var k in o)
// 		if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
// 	return fmt;
// },
// var Format={
	fnFormat(mms,n){
	var fmt=mms
	Date.prototype.Format = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for(var k in o)
			if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}
	return new Date(fmt).Format(n)
	},
// }


getParam(url) {
	var map = {};
	if(url.indexOf("?") > -1) {
		var arrays = url.split("?")[1].split("&");
		for(var i = 0; i < arrays.length; i++) {
			var param = arrays[i].split("=");
			map[param[0]] = decodeURI(param[1]);
		}
	}
	return map;
},

getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
},

//Array.prototype.indexOf = function(val) {
//	for(var i = 0; i < this.length; i++) {
//		if(this[i] == val || JSON.stringify(val) == JSON.stringify(this[i])) return i;
//	}
//	return -1;
//};
array(){
Array.prototype.contains = function (obj) {
	var i = this.length;
	while (i--) {
		if (this[i] === obj) {
			return true;
		}
	}
	return false;
}

Array.prototype.insert = function (index, item) {
	this.splice(index, 0, item);
};

Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if(index > -1) {
		this.splice(index, 1);
	}
};
Array.prototype.contains = function(needle) {
	for(var i in this) {
		if(this[i] == needle) return true;
	}
	return false;
}
},
 aClick(url) {
	var pagepath = getPagePath();
	window.appApi.openNewWindow(pagepath + url);
},



//数字格式化  保留两位小数，有千位符 如： 12,234.55(万元)
numberFormat1(num, f) {
	var array = [1, 10, 100, 1000, 10000];
    if(typeof(num) == "undefined" || isNaN(num) || num==0) return "0";
    if(typeof(f) == "undefined" || isNaN(f)) f = 2;
    var s = ((num).toFixed(f))*array[f]/array[f] + "";
    var l = s.split(".")[0], r = s.indexOf(".")>-1 ? "." + s.split(".")[1] : "";
    var j = "";
    if(l.indexOf("-")==0){
    	j = l.substring(0,1);
        l = l.substring(1, l.length);
	}
	l  = l.split("").reverse();
    var t = "";
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return j + t.split("").reverse().join("") + r;
},
//数字格式化  比列数字（百分比，需要乘以100后保留两位小数）
numberFormat2(num) {
    if(typeof(num) == "undefined" || isNaN(num)) return 0
    var s = (num*100).toFixed(2);
    return  s;
}
}	
export default util