<template>
    <div>
		<header class="mui-bar mui-bar-nav">
			<h1 class="mui-title" v-text="title"></h1>
			<!--<button id="btn-referrer" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left hide">-->
				<a  class="mui-action-back mui-icon iconfont icon-back" @click="danjuApi.goBack" ></a>
			<!--</button>-->
			<!--<div class=" mui-pull-right make">确认</div>-->
		</header>
		<section class="mui-content section1" >
			<ul class="mui-table-view invita-list">
				<li class="mui-table-view-cell ">
					<div class="mui-input-row" style="margin: 10px 5px;">
						<textarea id="textarea" rows="6" placeholder="请输入..." v-model="input1"></textarea>
					</div>
				</li>
			</ul>
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
								<div class="img-item-inner mui-icon mui-icon-plusempty"><input type="file" accept="image/*" class="upimg" id="file" v-on:change="upfile" multiple="multiple" /></div>
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
								<div class="img-item-inner mui-icon mui-icon-plusempty"><input type="file" class="upfile" id="files" v-on:change="upfile" multiple="multiple" /></div>
							</li>
						</ul>
					</div>
				</div>
			<div class="mask mui-fullscreen" @click="masktishi"></div>
			<footer class="mui-bar mui-bar-tab">
			<button type="button" class="mui-btn mui-btn-primary mui-btn-block make" @click="sendbtn">确认</button>
		</footer>
		</section>
