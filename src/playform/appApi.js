import setting from './config';
import {Base,BackCookie} from './common';

/**
 * app接口
 */
var sUserAgent = navigator.userAgent.toLowerCase();
var isIpad = sUserAgent.match(/ipad/i);
var isIphoneOs = sUserAgent.match(/iphone os/i) || isIpad;
var isAndroid = sUserAgent.match(/android/i);
var isApp = sUserAgent.match(/cy/i);
var isWeixin = sUserAgent.match(/MicroMessenger/i) == 'micromessenger'
var isTop = window == top;

var s = self;
var p = parent;
var ifrObjStr = "";
if(!isTop) {

	// for(var i = 0; i < top.frames.length; i++){
	//     if(window.top.frames[i] == window){
	//         ifrObjStr = "window.frames[0]";
	//         break;
	//     }
	// }
	// getIfrObjStr();
	function getIfrObjStr() {

		for(var i = 0; i < p.frames.length; i++) {
			if(p.frames[i] == s) {

				if(p != top) {
					ifrObjStr = ".frames[" + i + "]" + ifrObjStr;
					s = p;
					p = p.parent;
					getIfrObjStr();
				} else {
					ifrObjStr = "window.frames[" + i + "]" + ifrObjStr;
				}

				break;
			}
		}

	}
	getIfrObjStr();
	console.info("ifrObjStr == " + ifrObjStr);

}
// console.info(window.top.frames[0]);
// alert(window.top.frames[0].name);
// alert(window.top.frames[1].name);
// console.info(window.top.contentWindow);

window.Adaptive = {
	init: function() {
		let DEVICE_FLAG;
		// 返回键
		if(typeof DEVICE_FLAG == "string" && !sUserAgent.match(DEVICE_FLAG)) {
			var back = document.getElementById("btn-referrer");
			if(back) {
				// 有返回键的显示
				// if (back.className.match(new RegExp("(\\s|^)" + "hide" + "(\\s|$)"))) {
				var reg = new RegExp("(\\s|^)" + "hide" + "(\\s|$)");
				back.className = back.className.replace(reg, " ");
				// }

				// 有返回键的统一加事件

				if(back.className.match(new RegExp("(\\s|^)" + "mui-action-back" + "(\\s|$)"))) {
					return;
				}

				setTimeout(function() {
					window.onload = function() {
						document.getElementById("btn-referrer").addEventListener("touchstart", function(event) {
							event.preventDefault();
							window.history.back();
						}, false);
					}
				}, 0);
			}
		}
	},
	adpPage: function(isAddNav, nav_flag) {
		let DEVICE_FLAG;
		if(!sUserAgent.match(DEVICE_FLAG)) {
			if(isAddNav) {

				var s = function() {
					var tplStr = Base.load({
						"url": "/static/webstatic/mycenter/nav.tpl"
					}, "return")
					var html = template.compile(tplStr)({
						"nav_flag": nav_flag,
						"web_path": getUrl()
					});
					//var b = document.getElementsByTagName("body");
					var header = document.getElementsByTagName("header")[0];
					var nav = document.createElement("nav");
					nav.setAttribute("class", "g-bar g-bar-tab");
					nav.id = "cus_nav";
					nav.innerHTML = html;
					if(header) {
						header.parentNode.insertBefore(nav, header.nextSibling);
					} else {
						var first = document.body.firstChild; //得到页面的第一个元素
						document.body.insertBefore(nav, first); //在得到的第一个元素之前插入
					}

				}

				if(!(typeof template === 'function')) {
					// function不存在
					Base.getScript("/static/js/template/template.min.js", function d() {
						s();
					});
				} else {
					s();
				}
			}
		}

		//**********************限制菜单操作

		var oldonload = window.onload;
		var h = window.location.href;
		//		console.log("----------")
		//		console.log(BackCookie.getCookie("isLimit"))
		//		console.log(BackCookie.getCookie("isLimit") == "true")

		var isLimit = h.indexOf("isLimit") > 0 || BackCookie.getCookie("isLimit") == "true";

		if(isLimit) {
			BackCookie.setCookie("isLimit", isLimit, 2)
			if(typeof oldonload != 'function') {
				window.onload = function() {
					limitFn();
				};
			} else {
				window.onload = function() {
					try {
						oldonload();
					} catch(e) {
						console.log("old load err")
					}
					limitFn();
				}
			}

		}

	}
}

function limitFn() {
	console.log("限制开启")
	//限制菜单
	var divtmp = document.getElementById("cus_nav");
	var Aa = divtmp.getElementsByTagName("a");
	Aa[1].style.display = "none";
	//
	var h = window.location.href;
	//	var isLimit = h.indexOf("isLimit") > 0;
	if(h.indexOf("/static/webstatic/mycenter/mycenter.html") > 0) {
		var tmp = document.getElementById("cus_zy_item");

		tmp.onclick = function() {
			document.getElementById("cus_zhiye_popver").className = "mui-popover mui-popover-action mui-popover-bottom";
			var s = document.body.childNodes;
			s[s.length - 1].style.opacity = "0";
		}
	}

	/*var header = document.getElementsByTagName("header")[0]
	if(header != undefined) {
		var aNode = header.childNodes[2]
		console.log(header.childNodes)
		aNode.onclick = function() {
			console.log("123")
			document.getElementById("popover").style.display = "none";
			var mainCh = document.getElementById("main_content").childNodes;
			var o = mainCh[mainCh.length - 1]
			o.className = "mui-backdrop hide";
		}
	}*/

	//	var navA = divtmp.childNodes;
	//	navA[0].style.display = "none";

	//	for(var i = 0; i < navA.length; i++) {
	//		console.log(navA[i])
	//
	//	}

}

function nullClick(node) {
	var nodes = node.childNodes;
	console.log(node.onclick)
	for(var i = 0; i < nodes.length; i++) {
		nullClick(nodes[i]);
	}
}

Adaptive.init();

