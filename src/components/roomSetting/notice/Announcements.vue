<!--
  describe：发布公告
  created by：张绍武
  date：2018-06-04
-->
<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
			<h1 class="mui-title">发布公告</h1>
			<button id="btn-referrer"
				class="mui-btn mui-btn-link mui-btn-nav mui-pull-left" @click="goback">
				<a class="mui-action-back mui-icon iconfont icon-back"></a>
			</button>
			<button style="display: block;"
				class="mui-btn mui-btn-primary mui-pull-right" @click="submitData()">发布</button>
		</header>
        <section class="mui-content publish-box">
			<div class="textarea-box">
				<div class="mui-input-row">
					<textarea rows="6" placeholder="请输入公告的内容..." v-model="content"
						autofocus></textarea>
				</div>
			</div>
			<div class="publish-container">
				<div class="title text">图片</div>
				<ul class="container-average container-average-img">
					<div v-for="(img,number) in imgSrcs" :key="number">
					<li class="img-item">
						<div class="img-item-inner">
							<img v-bind:src="img">
						</div> <span class="btn-roll btn-delete iconfont icon-delete"
						@click="deleteFile(number,'img')"></span>
					</li>
					</div>
					<li class="upload-btn">
						<div class="img-item-inner mui-icon mui-icon-plusempty">
							<input id="img" v-on:change="upfile($event)" type="file">
						</div>
					</li>

				</ul>
			</div>
			<div class="publish-container">
				<div class="title text">附件</div>
				<ul
					class="mui-table-view mui-table-view-striped container-average container-file">
					<div v-for="(pic,number) in picNames" :key="number">
					<li class="mui-table-view-cell"><span
						class="btn-roll btn-delete iconfont icon-delete"
						@click="deleteFile(number,'pic')"></span>
						<div class="oa-contact-cell mui-table">
							<div class="oa-contact-avatar mui-table-cell">
								<span v-bind:class="['my-list-icon',pic.icon_class]"></span>
							</div>
							<div class="oa-contact-content mui-table-cell">
								<h4 class="oa-contact-name" v-text="pic.name"></h4>
								<p class="oa-contact-email">
									<span v-text="pic.size"></span>
								</p>
							</div>
						</div></li>
					</div>
					<!-- <li class="mui-table-view-cell">
						<span class="btn-roll btn-delete iconfont icon-delete"></span>
						<div class="oa-contact-cell mui-table">
							<div class="oa-contact-avatar mui-table-cell">
								<span class="my-list-icon label-zip"></span>
							</div>
							<div class="oa-contact-content mui-table-cell">
								<h4 class="oa-contact-name">需求文档压缩包.zip</h4>
								<p class="oa-contact-email"><span>12M</span></p>
							</div>
						</div>
					</li> -->
					<li class="upload-btn">
						<div class="img-item-inner mui-icon mui-icon-plusempty">
							<input id="pic" v-on:change="upfile($event)" type="file">
						</div>
					</li>
				</ul>
				<!--管理员可以选择公告的发送类型:本群公告或者项目公告；如果是发送项目公告则需要添加公告的接收方-->
				<ul class="mui-table-view eg-table-view">
					<li class="mui-table-view-cell"><a class="mui-navigate-right"
						href="#"> <label>公告类型</label><span @click="showType()"
							v-text="typeName" class="con"></span>
					</a></li>
				</ul>

				<div id="selectdRoom" class="publish-container"
					style="display: none;">
					<div class="title">发布到</div>
					<ul
						class="mui-table-view mui-table-view-striped container-average address-item">
						<div v-for="(room,number) in rooms" :key="number">
						<li class="mui-table-view-cell"><span
							class="btn-roll btn-delete iconfont icon-delete"
							@click="deleteRoom(number)"></span>
							<div class="oa-contact-cell mui-table">
								<div class="oa-contact-avatar mui-table-cell">
									<span class="oa-pic-default bgr5 p-label">{{room.roomClassName|getRoomClassNameHeader}}</span>
								</div>
								<div class="oa-contact-content mui-table-cell">
									<h4 class="oa-contact-name" v-text="room.roomClassName"></h4>
									<p class="oa-contact-email" v-text="room.roomName"></p>
								</div>
							</div></li>
						</div>
						<!--
						<li class="mui-table-view-cell"><span
							class="btn-roll btn-delete iconfont icon-delete"></span>
							<div class="oa-contact-cell mui-table">
								<div class="oa-contact-avatar mui-table-cell">
									<span class="oa-pic-default bgr5 p-label">勘</span>
								</div>
								<div class="oa-contact-content mui-table-cell">
									<h4 class="oa-contact-name">勘察单位</h4>
									<p class="oa-contact-email">匠心科技</p>
								</div>
							</div></li>
						<li class="mui-table-view-cell"><span
							class="btn-roll btn-delete iconfont icon-delete"></span>
							<div class="mui-slider-cell">
								<div class="oa-contact-cell mui-table">
									<div class="oa-contact-avatar mui-table-cell">
										<span class="oa-pic-default bgr5 p-label">设</span>
									</div>
									<div class="oa-contact-content mui-table-cell">
										<h4 class="oa-contact-name">设计单位</h4>
										<p class="oa-contact-email">中南设计</p>
									</div>
								</div>
							</div></li> -->
						<li class="upload-btn">
							<div @click="showSelectdRoom()"
								class="img-item-inner mui-icon mui-icon-plusempty">
								<input style="display: none;" type="file" readonly="readonly">
							</div>
						</li>
					</ul>
				</div>
				<!--<ul class="mui-table-view eg-table-view">
				<li class="mui-table-view-cell">
		         	<label>公告类型</label><span class="con">本群公告</span>
		        </li>
            </ul>-->
			</div>
		</section>
        <!--遮罩层-->
		<div class="mui-backdrop" style="display: none; z-index: 999;"></div>

		<!--公告类型  -->
		<div id="noticeType" class="mui-popup mui-popup-in"
			style="display: none;">
			<ul class="mui-popup-content mui-table-view eg-table-view">
				<li class="mui-table-view-cell" @click="selectdType(1)">本群公告</li>
				<li class="mui-table-view-cell" @click="selectdType(0)">项目公告</li>
			</ul>
		</div>


		<!--上传图片-->
		<div class="mui-popup mui-popup-in" style="display: none;">
			<ul class="mui-popup-content mui-table-view eg-table-view">
				<li class="mui-table-view-cell">拍照</li>
				<li class="mui-table-view-cell">手机相册</li>
			</ul>
		</div>
    </div>
