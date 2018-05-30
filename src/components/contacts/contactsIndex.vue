<template>
  <div id="app">
    <header class="mui-bar mui-bar-nav">
		<h1 class="mui-title">联系人</h1>
		<a class="mui-icon iconfont icon-personadd mui-pull-right" @click="popover"></a>
		<!-- <a class="mui-icon mui-icon-search mui-pull-right"></a> -->
	</header>
<div :class="{'mui-backdrop mui-active' : show == true}" @click="popover"></div>
<div id="popover-add" class="mui-popover top-menu" :class="{'mui-active1' : show == true}">
	<div class="mui-popover-arrow" style="left:174px"></div>
	<ul class="mui-table-view">
		<!--<li class="mui-table-view-cell" onclick="app.doShare()">分享</li>-->
		<li class="mui-table-view-cell" @click="create">
			<a>
				<span class="mui-icon iconfont icon-add02"></span>创建企(事)业组织
			</a>
		</li>
		<li class="mui-table-view-cell" @click="search">
			<a href="javascript:appApi.openNewWindow(pagepath+'/contacts/team_search.html')">
				<span class="mui-icon iconfont icon-search"></span>加入企(事)业组织
			</a>
		</li>
		<li class="mui-table-view-cell" :click="sweepQrCode"><span class="mui-icon iconfont icon-personadd"></span>扫码加建云好友</li>
		<!--<li class="mui-table-view-cell" onclick="appApi.openNewWindow(pagepath+'/contacts/phone_list.html')">添加好友</li>-->
	</ul>