window.appApi = {
	callBackFlag: {
		HX_LOGIN: "1",
		LOCATION: "2",
		CONTACTS: "3",
		SHARE: "4",
		STOP_BACK: "5",
		DEVICE_INFO: "6",
		USER_INFO: "7",
		QQ_WX_LOGIN: "8",
		VERSION: "9",
		GONGSI: "10",
		CNTEXT: "11"
	},
	callBackFun: null,
	callFilter: function(callMstr) {
		var m = "window.top." + callMstr + "'" + ifrObjStr + "')";
		// alert(m);
		eval(m);
	},
	/**
	 * 分享
	 * @param (int )shareType -1 不包括建云 0=所有平台类型，1=微信QQ好友，2=微信好友 3=微信朋友圈 4=QQ 5=QQ空间  6，7=微信QQ好友
	 * @param title 标题
	 * @param content 分享内容
	 * @param url 点击分享打开的链接
	 * @param image 缩略图url
	 * @param callBackFun 回调函数
	 */
	share: function(shareType, title, content, url, image, callBackFun) {
		if(!content) content = "建云信融";
		var shareJson = {
			type: 0,
			title: title,
			content: content,
			url: url,
			thumbImgUrl: image
		}
		this.callBackFun = callBackFun;
		if(isApp && isIphoneOs) { //IOS
			url = url.replace(/=/g, "+");
			url = url.replace(/&/g, "||");
			if(!isTop) {
				this.callFilter("iosShare('" + shareType + "','" + JSON.stringify(shareJson) + "'");
				return;
			}
			iosShare(shareType, JSON.stringify(shareJson));
		} else if(isApp && isAndroid) { //addroid
			window.webactivity.share(shareType, JSON.stringify(shareJson));
		} else {
			console.info("请在app中调用");
		}
	},
	/**
	 * 分享视频
	 * @param (int )shareType 0=所有平台类型，1=微信QQ好友，2=微信好友 3=微信朋友圈 4=QQ 5=QQ空间
	 * @param title 标题
	 * @param content 分享内容
	 * @param url 分享链接
	 * @param image 图片
	 * @param callBackFun 回调函数
	 */
	shareVideo: function(shareType, title, content, url, image, videoUrl, videoName, callBackFun) {
		var shareJson = {
			type: 1,
			title: title,
			content: content,
			url: url,
			thumbImgUrl: image,
			videoUrl: videoUrl,
			videoName: videoName
		}
		this.callBackFun = callBackFun;
		if(!content) content = "建云信融";
		if(isApp && isIphoneOs) { //IOS
			url = url.replace(/=/g, "+");
			url = url.replace(/&/g, "||");
			if(!isTop) {
				this.callFilter("iosShare('" + shareType + "','" + JSON.stringify(shareJson) + "'");
				return;
			}
			iosShare(shareType, JSON.stringify(shareJson));
		} else if(isApp && isAndroid) { //addroid
			window.webactivity.share(shareType, JSON.stringify(shareJson));
		} else {
			console.info("请在app中调用");
		}
	},
	/**
	 * 分享设置好友
	 * @param arr
	 *          toImId
	 *          toAvatarUrl
	 *          toNickName
	 *          chatType
	 */
	shareSetData: function(arr) {
		var url = "";
		var json = {
			data: arr
		};
		try {
			if(isApp && isIphoneOs) { //IOS
				url = url.replace(/=/g, "+");
				url = url.replace(/&/g, "||");
				if(!isTop) {
					this.callFilter("iosSetSelectData('" + JSON.stringify(json) + "'");
					return;
				}
				iosSetSelectData(JSON.stringify(json));
			} else if(isApp && isAndroid) { //android
				window.webactivity.setSelectData(JSON.stringify(json));
			} else {
				console.info("请在app中调用");
			}
		} catch(e) {
			alert("分享异常：" + e)
		}
	},
	/**
	 * 刷新底部待办列表对应页面
	 * @param {Object} index  0-4
	 */
	refreshData: function(index) { //从0开始
		var index = 2;
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosrefreshData(" + index + ",");
				return;
			}
			iosRrefreshData(index);
		} else if(isApp && isAndroid) {
			return window.webactivity.refreshData(index);
		} else {
			return "设备不支持";
		}
	},

	/**
	 * H5页面 选择数据统一返回方法
 *   	public String type;//分享or收藏的 类型 0=普通 1=视频
	    public String title;//标题
	    public String content;//内容描述
	    public String url;//点击分享或收藏打开的url 完整地址
	    public String thumbImgUrl;//缩略图url
	    //type 默认传0  当type =1 分享类型为视频，需要视频url name
	    public String videoUrl; //视频url
	    public String videoName;//视频标题名字

	 */

	setSelectData: function(arr) {
		var json = {
			data: arr
		};
		try {
			if(isApp && isIphoneOs) { //IOS
				if(!isTop) {
					this.callFilter("iosSetSelectData('" + JSON.stringify(json) + "'");
					return;
				}
				iosSetSelectData(JSON.stringify(json));
			} else if(isApp && isAndroid) { //android
				window.webactivity.setSelectData(JSON.stringify(json));
			} else {
				console.info("请在app中调用");
			}
		} catch(e) {
			alert("发送名片异常：" + e)
		}
	},

	/**
	 * 打开位置
	 * @param adr 位置
	 * @param lge 经度
	 * @param lte 纬度
	 */
	showAddress: function(adr, lge, lte) {
		try {
			if(isApp && isIphoneOs) { //IOS
				iosOpenBaiduMapPage(adr, lge, lte);
			} else if(isApp && isAndroid) { //android
				window.webactivity.openBaiduMapPage(adr, lge, lte);
			} else {
				console.info("请在app中调用");
			}
		} catch(e) {
			alert("打开位置异常：" + e)
		}
	},

	/**
	 * 发送名片 2018.1.10
	 * @param arr
	 */
	sendCardSetData: function(arr) {
		var json = {
			data: arr
		};
		try {
			if(isApp && isIphoneOs) { //IOS
				if(!isTop) {
					this.callFilter("iosSetSelectData('" + JSON.stringify(json) + "'");
					return;
				}
				iosSetSelectData(JSON.stringify(json));
			} else if(isApp && isAndroid) { //android
				window.webactivity.setSelectData(JSON.stringify(json));
			} else {
				console.info("请在app中调用");
			}
		} catch(e) {
			alert("发送名片异常：" + e)
		}
	},
	/**
	 * 转发
	 * @param {Object} arr
	 */
	transpondSetData: function(arr) {
		var json = {
			data: arr
		};
		try {
			if(isApp && isIphoneOs) { //IOS
				if(!isTop) {
					this.callFilter("iosSelectMemberForward('" + JSON.stringify(json) + "'");
					return;
				}
				iosSelectMemberForward(JSON.stringify(json));
			} else if(isApp && isAndroid) { //android
				window.webactivity.selectMemberForward(JSON.stringify(json));
			} else {
				console.info("请在app中调用");
			}
		} catch(e) {
			alert("转发异常：" + e)
		}
	},
    /**
     * 发送收藏
     * @param  arr
     */
    sendCollection: function(String) {
       try {
            if(isApp && isIphoneOs) { //IOS
                iosSendIMMessage(JSON.stringify(String));
            } else if(isApp && isAndroid) { //android
                window.webactivity.sendIMMessage(String);
            } else {
                console.info("请在app中调用");
            }
        } catch(e) {
            alert("收藏发送异常：" + e)
        }
    },

	//震动
	//  vibration: function () {
	//      if (isApp && isIphoneOs) {
	//          loadURL("vibration://vibration");
	//          ;
	//      } else if (isApp && isAndroid) {
	//          window.webactivity.vibrator();
	//      }
	//  },
	//隐藏菜单
	//  hideMenu: function () {
	//      if (isApp && isIphoneOs) {
	//          loadURL("hidemenu://hideMenu");
	//      } else if (isApp && isAndroid) {
	//          window.webactivity.hideMenu();
	//      }
	//  },
	//显示菜单
	//  showMenu: function () {
	//      if (isApp && isIphoneOs) {
	//          loadURL("hidemenu://showMenu");
	//      } else if (isApp && isAndroid) {
	//          window.webactivity.showMenu();
	//      }
	//  },

	/**
	 *  获得地理位置信息
	 *  回调方法 setLocationResult
	 */
	getLocation: function() {

		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosGetLocation(");
				return;
			}
			iosGetLocation();
		} else if(isApp && isAndroid) { //Android
			return window.webactivity.getLocation();
		} else {
			console.info("设备不支持获取位置信息");
			return "设备不支持获取位置信息";
		}
	},
	//推送设置
	//  getMobileInfo: function (web_path) {
	//      $.ajax({
	//          url: web_path + '/mobileService/writeMobileInfo.htm',
	//          type: 'get',
	//          dataType: 'json',
	//          success: function (result) {
	//              console.info("设备信息更新...");
	//              if (isIphoneOs) {//IOS
	//                  loadURL("setmemberid://set?memberId=" + result.userId);
	//              } else if (isAndroid) {//addroid
	//                  window.webactivity.setMemberId(result.userId);
	//              } else {
	//                  console.info("设备不支持");
	//              }
	//          }
	//      });
	//  },
	/**
	 * 扫一扫二维码  如果是url，客户端处理，调用openUrl打开
	 * 回调方法  getQRCodeResult
	 */
	sweepQrCode: function() {
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosScanQR(");
				return;
			}
			iosScanQR();
		} else if(isApp && isAndroid) { //addroid
			window.webactivity.scanQR();
		} else {
			console.info("设备不支持");
		}
	},
	//  //IOS设置状态栏颜色
	//  colorClick: function () {
	//      loadURL("statuscolor://setcolor?r=230&g=0&b=18&a=0.9");
	//      /* loadURL("statuscolor://setcolor?r=255&g=0&b=0&a=0.9");*/
	//  },
	// /**
	//  * 获得设备Mac信息
	//  * @param callBackFun 回调函数
	//  */
	// getDeviceMac: function (callBackFun) {
	//     this.callBackFun = callBackFun;
	//     if (isApp && isIphoneOs) {//IOS
	//         loadURL("getDeviceMac://getMacAddress");
	//     } else if (isApp && isAndroid) {//addroid
	//         window.webactivity.getDeviceMac();
	//     } else {
	//         console.info("设备不支持");
	//     }
	// },
	//摇一摇声音
	//  playShakeSound: function () {
	//      if (isApp && isIphoneOs) {//IOS
	//          loadURL("playShakeSound://playShakeSound");
	//      } else if (isApp && isAndroid) {//addroid
	//          window.webactivity.playShakeSound();
	//      } else {
	//          console.info("设备不支持");
	//      }
	//  },
	//设置手机号码
	//  setPhoneNumber: function (phoneNumber) {
	//      if (isApp && isIphoneOs) {//IOS
	//          loadURL("setPhoneNumber://set?phoneNumber=" + phoneNumber);
	//      } else if (isApp && isAndroid) {//addroid
	//          window.webactivity.setPhoneNumber(phoneNumber);
	//      } else {
	//          console.info("设备不支持");
	//      }
	//  },
	//  //获得app存储的手机号码
	//  getPhoneNumber: function (callBackFun) {
	//      this.callBackFun = callBackFun;
	//      if (isApp && isIphoneOs) {//IOS
	//          loadURL("getPhoneNumber://getPhoneNumber");
	//      } else if (isApp && isAndroid) {//addroid
	//          window.webactivity.getPhoneNumber();
	//      } else {
	//          console.info("设备不支持");
	//      }
	//  },
	//震动
	//  vibrator: function () {
	//      if (isApp && isIphoneOs) {//IOS
	//          loadURL("vibrator://vibrator");
	//      } else if (isApp && isAndroid) {//addroid
	//          window.webactivity.vibrator();
	//      } else {
	//          //手机震动1秒
	//          if (navigator.vibrate) {
	//              navigator.vibrate(1000);//震动1000毫秒
	//          } else if (navigator.webkitVibrate) {
	//              navigator.webkitVibrate(1000);
	//          }
	//      }
	//  },
	//打印
	//  printer: function (url) {
	//      if (isApp && isIphoneOs) {//IOS
	//          loadURL("printer://printClick?url=" + url);
	//      } else if (isApp && isAndroid) {//addroid
	//          window.webactivity.printer(url);
	//      } else {
	//          console.info("设备不支持");
	//      }
	//  },
	/**
	 * 横屏切换 type 0=立即切换竖屏     1=立即切换横屏    2=跟随手机朝向可来回自由切换
	 * @param {Object} type
	 */
	renderHorizonView: function(type) {
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosSetScreenOrientation(");
				return;
			}
			iosSetScreenOrientation(type);
		} else if(isApp && isAndroid) { //addroid
			window.webactivity.setScreenOrientation(type);
		} else {
			console.info("设备不支持");
		}
	},
	//关闭横屏
	//  renderHorizonViewClose: function () {
	//      if (isApp && isIphoneOs) {//IOS
	//          loadURL("close://close");
	//      } else if (isApp && isAndroid) {//addroid
	//          window.webactivity.close();
	//      } else {
	//          console.info("设备不支持");
	//      }
	//  },
	/**
	 * 切换底部菜单
	 * @param {Object} index 0-4，底部下标
	 */
	changeMenu: function(index) {
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosSwitchMenu(");
				return;
			}
			iosSwitchMenu(index);
		} else if(isApp && isAndroid) { //addroid
			window.webactivity.switchMenu(index);
		} else {
			console.info("设备不支持");
		}
	},
	/**
	 *      打开新窗口
	 * @param {Object} url
	 */
	openNewWindow: function(url) {
		try {
			if(isApp && isIphoneOs) { //IOS
				if(!isTop) {
					this.callFilter("iosOpenUrl('" + url + "',");
					return;
				}
				iosOpenUrl(url);
			} else if(isApp && isAndroid) { //addroid
				window.webactivity.openUrl(url);
			} else {
				console.info("openPage:web");
				window.location.href = url;

			}
		} catch(err) {
			window.location.href = url;
		}
	},
	/**
	 * // 关闭当前窗口
	 * @param {Object} url
	 */
	closeNewWindow: function(url) {
		try {
			if(isApp && isIphoneOs) { //IOS
				if(!isTop) {
					this.callFilter("iosClose(");
					return;
				}
				iosClose();
			} else if(isApp && isAndroid) { //addroid
				window.webactivity.close();
			} else {
				if(url) {
					window.location.href = url;
				} else {
					history.go(-1);
				}
			}
		} catch(err) {
			if(url) {
				window.location.href = url;
			} else {
				history.go(-1);
			}
		}
	},
    /**
     * // 显示加载框
     * @param {Object} url
     */
    showLoading: function() {
        try {
            if(isApp && isIphoneOs) { //IOS
                iosShowLoading();
            } else if(isApp && isAndroid) { //addroid
                window.webactivity.showLoading();
            }
        } catch(err) {

        }
    },
    /**
     * // 关闭加载框
     * @param {Object} url
     */
    hideLoading: function() {
        try {
            if(isApp && isIphoneOs) { //IOS
                iosHideLoading();
            } else if(isApp && isAndroid) { //addroid
                window.webactivity.hideLoading();
            }
        } catch(err) {

        }
    },
	/**
	 * 去到主界面 或 回到主界面 ,主界面默认 工作页面
	 * @param {Object} url
	 */
	goHome: function(url) {
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosPopToMain(");
				return;
			}
			iosPopToMain();
		} else if(isApp && isAndroid) { //addroid
			window.webactivity.popToMain();
		} else {
			window.location.href = url;
		}
	},
	/**
	 *  隐藏返回键
	 */
	hideBack: function() {
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosHideBack(");
				return;
			}
			iosHideBack();
		} else if(isApp && isAndroid) { //addroid
			window.webactivity.hideBack();
		} else {

		}
	},
	/**
	 *  显示返回键
	 */
	showBack: function() {
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosShowBack(");
				return;
			}
			iosShowBack();
		} else if(isApp && isAndroid) { //addroid
			window.webactivity.showBack();
		} else {

		}
	},
	/**
	 * 第三方登录
	 * type 0=qq登录 1=微信登录
	 * 回调 setQQWXLoginResult
	 */
	openLogin: function(type) {
		try {
			if(isApp && isIphoneOs) { //IOS
				if(!isTop) {
					this.callFilter("iosLoginQQWX(" + type + ",");
					return;
				}
				iosLoginQQWX(type);
			} else if(isApp && isAndroid) {
				window.webactivity.loginQQWX(type);
			}
		} catch(e) {
			alert(e)
		}

	},

	/**
	 * 关闭所有页面回到主界面，并让主界指定tab 执行js
	 * @param index tab索引 0-4
	 * @param js  打开导航页后执行的js
	 */
	popToMainTab: function(index, js) {
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosPopToMainTab(" + index + ",'" + js + "',");
				return;
			}
			iosPopToMainTab(index, js);
		} else if(isApp && isAndroid) {
			window.webactivity.popToMainTab(index, js);
		} else {
			history.go(-1);
		}
	},
	/**
	 * 向所有已打开页面发送JavaSrcipt脚本，用于页面之间同步和数据刷新
	 */
	broadcast: function(script) {
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosBroadcast('" + script + "',");
				return;
			}
			iosBroadcast(script);
		} else if(isApp && isAndroid) {
			window.webactivity.broadcast(script);
		}
	},
	/**
	 * 获取手机通讯录信息，能读取到通讯录姓名和联系方式
	 * 原生返回数据 调用    setContactsResult
	 */
	getContacts: function() {
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosGetContacts(");
				return;
			}
			iosGetContacts();
		} else if(isApp && isAndroid) {
			window.webactivity.getContacts();
		}
	},

	/* 获取手机剪贴板文本内容
	 * android: window.webactivity.getTextFromClip()
	 * Ios : iosGetTextFromClip()
	 * js回调方法:setTextFromClipResult(text)
	 * text 格式: “jyxr=用户复制的文本内容"
	 * 注意: 判断是否 jyxr开头,如果是,则说明是从建云复制的内容,否则不是.
	 * */

	/**
	 *  获得app剪切板信息
	 */
	getTextFromClip: function() {
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosGetTextFromClip(");
				return;
			}
			iosGetTextFromClip();
		} else if(isApp && isAndroid) {
			return window.webactivity.getTextFromClip()
		} else {
			console.info("设备不支持");
			return "设备不支持";
		}
	},

	/**
	 *  删除app剪切板信息
	 */
	copyText: function(text) {
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosGetTextFromClip(");
				return;
			}
			iosCopyText(text);
		} else if(isApp && isAndroid) {
			return window.webactivity.copyText(text)
		} else {
			console.info("设备不支持");
			return "设备不支持";
		}
	},

	/**
	 * 打开相机
	 * @param type   固定为3=拍摄（综合了相册与相机）
	 * @param cameraType  0=只能拍摄图片     1=只能拍摄视频      2=拍摄相片和视频  （都支持从相册中选择）
	 * @param maxCount  最大数量
	 */
	openCamera: function(type, cameraType, maxCount) {
		if(undefined == maxCount) {
			maxCount = 1;
		}
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosSetInputType(" + type + "," + cameraType + "," + maxCount + ",");
				return;
			}
			iosSetInputType(type, cameraType, maxCount);
		} else if(isApp && isAndroid) {
			window.webactivity.setInputType(type, cameraType, maxCount);
		}
	},
	/**
	 * 打开聊天
	 * @param userName 单聊传userName如果是群聊则传群聊id
	 * @param chatType 1=单聊 2=群聊
	 * @param userAvatar 头像url
	 * @param nickName 用户名称
	 */
	openChat: function(userName, userAvatar, nickName, chatType) {
		// alert(4)
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosOpenChat('" + userName + "','" + userAvatar + "','" + nickName + "'," + chatType + ",");
				return;
			}
			iosOpenChat(userName, userAvatar, nickName, chatType);
		} else if(isApp && isAndroid) {
			window.webactivity.openChat(userName, userAvatar, nickName, chatType);
		}
	},
	/**
	 * 发送IM消息
	 * @param jsonStr 
	 *  public String content;//内容
	 * public String toImId;//接收方的环信id
	 * public String toAvatarUrl;//接收方头像地址
	 * public String toNickName;//接收方昵称
	 * public String chatType;//接收方聊天类型  1=单聊 2=群聊
	 */
	sendNotifyMsg: function(jsonStr) {
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosSendNotifyMsg('" + jsonStr + "',");
				return;
			}
			iosSendNotifyMsg(jsonStr);
		} else if(isApp && isAndroid) {
			window.webactivity.sendNotifyMsg(JSON.stringify(jsonStr));
		}
	},

	/**
	 * 发送名片
	 * @param jsonStr 包含了名片名称、手机号、头像地址、名片地址，接收人环信ID、头像地址、名称，发送类型(单聊、群聊)
	 */
	sendVisitingCard: function(jsonStr) {
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosSendVisitingCard('" + jsonStr + "',");
				return;
			}
			iosSendVisitingCard(jsonStr);
		} else if(isApp && isAndroid) {
			window.webactivity.sendVisitingCard(jsonStr);
		}
	},
	/**
	 * 收藏或者分享
	 * @param jsonStr
	 */
	sendToFriend: function(jsonStr) {
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosSendToFriend('" + jsonStr + "',");
				return;
			}
			iosSendToFriend(jsonStr);
		} else if(isApp && isAndroid) {
			window.webactivity.sendToFriend(jsonStr);
		}
	},
	/**.
	 *  《app端弃用》
	 * 登录环信
	 * @param userName    用户名
	 * @param password    密码
	 * @param userAvatar  头像url  第一次没有传null
	 */
	loginHXChat: function(imId, impwd, userAvatar) {
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosLoginChat('" + imId + "','" + impwd + "','" + userAvatar + "',");
				return;
			}
			iosLoginChat(imId, impwd, userAvatar);
		} else if(isApp && isAndroid) {
			window.webactivity.loginChat(imId, impwd, userAvatar);
		}

	},
	/**
	 * 保存用户信息到手机(resultJson包含了所有数据)
	 * @param userId 用户id
	 * @param password 密码
	 *@return  state = true or false    返回一个true或false
	 */
	saveUserInfo: function(resultJson, password) {
		if(isApp && isIphoneOs) { //IOS{
			if(!isTop) {
				this.callFilter("iosSetUserInfo('" + resultJson + "','" + password + "'");
				return;
			}
			iosSetUserInfo(resultJson, password);
			return true;
		} else if(isApp && isAndroid) {
			return window.webactivity.setUserInfo(resultJson, password);
		}
	},
	/**
	 * 获取用户信息
	 * 回调 setUserInfoResult
	 */
	getUserInfo: function() {

		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosGetUserInfo(");
				return;
			}
			iosGetUserInfo();
		} else if(isApp && isAndroid) {
			return window.webactivity.getUserInfo();
		} else {
			console.info("设备不支持获取用户信息");
			return "设备不支持获取用户信息";
		}
	},
	/**
	 * 获取版本信息
	 * 回调 setVersionInfoResult
	 */
	getVersionInfo: function() {

		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosGetVersionInfo(");
				return;
			}
			iosGetVersionInfo();
		} else if(isApp && isAndroid) {
			return window.webactivity.getVersionInfo();
		} else {
			console.info("设备不支持获取版本信息");
			return "设备不支持获取版本信息";
		}
	},

	/**
	 * 更新本地头像和用户名
	 * @returns {*}
	 */
	updateUserInfo: function(nickName, avatarUrl) {
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosUpdateUserAvatarNickName('" + nickName + "','" + avatarUrl + "',");
				return;
			}
			iosUpdateUserAvatarNickName(nickName, avatarUrl);
		} else if(isApp && isAndroid) {
			window.webactivity.updateUserAvatarNickName(nickName, avatarUrl);
		} else {
			console.info("设备不支持更新用户信息");
			return "设备不支持更新用户信息";
		}
	},
	/**
	 * 清除用户信息
	 * @returns {*}
	 */
	clearUserInfo: function() {
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosClearUserInfo(");
				return;
			}
			iosClearUserInfo();
		} else if(isApp && isAndroid) {
			window.webactivity.clearUserInfo();
		}

	},
	/**
	 * 退出程序
	 */
	loginout: function() {
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosExitApp(");
				return;
			}
			iosExitApp();
		} else if(isApp && isAndroid) {
			window.webactivity.exitApp();
		}
	},
	/**
	 * 重新登录
	 */
	relogin: function() {
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosReLogin(");
				return;
			}
			iosReLogin();
		} else if(isApp && isAndroid) {
			window.webactivity.reLogin();
		}
	},
	/**
	 *  获取设备信息
	 * 回调 setDeviceInfoResult
	 */
	getDeviceInfo: function() {
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosGetDeviceInfo(");
				return;
			}
			iosGetDeviceInfo();
		} else if(isApp && isAndroid) { //addroid
			var info = window.webactivity.getDeviceInfo()
			return JSON.parse(info);
		} else {
			var appName = navigator.appName; //浏览器的正式名称
			var appVersion = navigator.appVersion; //浏览器的版本号
			var platform = navigator.platform; // 浏览器正在运行的操作系统平台，包括Win16(windows3.x)
			var deviceInfo = {};
			/*   deviceInfo["deviceName"]=appName;
			 deviceInfo["deviceModel"]=platform;
			 deviceInfo["deviceType"]=0;
			 deviceInfo["osVersion"]=appVersion;
			 deviceInfo["osType"]=2;*/
			deviceInfo["deviceCode"] = "111111111";
			deviceInfo["deviceName"] = "h5";
			deviceInfo["deviceModel"] = "andriod 8";
			deviceInfo["deviceType"] = 1;
			deviceInfo["osVersion"] = "8.0.0";
			deviceInfo["osType"] = 0;
			return deviceInfo;
		}
	},
	/**
	 * 打开聊天记录搜索
	 */
	openMsgSearchPage: function() {
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosOpenMsgSearchPage(");
				return;
			}
			iosOpenMsgSearchPage();
		} else if(isApp && isAndroid) {
			window.webactivity.openMsgSearchPage();
		} else {
			console.info("设备不支持聊天记录搜索");
			return "设备不支持聊天记录搜索";
		}
	},
	/**
	 * 更新本地头像
	 *
	 */
	uploadImIcon: function(avatarUrl) {
		if(isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosUpdateUserAvatarNickName('','" + avatarUrl + "',");
				return;
			}
			iosUpdateUserAvatarNickName("", avatarUrl);
		} else if(isAndroid) { //Android
			window.webactivity.updateUserAvatarNickName("", avatarUrl)
		} else {
			console.info("设备不支持获取位置信息");
		}
	},
	/**
	 * 刷新底部tab对应页面
	 * @param {Object} index  0-4
	 */
	refreshNav: function(index) { //从0开始
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosRefreshPage(" + index + ",");
				return;
			}
			iosRefreshPage(index);
		} else if(isApp && isAndroid) {
			return window.webactivity.refreshPage(index);
		} else {
			return "设备不支持";
		}
	},
	/**
	 *  注销后退事件
	 * @param {Object} callBack
	 */
	stopBack: function(callBack) { //关闭返回键事件
		if(isApp && isIphoneOs) { //IOS
			//注册事件
			this.callBackFun = callBack;
			if(!isTop) {
				this.callFilter("iosSetBackState(false,");
				return;
			}
			iosSetBackState(false);
		} else if(isApp && isAndroid) {
			//注册事件
			this.callBackFun = callBack;
			window.webactivity.setBackState(false);
		} else {
			return "设备不支持";
		}
	},
	/**
	 * 绑定后退事件
	 */
	resetBack: function() {
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosSetBackState(true,");
				return;
			}
			iosSetBackState(true);
		} else if(isApp && isAndroid) {
			window.webactivity.setBackState(true);
		} else {
			return "设备不支持";
		}
	},
	/**
	 * 打开/关闭软键盘 ， 关闭则打开，打开则关闭
	 */
	showKeyboard: function() {
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosShowKeyboard(");
				return;
			}
			iosShowKeyboard();
		} else if(isApp && isAndroid) {
			return window.webactivity.showKeyboard();
		} else {
			return "设备不支持";
		}
	},
	/**
	 * 是否启用下拉刷新
	 * @param {Object} isRefresh  boolean
	 */
	setPullRefresh: function(isRefresh) {
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosSetPullRefresh(" + isRefresh + ",");
				return;
			}
			iosSetPullRefresh(isRefresh);
		} else if(isApp && isAndroid) {
			return window.webactivity.setPullRefresh(isRefresh);
		} else {
			return "设备不支持";
		}
	},
	/**
	 * 打开文件预览
	 */
	openFile: function(url) {
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosOpenFile('" + url + "',");
				return;
			}
			iosOpenFile(url);
		} else if(isApp && isAndroid) {
			window.webactivity.openFile(url);
		} else {
			location.href = url;
		}
	},
	/**
	 * 页面打开视频
	 * @param url 页面地址
	 * @param videoUrl 视频地址
	 * @param videoName 视频名称
	 * @param thumbUmgUrl 缩略图
	 */
	openVideo: function(url, videoUrl, videoName, thumbUmgUrl) {
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("iosOpenVideo('" + url + "','" + videoUrl + "','" + videoName + "','" + thumbUmgUrl + "',");
				return;
			}
			iosOpenVideo(url, videoUrl, videoName, thumbUmgUrl);
		} else if(isApp && isAndroid) {
			window.webactivity.openVideo(url, videoUrl, videoName, thumbUmgUrl);
		} else {
			location.href = url;
		}
	},

	/**
	 * 跳转到群组共享文件页面
	 * @returns {string}
	 */
	toGroupFileSharePage: function(groupId) {
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("toGroupFileSharePage('" + groupId + "',");
				return;
			}
			iosToGroupFileSharePage(groupId);
		} else if(isApp && isAndroid) {
			window.webactivity.toGroupFileSharePage(groupId);
		} else {
			console.info("设备不支持");
			return "设备不支持";
		}
	},
	/**
	 * 跳转到消息搜索页面
	 * @returns {string}
	 */
	toMsgSearchPage: function(groupId) {
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("toMsgSearchPage('" + groupId + "',");
				return;
			}
			iosToMsgSearchPage(groupId);
		} else if(isApp && isAndroid) {
			window.webactivity.toMsgSearchPage(groupId);
		} else {
			console.info("设备不支持");
			return "设备不支持";
		}
	},
	/**
	 * 清除当前群组聊天记录
	 * @returns {string}
	 */
	cleanGroupChatMsg: function(groupId) {
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("cleanGroupChatMsg('" + groupId + "',");
				return;
			}
			iosCleanGroupChatMsg(groupId);
		} else if(isApp && isAndroid) {
			window.webactivity.cleanGroupChatMsg(groupId);
		} else {
			console.info("设备不支持");
			return "设备不支持";
		}
	},
	/**
	 * 退出或解散群组聊天后调用此方法
	 * @returns {string}
	 */
	exitGroupChat: function(groupId) {
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("exitGroupChat('" + groupId + "',");
				return;
			}
			iosExitGroupChat(groupId);
		} else if(isApp && isAndroid) {
			window.webactivity.exitGroupChat(groupId);
		} else {
			console.info("设备不支持");
			return "设备不支持";
		}
	},
	// 清除浏览器缓存
	cleanLocalWebCache: function() {
		if(isApp && isIphoneOs) { //IOS
			// ios未实现 未处理
		} else if(isApp && isAndroid) {
			window.webactivity.cleanLocalWebCache();
		} else {
			console.info("设备不支持");
			return "设备不支持";
		}
	},

	sendTodo: function(todojson, success, err) {
		/*var todojson = {
		 "title": "一级标题",
		 "titileTwo": "二级标题",
		 "content": "上班时间=8小时|加班时长=0小时|结算工资=580.00元|工长=张三",
		 "fileCount": "10",
		 "url": "http://www.baidu.com",
		 "colorString": "",
		 "todoViewableMember": "0",
		 "toImId": "42743367794689",
		 "formuserid": "10392",
		 "chatType": "2",
		 "score": "", //评分待办必要参数，设置分数
		 "confirmUrl": "456", //有确认按钮必要参数
		 "refusedUrl": "231", //有拒绝按钮必要参数
		 "todoType": "3"， //1评分待办，生成带有确认按钮待办，生成带有确认拒绝待办，必要参数
		 "relation":"",//标识id
		 "currentRoomImid": "",
		 "setButton": [{
		 "type": 1,//按钮点击类型 1=请求url 2=打开url
		 "name": "",
		 "url": ""
		 }]
		 };*/

		//发送待办

		/*  var xhr = new XMLHttpRequest();
				xhr.open('post', 'http://192.168.0.220/sass_api/send_todo');
				xhr.setRequestHeader("Content-type", "application/json");
				xhr.send(JSON.stringify(todojson));
				xhr.onreadystatechange = function() {

                if(xhr.readyState == 4 && xhr.status == 200) {
                    //					console.log(xhr.responseText);
                    if(JSON.parse(xhr.responseText).code == 200) {
                        window.webactivity.sendTodoMsg(JSON.stringify(JSON.parse(xhr.responseText).result));
                        var modifyJson = JSON.stringify(JSON.parse(xhr.responseText).result);
                        modifyJson.toImId = modifyJson.currentRoomImid;
                        window.webactivity.sendTodoMsg(JSON.stringify(modifyJson));
                        success && success(JSON.parse(xhr.responseText));
                    }

                } else {
                    err && err(JSON.parse(xhr.alertresponseText));
                }
            };*/

		if(isApp && isIphoneOs) { //IOS
			// ios未实现 未处理
		} else if(isApp && isAndroid) {
			var xhr;
			if(window.XMLHttpRequest) {
				xhr = new XMLHttpRequest();
			} else if(window.ActiveXObjext) {
				xhr = new ActiveXObject();
			}

			xhr.open('post', '/sass_api/send_todo');
			xhr.setRequestHeader("Content-type", "application/json");
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4) {
					if(xhr.status == 200) {
						//					console.log(xhr.responseText);
						if(JSON.parse(xhr.responseText).code == 200) {
							var isSendToMyRoom = false;

							var tJson = JSON.parse(xhr.responseText).result;

							if(tJson.toImId.indexOf(",") >= 0) {
								//多个房间的推送
								var toimids = tJson.toImId;
								var toimidArr = toimids.split(",");

								for(var i = 0; i < toimidArr.length; i++) {
									//遍历房间的imid

									var j = JSON.parse(JSON.stringify(tJson));
									j.toImId = toimidArr[i];
									if(j.toImId == j.currentRoomImid) {
										//发送方房间已发
										isSendToMyRoom = true;
									}
									//指定可推送人员的imids
									if(j.hasOwnProperty("pushList") && j.pushList.hasOwnProperty(toimidArr[i])) {
										j.todoViewableType = 2; //限制成部分可看,不给访客查看
										j.todoViewableMember = j.pushList[toimidArr[i]];
									}

									window.webactivity.sendTodoMsg(JSON.stringify(j), j.toImId == j.currentRoomImid);
								}

							} else {
								if(tJson.toImId == tJson.currentRoomImid) {
									//发送方房间已发
									isSendToMyRoom = true;
								}
								//指定可推送人员的imids
								if(tJson.hasOwnProperty("pushList") && tJson.pushList.hasOwnProperty(tJson.toImId)) {
									tJson.todoViewableType = 2; //限制成部分可看,不给访客查看
									tJson.todoViewableMember = tJson.pushList[tJson.toImId];
								}
								//								window.webactivity.sendTodoMsg(JSON.stringify(JSON.parse(xhr.responseText).result), tJson.toImId == tJson.currentRoomImid);
								window.webactivity.sendTodoMsg(JSON.stringify(tJson), tJson.toImId == tJson.currentRoomImid);
							}

							var modifyJson = JSON.parse(JSON.stringify(tJson));
							if(modifyJson.hasOwnProperty("currentRoomImid") && !isSendToMyRoom) {
								//给发送方的房间也发一份
								modifyJson.toImId = modifyJson.currentRoomImid;
								if(modifyJson.hasOwnProperty("pushList") && modifyJson.pushList.hasOwnProperty(modifyJson.toImId)) {
									modifyJson.todoViewableType = 2; //限制成部分可看,不给访客查看
									modifyJson.todoViewableMember = modifyJson.pushList[modifyJson.toImId];
								}

								window.webactivity.sendTodoMsg(JSON.stringify(modifyJson), true);
							}

							success && success(JSON.parse(xhr.responseText));
						}

					} else {
						err && err(JSON.parse(xhr.responseText));
					}

				}

			};

			xhr.send(JSON.stringify(todojson));

		} else {
			console.info("设备不支持");
			return "设备不支持";
		}

	},
	openProjectContactSelectPage: function(projectSn, title, beforeSelectId, selectType, isMultipe, isShowMe) {
		/**
	* 选择项目联系人  公司
 	* @param projectSn  项目SN
    * @param title  选择页面的标题,如果为空,会根据selectType 设置默认标题
	* @param beforeSelectId 之前选择的数据id, 用,隔开, 数据id的值= 用户:userId, 房间&公司:roomId
    * @param selectType     选择类型:  1=用户 2=房间 3=公司 默认=1
    * @param isMultipe      是否多选,默认多选

	 */
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("openProjectContactSelectPage('" + projectSn + "','" + title + "','" + beforeSelectId + "','" + selectType + "','" + isMultipe + "','" + isShowMe + "',");
				return;
			}
			openProjectContactSelectPage(projectSn, title, beforeSelectId, selectType, isMultipe, isShowMe);
		} else if(isApp && isAndroid) {
			window.webactivity.openProjectContactSelectPage(projectSn, title, beforeSelectId, selectType, isMultipe, isShowMe);
		}
	},
	/**
	 * 查看所有参与方
	 * @param pr
	 * ojectSn 项目SN
	 * @param projectName 项目名称
	 * @returns {string}
	 */
	openProjectContact: function(projectSn, projectName) {
		if(isApp && isIphoneOs) { //IOS
			if(!isTop) {
				this.callFilter("openProjectContact('" + projectSn + "','" + projectName + "'");
				return;
			}
			iosOpenProjectContact(projectSn, projectName);
		} else if(isApp && isAndroid) {
			window.webactivity.openProjectContact(projectSn, projectName);
		} else {
			console.info("设备不支持");
			return "设备不支持";
		}
	},
	imgPreview: {
		CONS: {
			MAIN: 1 // 主流的图片预览
		},
		init: function() {
			// 如果不在App打开，适配H5的大图预览功能，仅此一段搞定
			if(!isApp) {
				Base.getScript("/static/js/photo/photoSwipe.js");
			}
		},
		/**
		 * 图片预览
		 * @param {Object} index 当前点击图片的下标
		 * @param {Object} imgsData 图片路径集合
		 * @param {Object} type 风格默认为1,可以不传，如果要传一定要用常量
		 * @param 原生参数  结构如下  
		 *  {
		 *		"index": 1, // 当前点击图片的下标
		 *		"data": [], // 数据，type=1时["http://a.png", "http://b.png"] 
		 *		"type": 1,   // 风格，1为主流的大图预览，比如微信
		 *		"ext": {} // 扩展内容，动画效果/其他属性等等
		 *	}
		 */
		open: function(index, imgsData, type, ext) {
			var _self = this;
			var jsonStr = JSON.stringify({
				"index": index,
				"data": imgsData,
				"type": type ? type : _self.CONS.MAIN
			});
			if(isApp && isIphoneOs) { //IOS
				if(!isTop) {
					this.callFilter("iosOpenPicturePreview('" + jsonStr + "',");
					return;
				}
				iosOpenPicturePreview(jsonStr);
			} else if(isApp && isAndroid) {
				window.webactivity.openPicturePreview(jsonStr);
			} else {
				pswipe.openImgView(index, imgsData);
			}
		}
	},
    /**
     * 获取缓存
     * @returns {*}
     */
    getAppCacheSize:function () {
        if(isApp && isIphoneOs) { //IOS
            return iosGetAppCacheSize();
        } else if(isApp && isAndroid) {
            return window.webactivity.getAppCacheSize();
        } else {
            console.info("设备不支持");
            return "设备不支持";
        }
    },
    /**
     * 清空缓存
     */
    clearAppCache:function () {
        if(isApp && isIphoneOs) { //IOS
            iosClearAppCache();
        } else if(isApp && isAndroid) {
            window.webactivity.clearAppCache();
        } else {
            console.info("设备不支持");
            return;
        }
    }
}

