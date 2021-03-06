var _self
var login_register={
    initVue:function(){
		_self=login_register.vue
	 },
    // data:fu{
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
        },
    // },
    doLogin:function (params) {
        var _self = _self;
        var index_ = alert("正在登录中");
        var time = 1000;
        var time_total = time;
        _self.deviceInfoInterval = setInterval(function(){
            time_total += time;
            _self.loginAction(params,index_,time_total);
        },time);

    },
    loginAction:function(params,index_,time_total){
        var _self = _self;
        if(_self.loginParams.deviceInfo == undefined){
            //延迟0.5秒，兼容IOS
            setTimeout(function(){
                _self.loginParams.deviceInfo = _self.getDeviceInfo();//再获取一次设备信息
            },500)
            if(_self.loginParams.deviceInfo == undefined){
                // 超时未获取到设备信息
                if(time_total > _self.deviceInfoTime){
                    window.clearInterval(_self.deviceInfoInterval);
                    // layer.close(index_);
                    alert("未获取到设备信息")
                }
                return;
            }
        }
        window.clearInterval(_self.deviceInfoInterval);
        if(undefined == params){
            //一般登录
            params = _self.$data.loginParams;
        }
        axios.post(getUrl()+"/user_api/user_login",{params:params}).then(function (response) {
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
                    axios.post( "/concats_api/checked_message").then(function (response) {
                        //debugger;
                        //alert("检测推送成功！");
                    }).catch(function (error) {
                        //alert("检测推送失败！");
                        console.info(error);
                    });
                } catch (e) {
                    console.info("出现异常(继续运行代码):" + e);
                }

                var url =  "/static/webstatic/work/work_home.html";
//                  var url =  "/staticpage/zr/yunpan/preindex.html";
//					var url =  "/static/newwebstatic/add_style.html"
                window.appApi.goHome(url)
            }else if(rs.code == 1002){
                //未实名认证
                localStorage.setItem("loginParams",JSON.stringify(rs.result));
                window.location.href =  "/static/webstatic/register/person_approve.html";
            } else if (rs.code == 1049) {
                //微信未被注册
                setThirdInfoForWx(rs.result);
                window.location.href =  "/static/webstatic/register/third_bind.html";
            } else if (rs.code == 1050) {
                setThirdInfoForQq(rs.result);
                window.location.href =  "/static/webstatic/register/third_bind.html";
            }else{
                alert(rs.message);
                // layer.close(index_);
            }
        }).catch(function (error) {
            console.info(error);
        });
    },
    thirdLogin:function (type) {
        //第三方登录
        loading("正在授权...");
        appApi.openLogin(type == 4 ? 0:1);
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
        var _self = _self;
        if("" == json){
            _self.$data.loginParams.certType = 0;
            // layer.closeAll();
            alert("授权失败")
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
        var _self = _self;
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
                alert("注册成功");
                //注册成功
                if(url_params_length>0){
                    //执行回调
                    _self.regCallBack(params,rs.result);
                }else{

                    //保存一些信息到注册页面中
                    localStorage.setItem("loginParams", JSON.stringify(params));

                    //注册成功后直接跳转到登录页面
                    // window.location.href =  "/static/webstatic/register/person_approve.html";
                    /**
                     * 必须用openNewWindow打开，不然iOS无法调用原生方法获设备信息
                     */
                    appApi.openNewWindow( "/static/webstatic/register/person_approve.html");
                }
            }else{
                // alert(rs.message);
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
            axios.post( "/concats_api/insert_add_info", addVo).then(function (response) {
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
    },
    getDeviceInfo:function(){
        var _self=_self
			window.appApi.callBackFun = function(callFlag, CONTENT) {
			if (callFlag == appApi.callBackFlag.DEVICE_INFO) {
				_self.loginParams.deviceInfo = JSON.parse(CONTENT.result);
			}
		}
        return appApi.getDeviceInfo();
    },
    setQQWXLoginResult:function(){
        login_register.thirdLoginCallBack(json);
    },
    sendvcode:function(){
        var phone = $("#phonenum").val();
    if (!checkphone(phone)) {
        alert("手机号码格式不正确！");
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
        	console.log(data)
            if (data.code == 200) {
                login_register.$data.regParams.eventId = data.result.eventId
                $("#eventId").val(eventId);
                time($("#msgbutton"));
            } else {
                login_register.$data.regParams.eventId = data.result.eventId
                time($("#msgbutton"));
                alert("获取验证码失败！");
                $("#msgbutton").attr("disabled", false);
            }
            },
            error: function () {
                alert("获取验证码失败！");
                $("#msgbutton").attr("disabled", false);
            }
        });
    },
    //校验手机号
    checkphone:function(phone){
        var pattern = /^1[34578]\d{9}$/;
        var flag = pattern.test(phone);
        return flag;
    },
    //倒计时
    time:function(o){
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
    },
    JSONLength:function(json){
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    }
}
export default login_register