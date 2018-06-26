<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
			<div id="segmentedControl" style="display: none" class="mui-segmented-control community-control">
				<a class="mui-control-item" href="#info" flag="info">工程日记</a>
				<a class="mui-control-item" href="#video" flag="video">形象视频</a>
			</div>
			<h1 class="mui-title" id="cus-title">形象视频</h1>
			<!--<a class="mui-icon iconfont icon-shaixuan mui-pull-right" onclick="openFilter()"></a>-->
			<!--<button class="mui-btn  mui-btn-link mui-pull-right">筛选</button>
			<a class="mui-icon iconfont icon-add mui-pull-right" onclick="javascript:showProject();"></a>-->
			<input style="display: none" id="upfile" type="file" accept="video/*" capture="camcorder" onclick="window.appApi.openCamera(3,1);" onchange="uploadImageAndVideo(this)">
		</header>
        		<!-- 形象视频 -->
		<section class="mui-content" id="video_list">
			<!--拍摄视屏-->
			<a class="mui-icon iconfont icon-add zrvideo" @click="selectProject(1);"></a>
			<!--<input style="display: none" id="upfile" type="file" accept="video/*" capture="camcorder" onclick="window.appApi.openCamera(3,1);" onchange="uploadImageAndVideo(this)">-->
			<!--遮罩层-->
			<div style="position:absolute; top:0px; width: 100%; height: 100%; background-color: #000; z-index: 999; opacity: 0.5; display: none" @click="hideProject();" id="shade"></div>
			<!--项目列表-->
			<div id="add-style" class="mui-popup mui-popup-in" style="max-height: 250px; overflow-y: scroll; display: none">
				<ul id="project_list" class="mui-popup-content mui-table-view mui-text-left eg-table-view">
					<!--<li class="mui-table-view-cell" onclick="selectProject(1)">项目视频</li>
					<li class="mui-table-view-cell" onclick="selectProject(0)">非项目视频</li>-->
				</ul>
			</div>
			<div class="mui-scroll content">
				<div class=" video-list mui-table-view mui-table-view-chevron lists">
					<div v-for="(item, a) in items" :key="a">
						<div class="video-item">
							<div class="video-content">
								<div class="video-pic" :data-a="a">
									<div class="pic_bg" style="position:absolute;top: 0;height:100%;width:100% ;background-size: 100% 100%;"></div>
									<div style="line-height: 200px;text-align: center;">
										<!--<img v-if="item.thumbImage==null || item.thumbImage==''" src="../../images/detals.jpg" style="max-width: 100%;max-height: 200px;vertical-align: middle" />
										<img v-else :src="item.thumbImage" />-->
										<!--<img class="lazy" :data-src="item.thumbImage"  style="max-width: 100%;max-height: 250px;vertical-align: middle"/>-->
										<img class="lazy" :data-src="item.thumbImage"   style="max-width: 100%;max-height: 250px;vertical-align: middle"/>
									</div>
									<span class="label-selected"></span>
								</div>
								<div class="video-con">
									<h3 class="video-title" v-text="item.title"></h3>
									<p class="secondary" v-text="format_Date(item.createTime)"></p>
									<p class="secondary">浏览数：<span v-text="item.seeNum"></span></p>
								</div>
								<div class="video-footer" style="">
									<div class="user-info text" :data-a="item.userId">
										<img class="user-pic" :src="item.headImg">
										<span class="user-name" v-text="item.userName"></span>
									</div>
									<div class="operation-box">
										<span class="iconfont icon-shoucang" :data-a="a" :class="{active:item.collect}"></span>
										<span class="iconfont icon-comment" :data-a="a"></span>{{item.commentNum}}
										<span class="iconfont icon-share" :data-img="item.thumbImage" :data-name="item.userName" :data-project="item.title" :data-url="item.videoUrl" :data-id="item.id"></span>
										<span class="iconfont icon-zan" :class="{active:item.praise}" :data-a="a"></span>{{item.praiseNum}}
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</section>
    </div>
</template>