String.prototype.startWith = function(str) {
	var reg = new RegExp("^" + str);
	return reg.test(this);
}

/**
 * 自定义返回事件
 */
var onClickBack = function() {
	appApi.callBackFun();
}

/**
 *  《弃用》
 * 环信登录结果回调
 * @param result  登录结果  true or false
 *
 */
var setLoginHXChat = function(result, iosIfrObjStrT) {
	// if (typeof appApi.callBackFun == "function") {
	//     var CONTENT = {};
	//     CONTENT.result = result;
	//     appApi.callBackFun(appApi.callBackFlag.HX_LOGIN, CONTENT);
	// }
	// console(result);
	var CONTENT = {};
	CONTENT.result = result;
	if(iosIfrObjStrT) {
		if(typeof eval(iosIfrObjStrT).appApi.callBackFun == "function") {
			eval(iosIfrObjStrT).appApi.callBackFun(appApi.callBackFlag.HX_LOGIN, CONTENT);
		}
	} else {
		if(typeof appApi.callBackFun == "function") {
			appApi.callBackFun(appApi.callBackFlag.HX_LOGIN, CONTENT);
		}
	}
}

/**
 * 获取设备信息回调
 * @param result  结果 json
 */
var setDeviceInfoResult = function(result, iosIfrObjStrT) {
	// if (typeof appApi.callBackFun == "function") {
	if(iosIfrObjStrT) {
		// window.top.frames[0].window.appApi.callBackFun(appApi.callBackFlag.DEVICE_INFO, result);
		if(typeof eval(iosIfrObjStrT).appApi.callBackFun == "function") {
			eval(iosIfrObjStrT).appApi.callBackFun(appApi.callBackFlag.DEVICE_INFO, result);
		}
	} else {
		if(typeof appApi.callBackFun == "function") {
			appApi.callBackFun(appApi.callBackFlag.DEVICE_INFO, result);
		}
	}

	// }
	console(result);
}

