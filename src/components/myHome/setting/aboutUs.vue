<template>
	 <div id="app">
	<header class="mui-bar mui-bar-nav">
		<h1 class="mui-title">关于我们</h1>
		<button @click="goBack" id="btn-referrer" class="mui-action-back mui-btn mui-btn-link mui-btn-nav mui-pull-left ">
			<span class="mui-icon mui-icon-back"></span>返回
		</button>
		<!--<a class="mui-icon iconfont icon-back mui-pull-left"></a>-->
	</header>
	<section class="mui-content about-info">
		<div id="content">
		<div class="logo-box">
			<img class="logo" src="../../../assets/images/company_logo.png">
			<p class="secondary">当前版本：<span v-text="name"></span></p>
		</div>
		<!--<ul class="mui-table-view eg-table-view">
			<li class="mui-table-view-cell">
				<a class="mui-navigate-right" href="about_detail.html">功能介绍</a>
			</li>
			<li class="mui-table-view-cell">
				<a class="mui-navigate-right">检查更新<span class="label-new">New</span></a>
			</li>
		</ul>-->
		<!--<div class="about-content">-->
			<!--<p>建云信融是一套针对国内工程行业，以工程项目的过程协作为基础，以提高协作方便性、效率为目的的一个互联网平台。使用和服务对象以项目方为主体，关联到跨企业的工程各方，包括甲方、监理方、设计方、劳务方、分包商、材料商等。业务范围包含合同以及“四流”数据的管理，现场形象视频、节点及回款进度管理、档案管理、项目收发件管理、现场收货、报量、打卡的管理等等。</p>-->
			<!--&lt;!&ndash;<p>建云信融：工程项目可视化的协作平台</p>&ndash;&gt;-->
			<!--&lt;!&ndash;<p>平台提供一系列标准化的项目管理工具，以项目信息可视化达到多组织相互协作的流通性，以降低管理难度、控制项目风险完成成本管理的，以项目数据真实性安全性提升项目整体的实时效率。达到工程作业相互信任，高效工作。</p>&ndash;&gt;-->
		<!--</div>-->
			<div class="about-content">
				<p>建云信融是一套针对国内工程行业，以工程项目的过程协作为基础，以提高协作方便性、效率为目的的一个互联网平台。使用和服务对象以项目方为主体，关联到跨企业的工程各方，包括甲方、监理方、设计方、劳务方、分包商、材料商等。业务范围包含合同以及“四流”数据的管理，现场形象视频、节点及回款进度管理、档案管理、项目收发件管理、现场收货、报量、打卡的管理等等。</p>
			</div>
			<div class="about-footer">
				<p class="info-link">
					<a href="javascript:appApi.openNewWindow(getUrl()+'/static/webstatic/mycenter/service_agreement.html')">服务协议</a>
					<a href="javascript:appApi.openNewWindow(getUrl()+'/static/webstatic/mycenter/privacy_policy.html')">隐私政策</a>
				</p>
				<!--<p class="info-link">&lt;!&ndash;<a href="#">官网</a>&ndash;&gt;<a href="service_agreement.html">服务条款</a></p>-->
				<p class="copy-right">Copyright©2017 建云信融</p>
			</div>
		</div>
	</section>
	</div>
</template>

<script>
	export default {
    data(){
        return{
            name:"设备不支持",
            code:"设备不支持",
        }
    },
     created: function () {
        var result = window.appApi.getVersionInfo();
        window.appApi.callBackFun = function(callFlag, CONTENT) {
            if(callFlag == appApi.callBackFlag.VERSION) {
                result = CONTENT.result;
            }
        }
        window.appApi.getVersionInfo();
        if (result && result.indexOf("设备不支持获取版本信息")>-1){
	                    alert("请在手机上查看版本号");
            return;
        }
        var arrays = result.split("&");
        var map = {};
//      for (i = 0; i < arrays.length; i++) {
//          var param = arrays[i].split("=");
//          map[param[0]] = decodeURI(param[1]);
//      }
//      this.name=map.VersionName;
//      this.code=map.VersionCode;
		this.name=arrays[0].split("=")[1];
        this.code=arrays[1].split("=")[1];
        
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        }
    },
    mounted(){
    }
}
	
//	var content = new Vue({
//          el: '#content',
//          data: {
//              
//          },
//          created: function () {
//              var result= appApi.getVersionInfo();
//              if (result && result.indexOf("设备不支持获取版本信息")>-1){
//                  msg("请在手机上查看版本号");
//                  return;
//				}
//              var arrays = result.split("&");
//              var map = {};
//              for (i = 0; i < arrays.length; i++) {
//                  var param = arrays[i].split("=");
//                  map[param[0]] = decodeURI(param[1]);
//              }
//              this.name=map.VersionName;
//              this.code=map.VersionCode;
//          },
//
//      });
</script>

<style>
</style>