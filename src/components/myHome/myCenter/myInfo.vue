<template>
	<div id="my_info">
		<header class="mui-bar mui-bar-nav">
			<button @click="goBack" id="btn-referrer" class="mui-action-back mui-btn mui-btn-link mui-btn-nav mui-pull-left ">
				<span class="mui-icon mui-icon-back"></span>返回
			</button>
			<h1 class="mui-title">个人信息</h1>
			<a href="javascript:;" id="save_btn" @click="save" class="mui-btn mui-btn-link mui-pull-right mui-hidden">保存</a>
		</header>
		<section class="mui-content mycenter-content" id="">
			<ul name="need_hide_div" class="mui-table-view eg-table-view eg-detail-list show-table-view">
				<li class="mui-table-view-cell my-header-pic">
					<label>头像</label>
					<span class="mui-badge mui-badge-inverted">
						<img class="" @click.stop="disposeLogImg(0,user.smallImg)" v-bind:src ="user.uImg" id="logoImg" />
					</span>
					<input type="file" style="width: 80%" id="upfile" accept="image/png,image/gif,image/jpeg" onclick="window.webactivity.setInputType(1);">
				</li>

				<li class="mui-table-view-cell"><label>姓名</label><span class="mui-badge mui-badge-inverted" v-text="user.uName"></span></li>
				<li class="mui-table-view-cell" @click="openPopover()">
					<label>手机号码</label><span class="mui-badge mui-badge-inverted" v-text="user.phoneNum"></span>
					<mt-popup v-model="popupVisible"  position="bottom">
						<div id="updatePhone" class="popup_bottom">
							<ul class="mui-table-view">
								<li class="mui-table-view-cell">
									<a href="javascript:;" @click="updatePhone()">更换手机号</a>
								</li>
							</ul>
							<ul class="mui-table-view">
								<li class="mui-table-view-cell">
									<a href="#updatePhone"><b>取消</b></a>
								</li>
							</ul>
						</div>
					</mt-popup>
				</li>
				<li class="mui-table-view-cell" @click="openEmailEdit"><label>邮箱</label><span class="mui-badge mui-badge-inverted" v-text="user.email"></span></li>
				<li class="mui-table-view-cell"><label>身份证号</label><span class="mui-badge mui-badge-inverted" v-text="auth"></span></li>
				<li class="mui-table-view-cell" @click="mycode"><label>二维码名片</label><span class="mui-badge mui-badge-inverted"><span class="mui-icon iconfont icon-code"></span></span>
				</li>
				<li class="mui-table-view-cell"><label>性别</label><span class="mui-badge mui-badge-inverted" v-text="sex"></span></li>
				<li class="mui-table-view-cell" id="addrSelect">
					 <!-- <label>地区</label> -->
					<!-- <span class="mui-badge mui-badge-inverted" v-text="user.areaInfo"></span>  -->
					<area-bar :title="returntitle" :areatype="areatype" @toParent="childValue"  ></area-bar>
				</li>
				<li class="mui-table-view-cell" @click="openAddEdit"><label>详细地址</label><span class="mui-badge mui-badge-inverted" v-text="user.addrInfo"></span></li>
			</ul>
			<div class="textarea-box">
				<div class="mui-input-row">
					<textarea placeholder="我的特长" v-text="user.speciality" @focus="showSave" @change="updateSpeciality" @keyup='keydown'></textarea>
				</div>
				<div class="mui-input-row">
					<textarea placeholder="个人简介" @change="updateUserIntro" @focus="showSave" @keyup='keydown' v-text="user.userIntro"></textarea>
				</div>
			</div>

		</section>
		<div class="mui-backdrop" id="cover" onClick="javascript:coverClick()" style="display: none"></div>
		<!-- <div id="updatePhone" class="mui-popover mui-popover-action mui-popover-bottom">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<a href="javascript:;" onclick="mycenter.updatePhone()">更换手机号</a>
				</li>
			</ul>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<a href="#updatePhone"><b>取消</b></a>
				</li>
			</ul>
		</div> -->
	</div>
