<template>
  <div id="app">
    <header class="mui-bar mui-bar-nav">
		<h1 class="mui-title">修改密码</h1>
		<button class="mui-btn mui-btn-link mui-pull-left" @click="goback"><span class="mui-icon iconfont icon-back"></span>返回</button>
	</header>

	<section class="mui-content" id="backpwdform">
		<div class="register-form">
			<div class="mui-input-group">
				<div class="mui-input-row">
					<label class="text">旧密码</label>
					<input type="password" class="mui-input-clear mui-input" name="pwd" v-model="pwd" placeholder="请输入旧密码">
				</div>
				<div class="mui-input-row">
					<label class="text">新密码</label>
					<input type="password" class="mui-input-clear mui-input" name="newPwd" v-model="newPwd" placeholder="请输入新密码">
				</div>
				<div class="mui-input-row">
					<label class="text">再次输入新密码</label>
					<input type="password" class="mui-input-clear mui-input" name="newPwd2" v-model="newPwd2" placeholder="再次输入新密码">
				</div>
			</div>
			<button class="mui-btn mui-btn-block mui-btn-primary  reg-btn"  @click="resetpwd">修改密码</button>
			<!-- <p class="content-tips mui-text-center"><a @click="goback">返回登录页面</a></p> -->

			</div>
	</section>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data(){
        return{
			pwd:"",
			newPwd:"",
			newPwd2:"",
			userInfo:{}
        }
    },
    methods:{
        goback(){
            this.$router.go(-1);
		},
		resetpwd:function(){
            var _self = this;
            var userInfo = _self.userInfo;
            var userId = userInfo.userId;
            if(userId==""||userId==null||userId==undefined){
				// warm("获取不到您的用户信息！");
				Toast({
					message: '获取不到您的用户信息！',
					position: 'bottom',
					duration: 1000
				});
                return false;
			}
			var oldpwd = this.pwd;
			var newPwd = this.newPwd;
			var newPwd2 = this.newPwd2;
			if(oldpwd==""||oldpwd==null||oldpwd==undefined){
				// warm("请输入旧密码！");
				Toast({
					message: '请输入旧密码！',
					position: 'bottom',
					duration: 1000
				});
				return false;
			}
			if(newPwd==""||newPwd==null||newPwd==undefined){
				// warm("请输入新密码");
				Toast({
					message: '请输入新密码',
					position: 'bottom',
					duration: 1000
				});
				return false;
			}
			if(newPwd.length<6 || newPwd.length > 16){
				// warm("新密码必须为6-16位字符！");
				Toast({
					message: '新密码必须为6-16位字符！',
					position: 'bottom',
					duration: 1000
				});
				return false;
			}
			if(newPwd2==""||newPwd2==null||newPwd2==undefined){
				// warm("请再次输入新密码");
				Toast({
					message: '请再次输入新密码',
					position: 'bottom',
					duration: 1000
				});
				return false;
			}
			if(newPwd2!=newPwd){
				// warm("两次输入密码不一致！");
				Toast({
					message: '两次输入密码不一致！',
					position: 'bottom',
					duration: 1000
				});
				return false;
			}
			var jsondata={};
			jsondata["userId"] = userId;
			jsondata["pwd"] = oldpwd;
			jsondata["newPwd"] = newPwd;
			var param = JSON.stringify(jsondata);
			// showloading();
			// axios({
			// 	method:'post',
			// 	url:getUrl()+"/user_api/update_pwd",
			// 	data:param,
			// 	dataType: 'json',
			// 	headers: {'Content-Type': 'application/json;charset=UTF-8'}
			// }).then(function(resp) {
			// 	// clearloading();
			// 	// warm(resp.data.message);
			// 	Toast({
			// 		message: resp.data.message,
			// 		position: 'bottom',
			// 		duration: 1000
			// 	});
			// 	if(resp.data.code==0||resp.data.code=="0"){
			// 		_self.$http.post("/user_api/user_loginout").then(function (resp) {
			// 			if(appApi.isApp) {
			// 				window.appApi.relogin();
			// 			}else{
			// 				_self.$router.push({path:'/static/webstatic/register/login.html'});
			// 			}
			// 		}).catch(function (error) {
			// 			// console.info(error.date.message);
			// 			// remin(error.data.message);
			// 			Toast({
			// 				message: error.data.message,
			// 				position: 'bottom',
			// 				duration: 1000
			// 			});
			// 		});
			// 	}
			// }).catch(function(error){
			// 	// clearloading();
			// 	// warm(error);
			// 	Toast({
			// 		message: error,
			// 		position: 'bottom',
			// 		duration: 1000
			// 	});
			// });
			this.$http.post("/user_api/update_pwd",param,{headers:{'Content-Type':'application/json'}}).then(function(resp){
				Toast({
					message: resp.data.message,
					position: 'bottom',
					duration: 2000
				});
				if(resp.data.code==0||resp.data.code=="0"){
					_self.$http.post("/user_api/user_loginout").then(function (resp) {
						if(appApi.isApp) {
							window.appApi.relogin();
						}else{
							_self.$router.push({path:'/static/webstatic/register/login.html'});
						}
					}).catch(function (error) {
						// console.info(error.date.message);
						// remin(error.data.message);
						Toast({
							message: error.data.message,
							position: 'bottom',
							duration: 2000
						});
					});
				}
			}).catch(function(error){
				alert(data,111111111111111)
				Toast({
					message: error,
					position: 'bottom',
					duration: 1000
				});
			})
		}
    },
    created: function () {
        var _self = this;
        //延迟0.5秒，兼容IOS
        setTimeout(function(){
            if (appApi.isApp && appApi.isIphoneOs) {//IOS
                window.appApi.getUserInfo();
            } else if (appApi.isApp && appApi.isAndroid) {
                var userInfoAndroid = window.appApi.getUserInfo();
                _self.userInfo = JSON.parse(userInfoAndroid);
                //alert(_self.userInfo.userId);
            } else {
                console.info("设备不支持");
            }
        },500)
    },
}
</script>
<style type="text/css" scoped>
    @import "../../assets/css/common/style.less";
    @import "../../assets/css/common/layer.less";
	.register-form{
		background: #fff;
  		margin-top: 0;
	}
</style>
