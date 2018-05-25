<template>
  <div id="app">
    <header class="mui-bar mui-bar-nav">
        <h1 class="mui-title">登录</h1>
    </header>
    <section class="mui-content" id="login-register">
        <div class="register-form">
            <form class="mui-input-group" id="loginform">
                <div class="mui-input-row">
                    <label>手机号</label>
                    <!--不要修改ID！-->
                    <input type="text" class="mui-input-clear mui-input" id="certCode"
                        name="certCode" placeholder="请输入手机号" ref="user" value="">
                </div>
                <div class="mui-input-row">
                    <label>密码</label>
                    <input type="password" class="mui-input-clear mui-input" id="pwd" name="pwd"
                        placeholder="请输入密码"  ref="pwd" value="">
                    <input type="hidden" name="certType">
                </div>
            </form>
            <!--<button class="mui-btn mui-btn-block mui-btn-primary reg-btn" onclick="login_register.doLogin()">登录</button>-->
            <button class="mui-btn mui-btn-block mui-btn-primary reg-btn" @click="loginAction()">登录</button>
            <p class="content-tips mui-text-center">
                <a class="mui-pull-left" @click="register">立即注册</a>
                <a class="mui-pull-right" @click="backpwd">忘记密码？</a>
            </p>
            <div class="other-style">
                <div class="more-title"><span class="title">使用其他方式登录</span></div>
                <div class="mui-table">
                    <div id="wx_login" class="mui-table-cell mui-text-center invita-style">
                        <a href="javaScript:void(0)"><img src="../../assets/images/weix.png"></a>
                    </div>
                    <div class="mui-table-cell mui-text-center invita-style">
                        <a href="javaScript:void(0)"><img src="../../assets/images/qq.png"></a>
                    </div>
                </div>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
        deviceInfoInterval:-1,
        deviceInfoTime:10000,
        loginParams:{
            certCode:"",
            certType:0,
            pwd:"",
            token:"",//第三方登录用到
            deviceInfo:{
                deviceCode:"111111111",
                deviceModel:"andriod 8",
                deviceName:"h5",
                deviceType:1,
                osType:0,
                osVersion:"8.0.0"
            }
        },
        regParams:{
            certCode:"",
            certType:0,
            pwd:"", 
            eventId:"",
            captcha:""
        }
    }
  },
  methods:{
    loginAction(){
            this.loginParams.certCode = this.$refs.user.value;
            this.loginParams.pwd = this.$refs.pwd.value;
            var _this=this
            this.$http.post("/api/user_api/user_login",{params:this.loginParams},{headers:{'Content-Type':'application/json'}}).then(function (response) {
                var rs = response.data;
                console.log(response);
                if(rs.code === 0){
                   window.appApi.saveUserInfo(JSON.stringify(rs.result), rs.result.userPwd);
                  _this.$router.push({path:'/static/webstatic/mycenter/mycenter.html'});
                }
            }).catch(function (error) {
                console.info(error);
            });
    },
    register(){
        this.$router.push({path:'/register'});
    },
    backpwd(){
        this.$router.push({path:'/backpwd'});
    }
  }
}
</script>

<style>
    @import '../../assets/css/common/style.less';
    html,
    body {
        height: 100%;
    }

    #LXB_CONTAINER_SHOW {
        display: none!important;
    }

    #LXB_CONTAINER {
        display: none!important;
    }
</style>
