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
					<input type="text" class="mui-input-clear mui-input" name="certCode" v-model="regParams.certCode" id="phonenum" placeholder="请输入手机号" ref="phone">
				</div>
				<div class="mui-input-row input-yanzm">
					<label>验证码</label>
					<input type="text" class="mui-input-clear mui-input" name="captcha" id="" v-model="regParams.captcha" placeholder="请输入验证码" >
					<button type="button" class="mui-btn mui-btn-link btn-yanzm"  id="msgbutton" ref="msgbutton" @click="sendvcode">获取验证码</button>
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input type="password" class="mui-input-clear mui-input" name="pwd" v-model="regParams.pwd" placeholder="请输入密码">
					<input type="hidden" name="certType" v-model="regParams.certType">
					<input type="hidden" name="eventId" id="eventId" v-model="regParams.eventId">
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
			myreg : /^[1][3,4,5,7,8][0-9]{9}$/,
			regParams:{
				certCode:"",
				certType:0,
				pwd:"", 
				eventId:"",
				captcha:""
			},
			wait:60
        }
	},
	created: function() {
		var _self=this
		setTimeout(function(){
            _self.loginParams.deviceInfo = _self.getDeviceInfo();
		},500)
	},
    methods:{
		doLogin:function(params){
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
                    _self.loginParams.deviceInfo = getDeviceInfo();//再获取一次设备信息
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
                        axios.post(getUrl() + "/concats_api/checked_message").then(function (response) {
                            //debugger;
                            //alert("检测推送成功！");
                        }).catch(function (error) {
                            //alert("检测推送失败！");
                            console.info(error);
                        });
                    } catch (e) {
                        console.info("出现异常(继续运行代码):" + e);
                    }

                    var url = getUrl() + "/static/webstatic/work/work_home.html";
//                  var url = getUrl() + "/staticpage/zr/yunpan/preindex.html";
//					var url = getUrl() + "/static/newwebstatic/add_style.html"
                    window.appApi.goHome(url)
                }else if(rs.code == 1002){
                    //未实名认证
                    localStorage.setItem("loginParams",JSON.stringify(rs.result));
                    window.location.href = getUrl() + "/static/webstatic/register/person_approve.html";
                } else if (rs.code == 1049) {
                    //微信未被注册
                    setThirdInfoForWx(rs.result);
                    window.location.href = getUrl() + "/static/webstatic/register/third_bind.html";
                } else if (rs.code == 1050) {
                    setThirdInfoForQq(rs.result);
                    window.location.href = getUrl() + "/static/webstatic/register/third_bind.html";
                }else{
                    alert(rs.message);
                    layer.close(index_);
                }
            }).catch(function (error) {
                console.info(error);
            });
        },
		getDeviceInfo:function(){
			var _self=this
			window.appApi.callBackFun = function(callFlag, CONTENT) {
			if (callFlag == appApi.callBackFlag.DEVICE_INFO) {
				_self.loginParams.deviceInfo = JSON.parse(CONTENT.result);
			}
		}
			return window.appApi.getDeviceInfo();
		},
        goback(){
            this.$router.go(-1);
        },
        agreement() {
			this.$router.push({path:'/serviceAgreement'});
        },
        policy() {
			this.$router.push({path:'/privacy_policy'});
		},
		subReg() {
			// /user_api/user_register
			// this.$router.push('/login/personApprove');		
			const myreg=/^[1][3,4,5,7,8][0-9]{9}$/; 
			var _self = this;
            var params = _self.regParams;
            var url_params = window.location.href.split("?")[1];
            var url_params_length = _self.JSONLength(url_params);
            if(url_params_length>0){
                params.userSourceChannelId = "WEIXIN";
                params.invUserId = url_params.invUser;
                params.invType = url_params.type;
			}
			console.log("...........",this.regParams)
			alert(this.regParams.certCode)
			if(!this.myreg.test(this.regParams.certCode)){
				alert('请正确填写手机号')
				return false;
			} else if(this.regParams.eventId == '' || this.regParams.eventId == null){
				alert("抱歉，您还未获取验证码")
				return false;
			} else if(this.regParams.captcha.length<0 || this.regParams.captcha.length<4){
				alert('请正确输入验证码')
				return false;
			} else if(this.regParams.pwd == ''){
				alert("请设置登录密码")
                return false;
			} else if(this.regParams.pwd.length<6 || this.regParams.pwd.length>16){
				alert("密码为6-16位字符！");
                return false;
			} else{
				this.$http.post('/user_api/user_register',params)
				.then(function(response){
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
							this.$router.push({path:'/static/webstatic/register/login.html'});
							// window.location.href = getUrl() + "/static/webstatic/register/person_approve.html";
						}
					}else{
						alert(rs.message);
						//layer.closeAll();
					}
				}).catch(function (error) {
					alert("调用服务异常!");
                	console.info(error);
				});
			}
		},
		JSONLength:function(obj) {
			var size = 0, key;
			for (key in obj) {
				if (obj.hasOwnProperty(key)) size++;
			}
			return size;
		},
		sendvcode(){
			var _self=this
			console.log(this.$refs.phone.value);
			this.params = this.$refs.phone.value;
			var param={
				phoneNum:$("#phonenum").val()
			}
			if(!this.myreg.test(this.params)){
				alert('请正确填写手机号');
				$("#msgbutton").attr("disabled", true);
			} else {
				var obj=new Object()
				obj.phoneNum=$("#phonenum").val()
				this.$http.post('/common_api/fetch_captcha',obj)
				.then(function(response){
					if (response.data.code == 200) {
						console.log("yanshengma",response)
						_self.regParams.eventId = response.data.result.eventId
						$("#eventId").val(eventId);
						_self.time($("#msgbutton"));
					} else {
						_self.regParams.eventId = response.data.result.eventId
						_self.time($("#msgbutton"));
						alert("获取验证码失败！");
						$("#msgbutton").attr("disabled", false);
					}
				}).catch(function (error) {
					console.info(error);
				});
			}
		},
		time(o){
			var _self=this
			if (_self.wait == 0) {
				o.removeAttr("disabled");
				o.text("获取验证码");//改变按钮中value的值
				_self.wait = 60;
			} else {
				o.text(_self.wait + "s");//改变按钮中value的值
				_self.wait--;
				setTimeout(function () {
					_self.time(o);
				}, 1000)
			}
		}
    },
    mounted(){

    }
}
</script>

<style leng='less' scoped>

    @import "../../assets/css/common/style.less";
    @import "../../assets/css/common/layer.less";
	.register-form{
		margin-top: 0
	}
	.mui-content{
		background:#fff
	}
	label{
		text-align: left
	}
</style>
