<template>
  <div id="app">
    <header class="mui-bar mui-bar-nav">
        <button id="btn-referrer" class="mui-action-back mui-btn mui-btn-link mui-btn-nav mui-pull-left" @click="goback">
            <span class="mui-icon mui-icon-back"></span>返回
        </button>
        <h1 class="mui-title">个人认证</h1>
    </header>
    <section class="mui-content mycenter-content" id="user_auth">
        <ul class="mui-table-view eg-table-view eg-detail-list">
            <!--
                        <li class="mui-table-view-cell my-header-pic">头像<span class="mui-badge mui-badge-inverted"><img src="../../images/60x60.gif"></span><input type="file"></li>
            -->
            <li class="mui-table-view-cell mui-input-row">
                <label>真实姓名
                    <small>*</small>
                </label>
                <input type="text" id="nickName" name="nickName" v-model="authParams.trueName"  placeholder="请填写您的真实姓名"/>
            </li>
            <li class="mui-table-view-cell mui-input-row">
                <label>手机号码
                    <small>*</small>
                </label>
                <input type="text" id="cellPhone" name="cellPhone" v-model="authParams.phoneNum" readonly="readonly"
                    placeholder="请填写您的手机号码"/>
                <input type="hidden" name="userId" id="userId">
            </li>
            <li class="mui-table-view-cell mui-input-row">
                <label>身份证号
                    <small>*</small>
                </label>
                <input type="text" id="idCard" name="idCard" value="" v-model="authParams.idCard" placeholder="请填写您的身份证号"/>
            </li>
      
        </ul>
        <div class="btn-box">
            <button class="mui-btn mui-btn-primary mui-btn-block" @click="doCheck()">立即认证</button>
        </div>
    </section>
  </div>
</template>

<script>
import tipApi from 	'../../playform/tipApi.js' 
import {getParam,BackCookie,removeThirdInfo} from '../../playform/common'
export default {
    data (){
        return {
		 authParams:{
			trueName:"",
			idCard:"",
			phoneNum:""
           },
         loginParams:{
            certCode:"",
            certType:0,
            pwd:"",
            token:"",//第三方登录用到
            deviceInfo:undefined,
        },
        }
    },
    created: function () {
		//获取当前登录的用户
		var _self = this;
		var params = localStorage.getItem("loginParams");
        console.log(params)
        localStorage.removeItem("loginParams");
		if(undefined != params){
			_self.$data.loginParams = JSON.parse(params);
			_self.$data.authParams.phoneNum = _self.$data.loginParams.certCode;
		}else{
           this.$router.push( + "/static/webstatic/register/login.html")
		}
		/*_self.$data.user = localStorage.getItem("");
		axios.post(+"/user_api/find_login_user").then(function (response) {
			_self.$data.user = response.data.result.userInfo;
		}).catch(function (error) {
			console.info(error);
		});*/
	},
    methods: {
         goback(){
            this.$router.go(-1)
        },
         validateIdCard:function(idCard) {
	//15位和18位身份证号码的正则表达式
	var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
	//如果通过该验证，说明身份证格式正确，但准确性还需计算
	if (regIdCard.test(idCard)) {
		if (idCard.length == 18) {
			var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
			var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
			var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
			for (var i = 0; i < 17; i++) {
				idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
			}
			var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
			var idCardLast = idCard.substring(17);//得到最后一位身份证号码
			//如果等于2，则说明校验码是10，身份证号码最后一位应该是X
			if (idCardMod == 2) {
				if (idCardLast == "X" || idCardLast == "x") {
					return true;
					//alert("恭喜通过验证啦！");
				} else {
					return false;
					//alert("身份证号码错误！");
				}
			} else {
				//用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
				if (idCardLast == idCardY[idCardMod]) {
					//alert("恭喜通过验证啦！");
					return true;
				} else {
					return false;
					//alert("身份证号码错误！");
				}
			}
		}
	} else {
		//alert("身份证格式不正确!");
		return false;
	}
},
        testemail:function(email_box) {
            //对电子邮件的验证
            var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if (!myreg.test(email_box)) {
                return false;
            }
            return true;
        },
		checkValue:function () {
			var _self = this;
            var params = _self.$data.authParams;
            console.log(params)
			if (params.trueName == "") {
				alert("真实姓名有误！");
				return false;
			}
			if (params.phoneNum == "") {
				alert("手机号码有误！");
				return false;
			}
			if (!_self.validateIdCard(params.idCard)) {
				alert("身份证号有误！");
				return false;
			}
			return true;
		},
		doCheck:function () {
			var _self = this;
			if(_self.checkValue()){
                tipApi.load("正在认证中");
                console.log(_self.$data.authParams)
				this.$http.post("/check_api/authenticate",_self.$data.authParams).then(function (response) {
                    var data = response.data;
                    if ( data.code == 0) {//认证成功
                        tipApi.success("认证成功！",1);
                        tipApi.close("load")
						_self.authSucc();
					} else {//认证失败
						alert(data.message);
						return false;
					}
                    
				}).catch(function (error) {
					console.info(error);
				});
			}
		},
		authSucc:function () {
		
			var _self = this;
			//延迟0.5秒，兼容IOS
			setTimeout(function(){
				var info = _self.getDeviceInfo();
				_self.$data.loginParams.deviceInfo = info;
                _self.loginParams.deviceInfo = info;
                setTimeout(function () {
                    _self.doLogin(_self.loginParams);
                },500)
			},500)
			//alert('--22-');
        },
        getDeviceInfo:function(){
            return appApi.getDeviceInfo();
        },
        doLogin:function(params){
			var _self = this;
            var index_ = tipApi.load("正在登录中");
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
            
            this.$http.post("/user_api/user_login",{params:params}).then(function (response) {
                var rs = response.data;
                console.log("登陆结果",rs)
                if(rs.code == 0) {
                    tipApi.close("load")
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
                        _self.$http.post("/concats_api/checked_message").then(function (response) {
                            //debugger;
                            //alert("检测推送成功！");
                        }).catch(function (error) {
                            //alert("检测推送失败！");
                            console.info(error);
                        });
                    } catch (e) {
                        console.info("出现异常(继续运行代码):" + e);
                    }

                    var url ="/static/webstatic/mycenter/mycenter.html";
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
        
	},
    mounted(){

    },
}
</script>

<style leng='less' scoped>
    @import '../../assets/css/common/style.less';
    label{
        text-align: left
    }
</style>