/**
 * 获取用户信息回调
 * @param result  结果 json
 */
var setUserInfoResult = function(result, iosIfrObjStrT) {
	// if (typeof appApi.callBackFun == "function") {
	//     var CONTENT = {};
	//     CONTENT.result = result;
	//     appApi.callBackFun(appApi.callBackFlag.USER_INFO, CONTENT);
	// }
	// console(result);
	// result = {"bigUserIcon":"http","imId":"1629481698541738189","imPwd":"123456","nickname":"张梦云","phoneNum":"15356105789","userCode":"10192","userIcon":"http","gender":0,"invUserId":1,"uType":1,"userId":10192,"vType":0};

	if(iosIfrObjStrT) {
		if(typeof eval(iosIfrObjStrT).appApi.callBackFun == "function") {
			eval(iosIfrObjStrT).appApi.callBackFun(appApi.callBackFlag.USER_INFO, result);
		}
	} else {
		if(typeof appApi.callBackFun == "function") {
			appApi.callBackFun(appApi.callBackFlag.USER_INFO, result);
		}
	}
}
/**
 * 获取版本信息回调
 * @param result  结果 字符串VersionName=当前版本号&VersionCode=当前build值
 */
var setVersionInfoResult = function(result, iosIfrObjStrT) {
	var CONTENT = {};
	CONTENT.result = result;
	if(iosIfrObjStrT) {
		if(typeof eval(iosIfrObjStrT).appApi.callBackFun == "function") {
			eval(iosIfrObjStrT).appApi.callBackFun(appApi.callBackFlag.VERSION, CONTENT);
		}
	} else {
		if(typeof appApi.callBackFun == "function") {
			appApi.callBackFun(appApi.callBackFlag.VERSION, CONTENT);
		}
	}
}

