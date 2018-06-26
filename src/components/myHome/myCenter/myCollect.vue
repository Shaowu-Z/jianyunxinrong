<template>
<div id="app">
	<header class="mui-bar mui-bar-nav">
		<h1 class="mui-title">我的收藏</h1>
		<button id="btn-referrer" class="mui-action-back mui-btn mui-btn-link mui-btn-nav mui-pull-left hide">
			<span class="mui-icon mui-icon-back"></span>返回
		</button>
	</header>
	
	<section id="" class="mui-content">
		<!-- <div id="pullrefresh" class="mui-content"  style="padding-top: 44px">
			<div class="mui-scroll"> -->
				<mt-loadmore v-if="list.length>0" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
		  			<div  v-for="(obj,index) in list" :key="index">
						<div  v-if="obj.type == 1" class="module01 openItem" :data-id="obj.productId" :data-type="obj.type" 
							@touchstart="gtouchstart($event)" @touchmove="gtouchmove($event)" @touchend="gtouchend($event)">
							<!--材料收藏-->
							<div class="module01-head header-media">
								<div class="user-info text">
									<span class="user-name">材料</span>
								</div>
								<p class="secondary text">{{obj.addTime | formDate}}</p>
							</div>
							<div class="module-body">
								<div class="prolist-line">
									<div class="list-item">
										<div class="pro-img">
											<img v-bind:src="obj.productImgUrl">
										</div>
										<div class="product-info-box">
											<div class="product-name">
												<span class="pinpai">{{obj.brand}}</span>{{obj.productName}}
											</div>
											<span class="hide">{{html = obj.productPrice| formatPrice}}</span>
											<div class="product-price-m" v-html="price_html">
											</div>
											<div class="gray-pro-info"><span v-text="obj.buyNum"></span><span
													class="mui-pull-right" v-text="'已售' + obj.buyNum"></span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div v-else-if="obj.type == 3" class="module01 openItem" :data-id="obj.dishId" :data-type="obj.type"
							:data-status="obj.status" :data-filename="obj.dishName" :data-url="obj.dishUrl"
							:data-length="obj.dishSize" :data-thumb="obj.dishImg" 
							@touchstart="gtouchstart($event)" @touchmove="gtouchmove($event)" @touchend="gtouchend($event)">
							<!--云盘收藏-->
							<div class="mui-card-content">
								<div class="mui-card-content-inner text">
									<!--docx-->
									<div class="article-content file-content">
										<div :class="'a-img '+fileType(obj.dishName) "></div>
										<div class="a-title mui-ellipsis-2" v-text="obj.dishName"></div>
									</div>
									<p class="secondary text">
										<span v-text="obj.dishProjectName"></span>
										<span v-if="obj.dishProjectName!=''">-</span>
										<span v-text="obj.fromUser"></span>
										{{obj.addTime | formDate}}
									</p>
								</div>
							</div>
						</div>
						<div v-else-if="obj.type == 5" class="module01 openItem" :data-id="obj.videoId" :data-type="obj.type"
							:data-url="obj.videoUrl" :data-thumb="obj.videoImg"
							@touchstart="gtouchstart($event)" @touchmove="gtouchmove($event)" @touchend="gtouchend($event)">
							<!--视频收藏-->
							<div class="module01-head header-media">
								<div class="user-info text">
									<img class="user-header" v-bind:src="obj.videoUserIcon"/>
									<span class="user-name" v-text="obj.videoUserName"></span>
								</div>
								<p class="secondary text">{{obj.addTime | formDate}}</p>
							</div>
							<div class="module-body">
								<div class="c-body" style="text-align: center">
									<div class="video-pic">
										<img v-if="obj.videoImg&&obj.videoImg!=''" style="height:100%" v-bind:src="obj.videoImg">
										<img v-else style="height:100%" src="../../../assets/images/detals.jpg">
									</div>
								</div>
								<div class="c-footer" v-if="obj.videoProjectName&&obj.videoProjectName!=''">
									<div class="project-name" v-text="obj.videoProjectName"></div>
								</div>
							</div>
						</div>
						<div v-else-if="obj.type == 6" class="module01 openItem" :data-id="obj.msgId" :data-type="obj.type"
							:data-url="obj.url" :data-msgType="obj.msgType" :data-thumb="obj.thumb"
							:data-msg="obj.msg" :data-addr="obj.addr" :data-lat="obj.lat"
							:data-lng="obj.lng" :data-filename="obj.filename"
							:data-addTime="obj.addTime" :data-length="obj.length" 
							@touchstart="gtouchstart($event)" @touchmove="gtouchmove($event)" @touchend="gtouchend($event)">
							<!--消息收藏-->
							<!--消息文字收藏-->
							<div class="c-box mui-card no-shadow" v-if="obj.msgType=='txt'">
								<div class="mui-card-content">
									<div class="mui-card-content-inner text">
										<!--判断此条消息是否是链接-->
										<div class="txt-content mui-ellipsis-3" v-if="isHref(obj.msg)">
											<a> {{obj.msg}}</a>
										</div>
										<div class="txt-content mui-ellipsis-3" v-else>
											{{obj.msg}}
										</div>
										<p class="secondary text">
											<span v-text="obj.gourpNick"></span>
											<span v-if="obj.gourpNick!=null&&obj.gourpNick!=''">-</span>
											<span v-text="obj.fromUser"></span>
											{{obj.addTime | formDate}}
										</p>
									</div>
								</div>
							</div>
							<!--消息图片收藏-->
							<div class="c-box mui-card no-shadow" v-if="obj.msgType=='img'">
								<div class="mui-card-content">
									<div class="mui-card-content-inner text">
										<div class="img-content longer">
											<img @click="window.common.initImgPreview()" style="margin-left:15%" v-bind:src="obj.url"/>
										</div>
										<p class="secondary text">
											<span v-text="obj.gourpNick"></span>
											<span v-if="obj.gourpNick!=null&&obj.gourpNick!=''">-</span>
											<span v-text="obj.fromUser"></span>
											{{obj.addTime | formDate}}
										</p>
									</div>
								</div>
							</div>
							<!--消息文件收藏-->
							<div class="c-box mui-card no-shadow" v-if="obj.msgType=='file'">

								<div class="mui-card-content">
									<div class="mui-card-content-inner text">
										<!--docx-->
										<div class="article-content file-content">
											<div :class="'a-img '+fileType(obj.filename) "></div>
											<div class="a-title mui-ellipsis-2" v-text="obj.filename"></div>
										</div>
										<p class="secondary text">
											<span v-text="obj.gourpNick"></span>
											<span v-if="obj.gourpNick!=null&&obj.gourpNick!=''">-</span>
											<span v-text="obj.fromUser"></span>
											{{obj.addTime | formDate}}
										</p>
									</div>

								</div>
							</div>
							<!--消息视频收藏-->
							<div class="c-box mui-card no-shadow" v-if="obj.msgType=='video'">
								<div class="mui-card-content">

									<div class="mui-card-content-inner text text">
										<div class="img-content video-content">
											<img v-if="obj.thumb&&obj.thumb!=''" v-bind:src="obj.thumb"/>
											<img v-else src="../../../assets/images/detals.jpg">
											<span class="duration">{{obj.times | formTime}}</span>
										</div>
										<p class="secondary text">
											<span v-text="obj.gourpNick"></span>
											<span v-if="obj.gourpNick!=null&&obj.gourpNick!=''">-</span>
											<span v-text="obj.fromUser"></span>
											{{obj.addTime | formDate}}
										</p>
									</div>


								</div>
							</div>
							<!--消息语音收藏-->
							<div class="c-box mui-card no-shadow" v-if="obj.msgType=='audio'">
								<div class="mui-card-content">
									<div class="mui-card-content-inner text">
										<div class="article-content sound-content">
											<div class="a-img"></div>
											<div class="a-title mui-ellipsis-2">{{obj.times}}s</div>
										</div>
										<div>
											<audio :id="'audio'+obj.msgId" v-bind:src="obj.url"></audio>
										</div>

										<p class="secondary text">
											<span v-text="obj.gourpNick"></span>
											<span v-if="obj.gourpNick!=null&&obj.gourpNick!=''">-</span>
											<span v-text="obj.fromUser"></span>
											{{obj.addTime | formDate}}
										</p>
									</div>
								</div>
							</div>
							<!--消息位置信息收藏-->
							<div class="c-box mui-card no-shadow" v-if="obj.msgType=='loc'">
								<div class="mui-card-content">
									<div class="mui-card-content-inner text">
										<div class="article-content localed-content">
											<div class="a-img"></div>
											<div class="a-title mui-ellipsis-2">{{obj.addr}}</div>
										</div>
										<p class="secondary text">
											<span v-text="obj.gourpNick"></span>
											<span v-if="obj.gourpNick!=null&&obj.gourpNick!=''">-</span>
											<span v-text="obj.fromUser"></span>
											{{obj.addTime | formDate}}
										</p>
									</div>
								</div>
							</div>
							<div class="c-box mui-card no-shadow" v-if="obj.msgType=='todo_Type'">
								<div class="mui-card-content">
									<div class="mui-card-content-inner text">
										<div class="article-content">
											<div class="a-title" style="color: #f5b35d;" v-text="obj.todoTitle"></div>
											<p class="mui-ellipsis" v-text="obj.todoTitleTwo"></p>
											<div v-if="obj.todoContent!=null" v-for="(content,index) in splitContent(obj.todoContent)" :key="index">
												<dl class="item">
													<dt class="label" v-text="content[0]"></dt>
													<dd class="con" v-text="content[1]"></dd>
												</dl>
											</div>
										</div>
										<p class="secondary text">
											<span v-text="obj.gourpNick"></span>
											<span v-if="obj.gourpNick!=null&&obj.gourpNick!=''">-</span>
											<span v-text="obj.fromUser"></span>
											{{obj.addTime | formDate}}
										</p>
									</div>
								</div>
							</div>
							<!--个人名片-->
							<div class="c-box mui-card no-shadow" v-if="obj.msgType=='minpian_type'">
								<div class="mui-card-content">
									<div class="mui-card-content-inner text">
										<div class="article-content">
											<div class="oa-contact-cell mui-table">
												<div class="mui-table-cell oa-contact-avatar square"><img :src="obj.userAvatars"/></div>
												<div class="mui-table-cell">
													<div class="a-title">{{obj.msg}}<small>[名片]</small></div>
													<div class="txt-style" v-text="obj.cardPhone"></div>
												</div>
											</div>
										</div>
										<p class="secondary text">
											<span v-text="obj.gourpNick"></span>
											<span v-if="obj.gourpNick!=null&&obj.gourpNick!=''">-</span>
											<span v-text="obj.fromUser"></span>
											{{obj.addTime | formDate}}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</mt-loadmore>
				<!-- <div class="mui-pull-bottom-pocket mui-block"><div class="mui-pull"><div class="mui-pull-loading mui-icon mui-spinner mui-hidden"></div><div class="mui-pull-caption mui-pull-caption-nomore">没有更多数据了</div></div></div>
			</div>
		</div> -->
		<!--没有收藏记录-->
		<div class="no-group" v-if="allPage<=0">
			<div class="no-record-img no-collection"></div>
			<p>您尚未添加任何收藏</p>
		</div>
		<!--遮罩层-->
		<div class="mui-backdrop" v-if="!isSendCollect" id="backdrops" style="display:none;z-index: 999;background-color: rgba(0,0,0,.3)"></div>
	
		<!--遮罩层-->
		<div class="mui-backdrop" v-if="isSendCollect" id="backdrop" style="display:none;z-index: 999;background-color: rgba(0,0,0,.3)"></div>
		<!--长按收藏弹框-->
		<div class="mui-popup mui-popup-in"  v-if="!isSendCollect" id="changan_collect" style="display: none;">
			<ul class="mui-popup-content mui-table-view mui-text-left eg-table-view">
				<li class="mui-table-view-cell" id="forwarding">转发</li>
				<li class="mui-table-view-cell" id="delete">删除</li>
			</ul>
		</div>
		<!--发送弹框-->
		<div class="mui-popup mui-popup-in" v-if="isSendCollect" id="send_collect" style="display:none;" >
			<div class="send-box">
				<div class="send-title">发送给：</div>
	
				<div class="oa-contact-cell mui-table">
					<div class="oa-contact-avatar mui-table-cell">
						<img v-bind:src="message.img">
					</div>
					<div class="oa-contact-content mui-table-cell">
						<h4 class="oa-contact-name" v-text="message.name"></h4>
					</div>
				</div>
	
				<div class="send-con" v-if="type==5">
					<div class="mui-ellipsis-2 mui-text-left" >
						<div class="img-content video-content">
							<img v-if="thumb!=''" v-bind:src="thumb"/>
							<img v-if="thumb==''" src="../../../assets/images/detals.jpg">
						</div>
					</div>
				</div>
	            <div class="send-con" v-if="type==3">
	                <div class="mui-ellipsis-2 mui-text-left" v-if="types==2">
	                    <div class="img-content video-content" v-if="types==2">
	                        <img v-if="thumb!=''" v-bind:src="thumb"/>
	                        <img v-if="thumb==''" src="../../../assets/images/detals.jpg">
	                    </div>
	                </div>
	                <div class="mui-ellipsis-2 mui-text-left" v-if="types==1">
	                    <div class="img-content video-content" v-if="types==1">
	                        <img @click="window.common.initImgPreview()" style="margin-left:15%" v-bind:src="url"/>
	                    </div>
	                </div>
	                <p class="mui-ellipsis-2 mui-text-left" v-if="types==3">
	                   [文件]{{filename}}
	                 </p>
	            </div>
				<div class="send-con" v-else-if="type==6">
					<div class="mui-ellipsis-2 mui-text-left" v-if="msgType=='video'">
						<div class="img-content video-content" v-if="msgType=='video'">
							<img v-if="thumb!=''" v-bind:src="thumb"/>
							<img v-if="thumb==''" src="../../../assets/images/detals.jpg">
						</div>
					</div>
					<p class="mui-ellipsis-2 mui-text-left" v-if="msgType=='txt'">
						{{msg}}
					</p>
					<div class="mui-ellipsis-2 mui-text-left" v-if="msgType=='img'">
						<div class="img-content longer" v-if="msgType=='img'">
							<img @click="window.common.initImgPreview()" style="margin-left:15%" v-bind:src="url"/>
						</div>
					</div>
	                <p class="mui-ellipsis-2 mui-text-left" v-if="msgType=='file'">
	                    [文件]{{filename}}
	                </p>
					<p class="mui-ellipsis-2 mui-text-left" v-if="msgType=='loc'">
						[位置]{{address}}
					</p>
					<p class="mui-ellipsis-2 mui-text-left" v-if="msgType=='minpian_type'">
						{{msg}}的名片
					</p>
				</div>
				<ul class="mui-table-view input-box">
					<li class="mui-table-view-cell mui-input-row">
						<input type="text" id="note" placeholder="我想说："/>
					</li>
				</ul>
				<div class="footer">
					<button class="mui-btn mui-btn-link btn-normal" id="mui-btn mui-btn-link btn-normal">取消</button>
					<button class="mui-btn mui-btn-link" id="mui-btn mui-btn-link">发送</button>
				</div>
			</div>
		</div>
	</section>