</div>
<section class="mui-content" id="team_list">
	<div id="tabbar-with-contact" class="mui-control-content address-list mui-active">
		<ul class="mui-table-view mui-table-view-striped heig" @click="friends">
			<li class="mui-table-view-cell">
				<div class="mui-slider-cell">
					<div class="oa-contact-cell mui-table">
						<div class="oa-contact-avatar mui-table-cell">
							<img src="../../assets/images/ico_connect.gif" />
						</div>
						<div class="oa-contact-content mui-table-cell">
							<h4 class="oa-contact-name">建云好友</h4>
						</div>
					</div>
				</div>
			</li>

			<!--<li class="mui-table-view-cell">-->
				<!--<a href="javascript:appApi.openNewWindow(pagepath+'/contacts/my_group.html')"><div class="mui-slider-cell">-->
					<!--<div class="oa-contact-cell mui-table">-->
						<!--<div class="oa-contact-avatar mui-table-cell">-->
							<!--<img src="../../images/ico_groupchat.gif"/>-->
						<!--</div>-->
						<!--<div class="oa-contact-content mui-table-cell">-->
							<!--<h4 class="oa-contact-name">我的群组</h4>-->
						<!--</div>-->
					<!--</div>-->
				<!--</div></a>-->
			<!--</li>-->
		</ul>
		<!--项目联系人-->
		<div v-for="(itemone,submenu) in projects" :key="submenu">
			<ul class="mui-table-view heig">
				<button v-if="itemone.memberType=='1'" :onclick="['appApi.openNewWindow(getUrl()+\'/static/webstatic/contacts/group_manage.html?teamId='+itemone.teamId+'&code='+itemone.identifyNo+'\')']" class="mui-btn mui-btn-link btn-invite"><span class="mui-icon iconfont icon-manage"></span>管理</button>
				<li class="mui-table-view-cell mui-collapse fold-title">
					<a @click ="clickshow(submenu)" class="border-bottom">
						<div class="mui-slider-cell">
							<div class="oa-contact-cell mui-table">
								<div class="oa-contact-avatar mui-table-cell">
									<img src="../../assets/images/ico_connect_project.jpg" />
								</div>

								<div class="oa-contact-content mui-table-cell">
									<!--<button v-if="item.memberType=='1'" :onclick="['appApi.openNewWindow(getUrl()+\'/static/webstatic/contacts/group_manage.html?teamId='+item.teamId+'&code='+item.identifyNo+'\')']" class="mui-btn mui-btn-link btn-invite"><span class="mui-icon iconfont icon-invitation"></span>管理</button>-->
									<h4 class="oa-contact-name" v-text="itemone.ProjectName"></h4>
								</div>

							</div>
						</div>
					</a>

					<ul class="mui-table-view-cell heig" :class="{'hide' : Listshow.indexOf(submenu) == -1}" >
						<li class="mui-table-view-cell" @click="project(submenu)">
							<div class="mui-slider-cell">
								<div class="oa-contact-cell mui-table">
									<div class="oa-contact-avatar mui-table-cell">
										<img src="../../assets/images/ico_second.gif" />
									</div>
									<div class="oa-contact-content mui-table-cell">
										<h4 class="oa-contact-name">邀请加入项目</h4>
									</div>
								</div>
							</div>
						</li>

						<li class="mui-table-view-cell heig" @click="Office(submenu)">
							<div class="mui-slider-cell">
								<div class="oa-contact-cell mui-table">
									<div class="oa-contact-avatar mui-table-cell">
										<img src="../../assets/images/ico_second.png" />
									</div>
									<div class="oa-contact-content mui-table-cell">
										<h4 class="oa-contact-name">邀请加入我的办公室</h4>
									</div>
								</div>
							</div>
						</li>

						<li class="mui-table-view-cell heig" @click="participate(submenu)">
							<div class="mui-slider-cell">
								<div class="oa-contact-cell mui-table">
									<div class="oa-contact-avatar mui-table-cell">
										<img src="../../assets/images/ico_second.png" />
									</div>
									<div class="oa-contact-content mui-table-cell">
										<h4 class="oa-contact-name">查看所有参与方</h4>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
							<!-- <ul class="mui-table-view" v-show="true">
						<li class="mui-table-view-cell" @click ="javascript:appApi.openNewWindow(getUrl()+'/static/newwebstatic/add_style.html?dataType=2&memberType=2&projectSn='+item.serialNum)">
							<div class="mui-slider-cell">
								<div class="oa-contact-cell mui-table">
									<div class="oa-contact-avatar mui-table-cell">
										<img src="../../images/ico_second.gif" />
									</div>
									<div class="oa-contact-content mui-table-cell">
										<h4 class="oa-contact-name">邀请加入其他方</h4>
									</div>
								</div>
							</div>
						</li>

						<li class="mui-table-view-cell" @click ="javascript:appApi.openNewWindow(getUrl()+'/static/newwebstatic/add_style.html?dataType=1&memberType=2&projectSn='+item.serialNum+'&roomId='+item.roomId)">
							<div class="mui-slider-cell">
								<div class="oa-contact-cell mui-table">
									<div class="oa-contact-avatar mui-table-cell">
										<img src="../../images/ico_second.png" />
									</div>
									<div class="oa-contact-content mui-table-cell">
										<h4 class="oa-contact-name">邀请加入本方</h4>
									</div>
								</div>
							</div>
						</li>

						<li class="mui-table-view-cell" @click ="javascript:appApi.openProjectContact(item.serialNum,item.ProjectName)">
							<div class="mui-slider-cell">
								<div class="oa-contact-cell mui-table">
									<div class="oa-contact-avatar mui-table-cell">
										<img src="../../images/ico_second.png" />
									</div>
									<div class="oa-contact-content mui-table-cell">
										<h4 class="oa-contact-name">查看项目各方</h4>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul> -->
		<div v-for="(item,submenuIcon) in items" :key="submenuIcon">
			<ul class="mui-table-view heig">
				<button v-if="item.memberType=='1'" @click="administration(item.teamId,item.identifyNo)" class="mui-btn mui-btn-link btn-invite"><span class="mui-icon iconfont icon-manage"></span>管理</button>
				<li class="mui-table-view-cell mui-collapse fold-title">
					<a @click ="clickshowone(submenuIcon)" class="border-bottom">
						<div class="mui-slider-cell">
							<div class="oa-contact-cell mui-table">
								<div class="oa-contact-avatar mui-table-cell">
									<img src="../../assets/images/ico_connect_qiye.jpg" />
								</div>

								<div class="oa-contact-content mui-table-cell">
									<!--<button v-if="item.memberType=='1'" :onclick="['appApi.openNewWindow(getUrl()+\'/static/webstatic/contacts/group_manage.html?teamId='+item.teamId+'&code='+item.identifyNo+'\')']" class="mui-btn mui-btn-link btn-invite"><span class="mui-icon iconfont icon-invitation"></span>管理</button>-->
									<h4 class="oa-contact-name" v-text="item.teamName"></h4>
								</div>

							</div>
						</div>
					</a>

					<ul class="mui-table-view-cell heig" style="padding:0;" :class="{'hide' : Listshow1.indexOf(submenuIcon) == -1}"  @click="enterprise(submenuIcon)">
						<li class="mui-table-view-cell" style="margin-top:10px;">
							<div class="mui-slider-cell">
								<div class="oa-contact-cell mui-table">
									<div class="oa-contact-avatar mui-table-cell">
										<img src="../../assets/images/ico_second.gif" />
									</div>
									<div class="oa-contact-content mui-table-cell">
										<h4 class="oa-contact-name">组织架构</h4>
									</div>
								</div>
							</div>
						</li>

						<!-- <li class="mui-table-view-cell">
							<div class="mui-slider-cell">
								<div class="oa-contact-cell mui-table">
									<div class="oa-contact-avatar mui-table-cell">
										<img src="../../assets/images/ico_second.png" />
									</div>
									<div class="oa-contact-content mui-table-cell">
										<h4 class="oa-contact-name">外部联系人</h4>
									</div>
								</div>
							</div>
						</li> -->
					</ul>
				</li>
			</ul>
		</div>


		<ul class="mui-table-view mui-table-view-striped mui-table-view-condensed heig">
			<li class="mui-table-view-cell">
				<a @click="phone"><div class="mui-slider-cell">
					<div class="oa-contact-cell mui-table">
						<div class="oa-contact-avatar mui-table-cell">
							<img src="../../assets/images/ico_telebook.gif" />
						</div>
						<div class="oa-contact-content mui-table-cell">
							<h4 class="oa-contact-name">手机通讯录</h4>
						</div>
					</div>
				</div></a>
			</li>
		</ul>

		<!-- <ul class="mui-table-view mui-table-view-chevron">
			<li class="mui-table-view-cell mui-collapse fold-title mui-active">
				<a href="javascript:void(0)">
					<div class="mui-slider-cell">
						<div class="oa-contact-cell mui-table">
							<div class="oa-contact-avatar mui-table-cell">
								<img src="../../assets/images/ico_frequently.gif" />
							</div>
							<div class="oa-contact-content mui-table-cell">
								<h4 class="oa-contact-name">常用联系人</h4>
							</div>
						</div>
					</div>
				</a> -->
				<!--<ul class="mui-table-view mui-table-view-chevron">-->
					<!--<li class="mui-table-view-cell">-->
						<!--<div class="mui-slider-cell">-->
							<!--<div class="oa-contact-cell mui-table">-->
								<!--<div class="oa-contact-avatar mui-table-cell">-->
									<!--<img src="../../images/header.jpg" />-->
								<!--</div>-->
								<!--<div class="oa-contact-content mui-table-cell">-->
									<!--<h4 class="oa-contact-name">陈导</h4>-->
								<!--</div>-->
							<!--</div>-->
						<!--</div>-->
					<!--</li>-->
					<!--<li class="mui-table-view-cell">-->
						<!--<div class="mui-slider-cell">-->
							<!--<div class="oa-contact-cell mui-table">-->
								<!--<div class="oa-contact-avatar mui-table-cell">-->
									<!--<img src="../../images/header2.jpg" />-->
								<!--</div>-->
								<!--<div class="oa-contact-content mui-table-cell">-->
									<!--<h4 class="oa-contact-name">柏树</h4>-->
								<!--</div>-->
							<!--</div>-->
						<!--</div>-->
					<!--</li>-->
				<!--</ul>-->
			<!-- </li>
		</ul> -->

	</div>