<script>
import '../../../playform/dropload'
import {getParam,BackCookie} from '../../../playform/common'
import setting from '../../../playform/config'
export default {
    data(){
        return{
			items:[],
			pageParams : {
				curPage: 1,
				pageSize: 10,
				projectSN: '',
				project:""
			}
        }
    },
    created() {
		var map = getParam(window.location.href);
		var psn = map.projectSN === undefined ? "" : map.projectSN; //当前选择的项目sn
		var psn = map.projectSn === undefined ? psn : map.projectSn; //当前选择的项目sn
		var FILTER_KEY = "conditions_" + Number(BackCookie.getCookie("userid"));
		var share_key = "SHARE_KEY";
		console.log(111)
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
		this.initMui();
    },
    methods: {

        selectProject (type) {
                function hideProject() {
					document.getElementsByTagName("html")[0].setAttribute("style", "overflow:")
					document.body.setAttribute("style", "overflow:")
					document.getElementById("shade").style.display = "none";
					document.getElementById("add-style").style.display = "none";
				}
                if(type == 0){
            //不选择项目
            document.getElementById("upfile").click();
                }else{
                    //projectSN, projectName, projectNameShort("测试5")
                    var projectSN, projectName, projectNameShort
                    document.getElementById("upfile").click();
        //			window.appApi.openNewWindow(getPagePath() + "/work/project_list_for_video.html");
                }
		},
		// 加载数据
		loadData: function(type,me) {
			var _self = this;
			this.$http.post("/community/video/find_page",
				this.pageParams, {
					headers: {
						'Content-Type': 'application/json'
					},
				}).then(function(response) {
					if(type == "up"){
//						$('.lists').empty();
                        this.items = [];
					}
				var page = response.data.result;
				var curPage=_self.pageParams.curPage
//				console.log(response);
//				console.log(videoApp)
				console.log(page);
				if(page==null){
					var html=''
							html+='<div id="empty-view" class="no-group"><div class="no-record-img no-record-cloud"></div><p>无记录</p></div>'
							$(".content").empty()
							$("#video_list").append(html)
				}
				// 渲染数据
				_self.diposeData(page);
				if(page.list && page.list.length > 0) {
					// 页数加1
					_self.pageParams.curPage = _self.pageParams.curPage + 1;
					
					// 上拉刷新
					if(type == "up") {
						// 更新分页插件
						me.resetload();

						// 解锁loadDownFn里锁定的情况
						me.unlock();

						me.noData(false);

					}else{
						// 更新分页插件
						me.resetload();
					}
					// 如果没有数据

				} else {
					if(_self.pageParams.curPage == 1){
//						alert(type);
//						alert(2);
						// 无数据div显示
						console.log($("#empty-view").length)
						if($("#empty-view").length == 0){
							var html=''
							html+='<div id="empty-view" class="no-group"><div class="no-record-img no-record-cloud"></div><p>无记录</p></div>'
							$(".content").empty()
							$("#video_list").append(html)
						}
						// 锁定
							me.lock();
													// 更新分页插件
							me.resetload();

							// 无数据,不会再执行加载
							me.noData();

					}else{
						// 下拉刷新
						if(type == "up") {

							// 更新分页插件
							me.resetload();

							me.noData(true);
							// 上拉加载
						} else {
							// 锁定
							me.lock();
							// 无数据
							me.noData();
							// 更新分页插件
							me.resetload();
						}
					}
				}


			}).catch(function(error) {
//				console.log(error);
				// 即使加载出错，也得重置
//				me.resetload();
			});

		},
		initMui: function(share_key) { //初始化mui的分页插件
		let _self = this;
			$(function() {
				$("#video_list").on('click', '.icon-zan', function() { //绑定点赞事件
					//var a = this.getAttribute("data-a");
					var a = $(this).attr("data-a");
					_self.clickPraise(a);

				});
				//
				$("#video_list").on('click', '.icon-comment', function() { //绑定评论事件
					var a = $(this).attr("data-a");
					var v = _self.items[a];
//					v.seeNum = v.seeNum;
					window.appApi.openVideo(setting.getPagePath() + "/community/community_comment.html?autoComment=1&id="+v.id,v.videoUrl,"视频详情",v.thumbImage);

				});
				//
				$("#video_list").on('click', '.icon-share', function() { //绑定更多事件
					var url = $(this).attr("data-url");
					var img = $(this).attr("data-img");
					var name = $(this).attr("data-name");
					var project = $(this).attr("data-project");
					if(project == undefined || project == ""){
						project = "非项目视频"
					}
					var logo = "http://java.winfreeinfo.com/static/images/app-logo.jpg";
					if(img == undefined || img == ""){
						img = logo;
					}
					var id = $(this).attr("data-id");
					localStorage.setItem(share_key,setting.SHARE_OPERATE.VIDEO_SHARE);
					var shareUrl = setting.getPagePath() + "/community/community_comment.html?id="+id;
					appApi.shareVideo(0, name + "发布了一段工程项目的形象视频，赶快来看看吧", project, shareUrl, img, url,"视频详情", null);
				});
				//
				$("#video_list").on('click', '.user-info', function() { //绑定头像
					var a = $(this).attr("data-a");
					window.appApi.openNewWindow(setting.getPagePath() + "/contacts/eg_details.html?userId=" + a);
				});
				$("#video_list").on('click', '.icon-shoucang', function() { //绑定头像
					var a = $(this).attr("data-a");
					_self.collect(a);
				});
				//
				$("#video_list").on('click', '.video-pic', function() { //绑定视频播放事件
					
					var a = $(this).attr("data-a");
					console.log(_self.items)
					var v = _self.items[a];
					
//					v.seeNum = v.seeNum;
					//更新播放数量
					var param = new FormData();
					param.append("id", v.id);
//					axios.post(getUrl() + "/community/video/seenum", param).then(function (response) {
////						console.info(response);
//						
//					});
					BackCookie.setCookie("videoUrl", v.videoUrl);
					window.appApi.openVideo(setting.getPagePath() + "/community/community_comment.html?id="+v.id,v.videoUrl,"视频详情",v.thumbImage);
					//window.appApi.openNewWindow(getPagePath() + "/community/community_comment.html?autoplay=1&id="+v.id);

				});

				// dropload
				$('.content').dropload({
					scrollArea: window,
					domUp: {
						domClass: 'dropload-up',
						domRefresh: '<div class="dropload-refresh"><i class="mui-icon mui-icon-arrowthindown" style="font-size:16px;c"></i>下拉刷新</div>',
						domUpdate: '<div class="dropload-update"><i class="mui-icon mui-icon-arrowthinup" style="font-size:16px;font-weight:bold"></i> 释放更新</div>',
						domLoad: '<div class="dropload-load"><i class="mui-spinner" style="width:20px;height:20px;margin-right:5px;vertical-align: middle;"></i>加载中...</div>'
					},
					domDown: {
						domClass: 'dropload-down',
						domRefresh: '<div class="dropload-refresh"><i class="mui-icon mui-icon-arrowthinup" style="font-size:16px;font-weight:bold"></i>上拉加载  </div>',
						domLoad: '<div class="dropload-load"><i class="mui-spinner" style="width:20px;height:20px;margin-right:5px;vertical-align: middle;"></i>加载中</div>',
						domNoData: '<div class="dropload-noData">没有更多数据</div>'
					},
					// 下拉刷新
					loadUpFn: function(me) {

						_self.pageParams.curPage = 1;
					    _self.loadData("up",me);


					},
					// 上拉加载更多
					loadDownFn: function(me) {
						_self.loadData("down",me);
					},
					threshold: 200
				});
			});
		},
		diposeData: function(page) {
			this.items = this.items.concat(page.list);
			$("img.lazy").delayLoading({
						defaultImg:  "",                      // 预加载前显示的图片
					//	errorImg: defaultImg,                         // 读取图片错误时替换图片(默认：与defaultImg一样)
						imgSrcAttr: "originalSrc",                    // 读取图片的src
						setImg: "data-src",              // 记录图片路径的属性(默认：originalSrc，把页面img的src属性值传给originalSrc属性)
						beforehand: 200,                      // 预先提前多少像素加载图片(默认：0)
						event: "scroll",                      // 触发加载图片事件(默认：scroll)
						duration: 300,                        // 三种预定淡出(入)速度之一的字符串("slow", "normal", or "fast")或表示动画时长的毫秒数值(如：1000),默认:"normal"
						container: window,                    // 对象加载的位置容器(默认：window)
						success: function (imgObj) {
							imgObj.parent().css("background","#FFFFFF");
						},       // 加载图片成功后的回调函数(默认：不执行任何操作)
						error: function (imgObj) { }         // 加载图片失败后的回调函数(默认：不执行任何操作)
					});

				
				

		},
		clickPraise: function(a) {
			var v = this.items[a];
			v.praise = !v.praise;
			if(v.praise) {
				v.praiseNum = v.praiseNum + 1;
				//v.seeNum = v.seeNum + 1;
			}else{
				v.praiseNum = v.praiseNum - 1;
				//v.seeNum = v.seeNum+1;
			}
			var param = new FormData();
			param.append("id", v.id);
			param.append("praise", v.praise);
			this.$http.post("/community/video/praise", param).then(function (response) {
//				console.info(response.data);
			});
		},

		format_Date: function(val) {
			//      	console.log(new Date(1508223161000).Format("yyyy-MM-dd hh:mm:ss "))
			return new Date(val).Format("yyyy-MM-dd hh:mm:ss ");
			// return val;
		},
		collect:function (a) {
			var _self = this;
			var v = this.items[a];
			this.$http.get("/collect/do?id=" + v.id +"&type=5" ).then(function (response) {
				if (response.data.code == 4001) { // 收藏成功
					v.collect = true;
				}else if(response.data.code == 4003){ //取消收藏
					v.collect = false;
				}else{
					msg(response.data.message);
				}
				layer.closeAll();
				msg(response.data.message);
			}).catch(function (error) {
				layer.closeAll();
				// warm("收藏出错")
			});
		}
	}
}
</script>

