<style>
  @import '../../assets/css/myHome/style.css';
  @import '../../assets/css/common/common.less';
</style>
<template>
  <div id="app">
      <section id="mycenter" class="mui-content mycenter-content">
	<div class="myhead">
		<!-- href="my_info.html" -->
		<a class="" onclick="appApi.openNewWindow(getUrl()+'/static/webstatic/mycenter/my_info.html')">
			<div class="oa-contact-cell mui-table">
				<div class="oa-contact-avatar mui-table-cell">
					<img class="my-pic"/>
				</div>
				<div class="oa-contact-content mui-table-cell">
					<h4 class="oa-contact-name"></h4>
					<!--<p class="oa-contact-email"><span class="mui-icon iconfont icon-certification"></span>未认证</p>-->
					<!--<p class="oa-contact-email active"><span class="mui-icon iconfont icon-certification"></span>已认证</p>-->
					<p class="oa-contact-email"></p>
				</div>
			</div>
			<span class="btn-code"></span>
		</a>
	</div>
	<div class="address-list my-list">
		<!--<ul class="mui-table-view mui-grid-view module01-body">
			<li class="mui-table-view-cell mui-media mui-col-xs-3 mui-text-center">
				<div class="menu-item">
					<a href="processed_danju.html">
						<span class="mui-icon my-list-icon label-queren">
							<span class="data-num">9</span>
						</span>
						<span class="menu-item-name">待确认单据</span>
					</a>
				</div>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-3 mui-text-center">
				<div class="menu-item">
					<a href="processed_sign.html">
						<span class="mui-icon my-list-icon label-qiandao">
							<span class="data-num">99<sup class="label-more">+</sup></span>
						</span>
						<span class="menu-item-name">待确认签到</span>
					</a>
				</div>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-3 mui-text-center">
				<div class="menu-item">
					<a href="processed_approval.html">
						<span class="mui-icon my-list-icon label-pingjia"></span>
						<span class="menu-item-name">待评价</span>
					</a>
				</div>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-3 mui-text-center">
				<div class="menu-item">
					<a href="processed_approval.html">
						<span class="mui-icon my-list-icon label-shenpi"></span>
						<span class="menu-item-name">待审批</span>
					</a>
				</div>
			</li>
		</ul>-->

		<!--<ul class="mui-table-view mui-grid-view module01-body">
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-text-center">
				<div class="menu-item">
					<a href="#">
						<span class="my-list-icon label-txt">20</span>
						<span class="menu-item-name">收藏夹</span>
					</a>
				</div>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-text-center">
				<div class="menu-item">
					<a href="#">
						<span class="my-list-icon label-txt">5</span>
						<span class="menu-item-name">关注</span>
					</a>
				</div>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-text-center">
				<div class="menu-item">
					<a href="#">
						<span class="my-list-icon label-txt">2</span>
						<span class="menu-item-name">我的证件</span>
					</a>
				</div>
			</li>
		</ul>-->
		<!--<div class="singlebox">
			<a class="mui-navigate-right" href="#">
				<span class="my-list-icon label-career"></span>
				职业标签
				<span class="mui-badge mui-badge-inverted">项目经理</span>
			</a>
		</div>-->
		<!--<ul class="mui-table g-table">
			<li class="mui-table-cell g-item" onclick="openWindow(getUrl()+'/static/webstatic/mall/market/shop_list.html')">
				<span class="g-img g-shopping"></span>
				<span class="g-con">我的店铺</span>
			</li>
			<li class="mui-table-cell g-item">
				<span class="g-img g-resume"></span>
				<span class="g-con">我的简历</span>
			</li>
		</ul>-->
		<ul class="mui-table-view mui-table-view-striped show-table-view">
			<!--<li class="mui-table-view-cell">-->
				<!--<a class="mui-navigate-right" id="cus_zy_item"  @click="open_zhiye_popver()">-->
					<!--<div class="oa-contact-cell mui-table">-->
						<!--<div class="oa-contact-avatar mui-table-cell">-->
							<!--<span class="my-list-icon label-career"></span>-->
						<!--</div>-->
						<!--<div class="oa-contact-content mui-table-cell">-->
							<!--<h4 class="oa-contact-name">职业标签</h4>-->
						<!--</div>-->
					<!--</div>-->
					<!--&lt;!&ndash;<span  id="cus_zhiye_active" class="mui-badge mui-badge-inverted" v-text="zytag_txt"></span>&ndash;&gt;-->
				<!--</a>-->
			<!--</li>-->
			<li class="mui-table-view-cell" @click="cl">
				<a class="mui-navigate-right">
					<div class="oa-contact-cell mui-table">
						<div class="oa-contact-avatar mui-table-cell">
							<span class="my-list-icon label-enterprise"></span>
						</div>
						<div class="oa-contact-content mui-table-cell">
							<h4 class="oa-contact-name">我的企业</h4>
						</div>
					</div>
				</a>
			</li>
			<li class="mui-table-view-cell" @click="project">
				<a class="mui-navigate-right" href="javascript:appApi.openNewWindow(setting.getUrl()+'/static/webstatic/mycenter/project_list.html')">
					<div class="oa-contact-cell mui-table">
						<div class="oa-contact-avatar mui-table-cell">
							<span class="my-list-icon label-project"></span>
						</div>
						<div class="oa-contact-content mui-table-cell">
							<h4 class="oa-contact-name">我的项目</h4>
						</div>
					</div>
				</a>
			</li>
		</ul>
		<div class="singlebox">
			<a class="mui-navigate-right" href="javascript:appApi.openNewWindow(getUrl()+'/static/webstatic/mycenter/my_collect.html')">
				<span class="my-list-icon label-shoucang"></span>
				我的收藏
				<!--<span class="mui-badge mui-badge-inverted">2</span>-->
			</a>
		</div>
		<!--<div class="singlebox">-->
			<!--<a class="mui-navigate-right" href="javascript:appApi.openNewWindow(getUrl()+'/static/webstatic/mycenter/share_qrcode.html')">-->
				<!--<span class="my-list-icon label-share"></span>-->
				<!--推荐给好友-->
			<!--</a>-->
		<!--</div>-->
		<div class="singlebox">
			<a class="mui-navigate-right" @click="setting">
				<span class="my-list-icon label-setting"></span>
				设置
			</a>
		</div>
	</div>
