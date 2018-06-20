<template>
  <div>
      <header class="mui-bar mui-bar-nav">
		<h1 class="mui-title">施工队详情</h1>
	    </header>

      <section class="mui-content mycenter-content">

		<!--如果从项目主页跳转，带入项目ID-->
		<div id="app">

		<h5 class="mui-content-padded">
			<span><span v-text="shigongduiCount"></span>支施工队</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>共计<span v-text="gongrenCount"></span>个工人</span>
		</h5>
			<div class="confirm-title">
				<span class="title" v-text="projectName" ></span>
				<!--<span class="sec-txt" v-text="data.projectAddress"></span>-->
			</div>
	    <div id="content_body"  v-for=" (data,index) in dataList" :key="index">

			<ul class="mui-table-view mui-table-view-striped sign-view" v-for="(gongtou,index) in data.gongtouList" :key="index">

				<li class="mui-table-view-cell mui-checkbox c-checkbox" @click="openDetail(gongtou.gongtouId)">
					<a class="mui-navigate-right">
					<div class="oa-contact-cell mui-table ">
						<div class=" mui-table-cell">
							<h4 class="oa-contact-name sign-time"><span><small>工长</small>
								<span v-text="gongtou.gongtouName"></span></span>
								<span style="    margin-left: 100px;"><small>上工人数</small>
								<span v-text="gongtou.count"></span>
								</span>
							</h4>
						</div>
					</div>
					</a>
				</li>

			</ul>
		</div>
		</div>


		<div id="nouthing" class="no-group" style="display: none;">
			<div class="no-record-img no-record-txt"></div>
			<p>没有相应签到记录</p>
		</div>
		<!--暂无文件和目录-->
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
     paramMap=laowu_common.paramMap;
     var projectId=paramMap.projectId
    if (paramMap.dataType == "signdetail") {
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
      formData.append("day", paramMap.queryTime);
      formData.append("projectId", paramMap.projectId);
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
              _self.queryTime = paramMap.queryTime;
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
      var param = "&projectId=" +_self.projectId + "&confirmId=" + confirmId +"&queryTime=" +paramMap.queryTime;
      appApi.openNewWindow( pagepath + "/new_laowu/project_sign_detail.html?dataType=signdetail" +param
          
      );
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
