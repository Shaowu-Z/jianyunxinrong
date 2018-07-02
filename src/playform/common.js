import setting from './config';
import  './appApi.js'
var BackCookie = {
    // 设置cookie
    setCookie: function (name, value, isEscape) {
        var cval = this.getCookie(name);
        //	if(cval==null){
        var hour = 4;
        var exp = new Date();  
        exp.setTime(exp.getTime() + hour * 60 * 60 * 1000);
        if (isEscape == 1) {
            document.cookie = name + "=" + value + ";expires=" + exp.toGMTString();
        } else if (isEscape == 2) {
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + "; path=/";
        } else {
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
        }
        //}
    },
    // 删除cookie
    delCookie: function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(name);
        if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    },
    // 获取cookie
    getCookie: function (name, isEscape) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) {
            if (isEscape == 1) {
                return arr[2];
            } else {
                return unescape(arr[2]);
            }
        }
        return null;
    },
    setPageReferrer: function () {
        var path = window.location.pathname;
        path = path.substring(path.lastIndexOf('/') + 1, path.length);
        var referrer = this.getReferrer();
        this.setCookie(path, referrer);
    },
    getPageReferrer: function () {
        var path = window.location.pathname;
        path = path.substring(path.lastIndexOf('/') + 1, path.length);
        var referrer = this.getCookie(path);
        if (referrer != null) {
            this.delCookie(path);
        }
        return referrer;
    },
    getReferrer: function () {
        var referrer = document.referrer;
        if (!referrer) {
            try {
                if (window.opener) {
                    referrer = window.opener.location.href;
                }
            } catch (e) {
            }
        }
        return referrer;
    }

}