</template>

<script>
import {getParam,BackCookie} from '../../../playform/common'
export default {
    data(){
        return{
            href: window.location.href,
            rooms : [],
            imgs : [],
            imgSrcs : [],
            pics : [],
            picNames : [],
            content : "",
            type : "1",
            typeName : "本群公告",
            param:{},
            user_id:'',
            user_icon: '',
        }
    },
    created(){
        this.param = getParam(this.href);
        this.user_id = BackCookie.getCookie("userid");
        this.user_icon = BackCookie.getCookie("user_icon");
        this.user_name = decodeURI(BackCookie.getCookie("username"))
    },
    //过滤器定义区
    filters: {
        //获取单位第一个字
        getRoomClassNameHeader(value){
            return value.substring(0,1);
        }
    },
    methods : {
        goback(){
            this.$router.go(-1)
        },
        //删除选择的房间
        deleteRoom(index){
            var _self = this;
            _self.$data.rooms.splice(index,1)
        },
        //选择房间
        selctdRooms(content){
            var _self = this;
            _self.$data.rooms=JSON.parse(content.result)
            //alert(JSON.stringify(content.result))
            console.log(content)
        },
        //点击遮罩层
        mask() {
            document.getElementsByClassName(".mui-backdrop").css("display", "none")
            document.getElementsByClassName(".mui-backdrop").animate({
                left : "0%"
            })
            document.getElementsByClassName("#noticeType").hide();
        },
        //打开选择房间页面
        showSelectdRoom(){
            window.appApi.openProjectContactSelectPage(this.param_map.projectSn, '', this.param_map.isRoomCreditCode, 3, true)
        },
        //展现公告类型
        showType() {
            if(this.param_map.loginType==1){  //权限控制  管理员才能选择
                document.getElementsByClassName(".mui-backdrop").show();
                document.getElementsByClassName("#noticeType").show();
            }
        },
        //选择公告类型
        selectdType(type) {
            console.log(type);
            var _self = this;
            if (type == 1){
                _self.typeName = "本群公告"
                    document.getElementsByClassName("#selectdRoom").slideUp("slow")
            }else{
                document.getElementsByClassName("#selectdRoom").slideDown("slow")
                _self.typeName = "项目公告"
            }
            _self.type = type;
            _self.mask();
        },
        //发布公告
        submitData () {
            var _self = this;
            if(_self.content==""){
                alert("请填写公告内容！");
                return false;
            }
            var param = {
                attachmen : _self.imgs.toString()+"|"+_self.pics.toString(), //合并图片和附件数组
                isRoomId : this.param_map.isRoomId,
                toImIds : [],
                content : _self.content,
                type : _self.type,
                userIcon : this.user_icon,
                userId : this.user_id,
                userName : this.user_name,
                roomIds : [],
                projectSn : this.param_map.projectSn,
                projectName : this.param_map.projectName,
            }
            //获取消息接收方
            if(_self.type == 1){
                param.toImIds.push(this.param_map.currRoomImId)
                param.roomIds.push(this.param_map.isRoomId)
            }else{
                _self.$data.rooms.forEach(function(v){
                    param.toImIds.push(v.roomImId)
                    param.roomIds.push(v.roomId)
                })
            }
            this.$http.post("/notice_api/save_notice", param).then(function(response) {
                        console.log(response)
                        if (response.data.code == 200) {
                            console.log(response)
                            var content =_self.$data.content.substring(0,20);
                            var todojson = {
                                "title" : decodeURI(user_name)+"发布的公告",
                                "titileTwo" : this.param_map.currRoomClassName + "-" + this.param_map.currRoomName,
                                "content" : content,
                                "fileCount" : "0", //_self.$data.imgs.length+_self.$data.pics.length,
                                "url" : 'http://java.winfreeinfo.com/static/newwebstatic/gonggao/gonggao_detail.html?id='
                                        + response.data.result.id,
                                "colorString" : "",
                                "todoViewableMember" : "0",
                                "toImId" : param.toImIds
                                        .toString(),
                                "formuserid" : this.user_id,
                                "currentRoomImid" : this.param_map.currRoomImId,
                                "chatType" : "2",
                                "relation" : response.data.result.docId,
                                //"score" : "", //评分待办必要参数，设置分数
                                //"confirmUrl" : "456", //有确认按钮必要参数
                                //"refusedUrl" : "231", //有拒绝按钮必要参数
                                "todoType" : "3", //1评分待办，生成带有确认按钮待办，生成带有确认拒绝待办，必要参数
                                "setButton" : [ {
                                    "type" : 2, //按钮点击类型 1=请求url 2=打开url
                                    "name" : "查看",
                                    "url" :'http://java.winfreeinfo.com/static/newwebstatic/gonggao/gonggao_detail.html?id='
                                        + response.data.result.id
                                }]
                            }
                            //alert(JSON.stringify(todojson))
                            window.appApi.sendTodo(todojson,function(d){
                                if(d.code==200){
                                    remin("提交成功",2,function(){
                                        window.appApi.closeNewWindow()
                                    })
                                }
                                
                            })

                        } else {
                            //msg("获取云盘目录信息失败")
                        }
                    })
            //alert(JSON.stringify(param))
        },
        //删除文件
        deleteFile (index, type) {
            var _self = this;
            if (type == "pic") {
                _self.$data.picNames.splice(index, 1)
                _self.$data.pics.splice(index, 1)
            } else if (type == "img") {
                _self.$data.imgSrcs.splice(index, 1)
                _self.$data.imgs.splice(index, 1)
            }
            console.log(_self.$data.picNames);
            console.log(_self.$data.pics);
            console.log(_self.$data.imgSrcs.toString());
            console.log(_self.$data.imgs);
        },
        //上传文件
        upfile (event) {
            console.log(event);
            sessionStorage.removeItem("cunnews")
            var _self = this
            let fileSize = ''
            var file = document.getElementById(event.target.id).files;
            var zrid = document.getElementById(event.target.id)
                    .getAttribute("id")
            var url = "http://java.winfreeinfo.com/sass_api/upload_file";
            var form = new FormData();
            for (var i = 0; i < file.length; i++) {
                form.append("file", file[i]);
                //读取图片数据
                var f = document
                        .getElementById(event.target.id).files[i];
                var imgtype = f.type.split('/')[0]
                if (zrid == "img") {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var data = e.target.result;
                        //加载图片获取图片真实宽度和高度
                        var image = new Image();
                        image.onload = function() {
                            let width = image.width;
                            let height = image.height;

                        };
                        image.src = data;
                        _self.$data.imgSrcs.push(image.src)
                    };
                    sessionStorage.setItem("cunnews", "1")
                    reader.readAsDataURL(f);
                } else if (zrid == "pic") {
                    sessionStorage.setItem("cunnews", "2")

                    var file_size = 0; //文件大小
                    var icon_class = ""; //文件对应样式
                    var file_suffix = "";

                    //计算文件大小
                    if (file.size > 1024 * 1024)
                        fileSize = (Math.round(f.size * 100
                                / (1024 * 1024)) / 100)
                                .toString()
                                + 'MB';
                    else
                        fileSize = (Math
                                .round(f.size * 100 / 1024) / 100)
                                .toString()
                                + 'KB';

                    //设置对应图标样式
                    file_suffix = f.name.substring(f.name
                            .lastIndexOf(".") + 1);
                    icon_class = "label-" + file_suffix;
                    _self.$data.picNames.push({
                        name : f.name,
                        size : fileSize,
                        icon_class : icon_class
                    })
                }
                //							reader.readAsDataURL(f);

            }
            if (sessionStorage.getItem("cunnews") == '1') {
                form.append("type", "1");
            } else {
                form.append("type", "2");
            }
            form.append("module", "notice");
            form.append("userid", this.user_id);
            let xhr = new XMLHttpRequest();
            xhr.open("post", url, true);
            xhr.onload = function(evt) {
                //请求完成
                var data = JSON.parse(evt.target.responseText);
                if (sessionStorage.getItem("cunnews") == '1') {
                    _self.$data.imgs.push(data.result.success)
                    console.log("图片文件:"
                            + _self.$data.imgs.toString())
                } else {
                    _self.$data.pics.push(data.result.success)
                    console.log("附件文件:"
                            + _self.$data.pics.toString())
                }
            };
            xhr.onerror = function(evt) {
                //请求失败
                var data = JSON.parse(evt.target.responseText);
                console.log(data);
            };
            xhr.send(form);

        }
    }
}
</script>

<style>
    .text{
        text-align: left
    }
</style>
