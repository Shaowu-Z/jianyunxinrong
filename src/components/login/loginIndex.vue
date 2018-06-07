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
// import setting from "./playform/appApi.js";
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
            // deviceInfo:{
            //     deviceCode:"111111111",
            //     deviceModel:"andriod 8",
            //     deviceName:"h5",
            //     deviceType:1,
            //     osType:0,
            //     osVersion:"8.0.0"
            // }
            deviceInfo:undefined,
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
  created(){
    //   this.loginParams.deviceInfo=getDeviceInfo()
    //   alert(this.loginParams.deviceInfo)
  },
  mounted(){
    //   function getDeviceInfo() {
    /*var deviceInfo;
    //延迟0.5秒，兼容IOS
    setTimeout(function(){
        deviceInfo = appApi.getDeviceInfo();
    },500)
    return deviceInfo;*/
     this.loginParams.deviceInfo=appApi.getDeviceInfo()
     
    // return appApi.getDeviceInfo();
    //return {deviceCode:"111111111",deviceName:"h5",deviceModel:"andriod 8",deviceType:1,osVersion:"8.0.0",osType:0}
// }
  },
  methods:{
    loginAction(){
            this.loginParams.certCode = this.$refs.user.value;
            this.loginParams.pwd = this.$refs.pwd.value;
            var _this=this
            this.$http.post("/user_api/user_login",{params:this.loginParams},{headers:{'Content-Type':'application/json'}}).then(function (response) {
                var rs = response.data;
                console.log(response);
                if(rs.code === 0){
                     //登录成功
                    var userInfo = rs.result.userInfo;
                    var senduserInfo={}
                    senduserInfo.userInfo=rs.result.userInfo
                    //登录环信
                    window.appApi.loginHXChat(userInfo.imId, userInfo.imPwd, userInfo.userIcon);
                     //保存用户信息
                    //  alert("保存用户信息"+JSON.stringify(senduserInfo), rs.result.userPwd)
                    // window.appApi.saveUserInfo(JSON.stringify(rs.result.userInfo), rs.result.userPwd);
                    window.appApi.saveUserInfo(JSON.stringify(senduserInfo), rs.result.userPwd);
                      //检测是否有消息需推送(一般第一次登录才会有需要推送的消息)
                    //    window.appApi.goHome('/static/webstatic/mycenter/mycenter.html')
                    //  _this.$router.push({path:'/static/webstatic/mycenter/mycenter.html'});
                       try {
                           _this.$http.post("/concats_api/checked_message").then(function (response) {
                                //debugger;
                                //alert("检测推送成功！");
                            }).catch(function (error) {
                                //alert("检测推送失败！");
                                console.info(error);
                            });
                        } catch (e) {
                            console.info("出现异常(继续运行代码):" + e);
                        }
                        
                    // _this.$router.push({path:'/static/webstatic/work/work_home.html'});
                    window.appApi.goHome('/static/webstatic/mycenter/mycenter.html')
                }else if(rs.code == 1002){
                    //未实名认证
                    _this.loginParams=rs.result;
                    _this.$router.push({path:'personApprove.vue'});
                }else if(rs.code == 1049){
                     //微信未被注册
                     setThirdInfoForWx(rs.result);
                    //  _this.$router.push({path:'third_bind.vue'});
                }else if(rs.code == 1050){
                    setThirdInfoForQq(rs.result);
                     //  _this.$router.push({path:'third_bind.vue'});
                }else{
                    // warm(rs.message);
                    // layer.close(index_);
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