var cmApi = {
    params: {
        is_load_weixin_share_css: false,
        codeLength: 4 // 默认验证码位数
    },
    init: function () {
        //this.muiClickEvent();
    },
    message: function (msg, time, shade) {
        var t = 2;
        if (shade == undefined) {
            shade = true;
        }
        if (time) {
            t = time;
        }
        layer.open({
            content: msg,
            style: 'background-color:rgba(0,0,0,.8); color:#f2f2f2; border:none;padding: .5rem 1.5rem;',
            time: t,
            shade: shade
        });
    },
    go: function (url) {
        cmApi.loading.show.single();
        if (url) {
            location.href = url;
        } else {
            setTimeout(function () {
                cmApi.loading.hide();
            }, 1000)
        }
    },
    dateFormat: function (value) {
        var date = new Date(value);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var h = date.getHours();
        var i = date.getMinutes();
        var s = date.getSeconds();
        if (m < 10) {
            m = '0' + m;
        }
        if (d < 10) {
            d = '0' + d;
        }
        if (h < 10) {
            h = '0' + h;
        }
        if (i < 10) {
            i = '0' + i;
        }
        if (s < 10) {
            s = '0' + s;
        }
        //<!-- 获取时间格式 2017-01-03 10:13:48 -->
        // var t = Y+'-'+m+'-'+d+' '+H+':'+i+':'+s;
        //<!-- 获取时间格式 2017-01-03 -->
        var t = y + '-' + m + '-' + d;
        return t;
    },
    timeFormat: function (value) {
        var date = new Date(value);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var h = date.getHours();
        var i = date.getMinutes();
        var s = date.getSeconds();
        if (m < 10) {
            m = '0' + m;
        }
        if (d < 10) {
            d = '0' + d;
        }
        if (h < 10) {
            h = '0' + h;
        }
        if (i < 10) {
            i = '0' + i;
        }
        if (s < 10) {
            s = '0' + s;
        }
        //<!-- 获取时间格式 2017-01-03 10:13:48 -->
        var t = y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s;
        return t;
    },
    muiClickEvent: function () {
        if (typeof mui === 'function') {
            mui("body").on("tap", "a", function (e) {
                var href = this.attributes.getNamedItem("data-href");
                var webview = this.attributes.getNamedItem("data-webview");
                if (href) {
                    var url = href.nodeValue;
                    mui.openWindow({
                        url: url,
                        show: {
                            autoShow: true
                        }
                    });
                } else if (webview) {
                    var url = webview.nodeValue;
                    if (url.indexOf("http") == -1) {
                        url = setting.getUrl() + url;
                    }
                    appApi.openNewWindow(url);
                }
            });
        }
    },
    ajax_fun: function (o) {
        if (!o.type) {
            o.type = 'get';
        }
        if (!o.async) {
            o.async = true;
        }
        $.ajax({
            url: o.path,
            data: o.params,
            type: o.type,
            async: o.async,
            dataType: 'json',
            success: function (result) {
                o.fun(result);
            }
        });
    },
    ajax_return: function (o) {
        if (!o.type) {
            o.type = 'get';
        }
        $.ajax({
            url: o.path,
            data: o.params,
            type: o.type,
            async: false,
            dataType: 'json',
            success: function (result) {
                return result;
            }
        });
    },
    browserRedirect: function () {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (bIsIpad || bIsIphoneOs) {
            return "iphone";
        } else if (bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            return "android";
        } else {
            return "pc";
        }
    },
    // 客服
    service: function () {
        (function (m, ei, q, i, a, j, s) {
            m[i] = m[i] || function () {
                    (m[i].a = m[i].a || []).push(arguments)
                };
            j = ei.createElement(q),
                s = ei.getElementsByTagName(q)[0];
            j.async = true;
            j.charset = 'UTF-8';
            j.src = '//static.meiqia.com/dist/meiqia.js';
            s.parentNode.insertBefore(j, s);
        })(window, document, 'script', '_MEIQIA');
        _MEIQIA('entId', 46257);
    },
    backFun_bak: function () {
        $(".btn-referrer").on("touchend", function (event) {
            event.preventDefault();
            var href_ = $(this).attr("href");
            if (href_.indexOf("http") >= 0 || href_.indexOf("javascript:history") >= 0) {
                window.location.href = href_;
                return;
            }
            var referrer = document.referrer;
            if (!referrer) {
                try {
                    if (window.opener) {
                        referrer = window.opener.location.href;
                        return;
                    }
                } catch (e) {
                }
            }
            var cookieReferr = BackCookie.getPageReferrer();
            console.log("cookieReferr=" + cookieReferr);
            if (cookieReferr == null) {
                window.location.href = referrer;
            } else {
                $(".btn-referrer").attr("href", cookieReferr);
                window.location.href = cookieReferr;
            }
        });
    },
    // 导航
    navclick: function (type) {
        $(".nav .index a img").attr("src", "../../resources/images/overseas/icoFooter/icon-index.png");
        $(".nav li a p").css("color", "#A3A3A3");
        $(".nav .store a img").attr("src", "../../resources/images/overseas/icoFooter/icon-store.png");
        $(".nav .classfication a img").attr("src", "../../resources/images/overseas/icoFooter/icon-classfication.png");
        $(".nav .shoppingcart a img").attr("src", "../../resources/images/overseas/icoFooter/icon-shoppingcart.png");
        $(".nav .mycenter a img").attr("src", "../../resources/images/overseas/icoFooter/icon-mycenter.png");
        $(".nav ." + type).find("a img").attr("src", "../../resources/images/overseas/icoFooter/icon-" + type + "-active.png");
        $(".nav ." + type).find("a p").css("color", "#FF5F62");
    },
    gotop: function () {
        $(".rt_top").on("click", function () {
            $("html,body").animate({
                scrollTop: 0
            }, 600);
        });
        $(window).scroll(function () {
            var scrollTop = $(this).scrollTop(); //滚动条距离顶部的高度
            var scrollHeight = $(document).height(); //当前页面的总高度
            var windowHeight = $(this).height(); //当前可视的页面高度
            if (scrollTop > 700) {
                $(".rt_top").css("display", "block");
            }
            if (scrollTop == 0) {
                $(".rt_top").css("display", "none");
            }

        });
    },
    /**
     * option:{msg:提示语，不设默认,time关闭时间，不设不关闭}
     */
    loading: {
        show: {
            showHandle: function (style, o) {
                var loading = $("#" + style);
                if (loading && loading.length > 0) {
                    this.beginShow(loading, o);
                } else {
                    loading = cmApi.loading.init(style);
                    this.beginShow(loading, o);
                }
            },
            beginShow: function (loading, o) {
                if (o && o.msg) {
                    $(".cus_load_close .cus_load_text").text(o.msg);
                }
                loading.show();
                if (o && o.time > 0) {
                    setTimeout(function () {
                        loading.hide();
                    }, o.time);
                }
            },
            // 默认
            default: function (o) {
                this.showHandle("cus_load_default", o);
            },
            // 没有遮罩框住显示正在加载...
            noShade: function (o) {
                this.showHandle("cus_load_noShade", o);
            },
            // 微信分享提示
            wxShare: function (o) {
                var self = this;
                if (!cmApi.params.is_load_weixin_share_css) {
                    Base.getStyle(web_path + "/resources/style/buyer/nativeShare.css", function d() {
                    });
                    setTimeout(function () {
                        cmApi.params.is_load_weixin_share_css = true;
                        self.showHandle("cus_load_wxShare", o);
                    }, 200);
                } else {
                    self.showHandle("cus_load_wxShare", o);
                }
            },
            // 有遮罩，简单只显示文字
            single: function (options) {
                this.showHandle("cus_load_single", options);
            }
        },
        hide: function () {
            $(".cus_load_close").hide();
        },
        init: function (style) {
            var d;
            if (style == "cus_load_default") {
                d =
                    '<div id="cus_load_default" class="cus_load_close rblc_loading" style="display: none;">' +
                    '     <div class="cui-grayload-text">' +
                    '	  <div class="cui-i cui-w-loading"></div>' +
                    '	  <div class="cui-i cui-m-logo"></div>' +
                    '	  <div class="cui-grayload-bfont cus_load_text">加载中…</div>' +
                    '    </div>' +
                    '</div>	';
            } else if (style == "cus_load_noShade") {
                d =
                    "<div id='cus_load_noShade' class='cus_load_close' style='position: absolute;top: 0;right: 0;bottom: 0;left: 0;z-index: 999990;display: none'>" +
                    "<div style='position: fixed;width: 95px;height: 95px;top: 0;right: 0;bottom: 0;left: 0;margin: auto;color: #fff;text-align: center;  background: rgba(0, 0, 0, 0.55);border-radius:5px'>" +
                    "  <img src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSJ3aGl0ZSI+CiAgPGNpcmNsZSB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4IDApIiBjeD0iMCIgY3k9IjE2IiByPSIwIj4gCiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjA7IDQ7IDA7IDAiIGR1cj0iMS4ycyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwIgogICAgICBrZXl0aW1lcz0iMDswLjI7MC43OzEiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC42IDAuNCAwLjg7MC4yIDAuNiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiAvPgogIDwvY2lyY2xlPgogIDxjaXJjbGUgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYgMCkiIGN4PSIwIiBjeT0iMTYiIHI9IjAiPiAKICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iMDsgNDsgMDsgMCIgZHVyPSIxLjJzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgYmVnaW49IjAuMyIKICAgICAga2V5dGltZXM9IjA7MC4yOzAuNzsxIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuNiAwLjQgMC44OzAuMiAwLjYgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI0IDApIiBjeD0iMCIgY3k9IjE2IiByPSIwIj4gCiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjA7IDQ7IDA7IDAiIGR1cj0iMS4ycyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwLjYiCiAgICAgIGtleXRpbWVzPSIwOzAuMjswLjc7MSIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjYgMC40IDAuODswLjIgMC42IDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIC8+CiAgPC9jaXJjbGU+Cjwvc3ZnPgo=' style='width: 54px!important;display:inline!important' />" +
                    "  <div class='cus_load_text' style='font: 16px/2 NotoSansHans-Regular,AvenirNext-Regular,'proxima-nova','Hiragino Sans GB','Microsoft YaHei','WenQuanYi Micro Hei','Open Sans','Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight: lighter;'>正在加载...</div>          " +
                    "</div>" +
                    "</div>";
                // 微信分享提示
            } else if (style == "cus_load_wxShare") {
                d =
                    '<div id="cus_load_wxShare" class="cus_load_close ShareTips" style="display: none">' +
                    '	<div class="ShareTips-mask"></div>' +
                    '	<div class="ShareTips-txt">' +
                    '	   <img src="' + web_path + '/resources/images/icon/txt-share.png">' +
                    '	</div>' +
                    '	<div class="ShareTips-finger">' +
                    '	   <img src="' + web_path + '/resources/images/icon/finger.png">' +
                    '	</div>' +
                    '	<div class="sharetips-know">' +
                    '	   <img src="' + web_path + '/resources/images/icon/tex-know.png">' +
                    '	</div>' +
                    '	<div class="sharetips-line">' +
                    '	   <img src="' + web_path + '/resources/images/icon/img_line.png">' +
                    '	</div>' +
                    '</div>';
                $("body").append(d);
                var loading = $("#" + style);
                $(".sharetips-know,.ShareTips-mask").on("click", function () {
                    loading.hide();
                })
                return loading;
            } else if (style == "cus_load_single") {
                d =
                    '<div id="cus_load_single" class="cus_load_close" style="position: fixed;top: 0;right: 0;bottom: 0;left: 0;background-color: rgba(0,0,0,.5);z-index: 999990;display: none" >' +
                    '	<div style="position: absolute;width: 150px;height: 105px;top: 0;right: 0;bottom: 0;left: 0;margin: auto;color: #fff;text-align: center;">' +
                    '	  <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSJ3aGl0ZSI+CiAgPGNpcmNsZSB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4IDApIiBjeD0iMCIgY3k9IjE2IiByPSIwIj4gCiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjA7IDQ7IDA7IDAiIGR1cj0iMS4ycyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwIgogICAgICBrZXl0aW1lcz0iMDswLjI7MC43OzEiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC42IDAuNCAwLjg7MC4yIDAuNiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiAvPgogIDwvY2lyY2xlPgogIDxjaXJjbGUgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYgMCkiIGN4PSIwIiBjeT0iMTYiIHI9IjAiPiAKICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iMDsgNDsgMDsgMCIgZHVyPSIxLjJzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgYmVnaW49IjAuMyIKICAgICAga2V5dGltZXM9IjA7MC4yOzAuNzsxIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuNiAwLjQgMC44OzAuMiAwLjYgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI0IDApIiBjeD0iMCIgY3k9IjE2IiByPSIwIj4gCiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjA7IDQ7IDA7IDAiIGR1cj0iMS4ycyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwLjYiCiAgICAgIGtleXRpbWVzPSIwOzAuMjswLjc7MSIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjYgMC40IDAuODswLjIgMC42IDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIC8+CiAgPC9jaXJjbGU+Cjwvc3ZnPgo=" style="width: 64px!important;display: inline!important;"/>' +
                    '	  <div class="cus_load_text" style=\'font: 16px/2 NotoSansHans-Regular,AvenirNext-Regular,"proxima-nova","Hiragino Sans GB","Microsoft YaHei","WenQuanYi Micro Hei","Open Sans","Helvetica Neue",Arial,sans-serif;font-size:16px;font-weight: lighter;\'>' +
                    '	    正在保存地址' +
                    '	  </div>' +
                    '	</div>' +
                    '</div>';
            }
            $("body").append(d);
            return $("#" + style);
        }
    },
    newWindow: {
        show: function (id) {
            var ele = document.getElementById(id);
            if (ele.className.match(new RegExp("(\\s|^)ui_slide_out(\\s|$)"))) {
                var reg = new RegExp("(\\s|^)ui_slide_out(\\s|$)");
                ele.className = ele.className.replace(reg, " ");
            }
            if (!ele.className.match(new RegExp("(\\s|^)ui_slide_in(\\s|$)"))) ele.className += " " + "ui_slide_in";
        },
        hide: function (id) {
            var ele = document.getElementById(id);
            if (ele.className.match(new RegExp("(\\s|^)ui_slide_in(\\s|$)"))) {
                var reg = new RegExp("(\\s|^)ui_slide_in(\\s|$)");
                ele.className = ele.className.replace(reg, " ");
            }
            if (!ele.className.match(new RegExp("(\\s|^)ui_slide_out(\\s|$)"))) ele.className += " " + "ui_slide_out";
        }
    },
    isWeiXin: function () {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    },
    // 清除cookie
    clearCookie: function () {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--;)
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        } else {

        }
    },
    // 动态资源加载过滤器
    resFilter: function (res) {
        if (res == "echarts") {
            if (!(typeof echarts === "object")) {
                Base.loadScript({
                    "url": "https://cdn.bootcss.com/echarts/3.7.2/echarts.common.min.js",
                    "async": false
                });
                Base.loadScript({
                    "url": "/static/webstatic/work/js/columnTools.js",
                    "async": false
                });
                Base.loadScript({
                    "url": "/static/webstatic/work/js/echarts.js",
                    "async": false
                });
            }
        } else if (res == "projectMember" || res == "Company" || res == "Supplier") {
            if (typeof _columnProjectMember === 'undefined' && res == "projectMember") {
                Base.loadScript({
                    "url": "/static/webstatic/work/js/columns/columnProjectMember.js",
                    "async": false
                });
            }
            if (typeof _columnSupplier === 'undefined' && res == "Supplier") {
                Base.loadScript({
                    "url": "/static/webstatic/work/js/columns/columnSupplier.js",
                    "async": false
                });
            }
            if (typeof _columnCompany === 'undefined' && res == "Company") {
                Base.loadScript({
                    "url": "/static/webstatic/work/js/columns/columnCompany.js",
                    "async": false
                });
            }
            if (typeof myEcharts === 'undefined') {
                Base.loadScript({
                    "url": "/static/webstatic/work/js/columnTools.js",
                    "async": false
                });
                Base.loadScript({
                    "url": "/static/webstatic/work/js/echarts.js",
                    "async": false
                });
            }
        } else if (res == "vue") {
            if (typeof Vue === 'undefined') {
                Base.loadScript({
                    "url": "https://cdn.bootcss.com/vue/2.4.4/vue.min.js",
                    "async": false
                });
            }
        } else if (res == "axios") {
            if (typeof axios === 'undefined') {
                Base.loadScript({
                    "url": "https://cdn.bootcss.com/axios/0.16.2/axios.min.js",
                    "async": false
                });
            }
        }
    },
    // 客服接入
    customerInit: function () {
        (function (m, ei, q, i, a, j, s) {
            m[i] = m[i] || function () {
                    (m[i].a = m[i].a || []).push(arguments)
                };
            j = ei.createElement(q),
                s = ei.getElementsByTagName(q)[0];
            j.async = true;
            j.charset = 'UTF-8';
            j.src = 'https://static.meiqia.com/dist/meiqia.js?_=t';
            s.parentNode.insertBefore(j, s);
        })(window, document, 'script', '_MEIQIA');
        _MEIQIA('entId', 87632);
        _MEIQIA('withoutBtn');
    },
    //打开聊天界面
    customerOpen: function () {
        _MEIQIA('showPanel');
    }

	


}
//你的未读消息
function yourFunction(msg) {
    var text = '',
        num = 0;
    if (msg === 'hasBeenRead') { // 消息已被阅读
        num = 0;
        document.getElementById('unreadNum').style.display = "none";
    } else if (typeof(msg) === 'object') {
        document.getElementById('unreadNum').style.display = "block";
        var unreadNum = document.getElementById('unreadNum').innerHTML,
            lastMsg = msg[msg.length - 1];
        num = isNaN(+unreadNum) ? msg.length : +unreadNum + msg.length;
    }
    // 未读消息数量
    document.getElementById('unreadNum').innerHTML = num;
}


