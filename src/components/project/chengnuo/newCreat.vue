<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title" ref="title_name">微承诺</h1>
            <a class="mui-action-back mui-icon iconfont icon-back" v-if="backicon!=0" @click="back"></a>
        </header>
					<div v-if="backicon==0" class="mui-content">
						<div class="step step1 fix_content">
							<ul class="mui-table-view eg-table-view">
								<li class="mui-table-view-cell mui-input-row" @click="chengnuo">
									<a class="mui-navigate-right" href="#">
										<label>承诺人(必填)</label>
										<input type="text" value="" placeholder="必填" v-model="personAccept" />
									</a>
								</li>
								<li class="mui-table-view-cell mui-input-row" @click="beichengnuo">
									<a class="mui-navigate-right" href="#">
										<label>被承诺人(必填)</label>
										<input type="text" value="" placeholder="请选择" readonly="readonly" v-model="personDistribute" />
									</a>
								</li>
								<li class="mui-table-view-cell mui-input-row">
									<!--<a class="mui-navigate-right" href="#">-->
									<!-- <label>承诺完成日期</label> -->
									<!-- <input type="text" v-model="form.MissionStartDate" @click="_self.selectDate('s')" readonly="readonly" placeholder="请选择" /> -->
									<!--</a>-->
                                    <data-bar :title="returntitle" @datatoParent="childValue"></data-bar>
								</li>
								<li class="mui-table-view-cell muitl-input-row">
									<label class="mui-pull-left">承诺类型</label>
									<div class="select-box col-xs-6" style="overflow: hidden;">
										<div class="mui-input-row mui-radio mui-left" @click="xuanren('单方承诺')">
											<label>单方</label><input type="radio" name="checkbox1" checked="checked" value="1" v-if="chec==1" />
											<input type="radio" name="checkbox1" value="1" v-else-if="chec==2" />
										</div>
										<div class="mui-input-row mui-radio mui-left" @click="xuanren('双方承诺')">
											<label>双方</label><input type="radio" name="checkbox1" value="2" checked="checked" v-if="chec==2" />
											<input type="radio" name="checkbox1" value="2" v-else-if="chec==1" />
										</div>
									</div>
								</li>
								<li class="mui-table-view-cell mui-input-row">
									<label>承诺内容</label>
									<textarea class="m-block" name="" rows="6" cols="" placeholder="请输入承诺内容…" v-model="beizhu"></textarea>
								</li>
							</ul>
							<div class="btn-box">
								<button class="mui-btn mui-btn-primary mui-btn-block" @click="step1(1)">下一步</button>
							</div>
						</div>
					</div>
					<!--------第2步---------->
					<!-- <div class="mui-content mui-scroll-wrapper">
					<div class="mui-scroll"> -->
					<div v-if="backicon==1" class="mui-content">
						<div class="step step3 ">
							<div class="publish-container">
								<div class="title">图片</div>
								<ul class="container-average container-average-img">
										<li class="img-item" v-for="(img,number) in imgs" :key="number">
											<div class="img-item-inner">
												<!--<img v-bind:src="img.src">-->
												<img src="" class="logo" v-lazy="img.src">
												<div class="bg-company" v-lazy:background-image="imgIcon"></div>
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
								<div class="mui-table-cell"><button type="button" class="mui-btn mui-btn-primary" @click="save">保&nbsp;&nbsp;存</button></div>
								<div class="mui-table-cell space"></div>
								<div class="mui-table-cell"><button type="button" class="mui-btn mui-btn-primary" @click="sends">提&nbsp;&nbsp;交</button></div>
							</div>
						</div>
					
                    
                    
                    
                     <!-- </div>
                    </div> -->
				</div>
    </div>