//获取公司回调

var setProjectContactSelectResult = function(result, iosIfrObjStrT) {
	var CONTENT = {};
	CONTENT.result = result;
	if(iosIfrObjStrT) {
		if(typeof eval(iosIfrObjStrT).appApi.callBackFun == "function") {
			eval(iosIfrObjStrT).appApi.callBackFun(appApi.callBackFlag.GONGSI, CONTENT);
		}
	} else {
		if(typeof appApi.callBackFun == "function") {
			appApi.callBackFun(appApi.callBackFlag.GONGSI, CONTENT);
		}
	}
}

/**
 * 获取剪切板信息
 * 
 * @param text
 */
var setTextFromClipResult = function(result, iosIfrObjStrT) {
	// if (typeof appApi.callBackFun == "function") {
	//     var CONTENT = {};
	//     CONTENT.longaddress = address;
	//     CONTENT.latitudeAndLongitude = latitudeAndLongitude;
	//     CONTENT.shortAddress = shortAddress;
	//     appApi.callBackFun(appApi.callBackFlag.LOCATION, CONTENT);
	//
	// }
	// console(address, latitudeAndLongitude);

	var CONTENT = {};
	CONTENT.result = result;
	if(iosIfrObjStrT) {
		if(typeof eval(iosIfrObjStrT).appApi.callBackFun == "function") {
			eval(iosIfrObjStrT).appApi.callBackFun(appApi.callBackFlag.CNTEXT, CONTENT);
		}
	} else {
		if(typeof appApi.callBackFun == "function") {
			appApi.callBackFun(appApi.callBackFlag.CNTEXT, CONTENT);
		}
	}

}