</section>


<!--职业标签开始-->
<div id="cus_zhiye_popver"  class="pop-up" style="display: none;">
	<div class="pop-title">选择职业标签（多选）</div>
	<div class="pop-content select-box mui-clearfix">
		<div class="s-title">项目成员</div>
		<div class="col-xs-6 mui-clearfix">
			<div class="mui-input-row mui-checkbox mui-left">
				<label>项目经理</label><input type="checkbox" name="checkbox1"  checked/>
			</div>
			<div class="mui-input-row mui-checkbox mui-left">
				<label>施工员</label><input type="checkbox" name="checkbox1"  />
			</div>
			<div class="mui-input-row mui-checkbox mui-left">
				<label>资料员</label><input type="checkbox" name="checkbox1"  />
			</div>
			<div class="mui-input-row mui-checkbox mui-left">
				<label>技术员</label><input type="checkbox" name="checkbox1"  />
			</div>
		</div>
		<div class="s-title">工程公司</div>
		<div class="col-xs-6 mui-clearfix">
			<div class="mui-input-row mui-checkbox mui-left">
				<label>公司领导</label><input type="checkbox" name="checkbox1"  />
			</div>
			<div class="mui-input-row mui-checkbox mui-left">
				<label>财务总监</label><input type="checkbox" name="checkbox1"  />
			</div>
			<div class="mui-input-row mui-checkbox mui-left">
				<label>采购经理</label><input type="checkbox" name="checkbox1"  />
			</div>
			<div class="mui-input-row mui-checkbox mui-left">
				<label>采购人员</label><input type="checkbox" name="checkbox1"  />
			</div>
			<div class="mui-input-row mui-checkbox mui-left">
				<label>工程部经理</label><input type="checkbox" name="checkbox1"  />
			</div>
			<div class="mui-input-row mui-checkbox mui-left">
				<label>工程部人员</label><input type="checkbox" name="checkbox1"  />
			</div>
		</div><div class="s-title">项目甲方</div>
		<div class="col-xs-6 mui-clearfix">
			<div class="mui-input-row mui-checkbox mui-left">
				<label>材料供应商</label><input type="checkbox" name="checkbox1"  />
			</div>
			<div class="mui-input-row mui-checkbox mui-left">
				<label>劳务分包商</label><input type="checkbox" name="checkbox1"  />
			</div>
			<div class="mui-input-row mui-checkbox mui-left">
				<label>专项分包商</label><input type="checkbox" name="checkbox1"  />
			</div>
			<div class="mui-input-row mui-checkbox mui-left">
				<label>包工长</label><input type="checkbox" name="checkbox1"  />
			</div>
			<div class="mui-input-row mui-checkbox mui-left">
				<label>民工</label><input type="checkbox" name="checkbox1"  />
			</div>
		</div>
		<div class="s-title">相关方</div>
		<div class="col-xs-6 mui-clearfix">
			<div class="mui-input-row mui-checkbox mui-left">
				<label>甲方</label><input type="checkbox" name="checkbox1"  />
			</div>
			<div class="mui-input-row mui-checkbox mui-left">
				<label>监理方</label><input type="checkbox" name="checkbox1"  />
			</div>
			<div class="mui-input-row mui-checkbox mui-left">
				<label>审计方</label><input type="checkbox" name="checkbox1"  />
			</div>
			<div class="mui-input-row mui-checkbox mui-left">
				<label>检测方</label><input type="checkbox" name="checkbox1"  />
			</div>
		</div>
	</div>
	<div class="pop-footer btn-contain">
		<button @click="zhiye_confirm()" type="button" class="mui-btn mui-btn-primary mui-btn-block">确定</button>
	</div>