var validator = {
    Test: function (v, r) {
        if (v.trim().length == 0 && undefined == r) {
            return true;
        } else if (r) {
            //正则表达验证
            if (r && !r.test(v)) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    },
    Match: function (v, r) {
        if (v && !this.Test(v)) {
            if (null == v.match(r)) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    },
    IsNull: function (v) {
        //判断输入内容是否为空
        return this.Test(v);
    },
    IsDate: function (v) {
        //判断日期类型是否为YYYY-MM-DD格式的类型
        var r = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
        return this.Match(v, r);

    },
    IsDateTime: function (v) {
        //判断日期类型是否为YYYY-MM-DD hh:mm:ss格式的类型
        var r = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
        return this.Match(v, r);
    },
    IsTime: function (v) {
        //判断日期类型是否为hh:mm:ss格式的类型
        var r = /^((20|21|22|23|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/
        return this.Test(v, r);
    },
    IsLetter: function (v) {
        //判断输入的字符是否为英文字母
        var r = /^[a-zA-Z]+$/;
        return this.Test(v, r);
    },
    IsInteger: function (v) {
        //判断输入的字符是否为整数
        var r = /^[-+]?\d*$/;
        return this.Test(v, r);
    },
    IsDouble: function (v) {
        //判断输入的字符是否为双精度
        var r = /^[-\+]?\d+(\.\d+)?$/;
        return this.Test(v, r);
    },
    IsCount: function (v) {
        //判断个数
        var r = /^\d*\.{0,1}\d{0,2}$/;
        return this.Test(v, r);
    },
    IsMoney: function (v) {
        //判断个数
        var r = /^\d*\.{0,1}\d{0,2}$/;
        return this.Test(v, r);
    },
    IsString: function (v) {
        //判断输入的字符是否为:a-z,A-Z,0-9
        var r = /^[a-zA-Z0-9_]+$/;
        return this.Test(v, r);
    },
    IsChinese: function (v) {
        //判断输入的字符是否为中文
        var r = /^[\u0391-\uFFE5]+$/;
        return this.Test(v, r);
    },
    IsEmail: function (v) {
        //判断输入的EMAIL格式是否正确
        var r = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        return this.Test(v, r);
    },
    IsZIP: function (v) {
        //判断输入的邮编(只能为六位)是否正确
        var r = /^\d{6}$/;
        return this.Test(v, r);
    },
    IsMobile: function (v) {
        //判断输入的手机号码是否正确
        var r = /^((\(\d{2,3}\))|(\d{3}\-))?13\d{9}$/;
        return this.Test(v, r);
    },
    IsIdCard: function (v) {
        //判断输入的身份证号码是否正确
        var r = /^\d{15}(\d{2}[A-Za-z0-9])?$/;
        return this.Test(v, r);
    },
    IsQQ: function (v) {
        //判断输入的qq号码是否正确
        var r = /^[1-9]\d{4,8}$/;
        return this.Test(v, r);
    },
    IsUserName: function (v) {
        //判断输入的用户名是否正确
        var r = /^[a-zA-Z0-9_]{3,16}$/;
        return this.Test(v, r);
    },
    IsTrueName: function (v) {
        var r = /^([\u4e00-\u9fa5]+|([a-zA-Z]+\s?)+)$/
        return this.Test(v, r);
    },
    IsStoreName: function (v) {
        var r = /^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/
        return this.Test(v, r);
    },
    IsPassword: function (v) {
        //判断输入的密码是否正确
        var r = /^[a-zA-Z0-9]{6,16}$/;
        return this.Test(v, r);
    }
}

/*加载js,css*/
var Base = {
    head: document.getElementsByTagName("head")[0] || document.documentElement,
    Myload: function (B, A) {
        this.done = false;
        B.onload = B.onreadystatechange = function () {
            if (!this.done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                this.done = true;
                A();
                B.onload = B.onreadystatechange = null;
                if (this.head && B.parentNode) {
                    this.head.removeChild(B)
                }
            }
        }
    },
    // 异步有回调    A=url    C=success回调函数
    getScript: function (A, C) {
        var B = function () {
        };
        if (C != undefined) {
            B = C
        }
        var D = document.createElement("script");
        D.setAttribute("language", "javascript");
        D.setAttribute("type", "text/javascript");
        D.setAttribute("src", A);
        this.head.appendChild(D);
        this.Myload(D, B)
    },
    // 可同步 可异步 有回调 A=id,async,url      B=success回调      C=error回调
    loadScript: function (A, B, C) {
        var xmlHttp = null;
        var D = function () {
            //4代表数据发送完毕
            if (xmlHttp.readyState == 4) {
                //0为访问的本地，200到300代表访问服务器成功，304代表没做修改访问的是缓存
                if ((xmlHttp.status >= 200 && xmlHttp.status < 300) || xmlHttp.status == 0 || xmlHttp.status == 304) {
                    var myBody = document.getElementsByTagName("BODY")[0];
                    var myScript = document.createElement("script");
                    myScript.language = "javascript";
                    myScript.type = "text/javascript";
                    if (A.id) {
                        myScript.id = A.id;
                    }
                    try {
                        //IE8以及以下不支持这种方式，需要通过text属性来设置
                        myScript.appendChild(document.createTextNode(xmlHttp.responseText));
                    } catch (ex) {
                        myScript.text = xmlHttp.responseText;
                    }
                    myBody.appendChild(myScript);
                    if (typeof B === "function") {
                        B();
                    }

                } else {
                    if (typeof C === "function") {
                        C(xmlHttp.responseText);
                    }
                }
            }
        }
        if (window.ActiveXObject) { //IE
            try {
                //IE6以及以后版本中可以使用
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                //IE5.5以及以后版本可以使用
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } else if (window.XMLHttpRequest) {
            //Firefox，Opera 8.0+，Safari，Chrome
            xmlHttp = new XMLHttpRequest();
        }
        //采用同步加载
        xmlHttp.open("GET", A.url, A.async);
        //发送同步请求，如果浏览器为Chrome或Opera，必须发布后才能运行，不然会报错
        xmlHttp.send(null);

        if (A.async == true) {
            xmlHttp.onreadystatechange = function () {
                D();
            }
        } else {
            D();
        }

    },
    // 异步加载css
    getStyle: function (A, B) {
        var B = function () {
        };

        var C = document.createElement("link");
        C.setAttribute("type", "text/css");
        C.setAttribute("rel", "stylesheet");
        C.setAttribute("href", A);
        this.head.appendChild(C);
        this.Myload(C, B)
    },
    // 原生ajax请求
    load: function (opt, onSuccess, onError) {
        opt = opt || {};
        opt.method = opt.method || 'GET';
        opt.method.toUpperCase();
        opt.url = opt.url || '';
        opt.async = onSuccess == "return" ? false : opt.async || true;
        opt.data = opt.data || null;
        //opt.success = onSuccess || function () {};
        //opt.error = onError || function () {};
        var xhr = null;
        if (XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
        var params = [];
        for (var key in opt.data) {
            params.push(key + '=' + opt.data[key]);
        }
        var postData = params.join('&');
        if (opt.method.toUpperCase() === 'POST') {
            xhr.open(opt.method, opt.url, opt.async);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            xhr.send(postData);
        } else if (opt.method.toUpperCase() === 'GET') {
            if (postData) {
                xhr.open(opt.method, opt.url + '?' + postData, opt.async);
            } else {
                xhr.open(opt.method, opt.url, opt.async);
            }
            xhr.send(null);
        }
        //xhr.onreadystatechange = function () {
        //     if (xhr.readyState == 4 && xhr.status == 200) {
        //         opt.success(xhr.responseText);
        //     }
        //};

        var r;
        // 同步返回结果
        if (onSuccess == "return") {
            r = xhr.responseText;
            if (opt.dataType == "json") {
                r = JSON.parse(xhr.responseText);
            }
            return r;
            // 异步模式
        } else {
            // 完成
            xhr.addEventListener("load", function (e) {
                r = xhr.responseText;
                if (opt.dataType == "json") {
                    r = JSON.parse(xhr.responseText);
                }
                onSuccess(r);
            }, false);

            // 错误
            xhr.addEventListener("error", function (e) {
                onError(e);
            }, false);
        }
    }
};

cmApi.init();

//放大图片
function initImgPreview() {
    var imgs = document.querySelectorAll("img.mui-action-preview");
    imgs = mui.slice.call(imgs);
    if (imgs && imgs.length > 0) {
        var slider = document.createElement("div");
        slider.setAttribute("id", "__mui-imageview__");
        slider.classList.add("mui-slider");
        slider.classList.add("mui-fullscreen");
        slider.style.display = "none";
        slider.style.zIndex = "1000";
        slider.addEventListener("tap", function () {
            //图片缩小后，生效放大时失效了的按钮链接等对象 2017.10.24
            setTimeout(function () {
                var divs = document.getElementsByName("need_hide_div");
                for (var i = 0; i < divs.length; i++) {
                    //divs[i].style.display='block';
                    //divs[i].disabled=false;
                    divs[i].setAttribute("style", "");

                }
            }, 400);

            slider.style.display = "none";
            appApi.resetBack(); //重置后退事件
            appApi.showBack();
        });
        slider.addEventListener("touchmove", function (event) {
            event.preventDefault();
        })
        var slider_group = document.createElement("div");
        slider_group.setAttribute("id", "__mui-imageview__group");
        slider_group.classList.add("mui-slider-group");
        imgs.forEach(function (value, index, array) {
            //给图片添加点击事件，触发预览显示；
            var addEventListener = value.addEventListener('tap', function (event) {
                //图片放大后，为防止按钮链接等失效，失效需要失效的对象 2017.10.24
                var divs = document.getElementsByName("need_hide_div");
                for (var i = 0; i < divs.length; i++) {
                    //divs[i].style.display='none';
                    //divs[i].disabled=true;
                    divs[i].setAttribute("style", "pointer-events:none");
                }

                appApi.stopBack(function () {
                    slider.style.display = "none";
                    appApi.resetBack(); //重置后退事件
                    appApi.showBack();
                })
                appApi.hideBack();
                slider.style.display = "block";
                _slider.refresh();
                _slider.gotoItem(index, 0);
                event.stopPropagation();
                event.preventDefault();
            });
            var item = document.createElement("div");
            item.classList.add("mui-slider-item");
            var a = document.createElement("a");
            var img = document.createElement("img");
            img.setAttribute("src", value.src);
            a.appendChild(img);
            item.appendChild(a);
            slider_group.appendChild(item);
        });
        slider.appendChild(slider_group);
        document.body.appendChild(slider);
        var _slider = mui(slider).slider();
    }
}
/**
 * 解密链接
 * @type {{decodeURLComponent: $str.decodeURLComponent}}
 */
var $str = {
    decodeURLComponent: function (url) {
        if (url.indexOf("?") > -1) {
            var uri = url.substring(url.indexOf("?") + 1);
            var decodeData = window.decodeURIComponent(window.atob(uri)) //解码。
            var prefix = url.substring(0, url.indexOf("?"));
            return prefix + "?" + decodeData;
        }
    }
}

/**
 * 从解密后的链接中获取参数值
 * @param url
 * @returns {{}}
 */
function getParam(url) {
    var map = {};
    if (url) {
        if (url.indexOf("?") > -1) {
            var arrays = url.split("?")[1].split("&");
            for (var i = 0; i < arrays.length; i++) {
                var paramname = arrays[i].substring(0, arrays[i].indexOf("="));
                var paramval = arrays[i].substring(arrays[i].indexOf("=") + 1);
                map[paramname] = decodeURI(paramval);
            }
        }
    }
    return map;
}

function hasClass(ele, cls) {
    cls = cls || '';
    if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
    return new RegExp(' ' + cls + ' ').test(' ' + ele.className + ' ');
}

function addClass(ele, cls) {
    if (!hasClass(ele, cls)) {
        ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
    }
}

function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
        while (newClass.indexOf(' ' + cls + ' ') >= 0) {
            newClass = newClass.replace(' ' + cls + ' ', ' ');
        }
        ele.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}

var third_info_wx_key = "third_info_wx";
var third_info_qq_key = "third_info_qq";
var cert_type_key = "cert_type";
var login_params_key = "login_params";
var dish_sort_key = "dish_sort_key";

function getThirdInfoForWx() {
    if (localStorage.getItem(third_info_wx_key)) {
        return JSON.parse(localStorage.getItem(third_info_wx_key));
    }
}

function setThirdInfoForWx(info_json) {
    localStorage.setItem(third_info_wx_key, JSON.stringify(info_json));
}

function getCertType() {
    if (localStorage.getItem(cert_type_key)) {
        return localStorage.getItem(cert_type_key);
    }
}

function setCertType(type) {
    localStorage.setItem(cert_type_key, type);
}

function getThirdInfoForQq() {
    if (localStorage.getItem(third_info_qq_key)) {
        return JSON.parse(localStorage.getItem(third_info_qq_key));
    }
}

function setThirdInfoForQq(info_json) {
    localStorage.setItem(third_info_qq_key, JSON.stringify(info_json));
}

function getLoginParams() {
    if (localStorage.getItem(login_params_key)) {
        return JSON.parse(localStorage.getItem(login_params_key));
    }
}

function setLoginParams(info_json) {
    localStorage.setItem(login_params_key, JSON.stringify(info_json));
}

function removeThirdInfo() {
    localStorage.removeItem(third_info_wx_key);
    localStorage.removeItem(third_info_qq_key);
    localStorage.removeItem(cert_type_key);
    localStorage.removeItem(login_params_key);
}

function getDishSort() {
    if (localStorage.getItem(dish_sort_key)) {
        return JSON.parse(localStorage.getItem(dish_sort_key));
    }
}

function setDishSort(value) {
    localStorage.setItem(dish_sort_key, JSON.stringify(value));
}

function getFileType(suffix) {
    var clazz = "label-";
    if(suffix && suffix.indexOf(".") > 0) {
        suffix = suffix.substring(suffix.indexOf("."), suffix.length);
    }
    switch(suffix) {
        case ".txt":
            clazz += "txt";
            break;
        case ".doc":
            clazz += "word";
            break;
        case ".docm":
            clazz += "word";
            break;
        case ".dotx":
            clazz += "word";
            break;
        case ".dotm":
            clazz += "word";
            break;
        case ".docx":
            clazz += "word";
            break;
        case ".rtf":
            clazz += "word";
            break;
        case ".pdf":
            clazz += "pdf";
            break;
        case ".xls":
            clazz += "excel";
            break;
        case ".ppt":
            clazz += "ppt";
            break;
        case ".pptx":
            clazz += "ppt";
            break;
        case ".xlsx":
            clazz += "excel";
            break;
        case ".xlsm":
            clazz += "excel";
            break;
        case ".xltx":
            clazz += "excel";
            break;
        case ".xltm":
            clazz += "excel";
            break;
        case ".xlsb":
            clazz += "excel";
            break;
        case ".xlam":
            clazz += "excel";
            break;

        case ".rm":
            clazz += "video";
            break;
        case ".rmvb":
            clazz += "video";
            break;
        case ".wmv":
            clazz += "video";
            break;
        case ".avi":
            clazz += "video";
            break;
        case ".mp4":
            clazz += "video";
            break;
        case ".3gp":
            clazz += "video";
            break;
        case ".mkv":
            clazz += "video";
            break;
        case ".navi":
            clazz += "video";
            break;
        case ".mov":
            clazz += "video";
            break;
        case ".asf":
            clazz += "video";
            break;
        case ".png":
            clazz += "img";
            break;
        case ".gif":
            clazz += "img";
            break;
        case ".zip":
            clazz += "zip";
            break;
        case ".rar":
            clazz += "zip";
            break;
        case ".arj":
            clazz += "zip";
            break;
        case ".z":
            clazz += "zip";
            break;
        case ".apk":
            clazz += "apk";
            break;
        case ".mmap":
            clazz += "mmap";
            break;
        case ".mpg":
            clazz += "mpg";
            break;
        case ".csv":
            clazz += "csv";
            break;
        case ".mpp":
            clazz += "mpp";
            break;
        case ".dwg":
            clazz += "dwg";
            break;
        case ".html":
            clazz += "html";
            break;
        default:
            clazz += "unkown";
            break;
    }
    return clazz;
}
/**
 * 显示单张照片
 * @param index
 * @param longurl 图片链接
 */
function disposeLogImg(index, longurl) {
    var imgsData = [];
    imgsData.push(longurl);
    appApi.imgPreview.open(index, imgsData);
}

/**
 * 显示多张照片，可以左右滑动切换
 * @param index
 * @param ary 图片链接数组
 */
 function disposeLogImgMutil(index, ary) {
     
    appApi.imgPreview.open(index, ary);
}

function stopEvt(e) {
    e.stopPropagation();//阻止点击事件向上冒泡
}
export {Base,BackCookie,removeThirdInfo,getParam,setDishSort,getDishSort,disposeLogImg,disposeLogImgMutil,removeClass,addClass,cmApi}