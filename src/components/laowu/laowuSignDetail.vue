<template>
  <div>
     
<header class="mui-bar mui-bar-nav">
	<h1 class="mui-title">工人签到详情</h1>
	<button id="btn-referrer" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left hide">
		<span class="mui-icon mui-icon-back"></span>
	</button>
</header>

<section class="mui-content">
	<div id="app">
		<ul v-for="(item,index) in data.recordList" :key="index" class="mui-table-view mui-table-view-striped sign-view">
			<h5 class="mui-content-padded" v-text="item.userName"></h5>
			<li v-for="(user,index) in item.list" :key="index" class="mui-table-view-cell">
				<div class="oa-contact-cell mui-table">
					<div class="oa-contact-avatar mui-table-cell sign-img">
						<img class="mui-action-preview"  v-bind:src="user.photoAddress" />
					</div>
					<div class="oa-contact-content mui-table-cell">
						<h4 class="oa-contact-name sign-time" v-text="user.title"></h4>
						<p class="oa-contact-email" v-text="user.gpsAddress"></p>
					</div>
				</div>
			</li>
		</ul>
	</div>
</section>

  </div>
</template>

<script>
var paramMap=null;
import laowu_common from "./js/laowu_common.js";
export default {
  data() {
    return {
      form: {},
      dataList: [],
      gongrenCount: "",
      shigongduiCount: "",
      header_name: "加载中",
      projectId: "",
      projectName: "",
      queryTime: "",
      data: {
        recordList: []
      },
      reqWorkParamsVO: {
        userId: "",
        confirmId: "",
        queryTime: "",
        queryType: "",
        loginType: "",
        projectId: ""
      }
    };
  },
  created: function() {
    var _self = this;
    laowu_common.initVue(_self);
     paramMap=laowu_common.paramMap;
     var projectId=laowu_common.projectId
    if (laowu_common.dataType == "signdetail") {
      _self.loadAttDetail();
    } else {
      _self.loadData();
    }
    setTimeout(function() {
      _self.projectId = projectId;
      _self.findProjectData(projectId);
    }, 300);
  },
  methods: {
    loadData: function() {
      var _self = this;
      var formData = new FormData();
      formData.append("day", laowu_common.queryTime);
      formData.append("projectId", laowu_common.projectId);
      formData.append("type", "shigongyuan");
      _self.$http
        .post("/attendance_api/commonList_by_day", formData)
        .then(function(response) {
          if (response.data.code == 0) {
            var result = response.data.result;
            console.log("结果列表", result);
            setTimeout(function() {
              _self.gongrenCount = result.gongrenCount;
              _self.shigongduiCount = result.shigongduiCount;
              _self.dataList = result.dataList;
              _self.queryTime = laowu_common.queryTime;
            }, 50);
          } else {
            msg("查询失败!");
          }
        })
        .catch(function(error) {
          console.info(error);
        });
    },
    openDetail: function(confirmId) {
      var _self = this;
      var pagepath="/static/webstatic"
      if (!confirmId) {
        msg("参数错误！");
        return;
      }
      var param = "&projectId=" +_self.projectId + "&confirmId=" + confirmId +"&queryTime=" +laowu_common.queryTime;
      appApi.openNewWindow( pagepath + "/new_laowu/project_sign_detail.html?dataType=signdetail" +param
          
      );
    },
    loadAttDetail: function() {
      //打卡详情
      var _self = this;
      _self.reqWorkParamsVO.projectId = laowu_common.projectId;
      _self.reqWorkParamsVO.confirmId = laowu_common.confirmId;
      _self.reqWorkParamsVO.queryTime = laowu_common.queryTime;
      _self.reqWorkParamsVO.queryType = "shigongyuan";
      _self.$http
        .post(
          "/project_work_api/find_common_record",
          _self.reqWorkParamsVO
        )
        .then(function(response) {
          if (response.data.code == 200) {
            var result = response.data.result;
            console.log("结果列表", result);
            setTimeout(function() {
              _self.data.recordList = result;
             
            }, 50);
          } else {
            msg("查询失败!");
          }
        })
        .catch(function(error) {
          console.info(error);
        });
    },
    findProjectData: function(projectId) {
      console.log("开始查询项目信息...", projectId);
      var _self = this;
      var formData = new FormData();
      //alert("查询"+projectId)
      formData.append("projectSN", projectId);
      _self.$http
        .post("/project_work_api/get_projectName", formData)
        .then(function(response) {
          if (response.data.code == 200) {
            var result = response.data.result;
            _self.projectName = result;
          } else {
            msg("查询失败!");
          }
        })
        .catch(function(error) {
          console.info(error);
        });
    },
    popup: function(content) {
      msg(content);
    }
  }
};
</script>
	<style>
		.mui-fullscreen {/*大图遮罩*/
			position: fixed;
			z-index: 20;
			background-color: #000;
		}
		.project{
			position: relative;
			padding: 5px;
		}
		.sign-btn{
			width:100px;
			height:100px;
			border-radius: 50%;
			padding: 5px;
			margin: 20px auto;
			 background:none;
			box-shadow: 2px 2px 10px #888;
		}
	</style>