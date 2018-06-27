<template>
  <div>
   
<header class="mui-bar mui-bar-nav">

	<button id="btn-referrer" class="mui-btn mui-action-back mui-btn-link mui-btn-nav mui-pull-left hide">
		<span class="mui-icon mui-icon-back"></span>
	</button>
	<h1 class="mui-title">选择工种</h1>
</header>

<div id='list' class="mui-indexed-list address-list ">
		<div class="mui-indexed-list-search mui-input-row mui-search">
			<input id="search" type="search" @keyup="searchUser" v-model="key" class="" placeholder="搜索">
		</div>
		<div class="mui-indexed-list-bar" style="display: none;">
			<div class="align-middle">

			</div>
		</div>
		<div class="mui-indexed-list-alert"></div>
		<div class="mui-indexed-list-inner mui-fullscreen">
			<div v-if="teamList.length==0" class="mui-indexed-list-empty-alert">没有数据</div>
			<ul v-else class="mui-table-view" id="strHtml">
				<div v-for="(item,index) in teamList" :key="index">
					<div v-if="item.mingcheng">
						<li :data-value="item.first" name="phoneData" @click="selectGongZhong(item)" class=" mui-table-view-cell mui-indexed-list-item mui-checkbox">
							<div class="mui-slider-cell">
								<div class="oa-contact-cell mui-table">
									<div class="oa-contact-content mui-table-cell" style="padding:13px 0">
										<h4 class="oa-contact-name" v-text="item.mingcheng"></h4>
									</div>
								</div>
							</div>
						</li>
					</div>
				</div>

			</ul>
		</div>

	</div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      phones: [],
      teamList: [],
      key: ""
    };
  },
  created: function() {
    var _self = this;
    $.ajax({
      type: "post",
      url: "/project_work_api/get_all_gongzhong",
      data: {
        keyword: ""
      },
      datatype: "json",
      success: function(data) {
        var result = data.result;
        //console.log("工种信息", result);
        setTimeout(function() {
          _self.$data.teamList = result;
        }, 180);
      },
      error: function() {
        console.log("err");
      }
    });
  },
  methods: {
    clickshow: function() {
      return true;
    },
    searchUser: function() {
      var _self = this;
      var key = _self.$data.key;
      setTimeout(function() {
        _self.searGongzhong(key);
      }, 150);
    },
    selectGongZhong: function(obj) {
      var _self=this
      var search = document.getElementById("search");
      search.blur();
      console.log(obj)
      var rtnobj = new Object();
      rtnobj.gongzhongId = obj.serialNum;
      rtnobj.gongzhongName = obj.mingcheng;
      appApi.closeNewWindow();
      appApi.broadcast("setGongZhong(" + JSON.stringify(rtnobj) + ")"); //返回上一页并设置标准工资页面
    },
    searGongzhong: function(keyword) {
      var _self=this
      $.ajax({
        type: "post",
        url: "/project_work_api/get_all_gongzhong",
        data: {
          keyword: keyword
        },
        datatype: "json",
        success: function(data) {
          var result = data.result;
          setTimeout(function() {
            var objAry = [];
            var gongzhongdata = "";
            if (result && result.length > 0) {
              $("#empty-view").hide();
              for (var i = 0; i < result.length; i++) {
                var obj = result[i].mingcheng + "=" + result[i].serialNum;
                objAry.push(obj);
              }
              gongzhongdata = objAry.join(",");
            } else {
              $("#empty-view").show();
            }
            _self.teamList = result;
            console.log(result)
          }, 180);
        },
        error: function() {
          console.log("err");
        }
      });
    }
  }
};
</script>

<style scoped>
html,
body {
  height: 100%;
  overflow: hidden;
}

.mui-bar {
  -webkit-box-shadow: none;
  box-shadow: none;
}

.mui-indexed-list-inner {
  transform-style: preserve-3d;
  backface-visibility: hidden;
  perspective: 1000;
}
.address-list {
  padding-top: 44px;
}
.mui-table-view .mui-table-view-cell:after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 15px;
  height: 1px;
  content: "";
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  background-color: #c8c7cc;
}
.mui-indexed-list-inner {
  overflow: scroll;
}

</style>
