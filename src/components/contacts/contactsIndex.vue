<template>
  <div id="app">
    <header class="mui-bar mui-bar-nav">
		<h1 class="mui-title">联系人</h1>
		<a class="mui-icon iconfont icon-personadd mui-pull-right" href="#popover-add"></a>
		<a class="mui-icon mui-icon-search mui-pull-right"></a>
	</header>

<div id="popover-add" class="mui-popover top-menu">
	<div class="mui-popover-arrow"></div>
	<ul class="mui-table-view">
		<!--<li class="mui-table-view-cell" onclick="app.doShare()">分享</li>-->
		<li class="mui-table-view-cell">
			<a href="javascript:appApi.openNewWindow(pagepath+'/contacts/team_create.html')">
				<span class="mui-icon iconfont icon-add02"></span>创建企(事)业组织
			</a>
		</li>
		<li class="mui-table-view-cell">
			<a href="javascript:appApi.openNewWindow(pagepath+'/contacts/team_search.html')">
				<span class="mui-icon iconfont icon-search"></span>加入企(事)业组织
			</a>
		</li>
		<li class="mui-table-view-cell" onclick="appApi.sweepQrCode()"><span class="mui-icon iconfont icon-personadd"></span>扫码加建云好友</li>
		<!--<li class="mui-table-view-cell" onclick="appApi.openNewWindow(pagepath+'/contacts/phone_list.html')">添加好友</li>-->
	</ul>
</div>
<section class="mui-content" id="team_list">
	<div id="tabbar-with-contact" class="mui-control-content address-list mui-active">
		<ul class="mui-table-view mui-table-view-striped">
			<li class="mui-table-view-cell">
				<a href="javascript:appApi.openNewWindow(pagepath+'/contacts/eg_list.html')"><div class="mui-slider-cell">
					<div class="oa-contact-cell mui-table">
						<div class="oa-contact-avatar mui-table-cell">
							<img src="../../assets/images/ico_connect.gif" />
						</div>
						<div class="oa-contact-content mui-table-cell">
							<h4 class="oa-contact-name">建云好友</h4>
						</div>
					</div>
				</div></a>
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
		<div v-for="(item,index) in projects" :key="index">
			<ul class="mui-table-view">
				<button v-if="item.memberType=='1'" :onclick="['appApi.openNewWindow(getUrl()+\'/static/webstatic/contacts/group_manage.html?teamId='+item.teamId+'&code='+item.identifyNo+'\')']" class="mui-btn mui-btn-link btn-invite"><span class="mui-icon iconfont icon-manage"></span>管理</button>
				<li class="mui-table-view-cell mui-collapse fold-title">
					<a @click ="clickshow">
						<div class="mui-slider-cell">
							<div class="oa-contact-cell mui-table">
								<div class="oa-contact-avatar mui-table-cell">
									<img src="../../assets/images/ico_connect_project.jpg" />
								</div>

								<div class="oa-contact-content mui-table-cell">
									<!--<button v-if="item.memberType=='1'" :onclick="['appApi.openNewWindow(getUrl()+\'/static/webstatic/contacts/group_manage.html?teamId='+item.teamId+'&code='+item.identifyNo+'\')']" class="mui-btn mui-btn-link btn-invite"><span class="mui-icon iconfont icon-invitation"></span>管理</button>-->
									<h4 class="oa-contact-name" v-text="item.ProjectName"></h4>
								</div>

							</div>
						</div>
					</a>

					<ul class="mui-table-view" v-show="true">
						<li class="mui-table-view-cell">
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

						<li class="mui-table-view-cell">
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

						<li class="mui-table-view-cell">
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

		<div v-for="(item,index) in items" :key="index">
			<ul class="mui-table-view">
				<button v-if="item.memberType=='1'" :onclick="['appApi.openNewWindow(getUrl()+\'/static/webstatic/contacts/group_manage.html?teamId='+item.teamId+'&code='+item.identifyNo+'\')']" class="mui-btn mui-btn-link btn-invite"><span class="mui-icon iconfont icon-manage"></span>管理</button>
				<li class="mui-table-view-cell mui-collapse fold-title">
					<a @click ="clickshow">
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

					<ul class="mui-table-view" v-show="true">
						<li class="mui-table-view-cell">
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

						<li class="mui-table-view-cell">
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
						</li>
					</ul>
				</li>
			</ul>
		</div>


		<ul class="mui-table-view mui-table-view-striped mui-table-view-condensed">
			<li class="mui-table-view-cell">
				<a href="javascript:appApi.openNewWindow(pagepath+'/contacts/phone_list.html')"><div class="mui-slider-cell">
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

		<ul class="mui-table-view mui-table-view-chevron">
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
				</a>
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
			</li>
		</ul>

	</div>
</section>
	<footer-bar></footer-bar>
  </div>
</template>

<script>
import footerBar from '../common/footerBar'

export default {
  components: {
    footerBar,
  },
  data () {
    return {
    items:[],
    projects:[],
    //userInfo:window.appApi.getUserInfo()
    userInfo:[]
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
      created: function () {
        var _self = this;
        this.$http.post('http://java.winfreeinfo.com/concats_api/find_team_list',{}).then(function (response) {
            console.log("数据",response.data.result)
            _self.$data.items = response.data.result;
        }).catch(function (error) {
            console.info(error);
        });

        this.$http.post('http://java.winfreeinfo.com/chart/column/table_swprojectinfo?used=getPro',{}).then(function (response) {
            console.log("数据",response.data.result)
            _self.$data.projects = response.data.result;
        }).catch(function (error) {
            console.info(error);
        });

        //延迟0.5秒，兼容IOS
        setTimeout(function(){
            if (appApi.this.isApp && isIphoneOs) {//IOS
                window.appApi.getUserInfo();
            } else if (appApi.this.isApp && isAndroid) {
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
    clickshow: function () {
            // alert($(this).className);
            return true;
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
</style>