</template>
<script>
import { Picker } from 'mint-ui';
import { BackCookie } from "../../../playform/common.js";
import setting from "../../../playform/config.js";
import danjuApi from "../js/danjuAPi.js";
import tipApi from "../js/tipApi.js";
import dataBar from "../../common/dataBar"
export default {
     components: {
            'mt-picker': Picker,
            dataBar,
        },
  data() {
    return {
        danjuApi:danjuApi,
        returntitle:"承诺完成日期",
      userid: setting.getCookie("userid"),
      username: decodeURI(setting.getCookie("username")),
      imgurl: "http://res.winfreeinfo.com:8000",
      imgIcon: "../../images/ico_image.png",
      id: "",
      currRoomImId: this.$route.query.currRoomImId,
      currRoomClassName: this.$route.query.currRoomClassName,
      sites: [],
      form: {
        // 日期
        MissionStartDate: ""
      },
      companySaleName: "",
      companyBuyName: "",
      personAccept: decodeURI(setting.getCookie("username")),
      personDistribute: "",
      type: "单方承诺",
      beizhu: "0",
      personAcceptID:  setting.getCookie("userid"),
      personDistributeID: "",
      companySaleName: this.$route.query.isRoomName,
      companySaleID: this.$route.query.isRoomCreditCode,
      companySaleRoomID: this.$route.query.isRoomId,
      companyBuyName: "",
      companyBuyID: "",
      companyBuyRoomID: "",
      bcnroomImId: "",
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
      pa_isroomid: this.$route.query.isRoomId,
      tuistatus: "",
      tijao: "",
      baocun: "",
      first: "",
      imgsrc: [],
      chec: 1,
      startroomimid: "",
      UserName: "",
      Userid: this.$route.query.isRoomCreditCode,
      Userroomid: "",
      Userroomimid: "",
      touserid: "",
      confirm: "",
      postType: "",
      imgid: [],
      fujianid: [],
      chengnuiriqi:''
    };
  },
  created() {
    danjuApi.vue = this;
    danjuApi.initVue()
    this.getTime()
    if (this.$route.query.id != undefined) {
      this.informations();
    } else {
      this.usermains(this.pa_projectsn);
      //						this.getnews()
    }
    if (this.$route.query.currRoomId) {
      //查询当前房间信息
      this.findRoomInfo(this.$route.query.currRoomId);
    }
  },
  mounted() {},
  methods: {
        childValue:function(val){
            // this.test=val;
            this.form.MissionStartDate=this.formDate(val)
             console.log("value"+this.form.MissionStartDate)
        },
            formDate:function(value) {
                var Y,m,d,H,i,s,t
				var date = new Date(value);
				Y = date.getFullYear(),
					m = date.getMonth() + 1,
					d = date.getDate(),
					H = date.getHours(),
					i = date.getMinutes(),
					s = date.getSeconds();
				if(m < 10) {
					m = '0' + m;
				}
				if(d < 10) {
					d = '0' + d;
				}
				if(H < 10) {
					H = '0' + H;
				}
				if(i < 10) {
					i = '0' + i;
				}
				if(s < 10) {
					s = '0' + s;
				}
				//		<!-- 获取时间格式 2017-01-03 10:13:48 -->
				// var t = Y+'-'+m+'-'+d+' '+H+':'+i+':'+s;
				//		<!-- 获取时间格式 2017-01-03 -->
				var t = Y + '-' + m + '-' + d;
				return t;
			},
    //获取初始数据
    informations: function() {
      var _self = this;
      var param = {
        id: this.$route.query.id
      };
      this.$http
        .post("/contract/get_content", param)
        .then(function(response) {
          if (response.data.code == 200) {
            var norl = JSON.parse(response.data.result.noralJson);
            var cont = JSON.parse(response.data.result.contentJson);
            var data = response.data.result;
            console.log(response.data);
            _self.title = norl.tablefields.name;
            _self.yewu = norl.tablefields.type;
            //								_self.form.MissionStartDate = formDate(norl.tablefields.dateFasheng)
            norl.tablefields.beizhu = norl.tablefields.beizhu.replace(
              /#.%#/g,
              "\n"
            );
            _self.beizhu = norl.tablefields.beizhu;
            _self.isroomname = norl.curRoomName;
            _self.isRoomCreditCode = norl.tablefields.companySaleID;
            //								_self.getnews()
            console.log(norl.gongsialllei);
            //承诺人数据 personAccept personDistribute
            _self.personAccept = norl.tablefields.personAccept;
            //被承诺人数据
            _self.personDistribute = norl.tablefields.personDistribute;
            //承诺类型
            _self.type = norl.tablefields.type;
            if (norl.tablefields.type == "单方承诺") {
              _self.chec = 1;
            } else {
              _self.chec = 2;
            }
            //日期 norl.tablefields.dateChengnuo
            if (norl.tablefields.dateChengnuo == null) {

            } else {
              _self.form.MissionStartDate = _self.formDate(
                norl.tablefields.dateChengnuo
              );
            }

            _self.nowCompanyroomid = norl.tablefields.companyBuyRoomID.split(
              ","
            );
            _self.nowCompanyroomimid = norl.toImid.split(",");
            //图片附件
            _self.imgs = norl.imgs;
            console.log(_self.imgs);
            _self.fujians = norl.fujians;
            _self.imgid = norl.imgid.toString().split(",");

            _self.zrimg = norl.imgid.toString().split(",");
            _self.zrfujian = norl.fjid.toString().split(",");
            _self.fujianid = norl.fjid.toString().split(",");
            //提交信息
            _self.id = this.$route.query.id;
            _self.companySaleName = norl.tablefields.companySaleName;
            _self.companySaleID = norl.tablefields.companySaleID;
            _self.companySaleRoomID = norl.tablefields.companySaleRoomID;
            _self.companyBuyName = norl.tablefields.companyBuyName;
            _self.companyBuyID = norl.tablefields.companyBuyID;
            _self.companyBuyRoomID = norl.tablefields.companyBuyRoomID;

            _self.bcnroomImId = norl.toroomimid;

            _self.pa_cigid = norl.table.id;
            _self.pa_projectsn = data.projectId;
            _self.usermains(data.projectId);
            _self.pa_isroomid = data.roomId;
            _self.pa_isroomname = data.roomName;
            _self.pa_isRoomCreditCode = norl.tablefields.companySaleID;
            _self.pa_projectName = norl.tablefields.projectName;
            _self.currRoomImId = norl.currRoomImId;
            _self.currRoomClassName = norl.curRoomName;
          }
        });
    },
    // imgsrc: function(n) {
    //   var _self = this;
    //   this.$http
    //     .post("/sass_api/ get_uploadfile_info?fileIdStr=" + n)
    //     .then(function(response) {
    //       if (response.data.code == 200) {
    //         for (var i = 0; i < response.data.result.length; i++) {
    //           if (response.data.result[i].type == 1) {
    //             //imgs fujians name
    //             _self.imgs.push({
    //               src: response.data.result[i].longurl
    //             });
    //             _self.imgid.push(response.data.result[i].id);
    //           } else {
    //             _self.fujians.push({
    //               name: response.data.result[i].filename,
    //               fileid: response.data.result[i].id
    //             });
    //             _self.fujianid.push(response.data.result[i].id);
    //           }
    //         }
    //       }
    //     });
    // },
    //获取时间
    getTime: function() {
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
      //						_self.form.MissionStartDate = formDate('');
    },
    //时间选择
    // selectDate: function(t) {
    //   var o = this;
    //   // hx
    //   if (t == "s") {
    //     if (o.form.MissionStartDate != "") {
    //       opt.value = o.form.MissionStartDate;
    //     }
    //   } else if (t === "e") {
    //     if (o.form.MissionEndDate != "") {
    //       opt.value = o.form.MissionEndDate;
    //     }
    //   } else if (t === "d") {
    //     if (o.form.datejiexiang != "") {
    //       opt.value = o.form.datejiexiang;
    //     }
    //   }

    //   picker.show(function(rs) {
    //     /*
		// 					 * rs.value 拼合后的 value
		// 					 * rs.text 拼合后的 text
		// 					 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
		// 					 * rs.m 月，用法同年
		// 					 * rs.d 日，用法同年
		// 					 * rs.h 时，用法同年
		// 					 * rs.i 分（minutes 的第二个字母），用法同年
		// 					 */
    //     opt["value"] = rs.value; //控件同步
    //     if (t == "s") {
    //       o.form.MissionStartDate = rs.value;
    //     } else if (t === "e") {
    //       o.form.MissionEndDate = rs.value;
    //     } else if (t === "d") {
    //       o.form.datejiexiang = rs.value;
    //     }
    //     //							picker.dispose(); //释放资源
    //   });
    // },

    //选承诺人
    chengnuo: function() {
      var _self = this;
      _self.gsdifferent = 1;
      window.appApi.openProjectContactSelectPage(
        _self.pa_projectsn,
        "",
        _self.personAcceptID,
        1,
        false,
        true
      );
      window.appApi.callBackFun = function(callFlag, CONTENT) {
        if (callFlag == appApi.callBackFlag.GONGSI) {
          _self.selectMan(CONTENT);
        }
      };
    },
    //选被承诺人
    beichengnuo: function() {
      var _self = this;
      _self.gsdifferent = 2;
      //						alert(_self.personDistributeID)
      window.appApi.openProjectContactSelectPage(
        _self.pa_projectsn,
        "",
        _self.personDistributeID,
        1,
        false,
        true
      );
      window.appApi.callBackFun = function(callFlag, CONTENT) {
        if (callFlag == appApi.callBackFlag.GONGSI) {
          _self.selectMan(CONTENT);
        }
      };
    },
    xuanren: function(n) {
      var _self = this;
      _self.type = n;
    },
    //点击遮罩
    mask: function() {
      this.deleyewu();
    },
    //点击第一步
    step1: function(n) {
      var _self = this;
      appApi.hideBack();
      //						if(_self.personAccept == '') {
      //							ludan("请选择承诺人", 1, 1)
      //						} else if(_self.personDistribute == '') {
      //							ludan("请选择被承诺人", 1, 1)
      //						} else {
      _self.beizhuzhuan = _self.beizhu.replace(/<\/?.+?>/g, "#.%#");
      _self.beizhuzhuan = _self.beizhu.replace(/[\r\n]/g, "#.%#");
      _self.backicon = n;
      //						}
      this.sendyewu();
    },
    //点击第二步
    step2: function(n) {
      var _self = this;
      appApi.hideBack();
      if (_self.nowCompany.length == 0) {
        // ludan("请选择接收单位", 1, 1);
        tipApi.waring("请选择接收单位",2)
      } else {
        _self.backicon = n;
      }
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
      for (i in _self.sites) {
        yewuname.push(_self.sites[i].name);
      }
      var param = {
        type: "1",
        companyName: _self.isRoomName,
        companyID: _self.isRoomCreditCode,
        names: yewuname.toString()
      };
      var urlcan =
        "type=1&companyName=" +
        _self.isRoomName +
        "&companyID=" +
        _self.isRoomCreditCode +
        "&names=" +
        yewuname.toString();

      console.log("/chart/column/insert_w_danjutypecfg?" + urlcan);
      this.$http
        .post("/chart/column/insert_w_danjutypecfg?" + urlcan)
        .then(function(response) {
          console.log(response);
          if (response.data.code == 200) {
            console.log(response);
          }
        })
        .catch(function(error) {
        //   ludan(error, 1, 3);
          tipApi.waring(error,2)
        });
    },
    //从原生获取选人信息
    selectMan: function(CONTENT) {
      var _self = this;
      if (_self.gsdifferent == 1) {
        _self.xsbitian = 1;
        _self.personAccept = JSON.parse(CONTENT.result).nickName;
        _self.personAcceptID = JSON.parse(CONTENT.result).userId;
        _self.companySaleName = JSON.parse(CONTENT.result).roomName;
        if ((JSON.parse(CONTENT.result).companyId = "")) {
          _self.companySaleID = JSON.parse(CONTENT.result).roomName;
        } else {
          _self.companySaleID = JSON.parse(CONTENT.result).companyId;
        }
        _self.companySaleRoomID = JSON.parse(CONTENT.result).roomId;
        _self.cnroomImId = JSON.parse(CONTENT.result).roomImId;
        if (JSON.parse(CONTENT.result).userId != _self.userid) {
          //Userroomimid 当前用户不是承诺人
          _self.personDistributeID = _self.userid;
          _self.personDistribute = _self.username;
          _self.companyBuyName = _self.UserName;
          _self.companyBuyID = _self.Userid;
          _self.companyBuyRoomID = _self.Userroomid;
          _self.bcnroomImId = JSON.parse(CONTENT.result).roomImId;
          //								_self.touserid=
        }
        //							_self.usermains(JSON.parse(CONTENT.result).userId)
        //							_self.usermains(JSON.parse(CONTENT.result).userId)
        //							_self.usermains(JSON.parse(CONTENT.result).userId)
      } else if (_self.gsdifferent == 2) {
        _self.gmbitian = 1;
        _self.personDistribute = JSON.parse(CONTENT.result).nickName;
        _self.personDistributeID = JSON.parse(CONTENT.result).userId;
        _self.companyBuyName = JSON.parse(CONTENT.result).roomName;
        if (JSON.parse(CONTENT.result).companyId == "") {
          _self.companyBuyID = JSON.parse(CONTENT.result).roomName;
        } else {
          _self.companyBuyID = JSON.parse(CONTENT.result).companyId;
        }
        _self.companyBuyRoomID = JSON.parse(CONTENT.result).roomId;
        if (JSON.parse(CONTENT.result).userId != _self.userid) {
          _self.personAcceptID = _self.userid;
          _self.personAccept = _self.username;
          _self.companySaleName = _self.UserName;
          //								alert(isRoomCreditCode)
          _self.companySaleID = _self.Userid;
          _self.companySaleRoomID = _self.Userroomid;
          _self.bcnroomImId = JSON.parse(CONTENT.result).roomImId;
        }
        //							_self.usermains(_self.personDistributeID)
        _self.bcnroomImId = JSON.parse(CONTENT.result).roomImId;
        //							_self.usermains(_self.personDistributeID)
      }

      //判断被承诺人
      //						if(userid==_self.personDistributeID){
      //							_self.touserid=_self.personAccept
      //						}else{
      //							_self.touserid=_self.personDistribute
      //						}
    },
    //剪切板
    cliptext: function(CONTENT) {
      var _self = this;
      if (CONTENT.result.split("=")[0] == "jyxr") {
        _self.beizhu = CONTENT.result.split("=")[1];
        appApi.copyText("");
      }
    },
    //查询用户信息
    usermains: function(n) {
      var _self = this;
      this.$http
        .post(
            "/pcontact_api/getroombyprojectsn?projectSn=" +
            n +
            "&userId=" +
            _self.userid +
            "&currRoomId=" +
            this.$route.query.currRoomId
        )
        .then(function(response) {
          var result = response.data.result;
          if (response.data.code == 0) {
            //								_self.startroomimid=response.data.result.roomImId
            //当前用户的companyname/id/roomid
            _self.UserName = response.data.result.roomName;
            if (response.data.result.companyCreditCode == "") {
              _self.Userid = response.data.result.roomName;
              _self.companySaleID = response.data.result.roomName;
            } else {
              _self.companySaleID =
                response.data.result.companyCreditCode;
              _self.Userid = response.data.result.companyCreditCode;
            }
            _self.Userroomid = response.data.result.roomId;
            _self.Userroomimid = response.data.result.roomImId;
            _self.Userroomclass = response.data.result.roomClassName;
            //								_self.companySaleID=response.data.result.companyCreditCode
            //								_self.startroomimid=response.data.result.roomImId
            //当前用户的companyname/id/roomid
            _self.UserName = response.data.result.roomName;
            if ((response.data.result.companyCreditCode = "")) {
              _self.Userid = response.data.result.roomName;
            } else {
              _self.Userid = response.data.result.companyCreditCode;
            }
            _self.Userroomid = response.data.result.roomId;
            _self.Userroomimid = response.data.result.roomImId;
            _self.Userroomclass = response.data.result.roomClassName;
            _self.companySaleID = response.data.result.companyCreditCode;
          }
        });
    },
    // //上传文件
    // upfile: function(event) {
    // //   fileType();
    //   loading("上传中");
    //   sessionStorage.removeItem("cunnews");
    //   var _self = this;
    //   var file = document.getElementById(event.target.id).files;
    //   var zrid = document.getElementById(event.target.id).getAttribute("id");
    //   var url = "/api/sass_api/upload_file";
    //   var form = new FormData();
    //   var forimg = [];
    //   var forfile = [];
    //   for (var i = 0; i < file.length; i++) {
    //     form.append("file", file[i]);
    //     //读取图片数据
    //     var f = document.getElementById(event.target.id).files[i];
    //     var imgtype = f.type.split("/")[0];
    //     if (zrid == "file") {
    //       var reader = new FileReader();
    //       reader.onload = function(e) {
    //         var data = e.target.result;
    //         //加载图片获取图片真实宽度和高度
    //         var image = new Image();
    //         image.onload = function() {
    //           width = image.width;
    //           height = image.height;
    //         };
    //         image.src = data;
    //         forimg.push({
    //           src: image.src
    //         });
    //       };
    //       sessionStorage.setItem("cunnews", "1");
    //       reader.readAsDataURL(f);
    //     } else if (zrid == "files") {
    //       sessionStorage.setItem("cunnews", "2");
    //       var na = file[i].name;
    //       forfile.push({
    //         name: f.name
    //       });
    //       console.log(_self.fujians);
    //     }
    //   }
    //   _self.imgsrc = forimg;
    //   if (sessionStorage.getItem("cunnews") == 1) {
    //     form.append("type", "1");
    //   } else {
    //     form.append("type", "2");
    //   }
    //   form.append("module", "contractnote");
    //   form.append("userid", _self.userid);
    //   xhr = new XMLHttpRequest();
    //   xhr.open("post", url, true);
    //   xhr.onload = function(evt) {
    //     //请求完成
    //     layer.close(loading("上传中"));
    //   };
    //   xhr.onreadystatechange = function(evt) {
    //     if (xhr.readyState == 4 && xhr.status == 200) {
    //       console.log(xhr.responseText);
    //       var data = JSON.parse(evt.target.responseText);
    //       if (sessionStorage.getItem("cunnews") == 1) {
    //         _self.imgs = _self.imgs.concat(forimg);
    //         if (data.result.success.indexOf(",") == -1) {
    //           imgid.push(data.result.success);
    //         } else {
    //           imgid = imgid.concat(data.result.success.split(","));
    //         }

    //         //										imgid.push(data.result.success)
    //         console.log(imgid);
    //         _self.zrimg = imgid.toString().split(",");
    //       } else {
    //         if (data.result.success.indexOf(",") == -1) {
    //           fujianid.push(data.result.success);
    //         } else {
    //           fujianid = fujianid.concat(data.result.success.split(","));
    //         }

    //         //										fujianid.push(data.result.success)
    //         _self.fujians = _self.fujians.concat(forfile);
    //         _self.zrfujian = fujianid.toString().split(",");
    //         console.log(fujianid.toString());
    //       }
    //       ludan("上传成功", 1, 1);
    //     } else if (xhr.readyState == 4 && xhr.status == 500) {
    //       ludan("上传失败", 1, 1);
    //     }
    //   };
    //   xhr.onerror = function(evt) {
    //     //请求失败
    //     var data = JSON.parse(evt.target.responseText);
    //     ludan("请求失败", 1, 1);
    //     console.log("data");
    //   };
    //   xhr.send(form);
    // },
    //删除图片
    // moveimg: function(n) {
    //   var _self = this;
    //   this.$http
    //     .post(
    //         "/sass_api/delete_file?userId=userid&fileId=" +
    //         imgid[n - 1]
    //     )
    //     .then(function(response) {
    //       if (response.data.code == 0) {
    //         console.log(response.data);
    //         ludan("删除成功", 1, 2);
    //       }
    //     })
    //     .catch(function(error) {
    //       ludan(error, 1, 3);
    //     });
    //   imgid.splice(n - 1, 1);
    //   _self.imgs.splice(n - 1, 1);
    //   _self.zrimg.splice(n - 1, 1);
    // },
    //删除附件
    // movefj: function(n) {
    //   var _self = this;
    //   this.$http
    //     .post(
    //         "/sass_api/delete_file?userId=userid&fileId=" +
    //         fujianid[n - 1]
    //     )
    //     .then(function(response) {
    //       if (response.data.code == 0) {
    //         console.log(response.data);
    //         ludan("删除成功", 1, 2);
    //       }
    //     })
    //     .catch(function(error) {
    //       ludan(error, 1, 3);
    //     });
    //   fujianid.splice(n - 1, 1);
    //   _self.fujians.splice(n - 1, 1);
    //   //						console.log(n-1)
    //   _self.zrfujian.splice(n - 1, 1);
    //   console.log(_self.zrfujian);
    //   console.log(typeof JSON.stringify(_self.zrfujian));
    // },
    save: function(type) {
      var _self = this;
    //   ludan("保存中", 0, 1);
    tipApi.waring("保存中")


    
      //						if(_self.tijao != 1) {
      _self.tijao = 1;
      _self.getimgurl(0);
      //						} else {
      //							ludan("已保存", 2, 1)
      //						}
    },
    sends: function() {
      var _self = this;
    //   ludan("提交中", 0, 1);
      tipApi.waring("提交中")
      //						if(_self.baocun != 1) {
      _self.baocun = 1;
      _self.getimgurl(1);
      //						} else {
      //							ludan("已提交", 2, 1)
      //						}
    },
    //获取上传图片的url
    getimgurl: function(n) {
      var _self = this;
      _self.imgurl = [];
      console.log(_self.zrimg);
      if (_self.zrimg != "") {
        this.$http
          .post(
              "/sass_api/ get_uploadfile_info?fileIdStr=" +
              _self.zrimg
          )
          .then(function(response) {
            if (response.data.code == 200) {
              console.log(response.data.result);
              if (_self.tijao == 1 && _self.baocun != 1) {
                //保存不提交
                for (var i = 0; i < response.data.result.length; i++) {
                  _self.imgurl.push({
                    src: response.data.result[i].longurl
                  });
                }
                _self.savenews(n);
              } else if (_self.tijao != 1 && _self.baocun == 1) {
                //直接提交
                for (var i = 0; i < response.data.result.length; i++) {
                  _self.imgurl.push({
                    src: response.data.result[i].longurl
                  });
                }
                _self.savenews(n);
              } else if (_self.tijao == 1 && _self.baocun == 1) {
                //保存 再提交
                //										_self.sendtodo()
                _self.savenews(n);
              }
            }
          });
      } else {
        if (_self.tijao == 1 && _self.baocun != 1) {
          //保存不提交
          //									for(var i = 0; i < response.data.result.length; i++) {
          //										_self.imgurl.push({
          //											src: response.data.result[i].longurl
          //										})
          //
          //									}
          _self.savenews(n);
        } else if (_self.tijao != 1 && _self.baocun == 1) {
          //直接提交
          //									for(var i = 0; i < response.data.result.length; i++) {
          //										_self.imgurl.push({
          //											src: response.data.result[i].longurl
          //										})
          //
          //									}
          _self.savenews(n);
        } else if (_self.tijao == 1 && _self.baocun == 1) {
          //保存 再提交
          //								_self.sendtodo()
          _self.savenews(n);
        }
      }
    },
    savenews: function(n) {
      //获取数据
      var _self = this;
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
      //判断推送方向  _self.personAcceptID _self.personDistributeID
      //						if(userid!=_self.personAcceptID && userid!=_self.personDistributeID){
      //
      //						}
      //						imgid = _self.zrimg.length + _self.zrfujian.length
      //						if(_self.tuistatus == 1) {
      //
      //							_self.pa_cigid = _self.tuicfgid
      //							_self.pa_projectsn = _self.tuiprojectSn
      //							_self.pa_isroomid = _self.tuiroomid
      //							_self.pa_isroomname = _self.tuiroomname
      //							_self.pa_isRoomCreditCode = _self.tuicompanySaleID
      //							_self.pa_projectName = _self.tuiprojectName
      //							_self.currRoomImId = _self.tuicurrRoomImId
      //							_self.currRoomClassName = _self.tuicurRoomName
      //						}
      //						if(_self.chenk2 != 1) {
      //							_self.tuiroomimid = _self.starroomimid
      //						}
      //						alert(_self.boforeroomImId)
      if (_self.form.MissionStartDate == "") {
        _self.chengnuiriqi = null;
      } else {
        _self.chengnuiriqi =
          _self.form.MissionStartDate + " " + _self.nowtime;
      }
      // alert("_self.form.MissionStartDate", _self.form.MissionStartDate)
      var tablefields = {
        userName: _self.username,
        userID: _self.userid,

        personAccept: _self.personAccept,
        personAcceptID: _self.personAcceptID,
        personDistribute: _self.personDistribute,
        personDistributeID: _self.personDistributeID,
        companySaleName: _self.companySaleName,
        companySaleID: _self.companySaleID,
        companySaleRoomID: _self.companySaleRoomID,
        companyBuyName: _self.companyBuyName,
        companyBuyID: _self.companyBuyID,
        companyBuyRoomID: _self.companyBuyRoomID,

        dateShenqing: _self.shenqing + " " + _self.nowtime,
        projectName: _self.pa_projectName,
        projectSN: _self.pa_projectsn,
        type: _self.type,
        dateChengnuo: _self.chengnuiriqi,
        beizhu: _self.beizhuzhuan,
        confirmStatus: "", //确认状态
        confirmPersonName: "",
        confirmPersonID: ""
      };
      if (_self.id != "") {
        tablefields["id"] = _self.id;
      }
      //						alert(JSON.stringify(tablefields))
      if (n == 0) {
        //使用单据状态判断，无法满足需求。2018-5-21新增字段postType(提交保存状态)0=保存 1=提交
        //_self.confirm = '2';
        _self.postType = "0";
      } else {
        //_self.confirm = '0';
        _self.postType = "1";
      }
      var param = {
        table: {
          id: _self.pa_cigid,
          projectid: _self.pa_projectsn,
          roomid: _self.pa_isroomid,
          roomname: _self.pa_isroomname,
          userId: _self.userid
          //								uid:'10395'
        },
        //confirm: _self.confirm ,
        postType: _self.postType,
        ludancompanyName: _self.UserName,
        attachment: fjid + _self.attachmentIds,
        toroomimid: _self.bcnroomImId,
        //							gongsialllei: _self.nowCompany,
        currRoomImId: _self.Userroomimid,
        //							gongsialllei: _self.nowCompany,
        //							gongsialllei: _self.nowCompany,
        //							currRoomImId: _self.currRoomImId,
        curRoomName: _self.currRoomClassName,
        roomid: _self.pa_isroomid,
        toImid: _self.bcnroomImId,
        imgs: _self.imgurl,
        imgid: _self.zrimg,
        fujians: _self.fujians,
        fjid: _self.zrfujian,
        //				uid: "10395",
        tablefields: tablefields,
        subtablefields: [],
        createRoomId: this.$route.query.currRoomId
      };
      console.log(param);
      //						alert(JSON.stringify(param))
      this.$http
        .post( "/contract/save", param)
        .then(function(response) {
          if (response.data.code == 200) {
            _self.first = 1;
            _self.id = response.data.result.id;
            var succname = [];
            var faliename = [];
            if (n == 1) {
            //   layer.close(ludan("提交中", 0, 1));
            tipApi.close("waring")
              _self.sendtodo();
            } else {
            //   layer.close(ludan("保存中", 0, 1));
               tipApi.close("waring")
               tipApi.success("保存成功",2)
            //   ludan("保存成功", 2, 2);
            }
          } else {
              tipApi.failure("保存失败",2)
            // ludan("保存失败", 2, 1);
          }
        })
        .catch(function(error) {
        //   ludan(error, 2, 1);
          tipApi.waring(error,2)
        });
    },
    sendtodo: function() {
      var _self = this;
      var title;
      if (_self.type == "单方承诺") {
        title =
         _self.personAccept +
          "向" 
          _self.personDistribute +
          "的微承诺";
      } else {
        title =
          _self.personAccept+
          "与" +
          _self.personDistribute +
          "的双向承诺";
      }
      if (_self.roomType == "2") {
        _self.bcnroomImId += "," + this.$route.query.currRoomImId;
      }
      //						alert(_self.Userroomclass + "-" + _self.UserName)
      var todojson = {
        title: title,
        titileTwo: _self.Userroomclass + "-" + _self.UserName,
        content: "承诺日期=" + _self.shenqing,
        fileCount: "0",
        url:
          "/static/newwebstatic/chengnuo/transfer.html?id=" +
          _self.id,
        colorString: "",
        todoViewableMember: "0",
        toImId: _self.bcnroomImId,
        formuserid: _self.userid,
        currentRoomImid: _self.Userroomimid,
        chatType: "2",
        relation: _self.id,
        score: "", //评分待办必要参数，设置分数
        todoType: "3", //1评分待办，生成带有确认按钮待办，生成带有确认拒绝待办，必要参数
        setButton: [
          {
            type: 1, //按钮点击类型 1=请求url 2=打开url
            name: "确认",
            url:
              "/contract/do_todobtu?type=1&pingfen=0&docid=" +
              _self.id +
              "&projectSn=" +
              _self.pa_projectsn +
              "&userid=" +
              _self.userid
          },
          {
            type: 1, //按钮点击类型 1=请求url 2=打开url
            name: "退回",
            url:
              "/contract/do_todobtu?type=4&pingfen=0&docid=" +
              _self.id +
              "&projectSn=" +
              _self.pa_projectsn +
              "&userid=" +
              _self.userid
          }
        ]
      };
      window.appApi.sendTodo(todojson, function(d) {
        if (d.code == 200) {
          tipApi.success("提交成功",2)
          // ludan("提交成功", 2, 2, function() {
            window.appApi.closeNewWindow();
          // });
        } else {
          tipApi.failure(d,2)
        }
      });
    },
    //查询房间信息
    findRoomInfo: function(roomid) {
      var _self = this;
      var formdata = new FormData();
      formdata.append("roomId", roomid);
      this.$http
        .post( "/pcontact_api/findroominfo", formdata)
        .then(function(response) {
          if (response.data.code == 200) {
            var result = response.data.result;
            _self.roomType = result.roomType;
          }
        })
        .catch(function(error) {
          msg(error);
        });
    }
  }
};
</script>
<style scoped>
.mui-table-view-cell label{
    text-align: left
}
.title{
    text-align: left
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
.mui-action-back{
    float: left;
}
</style>