</div>
<!--组织标签结束-->

<!--分享方式开始-->
<!--<div id="" class="mui-popup popup-pure mui-popup-in pop-wtd">
    <div class="mui-popup-title mui-text-left border">分享到<span class="iconfont icon-close"></span></div>
    <div class="mui-popup-content">
        <ul class="share-box">
            <li class="share-item">
                <img src="../../static/images/weix.png" >
                <span class="tips">微信</span>
            </li>
            <li class="share-item">
                <img src="../../static/images/pengyouquan.png">
                <span class="tips">微信朋友圈</span>
            </li>
            <li class="share-item">
                <img src="../../static/images/qq.png">
                <span class="tips">QQ</span>
            </li>
        </ul>
    </div>
</div>-->
<!--分享方式结束-->
      <footer-bar></footer-bar>
  </div>
</template>

<script>
import footerBar from '../common/footerBar'
export default {
  components: {
    footerBar
  },
  data () {
    return {
      items: {},
      user: {
        cert_count: 0,
        cellectCount: 0,
        attentionCount: 0
      },
      imgHost: "",
      allZhiYeTag: [],
      myZhiYeTag: [],
      zhiyeCons: {},
      loadZhiYe: 0,
      zybiaoqian: [],
      zytag_txt: null
    }
  },
  methods: {
    		loginout: function() {
			if(!confirm("确定要退出登录吗？")) {
				return false;
			}
			this.$http.post(setting.getUrl() + "/user_api/user_loginout").then(function(resp) {
				if(appApi.this.isApp) {
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
		relogin: function() {
			if(!confirm("确定要重新登录吗？")) {
				return false;
			}
			this.$http.post("http://java.winfreeinfo.com/user_api/user_loginout").then(function(resp) {

				//清除cookie
				var date = new Date();
				date.setTime(date.getTime() - 10000);
				document.cookie = "userid" + "=; expire=" + date.toGMTString() + "; path=/";
				localStorage.clear();
				if(appApi.this.isApp) {
					window.appApi.relogin();
				} else {
					window.location.href = "../register/login.html";
				}

			}).catch(function(error) {
				console.info(error.date.message);
				remin(error.data.message);
			});
		},
		goShare: function() {
			var url = setting.getUrl() + "/static/webstatic/mycenter/ext/share_detail.html";
			var logo = setting.getUrl() + "/static/images/app-logo.jpg";
			appApi.share(-1, "建云信融APP", "工程人员都在用建云信融，项目沟通找人都非常方便，赶紧用起来", url, logo, null);
		},
		resetpwd: function() {
			var url = setting.getUrl() + "/static/webstatic/mycenter/resetpwd.html";
			window.appApi.openNewWindow(url);
		},
		test: function() {
			var userIds = "36";
			var jsondata = {
				'userIds': "36"
			};
			var param = JSON.stringify(jsondata);
			axios({
				method: 'POST',
				url: setting.getUrl() + "/check_api/check_phone?userIds=" + userIds,
				data: null,
				dataType: 'json',
				headers: {
					'Content-Type': 'application/json;charset=UTF-8'
				}
			}).then(function(resp) {
				confirm(resp.data.code + resp.data.message);
			}).catch(function(error) {
				confirm(error.message);
			});
		},
		open_zhiye_popver: function() {
			mui('#cus_zhiye_popver').popover('toggle');
			appApi.setPullRefresh(false);

			jQuery(".mui-backdrop").click(function() {
					appApi.setPullRefresh(true);
				})
				// mui('body').on('tap','.mui-backdrop',function(){

			// mui('.mui-backdrop').off();
			// });
		},
		load_zhiye: function() {
			var _self = this;
			if(_self.$data.loadZhiYe == 0) {
				axios({
					method: 'GET',
					url: setting.getUrl() + "/work_api/queryAllTag",
					async: false,
					dataType: 'json',
				}).then(function(result) {
					console.info(result.data);
					_self.$data.allZhiYeTag = result.data.result.allZhiYeTag;
					_self.$data.myZhiYeTag = result.data.result.myZhiYeTag;
					_self.$data.zhiyeCons = result.data.result.zhiyetag;
					_self.$data.loadZhiYe = 1;
					if(_self.$data.myZhiYeTag.length == 0) {
						document.getElementById("cus_zhiye_active").innerText = "未设置标签";
						mui('#cus_zhiye_popver').popover('toggle');
						appApi.setPullRefresh(false);
						jQuery(".mui-backdrop").click(function() {
							appApi.setPullRefresh(true);
						})
					}
					mui('#cus_zhiye_popver_sc').scroll();
					var my = result.data.result.myZhiYeTag;
					console.info(my);
					var zytag_txt = null;
					for(var i = 0; i < my.length; i++) {
						var a = my[i].zhiyetagid;
						_self.$data.zybiaoqian.push(a);
						if(zytag_txt) {
							zytag_txt = zytag_txt + "," + my[i].zhiyetagname;
						} else {
							zytag_txt = my[i].zhiyetagname;
						}
					}
					_self.$data.zytag_txt = zytag_txt;

				}).catch(function(error) {
					console.info(error);
				});
			}
			// 打开popver
			/*mui('#cus_zhiye_popver').popover('toggle');*/

		},
		zhiye_confirm: function() {
			var _self = this;
			var zybiaoqian = _self.$data.zybiaoqian;
			var arr = [];
			var zytag_txt = null;

			var allZhiYeTag = _self.allZhiYeTag
			for(var i = 0; i < zybiaoqian.length; i++) {

				for(var k = 0; k < allZhiYeTag.length; k++) {
					var tags = allZhiYeTag[k].datas;
					for(var j = 0; j < tags.length; j++) {
						if(tags[j].zhiyeid == zybiaoqian[i]) {
							var a = {
								"zhiyetagid": tags[j].zhiyeid,
								"zhiyetagname": tags[j].zhiyename,
								"xuhao": tags[j].xuhao
							};
							arr.push(a);

							if(zytag_txt) {
								zytag_txt = zytag_txt + "," + tags[j].zhiyename;
							} else {
								zytag_txt = tags[j].zhiyename;
							}
							break;
						}
					}
				}

				// var arrt = zybiaoqian[i].split(":");
				// var a = {"zhiyetagid":arrt[0],"zhiyetagname":arrt[1]};
				// arr.push(a);
				// if(zytag_txt){
				//     zytag_txt = zytag_txt+","+arrt[1];
				// }else{
				//     zytag_txt = arrt[1];
				// }
			}
			_self.$data.zytag_txt = zytag_txt;
			var param = new FormData();
			param.append("zhiyetags", JSON.stringify(arr));
			axios({
				method: 'POST',
				url: setting.getUrl() + "/work_api/saveMyZYTag",
				// data: {"zhiyetags":JSON.stringify(_self.$data.zybiaoqian)},
				data: param,
				dataType: 'json',
			}).then(function(result) {
				// 关闭popver
				mui('#cus_zhiye_popver').popover('toggle');
				localStorage.removeItem("zhiyes")
				appApi.setPullRefresh(true);
				appApi.refreshNav(2);
			}).catch(function(error) {
				console.info(error);
			});

		},
		cl(){
			this.$router.push({path:'/setUp'})
		},
		setting(){
		  this.$router.push({path:'/setting'});
		  },
		project(){
		  this.$router.push({path:'/project'});
		}
  },
  mounted() {
    created:()=> {
      var _self = this;
      this.$http.post("http://java.winfreeinfo.com/user_api/find_login_user").then(function(response) {
        _self.$data.user = response.data.result.userInfo;
        console.log("用户",_self.$data.user)
      }).catch(function(error) {
        console.info(error);
      });

      this.load_zhiye();
    }
    function openWindow(url) {
      window.appApi.openNewWindow(url);
    }
  }
}
</script>
