<template>
<div class="mui-fullscreen" id="app">
    <!-- 侧滑导航根容器 -->
		<div class="mui-off-canvas-wrap mui-draggable mui-fullscreen mui-slide-in">
			<!-- 菜单容器 -->
			<div class="mui-right mui-fullscreen" :class="leibiemove ? 'leibiemove-left' : 'leibiemove-right'">
				<header class="mui-bar mui-bar-nav">
					<h1 class="mui-title">选择业务类别</h1>
					<!-- <button class="mui-btn mui-btn-link mui-pull-right" v-if="tapyewu" @click="makeyewu(0)">完成</button>
					<button class="mui-btn mui-btn-link mui-pull-right" v-else @click="makeyewu(1)">编辑</button> -->
                    <button class="mui-btn mui-btn-link mui-pull-right" v-if="tapyewu ? yewutitle='完成': yewutitle='编辑'" v-text="yewutitle" @click="makeyewu"></button>
				</header>
				<div class="add-contain" :class="tapyewu? 'yewuup':'yewudown'">
					<input type="text" name="" value="" placeholder="请输入类别名称" v-model="addname" />
					<button class="mui-btn mui-btn-primary" @click="addlianxi">+</button>
				</div>

				<div class="mui-scroll-wrapper" :class="tapyewu? 'listup':'listdown'">
					<div class="mui-scroll">
						<ul class="mui-table-view eg-table-view category-table" style="margin-bottom: 0;">
								<li class="mui-table-view-cell" v-for="(n,index) in sites" :key="index">
									<a v-text="n.name"  @click="yewulist(n.name)"></a>
                                    <span class="btn-roll btn-delete" v-if="tapyewu" @click="delateyewu(index)"></span>
                                </li>
						</ul>
					</div>
				</div>
			</div>
			<div class="" @click="mask" :class="leibiemove ? 'maskshow':'mask'"></div>
			<!-- 主页面容器 -->

			<div class="mui-inner-wrap mui-fullscreen" style="overflow: scroll;">
				<!-- 主页面标题 -->
				<header class="mui-bar mui-bar-nav">
					<h1 class="mui-title" ref="title_name">收发件</h1>
					<a class="mui-action-back mui-icon iconfont icon-back" v-if="backicon!=0" @click="back"></a>
					<!--<button id="btn-referrer" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left hide">
						<a class="mui-action-back mui-icon iconfont icon-back"></a>
					</button>-->

				</header>
						<div v-if="backicon==0">
							<div class="step step1 fix_content ">
								<ul class="mui-table-view eg-table-view">
									<li class="mui-table-view-cell mui-input-row">
										<label>标题</label>
										<input type="text" value="" placeholder="必填" v-model="title" />
									</li>
									<li class="mui-table-view-cell mui-input-row" @click="leibie">
										<a class="mui-navigate-right" href="#">
											<label>类别</label>
											<input type="text" value="" placeholder="请选择" readonly="readonly" v-model="yewu" />
										</a>
									</li>
									<li class="mui-table-view-cell mui-input-row">
										<a class="mui-navigate-right" href="#">
											<label>日期</label>
											<!-- <input type="text" v-model="form.MissionStartDate" @click="app.selectDate('s')" readonly="readonly" placeholder="请选择" /> -->
                                            <input type="text" name="start" id="start" v-model="form.MissionStartDate" readonly="readonly" placeholder="请选择" @click="danjuApi.openPicker">
                                            <mt-datetime-picker  ref="picker"
                                      v-model="pickerVisible"
                                      type="date"
                                      year-format="{value} 年"
                                      month-format="{value} 月"
                                      date-format="{value} 日"
                                      @confirm="danjuApi.handleConfirm"
                                      >

                                  </mt-datetime-picker>
                                        </a>
									</li>
									<li class="mui-table-view-cell mui-input-row">
										<label>详细说明</label>
										<textarea class="m-block" name="" rows="6" cols="" placeholder="请输入说明内容…" v-model="beizhu"></textarea>
									</li>
								</ul>
								<div class="btn-box">
									<button class="mui-btn mui-btn-primary mui-btn-block" @click="step1(1)">下一步</button>
								</div>
							</div>
						</div>
						<!--------第二步---------->
						<div v-else-if="backicon==1">
							<div class="step step2 fix_content">
								<div class="publish-container">
									<div class="title">接收单位</div>
									<ul class="mui-table-view mui-table-view-striped container-average address-item">
											<li class="mui-table-view-cell" v-for="(n,index) in nowCompany" :key="index">
												<span class="btn-roll btn-delete" @click="delcompany(index)"></span>
												<div class="oa-contact-cell mui-table">
													<div class="oa-contact-avatar mui-table-cell companypic">
														<p v-text="n.roomclass.split('')[0]"></p>
													</div>
													<div class="oa-contact-content mui-table-cell">
														<h4 class="oa-contact-name" v-text="n.roomclass"></h4>
														<p class="oa-contact-email" v-text="n.name"></p>
													</div>
												</div>
											</li>
										<li class="upload-btn">
											<div class="img-item-inner mui-icon mui-icon-plusempty" @click="xuangongsi"></div>
										</li>
									</ul>
								</div>
								<div class="btn-box">
									<button class="mui-btn mui-btn-primary mui-btn-block" @click="step2(2)">下一步</button>
								</div>
							</div>
						</div>
						<!--------第三步---------->
						<div class="mui-content mui-scroll-wrapper" v-if="backicon==2">
					<div class="">
						<div v-if="backicon==2">
							<div class="step step3 ">
								<div class="publish-container">
									<div class="title">图片</div>
									<ul class="container-average container-average-img">
											<li class="img-item" v-for="(img,number) in imgs" :key="number">
												<div class="img-item-inner">
													<img v-bind:src="img.src">
												</div>
												<span class="btn-roll btn-delete" @click="danjuApi.moveimg(number+1)"></span>
											</li>
										<li class="upload-btn">
											<div class="img-item-inner mui-icon mui-icon-plusempty"><input type="file" accept="image/*" class="upimg" id="file" v-on:change="danjuApi.upfile" multiple="multiple" /></div>
										</li>
									</ul>
								</div>

								<div class="publish-container">
									<div class="title">附件</div>
									<ul class="mui-table-view mui-table-view-striped container-average container-file">
											<li class="mui-table-view-cell" v-for="(img,number) in fujians" :key="number">
												<span class="btn-roll btn-delete" @click="danjuApi.movefj(number+1)"></span>
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
											<div class="img-item-inner mui-icon mui-icon-plusempty"><input type="file" class="upfile" id="files" v-on:change="danjuApi.upfile" multiple="multiple" /></div>
										</li>
									</ul>
								</div>
								<div class="mui-table mult-btn-box">
									<div class="mui-table-cell"><button type="button" class="mui-btn mui-btn-primary" @click="save(1)">保&nbsp;&nbsp;存</button></div>
									<div class="mui-table-cell space"></div>
									<div class="mui-table-cell"><button type="button" class="mui-btn mui-btn-primary" @click="save(2)">提&nbsp;&nbsp;交</button></div>
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
import { BackCookie } from "../../../playform/common.js";
import setting from "../../../playform/config.js";
import danjuApi from "../js/danjuAPi.js";
import tipApi from "../../../playform/tipApi.js";

