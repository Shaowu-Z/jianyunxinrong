<template>
  <div id='app'>
      <header class="mui-bar mui-bar-nav">
		<h1 class="mui-title">账号注册</h1>
	</header>

	<section class="mui-content" id="login-register">
		<div class="register-form">
			<form class="mui-input-group" id="registerform">
				<div class="mui-input-row">
					<label>手机号</label>
					<input type="text" class="mui-input-clear mui-input" name="certCode" id="phonenum" placeholder="请输入手机号" ref="phone">
				</div>
				<div class="mui-input-row input-yanzm">
					<label>验证码</label>
					<input type="text" class="mui-input-clear mui-input" name="captcha" id="" placeholder="请输入验证码">
					<button type="button" class="mui-btn mui-btn-link btn-yanzm"  id="msgbutton" @click="sendvcode">获取验证码</button>
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input type="password" class="mui-input-clear mui-input" name="pwd" placeholder="请输入密码">
					<input type="hidden" name="certType">
					<input type="hidden" name="eventId" id="eventId">
				</div>
			</form>
			<!--<button class="mui-btn mui-btn-block mui-btn-primary  reg-btn" onclick="login_register.subReg()">注册</button>-->
			<!--&lt;!&ndash;<p class="content-tips mui-text-center">点击确定即表示已阅读并同意<a href="#">《Eg服务协议》</a></p>&ndash;&gt;-->
			<!--<div class="other-style">
				<div class="more-title"><span class="title">使用其他方式注册</span></div>
				<div class="mui-table">
					<div class="mui-table-cell mui-text-center invita-style">
						<a href="#"><img src="../../images/weix.png"></a>
					</div>
					<div class="mui-table-cell mui-text-center invita-style">
						<a href="#"><img src="../../images/qq.png"></a>
					</div>
				</div>
			</div>-->
			<button class="mui-btn mui-btn-block mui-btn-primary reg-btn" @click="subReg">注&nbsp;&nbsp;&nbsp;&nbsp;册</button>
			<p class="content-tips mui-text-center">开始使用建云信融即表示您同意协议<br/>
				<a @click="agreement">《服务协议》</a>和<a @click="policy">《隐私政策》</a>
			</p>
			<p class="to-login">已有账号？<a @click="goback">直接登录</a></p>
			<!--<p class="content-tips mui-text-center"><a href="login.html">已有账号?直接登录</a></p>-->
		</div>
	</section>
  </div>
</template>

<script>
export default {
    data(){
        return {
			params: '',
        }
    },
    methods:{
        goback(){
            this.$router.go(-1);
        },
        agreement() {
            this.$router.push('/login/serviceAgreement');
        },
        policy() {
            this.$router.push('/login/privacyPolicy');
		},
		subReg() {
			// /user_api/user_register
			// this.$router.push('/login/personApprove');
		},
		sendvcode(){
			console.log(this.$refs.phone.value);
			this.params = this.$refs.phone.value;
			var myreg=/^[1][3,4,5,7,8][0-9]{9}$/; 
			if(!myreg.test(this.params)){
				alert('请正确填写手机号');
			} else {
				this.$http.post('http://java.winfreeinfo.com/common_api/fetch_captcha',{phoneNum:this.params},{'contentType': "application/json"})
				.then(function(response){
					console.log(1111);
				}).catch(function (error) {
					console.info(error);
				});
			}
		}
    },
    mounted(){

    }
}
</script>

<style leng='less'>
    @import "../../assets/css/common/style.less";
    @import "../../assets/css/common/layer.less";
</style>
