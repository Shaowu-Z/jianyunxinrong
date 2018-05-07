import Vue from 'vue'
import setting from './config.js'
import appApi from './appApi.js'
import removeThirdInfo from './common.js'
/***************用户登录 - wyj******************/
export default onload = function (){
var login_register = new Vue({
    el:"#login-register",
    data:{
        deviceInfoInterval:-1,
        deviceInfoTime:10000,
        loginParams:{
            certCode:"",
            certType:0,
            pwd:"",
            token:"",//第三方登录用到
            deviceInfo:undefined,
        },
        // 控制元素用
        loginControlData:{

        },
        regParams:{
            certCode:"",
            certType:0,
            pwd:"",
            eventId:"",
            captcha:""
        }
    },
    created: function () {
        // document.getElementById("wx_login").style.display = "block";
        var _self = this;
        setTimeout(function(){
            _self.$data.loginParams.deviceInfo = appApi.getDeviceInfo();
        },500)
    },
    methods:{
        doLogin:function (params) {
            var _self = this;
            var index_ = loading("正在登录中");
            var time = 1000;
            var time_total = time;
            _self.deviceInfoInterval = setInterval(function(){
                time_total += time;
                _self.loginAction(params,index_,time_total);
            },time);
        },
        loginAction:function(params,index_,time_total){
            var _self = this;
            if(_self.loginParams.deviceInfo == undefined){
                //延迟0.5秒，兼容IOS
                setTimeout(function(){
                    _self.loginParams.deviceInfo = appApi.getDeviceInfo();//再获取一次设备信息
                },500)
                if(_self.loginParams.deviceInfo == undefined){
                    // 超时未获取到设备信息
                    if(time_total > _self.deviceInfoTime){
                        window.clearInterval(_self.deviceInfoInterval);
                        layer.close(index_);
                        msg("未获取到设备信息")
                    }
                    return;
                }
            }
            window.clearInterval(_self.deviceInfoInterval);
            if(undefined == params){
                //一般登录
                params = _self.$data.loginParams;
            }
            this.$http.post("http://java.winfreeinfo.com/user_api/user_login",{params:params}).then(function (response) {
                var rs = response.data;
                if(rs.code == 0) {
                    removeThirdInfo();
                    localStorage.removeItem("conditions");//清除筛选搜索
                    //登录成功
                    var userInfo = rs.result.userInfo;
                    //登录环信
                    window.appApi.loginHXChat(userInfo.imId, userInfo.imPwd, userInfo.userIcon);
                    //保存用户信息
                    window.appApi.saveUserInfo(JSON.stringify(rs.result), rs.result.userPwd);
                    //检测是否有消息需推送(一般第一次登录才会有需要推送的消息) -yangfeng
                    try {
                        this.$http.post(setting.getUrl() + "/concats_api/checked_message").then(function (response) {
                            //debugger;
                            //alert("检测推送成功！");
                        }).catch(function (error) {
                            //alert("检测推送失败！");
                            console.info(error);
                        });
                    } catch (e) {
                        console.info("出现异常(继续运行代码):" + e);
                    }

                    var url = setting.getUrl() + "/static/webstatic/work/work_home.html";
//                  var url = getUrl() + "/staticpage/zr/yunpan/preindex.html";
//					var url = getUrl() + "/static/newwebstatic/add_style.html"
                    window.appApi.goHome(url)
                }else if(rs.code == 1002){
                    //未实名认证
                    localStorage.setItem("loginParams",JSON.stringify(rs.result));
                    window.location.href = setting.getUrl() + "/static/webstatic/register/person_approve.html"; // this.$router.push(/person_approve);
                } else if (rs.code == 1049) {
                    //微信未被注册
                    setThirdInfoForWx(rs.result);
                    window.location.href = setting.getUrl() + "/static/webstatic/register/third_bind.html";
                } else if (rs.code == 1050) {
                    setThirdInfoForQq(rs.result);
                    window.location.href = setting.getUrl() + "/static/webstatic/register/third_bind.html";
                }else{
                    warm(rs.message);
                    layer.close(index_);
                }
            }).catch(function (error) {
                console.info(error);
            });
        },
        thirdLogin:function (type) {
            //第三方登录
            loading("正在授权...");
            removeThirdInfo();
            setCertType(type);
            appApi.openLogin(type == 4 ? 0:1);
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
                url: "http://java.winfreeinfo.com/check_api/isCheck",
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
            this.$http.post("http://java.winfreeinfo.com/user_api/user_register",params).then(function (response) {
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
                        window.location.href = setting.getUrl() + "/static/webstatic/register/person_approve.html";
                    }
                }else{
                    warm(rs.message);
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
                this.$http.post(setting.getUrl() + "/concats_api/insert_add_info", addVo).then(function (response) {
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
                    this.$http.post("http://java.winfreeinfo.com/concats_api/create_member", param).then(function (response) {
                    window.location.href = DOWN_LOAD_APP_URL;
                    console.info(response);
                }).catch(function(error){
                    console.log('操作失败-'+error);
                });
            }
        }
    }
});
}
function warm(msg) {
    layer.open({
        type: 200
        , content: msg
        , btn: '确定'
    });
}
    function loginSetting(){
        function getDeviceInfo() {
            /*var deviceInfo;
            //延迟0.5秒，兼容IOS
            setTimeout(function(){
                deviceInfo = appApi.getDeviceInfo();
            },500)
            return deviceInfo;*/
            return appApi.getDeviceInfo();
            //return {deviceCode:"111111111",deviceName:"h5",deviceModel:"andriod 8",deviceType:1,osVersion:"8.0.0",osType:0}
        }
        window.appApi.callBackFun = function(callFlag, CONTENT) {
            if(callFlag == appApi.callBackFlag.DEVICE_INFO) {
                login_register.loginParams.deviceInfo = JSON.parse(CONTENT);
            }
        }
        function setQQWXLoginResult(json) {
            login_register.thirdLoginCallBack(json);
        }
        //获取验证码
        function sendvcode() {
            var phone = $("#phonenum").val();
            if (!checkphone(phone)) {
                warm("手机号码格式不正确！");
                return;
            }
            $("#msgbutton").attr("disabled", true);
            var jsondata = {"phoneNum": phone};
            var tempID = "SMS_70040001";
            $.ajax({
                url: "/common_api/fetch_captcha",
                type: 'post',
                dataType: 'json',
                contentType: "application/json",
                data: JSON.stringify(jsondata),
                success: function (data) {
                    if (data.code == 200) {
                        login_register.$data.regParams.eventId = data.result.eventId
                        $("#eventId").val(eventId);
                        time($("#msgbutton"));
                    } else {
                        login_register.$data.regParams.eventId = data.result.eventId
                        time($("#msgbutton"));
                        warm("获取验证码失败！");
                        $("#msgbutton").attr("disabled", false);
                    }
                },
                error: function () {
                    warm("获取验证码失败！");
                    $("#msgbutton").attr("disabled", false);
                }
            });
        }
        //校验手机号
        function checkphone(phone) {
            var pattern = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/;
            var flag = pattern.test(phone);
            return flag;
        }
        //倒计时
        var wait = 60;//时间
        function time(o) { //o为按钮的对象
            if (wait == 0) {
                o.removeAttr("disabled");
                o.text("获取验证码");//改变按钮中value的值
                wait = 60;
            } else {
                o.text(wait + "s");//改变按钮中value的值
                wait--;
                setTimeout(function () {
                    time(o);
                }, 1000)
            }
        }
        //获取json个数
        function JSONLength(obj) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        };    
    }
export {loginSetting,onload};