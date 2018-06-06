<template>
  <div id="app">
	<header class="mui-bar mui-bar-nav">
		<h1 class="mui-title">设置</h1>
		<button class="mui-btn mui-btn-link mui-pull-left" @click="goBack"><span class="mui-icon iconfont icon-back"></span>返回</button>
	</header>
	
	<section id="mycenter" class="mui-content mycenter-content">
		<div class="address-list ">
			<ul class="mui-table-view mui-table-view-striped" >
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right" href="#">
						<div class="oa-contact-cell mui-table">
							<!--<div class="oa-contact-avatar mui-table-cell">
								<span class="my-list-icon label-denglu"></span>
							</div>-->
							<div class="oa-contact-content mui-table-cell" @click="login">
								<h4 class="oa-contact-name">重新登录</h4>
							</div>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right" href="#">
						<div class="oa-contact-cell mui-table">
							<!--<div class="oa-contact-avatar mui-table-cell">
								<span class="my-list-icon label-reset"></span>
							</div>-->
							<div class="oa-contact-content mui-table-cell" @click="backpwd">
								<h4 class="oa-contact-name">修改密码</h4>
							</div>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right" href="#">
						<div class="oa-contact-cell mui-table">
							<!--<div class="oa-contact-avatar mui-table-cell">
								<span class="my-list-icon label-exit"></span>
							</div>-->
							<div class="oa-contact-content mui-table-cell" @click="loginout">
								<h4 class="oa-contact-name">退出程序</h4>
							</div>
						</div>
					</a>
				</li>
			</ul>
			<div class="singlebox" @click="deletes">
						<a id="confirmBtn" class="mui-navigate-right">清除缓存<span class="mui-badge mui-badge-inverted" v-text="cooke"></span></a>
					</div>
			<div class="singlebox"  @click="share">
				<a class="mui-navigate-right">
					<!--<span class="my-list-icon label-share"></span>-->
					推荐给好友
				</a>
			</div>
			<div class="singlebox" @click="cmApi.customerOpen()">
				<a class="mui-navigate-right" href="#">
					<!--<span class="my-list-icon label-service"></span>-->
					联系客服
				</a>
				<!--<span class="mui-badge mui-badge-red" id="unreadNum"></span>-->
			</div>
			<div class="singlebox" @click="aboutus">
				<a class="mui-navigate-right">
					<!--<span class="my-list-icon label-guanyu"></span>-->
					关于我们
				</a>
			</div>
			<div class="singlebox" @click="addproject">
				<a class="mui-navigate-right">
					<!--<span class="my-list-icon label-guanyu"></span>-->
					收付款
				</a>
			</div>
		</div>
		
		<!--遮罩层-->
	<div class="mui-backdrop" style="display: none;z-index: 999;" v-if="cookes==1"></div>

	<!--清除缓存-->
	<div class="mui-popup popup-pure mui-popup-in" v-if="cookes==1">
		<div class="mui-popup-title">清除缓存</div>
		<form class="mui-input-group">
			<div class="sppd-content tip-con">
				确定清空全部缓存
			</div>
			<div class="mui-button-row mui-table">
				<div class="mui-table-cell" @click="no">
					<button type="button" class="mui-btn">取消</button>
				</div>
				<div class="mui-table-cell" @click="yes">
					<button type="button" class="mui-btn mui-btn-link" >确定</button>
				</div>
			</div>
		</form>
	</div>
	</section>
  </div>
</template>

<script>
import shareBar from './share.vue'
export default {
	components:{
		shareBar
	},
	data(){
		return{
			sharetrue: false,
			cookes:'',
			cooke:window.appApi.getAppCacheSize(),
		}
	},
	created(){
	},
	methods:{
		goBack(){
			this.$router.go(-1);
		},
		login(){
			this.$router.push({path:'/static/webstatic/register/login.html'});
		},
		backpwd(){
			this.$router.push({path:'/backpwd'});
		},
		share(){
			this.$router.push({path:'/share'});
		},
		aboutus(){
			this.$router.push({path:'/aboutUs'});
		},
		addproject(){
			this.$router.push({path:'/static/newwebstatic/shoufukuan/work_content.html'});
		},
		deletes(){
			this.$data.cooke=	window.appApi.getAppCacheSize();
			this.$data.cookes=1
//			mui.confirm('确定清空全部缓存', '清除缓存', btnArray, function(e) {
//				if(e.index == 1) {
//					window.appApi.clearAppCache();
//					document.getElementById("appCacheSize").innerText = window.appApi.getAppCacheSize();
//				}
//			})
		},
		yes(){
			this.$data.cookes=2
			window.appApi.clearAppCache();
			this.$data.cooke = window.appApi.getAppCacheSize();
		},
		no(){
			this.$data.cookes=2
		},
		loginout() {
			if(!confirm("确定要退出登录吗？")) {
				return false;
			}
			axios.post(getUrl() + "/user_api/user_loginout").then(function(resp) {
				if(isApp) {
					window.appApi.loginout();
				} else {
					window.location.href = "../register/login.html";
				}
				// if (resp.data.code == 200) {
				//     console.info(resp.message);
				//     window.location.href = "../register/login.html";
				// } else {
				//     console.info(resp.data.message);
				//     remin(resp.data.message);
				// }
			}).catch(function(error) {
				console.info(error.date.message);
				remin(error.data.message);
			});
		},
		
	}
}
</script>

<style>
body{
	background: #efeff4 !important;
}
	.oa-contact-name{
		color: #000;
	}
.address-list.my-list .mui-table-view-cell:after{
	left: 15px;
}
.singlebox > a:not(.mui-btn){
	text-align: left;
	font-size: 15px;
}
.singlebox > .mui-navigate-right > .mui-badge{
	font-size: 15px;
}
</style>