</section>
	<footer-bar></footer-bar>
  </div>
</template>

<script>
import footerBar from '../common/footerBar'
// import {findTeamList} from '../../api/seek'
export default {
  components: {
	footerBar,
  },
  data () {
    return {
	show: false,
	show1: false,
	show2: false,
    items:[],
    projects:[],
    //userInfo:window.appApi.getUserInfo()
	userInfo:[],
	Listshow: [],
	Listshow1: [],
	}
  },
  mounted() {
    var _mtac = {};
    (function() {
        var mta = document.createElement("script");
        mta.src = "https://pingjs.qq.com/h5/stats.js?v2.0.4";
        mta.setAttribute("name", "MTAH5");
        mta.setAttribute("sid", "500574988");

        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(mta, s);
    })();
    Adaptive.adpPage(true,"lxr");
    // var webPath = setting.getUrl();
    // var pagepath = setting.getPagePath();

    function reLoad() {
        window.location.reload();
    }
    window.appApi.callBackFun = function(callFlag, CONTENT) {
    if(callFlag == appApi.callBackFlag.USER_INFO) {
        app.userInfo = JSON.parse(CONTENT);//转换成json对象
    }
}
  },
      created() {
		  //  企业信息
        var _self = this;
        this.$http.post('/api/concats_api/find_team_list',{}).then(function (response) {
            console.log("数据",response.data.result)
			_self.$data.items = response.data.result;
        }).catch(function (error) {
            console.info(error);
        });
		// this.seekFindTeamList()
        this.$http.post('/api/chart/column/table_swprojectinfo?used=getPro',{}).then(function (response) {
            console.log("数据",response.data.result)
			_self.$data.projects = response.data.result;
			console.log(_self.$data.projects);
        }).catch(function (error) {
            console.info(error);
        });

        //延迟0.5秒，兼容IOS
        setTimeout(function(){
            if (appApi.isApp && appApi.isIphoneOs) {//IOS
				window.appApi.getUserInfo();
            } else if (appApi.isApp && appApi.isAndroid) {
                var userInfoAndroid = window.appApi.getUserInfo();
                _self.$data.userInfo = JSON.parse(userInfoAndroid)
                //alert(_self.$data.userInfo.userId);
            } else {
                console.info("设备不支持");
            }
		},500)
	window.appApi.callBackFun = function(callFlag, CONTENT) {
    if(callFlag == appApi.callBackFlag.USER_INFO) {
        app.userInfo = JSON.parse(CONTENT);//转换成json对象
    }
}
    },
  methods:{
	create(){
		this.$router.push({path:'/team_create'})
	},
	search(){
		this.$router.push({path:'/team_search'})
	},
	popover(){
		this.show = !this.show
	},
	enterprise(submenuIcon){
		this.$router.push({path:'/orgStructure',query:{from:0,teamId:this.items[submenuIcon].teamId}})
	},
	seekFindTeamList () {
		findTeamList().then((res) => {
			console.log(res)
			this.items = res.data.result;
		}).catch((res) => {
			console.log(res)
		})
	},
	administration(teamId,identifyNo){
		this.$router.push({path:'/groupManage',query:{teamId:teamId,code:identifyNo}})
	},
	phone(){
		this.$router.push({path:'/phoneList'})
	},
	sweepQrCode(){
		window.appApi.sweepQrCode();
	},
    clickshow(submenu) {
			console.log(submenu);
			const newIndex = this.Listshow.indexOf(submenu);
			if (newIndex === -1) {
				this.Listshow.push(submenu);
				console.log('aaaaa',newIndex)
			} else {
				this.Listshow.splice(newIndex);
			}
		},
	clickshowone(submenuIcon){
		console.log(submenuIcon);
		const newIndex1 = this.Listshow1.indexOf(submenuIcon);
		console.log(newIndex1)
		if (newIndex1 === -1) {
			this.Listshow1.push(submenuIcon);
			console.log('aaaaa',newIndex1)
		} else {
			this.Listshow1.splice(newIndex1);
		}
	},
	project(submenu){
		this.$router.push({path:'/addstyle',query:{projectSn:this.projects[submenu].serialNum,dataType:2,memberType:2}})
	},	
	Office(submenu){
		this.$router.push({path:'/addstyle',query:{projectSn:this.projects[submenu].serialNum,dataType:1,memberType:2,roomId:this.projects[submenu].roomId}})
	},
	participate(submenu){
		appApi.openProjectContact(this.projects[submenu].serialNum,this.projects[submenu].ProjectName);
	},
	friends(){
		this.$router.push({path:'/egList'})
	},
	doShare:function () {
		var _self = this;
		//alert(_self.$data.userInfo.userId);
		//JSON.parse( _self.$data.userInfo)
		//var obj = eval('(' + _self.$data.userInfo + ')');
		//var userId=_self.$data.userInfo.userId;
		var userId = _self.$data.userInfo.userId;
		//alert("--1!-"+userId);

		var url = setting.getUrl() + "/static/webstatic/register/share_reg.html?type=1&invUser=" + userId;
		var logo = setting.getUrl() + "/static/images/app-logo.jpg";
		appApi.share(-1,"您有一条好友申请","点击我进入注册吧",url,logo,null);
	}
    }
}

</script>

<style> 
	@import "../../assets/css/common/style.less";
	.hide{
		display: none
	}
	.border-bottom{
		border-bottom: 1px solid #ccc
	}
	.mui-active1{
		display: block;
		opacity: 1;
		right: 5px;
    	top: 55px;
	}
	.heig{
		height:63px
	}
</style>
