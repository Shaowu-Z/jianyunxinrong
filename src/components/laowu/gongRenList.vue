<template>
  <div>
<header class="mui-bar mui-bar-nav">
	<h1 class="mui-title">工人列表</h1>
	<button id="btn-referrer" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left hide">
		<span class="mui-icon mui-icon-back"></span>
	</button>
</header>

<div class="fixed-bottom">
	<div class="confirm-box">
		<div class="count-con">已选择<span class="num" id="selectSize">0</span>个工人</div>
		<div class="btn-con"><button @click="confirm()" class="mui-btn mui-btn-primary">确定</button></div>
	</div>
</div>

<section class="mui-content">
	<div id="app" >
	<div v-if="recordType==1">
	<!--<h5 class="mui-content-padded">未记工工人</h5>-->
	<ul class="mui-table-view eg-table-view">
		<li v-for="(user,index) in data.gongrenList" :key="index" class="mui-table-view-cell mui-checkbox">
			<div v-if="user.status!=1" class="mui-slider-cell"  @touchstart="selectUser(index)">
				<div class="oa-contact-cell mui-table">
					<div class="oa-contact-input mui-table-cell">
						<input type="checkbox"
							   name="selectItem"
							   :userName="user.userName"
							   :phone="user.phone"
							   :value="user.userId"
							   :ucon="user.ucon"
							   v-model="data.selectIdList" />
					 </div>
					<div class="oa-contact-avatar mui-table-cell">
						<!-- <img v-if="user.ucon==null" src="../../../static/images/60x60.gif" alt="" /> -->
						<img v-if="user.ucon!=null" v-bind:src="user.ucon" alt="..." />
					</div>
					<div class="oa-contact-content mui-table-cell">
						<h4 class="oa-contact-name user-name" v-text="user.userName"></h4>
						<p class="oa-contact-email"><span v-text="user.phone"></span></p>
					</div>
				</div>
			</div>
			<div v-else class="mui-slider-cell">
				<div class="oa-contact-cell mui-table">
					<div class="oa-contact-input mui-table-cell">
						<input type="checkbox" disabled="disabled"  name="hashRecord"  :value="user.userId" v-model="data.hashRecordIdList"/>
					</div>
					<div class="oa-contact-avatar mui-table-cell">
						<!-- <img v-if="user.ucon==null" src="../../../static/images/60x60.gif" alt="" /> -->
						aaa<img v-if="user.ucon!=null" v-bind:src="user.ucon" alt="..." />
					</div>
					<div class="oa-contact-content mui-table-cell">
						<h4 class="oa-contact-name user-name" v-text="user.userName"></h4>
						<p class="oa-contact-email"><span v-text="user.phone"></span></p>
						<p class="oa-contact-email"><span>已记工</span></p>
					</div>
				</div>
			</div>
		</li>

	</ul>

	</div>

		<!--所有工人-->
		<div v-else>

			<ul class="mui-table-view eg-table-view">
				<li v-for="(user,index) in data.gongrenList" :key="index" class="mui-table-view-cell mui-radio" @click="selectUser(index)">
					<div class="mui-slider-cell">
						<div class="oa-contact-cell mui-table">
							<div class="oa-contact-input mui-table-cell">
								<input type="radio"
									   name="selectItem"
									   :userName="user.userName"
									   :phone="user.phone"
									   :value="user.userId"
									   :ucon="user.ucon"
									   v-model="selectId" />
							</div>
							<div class="oa-contact-avatar mui-table-cell">
								<!-- <img v-if="user.ucon==null" src="../../../static/images/60x60.gif" alt="" /> -->
								<img v-if="user.ucon!=null" v-bind:src="user.ucon" alt="..." />
							</div>
							<div class="oa-contact-content mui-table-cell">
								<h4 class="oa-contact-name user-name" v-text="user.userName"></h4>
								<p class="oa-contact-email"><span v-text="user.phone"></span></p>
							</div>
						</div>
					</div>
				</li>

			</ul>
		</div>
</div>
</section>

  </div>
</template>

<script>
import laowu_common from'./js/laowu_common.js';