</div>
</template>
<script>
import setting from "../../../playform/config.js";
import danjuApi from "../js/danjuAPi.js";
import tipApi from '../../../playform/tipApi.js';
export default {
  data() {
    return {
      userid: setting.getCookie("userid"),
      username: setting.getCookie("username"),
      danjuApi: danjuApi,
      imgid: [],
      fujianid: [],
      todojsoan: "",
      //					sites: [],
      //					pinpai: '',
      //					mingcheng: "",
      typ: this.$route.query.typ,
      input1: "",
      // urlcan:urlcan,
      // nes:nes,
      imgs: [],
      fujians: [],
      zrimg: [],
      zrfujian: [],
      printTime: "",
      closewindow: "",
      cunnews: "",
      input11: "",
      ceshi: "",
      todo_title:"",
      url:"",
      title:''
    };
  },
  created: function() {
    var _self = this;
    danjuApi.vue = this;
    danjuApi.initVue()
    appApi.hideBack();
    this.sort()
    // console.log(_self.test_danju("shoufukuans"))
    //					this.initData();
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
    if (nowshi < 10) {
      nowshi = "0" + nowshi;
    }
    if (noefen < 10) {
      noefen = "0" + noefen;
    }
    if (nowmiao < 10) {
      nowmiao = "0" + nowmiao;
    }
    _self.nowtime = nowshi + ":" + noefen + ":" + nowmiao;
    _self.printTime = year + "-" + mouth + "-" + day;

    //获取参数
  },
  // 在 `methods` 对象中定义方法
  methods: {
    test_danju:function(n){
      var patt1 = new RegExp(n);
      return patt1.test(window.location.href)
    },
    sort:function(){
      var _self=this
      if(_self.test_danju("lianxi")){
        _self.todo_title="收发件退回:" + _self.$route.query.title
        _self.url="lianxi"
        _self.title="收发件"
      }else if(_self.test_danju("shoufukuan")){
        _self.todo_title="收付款退回:" + _self.$route.query.title + "的收付款",
        _self.url="shoufukuan"
        _self.title="收付款"
      }else if(_self.test_danju("chengnuo")){
        _self.todo_title="微承诺退回:" + _self.$route.query.title + "的微承诺",
        _self.url="chengnuo"
        _self.title="微承诺"
      }else if(_self.test_danju("shouhuo")){
        _self.todo_title="收货退回:"+_self.$route.query.title+"的收货",
        _self.url="shouhuo"
        _self.title="收货"
      }else if(_self.test_danju("gongdan")){
        _self.todo_title="工单退回:"+_self.$route.query.title+"的工单",
        _self.url="gongdan"
        _self.title="工单"
      }else if(_self.test_danju("laowu")){
         _self.todo_title="报量退回:" + _self.$route.query.title+"的报量",
        _self.url="laowu"
        _self.title="报量"
      }


    },
    masktishi: function() {
      tipApi.waring("数据提交中，请勿重复点击",1);
    },
    mask: function() {
      $(".mask").css({ display: "block", opacity: "0.6" });
    },
    sendbtn: function() {
      var _self = this;
      _self.closewindow = 1;
      _self.mask();
      _self.initData();
    },
    initData: function() {
      //						 this.$options.methods.upfile(event)
      //获取数据
      var _self = this;

        console.log(_self.zrfujian)



      //						var fjid = imgid.toString()
      //换行符转换
      _self.input11 = _self.input1.replace(/[\r\n]/g, "<br/>");
      var fjid;
      if (_self.zrimg.toString() == "") {
        fjid = _self.zrfujian.toString();
      } else if (_self.zrfujian.toString() == "") {
        fjid = _self.zrimg.toString();
      } else {
        fjid = _self.zrimg.toString() + "," + _self.zrfujian.toString();
      }
      var param = {
        attachment: fjid,
        content: _self.input11,
        type: _self.typ,
        uid: _self.userid,
        docid: _self.$route.query.id,
        roomid: _self.$route.query.roomid,
        roomname: _self.$route.query.roomname,
        projectid: _self.$route.query.projectid,
        score: ""
      };
      //						alert(JSON.stringify(param))
      console.log(param);
      //						alert(JSON.stringify(param))
      //						alert(fjid+"/"+_self.input1+"/"+typ+"/"+_self.userid+"/"+ this.$route.query.wendangid+"/"+this.$route.query.roomId+"/"+this.$route.query.roomName+"/"+this.$route.query.projectSn)
      this.$http.post("/contract/save_note", param).then(function(response) {
        if (response.data.code == 200) {
          console.log(response.data);
          if (_self.typ == 4) {
            var todojson = {
              //											"title": decodeURI(username) + "退回的收付款",
              title: "收付款退回:" + _self.$route.query.title + "的收付款",
              titileTwo:
                _self.$route.query.roomclass + "-" + _self.$route.query.roomname,
              content:
                "类别=" + _self.$route.query.leibie + "|日期=" + _self.printTime,
              //											"fileCount": imgid.length+fujianid.length,
              fileCount: 0,
              url:
                "/static/newwebstatic/"+_self.url+"/transfer.html?id=" +
                _self.$route.query.id,
              colorString: "",
              todoViewableMember: "0",
              toImId: _self.$route.query.formroomimid,
              //										"toImId":'43371363106817',
              "form_self.userid": _self.userid,
              currentRoomImid: _self.$route.query.nowroomImId,
              chatType: "2",
              relation: _self.$route.query.id,
              score: "", //评分待办必要参数，设置分数
              //										"confirmUrl": "456", //有确认按钮必要参数
              //										"refusedUrl": "231", //有拒绝按钮必要参数
              todoType: "3", //1评分待办，生成带有确认按钮待办，生成带有确认拒绝待办，必要参数
              setButton: [
                {
                  type: 1, //按钮点击类型 1=请求url 2=打开url
                  name: "确认",
                  url:
                    "/contract/do_todobtu?type=4&pingfen=0&docid=" +
                    _self.$route.query.id +
                    "&projectSn=" +
                    _self.$route.query.projectSn +
                    "&_self.userid=" +
                    _self.userid
                },
                {
                  type: 1, //按钮点击类型 1=请求url 2=打开url
                  name: "退回",
                  url:
                    "/contract/do_todobtu?type=4&pingfen=0&docid=" +
                    _self.$route.query.id +
                    "&projectSn=" +
                    _self.$route.query.projectSn +
                    "&_self.userid=" +
                    _self.userid
                }
              ]
            };
            //
            // _self.todojsoan = JSON.stringify(todojson);
            window.appApi.sendTodo(todojson, function(d) {
              if (d.code == 200) {
                tipApi.success('退回成功',2,function(){
                    $(".mask").css({"display":"none","opacity":"0.6"})
                    window.appApi.openChat(
                      _self.$route.query.nowroomImId,
                      "",
                      _self.$route.query.roomname,
                      2
                    );
                })
              }
            });
          } else if (_self.typ == 1) {
            var parm = {
              toImId: _self.$route.query.formroomimid,
              chatType: "2",
              toNickName: "",
              toAvatarUrl: "",
              //														myExtType: 'notify_type',
              content:
                _self.$route.query.roomname +
                "已确认" +
                _self.$route.query.fromRoomName +
                "的收付款"
            };
            appApi.sendNotifyMsg(parm);
            tipApi.success("确认成功",2,function(){
                appApi.refreshData(2);
                _self.$router.go(-1)
            })
          } else if (_self.typ == 3) {
            // ludan("评论成功",2,2,function(){
            // 	$(".mask").css({"display":"none","opacity":"0.6"})
            // 	window.appApi.openChat(_self.$route.query.nowroomImId, "", _self.$route.query.roomname, 2)
            // })
            tipApi.success("评论成功",2,function(){
              _self.$router.go(-1)
            })
          }
        } else {
          //							msg("获取云盘目录信息失败")
        }
      });
    },
    //上传文件

    upfile: function(event) {
      danjuApi.upfile(event);

    },
  }
};
</script>
<style type="text/css" scoped>
.mui-action-back {
  float: left;
}
textarea {
  border: 0;
}
.mui-table-view-cell {
  margin-bottom: 10px;
}
.title {
  text-align: left;
}
.mui-bar-tab {
  width: 96%;
  margin-left: 2%;
  bottom: 10px;
}
.mui-bar .mui-btn-primary {
  height: 50px;
  width: 100%;
  top: 0;
}
.container-average.container-average-img {
  padding-bottom: 10px;
}
.mui-content {
  padding-bottom: 60px;
}
.container-average .img-item .img-item-inner,
.publish-container .upload-btn .img-item-inner {
  bottom: 0;
  top: 10px;
}
.publish-container .container-average .img-item .btn-roll {
  right: 0;
}
</style>