</template>

<script>
	import { BackCookie } from '../../../playform/common.js'
	import { Picker } from 'mint-ui';
	import myaddress from "../../project/js/city";
	import areaBar from "../../common/areaBar"
	import tipApi from "../../../playform/tipApi.js"
	export default {
		 components: {
            'mt-picker': Picker,
            areaBar,
        },
        props: {
        },
		data() {
			return {
				//  solt: [
                //     {
                //         flex: 1,
                //         defaultIndex: 1,        
                //         values: Object.keys(myaddress),    //省份数组
                //         className: 'slot1',
                //         textAlign: 'center'
                //     }, {
                //         divider: true,
                //         content: '-',
                //         className: 'slot2'
                //     }, {
                //         flex: 1,
                //         values: [],
                //         className: 'slot3',
                //         textAlign: 'center'
                //     },
                //     {
                //         divider: true,
                //         content: '-',
                //         className: 'slot4'
                //     },
                //     {
                //         flex: 1,
                //         values: [],
                //         className: 'slot5',
                //         textAlign: 'center'
                //     }
                // ],
				returntitle:"地区",
				areatype:"1",
				popupVisible:false,
				user: {},
				sex: "",
				auth: "未认证",
				areas: [],
			}
		},
		mounted() {

			function openWindow(url) {
				window.appApi.openNewWindow(url);
			}

			// function openDialog(title, desc, value, fun) {
			// 	var btnArray = ['取消', '确认'];
			// 	// mui.prompt(desc, value, title, btnArray, fun);
			// 	// mui(".mui-popup-input input")[0].value = value;
			// }

			// function initAddr() {

			// 	var showCityPickerButton = document.getElementById('addrSelect');
			// 	showCityPickerButton.addEventListener('tap', function(event) {
			// 		//地区初始化
			// 		var cityPicker = new mui.PopPicker({
			// 			layer: 2
			// 		});
			// 		cityPicker.setData(mycenter.$data.areas);
			// 		cityPicker.show(function(items) {
			// 			if(undefined != items[0] && items[1] != undefined && undefined != items[0].text && undefined != items[1].text) {
			// 				mycenter.updateInfo({
			// 					provinceId: items[0].value,
			// 					cityId: items[1].value
			// 				});
			// 				mycenter.$data.user.areaInfo = items[0].text + "-" + items[1].text;
			// 			}
			// 			cityPicker.dispose();
			// 		});

			// 	}, false);

			// }

			function initSex() {
				var userPicker = new mui.PopPicker();
				userPicker.setData([{
					value: true,
					text: "男"
				}, {
					value: false,
					text: "女"
				}]);
				var showUserPickerButton = document.getElementById('sexSelect');
				showUserPickerButton.addEventListener('tap', function(event) {
					userPicker.show(function(items) {
						mycenter.updateInfo({
							uSex: items[0].value
						});
						mycenter.$data.sex = items[0].text;
					});
				}, false);
			}

			function updateSpeciality(cur) {
				//更新特长
				var val = cur.value;
				if(val && val.length > 255) {
					msg("我的特长信息输入太长");
					return false;
				}
				if(val == "") {
					return;
				}
				mycenter.updateInfo({
					speciality: val
				});
				mycenter.$data.user.speciality = val;
			}

			function updateUserIntro(cur) {
				//更新个人简介
				var val = cur.value;
				if(val && val.length > 255) {
					msg("我的个人简介输入太长");
					return false;
				}
				if(val == "") {
					return;
				}
				mycenter.updateInfo({
					userIntro: val
				});
				mycenter.$data.user.userIntro = val;
			}

			function showSave() {
				document.getElementById("save_btn").classList.remove("mui-hidden");
			}

			function save() {
				document.getElementById("save_btn").classList.add("mui-hidden");
			}
			document.getElementById("upfile").addEventListener('change', function() {
				var imgFile = document.getElementById("upfile");
				if(imgFile == null || imgFile == "") {
					warm("照片不能为空");
					return;
				}
				uploadHeadImg(imgFile)
			});

			function uploadHeadImg(imgFile) {
				loading("请稍后...")
				//拍照角度矫正
				selectFileImage(imgFile);
				setTimeout(function() {
					var file = imgFile.files['0'];
					if(!file) {
						fileBase64 = "";
					}
					var params = new FormData();
					params.append("imgData", fileBase64);
					params.append("imageName", file.name);
					params.append("width", 96);
					params.append("height", 96);
					this.$http.post("/user_api/upload_user_base64icon", params).then(function(response) {

						if(response.data.code == 0) {
							var map = response.data.result;
							msg("上传成功");
							window.appApi.updateUserInfo("", map.userIcon);
							setTimeout(function() {
								appApi.broadcast("reLoad()"); //刷新页面
								appApi.closeNewWindow();
							}, 1500)
						} else {
							msg("上传失败")
							setTimeout(function() {
								layer.closeAll();
							}, 1500);
						}

					}).catch(function(error) {
						console.info(error);
					});

				}, 1800);

			}
		},
		created: function() {
			appApi.hideMenu();
			var _self = this;
			this.$http.post("/user_api/find_login_user").then(function(response) {
				var info = response.data.result;
				console.log("用户信息", info)
				_self.$data.user = info.userInfo;
				if(info.userInfo.uSex) {
					_self.$data.sex = "男";
				} else if(!info.userInfo.uSex) {
					_self.$data.sex = "女";
				} else {
					_self.$data.sex = "未设置";
				}
				if(info.userInfo.authenticationStatus == "0") {
					_self.$data.auth = "未认证";
				} else if(info.userInfo.authenticationStatus == "1") {
					_self.$data.auth = "认证中";
				} else if(info.userInfo.authenticationStatus == "2") {
					_self.$data.auth = "已认证";
				} else {
					_self.$data.auth = "认证失败";
				}

				/**
				 * 如果没有二维码，则创建一个用户的二维码(为保证进入二维码页面显示正常) 2017.12.4
				 */
				if(!info.userInfo.userQrUrl) {
					this.$http.post( "/user_api/user_code_card").then(function(response) {

					}).catch(function(error) {
						console.info(error);
					});
				}
				setTimeout(function() {
					// initImgPreview();
					appApi.imgPreview.init();
				}, 150)

			}).catch(function(error) {
				console.info(error);
			});
			this.$http.post("/common_api/area_list").then(function(response) {
				_self.$data.areas = response.data.result;
				// _self.initAddr();
			}).catch(function(error) {
				console.info(error);
			});
			appApi.imgPreview.init();
		},
		methods: {
			 goBack(){
				this.$router.go(-1)
			},
			save:function() {
				document.getElementById("save_btn").classList.add("mui-hidden");
			},
			keydown:function(){
				var val=event.target.value
				if (val.length>=255){
					// event.returnValue=false
				}
			},
			updateUserIntro:function() {
				//更新个人简介
				var cur=event.target
				var val = cur.value;
				if(val && val.length > 255) {
					alert("我的个人简介输入太长");
					return false;
				}
				if(val == "") {
					return;
				}
				this.updateInfo({
					userIntro: val
				});
				this.user.userIntro = val;
			},
			updateSpeciality:function() {
				//更新特长
					var cur=event.target
					var val = cur.value;
					if(val && val.length > 255){
						alert("我的特长信息输入太长");
						return false;
					}
					if(val == ""){
						return;
					}
					this.updateInfo({speciality:val});
					this.user.speciality = val;
			},
			showSave:function() {
				document.getElementById("save_btn").classList.remove("mui-hidden");
			},
			openAddEdit:function(){
				var _self = this;
				var fun = function(e) {
					var val = e;
					if(val && val.length > 255) {
						alert("详细地址输入太长");
						return false;
					}
					if(val == "") {
						return;
					}
					_self.updateInfo({
						addrInfo: val
					});
					_self.user.addrInfo = val;
				}
				tipApi.openChange('详细地址修改','请输入您的详细地址',_self.user.addrInfo,'取消','确定',function(value){
					// _self.user.addrInfo=value
					fun(value)
				})
			},
			openEmailEdit:function(){

				var _self = this;
				var fun = function(e) {
					var val = e;
					if(val == "") {
						return;
					}
					if(!validator.IsEmail(val)) {
						alert("邮箱地址输入不正确")
						return false;
					}

					_self.updateInfo({
						email: val
					});
					_self.user.email = val;
				}
				// openDialog("邮箱修改", "请输入您的邮箱", _self.$data.user.email, fun)

				tipApi.openChange('邮箱修改','请输入您的邮箱',_self.user.email,'取消','确定',function(value){
					// _self.user.email=value
					fun(value)
				})
			},
			childValue:function(val){
                console.log("value"+val)
                // this.test=val;
            },
			mycode:function(){
				this.$router.push({path:"/static/webstatic/mycenter/my_codecard.html"})
			},
			openPopover: function() {
				this.popupVisible=!this.popupVisible
				// mui('#updatePhone').popover('toggle');
				//		    mycenter.backdropClick()
			},
			//	    backdropClick: function () {
			//		    Const.valid.zyshow = false
			//		    Const.valid.backdropshow = false;
			//		    Const.valid.homepageshow = false;
			//		    appApi.setPullRefresh(true);
			//		    document.getElementsByTagName("html")[0].setAttribute("style","overflow:")
			//		    document.body.setAttribute("style","overflow:")
			//		},
			disposeLogImg: function(index, longurl) {
				console.log(longurl)
				var _self = this;
				var imgsData = [];

				imgsData.push(longurl);

				appApi.imgPreview.open(index, imgsData);
			},
			// openEmailEdit: function() {
			// 	var _self = this;
			// 	var fun = function(e) {
			// 		var val = e.value;
			// 		if(val == "") {
			// 			return;
			// 		}
			// 		if(!validator.IsEmail(val)) {
			// 			msg("邮箱地址输入不正确")
			// 			return false;
			// 		}

			// 		_self.updateInfo({
			// 			email: val
			// 		});
			// 		_self.user.email = val;
			// 	}
			// 	// openDialog("邮箱修改", "请输入您的邮箱", _self.$data.user.email, fun)
			// 	tipApi.openChange('邮箱修改','请输入您的邮箱',_self.user.email,'取消','确定',function(value){
			// 		_self.user.email=value
			// 		fun()
			// 	})
			// },
			updatePhone: function() {
				var _self = this;
				// location.href = "../register/change_phone.html";
				this.$router.push({path:'/register/change_phone.html'})
			},
			updateInfo: function(obj) {
				this.$http.post("/user_api/update_user_info", obj).then(function(resp) {
					//如果修改是姓名，则更新用户在android的用户信息
					if(obj.uName) {
						window.appApi.updateUserInfo(obj.uName, "");
					}
				}).catch(function(error) {
					console.info(error.message);
					//remin(resp.data.message);
				});
			}
		}
	}
</script>

<style >
.mui-bar-nav ~ .mui-content {
    padding-top: 44px;
}
.show-table-view .mui-table-view-cell label{
	text-align: left;
}
.popup_bottom,.mint-popup{
	width: 100%;
	background: none;
}
.popup_bottom .mui-table-view{
	margin: 8px;
	border-radius: 5px;
}
.popup_bottom .mui-table-view:before,.popup_bottom .mui-table-view:after{
	height: 0;
}
#addrSelect .mui-navigate-right label{
    text-align: left;
}
#addrSelect{
	padding: 0;
	height: 51px;
}
#addrSelect .mui-navigate-right input{
	text-align: right;
	height: 51px;
	width: 55%
}
</style>