export default {
  data() {
    return {
      form: {},
      data: {
        gongrenList: [],
        selectIdList: [],
        hashRecordIdList: [],
        qufenIdList: [],
        selectUserList: [],
        hasRecordUserList: [], //已记工列表
        notRecordUserList: [] //未记工列表
      },
      reqParams: {
        confirmId: "",
        list: [],
        queryTime: "",
        projectId: ""
      },
      userinfoParams: {
        list: []
      },
      selectSize: 0,
      createDate: "",
      recordType: "",
      selectId: ""
    };
  },
  created: function() {
    var _self = this;
    var paramMap=laowu_common.paramMap;
    laowu_common.initVue(_self);
    var roomId = laowu_common.roomId;
    var recordType=laowu_common.recordType;
    _self.recordType = recordType;
    _self.createDate = laowu_common.date;
    _self.reqParams.projectId = laowu_common.projectId;
    _self.findroomuserlist(roomId);
    
  },
  methods: {
    findroomuserlist: function(roomId) {
      //查询房间成员

      console.log("加载房间ID..." + roomId);
      var _self = this;
      var formdata = new FormData();
      formdata.append("roomId", roomId);
      formdata.append("memberType", 2);
      this.$http.post("/pcontact_api/findroomuserlist", formdata)
        .then(function(response) {
          console.log("res",response)
          if (response.data.code == 0) {
            var result = response.data.result;
            console.log("房间成员", result);
            if (result.length > 0) {
              _self.initDataUserList(result);
            }
          }
        })
        .catch(function(error) {
          // msg(error);
          console.info(error);
        });
    },
    //选择工人之后，获取每个工人的工资标准
    initNormalData: function() {
      console.log("开始查询工资标准...");
      var _self = this;
      var userId=laowu_common.userId;
      _self.reqParams.confirmId = userId; //工长ID
      _self.reqParams.list = _self.data.selectIdList; //当前登陆ID
      _self.$http.post("/project_work_api/find_normals_cfg", this.reqParams)
        .then(function(response) {
          if (response.data.code == 200) {
            if (response.data.result.length > 0) {
              var result = response.data.result;
              // console.log("标准工资",result)
              for (var i = 0; i < _self.data.selectUserList.length; i++) {
                for (var j = 0; j < result.length; j++) {
                  if (_self.data.selectUserList[i].userId == result[j].userId) {
                    _self.data.selectUserList[i].datePrice = result[j].money;
                    _self.data.selectUserList[i].datePriceName =
                      result[j].moneyName; //日工资（名称）
                    _self.data.selectUserList[i].workNormalHour =
                      result[j].workNormalHour; //正常上班时长
                    _self.data.selectUserList[i].workNormalHourName =
                      result[j].workNormalHourName; //上班时长（标准）名称
                    _self.data.selectUserList[i].overNormalHour =
                      result[j].overNormalHour; //加班时长
                    _self.data.selectUserList[i].overNormalHourName =
                      result[j].overNormalHourName; //加班时长（标准）名称
                    _self.data.selectUserList[i].gongzhongId =
                      result[j].gongzhongId;
                    _self.data.selectUserList[i].gongzhongName =
                      result[j].gongzhongName;
                    break;
                  }
                }
              }
            } else {
              console.log("未查询到标准工资!");
            }
            //  console.log("选择工人",_self.data.selectUserList)
            // alert(JSON.stringify(_self.data.selectUserList))
            //  return
            //设置工资标准
            setTimeout(function() {
              appApi.closeNewWindow();
              appApi.broadcast(
                "setNormalDataFromGongrenList(" +
                  JSON.stringify(_self.data.selectUserList) +
                  ")"
              ); //返回上一页并设置标准工资页面
            }, 100);
          }
        })
        .catch(function(error) {
          console.info(error);
        });
    },

    selectUser: function(index) {
      //选择工人
      var _self = this;
      
      setTimeout(function() {
        _self.data.selectIdList = _self.getSelectValcheckBox(index);
        document.getElementById("selectSize").innerHTML =
          _self.data.selectIdList.length;
      }, 200);
    },

    cancel: function() {
      //取消选中
      var _self = this;
      _self.data.selectIdList = [];
      _self.selectSize = 0;
    },
    getSelectValcheckBox: function(index) {
      //选择工人(多选)
      var _self = this;
      //获取所有返回的值
      var obj = document.getElementsByName("selectItem");
     console.log(obj[index].checked)
      var select_arr = [];
      obj[index].checked=!obj[index].checked
      _self.data.selectUserList = [];
      for (var k = 0; k < obj.length; k++) {
        var status = obj[k].getAttribute("status");
        if (obj[k].checked && undefined != obj[k].value && status != "1") {
          var userobj = new Object();
          userobj.userId = obj[k].value;
          userobj.userName = obj[k].getAttribute("userName");
          userobj.phone = obj[k].getAttribute("phone");
          userobj.ucon = obj[k].getAttribute("ucon");
          userobj.datePrice = null;
          userobj.pingfen = null;
          userobj.money = null;
          userobj.datePriceName = null; //日工资（名称）
          userobj.workNormalHour = null; //正常上班时长
          userobj.workNormalHourName = null; //上班时长（标准）名称
          userobj.overNormalHour = null; //加班时长
          userobj.overNormalHourName = null; //加班时长（标准）名称
          userobj.gongzhongId = null;
          userobj.gongzhongName = null;
          _self.data.selectUserList.push(userobj);

           select_arr=select_arr.concat(obj[k].value);
        }
      }
      console.log(select_arr);
      //console.info(select_arr);
      return select_arr;
    },
    getSelectValradio: function() {
      //选择工人（单选）
      var _self = this;
      var obj = document.getElementsByName("selectItem");
      _self.data.selectUserList = [];
      for (var k = 0; k < obj.length; k++) {
        if (obj[k].value == _self.selectId && undefined != obj[k].value) {
          var userobj = new Object();
          userobj.userId = obj[k].value;
          userobj.userName = obj[k].getAttribute("userName");
          userobj.phone = obj[k].getAttribute("phone");
          userobj.ucon = obj[k].getAttribute("ucon");
          userobj.datePrice = null;
          userobj.pingfen = null;
          userobj.money = null;
          userobj.datePriceName = null; //日工资（名称）
          userobj.workNormalHour = null; //正常上班时长
          userobj.workNormalHourName = null; //上班时长（标准）名称
          userobj.overNormalHour = null; //加班时长
          userobj.overNormalHourName = null; //加班时长（标准）名称
          userobj.gongzhongId = null;
          userobj.gongzhongName = null;
          _self.data.selectUserList.push(userobj);
        }
      }
      console.info("自动选中", _self.data.selectUserList);
    },

    popup: function(content) {
      msg(content);
    },
    //区分未记工和已记工人员
    qufenUser: function(gongrenList) {
      var _self = this;
      console.log("区分已记工和未记工...", gongrenList);
      if (gongrenList.length > 0) {
        for (var i = 0; i < gongrenList.length; i++) {
          if (gongrenList[i] != null) {
            _self.data.qufenIdList.push(gongrenList[i].userId);
          }
        }
        _self.reqParams.confirmId = laowu_common.userId;
        _self.reqParams.list = _self.data.qufenIdList;
        _self.reqParams.queryTime = _self.createDate;
        _self.$http.post( "/project_work_api/check_user_record_repeat", _self.reqParams  )
        
          .then(function(response) {
            if (response.data.code == 200) {
              var result = response.data.result;
              console.log("结果1", result);
              if (result.length > 0 && gongrenList.length > 0) {
                for (var i = 0; i < gongrenList.length; i++) {
                  for (var j = 0; j < result.length; j++) {
                    if (gongrenList[i] != null) {
                      if (gongrenList[i].userId == result[j].gongrenId) {
                        gongrenList[i].status = 1;
                        _self.data.hashRecordIdList.push(result[j].gongrenId);
                      }
                    }
                  }
                }
              }
              console.log("结果2", gongrenList);
              console.log("结果3", _self.data.selectIdList);
            } else {
              msg("查询记工记录信息错误!");
            }
          })
          .catch(function(error) {
            console.info(error);
          });
      }
    },
    initDataUserList: function(result) {
      var _self = this;
     var recordType=laowu_common.recordType
     var paramMap=laowu_common.paramMap
      //*********初始化数据********
      for (var i = 0; i < result.length; i++) {
        var obj = new Object();
        obj.userId = result[i].userId;
        obj.userName = result[i].nickName;
        obj.phone = result[i].cellPhone;
        obj.ucon = result[i].userIcon;
        (obj.status = null),
          //设置工人列表
          _self.data.gongrenList.push(obj);
        //设置工人列表ID
        _self.userinfoParams.list.push(obj.userId);
      }
      if (recordType == 1) {
        setTimeout(function() {
          _self.qufenUser(_self.data.gongrenList);
        }, 300);
      }
      var paramIdList = [];
      if (paramMap.param != null) {
        setTimeout(function() {
          paramIdList = JSON.parse(paramMap.param);
          if (recordType == 1) {
            //如果是点工且已选择的人则过滤掉，只显示没有选择的人
            for (var i = 0; i < paramIdList.length; i++) {
              _self.data.gongrenList.removeUser(paramIdList[i]);
            }
          } else {
            //如果有值则自动选中
            if (paramIdList.length > 0) {
              _self.selectId = paramIdList[0];
              _self.getSelectValradio();
              document.getElementById("selectSize").innerHTML = 1;
            }
          }
        }, 100);
      }

    },
    confirm:function () {

        
        if(this.data.selectUserList.length<=0){
            msg("请选择工人")
            return;
        }
        if(this.recordType==1){
            this.initNormalData();
        }else {
            setTimeout(function () {
                //console.log(app.data.selectUserList)
                appApi.closeNewWindow();
                appApi.broadcast("setNormalDataFromGongrenList("+JSON.stringify(this.data.selectUserList)+")");//返回上一页并设置标准工资页面
            },100);
        }
    }
  }
};


    /**
     * 确认
     */
    


//*********移除数组元素******开始**********

Array.prototype.indexOfUser = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i].userId == val) return i;
    }
    return -1;
};


Array.prototype.removeUser = function (val) {
    var index = this.indexOfUser(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

//*********移除数组元素******结束**********
</script>

<style scoped>
.project {
  position: relative;
  padding: 5px;
}
.eg-table-view{
 text-align: left;
}
</style>
