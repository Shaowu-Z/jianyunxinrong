<template>
    <div class="mui-off-canvas-wrap mui-draggable mui-slide-in " id="app">

			<!-- 遮盖层 -->
			<div class="mui-backdrop" style="display: none; z-index: 900;" @click="mask()"></div>

			<!--单位选择-->
			<div class="pop-up" v-show="isUnitShow" style="display: none;">
				<div class="pop-title">
					<span class="title">选择单位</span><span class="btn-title iconfont icon-close" @click="mask"></span>
				</div>
				<div class="pop-content unit-box col-xs-4 mui-clearfix">
                        <span @click="selectdUnit(item)" v-for="(item,index) in units" :key="index" class="item" :class="{current : item.value==selectdTab.danwei}"><span
					class="con" v-text="item.value"></span></span>
				</div>
			</div>
			<!-- 主页面容器 -->

			<div class="mui-inner-wrap">
				<!-- 主页面标题 -->
				<header class="mui-bar mui-bar-nav">
					<h1 class="mui-title">报量</h1>
					<a class="mui-action-back mui-icon iconfont icon-back" style="display: none;" v-show="backicon!=0" @click="back"></a>
					<button class="mui-btn mui-btn-link mui-pull-right" style="margin-left: 0; margin-right: 0; padding-right: 0; display: none;" @click="next(2)" v-show="backicon==1">从工单选择</button>
					<button style="display: none;" class="mui-btn mui-btn-primary mui-pull-right" v-show="backicon==2" @click="confirmTabs()">确定</button>
				</header>
				<div v-if="backicon==1">
					<div class=" fixed-bottom">
						<div class="mui-table mui-text-center">
							<div class="mui-table-cell">
								<button class="mui-btn mui-btn-primary" @click="next(3)">下一步</button>
							</div>
						</div>
					</div>
				</div>

				<div v-if="backicon==0">
					<div class="step" style="padding-top: 44px;">
						<ul class="mui-table-view publish-box eg-table-view">
							<li class="mui-table-view-cell mui-input-row"><label>本次报量区间</label>
								<div class="input-muitl">
                                    <div style="width:48%;float:left">
                                        <data-bar :title="returntitle" :datanow='startDate'  @datatoParent="childValue"></data-bar>
                                    </div>
                                    
									<!-- <input class="f-date" type="text" value="" readonly="readonly" placeholder="起始日期" @click="selectDate('start')" v-model="startDate" /> -->
									<div class="data-w">-</div>
                                    <div style="width:48%;float:left">
                                        <data-bar :title="returntitle1" :datanow='endDate' @datatoParent="childValue1"></data-bar>
									</div>
                                    <!-- <input class="r-date" type="text" value="" readonly="readonly" placeholder="结束日期" @click="selectDate('end')" v-model="endDate" /> -->
								</div>
							</li>
							<li class="mui-table-view-cell mui-input-row"><label>专业</label>
								<input type="text" placeholder="无" v-model="currRoom.description" disabled /></li>
						</ul>
						<div class="publish-container">
							<div class="title">报量给</div>
							<ul class="mui-table-view mui-table-view-striped container-average address-item">
								<div v-if="companyBuyClassName!=''">
									<li class="mui-table-view-cell"><span class="btn-roll btn-delete" @click="delroom()"></span>
										<div class="oa-contact-cell mui-table">
											<div class="oa-contact-avatar mui-table-cell companypic">
												<p v-text="companyBuyClassName.split('')[0]"></p>
											</div>
											<div class="oa-contact-content mui-table-cell">
												<h4 class="oa-contact-name" v-text="companyBuyClassName"></h4>
												<p class="oa-contact-email" v-text="companyBuyName"></p>
											</div>
										</div>
									</li>
								</div>
								<div v-if="companyBuyClassName==''">
									<li class="upload-btn">
										<div class="img-item-inner mui-icon mui-icon-plusempty" @click="changRoom"></div>
									</li>
								</div>
							</ul>
						</div>
						<div class="btn-box">
							<button class="mui-btn mui-btn-primary mui-btn-block" @click="next(1)">下一步</button>
						</div>
					</div>
				</div>

				<!--------第二步---------->
				<div class="mui-content  con-zindex" id="scrpll1">
					<div class="mui-scroll">
						<div v-if="backicon==1">
							<section class="mui-content publish-box mycenter-content con-zindex" >
								<div class="list-container">
									<table class="table table-block table-record">
										<thead>
											<tr id="one">
												<th style="width: 45%;">工作项</th>
												<th>本次完工量 / 单位</th>
												<th style="width: 45px;">移除</th>
											</tr>
										</thead>
										<tbody>
												<tr id="two" v-for="(tab,i) in tabs" :key="i">
													<td ><input class="tb-input" type="text" v-model="tab.mingcheng" placeholder="请输入" /></td>
													<td><input class="tb-input select-input" type="number" v-model="tab.shuliang" value="99" placeholder="请输入" /><span class="unit" @click="showUnits(tab)"><span
												 v-text="tab.danwei"></span><span class="mui-icon mui-icon-arrowdown"></span></span>
													</td>
													<td style="width: 45px;"><span class="btn-roll btn-delete" @click="deleat(tab,i)"></span></td>
												</tr>
										</tbody>
									</table>
									<div class="bill-more" @click="addli">
										<!--<button class="mui-btn mui-btn-primary mui-btn-outlined"><span class="mui-icon mui-icon-plusempty"></span><span>手动增加一行</span></button>-->
										<span class="mui-icon mui-icon-plusempty"></span><span>手动增加一行</span>
									</div>
								</div>
							</section>
						</div>
					</div>
				</div>
				<div class="mui-content  con-zindex" id="scrpll3">
				<div class="mui-scroll">
				<div v-if="backicon==2">
					<div class="step list-container" id="step2">
						<ul class="mui-table-view tab-title">
							<li class="mui-table-view-cell mui-checkbox" @click="chanceall">
								<div class="mui-slider-cell">
									<div class="oa-contact-cell mui-table">
										<div class="oa-contact-input mui-table-cell">
											<input type="checkbox" v-model="selectdAllGdTabStatus" @change="selectdAllGdTab" />
										</div>
										<div class="oa-contact-content mui-table-cell">工作项</div>
										<div class="oa-contact-content mui-table-cell mui-text-center">已报 / 计划</div>
									</div>
								</div>
							</li>
						</ul>
							<div class="list-item" v-for="(tab,i) in gongdanTabs" :key="i">
								<div class="list-title mui-checkbox mui-left">
                                    <label v-text="tab.name"></label><input type="checkbox" v-model="tab.selectdStatus" @change="selectdDateAllGdTab(tab)" />
                                </div>
								<ul class="mui-table-view">
									<li class="mui-table-view-cell mui-checkbox" v-for="(n,index) in tab.value" :key="index">
										<div class="mui-slider-cell">
											<div class="oa-contact-cell mui-table">
												<div class="oa-contact-input mui-table-cell">
                                                    <input type="checkbox" checked="" @change="selectdGdTab(tab)" v-model="n.selectdStatus" />
                                                </div>
												<div class="oa-contact-content mui-table-cell" v-text="n.mingcheng"></div>
												<div class="oa-contact-content mui-table-cell mui-text-center" v-text="n.withShuliang+'/'+n.shuliang+n.danwei"> </div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						<!--<ul class="mui-table-view eg-table-view">
									<div v-for="(tab,i) in gongdanTabs">
										<li class="mui-table-view-cell mui-checkbox">
											<div class="mui-slider-cell">
												<div class="oa-contact-cell mui-table">
													<div class="oa-contact-input mui-table-cell">
														<input type="checkbox" checked="" v-model="tab.selectdStatus" />
													</div>
													<div class="oa-contact-content mui-table-cell" v-text="tab.mingcheng"></div>
													<div class="oa-contact-content mui-table-cell mui-text-center" v-text="tab.withShuliang+'/'+tab.shuliang+tab.danwei"></div>
												</div>
											</div>
										</li>
									</div>
								</ul>-->
					</div>
				</div>
				</div>
				</div>
				<!-- 第四步  -->
				<div class="mui-content " id="scrpll2">
					<div class="mui-scroll">
						<div v-if="backicon==3">
							<div class="step step3 ">
								<div class="publish-container">
									<div class="title">图片</div>
									<ul class="container-average container-average-img">
											<li class="img-item" v-for="(img,number) in imgs" :key="number">
												<div class="img-item-inner">
													<img v-bind:src="img.src">
												</div> <span class="btn-roll btn-delete" @click="danjuApi.moveimg(number+1)"></span>
											</li>
										<li class="upload-btn">
											<div class="img-item-inner mui-icon mui-icon-plusempty">
												<input type="file" accept="image/*" class="upimg" id="file" v-on:change="danjuApi.upfile" multiple="multiple" />
											</div>
										</li>
									</ul>
								</div>

								<div class="publish-container">
									<div class="title">附件</div>
									<ul class="mui-table-view mui-table-view-striped container-average container-file">
											<li class="mui-table-view-cell" v-for="(img,number) in fujians" :key="number"><span class="btn-roll btn-delete" @click="danjuApi.movefj(number+1)"></span>
												<div class="oa-contact-cell mui-table">
													<div class="oa-contact-avatar mui-table-cell">
														<span :class="'my-list-icon '+ danjuApi.fileType(img.name)"></span>
													</div>
													<div class="oa-contact-content mui-table-cell">
														<h4 class="oa-contact-name" v-text="img.name"></h4>
														<!--<p class="oa-contact-email"><span>196.4KB</span></p>-->
													</div>
												</div>
											</li>
										<li class="upload-btn">
											<div class="img-item-inner mui-icon mui-icon-plusempty">
												<input type="file" class="upfile" id="files" v-on:change="danjuApi.upfile" multiple="multiple" />
											</div>
										</li>
									</ul>
								</div>
								<div class="mui-table mult-btn-box">
									<div class="mui-table-cell">
										<button type="button" class="mui-btn mui-btn-primary" @click="initData(1)">保&nbsp;&nbsp;存</button>
									</div>
									<div class="mui-table-cell space"></div>
									<div class="mui-table-cell">
										<button type="button" class="mui-btn mui-btn-primary" @click="initData(2)">提&nbsp;&nbsp;交</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