</div>
</template>
<script>
	import setting from "../../../playform/config"
	import { BackCookie,getParam } from '../../../playform/common.js';
	import {Toast} from "mint-ui";
	var sUserAgent = navigator.userAgent.toLowerCase();
	var isApp = sUserAgent.match(/cy/i);
	export default {
	  	data () {
	    	return {
				pageParams: {curPage: 1, pageSize: 20},
				downloadWidget: '',
				allPage:"",
				imageHost:'UPLOAD_SERVER_ADDRESS',
				list: [],
				price_html: "",
				result: {},
				message:{},
				id:"",//收藏所对应的id
				isSendCollect:false,//是否为发送收藏
				msgType:"",//消息类型
				msg:"",//消息内容
				type:0,//收藏类型
				filename:"",//消息文件名
				timeOutEvent: 0,
				address:"",//具体位置
				thumb:"",//缩略图
				url:"",//资源路径
				types:0,//云盘收藏的类型
				listLength:1,//解决刚加载出现的无记录提示
				allLoaded: false,
				bottomStatus: '',
				wrapperHeight: 0,
				sendId:this.$route.query.sendId,
				domain:"http://java.winfreeinfo.com"
	    	}
		},
		mounted() {
			//判断字符串是不是以指定字符串结尾
			function confirmEnding(str, target) {
			    var start = str.length-target.length;
			    var arr = str.substr(start,target.length);
			    if(arr == target){
			        return true;
			    }
			    return false;
			}
			
			$("#backdrops").on("tap",function () {
				if(this.style.display=="block"){
			        this.style.display = "none"
			        document.getElementById("changan_collect").style.display = "none";
				}
			 })
			
			
			function closeMyCollect() {
			    window.appApi.closeNewWindow();
			}
		},
		created() {		
	        /*alert("this.$route.query.type:"+this.$route.query.type+",sendId:"+sendId);*/
			var _self = this;
	        if(this.$route.query.sendType!=null&&this.$route.query.sendType!=''&&this.$route.query.sendType!=undefined){
	            _self.$data.isSendCollect=true;
			}
			window.appApi.imgPreview.init();
			_self.loadData();
		},
		methods:{
			handleBottomChange(status) {
				this.bottomStatus = status;
			},
			loadBottom() {
				var _self = this;
				setTimeout(() => {
					_self.loadData();
					_self.allLoaded = _self.$data.pageParams.curPage>=_self.$data.allPage;
					_self.$refs.loadmore.onBottomLoaded();
				}, 1500);
			},
			sendCollect: function(note){
	            var _self = this
	            console.log(_self.$data.type+","+_self.$data.id+","+note+","+this.$route.query.type+","+sendId+","+_self.$data.msgType);//收藏类型，收藏所对应的id,备注,发送的目标类型,发送的类型所对应的id(环信id)
	            this.$http.get("/collect/send_msg_all?this.$route.query.type="+this.$route.query.type+"&sendId="+sendId+"&note="+note+"&type="+_self.$data.type+"&id="+_self.$data.id+"&msgType="+_self.$data.msgType
	             ).then(function (response) {
	                if (response.data.code == 0||response.data.code==200) {
	                    Toast("发送成功");
	                } else {
	                    Toast("系统出了点小状况，请稍后重新发送");
	                }
	
	                document.getElementById("send_collect").style.display = "none";
	                document.getElementById("backdrop").style.display = "none";
	            }).catch(function (error) {
	                console.log(error);
	            })
			},
	        /**
			 * 原生发送环信消息
			 *
	         toImId;//接收者的imid 必填
	         toAvatarUrl; //接收者的头像url 必填
	         toNickName;//  接收者的昵称  必填
	         chatType;//接收方聊天类型  1=单聊 2=群聊
	         types;//消息类型   1=图片 2=视频 3=文件 4=纯文本 5=位置
	         lat;// 纬度
			 lng; //经度
	         addr;// 位置详情
	         text;//文本内容
	         msg;//    图片,视频,文件 名称
	         url//下载地址
	         size//大小
	         */
			sendMessageNew: function (toImId,toAvatarUrl,toNickName,chatType,types,lat,lng,addr,msg,filename,url,size) {
	
	            //拼接发送格式
	            var data ="{'toImId': "+"'" + toImId + "',"
	                +"'toAvatarUrl':"+ "'" + toAvatarUrl + "',"
	                +" 'toNickName':"+ "'" + toNickName + "',"
	                +" 'chatType':"+ "'" + chatType+ "',"
	                +" 'type':"+ "'" + types + "'"
	            if(types==5){
	                data = data+",'latitude':"+ "'" + lat + "',"
	                    +"'longitude':"+ "'" + lng + "',"
	                    +"'locationAddress':"+ "'" + addr + "'}";
	            }
	            if(types==4){
	
	                data = data+",'text':"+ "'" + msg + "'}"
	
	            }
	            if(types==1||types==2||types==3){
	                data = data+
	                    ",'fileName':"+ "'" + filename + "',"
	                    +"'fileUrl':"+ "'" + url + "',"
	                    +"'fileSize':"+ "'" + size + "'}"
	            }
	            var json = eval('(' + data + ')');
	            /*alert(JSON.stringify(json))*/
	
	
	            window.appApi.sendCollection(JSON.stringify(json));
	        },
	        getSendMessage: function () {
	            var _self = this;
	            console.log(this.$route.query.type+","+sendId);
	            this.$http.get( "/collect/send_message", {
	                params: {type:this.$route.query.type,id:sendId}
	             }).then(function (response) {
	                if (response.data.code == 0||response.data.code==200) {
	                    var rs = response.data;
	                    _self.$data.message = rs.result;
	                    console.log("获取发送信息成功");
	                } else {
	                    Toast("系统出了点小状况，请稍后再试");
	                }
	            }).catch(function (error) {
	                console.log(error);
	            })
			},
	        //是否是链接
	        isHref: function(str){
	            var fdStart = str.indexOf("http");
	            if(fdStart == 0){
	                return true;
	            }else if(fdStart == -1){
	                fdStart = str.indexOf("https");
	                if(fdStart == 0){
	                    return true;
	                }else if(fdStart ==-1){
	                    return false;
	                }
	            }
	        },
			//视频播放
	        doPlays:function (url,thumb) {
	            console.log(url);
	            if(isApp){
	                window.appApi.openVideo("/playVideo",url,"视频详情",thumb);
	            }else{
	                BackCookie.setCookie("vUrl", url);
	                console.log(BackCookie.getCookie("vUrl"));
	                window.appApi.openNewWindow( "/community/play_video.html");
	            }
	        },
			//语音播放
	        playSound: function (e){
	            var els = e.getElementsByTagName('audio');
	            for(var i=0;i<els.length;i++){
	                els[i].play();
	            }
	
	        },
			loadData: function () {
				var _self = this;
				this.$http.get("/collect/list", {
					params: _self.$data.pageParams
				}).then(function (response) {
					if (response.data.code == 0||response.data.code==200) {
						var rs = response.data;
						console.log(rs)
						_self.$data.allPage = rs.result.endPage;
						_self.$data.result = rs.result;
						if (_self.$data.pageParams.curPage == 1) {
							//首次 加载一次
							_self.$data.list = rs.result.list;
						} else {
							_self.$data.list = _self.$data.list.concat(rs.result.list);
						}
	                    _self.$data.pageParams.curPage = _self.$data.pageParams.curPage+1;
					} else {
						Toast("系统出了点小状况，请稍后再试");
					}
				}).catch(function (error) {
					console.log(error);
				});
			},
			oncklicDiv:function(el){
				var _self = this;
                var type = el.getAttribute("data-type");//收藏类型
                var id = el.getAttribute("data-id");//收藏id
                var url = el.getAttribute("data-url");//路径
                var msgType = el.getAttribute("data-msgType");//消息类型
                var thumb = el.getAttribute("data-thumb");//缩略图
                var msg = el.getAttribute("data-msg");//消息内容
                var addr = el.getAttribute("data-addr");//详细地址
                var lat = el.getAttribute("data-lat");//纬度
                var lng = el.getAttribute("data-lng");//经度
				var filename = el.getAttribute("data-filename");//文件名
				var addTime = el.getAttribute("data-addTime");//收藏时间
				var length = el.getAttribute("data-length");//大小
				/*alert(length);*/
                //判断是要发送收藏，还是查看收藏
                if(_self.$data.isSendCollect){
					//保存当前所点击收藏的一些信息
                    _self.$data.msg=msg;
                    _self.$data.filename=filename;
                    _self.$data.type=type;
                    _self.$data.msgType=msgType;
                    _self.$data.id = id;
                    _self.$data.address=addr;
                    _self.$data.url=url;
                    _self.$data.thumb=thumb;
                    if(type==3){//判断云盘要发送的类型
                        _self.$data.types = _self.istype(filename);
                    }

                    //暂时支持发送的类型
                    if((type==5||type==6||type==3)&&msgType != "todo_Type") {
                        //弹出发送的div
                          document.getElementById("send_collect").style.display = "block";
                          document.getElementById("backdrop").style.display = "block";
                          //取消发送
                          document.getElementById("mui-btn mui-btn-link btn-normal").onclick=function() {
                              document.getElementById("send_collect").style.display = "none";
                              document.getElementById("backdrop").style.display = "none";
                          }
                          //发送
                          document.getElementById("mui-btn mui-btn-link").onclick=function() {
                          	//判断发送的类型  1=图片 2=视频 3=文件 4=纯文本 5=位置
                              document.activeElement.blur();
                              var types = 0;
                              if (msgType == "video") {
                                  types = 2;
                              } else if (msgType == "txt") {
                                  types = 4;
                              } else if (msgType == "img") {
                                  types = 1;
                              } else if (msgType == "file") {
                                  types = 3;
                              } else if (msgType == "loc") {
                                  types = 5;
                              } else if (msgType == "minpian_type") {
                                  types = 6;
                              }else if (msgType == "share_type") {
                                  types = 7;
                              }
                              //判断发送的目标类型
                              var chatType=0;
                              if(sendType=="1"){
                                  chatType=1;
                              }else if(sendType=="3"||sendType=="2"){
                                  chatType=2;
                              }
                              //发送选取的内容
                              /*_self.sendCollect(note);*///废弃使用原生发送方式发送消息
							  if(type==5){//以前的视频发送
                                  	_self.sendMessageNew(sendId,_self.$data.message.img,_self.$data.message.name
                                      	,chatType,2,'','','','',id+".mp4",url,'');
							  }else if(type==3){//收藏的云盘发送
                                  //判断发送的文件类型
                                  	types = _self.istype(filename);
                                  	_self.sendMessageNew(sendId,_self.$data.message.img,_self.$data.message.name
                                      	,chatType,types,'','','','',filename,url,length);
                              }else{
                                    _self.sendMessageNew(sendId,_self.$data.message.img,_self.$data.message.name
                                        ,chatType,types,lat,lng,addr,msg,filename,url,length);

                              }

                              //获取备注
                              var note = document.getElementById("note").value;
                              //发送备注
							  if(note!=null&&note!=undefined&&note!=''){
                                  _self.sendMessageNew(sendId,_self.$data.message.img,_self.$data.message.name
                                      ,chatType,4,lat,lng,addr,note,filename,url,length);
							  }
                              Toast("发送成功");
                              window.appApi.closeNewWindow();
                              document.getElementById("send_collect").style.display = "none";
                              document.getElementById("backdrop").style.display = "none";
						}
					}else{
                        Toast("暂时不支持这种类型的收藏发送");
					}
				}else{
                	//查看收藏列表
					if(type == 1){
                        //材料
                        _self.openProduct(id);
                    }else if(type == 3){
                        //云盘
                        var status = this.getAttribute("data-status");
                        if(status == "-1" || status == -1){
                            Toast("该文件已经被删除，无法查看")
                            return;
                        }
                        _self.dishDownLoad(id);
                    }else if(type == 5){
                        /*视频*/
                        this.$http.get("/community/video/detail", {
                            params: {id:id}
                        }).then(function (response) {
                            if (response.data.code == 0) {
                                var rs = response.data.result;
                                console.info(rs.item) ;
                                var v = rs.item;
                                BackCookie.setCookie("videoUrl", v.videoUrl);
                                window.appApi.openVideo(getPagePath() + "/community/community_comment.html?id="+v.id,v.videoUrl,"视频详情",v.thumbImage);
                            }else{
                                Toast(response.data.message)
                            }
                        }).catch(function (error) {
                            console.log(error);
                        });

                    }else if(type == 6){
                        //消息
                        if(msgType=='file'){
                        	window.appApi.openFile(_self.getMsgFileUrl(id));
                            // location.href = url;
                        }
                        if(msgType=='video'){
                            _self.doPlays(url,thumb);
                        }
                        if(msgType=='txt'){
                        	var ishref = _self.isHref(msg);
                          //这里需要打开信息的详情页面
							window.appApi.openNewWindow("/myCollectionDetail?msgId="+id+"&ishref="+ishref
							+"&addTime="+addTime+"&type="+type);
						}
                        if(msgType=='loc'){
                            window.appApi.showAddress(2,addr,lng,lat);
                        }
                        if(msgType=='audio'){
                            _self.playSound(id);
                        }
                        if(msgType=='img'){
                        	var imgs = [];
                        	imgs[0] = url;
                        	//图片预览
                        	appApi.imgPreview.open(0,imgs,1,null);
						}
						if (msgType=='todo_Type'||msgType=='minpian_type'){
                            window.appApi.openNewWindow(url);
                        }
                    }
				}
			},
			openProduct: function (id) {
				appApi.openNewWindow('/static/webstatic/mall/market/product_detail.html?goodsId=' + id);
			},
	        getFileUrl: function(id) {
	            return this.$data.domain+"/cdish/file/download?id=" + id;
	        },
	        getMsgFileUrl: function(id) {
	            return this.$data.domain+"/collect/file/download?id="+id;
	        },
			dishDownLoad:function (id) {
				var _self = this;
				if(undefined == downloadWidget){
					var html =  '<iframe id="downloadWidget" class="mui-hidden"></iframe>';
					document.getElementById("this").insertAdjacentHTML('afterend', html);
					downloadWidget = document.getElementById("downloadWidget");
				}
				if(isApp){
					appApi.openFile( _self.getFileUrl(id));
				}else{
					downloadWidget.src = _self.getFileUrl(id);
				}
			},
			//判断云盘是什么类别的文件1=图片 2=视频 3=文件
			istype: function(fileName){
				if(confirmEnding(fileName,"mp4")){
					return 2;
				}
	            if(confirmEnding(fileName,"avi")){
	                return 2;
	            }
	            if(confirmEnding(fileName,"mov")){
	                return 2;
	            }
	            if(confirmEnding(fileName,"bmp")){
	                return 1;
	            }
	            if(confirmEnding(fileName,"gif")){
	                return 1;
	            }
	            if(confirmEnding(fileName,"jpg")){
	                return 1;
	            }
	            if(confirmEnding(fileName,"jpeg")){
	                return 1;
	            }
	            if(confirmEnding(fileName,"png")){
	                return 1;
	            }
	            return 3;
			},
	        fileType: function(suffix) {
	            var clazz = "label-";
	            if(suffix && suffix.indexOf(".") > 0) {
	                suffix = suffix.substring(suffix.lastIndexOf("."), suffix.length);
	            }
	
	            switch(suffix) {
	                case ".txt":
	                    clazz += "txt";
	                    break;
	                case ".TXT":
	                    clazz += "txt";
	                    break;
	                case ".doc":
	                    clazz += "word";
	                    break;
	                case ".DOC":
	                    clazz += "word";
	                    break;
	                case ".docm":
	                    clazz += "word";
	                    break;
	                case ".DOCM":
	                    clazz += "word";
	                    break;
	                case ".dotx":
	                    clazz += "word";
	                    break;
	                case ".DOTX":
	                    clazz += "word";
	                    break;
	                case ".dotm":
	                    clazz += "word";
	                    break;
	                case ".DOTM":
	                    clazz += "word";
	                    break;
	                case ".docx":
	                    clazz += "word";
	                    break;
	                case ".DOCX":
	                    clazz += "word";
	                    break;
	                case ".rtf":
	                    clazz += "word";
	                    break;
	                case ".RTF":
	                    clazz += "word";
	                    break;
	                case ".pdf":
	                    clazz += "pdf";
	                    break;
	                case ".PDF":
	                    clazz += "pdf";
	                    break;
	                case ".xls":
	                    clazz += "excel";
	                    break;
	                case ".XLS":
	                    clazz += "excel";
	                    break;
	                case ".ppt":
	                    clazz += "ppt";
	                    break;
	                case ".PPT":
	                    clazz += "ppt";
	                    break;
	                case ".pptx":
	                    clazz += "ppt";
	                    break;
	                case ".PPTX":
	                    clazz += "ppt";
	                    break;
	                case ".xlsx":
	                    clazz += "excel";
	                    break;
	                case ".XLSX":
	                    clazz += "excel";
	                    break;
	                case ".xlsm":
	                    clazz += "excel";
	                    break;
	                case ".XLSM":
	                    clazz += "excel";
	                    break;
	                case ".xltx":
	                    clazz += "excel";
	                    break;
	                case ".XLTX":
	                    clazz += "excel";
	                    break;
	                case ".xltm":
	                    clazz += "excel";
	                    break;
	                case ".XLTM":
	                    clazz += "excel";
	                    break;
	                case ".xlsb":
	                    clazz += "excel";
	                    break;
	                case ".XLSB":
	                    clazz += "excel";
	                    break;
	                case ".xlam":
	                    clazz += "excel";
	                    break;
	                case ".XLAM":
	                    clazz += "excel";
	                    break;
	                case ".rm":
	                    clazz += "video";
	                    break;
	                case ".RM":
	                    clazz += "video";
	                    break;
	                case ".rmvb":
	                    clazz += "video";
	                    break;
	                case ".RMVB":
	                    clazz += "video";
	                    break;
	                case ".wmv":
	                    clazz += "video";
	                    break;
	                case ".WMV":
	                    clazz += "video";
	                    break;
	                case ".avi":
	                    clazz += "video";
	                    break;
	                case ".AVI":
	                    clazz += "video";
	                    break;
	                case ".mp4":
	                    clazz += "video";
	                    break;
	                case ".MP4":
	                    clazz += "video";
	                    break;
	                case ".3gp":
	                    clazz += "video";
	                    break;
	                case ".3GP":
	                    clazz += "video";
	                    break;
	                case ".mkv":
	                    clazz += "video";
	                    break;
	                case ".MKV":
	                    clazz += "video";
	                    break;
	                case ".navi":
	                    clazz += "video";
	                    break;
	                case ".NAVI":
	                    clazz += "video";
	                    break;
	                case ".mov":
	                    clazz += "video";
	                    break;
	                case ".MOV":
	                    clazz += "video";
	                    break;
	                case ".asf":
	                    clazz += "video";
	                    break;
	                case ".ASF":
	                    clazz += "video";
	                    break;
	                case ".png":
	                    clazz += "img";
	                    break;
	                case ".jpg":
	                    clazz += "img";
	                    break;
	                case ".jpeg":
	                    clazz += "img";
	                    break;
	                case ".gif":
	                    clazz += "img";
	                    break;
	                case ".JPEG":
	                    clazz += "img";
	                    break;
	                case ".PNG":
	                    clazz += "img";
	                    break;
	                case ".JPG":
	                    clazz += "img";
	                    break;
	                case ".GIF":
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
	                case ".ZIP":
	                    clazz += "zip";
	                    break;
	                case ".RAR":
	                    clazz += "zip";
	                    break;
	                case ".ARJ":
	                    clazz += "zip";
	                    break;
	                case ".Z":
	                    clazz += "zip";
	                    break;
	                case ".apk":
	                    clazz += "apk";
	                    break;
	                case ".APK":
	                    clazz += "apk";
	                    break;
	                case ".mmap":
	                    clazz += "mmap";
	                    break;
	                case ".MMAP":
	                    clazz += "mmap";
	                    break;
	                case ".mpg":
	                    clazz += "mpg";
	                    break;
	                case ".MPG":
	                    clazz += "mpg";
	                    break;
	                case ".csv":
	                    clazz += "csv";
	                    break;
	                case ".CSV":
	                    clazz += "csv";
	                    break;
	                case ".mpp":
	                    clazz += "mpp";
	                    break;
	                case ".MPP":
	                    clazz += "mpp";
	                    break;
	                case ".html":
	                    clazz += "html";
	                    break;
	                case ".HTML":
	                    clazz += "html";
	                    break;
	                case ".dwg":
	                    clazz += "dwg";
	                    break;
	                case ".DWG":
	                    clazz += "dwg";
	                    break;
	                default:
	                    clazz += "unkown";
	                    break;
	            }
	            return clazz;
	        },
	        /**
	         * 拆分字段
	         * 类别=工作联系单|日期=2018-05-23
	         * @param todoContent
	         */
	        splitContent:function (todoContent) {
	            var list = new Array();
	            var srtList = todoContent.split("|");
	            for (var i=0;i<srtList.length;i++){
	                var content = srtList[i].split("=");
	                if (content.length>1){
	                    list.push(content);
	                }
	            }
	            return list;
	        },
	        gtouchstart:function(e){
	        	var _self = this;
	        	var el = e.currentTarget;
	        	el.style.backgroundColor='#f7f7f7';
		        var els = el.getElementsByTagName('div');
		        for(var i=0;i<els.length;i++){
				    els[i].style.backgroundColor='#f7f7f7';
		        }
                _self.$data.timeOutEvent = setTimeout(function(){
                    _self.collectClick(el)
                },500);//这里设置定时器，定义长按500毫秒触发长按事件
                return false;
            },
            //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
            gtouchend:function(e){
				var _self = this;
				var el = e.currentTarget;
            	el.style.backgroundColor='';
	            var els = el.getElementsByTagName('div');
	            for(var i=0;i<els.length;i++){
	                els[i].style.backgroundColor='';
	            }
                clearTimeout(_self.$data.timeOutEvent);//清除定时器
                if(_self.$data.timeOutEvent!=0){
                    //这里写要执行的内容（尤如onclick事件）
					_self.oncklicDiv(el)
                }
                return false;
            },
            //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
            gtouchmove:function(e){
				var _self = this;
            	e.currentTarget.style.backgroundColor='';
	            var els = e.currentTarget.getElementsByTagName('div');
	            for(var i=0;i<els.length;i++){
	                els[i].style.backgroundColor='';
	            }
                clearTimeout(_self.$data.timeOutEvent);//清除定时器
                _self.$data.timeOutEvent = 0;
            },
			collectClick:function(el) {
				var _self = this;
                _self.$data.timeOutEvent = 0;
                //执行长按要执行的内容，如弹出菜单
			    el.style.backgroundColor='';
			    var els = el.getElementsByTagName('div');
			    for(var i=0;i<els.length;i++){
			        els[i].style.backgroundColor='';
			    }
			    //弹出div
			    document.getElementById("changan_collect").style.display = "block";
			    document.getElementById("backdrops").style.display = "block";
			    document.getElementById("forwarding").onclick=function() {
			        document.getElementById("changan_collect").style.display = "none";
			        document.getElementById("backdrops").style.display = "none";
			        var type = el.getAttribute("data-type");
			        var url = el.getAttribute("data-url");//路径
			        var msgType = el.getAttribute("data-msgType");//消息类型
			        var msg = el.getAttribute("data-msg");//消息内容
			        var addr = el.getAttribute("data-addr");//详细地址
			        var lat = el.getAttribute("data-lat");//纬度
			        var lng = el.getAttribute("data-lng");//经度
			        var filename = el.getAttribute("data-filename");//文件名
			        var length = el.getAttribute("data-length");//大小
			        var thumb = el.getAttribute("data-thumb");
			        //转发
			        if((type==5||type==6||type==3)&&msgType != "todo_Type") {
						//获取转发的消息类型 1=图片 2=视频 3=文件 4=纯文本 5=位置
						var types = 0;
						if(type==5){
							types = 2;
						}else if(type==3){
							types = attention_collect.istype(filename);
						}else if(type==6){
							if (msgType == "video") {
								types = 2;
							} else if (msgType == "txt") {
								types = 4;
							} else if (msgType == "img") {
								types = 1;
							} else if (msgType == "file") {
								types = 3;
							} else if (msgType == "loc") {
								types = 5;
							} else if (msgType == "minpian_type") {
								types = 6;
							}else if (msgType == "share_type") {
								types = 7;
							}
						}
						if(thumb!=null&&thumb!=undefined&&thumb!=''){
							thumb = thumb.replace(/&/g,'sangjie');
							thumb = thumb.replace('?','WhErE');
						}
						var FileUrl;
						if(url!=null&&url!=undefined&&url!=''){
							FileUrl = url.replace(/&/g,'sangjie');
							FileUrl = FileUrl.replace('?','WhErE')
						}
					;
						//拼接转发选人页面需要的参数
						var param = "types="+types+"&lat="+lat+"&lng="+lng+"&addr="+addr+"&msg="+msg+"&filename="+filename
							+"&url="+FileUrl+"&lengthSize="+length+"&thumb="+thumb;
						//打开转发选人页面
						window.appApi.openNewWindow(setting.getUrl() + "/static/webstatic/mycenter/select_member_share.html?"+param);
			        }else{
						Toast({
							message: '暂时不支持这种类型的收藏转发',
                    		position: 'bottom'
						})
			        }
			    }
			    document.getElementById("delete").onclick=function() {
			        document.getElementById("changan_collect").style.display = "none";
			        document.getElementById("backdrops").style.display = "none";
			        //删除
			        var id = el.getAttribute("data-id");
			        var type = el.getAttribute("data-type");
			        // var msg = "确定要取消收藏吗？"
			        // if(!confirm(msg)){
			        //     return false;
					// }
					MessageBox.confirm('确定执行此操作?').then(action => {
  						this.$http.get("/collect/do", {
			            	params: {id:id,type:type}
						}).then(function (response) {
							if (response.data.code==200){
								//刷新
								this.loadData();
							}else {
								el.parentNode.removeChild(el);
								// layer.open({
								//     content: response.data.message
								//     ,skin: 'msg'
								//     ,time: 2 //2秒后自动关闭
								// });
								Toast(response.data.message)
							}
						})
					});
			        
			    }
			    document.getElementById("backdrops").onclick=function() {
			    	document.getElementById("backdrops").style.display="none";
			    	document.getElementById("changan_collect").style.display="none";
			    }
			}
		},
		filters: {
			formatPrice: function (value) {
				var html, _val;
				value = Number(value).toFixed(2);
				//<span><span class="small-price">¥</span><span class="big-price">86</span><span class="small-price">.00</span></span>
				if (value == 0) {
					value = 0;
					html = '<span><span class="small-price">¥</span><span class="big-price">0</span><span class="small-price">.00</span></span>';
				} else if (value.split('.')[1].substring(1) == 0) {
					value = Number(value).toFixed(1);
					_val = value.split('.');
					html = '<span><span class="small-price">¥</span><span class="big-price">' + _val[0] + '</span><span class="small-price">.' + _val[1] + '</span></span>';
				}
				this.$data.price_html = html;
			},
			formTime: function (time) {
				var second = time/1000;
				second = parseInt(second);
				var branch=0;
				if(second>=60){
						branch = second/60;
						second = second%60;
				}
				var branchs = branch>10?branch:"0"+branch;
				var seconds = second>10?second:"0"+second;
				var times= branchs+":"+seconds
	
				return times;
			},
			formDate: function (timestamps) {
				var _self = this;
				var originalTime = new Date(timestamps),
					currentTime = (new Date()).getTime(),
					interval = currentTime - timestamps,
					days,
					hours,
					minutes,
					seconds,
					timeHtml = '';
				days = Math.floor(interval / (24 * 3600 * 1000)); //相差天数
				hours = Math.floor(interval / (3600 * 1000)); //相差小时数
				minutes = Math.floor(interval / (60 * 1000)); //相差分钟
				seconds = Math.floor(interval / 1000); //相差秒数
	
				var adjustedYear = originalTime.getFullYear(),
					adjustedMonth = formatNumber((originalTime.getMonth() + 1)),
					adjustedDate = formatNumber(originalTime.getDate()),
					adjustedHours = formatNumber(originalTime.getHours()),
					adjustedMinutes = formatNumber(originalTime.getMinutes()),
					adjustedSeconds = formatNumber(originalTime.getSeconds());
	
				var nowTime = new Date;
	
				if(originalTime.getFullYear() == nowTime.getFullYear() && originalTime.getMonth() == nowTime.getMonth() && originalTime.getDate() == nowTime.getDate()) {
					if(seconds < 60) {
						timeHtml = '刚刚';
					} else if (minutes < 60) {
						timeHtml = minutes + '分钟前';
					} else {
						timeHtml = '今天'
					}
				} else if(originalTime.getFullYear() == nowTime.getFullYear() && originalTime.getMonth() == nowTime.getMonth() && originalTime.getDate() == (nowTime.getDate() - 1)) {
					timeHtml = '昨天'
				} else {
					var yearHtml = '';
	
					/*if(adjustedYear != (new Date()).getFullYear()) {
						yearHtml = adjustedYear + '年'
					}*/
	
					timeHtml += adjustedYear + '年'+
						adjustedMonth + '月' +
						adjustedDate + '日'/* +
						adjustedHours + ':' +
						adjustedMinutes;*/
				}
				return timeHtml;
			}
		}
	}
	function formatNumber (num,places) {
		if(isNaN(num) )//|| num==null)
			num=0;
		if(isNaN(places))
			places=2;
		num = (parseFloat(num) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
		num = num=="NaN"?"0.00":num;
		return num;
	}

</script>

<style>
	@import "../../../assets/css/common/mint.css";
</style>
