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
                    <div id="wx_login" class="mui-table-cell mui-text-center invita-style" @click="thirdLogin(2)">
                        <a href="javaScript:void(0)"><img src="../../assets/images/weix.png"></a>
                    </div>
                    <div class="mui-table-cell mui-text-center invita-style" @click="thirdLogin(4)">
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
import { Toast } from 'mint-ui';
import tipApi from '../project/js/tipApi';
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
                console.log("登陆结果",rs.result)
                    Toast({
                        message: response.data.message,
                        position: 'bottom',
                        duration: 1000
                    });
                if(rs.code === 0){
                     //登录成功
                    var userInfo = rs.result.userInfo;
                    var senduserInfo={}
                    senduserInfo.userInfo=rs.result.userInfo
                    //登录环信
                    window.appApi.loginHXChat(userInfo.imId, userInfo.imPwd, userInfo.userIcon);
                     //保存用户信息
                    // window.appApi.saveUserInfo(JSON.stringify(rs.result.userInfo), rs.result.userPwd);
                    window.appApi.saveUserInfo(JSON.stringify(rs.result), rs.result.userPwd);
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


                    // _this.$router.push({path:'/static/webstatic/mycenter/mycenter.html'});

                     window.appApi.goHome('/static/webstatic/mycenter/mycenter.html')
                    // window.appApi.goHome('/myHome')
                }else if(rs.code == 1002){
                    //未实名认证
                    _this.loginParams=rs.result;
                    _this.$router.push({path:'/personApprove'});
                }else if(rs.code == 1049){
                     //微信未被注册
                     setThirdInfoForWx(rs.result);
                     _this.$router.push({path:'/third_bind.vue'});
                }else if(rs.code == 1050){
                    setThirdInfoForQq(rs.result);
                      _this.$router.push({path:'third_bind.vue'});
                }else{
                    alert(rs.message);
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
        // this.$router.push({path:'/search'});
        this.$router.push({path:'/resizepwd'});
    },
    thirdLogin:function (type) {
            //第三方登录
            alert(0)
            tipApi.success("正在授权...")
            window.appApi.openLogin(type == 4 ? 0:1);
            window.appApi.callBackFun = function (callFlag, CONTENT) {

                    if (callFlag == appApi.callBackFlag.QQ_WX_LOGIN) {
                        tipApi.close("success")
                    }
                }
            setTimeout(function () {
                removeThirdInfo();
                setCertType(type);
            },500)
            /*if(type == 4){
                //QQ
                var json = {
                    city: "深圳",
                    gender: "男",
                    iconurl: "http://wx.qlogo.cn/mmopen/OskPGeEosHwkt3K4OjbDjjtZMcZwqT5iaSooGydK1ibrdPz2ankP0OFSgf612TjWSE3DBIH7EJ8aOg7zpUq5tEc3VvFY7Y9cicN/0",
                    name: " QQ ",
                    openid: "QQQQ07-chw77pFsUPAQZxv1FI2QhPiaBQ",
                    province: "广东",
                    uid: "QQQQoioIGvyixWEixzogG720SKAAebhg2"
                }
                setQQWXLoginResult(JSON.stringify(json));
            }else{
                var json = {
                    city: "深圳",
                    gender: "男",
                    iconurl: "http://wx.qlogo.cn/mmopen/OskPGeEosHwkt3K4OjbDjjtZMcZwqT5iaSooGydK1ibrdPz2ankP0OFSgf612TjWSE3DBIH7EJ8aOg7zpUq5tEc3VvFY7Y9cicN/0",
                    name: " wx ",
                    openid: "07-chw77pFsUPAQZxv1FI2QhPiaBQ",
                    province: "广东",
                    uid: "oioIGvyixWEixzogG720SKAAebhg2"
                }
                setQQWXLoginResult(JSON.stringify(json));
            }*/

        },
        thirdLoginCallBack:function (json) {
            var _self = this;
            if("" == json){
                _self.$data.loginParams.certType = 0;
                layer.closeAll();
                msg("授权失败")
            }else{
                var params = _self.$data.loginParams;
                params.token = json;
                params.certCode = "";
                params.certType = getCertType();
                _self.doLogin(params);
            }
        },
        userAuth:function () {
            var R_flag = false;
            $.ajax({
                url: getUrl()+"/check_api/isCheck",
                dataType: "json",
                type: "post",
                async: false,
                contentType: "application/json",
                success: function (result) {
                    if (result.code == 2) {//已认证
                        R_flag = true;
                    }
                }
            })

            return R_flag;
        },
        subReg:function () {
            var _self = this;
            var params = _self.$data.regParams;
            var url_params = getParam(window.location.href);
            var url_params_length = JSONLength(url_params);
            if(url_params_length>0){
                params.userSourceChannelId = "WEIXIN";
                params.invUserId = url_params.invUser;
                params.invType = url_params.type;
            }
            if(!checkphone(_self.$data.regParams.certCode)){
                alert("手机号码输入不正确")
                return false;
            }
            if(_self.$data.regParams.eventId==""||_self.$data.regParams.eventId==null){
                alert("抱歉，您还未获取验证码");
                return false;
            }
            if( _self.$data.regParams.captcha == ""){
                alert("验证码输入不正确")
                return false;
            }
            if( _self.$data.regParams.pwd == ""){
                alert("请设置登录密码")
                return false;
            }
            if(_self.$data.regParams.pwd.length<6 || _self.$data.regParams.pwd.length > 16){
                alert("密码为6-16位字符！");
                return false;
            }
            axios.post(getUrl()+"/user_api/user_register",params).then(function (response) {
                var rs = response.data;
                if(rs.code == 0){
                    msg("注册成功");
                    //注册成功
                    if(url_params_length>0){
                        //执行回调
                        _self.regCallBack(params,rs.result);
                    }else{

                        //保存一些信息到注册页面中
                        localStorage.setItem("loginParams", JSON.stringify(params));

                        //注册成功后直接跳转到登录页面
                        window.location.href = getUrl() + "/static/webstatic/register/person_approve.html";
                    }
                }else{
                    alert(rs.message);
                    //layer.closeAll();
                }
            }).catch(function (error) {alert("调用服务异常!");
                console.info(error);
            });
        },
        regCallBack:function (params,rs) {
            if(url_params.type == "1" || url_params.type == 1){
                //好友申请
                var addVo = {
                    addUserId: url_params.invUser,
                    receivedUserId:rs.userId,
                    receivedUserName:rs.userNick,
                    cellPhone:rs.userPhone,
                    applyType:"wx"
                };
                axios.post(getUrl() + "/concats_api/insert_add_info", addVo).then(function (response) {
                    window.location.href = DOWN_LOAD_APP_URL;
                }).catch(function (error) {
                    console.info(error);
                });
            }else{
                //团队邀请
                var param = {
                    createType:"2",
                    userId:rs.userId,
                    memberName:rs.userNick,
                    phoneNumber:rs.userPhone,
                    teamId:url_params.invTeam};
                axios.post(getUrl()+"/concats_api/create_member", param).then(function (response) {
                    window.location.href = DOWN_LOAD_APP_URL;
                    console.info(response);
                }).catch(function(error){
                    console.log('操作失败-'+error);
                });
            }
        }
  }
}
</script>

<style type="text/css" scoped>
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
