<template>
    <div class="mui-fullscreen">
    
        <!-- 侧滑导航根容器 -->
    
        <div class="mui-off-canvas-wrap mui-draggable mui-slide-in ">
    
            <!-- 菜单容器 -->
    <!-- aside -->
            <div class="mui-right" :class="hetongmove ? 'move-left' : 'move-right'">
    
                <header class="mui-bar mui-bar-nav">
    
                    <h1 class="mui-title">选择合同</h1>
    
                </header>
    
                <div class="mui-scroll-wrapper" :class="tapyewu? 'listup':'listdown'">
    
                    <div class="mui-scroll">
    
                        <!-- 合同类别 -->
    
                        <ul class="mui-table-view eg-table-view category-table" style="margin-bottom: 0;">
    
                            <li class="mui-table-view-cell" v-for="(n,index) in hetongx" :key="index">
    
                                <a v-text="n.contractName" @click="hetongmore(n)"></a>
    
                            </li>
    
                        </ul>
    
                    </div>
    
                </div>
    <!-- aside -->
            </div>
    
            <!-- <div id="backdrop" class="mui-off-canvas-backdrop" @click="mask"></div> -->
             <div id="backdrop" class="mask" @click="mask" :class="hetongmove ? 'move-leftmask' : 'move-rightmask'"></div>
    
            <!-- 主页面容器 -->
    
    
    
            <div class="mui-inner-wrap">
    
                <!-- 主页面标题 -->
    
                <header class="mui-bar mui-bar-nav">
    
                    <h1 class="mui-title" ref='title_name'>收付款</h1>
    
                    <a class="mui-action-back mui-icon iconfont icon-back" style="display: none;" v-show="backicon!=0" @click="back"></a>
    
                </header>
    
                <div class="mui-content mui-scroll-wrapper">
     
                    <div class="mui-scroll mui-fullscreen" style="padding-top:44px">
    
                        <div v-if="backicon==0" class="step step1">
    
                            <ul class="mui-table-view eg-table-view">
    
                                <li class="mui-table-view-cell mui-input-row" >
                                    <label>日期</label>
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
                                    <!-- <input type="text" name="receiptDate" v-model="form.MissionStartDate" @click="selectDate" readonly="readonly" placeholder="请选择"> -->
    
                                </li>
    
                                <li class="mui-table-view-cell mui-input-row">
    
                                    <label>金额(元)</label>
    
                                    <input type="number" placeholder="选填" class="" name="companySaleName" v-model="jine" />
    
                                </li>
    
                                <li class="mui-table-view-cell mui-input-row">
    
                                    <a class="mui-navigate-right" href="#" @click="hetong">
    
                                        <label>合同名称</label>
    
                                        <input type="text" placeholder="必填" class="" name="contractName" v-model="htong" readonly="readonly" />
    
                                    </a>
    
                                </li>
    
                                <li class="mui-table-view-cell mui-input-row">
    
                                    <label>支出单位</label>
    
                                    <input type="text" placeholder="必填" class="" name="companyBuyName" v-model="companyBuyName" readonly="readonly" />
    
                                </li>
    
                                <li class="mui-table-view-cell mui-input-row">
    
                                    <label>收入单位</label>
    
                                    <input type="text" placeholder="必填" class="" name="companySaleName" v-model="companySaleName" readonly="readonly" />
    
                                </li>
    
    
    
                                <li class="mui-table-view-cell mui-input-row">
    
                                    <label>详细说明</label>
    
                                    <textarea class="m-block" rows="6" v-model="beiz" placeholder="请输入说明内容…"></textarea>
    
                                </li>
    
                            </ul>
    
    
    
                            <div class="btn-box">
    
                                <button class="mui-btn mui-btn-primary mui-btn-block" @click="jump5">下一步</button>
    
                            </div>
    
                        </div>
    
    
    
                        <!-- 第四步  -->
    
                        <div v-else-if="backicon==1">
    
                            <div class="step step3 ">
    
                                <div class="publish-container">
    
                                    <div class="title">图片</div>
    
                                    <ul class="container-average container-average-img">
    
                                        <li class="img-item" v-for="(img,number) in imgs" :key="number">
    
                                            <div class="img-item-inner">
    
                                                <img v-bind:src="img.src">
    
                                            </div>
    
                                            <span class="btn-roll btn-delete" @click="moveimg(number+1)"></span>
    
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
    
                                            <span class="btn-roll btn-delete" @click="movefj(number+1)"></span>
    
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
    
                                    <div class="mui-table-cell"><button type="button" class="mui-btn mui-btn-primary" @click="initData(1)">保&nbsp;&nbsp;存</button></div>
    
                                    <div class="mui-table-cell space"></div>
    
                                    <div class="mui-table-cell"><button type="button" class="mui-btn mui-btn-primary" @click="initData(2)">提&nbsp;&nbsp;交</button></div>
    
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
import mui from "../../../playform/mui.js";
import { BackCookie } from "../../../playform/common.js";
import setting from "../../../playform/config.js";
import danjuApi from "../js/danjuAPi.js";
import tipApi from "../js/tipApi.js";
// import { DatetimePicker } from "mint-ui";
// import { Toast } from "mint-ui";
export default {
  data() {
    return {
      // startDate: new Date("2014-1-1"),
      // endDate: new Date(),
      pickerVisible: new Date(),
      tijao:"", 
      baocun:"",
      danjuApi: danjuApi,
      tipApi: tipApi,
      id: "",
      zrimg: [],
      zrfujian: [],
      backicon: 0,
      tapyewu: false,

      // urlnews: urlnews,

      cfgid: this.$route.query.cfgid,

      projectSn: this.$route.query.projectSn,

      isRoomId: this.$route.query.isRoomId,

      isRoomName: this.$route.query.isRoomName,

      currRoomName: this.$route.query.currRoomName,

      currRoomImId: this.$route.query.currRoomImId,

      currRoomClassName: this.$route.query.currRoomClassName,

      projectName: this.$route.query.projectName,

      // nes: neshref,

      toImId: [],

      sites: [],

      pinpai: "",

      mingcheng: "",

      form: {
        // 开工日期

        MissionStartDate: ""
      },

      hetongx: [],

      //合同信息

      htong: "",

      contractID: "",

      contractType: "",

      companyBuyName: "",

      companyBuyID: "",

      companyBuyRoomID: "",

      companyBuyRoomImID: "",

      companySaleName: "",

      companySaleID: "",

      companySaleRoomID: "",

      companySaleRoomImID: "",

      dateShenqing: "",

      jine: "0",

      beiz: "",

      imgs: [],

      nowtime: "",

      fujians: [],

      attachmentIds: "",

      confirm: "",

      postType: "",

      userid: setting.getCookie("userid"),

      username: setting.getCookie("username"),

      urlnews: location.href.split("?")[1],

      imgid: [], //全局变量获取attachment

      fujianid: [], //全局变量获取attachment

      opt: {
        type: "date",

        beginYear: 2000,

        endYear: new Date().getFullYear() + 10
      },
      hetongmove: false
    };
  },

  mounted() {
    //   muiPicker
    // mui.init();
    // muiPicker.init(window.mui || window, window, document, void 0)
    // muiPicker.popPickerfun(mui, document)
    // muiPicker.dtPickerfun(mui, document)

    // mui('.mui-scroll-wrapper').scroll({

    //     deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006

    // });

    document.getElementById("backdrop").addEventListener("click", function() {
      //阻止默认事件
      // event.detail.gesture.preventDefault();
      // 移除手势滑动
      //						mui('.mui-off-canvas-wrap').offCanvas().close()
    });

    //主界面容器

    // document.getElementsByClassName('mui-inner-wrap')[0].addEventListener('drag', function(event) {

    //     event.stopPropagation();

    // });

    window.addEventListener(
      "touchmove",
      function(e) {
        var target = e.target;

        if (target && target.tagName === "TEXTAREA") {
          //textarea阻止冒泡

          e.stopPropagation();
        }
      },
      true
    );
  },

  created() {
    danjuApi.vue = this;
    danjuApi.initVue()
    // muiPicker.init(window.mui || window, window, document, void 0)
    // muiPicker.popPickerfun(mui, document)
    // muiPicker.dtPickerfun(mui, document)
    // tipApi.load("加载中")
    //   tipApi.load("加载中")
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

    if (mouth < 10) {
      mouth = "0" + mouth;
    }

    if (day < 10) {
      day = "0" + day;
    }

    _self.nowtime = nowshi + ":" + noefen + ":" + nowmiao;

    var printTime = year + "-" + mouth + "-" + day;

    _self.form.MissionStartDate = formDate(printTime);

    _self.dateShenqing = formDate(printTime);

    //获取合同

    if (this.$route.query.id != undefined) {
      this.starinfo();
    } else {
      _self.getHt();
    }
  },
  methods: {
    //获取退回的数据
    starinfo: function() {
      var _self = this;
      var param = {
        id: paramMap.id
      };
      this.$http.post("/contract/get_content", param).then(function(response) {
        if (response.data.code == 200) {
          var norl = JSON.parse(response.data.result.noralJson);
          var cont = JSON.parse(response.data.result.contentJson);
          var data = response.data.result;
          //页面上显示信息
          _self.form.MissionStartDate = norl.tablefields.dateFasheng.split(
            " "
          )[0];
          _self.jine = norl.tablefields.money;
          _self.htong = norl.tablefields.contractName;
          _self.companyBuyName = norl.tablefields.companyBuyName;
          _self.companySaleName = norl.tablefields.companySaleName;
          _self.beiz = norl.tablefields.beizhu;
          //附件
          _self.imgsrc(norl.attachment);
          //提交信息
          _self.id = paramMap.id;
          _self.cfgid = norl.table.id;
          _self.projectSn = norl.table.projectid;
          _self.isRoomId = norl.table.roomid;
          _self.isRoomName = norl.table.roomname;

          _self.currRoomImId = norl.currRoomImId;
          _self.currRoomClassName = norl.currRoomClassName;
          _self.currRoomName = norl.curRoomName;
          _self.toImId.push(norl.toImid);

          _self.fapiaoTaxLv = norl.tablefields.fapiaoTaxLv;
          _self.piao = norl.tablefields.fapiaoTitle;
          _self.projectName = norl.tablefields.projectName;
          _self.companyBuyID = norl.tablefields.companyBuyID;
          _self.companyBuyRoomID = norl.tablefields.companyBuyRoomID;
          _self.companySaleID = norl.tablefields.companySaleID;
          _self.companySaleRoomID = norl.tablefields.companySaleRoomID;
          _self.contractType = norl.tablefields.contractType;
          (_self.contractID = norl.tablefields.contractID), _self.getHt();
        }
      });
    },
    imgsrc: function(n) {
      var _self = this;
      this.$http
        .post("/sass_api/ get_uploadfile_info?fileIdStr=" + n)
        .then(function(response) {
          if (response.data.code == 200) {
            for (var i = 0; i < response.data.result.length; i++) {
              if (response.data.result[i].type == 1) {
                //imgs fujians name
                _self.imgs.push({
                  src: response.data.result[i].longurl
                });
                _self.imgid.push(response.data.result[i].id);
              } else {
                _self.fujians.push({
                  name: response.data.result[i].filename,
                  fileid: response.data.result[i].id
                });
                _self.fujianid.push(response.data.result[i].id);
              }
            }
          }
        });
    },
    /**
     * 上一步事件
     */
    back: function() {
      var _self = this;
      if (_self.backicon == 1) {
        appApi.showBack();
      }
      if (_self.backicon > 0) {
        _self.backicon = _self.backicon - 1;
      }
    },
    selectDate: function(t) {
      // muiPicker.aa(window.mui || window, window, document, void 0)
      // muiPicker.bb(mui, document)
      // muiPicker.cc(mui, document)
      var _self = this;
      //   alert(148)
      //   var dtpicker = new mui.DtPicker({
      //   	type: "date", //设置日历初始视图模式
      //   	// beginDate: new Date(2015,04,25), //设置开始日期
      //   	// endDate: new Date(2016,04,25), //设置结束日期
      //   	labels: ['年', '月', '日'], //设置默认标签区域提示语
      //   })
      // //   muiPicker.bb(mui, document).mui.PopPicker._createPicker()
      // console.log(dtpicker)
      // // muiPicker.cc(mui, document).
      //  dtpicker.show(function(e) {
      //   	_self.form.MissionStartDate = e.value
      //   	muiPicker.dispose()
      //   })
    },
    initData: function(type) {
      if(type==1){
        this.tijao = 1
      }else{
        this.baocun = 1
      }
       danjuApi.getimgurl(type)
    },
    // initData: function(type) {
    //   //获取数据
    //   var _self = this;

    //   if (type == 1) {
    //     // ludan("保存中", 0, 1)
    //     var save = layer.open({
    //       type: 2,
    //       title: "保存中",
    //       content: ""
    //     });
    //   } else {
    //     // ludan("提交中", 0, 1)
    //     var push = layer.open({
    //       type: 2,
    //       title: "提交中",
    //       content: ""
    //     });
    //   }
    //   var fjid;
    //   if (_self.attachmentIds == "") {
    //     _self.attachmentIds = "";
    //   } else {
    //     _self.attachmentIds = "," + _self.attachmentIds;
    //   }
    //   console.log("imgid", _self.imgid);
    //   console.log("fujianid", _self.fujianid);
    //   var imgId = [];
    //   var fjId = [];
    //   for (var i = 0; i < _self.imgid.length; i++) {
    //     imgId.push(_self.imgid[i].fileId);
    //   }
    //   for (var i = 0; i < _self.fujianid.length; i++) {
    //     fjId.push(_self.fujianid[i].fileId);
    //   }
    //   if (imgId.toString() == "") {
    //     fjid = fjId.toString();
    //   } else if (fjId.toString() == "") {
    //     fjid = imgId.toString();
    //   } else {
    //     fjid = imgId.toString() + "," + fjId.toString();
    //   }
    //   //						var id="5a6ecbda70474ea263ddfbb5";
    //   //						var uid='10392';
    //   if (_self.jine == "") {
    //     _self.jine = 0;
    //   }
    //   var tablefield = {
    //     userName: _self.username,
    //     userID: _self.userid,
    //     dateShenqing: _self.dateShenqing + " 00:00:00",
    //     projectName: _self.projectName,
    //     projectSN: _self.projectSn,
    //     contractName: _self.htong,
    //     contractType: _self.contractType,
    //     companySaleName: _self.companySaleName,
    //     companySaleID: _self.companySaleID,
    //     companySaleRoomID: _self.companySaleRoomID,
    //     companyBuyName: _self.companyBuyName,
    //     companyBuyID: _self.companyBuyID,
    //     companyBuyRoomID: _self.companyBuyRoomID,
    //     money: parseFloat(_self.jine),
    //     htTotal: _self.jine,
    //     fapiaoTitle: _self.piao,
    //     fapiaoTaxLv: _self.fapiaoTaxLv,
    //     dateFasheng: _self.form.MissionStartDate + " " + _self.nowtime,
    //     beizhu: _self.beiz,
    //     confirmStatus: "",
    //     confirmPersonName: "",
    //     confirmPersonID: "",
    //     contractType: _self.contractType,
    //     contractID: _self.contractID
    //   };
    //   if (_self.id != "") {
    //     tablefield["id"] = _self.id;
    //   }
    //   if (type == 2) {
    //     _self.confirm = "1";
    //     _self.postType = "1";
    //   } else {
    //     _self.confirm = "0";
    //   }
    //   console.log(
    //     JSON.stringify(fjid) +
    //       "//////////" +
    //       JSON.stringify(_self.attachmentIds)
    //   );
    //   var param = {
    //     table: {
    //       id: _self.cfgid,
    //       projectid: _self.projectSn,
    //       roomid: _self.isRoomId,
    //       roomname: _self.isRoomName
    //     },
    //     confirm: _self.confirm,
    //     postType: _self.postType,
    //     attachment: fjid + _self.attachmentIds,
    //     toroomimid: _self.toImId.toString(),
    //     currRoomImId: _self.currRoomImId,
    //     currRoomClassName: _self.currRoomClassName,
    //     curRoomName: _self.currRoomName,
    //     toImid: _self.toImId.toString(),
    //     tablefields: tablefield,
    //     subtablefields: []
    //   };
    //   //alert(JSON.stringify(param))
    //   this.$http.post("/contract/save", param).then(function(response) {
    //     //alert(JSON.stringify(response));
    //     if (response.data.code == 200) {
    //       _self.id = response.data.result.id;
    //       _self.sites = response.data.result.tablefields;
    //       var titletype = encodeURIComponent(encodeURIComponent("收付款"));
    //       var title = encodeURIComponent(encodeURIComponent(_self.username));
    //       // alert("保存成功")
    //       var todojson = {
    //         title: decodeURI(_self.username) + "的收付款",
    //         titileTwo: _self.currRoomClassName + "-" + _self.currRoomName,
    //         content:
    //           "名称=" +
    //           _self.htong +
    //           //											"|日期=" +
    //           //											_self.form.MissionStartDate +
    //           "|金额=" +
    //           _self.jine +
    //           "元",
    //         fileCount: "0",
    //         url:
    //           "/static/newwebstatic/shoufukuan/transfer.html?id=" +
    //           response.data.result.id,
    //         colorString: "",
    //         todoViewableMember: "0",
    //         toImId: _self.toImId.toString(),
    //         formuserid: _self.userid,
    //         currentRoomImid: _self.currRoomImId,
    //         chatType: "2",
    //         relation: response.data.result.id,
    //         //"score" : "", //评分待办必要参数，设置分数
    //         //"confirmUrl" : "456", //有确认按钮必要参数
    //         //"refusedUrl" : "231", //有拒绝按钮必要参数
    //         todoType: "3", //1评分待办，生成带有确认按钮待办，生成带有确认拒绝待办，必要参数
    //         setButton: [
    //           {
    //             type: 1, //按钮点击类型 1=请求url 2=打开url
    //             name: "确认",
    //             url:
    //               "/contract/do_todobtu?type=1&pingfen=0&docid=" +
    //               _self.id +
    //               "&projectSn=" +
    //               _self.projectSn +
    //               "&userid=" +
    //               _self.userid +
    //               "&sendtype=1"
    //           },
    //           {
    //             type: 1, //按钮点击类型 1=请求url 2=打开url
    //             name: "退回",
    //             url:
    //               "/contract/do_todobtu?type=4&pingfen=0&docid=" +
    //               _self.id +
    //               "&projectSn=" +
    //               _self.projectSn +
    //               "&userid=" +
    //               _self.userid +
    //               "&title=" +
    //               title +
    //               "&titletype=" +
    //               titletype +
    //               "&sendtype=1"
    //           }
    //         ]
    //       };
    //       // alert(JSON.stringify(todojson))
    //       // alert(type)
    //       if (type == 2) {
    //         layer.close(push);
    //         appApi.sendTodo(todojson, function(d) {
    //           // alert(JSON.stringify(d))
    //           if (d.code == 200) {
    //             // ludan("提交成功", 3, 2, function() {
    //             //     appApi.refreshData(2);
    //             // 	/*window.appApi.closeNewWindow()*/
    //             // })
    //             layer.open({
    //               time: 2,
    //               type: 1,
    //               title: "提交成功",
    //               content: "",
    //               end: function() {
    //                 appApi.refreshData(2);
    //               }
    //             });
    //           }
    //         });
    //       } else {
    //         layer.close(save);
    //         layer.open({
    //           type: 1,
    //           time: 2,
    //           title: "保存成功",
    //           content: ""
    //         });
    //         // ludan("保存成功", 3, 2)
    //       }
    //     } else {
    //       //							msg("获取云盘目录信息失败")
    //     }
    //   });
    // },
    //点击遮罩层
    mask: function() {
      this.hetongmove = false;
      // mui('.mui-off-canvas-wrap').offCanvas().close()
    },
    /**
     * 获取合同
     */
    getHt: function() {
      var _self = this;
      this.$http
        .post(
          "/chart/column/table_w_contract?used=getContract&projectSN=58096389-d6bf-487d-8d5c-fb90d0404be8"
        )
        .then(function(response) {
          if (response.data.code == 200) {
            _self.hetongx = response.data.result;
          } else {
            //							msg("获取云盘目录信息失败")
          }
        });
    },
    hetong: function() {
      var _self = this;
      // mui('.mui-off-canvas-wrap').offCanvas().show()
      this.hetongmove = !this.hetongmove;
      // document.getElementsByClassName("mui-right")[0].className ="mui-right move-left"
    },
    moveimg: function(n) {
      var _self = this;
      console.log(_self.zrimg);
      this.$http
        .post(
          "/sass_api/delete_file?userId=userid&fileId=" +
            _self.zrimg[n - 1].fileId
        )
        .then(function(response) {
          if (response.data.code == 0) {
            // ludan("删除成功", 1, 2)
            layer.open({
              time: 1,
              type: 1,
              title: "删除成功",
              content: ""
            });
          }
        })
        .catch(function(error) {
          // ludan(error, 1, 3);
          layer.open({
            time: 2,
            type: 1,
            title: error,
            content: ""
          });
        });
      this.imgid.splice(n - 1, 1);
      _self.imgs.splice(n - 1, 1);
      _self.zrimg.splice(n - 1, 1);
      //						imgid.remove(n-1)
    },
    movefj: function(n) {
      var _self = this;
      console.log(_self.zrfujian);
      console.log(n);
      this.$http
        .post(
          "/sass_api/delete_file?userId=userid&fileId=" +
            _self.zrfujian[n - 1].fileId
        )
        .then(function(response) {
          if (response.data.code == 0) {
            // ludan("删除成功", 1, 2)
            layer.open({
              time: 1,
              type: 1,
              title: "删除成功",
              content: ""
            });
            _self.fujianid.splice(n - 1, 1);
            _self.fujians.splice(n - 1, 1);
            _self.zrfujian.splice(n - 1, 1);
          }
        })
        .catch(function(error) {
          // ludan(error, 1, 3);
          var error = error;
          layer.open({
            time: 2,
            type: 1,
            title: error,
            content: ""
          });
        });
      // this.fujianid.splice(n - 1, 1)
      // _self.fujians.splice(n - 1, 1)
      // _self.zrfujian.splice(n - 1, 1)
      //						imgid.remove(n-1)
    },
    hetongmore: function(event) {
      var _self = this;
      this.hetongmove = false;
      _self.htong = event.contractName;
      _self.contractType = event.contractType;
      _self.companyBuyName = event.companyBuyName;
      _self.companyBuyID = event.companyBuyID;
      _self.companyBuyRoomID = event.companyBuyRoomID;
      _self.companyBuyRoomImID = event.companyBuyRoomImID;
      _self.companySaleName = event.companySaleName;
      _self.companySaleID = event.companySaleID;

      _self.contractID = event.contractID;
      _self.companySaleRoomID = event.companySaleRoomID;
      _self.companySaleRoomImID = event.companySaleRoomImID;
      _self.contractID = event.contractID;
      _self.piao = event.fapiaoTitle;
      _self.fapiaoTaxLv = event.fapiaoTaxLv;
      if (_self.companySaleRoomImID != _self.currRoomImId) {
        _self.toImId.push(_self.companySaleRoomImID);
      }
      if (_self.companyBuyRoomImID != _self.currRoomImId) {
        _self.toImId.push(_self.companyBuyRoomImID);
      }
      _self.mask();
    },
    jump5: function() {
      tipApi.close("load");
      var _self = this;
      if (_self.htong == "") {
        layer.open({
          content: "请选择合同",
          skin: "msg",
          time: 2 //2秒后自动关闭
        });
        // ludan("请选择合同", 2, 1)
      } else {
        appApi.hideBack();
        _self.backicon = 1;
      }
    },
    jump1: function() {
      $(".section1").css("display", "block");
      $(".section1")
        .siblings("section")
        .css("display", "none");
    },
    //上传文件
    upfile: function(event) {
      // loading("上传中")
      var load = layer.open({
        type: 2,
        title: "上传中"
      });
      sessionStorage.removeItem("cunnews");
      var _self = this;
      var file = document.getElementById(event.target.id).files;
      var zrid = document.getElementById(event.target.id).getAttribute("id");
      var url = "/api/sass_api/upload_file";
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
              var width = image.width;
              var height = image.height;
            };
            image.src = data;
            //									_self.imgs.push({
            //										src: image.src
            //									})
            forimg.push({
              src: image.src
            });
          };
          sessionStorage.setItem("cunnews", "1");
          reader.readAsDataURL(f);
        } else if (zrid == "files") {
          sessionStorage.setItem("cunnews", "2");
          var na = file[i].name;
          //								_self.fujians.push({
          //									name: f.name
          //								})
          forfile.push({
            name: f.name
          });
        }
        //							reader.readAsDataURL(f);
      }
      if (sessionStorage.getItem("cunnews") == 1) {
        form.append("type", "1");
      } else {
        form.append("type", "2");
      }
      form.append("module", "contractnote");
      form.append("userid", this.userid);
      var xhr = new XMLHttpRequest();
      xhr.open("post", url, true);
      xhr.onload = function(evt) {
        //请求完成
        //							var data = JSON.parse(evt.target.responseText);
        //							if(sessionStorage.getItem("cunnews") == 1) {
        //								imgid.push(data.result.success)
        //								_self.zrimg = imgid.toString().split(',')
        //							} else {
        //								fujianid.push(data.result.success)
        //								_self.zrfujian = fujianid.toString().split(',')
        //							}
      };
      xhr.onreadystatechange = function(evt) {
        if (xhr.readyState == 4 && xhr.status == 200) {
          var data = JSON.parse(evt.target.responseText);
          if (sessionStorage.getItem("cunnews") == 1) {
            _self.imgs = _self.imgs.concat(forimg);
            if (data.result.success.indexOf(",") == -1) {
              // console.log("?????"+JSON.stringify(data.result.success))
              // _self.imgid.push(data.result.success)
              _self.imgid = _self.imgid.concat(data.result.success);
            } else {
              _self.imgid = _self.imgid.concat(data.result.success.split(","));
            }
            //										imgid.push(data.result.success)
            // _self.zrimg = _self.imgid.toString().split(',')
            _self.zrimg = _self.imgid;
            console.log(JSON.stringify(_self.imgid) + "......" + _self.zrimg);
          } else {
            if (data.result.success.indexOf(",") == -1) {
              // _self.fujianid.push(data.result.success)
              _self.fujianid = _self.fujianid.concat(data.result.success);
            } else {
              _self.fujianid = _self.fujianid.concat(
                data.result.success.split(",")
              );
            }
            //										fujianid.push(data.result.success)
            _self.fujians = _self.fujians.concat(forfile);

            // _self.zrfujian = _self.fujianid.toString().split(',')
            _self.zrfujian = _self.fujianid;
            // console.log(_self.zrfujian)
          }
          // ludan("上传成功", 1, 2)
          layer.close(load);
          layer.open({
            time: 1,
            type: 1,
            title: "上传成功",
            content: ""
          });
        } else if (xhr.readyState == 4 && xhr.status == 500) {
          layer.open({
            time: 2,
            type: 1,
            title: "上传失败",
            content: ""
          });
        }
      };
      xhr.onerror = function(evt) {
        layer.open({
          time: 2,
          type: 2,
          title: "请求失败",
          content: ""
        });
        //请求失败
        var data = JSON.parse(evt.target.responseText);
      };
      xhr.send(form);
    }
  }
};
</script>