/**
 * 获取地理位置回调
 * @param address
 * @param latitudeAndLongitude
 */
var setLocationResult = function(address, latitudeAndLongitude, shortAddress, iosIfrObjStrT) {

	// if (typeof appApi.callBackFun == "function") {
	//     var CONTENT = {};
	//     CONTENT.longaddress = address;
	//     CONTENT.latitudeAndLongitude = latitudeAndLongitude;
	//     CONTENT.shortAddress = shortAddress;
	//     appApi.callBackFun(appApi.callBackFlag.LOCATION, CONTENT);
	//
	// }
	// console(address, latitudeAndLongitude);

	var CONTENT = {};
	CONTENT.longaddress = address;
	CONTENT.latitudeAndLongitude = latitudeAndLongitude;
	CONTENT.shortAddress = shortAddress;
	if(iosIfrObjStrT) {
		if(typeof eval(iosIfrObjStrT).appApi.callBackFun == "function") {
			eval(iosIfrObjStrT).appApi.callBackFun(appApi.callBackFlag.LOCATION, CONTENT);
		}
	} else {
		if(typeof appApi.callBackFun == "function") {
			appApi.callBackFun(appApi.callBackFlag.LOCATION, CONTENT);
		}
	}

}

/**
 * 获取通讯录信息回调
 * @param result 姓名=电话，以,隔开 示例：  张三=15355558888,李四=13897979797
 */
