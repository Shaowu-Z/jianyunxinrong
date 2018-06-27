<template>
    <div>
        <header class="mui-bar mui-bar-nav">
		<h1 class="mui-title">密码重置</h1>
	</header>
	
	<section class="mui-content" id="backpwdform">
		<div class="register-form">
			<div class="mui-input-group">
				<div class="mui-input-row">
					<label>手机号</label>
					<input type="text" class="mui-input-clear mui-input" name="phoneNum" v-model="phoneNum"  placeholder="请输入手机号">
				</div>
				<div class="mui-input-row input-yanzm">
					<label>验证码</label>
					<input type="text" class="mui-input-clear mui-input" name="captcha"  v-model="captcha" placeholder="请输入验证码">
					<button type="button" class="mui-btn mui-btn-link btn-yanzm" id="time" @click="getcaptcode()" value="">获取验证码</button>
				</div>
				<div class="mui-input-row">
					<label>新密码</label>
					<input type="password" class="mui-input-clear mui-input" name="newPwd" v-model="newPwd" placeholder="请输入新密码">
					<input type="hidden" name="eventId" v-model="eventId" id="eventId">
				</div>
			</div>
			<button class="mui-btn mui-btn-block mui-btn-primary  reg-btn" @click="resetpwd">重置密码</button>
			<p class="content-tips mui-text-center"><a @click="login">返回登录页面</a></p>

			</div>
	</section>
    </div>
</template>
<script>
export default {
    data(){
        return{
            phoneNum:"",
            captcha:"",
            eventId:"",
            newPwd:"",
            wait:60
        }
    },
    created(){
        
    },
    methods:{
        getcaptcode:function(){
            var self = this;
            if(!self.checkphone(self.phoneNum)){
                alert("手机号码格式不正确！");
                return false;
            }
            // var jsondata={"phoneNum":self.phoneNum};
            // var param = JSON.stringify(jsondata);
            var param={
                'phoneNum':self.phoneNum
            }
            // axios({
            //     method:'post',
            //     url:getUrl()+"/common_api/fetch_captcha",
            //     data:param,
            //     dataType: 'json',
            //     headers: {'Content-Type': 'application/json;charset=UTF-8'}
                this.$http.post("/common_api/fetch_captcha",param ).then(function(resp){
                    console.log(resp)
                if(resp.code==200){
                    var t = document.getElementById("time");
                    t.setAttribute("disabled","disabled");
                    self.time(t);
                    self.eventId =resp.result.eventId;
                    console.info("获取验证码成功！");
                }else{
                    console.info("获取验证码失败！")
                    alert("您获取验证码过于频繁，请稍后重试!");
                }
            }).catch(function(error){
                    console.info("获取验证码失败！")
                    alert("获取验证码失败！"+error.message);
            });
        },
        resetpwd:function(){
            var self = this;
            if(!self.checkphone(self.phoneNum)){
                alert("手机号码格式不正确！");
                return false;
            }
	        if(self.eventId==""||self.eventId==null){
		        alert("抱歉，您还未获取验证码");
		        return false;
	        }
	        if(self.captcha==""||self.captcha==null){
		        alert("请输入验证码！");
		        return false;
	        }
            if(self.newPwd.length<6 || self.newPwd.length > 16){
                alert("密码为6-16位字符！");
                return false;
            }
            if(self.isNull(self.phoneNum)||self.isNull(self.captcha)||self.isNull(self.eventId)||self.isNull(self.newPwd)){
                alert("参数不能为空！");
                return false;
            }
            // var jsondata={};
            // jsondata["phoneNum"] =self.phoneNum;
            // jsondata["captcha"] =self.captcha;
            // jsondata["eventId"] =self.eventId;
            // jsondata["newPwd"] =self.newPwd;
            // var param = JSON.stringify(jsondata);
            var param={
                phoneNum:self.phoneNum,
                captcha:self.captcha,
                eventId:self.eventId,
                newPwd:self.newPwd
            }
            // axios({
            //     method:'post',
            //     url:getUrl()+"/user_api/user_back_pwd",
            //     data:param,
            //     dataType: 'json',
            //     headers: {'Content-Type': 'application/json;charset=UTF-8'}
            this.$http.post('/user_api/user_back_pwd',param).then(function(resp){
                if(resp.code==200){
                    alert("重置密码成功");
                    window.location.href="login.html";
                }else{
                    alert("重置密码失败："+resp.message);
                }
            }).catch(function(error){
                    alert("重置密码失败："+resp.message);
            });
        },
        checkphone:function(phone){
            var pattern = /^1[34578]\d{9}$/;
            var flag = pattern.test(phone);
            return flag;
        },
        time:function(){
            var _self=this
            if (_self.wait == 0) {
        /*      o.removeAttr("disabled");
                o.text("获取验证码");//改变按钮中value的值*/
                o.setAttribute("disabled","disabled");
                o.removeAttribute("disabled");
                o.innerHTML="获取验证码";
                _self.wait = 60;
            } else {
                o.innerHTML=_self.wait + "s";//改变按钮中value的值
                wait--;
                setTimeout(function(){_self.time(o);},1000)
            }
        },
        isNull:function(obj){
            if(obj==undefined||obj==""||obj==null){
                return true;
            }else{
                return false;
            }
        },
        login:function(){
            this.$router.push({path:'/static/webstatic/register/login.html'});
        }
    }
}
</script>
<style scoped>
    html,
    body {
        height: 100%;
        background-color: #ffffff!important;
    }
    #app .mui-content{
        background-color: #ffffff!important;
    }
    .register-form{
        background: #ffffff;
        margin-top: 0
    }

    #LXB_CONTAINER_SHOW {
        display: none!important;
    }

    #LXB_CONTAINER {
        display: none!important;
    }
</style>
