<template>
    <div>
        <header class="mui-bar mui-bar-nav">
		<h1 class="mui-title">手机号更改</h1>
	</header>

	<section class="mui-content" id="changePhoneForm">
		<div class="register-form">
			<div class="mui-input-group">
				<div class="mui-input-row">
					<label>登录密码</label>
					<input type="password" class="mui-input-clear mui-input" name="pwd" v-model="pwd" placeholder="请输入您的登录密码">
					<input type="hidden" name="eventId" v-model="eventId" id="eventId">
				</div>
				<div class="mui-input-row">
					<label>手机号</label>
					<input type="text" class="mui-input-clear mui-input" name="phoneNum" v-model="phoneNum"  placeholder="请输入新的手机号">
				</div>
				<div class="mui-input-row input-yanzm">
					<label>验证码</label>
					<input type="text" class="mui-input-clear mui-input" name="captcha"  v-model="captcha" placeholder="请输入验证码">
					<button type="button" class="mui-btn mui-btn-link btn-yanzm" id="time" @click="getcaptcode()" value="">获取验证码</button>
				</div>
				<div class="mui-input-row">
					<label>姓名</label>
					<input type="text" class=" mui-input" readonly="readonly" name="trueName" v-model="trueName" placeholder="请输入手机号码绑定的姓名">
				</div>
				<div class="mui-input-row">
					<label>身份证号</label>
					<input type="text" class=" mui-input" readonly="readonly" name="idCard" v-model="idCard"  placeholder="请输入手机号码绑定的身份证号">
				</div>
			</div>
			<button class="mui-btn mui-btn-block mui-btn-primary  reg-btn" @click="changePhone">登录</button>
			</div>
	</section>
    </div>
</template>
<script>
import login_register from "./login_register.js"
export default {
    data(){
        return{
            phoneNum:"",
            captcha:"",
            eventId:"",
            pwd:"",
            trueName:"",
            idCard:"",
            wait:60,
        }
    },
    created: function () {
        login_register.vue = this;
        login_register.initVue();
		var _self = this;
		this.$http.post("/user_api/getLoginUser").then(function (resp) {
			if (resp.data.code == 0) {
				_self.trueName=resp.data.result.nickName;
				_self.idCard=resp.data.result.idCard;
			} else {
				alert("系统报错:" + resp.data.message);
			}
		}).catch(function (err) {
			console.log(err);
		})
	},
   methods:{
        getcaptcode:function(){
            var self = this;
            if(!self.checkphone(self.phoneNum)){
                alert("手机号码格式不正确！");
                return false;
            }
            var jsondata={"phoneNum":self.phoneNum};
            var param = JSON.stringify(jsondata);
            // this.$http({
            //     method:'post',
            //     url:getUrl()+"/common_api/fetch_captcha",
            //     data:param,
            //     dataType: 'json',
            //     headers: {'Content-Type': 'application/json;charset=UTF-8'}
            self.eventId ='1'
                this.$http.post("/common_api/fetch_captcha",jsondata).then(function(resp){

                if(resp.data.code==200){
                    var t = document.getElementById("time");
                    t.setAttribute("disabled","disabled");
                    self.time(t);
                    self.eventId =resp.data.result.eventId;
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
	   changePhone:function(){
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
	        if(self.pwd.length == 0){
		        alert("请输入您的登录密码！");
		        return false;
	        }
		   if(self.trueName==""||self.trueName==null){
			   alert("请输入手机号码绑定的姓名");
			   return false;
		   }
		   if(self.idCard==""||self.idCard==null){
			   alert("请输入手机号码绑定的身份证号码");
			   return false;
		   }
	        if(self.isNull(self.phoneNum)||self.isNull(self.captcha)||self.isNull(self.eventId)||self.isNull(self.pwd)||self.isNull(self.trueName)||self.isNull(self.idCard)){
		        alert("参数不能为空！");
		        return false;
	        }
	        var jsondata={};
	        jsondata["phoneNum"] =self.phoneNum;
	        jsondata["captcha"] =self.captcha;
	        jsondata["eventId"] =self.eventId;
	        jsondata["pwd"] =self.pwd;
		   jsondata["idCard"] =self.idCard;
		   jsondata["trueName"] =self.trueName;
	        var param = JSON.stringify(jsondata);
	        alert("正在更换并登录中...");
	        // this.$http({
		    //     method:'post',
		    //     url:getUrl()+"/user_api/update_user_phone_num",
		    //     data:param,
		    //     dataType: 'json',
            //     headers: {'Content-Type': 'application/json;charset=UTF-8'}

                this.$http.post('/user_api/update_user_phone_num',jsondata).then(function(resp){
                    console.log(resp)
		        if(resp.data.code==0){
			        //alert("更换成功,正在登录中...");
			        //self.relogin();
			        //开始登录
					login_register.data.loginParams.certCode = self.phoneNum;
			        login_register.data.loginParams.certType =0 ;
			        login_register.data.loginParams.pwd = self.pwd;
			        login_register.doLogin();
		        }else{
			        alert(resp.data.message);
		        }
	        }).catch(function(error){
		        alert(error);
	        });
        },
	   relogin: function () {
           var _self=this
		   this.$http.post("/user_api/user_loginout").then(function (resp) {
			   if(isApp) {
				   window.appApi.relogin();
			   }else{
                //    window.location.href = "../register/login.html";
                   _self.$router.push({path:'/static/webstatic/register/login.html'})
			   }
		   }).catch(function (error) {
			   console.info(error.date.message);
			   remin(error.data.message);
		   });
       },
       //校验手机号
checkphone:function(phone){
    var pattern = /^1[34578]\d{9}$/;
    var flag = pattern.test(phone);
    return flag;
},
//倒计时
//时间
time:function(o) { //o为按钮的对象
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
        _self.wait--;
        setTimeout(function(){_self.time(o);},1000)
    }
},

isNull:function(obj){
    if(obj==undefined||obj==""||obj==null){
        return true;
    }else{
        return false;
    }
}
    }
}
</script>
<style type="text/css" scoped>
.child-view,.mui-content{
    background: #fff
}
.register-form{
    margin-top: 0
}
</style>