var setContactsResult = function(result, iosIfrObjStrT) {
	// if (typeof appApi.callBackFun == "function") {
	//     var CONTENT = {};
	//     CONTENT.result = result;
	//     appApi.callBackFun(appApi.callBackFlag.CONTACTS, CONTENT);
	// }

	var CONTENT = {};
	CONTENT.result = result;
	if(iosIfrObjStrT) {
		if(typeof eval(iosIfrObjStrT).appApi.callBackFun == "function") {
			eval(iosIfrObjStrT).appApi.callBackFun(appApi.callBackFlag.CONTACTS, CONTENT);
		}
	} else {

		if(typeof appApi.callBackFun == "function") {
			appApi.callBackFun(appApi.callBackFlag.CONTACTS, CONTENT);
		}
	}
}

/**
 *QQ 微信登录结果返回 授权信息
 * @param {Object} result json
 */
var setQQWXLoginResult = function(result, iosIfrObjStrT) {
	// if (typeof appApi.callBackFun == "function") {
	//     var CONTENT = {};
	//     CONTENT.result = result;
	//     appApi.callBackFun(appApi.callBackFlag.QQ_WX_LOGIN, CONTENT);
	// }

	var CONTENT = {};
	CONTENT.result = result;
	if(iosIfrObjStrT) {
		if(typeof eval(iosIfrObjStrT).appApi.callBackFun == "function") {
			eval(iosIfrObjStrT).appApi.callBackFun(appApi.callBackFlag.QQ_WX_LOGIN, CONTENT);
		}
	} else {
		if(typeof appApi.callBackFun == "function") {
			appApi.callBackFun(appApi.callBackFlag.QQ_WX_LOGIN, CONTENT);
		}
	}
	console(result);
}