<style>
@import "../../../assets/css/common/mint";
body {
  background: #efeff4;
}

.mui-off-canvas-right {
  background: #fff;
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

/*.mui-scroll-wrapper{
    
    				margin-top: 44px;
    
    			}*/

.listdown {
  background: #fff;
}
.add-contain {
  opacity: 0;
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

.yewuup {
  z-index: 998;

  animation: yewuup 0.1s, 100ms ease;

  animation-fill-mode: forwards;
}

@keyframes yewuup {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.yewudown {
  z-index: 998;

  animation: yewudown 0.6s, 100ms ease;

  animation-fill-mode: forwards;
}

@keyframes yewudown {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
.mui-table-view-cell label,
.singlebox label,
.publish-container .title {
  text-align: left;
}
.mui-bar-nav.mui-bar .mui-icon {
  position: absolute;
  left: 0;
}
.mui-right {
  height: 100%;
  width: 70%;
  position: absolute;
  z-index: 9;
  opacity: 1;
  transform: translate3d(143%, 0, 0);
}
.mui-scroll-wrapper {
  overflow: scroll;
}
.move-left {
  transform: translate3d(43%, 0, 0);
  transition: all 0.75s;
}
.move-right {
  transform: translate3d(143%, 0, 0);
  transition: all 0.75s;
}
.move-leftmask {
  opacity: 0.6;
  display: block;
  z-index: 8;
}
.move-rightmask {
  opacity: 0;
  display: none;
  z-index: 8;
}
.step .container-file .oa-contact-avatar .my-list-icon {
  height: 36px;
  width: 36px;
  border-radius: 0;
  background: url(/static/img/file-type.b8a75d3.png) no-repeat;
  background-size: 100%;
}
</style>
