<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav device-flag  mui-hidden" style="position: absolute;">
            <h1 class="mui-title">视频详情</h1>
            <a class="mui-action-back mui-icon iconfont icon-back"></a>
        </header>
        <section class="mui-content" id="comment_list" style="height: 100%;overflow: hidden;padding-top: 0;-webkit-user-select:text">
            <div class="stopmove" style="position: absolute;overflow: scroll;width: 100%;height: 100%;">
            <div class="video-list" style="">
                <div class="video-item">
                    <div class="video-content">
                        <div class="video-pic device-flag mui-hidden">
                            <div style="line-height: 200px;text-align: center;" class="zr_box">
                                <img v-if="item.thumbImage==null || item.thumbImage==''" src="../../../assets/images/detals.jpg"  style="vertical-align: middle;width: auto;max-height: 200px;max-width: 100%;"/>
                                <img v-else :src="item.thumbImage" style="vertical-align: middle;width: auto;max-height: 200px;max-width: 100%;"/>
                                <span class="label-selected"></span>
                            </div>
                        </div>
                        <div class="video-con detail-con">
                            <h3 class="video-title" v-text="item.title"></h3>
                            <div class="push-info">
                                <img class="user-img" :src="item.headImg">
                                <span class="user-name" v-text="item.userName"></span>
                                <p class="secondary mui-pull-right" v-text="format_Date(item.createTime)"></p>
                            </div>
                        </div>
                        <div class="video-footer">
                            <div class="user-info">
                                <span class="secondary">浏览数：<span v-text="item.seeNum"></span></span>
                            </div>
                            <div class="operation-box" style="display: none" v-show="vshow && hasUser">
                                <span class="iconfont icon-shoucang" @click="collect()"  :class="{active:item.collect}"></span>
                                <span class="iconfont icon-comment" ></span>{{item.commentNum}}
                                <span class="iconfont icon-share" :data-img="item.thumbImage" :data-name="item.userName" :data-project="item.title" :data-url="item.videoUrl" :data-id="item.id"></span>
                                <span class="iconfont icon-zan" :class="{active:item.praise}" ></span>{{item.praiseNum}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pinlun" style="position: absolute;overflow: scroll;width:100% ;">
            <div class="index-comment" v-show="hasUser" style="padding: 10px 0px;width: 100%;">
                <div class="comment-list">
                    <div v-if="comments.length > 0">
                            <div v-for="(c,c_index) in comments" :key="c_index">
                                <div class="comment-list-item">
                                    <div class="comment-item-info">
                                        <img class="name user-header" :src="[c.commentUserIcon==null ? '../../../static/images/60x60.gif' : imgHost + c.commentUserIcon]" :data-a="c.commentUserId">
                                        <div class="user-info">
                                            <p class="name comment-item-author" :data-a="c.commentUserId">{{c.commentUserName}}</p>
                                            <span class="secondary" v-text="format_Date(c.createTime)"></span>
                                        </div>
                                    </div>
                                    <div class="comment-item-content sppd-left-con">
                                        <div class="content">
                                            <div v-if="c.replyUserId == null || c.replyUserId ==''">
                                                <label class="comment-content" :data-a="item.id" :data-b="c.commentUserId" :data-c="c.commentUserName" :data-cindex="c_index" style="white-space: pre-wrap;">{{c.commentContent}}</label>
                                            </div>
                                            <div v-else>回复
                                                <a class="name" :data-a="c.replyUserId">{{c.replyUserName}}：</a>
                                                <label class="comment-content" :data-b="c.commentUserId" :data-c="c.commentUserName" :data-cindex="c_index" style="white-space: pre-wrap;">{{c.commentContent}}</label>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <!--<p class="item" v-if="c.replyUserId == null || c.replyUserId ==''">
                                    <label  class="name" :data-a="c.commentUserId">{{c.commentUserName}}：</label>
                                    <label class="comment-content" :data-a="item.id" :data-b="c.commentUserId" :data-c="c.commentUserName" :data-cindex="c_index">{{c.commentContent}}</label>
                                </p>
                                <p class="item" v-else>
                                    <label class="name" :data-a="c.commentUserId">{{c.commentUserName}}</label>回复
                                    <label class="name" :data-a="c.replyUserId">{{c.replyUserName}}：</label>
                                    <label class="comment-content" :data-b="c.commentUserId" :data-c="c.commentUserName" :data-cindex="c_index">{{c.commentContent}}</label>
                                </p>-->
                            </div>
                    </div>
                    <div v-else>
                        <div style="width: 100%;height: 40px;text-align: center;position: relative">
                            <p class="no-group" style="font-size: 13px;">暂无最新评论</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
            <div>
                <!--<div style="position:fixed; width: 100%; height: 100%; background-color: #000; z-index: 99; opacity: 0.3" class="shade_box" :style="{display:comment_box_display}" ></div>-->
                <!--<div class="fixed-bottom group-chat" :style="{display:comment_box_display}" >
                    <div class="chat-input"><input v-model="send_content" id="commentIpt" type="text" :placeholder="comm_placeholder"/></div>
                    <button class="mui-btn chat-btn" @click="sendComment">发送</button>
                </div>-->
                <!--遮罩层-->
                <div class="mui-backdrop" style="display: none;z-index: 999;height: 100%;top: 0;" @click="hideInput()" :style="{display:comment_box_display}"></div>
                <!--评论输入框-->
                <div class="fixed-bottom group-chat comment-chat-input" style="display: none;z-index: 1000;-webkit-user-select:text;" :style="{display:comment_box_display}">
                    <div class="chat-input" style="-webkit-user-select:text;user-select:text;padding-top: 8px;" >
                        <!--<textarea style="min-height: 40px;resize: none;" type="text" placeholder="输入评论内容" value="评论输入框的内容可以折行，最多显示4行文字，再多就滑动"></textarea>-->
                        <div id="commentIpt" class="div-textarea" contenteditable="true" :placeholder="comm_placeholder"  style="-webkit-user-select:text;user-select:text;margin: 0;padding: 0;max-height: 88px;">
                            <!--<div v-if="comm_placeholder != ''">x
                                <span style="color: #ccc;" v-text="comm_placeholder"></span>
                            </div>-->
                        </div>
                    </div>
                    <button class="mui-btn mui-btn-primary chat-btn" @click="sendComment">发送</button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import setting from '../../../playform/config'
import {getParam,BackCookie} from '../../../playform/common'
export default {
    data () {
        return {
            href: window.location.href,
            comm_placeholder:"",
            comment_box_display:"none",
            send_content:"",
            imgHost:setting.UPLOAD_SERVER_ADDRESS,
            item:{
                commentNum: 0,
                title: ""
            },
            comments:[],
            vshow:false,
            hasUser:undefined == commentUserId || commentUserId == "" ?false:true,
            share_key:"SHARE_KEY",
            imageHost:"",
            cIndex: '',//点击回复/删除评论的数组下标
            infoIndex:'',//当前日志所在数组的下标
            replyUserName:'',//被回复的用户名称
            replyUserId:'',//被回复的用户id
            autoComment : map.autoComment===undefined ? false : true,//进入是否自动播放
            infoId : id,//当前评论的日志id
            id : map.id===undefined ? "" : map.id,//当前id
        }
    },
    created:function () {
        this.param = getParam(this.href);
        this.user_id = BackCookie.getCookie("userid");
        this.user_name = decodeURI(BackCookie.getCookie("username"));
	    this.getDetail(_self.initEvent);
    },
    methods: {
        po_Last_Div(that) {
            window.setTimeout(function () {
                var sel, range;
                if (window.getSelection && document.createRange) {
                    range = document.createRange();
                    range.selectNodeContents(that);
                    range.collapse(true);
                    range.setEnd(that, that.childNodes.length);
                    range.setStart(that, that.childNodes.length);
                    sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                } else if (document.body.createTextRange) {
                    range = document.body.createTextRange();
                    range.moveToElementText(that);
                    range.collapse(true);
                    range.select();
                }
                /*if(isApp){
                    appApi.showKeyboard()
                }*/
            }, 1)
        },
    	doPlay:function () {
		    var _self = this;
		    var obj = _self.$data.item;
		    if(isApp){
			    window.appApi.openVideo(window.location.href,obj.videoUrl,"视频详情",obj.thumbImage);
		    }else{
			    BackCookie.setCookie("videoUrl", obj.videoUrl);
			    window.appApi.openNewWindow(getPagePath() + "/community/play_video.html");
		    }
	    },
        initEvent:function () {
    		var _self = this;
        	/*if(autoPlay && isApp){
        		//自动播放
		        _self.doPlay();
	        }*/
        	if(autoComment){
        		//自动打开评论
		       // infoIndex = this.getAttribute("data-i");
		       setTimeout( infoApp.replyComment,500)
		        //appApi.showKeyboard();

	        }

            //绑定事件
	        mui.ready(function() {
		        if(!isApp){
			        mui(".device-flag")[0].classList.remove("mui-hidden");
			        mui(".device-flag")[1].classList.remove("mui-hidden");
		        }else{
			        document.getElementById("comment_list").style.paddingTop = "0px"
		        }
		        mui("#comment_list").on('tap','.icon-zan', function () {//绑定点赞事件
			        infoApp.clickPraise();
		        });
		        mui("#comment_list").on('tap','.log-header', function () {//绑定头像事件
			        infoApp.lookUserInfo();
		        });
		        mui("#comment_list").on('tap','.name', function () {//绑定评论姓名事件
			        var user_id = this.getAttribute("data-a");
			        infoApp.lookUserInfo(user_id);
		        });
		        mui("#comment_list").on('tap','.comment-content', function () {//绑定评论内容，点击回复
			        //infoId = this.getAttribute("data-a");
			        replyUserId = this.getAttribute("data-b");
			        replyUserName = this.getAttribute("data-c");
			        infoIndex = this.getAttribute("data-i");
			        cIndex = this.getAttribute("data-cindex");
			        infoApp.replyComment();

		        });
		        mui("#comment_list").on('tap','.icon-comment', function () {//绑定评论
			        //infoId = this.getAttribute("data-a");
			        infoIndex = this.getAttribute("data-i");
			        infoApp.replyComment();

		        });
		        mui("#comment_list").on('tap','.icon-share', function () {//绑定更多事件
			        var url = this.getAttribute("data-url");
			        var img = this.getAttribute("data-img");
			        var name = this.getAttribute("data-name");
			        var project = this.getAttribute("data-project");
			        if(project == undefined || project == ""){
				        project = "非项目视频"
			        }
			        var logo = getUrl() + "/static/images/app-logo.jpg";
			        if(img == undefined || img == ""){
			        	img = logo;
			        }
			        var id = this.getAttribute("data-id");
			        localStorage.setItem(share_key,SHARE_OPERATE.VIDEO_SHARE);
			        var shareUrl = getPagePath() + "/community/community_comment.html?id="+id;
			        appApi.shareVideo(0, name + "发布了一段工程项目的形象视频，赶快来看看吧", project, shareUrl, img, url,"视频详情", null);
		        });
		        mui("#comment_list").on('tap','.video-pic', function () {//绑定视频播放事件
			        _self.doPlay();
		        });
		        document.getElementById("comment_list").addEventListener("swipeup",function(){
			        _self.hideInput();
		        })
		        document.getElementById("comment_list").addEventListener("swipedown",function(){
			        _self.hideInput();
		        })
	        })
        },
        getDetail:function (callback) {
            var _self = this;
            //获取视频详情
	        axios.get(getUrl() + "/community/video/detail", {
		        params: {id:id}
	        }).then(function (response) {
		        if (response.data.code == 0) {
		            var rs = response.data.result;
			        _self.item = rs.item;
			        _self.comments = rs.comments;
			        _self.vshow = true;
			        if(callback) callback();
		        }else{
		            warm(response.data.message)
                }
	        }).catch(function (error) {
		        console.log(error);
	        });
        },
	    lookUserInfo:function (userId) {//查看用户资料
		    window.appApi.openNewWindow(getPagePath() + "/contacts/eg_details.html?userId="+userId);
	    },
	    clickPraise:function(){//点赞
	    	appApi.broadcast()
		    var v = infoApp.$data.item;
		    v.praise = !v.praise;
		    //v.seeNum = v.seeNum+1;
		    v.praiseNum = v.praiseNum + (v.praise ? 1:-1);
		    var param = new FormData();
		    param.append("id", v.id);
		    param.append("praise", v.praise);
		    axios.post(getUrl() + "/community/video/praise", param).then(function (response) {
			    console.info(response.data);
		    });
	    },
	    replyComment: function () {//回复/评论点击
		    var _self =  infoApp.$data;
		    console.info(replyUserId+"======="+commentUserId);
		    if(replyUserId==commentUserId  && cIndex != undefined){//自己的评论再次点击是删除
			    confirmLayer("是否删除该条评论？", function(){
				    layer.closeAll();
				    //组装请求参数
				    var param = new FormData();
				    var tid =  _self.comments[cIndex].id;
				    param.append("id",tid);
				    param.append("communityId", _self.item.id);
				    _self.comments.splice(cIndex, 1);
				    //删除子评论
				    /*var newArr = [];
				    for(var i =0;i<_self.comments.length;i++) {
					    if(_self.comments[i].id != tid && tid != _self.comments[i].replyId){
						    newArr.push(_self.comments[i])
					    }
				    }
				    _self.comments = newArr;*/
				    infoApp.initCommentParam();
				    axios.post(getUrl() + "/community/video/delcomment", param).then(function (resp) {
					    console.info(resp.data);
					    _self.item.commentNum = _self.item.commentNum - 1;
					    cIndex ="";
				    })
			    })
		    }else if(replyUserId && replyUserId != ""){//回复
//		    	var stopmove=document.getElementsByClassName("stopmove")[0];
//		    	stopmove.style.overflow="hidden";
			    _self.comment_box_display="block";
			    document.getElementById("commentIpt").innerText= "";
			    _self.comm_placeholder = "回复"+replyUserName+"：";
			    document.getElementById("commentIpt").focus();
//			    var commentIptq=document.getElementById("commentIpt");
//				     commentIptq.addEventListener('touchstart',function(){
//				        commentIptq.focus();                                       
//				})
			    po_Last_Div(document.getElementById("commentIpt"));
		    }else{//评论
//		    	var stopmove=document.getElementsByClassName("stopmove")[0];
//		    	stopmove.style.overflow="hidden";
			    _self.comment_box_display="block";
			    _self.comm_placeholder = "";
//			    document.getElementById("commentIpt").innerText= "";
			    infoApp.inputtext()
//			    document.getElementById("commentIpt").focus();
//			     var commentIptq=document.getElementById("commentIpt");
//				     commentIptq.addEventListener('touchstart',function(){
//				        commentIptq.focus();                                       
//				})
			    po_Last_Div(document.getElementById("commentIpt"));
		    }
	    },
	    inputtext:function(){
	    	var msgText =  document.getElementById("commentIpt");
	    	var pinmsdk=document.getElementsByClassName("pinlun")[0];
	    	pinmsdk.style.overflow="hidden"
			document.body.classList.add("addtext");
        	document.getElementsByTagName("html")[0].classList.add("addtext");
	    	$('.mui-backdrop').on("touchmove",function(e){
                e.preventDefault();
     		});
	    	msgText.addEventListener('tap',function () {
				var target=this
				
			setTimeout(function(){
				target.scrollIntoView(true)
			},100)
                // 光标移动到最后
                msgTextLastPos(msgText);
                // 获得输入框键盘焦点
                msgTextFocus(msgText);          
            })
	    	// 获得输入框键盘焦点
            var msgTextFocus = function(obj){
                obj.focus();
                setTimeout(function() {
                    obj.focus();
                }, 150);
            }
            // 光标移动到最后
            function msgTextLastPos(obj) {
                if (window.getSelection) {//ie11 10 9 ff safari
                    obj.focus(); //解决ff不获取焦点无法定位问题
                    var range = window.getSelection();//创建range
                    range.selectAllChildren(obj);//range 选择obj下所有子内容
                    range.collapseToEnd();//光标移至最后
                }
                else if (document.selection) {//ie10 9 8 7 6 5
                    var range = document.selection.createRange();//创建选择对象
                    range.moveToElementText(obj);//range定位到obj
                    range.collapse(false);//光标移至最后
                    range.select();
                }
            }
	    },
	    sendComment:function () {//发送评论信息
		    var _data = infoApp.$data;
		    var _self = this;
		    var msgText =  document.getElementById("commentIpt");
	    	var pinmsdk=document.getElementsByClassName("pinlun")[0];
	    	pinmsdk.style.overflow="auto"
			document.body.classList.remove("addtext");
        	document.getElementsByTagName("html")[0].classList.remove("addtext");
//		    _data.send_content = document.getElementById("commentIpt").innerText;
		    _data.send_content = document.getElementById("commentIpt").innerText;
		    var chat=document.getElementsByClassName("chat-btn")[0];
				     chat.addEventListener('touchstart',function(){
				        commentIptq.blur();                                       
				})
		    if(!_data.send_content || _data.send_content==""){
			    msg("评论内容不能为空！");
//			    var stopmove=document.getElementsByClassName("stopmove")[0];
//		    	stopmove.style.overflow="hidden";
			    return;
		    }
		    _data.comment_box_display="none";
		    var reId = undefined == cIndex || "" == cIndex   ? "":_data.comments[cIndex].id;
		    var comment_format = {
			    communityId:infoId,
			    commentUserId:commentUserId,
			    commentUserName:commentUserName,
			    replyId:reId,
			    replyUserId:replyUserId,
			    replyUserName:replyUserName,
			    commentContent:_data.send_content};//重置评论json
		    axios.post(getUrl() + "/community/video/savecomment", comment_format).then(function (resp) {
			    console.info(resp.data);
			    comment_format.id = resp.data.result;
			    if(_data.comments){
				    _data.comments = _data.comments.concat(comment_format);
			    }else{
				    _data.comments = [comment_format];
			    }
			    _self.item.commentNum = _self.item.commentNum + 1;
			    _self.getDetail(function () {
				    msg("评论成功")
				    _self.hideInput();
			    });
//			    var stopmove=document.getElementsByClassName("stopmove")[0];
//		    	stopmove.style.overflow="hidden";
		    	document.getElementById("commentIpt").innerText= "";
		    })
		    infoApp.initCommentParam();

	    },
	    format_Date: function (val) {//格式化时间
		    if(!val){
		    	return "";
		    }
		    return new Date(val).Format("yyyy-MM-dd hh:mm:ss ");
	    },
	    conductData:function (array) {//处理获取的列表数据
		    for(var i=0; i<array.length; i++){
			    console.info(array.length);
			    var s = array[i];
			    s.createTime = new Date(s.createTime).Format("yyyy-MM-dd hh:mm:ss");
			    s.userIcon = imageHost + s.userIcon;
			    var imgJson= JSON.parse(s.resourcesJ);
			    if(imgJson && imgJson != "" && imgJson.length > 0) {
				    var picIndex = 0;
				    var imgArray = [];
				    for (var j = 0; j < imgJson.length; j++) {
					    var im = imgJson[j];
					    im["picIndex"] = j;
					    im.url = imageHost + im.url;
					    var browsePic = {"src": im.url, "w": im.width, "h": im.height, "msrc": im.url, "el": {}};
					    imgArray.push(browsePic)
				    }
				    browseImageArray.push(imgArray);
			    }
			    s.resourcesJ = imgJson;
			    s.commentJ = JSON.parse(s.commentJ);
		    }
		    infoApp.$data.items = infoApp.$data.items.concat(array);
	    },
	    initCommentParam:function () {
		    //infoId = null;//当前评论的日志id
		    replyUserId = null;//被回复的用户id
		    replyUserName = null;//被回复的用户名称
		    infoIndex = null;//当前日志所在数组的下标
		    this.send_content="";
	    },
	    hideInput:function () {
		    var _self = this;
		    var msgText =  document.getElementById("commentIpt");
	    	var pinmsdk=document.getElementsByClassName("pinlun")[0];
	    	pinmsdk.style.overflow="auto"
			document.body.classList.remove("addtext");
        	document.getElementsByTagName("html")[0].classList.remove("addtext");
		    _self.$data.comment_box_display = "none";
		    //_self.$data.send_content = "";
		    _self.$data.comm_placeholder = "";
//		    document.getElementById("commentIpt").innerText = "";
//		     var stopmove=document.getElementsByClassName("stopmove")[0];
//		    	stopmove.style.overflow="hidden";
	    },
	    collect:function () {
		    var _self = this;
		    axios.get(getUrl() + "/collect/do?id=" + id +"&type=5" ).then(function (response) {
			    if (response.data.code == 4001) { // 收藏成功
				    _self.item.collect = true;
			    }else if(response.data.code == 4003){ //取消收藏
				    _self.item.collect = false;
			    }else{
				    msg(response.data.message);
			    }
			    layer.closeAll();
			    appApi.broadcast()
			    msg(response.data.message);
		    }).catch(function (error) {
			    layer.closeAll();
			    warm("收藏出错")
		    });
	    }
    }
}
</script>

<style scoped>
    *{
    	-webkit-user-select: auto;
        }
        body,html{
            position: relative;
            height: 100%;
            -webkit-user-select:text;
        }
        .fixed-bottom.group-chat{
            position: fixed;
            bottom: 0;
            
        }
        .chat-input input{
            width: 100%;
        }
        .pinlun{
            height: calc(100% - 100px);
            height:-webkit-calc(100% - 100px);
            top: 100px;
        }
        .video-item .video-con.detail-con{
            position: relative;
        }
        .group-chat .div-textarea{
            min-height: 26px;
            
        }
        .group-chat .chat-btn{
            height: 32px;
            right: 2px;
            bottom: 1px;
        }
        .video-list{
            /*height: 280px;*/
            overflow: hidden;
            position: fixed;
            z-index: 999;
            width: 100%;
            background: #fff;
        }
        .video-footer{
            display: block;
            height: 44px;
            position: relative;
        }
        .video-footer .user-info{
            float: left;
            line-height: 44px;
        }
        .video-footer .operation-box{
            float: right;
            line-height: 44px;
        }
        .video-item .video-pic img{
            margin: 0 auto;
        }
</style>
