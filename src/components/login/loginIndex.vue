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
                        name="certCode" placeholder="请输入手机号">
                </div>
                <div class="mui-input-row">
                    <label>密码</label>
                    <input type="password" class="mui-input-clear mui-input" id="pwd" name="pwd"
                        placeholder="请输入密码">
                    <input type="hidden" name="certType">
                </div>
            </form>
            <!--<button class="mui-btn mui-btn-block mui-btn-primary reg-btn" onclick="login_register.doLogin()">登录</button>-->
            <button class="mui-btn mui-btn-block mui-btn-primary reg-btn" onclick="login_register.doLogin()">登录</button>
            <p class="content-tips mui-text-center">
                <a class="mui-pull-left" @click="register">立即注册</a>
                <a class="mui-pull-right" @click="backpwd">忘记密码？</a>
            </p>
            <div class="other-style">
                <div class="more-title"><span class="title">使用其他方式登录</span></div>
                <div class="mui-table">
                    <div id="wx_login" onclick="login_register.thirdLogin(2)"
                        class="mui-table-cell mui-text-center invita-style">
                        <a href="javaScript:void(0)"><img src="../../assets/images/weix.png"></a>
                    </div>
                    <div onclick="login_register.thirdLogin(4)" class="mui-table-cell mui-text-center invita-style">
                        <a href="javaScript:void(0)"><img src="../../assets/images/qq.png"></a>
                    </div>
                </div>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
import {loginSetting,login_register} from '../../playform/login_register'
export default {
  data () {
    return {
    }
  },
  methods:{
      register(){
          this.$router.push({path: 'login/register'})
      },
      backpwd(){
          this.$router.push({path: 'login/backpwd'})
      },
  },
  mounted(){
    var _mtac = {};
    (function () {
        var mta = document.createElement("script");
        mta.src = "https://pingjs.qq.com/h5/stats.js?v2.0.4";
        mta.setAttribute("name", "MTAH5");
        mta.setAttribute("sid", "500574988");   
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(mta, s);
    })();
  },
}
</script>

<style>
    @import '../../assets/css/common/style.less';
    body,
    .mui-content {
        background: #ffffff;
    }
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