export default {
  data() {
    return {
        userid: setting.getCookie("userid"),

      username: setting.getCookie("username"),
      danjuApi: danjuApi,
      pickerVisible: "",
      yewutitle: "",
      imgid: [],
      fujianid: [],
      id: "",
      currRoomImId: this.$route.query.isRoomImId,
      currRoomClassName: this.$route.query.currRoomClassName,
      sites: [],
      title: "",
      yewu: "",
      delyewu: false,
      tapyewu: false,
      form: {
        // 日期
        MissionStartDate: ""
      },
      confirm: "",
      postType: "",
      yewuchangge: "", //用于判断业务类别是否增加、删除（1）
      addname: "", //增加的业务类别
      nowCompany: [], //存储所选的公司信息
      nowCompanyroomid: [], //存储选择公司的roomid
      nowCompanyroomimid: [], //存储选择公司的roomimid
      nowroomimid: [],
      nowCompanyid: [], //存储选择公司的companyid
      nowCompanyname: [], //存储选择公司的companyname
      isroomname: this.$route.query.isRoomName,
      isroomCreditCode: this.$route.query.isRoomCreditCode,
      imgs: [],
      imgurl: [],
      fujians: [],
      backicon: 0,
      nowtime: "",
      shenqing: "",
      zrimg: [],
      zrfujian: [],
      attachmentIds: "",
      beizhu: "",
      beizhuzhuan: "",
      //地址拦信息
      pa_cigid: this.$route.query.cfgid,
      pa_projectsn: this.$route.query.projectSn,
      pa_isroomid: this.$route.query.isRoomId,
      pa_isroomname: this.$route.query.isRoomName,
      pa_projectName: this.$route.query.projectName,
      pa_isRoomCreditCode: this.$route.query.isRoomCreditCode,
      // pa_isroomid: this.$route.query.isRoomId,
      tuistatus: "",
      tijao: "",
      baocun: "",
      first: "",
      imgsrc: [],
      leibiemove: false,
    };
  },
  created: function() {
    danjuApi.vue = this;
    danjuApi.initVue();
    //   this.formDate();
    this.getTime();
    if (this.$route.query.id != undefined) {
      this.rebackData();
    } else {
      this.getnews();
    }
  },
  mounted: function() {
    //   var _self = this;
  },
  methods: {
    //获取时间
    formDate: function(value) {
      var date = new Date(value);
      var Y, d, m, H, i, s;
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
    getTime: function() {
      function formDate(value) {
        var date = new Date(value);
        var Y, d, m, H, i, s;
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
      }
      var _self = this;
      var getTime = new Date();
      var nowTime = getTime.toLocaleDateString();
      var year = nowTime.split("/")[0];
      var mouth = nowTime.split("/")[1];
      var day = nowTime.split("/")[2];
      var nowshi = getTime.getHours();
      var noefen = getTime.getMinutes();
      var nowmiao = getTime.getSeconds();
      if (nowshi < 10) {
        nowshi = "0" + nowshi;
      }
      if (noefen < 10) {
        noefen = "0" + noefen;
      }
      if (nowmiao < 10) {
        nowmiao = "0" + nowmiao;
      }
      if (mouth < 10) {
        mouth = "0" + mouth;
      }
      if (day < 10) {
        day = "0" + day;
      }
      _self.shenqing = year + "-" + mouth + "-" + day;
      _self.nowtime = nowshi + ":" + noefen + ":" + nowmiao;
      _self.form.MissionStartDate = formDate(year + "-" + mouth + "-" + day);
      _self.pickerVisible=formDate(year + "-" + mouth + "-" + day);
    },
    //获取业务类别
    getnews: function() {
      var _self = this;
      this.$http
        .post(
          "/chart/column/table_w_danjutypecfg?used=getName&type=1&companyName=" +
            _self.isroomname +
            "&companyId=" +
            _self.isroomCreditCode
        )
        .then(function(response) {
          if (response.data.code == 200) {
            //								console.log(response)
            _self.sites = response.data.result;
          } else {
            tipApi.waring("获取业务类别失败",1)
            // ludan("获取业务类别失败", 1, 1);
          }
        });
    },
    //编辑业务
    makeyewu: function() {
      var _self = this;
      if (_self.tapyewu) {
        _self.sendyewu();
      }
      _self.tapyewu = !_self.tapyewu;
    },
    //选择业务类别
    yewulist: function(name) {
      var _self = this;
      this.leibiemove = !this.leibiemove;

      //						_self.checktitle = false
      _self.yewu = name;
    },
    //增加业务类别
    addlianxi: function() {
      var _self = this;
      _self.yewuchangge = 1;
      if (_self.addname != "") {
        _self.sites.unshift({
          name: _self.addname
        });
      }
      _self.addname = "";
    },
    //删除对应业务类别
    delateyewu: function(n) {
      var _self = this;
      _self.yewuchangge = 1;
      if (_self.sites.length > 1) {
        _self.sites.splice(n, 1);
      }
      if (_self.sites.length == 1) {
        _self.delyewu = true;
      }
    },
    //点击第一步
    step1: function(n) {
      var _self = this;
      appApi.hideBack();
      if (_self.title == "") {
        tipApi.waring("请输入标题",1)
        // ludan("请输入标题", 1, 1);
      } else if (_self.yewu == "") {
        tipApi.waring("请选择类别",1)
        // ludan("请选择类别", 1, 1);
      } else {
        //							_self.beizhuzhuan = _self.beizhu.replace(/<\/?.+?>/g, "#.%#");
        _self.beizhuzhuan = _self.beizhu.replace(/[\r\n]/g, "#.%#");
        _self.backicon = n;
      }
      _self.sendyewu();
    },
    //点击第二步
    step2: function(n) {
      var _self = this;
      // appApi.hideBack();
      // if (_self.nowCompany.length == 0) {
      //   tipApi.waring("请选择接收单位",1)
      //   // ludan("请选择接收单位", 1, 1);
      // } else {
      //   _self.backicon = n;
      // }
      _self.backicon = n
    },
    //点击返回按钮
    back: function() {
      var _self = this;
      if (_self.backicon == 1) {
        appApi.showBack();
      }
      if (_self.backicon > 0) {
        _self.backicon = _self.backicon - 1;
      }
    },
    //提交更改的业务类别信息
    sendyewu: function() {
      var _self = this;
      var yewuname = [];
      for (var i in _self.sites) {
        yewuname.push(_self.sites[i].name);
      }
      //						var param = {
      //							"type": "1",
      //							"companyName": _self.isroomname,
      //							"companyID": _self.isroomCreditCode,
      //							"names": yewuname.toString(),
      //						}
      var params = new FormData();
      params.append("type", "1");
      params.append("companyName", _self.isroomname);
      params.append("companyID", _self.isroomCreditCode);
      params.append("names", yewuname.toString());
      var urlcan =
        "type=1&companyName=" +
        _self.isroomname +
        "&companyID=" +
        _self.isroomCreditCode +
        "&names=" +
        yewuname.toString();
      this.$http
        .post("/chart/column/insert_w_danjutypecfg", params)
        .then(function(response) {
          if (response.data.code == 0) {
            console.log(response);
          }
        })
        .catch(function(error) {
          tipApi.waring(error,1)
          //   ludan(error, 1, 3);
        });
    },
    //从原生获取接收单位信息
    selectCompany: function(CONTENT) {
      var _self = this;
      var newcompany = [];
      var companyroomimid = [];
      var companyroomid = [];
      var companyid = [];
      var companyname = [];
      for (var i = 0; i < JSON.parse(CONTENT.result).length; i++) {
        newcompany.push({
          roomclass: JSON.parse(CONTENT.result)[i].roomClassName,
          name: JSON.parse(CONTENT.result)[i].roomName
        });
        companyroomimid.push(JSON.parse(CONTENT.result)[i].roomImId);
        companyroomid.push(JSON.parse(CONTENT.result)[i].roomId);
        if (JSON.parse(CONTENT.result)[i].companyId == "") {
          companyid.push(JSON.parse(CONTENT.result)[i].roomName);
        } else {
          companyid.push(JSON.parse(CONTENT.result)[i].companyId);
        }

        companyname.push(JSON.parse(CONTENT.result)[i].roomName);
      }
      _self.nowCompany = newcompany;
      _self.nowCompanyroomimid = companyroomimid;
      _self.nowCompanyroomid = companyroomid;
      _self.nowCompanyid = companyid;
      _self.nowCompanyname = companyname;
    },
    //选接收单位
    xuangongsi: function() {
      //xiaoshou
      var _self = this;
      window.appApi.openProjectContactSelectPage(
        this.pa_projectsn,
        "",
        _self.$data.nowCompanyroomid.toString(),
        3,
        true,
        true
      );
      window.appApi.callBackFun = function(callFlag, CONTENT) {
        if (callFlag == appApi.callBackFlag.GONGSI) {
          _self.selectCompany(CONTENT);
        }
      };
    },
    //删除接收单位
    delcompany: function(index) {
      var _self = this;
      _self.nowCompany.splice(index, 1); //删除对应的名字
      _self.nowCompanyroomid.splice(index, 1); //删除对应的 roomid
      _self.nowCompanyroomimid.splice(index, 1); //删除对应的 roomimid
    },
    save: function(type) {
      if (type == 1) {
        this.tijao = 1;
      } else {
        this.baocun = 1;
      }
      danjuApi.getimgurl(type);
    },
    //点击类别
    leibie: function() {
      this.leibiemove = !this.leibiemove;
    },
    mask: function() {
      this.leibiemove = !this.leibiemove;
    },
    // 退回数据
    rebackData:function(){
      var _self = this
						var param = {
							id: this.$route.query.id,
						}
						_self.$http.post("/contract/get_content", param).then(function(response) {
							if(response.data.code == 200) {
								var norl = JSON.parse(response.data.result.noralJson)
								var cont = JSON.parse(response.data.result.contentJson)
								var data = response.data.result
								console.log(response.data)
								_self.title = norl.tablefields.name
								_self.yewu = norl.tablefields.type
								_self.form.MissionStartDate = _self.formDate(norl.tablefields.dateFasheng)
								norl.tablefields.beizhu = norl.tablefields.beizhu.replace(/#.%#/g, "\n");
								_self.beizhu = norl.tablefields.beizhu
								_self.isroomname = norl.curRoomName
								_self.currRoomImId = norl.currRoomImId
								_self.isRoomCreditCode = norl.tablefields.companySaleID
								_self.getnews()
								console.log("123",norl.gongsialllei)
								//接收单位数据
								_self.nowCompany = norl.gongsialllei
								_self.nowCompanyroomid.push(norl.roomid)
								_self.nowCompanyroomid = norl.tablefields.companyBuyRoomID.split(",")
								_self.nowCompanyroomimid = norl.toImid.split(",")
								//图片附件
								_self.imgs = norl.imgs
								_self.fujians = norl.fujians
                                if(norl.imgid.toString()){
                                    _self.imgid = norl.imgid.toString().split(",")
                                    _self.zrimg = norl.imgid.toString().split(",")
                                }

								if(norl.fjid.toString()){
                                    _self.zrfujian = norl.fjid.toString().split(",")
                                    _self.fujianid = norl.fjid.toString().split(",")
								}

								//提交信息
								_self.id = _self.$route.query.id
								_self.pa_cigid = norl.table.id
								_self.pa_projectsn = data.projectId
								_self.pa_isroomid = data.roomId
								_self.pa_isroomname = data.roomName
								_self.pa_isRoomCreditCode = norl.tablefields.companySaleID
								_self.pa_projectName = norl.tablefields.projectName
								_self.currRoomImId = norl.currRoomImId
								_self.currRoomClassName = norl.curRoomName
								_self.attachmentIds = norl.attachment
                                _self.confirm = response.data.result.confirm;
								if(norl.tablefields.companyBuyName.split(",")[1] != undefined) {
									_self.nowCompanyname = norl.tablefields.companyBuyName.split(',')
									_self.nowCompanyid = norl.tablefields.companyBuyID.split(',')
								} else {
									_self.nowCompanyname.push(norl.tablefields.companyBuyName)
									_self.nowCompanyid.push(norl.tablefields.companyBuyID)
								}

							}
						})
    }
  }
};
</script>
<style type="text/css" scoped>
/* @import "../../../assets/css/common/mint"; */
.mui-inner-wrap {
  padding-top: 44px;
}
.mui-table-view-cell label {
  text-align: left;
}
.leibiemove-left {
  width: 74%;
  transform: translate3d(36%, 0, 0);
  transition: all 0.75s;
  z-index: 99;
}
.leibiemove-right {
  transform: translate3d(100%, 0, 0);
  transition: all 0.75s;
  z-index: 99;
}
.listup {
  z-index: 1000;
  animation: listup 0.4s, 0ms ease;
  animation-fill-mode: forwards;
}

@keyframes listup {
  from {
    margin-top: 44px;
  }
  to {
    margin-top: 106px;
  }
}

.listdown {
  z-index: 1000;
  animation: listdown 0.4s, 0ms ease;
  animation-fill-mode: forwards;
}

@keyframes listdown {
  from {
    margin-top: 106px;
  }
  to {
    margin-top: 44px;
  }
}
.mui-scroll {
  height: 100%;
  overflow: scroll;
  background: #fff;
}
.maskshow {
  width: 100%;
  height: 100%;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.6;
  background: #000;
  z-index: 2;
}
.mui-action-back {
  float: left;
}
.title {
  text-align: left;
}
.oa-contact-email{
    text-align: left
}
.companypic{
    width: 50px;
}
.companypic p{
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
.mui-fullscreen{
  background:#efeff4
}
.mult-btn-box{
  position: fixed;
  bottom: 10px
}
.mui-scroll-wrapper{
  overflow: scroll;
  margin-bottom: 56px
}
</style>