/**
 * 分享回调
 * @param channel_id 推送用的channel_id
 * @param share_channel  分享渠道
 * @param share_url  分享的链接
 */
//var shareResult = function (channel_id, share_channel, share_url) {
//  if (typeof appApi.callBackFun == "function") {
//      var CONTENT = {};
//      CONTENT.channel_id = channel_id;
//      CONTENT.share_channel = share_channel;
//      CONTENT.share_url = share_url;
//      appApi.callBackFun(appApi.callBackFlag.SHARE, CONTENT);
//  }
//  console(channel_id + "," + share_channel + "," + share_url);
//}
/**
 * 接收扫一扫返回链接
 * @param str
 */
var getQRCodeResult = function(str) {
	window.location.href = str;
}
/**
 * 接收处理IOS返回的mac信息
 * @param deviceMac
 */
//var getDeviceMacResult = function (deviceMac) {
//  if (typeof appApi.callBackFun == "function") {
//      appApi.callBackFun();
//  }
//  console(deviceMac);
//}
/**
 * 接收返回的手机号码
 */
//var getPhoneNumberResult = function (phoneNumber) {
//  if (typeof appApi.callBackFun == "function") {
//      appApi.callBackFun();
//  }
//  console(phoneNumber);
//}

// 废弃代码
// function loadURL(url) {
//     var iFrame;
//     iFrame = document.createElement("iframe");
//     iFrame.setAttribute("src", url);
//     iFrame.setAttribute("style", "display:none;");
//     iFrame.setAttribute("height", "0px");
//     iFrame.setAttribute("width", "0px");
//     iFrame.setAttribute("frameborder", "0");
//     document.body.appendChild(iFrame);
//     // 发起请求后这个iFrame就没用了，所以把它从dom上移除掉
//     iFrame.parentNode.removeChild(iFrame);
//     iFrame = null;
//
/**
 * 上传回调
 * @param id 文件夹id
 * @param isSys 是否为标准目录
 */
var uploadTarget = function(id, isSys) {}