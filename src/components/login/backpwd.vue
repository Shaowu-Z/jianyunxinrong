<template>
  <div id="app">
    <header class="mui-bar mui-bar-nav">
		<h1 class="mui-title">密码重置</h1>
	</header>
	
	<section class="mui-content" id="backpwdform">
		<div class="register-form">
			<div class="mui-input-group">
				<div class="mui-input-row">
					<label>手机号</label>
					<input type="text" class="mui-input-clear mui-input" name="phoneNum" placeholder="请输入手机号">
				</div>
				<div class="mui-input-row input-yanzm">
					<label>验证码</label>
					<input type="text" class="mui-input-clear mui-input" name="captcha"  placeholder="请输入验证码">
					<button type="button" class="mui-btn mui-btn-link btn-yanzm" id="time" value="">获取验证码</button>
				</div>
				<div class="mui-input-row">
					<label>新密码</label>
					<input type="password" class="mui-input-clear mui-input" name="newPwd" placeholder="请输入新密码">
					<input type="hidden" name="eventId" id="eventId">
				</div>
			</div>
			<button class="mui-btn mui-btn-block mui-btn-primary  reg-btn">重置密码</button>
			<p class="content-tips mui-text-center"><a @click="goback">返回登录页面</a></p>

			</div>
	</section>
  </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        goback(){
            this.$router.go(-1);
        }
    },
    mounted(){

    }
}
</script>

<style>
    @import "../../assets/css/common/style.less";
    @import "../../assets/css/common/layer.less";
</style>