</template>
<script>
import { Picker } from "mint-ui";
import util from "../../../playform/util.js";
import { BackCookie } from "../../../playform/common.js";
import setting from "../../../playform/config.js";
import danjuApi from "../js/danjuAPi.js";
import tipApi from "../js/tipApi.js";
import dataBar from "../../common/dataBar";
export default {
  components: {
    "mt-picker": Picker,
    dataBar
  },
  data() {
    
    return {
      startime: "",
      danjuApi: danjuApi,
      tipApi: tipApi,
      util: util,
      returntitle: "起始日期",
      returntitle1: "结束日期",
      units: [
        {
          value: "平方米"
        },
        {
          value: "立方米"
        },
        {
          value: "吨"
        },
        {
          value: "米"
        },
        {
          value: "个"
        },
        {
          value: "次"
        },
        {
          value: "天"
        },
        {
          value: "块"
        },
        {
          value: "组"
        },
        {
          value: "捆"
        },
        {
          value: "宗"
        },
        {
          value: "项"
        },
        {
          value: "株"
        }
      ],
      nowdata: "",
      startDate: "",
      endDate: "",
      isUnitShow: false,
      selectdTab: {},
      backicon: 0,
      tapyewu: false,
      callbackCode: "", //回调code 111 选人  222选公司
      selectdTadIndex: "", //记录请求选人的列表框下标
      hetongs: [],
      userName: decodeURI(setting.getCookie("username")),
      userID: setting.getCookie("userid"),
      dateShenqing: "",
      projectName: this.$route.query.projectName,
      projectSN: this.$route.query.projectSn,
      companySaleName: "",
      companySaleID: "",
      companySaleRoomImID: "",
      companySaleRoomID: "",
      companyBuyName: "",
      companyBuyClassName: "",
      companyBuyID: "",
      companyBuyRoomImID: "",
      companyBuyRoomID: "",
      currRoom: {},
      beizhu: "",
      tuisongimid: "",
      contractName: "",
      tabs: [],
      id: "",
      attachmentIds: "",
      currRoomId: this.$route.query.currRoomId,
      gongdanTabs: [],
      selectdAllGdTabStatus: false,
      money: 0,
      sites: [],
      imgs: [],
      fujians: [],
      zrimg: [],
      zrfujian: [],
      atts: [],
      reponseId: undefined,
      confirm: "",
      postType: "",
      keyall: [],
      cfgid: this.$route.query.cfgid,
      projectSn: this.$route.query.projectSn,
      isRoomId: this.$route.query.isRoomId,
      isRoomName: this.$route.query.isRoomName,
      isRoomCreditCode: this.$route.query.isRoomCreditCode,
      currRoomImId: this.$route.query.isRoomImId,
      currRoomClassName: this.$route.query.currRoomClassName,
      curRoomName: this.$route.query.currRoomName,
      userid: setting.getCookie("userid"),

      username: setting.getCookie("username"),
      form: {
        MissionStartDate: ""
      },
      fujianid: [],
      imgid: []
    };
  },
  watch: {
    //列表监听
    gongdanTabs: {
      handler: function(newValue) {
        var _self = this;

        var dateSlectdCount = 0;
        $.each(newValue, function(index) {
          if (this.selectdStatus) {
            dateSlectdCount++;
          }
        });
        if (dateSlectdCount == newValue.length) {
          _self.selectdAllGdTabStatus = true;
        } else {
          _self.selectdAllGdTabStatus = false;
        }
      },
      deep: true
    }
  },
  created: function() {
    danjuApi.vue = this;
    danjuApi.initVue();
    var _self = this;
    var getTime = new Date();
    //昨天
    var beforedata = new Date(new Date() - 24 * 60 * 60 * 1000);
    var beforeyear = beforedata.getUTCFullYear();
    var beforemoth = parseInt(beforedata.getMonth()) + 1;
    var beforeday = beforedata.getDate();
    var nowyear = getTime.getUTCFullYear();
    var nowmoth = parseInt(getTime.getMonth()) + 1;
    var noeday = getTime.getDate();
    var nowshi = getTime.getHours();
    var noefen = getTime.getMinutes();
    var nowmiao = getTime.getSeconds();
    if (nowmoth < 10) {
      beforemoth = "0" + beforemoth;
      nowmoth = "0" + nowmoth;
    }
    if (noeday < 10) {
      beforeday = "0" + beforeday;
      noeday = "0" + noeday;
    }
    if (nowshi < 10) {
      nowshi = "0" + nowshi;
    }
    if (noefen < 10) {
      noefen = "0" + noefen;
    }
    if (nowmiao < 10) {
      nowmiao = "0" + nowmiao;
    }
    _self.nowdata = nowyear + "-" + nowmoth + "-" + noeday;
    _self.dateShenqing =
      nowyear +
      "-" +
      nowmoth +
      "-" +
      noeday +
      " " +
      nowshi +
      ":" +
      noefen +
      ":" +
      nowmiao;
    //					_self.form.MissionStartDate = formDate("2018-02-05");
    //获取合同数据
    _self.endDate = beforeyear + "-" + beforemoth + "-" + beforeday;
    if (this.$route.query.id != undefined) {
      this.starinfo();
    } else {
      //						_self.getHt()
      _self.getnews();
    }
    //					_self.getHt()
    //					_self.loadData()
  },
  mounted: function() {
  },
  // 在 `methods` 对象中定义方法
  methods: {
    childValue: function(val) {
      // this.test=val;
      this.form.MissionStartDate = this.formDate(val);
      this.startDate = this.formDate(val);
      // startDate endDate

      console.log("value" + this.form.MissionStartDate);
    },
    childValue1: function(val) {
      // this.test=val;
      this.form.MissionStartDate = this.formDate(val);
      this.endDate = this.formDate(val);
      console.log("value" + this.form.MissionStartDate);
    },
    formDate: function(value) {
      var Y, m, d, H, i, s, t;
      var date = new Date(value);
      (Y = date.getFullYear()),
        (m = date.getMonth() + 1),
        (d = date.getDate()),
        (H = date.getHours()),
        (i = date.getMinutes()),
        (s = date.getSeconds());
      if (m < 10) {
        m = "0" + m;
      }
      if (d < 10) {
        d = "0" + d;
      }
      if (H < 10) {
        H = "0" + H;
      }
      if (i < 10) {
        i = "0" + i;
      }
      if (s < 10) {
        s = "0" + s;
      }
      //		<!-- 获取时间格式 2017-01-03 10:13:48 -->
      // var t = Y+'-'+m+'-'+d+' '+H+':'+i+':'+s;
      //		<!-- 获取时间格式 2017-01-03 -->
      var t = Y + "-" + m + "-" + d;
      return t;
    },
    //获取退回数据
    //获取退回的数据
    starinfo: function() {
      var _self = this;
      var param = {
        id: this.$route.query.id
      };
      this.$http.post("/contract/get_content", param).then(function(response) {
        if (response.data.code == 200) {
          var result = response.data.result;
          console.log("result", result);

          var norl = JSON.parse(response.data.result.noralJson);
          console.log("norl", norl.tablefields);
          var cont = JSON.parse(response.data.result.contentJson);
          var data = response.data.result;
          //页面上显示信息
          _self.startDate = norl.tablefields.startDate.split(" ")[0];
          _self.endDate = norl.tablefields.endDate.split(" ")[0];
          _self.currRoom.description = norl.tablefields.zhuanye;
          _self.companyBuyClassName = norl.tablefields.companyBuyRoomClassName;
          _self.companyBuyName = norl.tablefields.companyBuyName;
          _self.tabs = norl.subtablefields;
          _self.currRoomId = norl.table.roomid;
          //附件
          app.imgsrc(norl.attachment);
          //提交信息
          _self.id = this.$route.query.id;
          _self.cfgid = norl.table.id;
          _self.projectSn = norl.table.projectid;
          _self.isRoomId = norl.table.roomid;
          _self.isRoomName = norl.table.roomname;
          _self.isRoomCreditCode = norl.tablefields.companySaleID;

          _self.currRoomImId = norl.currRoomImId;
          _self.currRoomClassName = norl.currRoomClassName;
          _self.curRoomName = norl.curRoomName;
          _self.toImId = norl.toImid;

          _self.fapiaoTaxLv = norl.tablefields.fapiaoTaxLv;
          _self.piao = norl.tablefields.fapiaoTitle;
          _self.projectName = norl.tablefields.projectName;
          _self.companyBuyID = norl.tablefields.companyBuyID;
          _self.companyBuyRoomID = norl.tablefields.companyBuyRoomID;
          _self.companySaleID = norl.tablefields.companySaleID;
          _self.companySaleRoomID = norl.tablefields.companySaleRoomID;
          _self.contractType = norl.tablefields.contractType;
          (_self.contractID = norl.tablefields.contractID), _self.getnews();
        }
      });
    },
    imgsrc: function(n) {
      var _self = this;
      this.$http
        .post("/sass_api/ get_uploadfile_info?fileIdStr=" + n)
        .then(function(response) {
          if (response.data.code == 200) {
            console.log(response.data.result);
            for (var i = 0; i < response.data.result.length; i++) {
              if (response.data.result[i].type == 1) {
                //imgs fujians name
                _self.imgs.push({
                  src: response.data.result[i].thumbnailurl
                });
                _self.imgid.push(response.data.result[i].id);
              } else {
                _self.fujians.push({
                  name: response.data.result[i].filename
                });
                _self.fujianid.push(response.data.result[i].id);
              }
            }
          }
        });
    },
    /**
     * 确认选中
     */
    confirmTabs: function() {
      var _self = this;
      $.each(_self.gongdanTabs, function(i) {
        $.each(this.value, function(j) {
          _self.synTab(this, i, j);
        });
      });
      document.getElementById("scrpll1").style.display = "block";
      document.getElementById("scrpll2").style.display = "none";
      document.getElementById("scrpll3").style.display = "none";
      _self.backicon = 1;
    },
    /**
     * 选中所有工单中的记录
     */
    chanceall: function() {
      this.selectdAllGdTabStatus = !this.selectdAllGdTabStatus;
    },
    selectdAllGdTab: function() {
      var _self = this;
      $.each(_self.gongdanTabs, function() {
        this.selectdStatus = _self.selectdAllGdTabStatus;
        $.each(this.value, function() {
          this.selectdStatus = _self.selectdAllGdTabStatus;
        });
      });
    },
    /**
     * 选中一个时间段中的记录
     */
    selectdDateAllGdTab: function(dateObj) {
      var _self = this;
      $.each(dateObj.value, function(i) {
        this.selectdStatus = dateObj.selectdStatus;
      });
    },
    selectdGdTab: function(tab) {
      var tabSelectdCount = 0;
      $.each(tab.value, function() {
        if (this.selectdStatus) {
          tabSelectdCount++;
        }
      });
      if (tabSelectdCount == tab.value.length) {
        tab.selectdStatus = true;
      } else {
        tab.selectdStatus = false;
      }
    },
    /**
     * 同步到Tab中
     * @param {Object} tab
     * @param {Object} i
     */
    synTab: function(tab, i, j) {
      var _self = this;
      if (tab.selectdStatus) {
        if ((tab.index == "" || tab.index == undefined) && tab.index != 0) {
          _self.tabs.push({
            mingcheng: tab.mingcheng,
            shuliang: "",
            danwei: tab.danwei,
            index: i + "-" + j
          });
          tab.index = _self.tabs.length - 1;
        }
      } else {
        $.each(_self.tabs, function(index) {
          if (this.index == i + "-" + j) {
            _self.tabs.splice(index, 1);
            tab.index = undefined;
          }
        });
      }
    },
    /**
     * 删除已选单位
     */
    delroom: function() {
      var _self = this;
      _self.companyBuyClassName = "";
    },
    /**
     * 上一步事件
     */
    back: function() {
      var _self = this;
      if (_self.backicon == 1) {
        document.getElementById("scrpll1").style.display = "none";
        document.getElementById("scrpll2").style.display = "none";
        document.getElementById("scrpll3").style.display = "none";
        appApi.showBack();
      }
      if (_self.backicon > 0) {
        if (_self.backicon == 3) {
          document.getElementById("scrpll1").style.display = "block";
          document.getElementById("scrpll2").style.display = "none";
          document.getElementById("scrpll3").style.display = "none";
          _self.backicon = _self.backicon - 2;
        } else if (_self.backicon == 2) {
          document.getElementById("scrpll1").style.display = "block";
          document.getElementById("scrpll2").style.display = "none";
          document.getElementById("scrpll3").style.display = "none";
          _self.backicon = 1;
        } else {
          _self.backicon = _self.backicon - 1;
        }
      }
    },
    /**
     * 下一步事件
     * @param {Object} pageIndex 页码
     */
    next: function(pageIndex) {
      var _self = this;
      if (pageIndex == 0) {
        document.getElementById("scrpll1").style.display = "none";
        document.getElementById("scrpll2").style.display = "none";
        document.getElementById("scrpll3").style.display = "none";
      }
      if (pageIndex == 1) {
        var startdate = parseInt(
          _self.startDate.split("-")[0] +
            _self.startDate.split("-")[1] +
            _self.startDate.split("-")[2]
        );
        var enddate = parseInt(
          _self.endDate.split("-")[0] +
            _self.endDate.split("-")[1] +
            _self.endDate.split("-")[2]
        );
        var nowData = parseInt(
          _self.nowdata.split("-")[0] +
            _self.nowdata.split("-")[1] +
            _self.nowdata.split("-")[2]
        );
        //							alert(enddate》nowData)
        if (_self.companyBuyClassName == "") {
          tipApi.waring("请选择接收单位!", 1);
          // ludan("请选择接收单位!", 1, 1)
          return false;
        } else if (_self.startDate == "") {
          // ludan("请完善开始日期!", 1, 1)
          tipApi.waring("请完善开始日期!", 1);
          return false;
        } else if (_self.endDate == "") {
          // ludan("请完善结束日期!", 1, 1)
          tipApi.waring("请完善结束日期!", 1);
          return false;
        } else if (enddate < startdate) {
          // ludan("结束日期不能早于开始日期!", 1, 1)
          tipApi.waring("结束日期不能早于开始日期!", 1);
          return false;
        } else if (enddate >= nowData) {
          // ludan("结束日期不能晚于昨天!", 1, 1)
          tipApi.waring("结束日期不能晚于昨天!", 1);
          return false;
        }
        document.getElementById("scrpll1").style.display = "block";
        document.getElementById("scrpll2").style.display = "none";
        document.getElementById("scrpll3").style.display = "none";
      } else if (pageIndex == 2) {
        document.getElementById("scrpll1").style.display = "none";
        document.getElementById("scrpll2").style.display = "none";
        document.getElementById("scrpll3").style.display = "block";
      } else if (pageIndex == 3) {
        var flag = _self.checkTabs();
        if (!flag) {
          return flag;
        }
        document.getElementById("scrpll3").style.display = "none";
        document.getElementById("scrpll1").style.display = "none";
        document.getElementById("scrpll2").style.display = "block";
      }
      appApi.hideBack();
      _self.backicon = pageIndex;
    },
    /**
     * 选择时间
     * @param {Object} t 类型
     */
    selectDate: function(t) {
      var _self = this;
    },
    /**
     * 选择单位
     * @param {Object} item 清单对象
     */
    selectdUnit: function(item) {
      var _self = this;
      _self.selectdTab.danwei = item.value;
      _self.mask();
    },
    /**
     * 展示所有单位
     */
    showUnits: function(tab) {
      var _self = this;
      _self.selectdTab = tab;
      $("input").blur();
      $(".mui-backdrop").show();
      _self.isUnitShow = true;
    },
    /**
     * 展示选择单位页面
     * @param {Object} tab 清单对象
     */
    showSl: function(tab) {
      console.log(tab);
      var _self = this;
      _self.selectdTab = tab;
      _self.backicon = _self.backicon + 1;
    },
    //excel表格解析
    //					excelAnalysis: function(e) {
    //						loading("解析中")
    //						var _self = this;
    //						var suffix = /\.[^\.]+$/.exec(e.target.files[0].name).toString()
    //						if(suffix == '.xlsx') {
    //							var files = e.target.files;
    //							var fileReader = new FileReader();
    //							fileReader.onload = function(ev) {
    //								try {
    //									var data = ev.target.result,
    //										workbook = XLSX.read(data, {
    //											type: 'binary'
    //										}), // 以二进制流方式读取得到整份excel表格对象
    //										persons = []; // 存储获取到的数据
    //								} catch(e) {
    //									console.log('文件类型不正确');
    //									return;
    //								}
    //								// 表格的表格范围，可用于判断表头是否数量是否正确
    //								var fromTo = '';
    //								var excelname
    //								// 遍历每张表读取
    //								for(var sheet in workbook.Sheets) {
    //									if(workbook.Sheets.hasOwnProperty(sheet)) {
    //										fromTo = workbook.Sheets[sheet]['!ref'];
    //										if(JSON.stringify(XLSX.utils.sheet_to_json(workbook.Sheets[sheet])[0]).split(",")[1] != undefined) {
    //											excelname = JSON.stringify(XLSX.utils.sheet_to_json(workbook.Sheets[sheet])[0]).split(",")
    //										} else {
    //											excelname = []
    //										}
    //										console.log(excelname)
    //										excelname = excelname.toString()
    //										if(excelname.indexOf("mingcheng") != -1 && excelname.indexOf("danwei") != -1) {
    //											persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
    //										} else {
    //											layer.close(loading("解析中"))
    //											_self.excelok = 1
    //											ludan("导入的模板格式不正确", 2, 3)
    //
    //										}
    //										// break; // 如果只取第一张表，就取消注释这行
    //									}
    //								}
    //								_self.tabs = _self.tabs.concat(persons)
    //								//							console.log(persons);
    //							};
    //							_self.upfile(e)
    //
    //							// 以二进制方式打开文件
    //							fileReader.readAsBinaryString(files[0]);
    //						} else {
    //							layer.close(loading("解析中"))
    //							ludan("导入的文件格式不正确", 2, 3)
    //						}
    //
    //					},
    sx: function() {
      window.location.href = window.location.href;
    },
    getnews: function() {
      var _self = this;
      this.$http
        .get("/pcontact_api/getroominfo?roomId=" + _self.currRoomId)
        .then(function(response) {
          if (response.data.code == 0) {
            _self.currRoom = response.data.result;
            console.log(response.data.result);
            if (_self.currRoom.superiorId != null) {
              _self.$http
                .get(
                  "/pcontact_api/getroominfo?roomId=" +
                    _self.currRoom.superiorId
                )
                .then(function(response) {
                  if (response.data.code == 0) {
                    console.log(response.data.result);
                    var room = response.data.result;
                    _self.companyBuyID = room.companyCreditCode;
                    _self.companyBuyName = room.name;
                    _self.companyBuyClassName = room.roomClassName;
                    _self.companyBuyRoomID = room.roomId;
                    _self.companyBuyRoomImID = room.roomImId;
                    _self.getBaoliangInfo();
                  }
                });
            }
          }
        });
    },
    //检索列表数据
    checkTabs: function() {
      var _self = this;
      var isStatus = true;
      var isname;
      $.each(_self.tabs, function(index) {
        var isCue = true;
        if (this.mingcheng == "") {
          isCue = false;
          isname = "名称";
        } else if (this.danwei == "") {
          isCue = false;
          isname = "单位";
        } else if (this.shuliang == "") {
          isCue = false;
          isname = "数量";
        }
        if (!isCue) {
          if (index > 8) {
            index = index - 9;
            //									var y = 0 - (Number($("#one").height()) + (Number($("#two").height()) * index))
            //									mui('.').scroll().scrollTo(0, y, 100);
          } else {
            //									mui('.').scroll().scrollTo(0, 0, 100);
          }
          // ludan("请填写第" + index + "工作项的" + isname, 1, 1)
          tipApi.waring("请填写第" + index + "工作项的" + isname, 1);
          $(".table-record tbody tr")
            .eq(index)
            .css("background", "#ffebd1");
          isStatus = false;
          return isStatus;
          isStatus = false;
        }
      });
      return isStatus;
    },
    initData: function(type) {
      //获取数据
      var _self = this;
      if (type == 1) {
        tipApi.waring("保存中", 1);
        // ludan("保存中", 0, 1)
      } else {
        tipApi.waring("提交中", 1);
        // ludan("提交中", 0, 1)
      }
      //						var fjid = _self.atts.toString()
      var fjid;
      if (_self.attachmentIds == "") {
        _self.attachmentIds = "";
      } else {
        _self.attachmentIds = "," + _self.attachmentIds;
      }
      if (_self.imgid.toString() == "") {
        fjid = _self.fujianid.toString();
      } else if (_self.fujianid.toString() == "") {
        fjid = _self.imgid.toString();
      } else {
        fjid = _self.imgid.toString() + "," + _self.fujianid.toString();
      }
      if (type == 2) {
        _self.confirm = "1";
        _self.postType = "1";
      } else {
        _self.confirm = "0";
      }
      $.each(_self.tabs, function() {
        this.shuliang = Number(this.shuliang);
        this.danjia = parseFloat(this.danjia);
      });
      var tablefields = {
        id: _self.reponseId,
        userName: _self.userName,
        userID: _self.userID,
        dateShenqing: _self.dateShenqing,
        projectName: _self.projectName,
        projectSN: _self.projectSn,
        companySaleName: _self.isRoomName,
        companySaleID: _self.isRoomCreditCode,
        companySaleRoomID: _self.isRoomId,
        companyBuyName: _self.companyBuyName,
        companyBuyID: _self.companyBuyID,
        companyBuyRoomID: _self.companyBuyRoomID,
        companyBuyRoomClassName: _self.companyBuyClassName,
        beizhu: _self.beizhu,
        zhuanye: _self.currRoom.description,
        startDate: _self.startDate + " 00:00:00",
        endDate: _self.endDate + " 00:00:00"
      };
      if (_self.id != "") {
        tablefields["id"] = _self.id;
      }
      var param = {
        table: {
          id: _self.cfgid,
          projectid: _self.projectSn,
          roomid: _self.isRoomId,
          roomname: _self.isRoomName
        },
        confirm: _self.confirm,
        postType: _self.postType,
        attachment: fjid + _self.attachmentIds,
        currRoomImId: _self.currRoomImId,
        currRoomClassName: _self.currRoomClassName,
        curRoomName: _self.curRoomName,
        toImid: _self.companyBuyRoomImID,
        //							uid: "10392",
        tablefields: tablefields,
        subtablefields: _self.tabs
      };
      console.log(param);
      _self.$http.post("/contract/save", param).then(function(response) {
        //alert(JSON.stringify(response))
        if (response.data.code == 200) {
          //更新完工量
          var updTabs = [];
          $.each(_self.gongdanTabs, function() {
            $.each(_self.value, function() {
              if (_self.selectdStatus) {
                updTabs.push({
                  shuliang:
                    Number(_self.tabs[_self.index].shuliang) +
                    Number(this.withShuliang),
                  sid: _self.sid
                });
              }
            });
          });
          if (updTabs.length > 0) {
            _self.$http.post("/chart/column/updMxCount", updTabs);
          }

          console.log(response);
          _self.id = response.data.result.id;
          _self.reponseId = response.data.result.id;
          _self.sites = response.data.result.tablefields;

          var titletype = encodeURIComponent(encodeURIComponent("报量"));
          var title = encodeURIComponent(
            encodeURIComponent(decodeURI(username))
          );
          var todojson = {
            title: decodeURI(username) + "的报量",
            titileTwo: _self.currRoomClassName + "-" + _self.curRoomName,
            content:
              "开始日期=" + _self.startDate + "|结束日期=" + _self.endDate,
            fileCount: "0",
            url:
              "/static/newwebstatic/laowu/transfer.html?id=" +
              response.data.result.id +
              "&formroomimid=" +
              _self.currRoomImId +
              "&fromcurrRoomName=" +
              _self.currRoomClassName,
            colorString: "",
            todoViewableMember: "0",
            toImId: _self.companyBuyRoomImID,
            currentRoomImid: _self.currRoomImId,
            formuserid: _self.userid,
            relation: response.data.result.id,
            chatType: "2",
            //									"confirmUrl": "456", //有确认按钮必要参数
            //									"refusedUrl": "231", //有拒绝按钮必要参数
            todoType: "3", //1评分待办，生成带有确认按钮待办，生成带有确认拒绝待办，必要参数
            setButton: [
              {
                type: 1, //按钮点击类型 1=请求url 2=打开url
                name: "确认",
                url:
                  "/contract/do_todobtu?type=1&pingfen=0&docid=" +
                  _self.id +
                  "&projectSn=" +
                  _self.projectSn +
                  "&userid=" +
                  _self.userid +
                  "&sendtype=1"
              },
              {
                type: 1, //按钮点击类型 1=请求url 2=打开url
                name: "退回",
                url:
                  "/contract/do_todobtu?type=4&pingfen=0&docid=" +
                  _self.id +
                  "&projectSn=" +
                  _self.projectSn +
                  "&userid=" +
                  _self.userid +
                  "&title=" +
                  title +
                  "&titletype=" +
                  titletype +
                  "&sendtype=1"
              }
            ]
          };
          //										alert(JSON.stringify(todojson));

          if (type == 2) {
            tipApi.close("waring");
            // layer.close(ludan("提交中", 0, 1))
            window.appApi.sendTodo(todojson, function(d) {
              if (d.code == 200) {
                tipApi.success("提交成功", 2, function() {
                  appApi.refreshData(2);
                  /*window.appApi.closeNewWindow()*/
                });
                // ludan("提交成功", 3, 2, function() {
                //     appApi.refreshData(2);
                // 	/*window.appApi.closeNewWindow()*/
                // })
              }
            });
          } else {
            tipApi.close("waring");
            // layer.close(ludan("保存中", 0, 1))
            tipApi.success("保存成功", 2);
            // ludan("保存成功", 3, 2)
            //											layer.close(loading("保存中"))
          }
        } else {
          alert("response");
          // msg("response")
        }
      });
    },
    aa: function(CONTENT) {
      var _self = this;
      if (_self.callbackCode == 111) {
        try {
          _self.tabs[_self.selectdTadIndex].gongren = xk_util
            .getArrayProperty(JSON.parse(CONTENT.result), "nickName")
            .toString();
        } catch (err) {
          alert("错误了");
          alert(err);
        }
      } else if (_self.callbackCode == 222) {
        var room = JSON.parse(CONTENT.result);
        if (room.companyId == "" || room.companyId == null) {
          _self.companyBuyID = room.roomName;
        } else {
          _self.companyBuyID = room.companyId;
        }
        _self.companyBuyName = room.roomName;
        _self.companyBuyClassName = room.roomClassName;
        _self.companyBuyRoomID = room.roomId;
        _self.companyBuyRoomImID = room.roomImId;
        _self.getBaoliangInfo();
      }
      /*var addname = '&'
						for(var i = 0; i < JSON.parse(CONTENT.result).length; i++) {
							addname += ","
							addname += JSON.parse(CONTENT.result)[i].roomName
						}*/

      _self.tabs[_self.nuberhang].mingcheng = addname.split("$,")[1];
    },
    getBaoliangInfo: function() {
      var _self = this;
      this.$http
        .post(
          "/chart/column/baoliang_info?companyShigongID=" +
            _self.companyBuyRoomID +
            "&currRoomId=" +
            _self.currRoomId
        ) //_self.companyBuyRoomID+
        .then(function(response) {
          if (response.data.code == 200) {
            console.log(response.data.result);
            console.log(response.data.result.gdmx);
            var keys = Object.keys(response.data.result.gdmx);
            console.log(keys);
            keys.sort(function(a, b) {
              return new Date(a) < new Date(b) ? 1 : -1;
            });
            console.log(keys);
            $.each(keys, function() {
              //初始化
              for (tab in response.data.result.gdmx[p]) {
                tab.selectdStatus = false;
              }
              var key = this.substring(-1, this.length);
              _self.gongdanTabs.push({
                name: key,
                selectdStatus: false,
                value: response.data.result.gdmx[this]
              });
            });
            //console.log(JSON.stringify(_self.gongdanTabs))
            //_self.gongdanTabs = response.data.result.gdmx
            // _self.startDate = new Date(response.data.result.bl.end_date).Format("yyyy-MM-dd")
            console.log(response.data.result)
            _self.startDate = util.fnFormat(
              response.data.result.bl.end_date,
              "yyyy-MM-dd"
            );
            // _self.startDate="2016-02-02"
            // console.log("_self.startDate" + _self.startDate);
          }
        });
    },
    mask: function() {
      var _self = this;
      _self.isUnitShow = false;
      $(".mui-backdrop").hide();
    },
    //选工人
    changeman: function(n) {
      var _self = this;
      _self.selectdTadIndex = n;
      _self.callbackCode = 111;
      window.appApi.openProjectContactSelectPage(
        _self.projectSn,
        "",
        "",
        1,
        true
      );
    },
    //选房间
    changRoom: function(n) {
      var _self = this;
      _self.callbackCode = 222;
      window.appApi.openProjectContactSelectPage(
        _self.projectSn,
        "",
        currRoomCreditCode,
        3,
        false
      );
    },
    moveimg: function(n) {
      var _self = this;
      this.$http
        .post(
          "/sass_api/delete_file?userId=userid&fileId=" + _self.zrimg[n - 1]
        )
        .then(function(response) {
          if (response.data.code == 0) {
            console.log(response.data);

            ludan("删除成功", 1, 2);
          }
        })
        .catch(function(error) {
          ludan(error, 1, 3);
        });
      console.log(_self.imgs);
      _self.imgs.splice(n - 1, 1);
      console.log(_self.imgs);
      _self.zrimg.splice(n - 1, 1);
    },
    movefj: function(n) {
      var _self = this;
      this.$http
        .post(
          "/sass_api/delete_file?userId=userid&fileId=" + _self.zrimg[n - 1]
        )
        .then(function(response) {
          if (response.data.code == 0) {
            console.log(response.data);
            ludan("删除成功", 1, 2);
          }
        })
        .catch(function(error) {
          ludan(error, 1, 3);
        });
      _self.fujians.splice(n - 1, 1);
      //						console.log(n-1)
      _self.zrfujian.splice(n - 1, 1);
      console.log(_self.zrfujian);
      console.log(typeof JSON.stringify(_self.zrfujian));
      //						console.log(_self.imgid[1])
      //						_self.imgid.remove(n-1)
    },
    addli: function() {
      var _self = this;
      _self.tabs.push({
        selectdStatus: false,
        mingcheng: "",
        danwei: "",
        shuliang: ""
      });
      console.log(_self.tabs[0].mingcheng);
    },
    deleat: function(tab, n) {
      var _self = this;
      _self.tabs.splice(n, 1);
      if (tab.index != null) {
        var indexs = tab.index.split("-");
        _self.gongdanTabs[indexs[0]].value[indexs[1]].selectdStatus = false;
        _self.gongdanTabs[indexs[0]].value[indexs[1]].index = undefined;
      }
    },
    //上传文件
    upfile: function(event) {
      loading("上传中");
      sessionStorage.removeItem("cunnews");
      var _self = this;
      var file = document.getElementById(event.target.id).files;
      var zrid = document.getElementById(event.target.id).getAttribute("id");
      var url = "/sass_api/upload_file";
      var form = new FormData();
      var forimg = [];
      var forfile = [];
      for (var i = 0; i < file.length; i++) {
        form.append("file", file[i]);
        //读取图片数据
        var f = document.getElementById(event.target.id).files[i];
        var imgtype = f.type.split("/")[0];
        if (zrid == "file") {
          var reader = new FileReader();
          reader.onload = function(e) {
            var data = e.target.result;
            //加载图片获取图片真实宽度和高度
            var image = new Image();
            image.onload = function() {
              width = image.width;
              height = image.height;
            };
            image.src = data;
            forimg.push({
              src: image.src
            });
          };
          sessionStorage.setItem("cunnews", "1");
          reader.readAsDataURL(f);
        } else if (zrid == "files" || zrid == "excelFile") {
          sessionStorage.setItem("cunnews", "2");
          var na = file[i].name;
          forfile.push({
            name: f.name
          });
          console.log(_self.fujians);
        }
      }
      if (sessionStorage.getItem("cunnews") == 1) {
        form.append("type", "1");
      } else {
        form.append("type", "2");
      }
      form.append("module", "laowu");
      form.append("userid", _self.userid);
      xhr = new XMLHttpRequest();
      xhr.open("post", url, true);
      xhr.onload = function(evt) {
        //请求完成
        layer.close(loading("上传中"));
      };
      xhr.onreadystatechange = function(evt) {
        console.log(xhr);
        if (xhr.readyState == 4 && xhr.status == 200) {
          console.log(xhr.responseText);
          var data = JSON.parse(evt.target.responseText);
          // if(sessionStorage.getItem("cunnews") == 1) {
          // 	_self.imgs = _self.imgs
          // 		.concat(forimg)
          // 	_self.imgid.push(data.result.success)
          // 	console.log(_self.imgid)
          // 	_self.zrimg = _self.imgid.toString()
          // 		.split(',')
          // } else {
          // 	_self.fujianid.push(data.result.success)
          // 	_self.fujians = _self.fujians
          // 		.concat(forfile)
          // 	_self.zrfujian = _self.fujianid
          // 		.toString().split(',')
          // 	console.log(_self.fujianid.toString())
          // }
          var rtnfiles = data.result.success;
          if (sessionStorage.getItem("cunnews") == 1) {
            _self.imgs = _self.imgs.concat(rtnfiles);
            for (var i = 0; i < rtnfiles.length; i++) {
              _self.imgid.push(rtnfiles[i].fileId);
            }
            console.log(_self.imgid);
            if (_self.imgid.toString()) {
              _self.zrimg = _self.imgid.toString().split(",");
            }
          } else {
            for (var i = 0; i < rtnfiles.length; i++) {
              _self.fujianid.push(rtnfiles[i].fileId);
            }
            _self.fujians = _self.fujians.concat(forfile);
            if (_self.fujianid.toString()) {
              _self.zrfujian = _self.fujianid.toString().split(",");
            }

            console.log(_self.fujianid.toString());
          }
          _self.atts.push(data.result.success);
          ludan("上传成功！", 2, 2);
        } else if (xhr.readyState == 4 && xhr.status == 500) {
          ludan("上传失败！", 2, 1);
        }
      };
      xhr.onerror = function(evt) {
        //请求失败
        ludan("请求失败！", 2, 1);
        var data = JSON.parse(evt.target.responseText);
        console.log("data");
      };
      xhr.send(form);
    }
  }
};
</script>
<style>
.mui-title {
  font-size: 17px;
}
.mui-table-view-cell.mui-input-row .input-muitl {
  width: 64%;
  overflow: hidden;
  font-size: 0;
}
.mui-table-view-cell.mui-input-row .input-muitl .f-date,
.mui-table-view-cell.mui-input-row .input-muitl .r-date {
  float: left;
  width: 48%;
  font-size: 16px;
}
.mui-table-view-cell.mui-input-row .input-muitl .data-w {
  position: relative;
  top: 10px;
  left: -15px;
  float: left;
  width: 4%;
  font-size: 16px;
  color: #999;
}
.mui-table-view-cell.mui-input-row .input-muitl .r-date {
  float: left;
  width: 48%;
  font-size: 16px;
}
.publish-container .title {
  position: relative;
  padding: 11px 15px;
  text-align: left;
}
.oa-contact-avatar p,
.oa-contact-avatar .oa-pic-default {
  display: block;
  width: 40px;
  height: 40px;
  background: #4ba9e9;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  color: #fff;
  font-size: 18px;
}
.oa-contact-name ~ .oa-contact-email,
label {
  text-align: left;
}
.container-average {
  overflow: hidden;
  padding-bottom: 10px;
}
.mui-table-view-cell.mui-input-row .input-muitl input {
  font-size: 16px;
}
#one {
  color: #777;
}
.list-container {
  min-height: auto;
}
#two td:nth-child(1) {
  width: 100%;
  float: left;
}
#two td:nth-child(2),
#two td:nth-child(3) {
  position: relative;
}
#two td:nth-child(2) .unit {
  position: absolute;
  right: 10px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 14px;
}
.table-record .btn-delete {
  right: initial;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
#two td input {
  margin-bottom: 0;
}
.unit-box .item .con {
  color: #333;
}
.unit-box .item {
  float: left;
}
.mui-action-back {
  float: left;
}
.table-record thead {
  border-bottom: 1px solid #eee;
}
.table-record tbody tr {
  border-bottom: 1px solid #f8f8f8;
}
.title {
  text-align: left;
}
.companypic {
  width: 50px;
}
.companypic p {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #4ba9e9;
  text-align: center;
  line-height: 36px;
  font-size: 16px;
  color: #fff;
}
.container-average-img {
  padding-top: 10px;

  overflow: auto;
}

.publish-container .container-average .img-item .btn-roll {
  top: -12px;

  right: 1px;
}

.publish-container .container-average .img-item {
  overflow: visible;
}

.add-contain .mui-btn-primary {
  padding: initial;
}
.oa-contact-email {
  text-align: left;
}
</style>