<style scoped>
    .mui-bar {
        height: 44px;
        display: block;
        overflow: hidden;
        z-index: 101;
    }
    body,html{
        position: relative;
        width: 100%;
        height: 100%;
    }
    iframe {
        border: 0;
        width: 100%;
        height: 100%;
    }

    .sift-tab .tab-item {
        background: #fff;
        width: 50%;
        display: inline-block;
        height: 50px;
        line-height: 50px;
    }

    .sift-tab {
        display: block;
    }

    .g-bar-tab .g-tab-item {
        display: block;
        float: left;
        width: 19.9%;
        height: 100%;
        padding-top: 3px;
    }

    .tab-box {
        height: 50px;
        overflow: hidden;
    }

    .mui-bar-nav~.mui-content {
        position: fixed;
        top: 44px;
        /*height: 50px;*/
        z-index: 100;
        width: 100%;
        padding-top: 0;
        overflow: hidden;
    }

    .module01:before,
    .module02:before,
    .mui-table-view:before {
        height: 0;
    }

    .mui-table-view:before {
        height: 0;
    }

    .g-bar-tab~.mui-content {
        padding-bottom: 0;
        display: block;
    }

    .mui-scroll {
        height: 100%;
    }

    .video-item {
        margin-bottom: 0;
    }

    .video-item .video-pic>div {
        line-height: 200px;
        text-align: center;
        height: 200px;
    }

    .video-item .video-pic>div>img {
        vertical-align: middle;
        width: auto;
        max-width: 100%;
        max-height: 250px;
        position: relative;
        top: 0;
        left: 0;
        -webkit-transform: translateY(0);
        transform: translateY(0);
        display: inline-block;
    }

    body {
        -webkit-overflow-scrolling: touch;
        /* position: relative; */
    }

    .content {
        -webkit-overflow-scrolling: touch;
        position: relative;
        margin-bottom: 0px;
    }

    #video_list {
        -webkit-overflow-scrolling: touch;
        position: absolute;
        width: 100%;
        top: 45px;
        margin-bottom: 0px;
        left: 0;
    }

    .g-bar-tab {
        display: block;
        position: fixed;
        /*bottom: 0;*/
        /*height: 50px;*/
        overflow: hidden;
        z-index: 100;
    }

    .dropload-up>div {
        text-align: center;
        height: 50px;
        line-height: 50px;
    }

    .dropload-down div {
        text-align: center;
        height: 50px;
        line-height: 40px;
    }

    .dropload-down {
        position: relative;
        display: block;
        height: 50px;
        margin-bottom: 0px;
    }

    .video-item:nth-child(even) .pic_bg{
        background: #EBEBF5;
    }
    .video-item:nth-child(odd) .pic_bg{
        background:#FBF5E1;
    }
    #video_list{
        min-height: 300px;
    }
    .mui-title .mui-loading{
        position: relative;
        top: 0;
        left: 0;
        transform:translate(0%,0%);
        display: inline-block;
        width: 16px;
        vertical-align: middle;
    }
    .mui-title .mui-loading .mui-spinner{
        width: 16px;
        height: 16px;
    }
    .zrvideo{
        position: fixed;
        bottom: 10px;
        left: 50%;
        z-index: 999;
        font-size: 60px;
        margin-left: -30px;
        border-radius: 50%;
        color: #FF3300;
        
    }
</style>
