/**
 * Created by fanggui on 2017/6/14.
 */
document.write("<script language='JavaScript' src='/static/plugins/layer/layer.js'></script>");
//var head = document.getElementsByTagName('head')[0];
//var script = document.createElement('script');
//script.type = 'text/javascript';
//script.src = '../../plugins/layer/layer.js';
//head.appendChild(script);
//console.log(script)
//提示弹窗
function warm(msg) {
	layer.open({
		type: 200,
		content: msg,
		btn: '确定'
	});
}
//加载弹窗
function loading(msg) {
	var index = layer.open({
		type: 2,
		shadeClose: true,
		content: msg
	});
	return index;
}
// 录单 弹窗提示
/*
 * url 1:警告（！） 2：确认（√） 3：错误（×）
 * 
 * 
 */

function ludan(msg,time,url,Fn) {
	var para=document.createElement("div");
	para.style.cssText='position:fixed;width:100%;height:100%;z-index:9999;background:#fff;top:0;opacity:0;display:block'
	document.body.appendChild(para);
	setTimeout(function(){
		document.body.removeChild(para)
	},time*1000)
	if(time==0){
		time=100000000
	}
	if(url==1){
		url='url(../../images/ico-warning.png)'
	}else if(url==2){
		url='url(../../images/ico-ture.png)'
	}else if(url==3){
		url='url(../../images/ico-error.png)'
	}else{
		url=''
	}
	layer.open({
		title: false,
		icon:2,
		content: msg,
		time: time,
		closeBtn: 0,
		btn: 0,
		anim: 0,
		shade: 0,
		style:'width:60%;height:100px;line-height:100px;overflow:hidden;background: #000 '+ url+' no-repeat center 15px;;color:#fff;opacity:0.6;background-size:24px 24px',
		shadeClose: false,
		shade:false,
		end: function() {
			Fn && Fn();
		}
	});
}
//提示框自动关闭
/**
 * 
 * @param msg 提示语
 * @param seconds 自动关闭时间
 * @param Fn 销毁回调
 */
function remin(msg, seconds, Fn) {
	layer.open({
		content: msg,
		style: 'background-color:#09C1FF; color:#fff; border:none;',
		time: seconds,
		end: function() {
			Fn && Fn();
		}
	});
}

//
//function remin(msg, seconds, Fn) {
//  layer.open({
//      content: msg
//      , style: 'background-color:#09C1FF; color:#fff; border:none;'
//      , time: seconds,
//      end: function () {
//          Fn && Fn();
//      }
//  });
//}

//提示弹窗，销毁
function warmAlert(msg, Fn) {
	layer.open({
		type: 200,
		content: msg,
		btn: '确定',
		end: function() {
			Fn && Fn();
		}
	});
}
//简单消息提醒
function msg(msg) {
	layer.open({
		content: msg,
		skin: 'msg',
		time: 2 //2秒后自动关闭
	});
}

function confirmLayer(msg, Fn) {
	layer.open({
		content: msg,
		btn: ['确定', '取消'],
		yes: function(index) {
			//alert("确定");
			Fn && Fn();
		},
		no: function() {
			//alert("取消");

		}
	});

}

//最新加载中的方法-create by 方贵
//加载中showloading(),清除加载 clearloading() 专用ID为loading;
function showloading() {
	var body = document.body;
	var indiv = document.createElement("div");
	var contextUrl = getContext();
	indiv.style.zIndex = "997";
	indiv.style.position = "fixed";
	indiv.style.width = "100%";
	indiv.style.height = "100%";
	indiv.style.left = "0px";
	indiv.style.top = "0px";
	indiv.style.display = "";
	indiv.style.background = "rgba(200,200,200,.2)";
	indiv.setAttribute("id", "loading");
	indiv.innerHTML = '<iframe width="100%" height="100%" src="' + contextUrl + '/static/plugins/layer/loading.html"></iframe>';
	body.appendChild(indiv);
}

function clearloading() {
	var el = document.getElementById("loading");
	el.style.display = "none";
	el.parentNode.removeChild(el);

}

function getContext() {
	var url = window.location.href;
	var str1 = url.substr(url.indexOf("/") + 2, url.length - 1);
	var index = str1.indexOf("/") + url.indexOf("/") + 2;
	return url.substr(0, index);
}
/*
 *  //信息框
 layer.open({
 content: '移动版和PC版不能同时存在同一页面'
 ,btn: '我知道了'
 });

 //提示
 layer.open({
 content: 'hello layer'
 ,skin: 'msg'
 ,time: 2 //2秒后自动关闭
 });

 //询问框
 layer.open({
 content: '您确定要刷新一下本页面吗？'
 ,btn: ['刷新', '不要']
 ,yes: function(index){
 location.reload();
 layer.close(index);
 }
 });

 //底部对话框
 layer.open({
 content: '这是一个底部弹出的询问提示'
 ,btn: ['删除', '取消']
 ,skin: 'footer'
 ,yes: function(index){
 layer.open({content: '执行删除操作'})
 }
 });

 //底部提示
 layer.open({
 content: '一个没有任何按钮的底部提示'
 ,skin: 'footer'
 });

 //自定义标题风格
 layer.open({
 title: [
 '我是标题',
 'background-color: #FF4351; color:#fff;'
 ]
 ,content: '标题风格任你定义。'
 });

 //页面层
 layer.open({
 type: 1
 ,content: '可传入任何内容，支持html。一般用于手机页面中'
 ,anim: 'up'
 ,style: 'position:fixed; bottom:0; left:0; width: 100%; height: 200px; padding:10px 0; border:none;'
 });

 //loading层
 layer.open({type: 2});

 //loading带文字
 layer.open({
 type: 2
 ,content: '加载中'
 });*/