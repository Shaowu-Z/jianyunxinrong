<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title">群聊信息</h1>
        </header>
        <section class="mui-content">
            <div id="app">
            <div class="show-contain">
                <div class="show-item">
                    <dl class="item">
                        <dt class="label">群聊主题</dt>
                        <dd class="con" v-text="form.meeting.mmain"></dd>
                    </dl>
                    <dl class="item">
                        <dt class="label">发起人</dt>
                        <dd class="con" v-text="form.meeting.mcreateUserName"></dd>
                    </dl>
                    <dl class="item">
                        <dt class="label">发起时间</dt>
                        <dd class="con"><span v-text="form.meeting.mcreateDate"></span>&nbsp;&nbsp;</dd>
                    </dl>
                    <dl class="item" v-if="form.jiyaoStatus=='0'">
                        <dt class="label">群聊结果</dt>
                        <dd class="con" @click="createMeetingHuiyi()"><a class="link-txt"><span class="mui-icon iconfont icon-edit2"></span>编写纪要</a></dd>
                    </dl>
                    <dl class="item publish-container">
                        <dt class="label">群聊人员</dt>
                        <dd class="con">
                            <ul class="mui-table-view mui-table-view-striped container-average">
                                <li class="mui-table-view-cell" v-for="(member,index) in form.roomMember" :key="index">

                                    <div class="oa-contact-cell mui-table">
                                        <a :href="['javascript:appApi.openNewWindow(pagepath+\'/contacts/eg_details.html?type=f&userId='+member.userId+'\')']">
                                        <div class="oa-contact-avatar mui-table-cell">
                                            <img v-if="member.userIcon==null" src="../../../assets/images/60x60.gif" alt="" />
                                            <img v-if="member.userIcon!=null" v-bind:src="member.userIcon" alt="..." />
                                        </div>
                                        <div class="oa-contact-content mui-table-cell">
                                            <span class="oa-contact-name" v-text="member.nickName"></span><span class="oa-contact-name" v-text="member.cellPhone"></span>
                                            <p class="oa-contact-email" ><span v-text="member.roomClass"></span>-<span v-text="member.roomMyPost"></span></p>
                                        </div>
                                    </a>
                                    </div>

                                </li>

                            </ul>
                        </dd>
                    </dl>

                </div>
            </div>

            <div class="btn-box">
                <button v-if="form.meeting.mstatus=='1'" @click="seeMeeting('go')" class="mui-btn mui-btn-block mui-btn-primary">进入群聊</button>
            </div>
            </div>
        </section>
        <!--遮罩层-->
        <div class="mui-backdrop" style="display: none;z-index: 999;"></div>
    </div>
</template>

<script>
import {getParam,BackCookie} from '../../../playform/common'
import util from '../../../playform/util'
export default {
    data () {
        return {
            form:{
                meeting:{},
                roomMember:{},
                roomClass:{},
                jiyaoStatus:"",//0=没有纪要  1=存在纪要。
                jiyaoInfo:{}
            },
            data:{

            },
            mId:'',
            projectSN:'',
            userId:'',
        }
    },
    created() {
        var paramMap = getParam(window.location.href);
        console.log(paramMap,1111111111);
        this.mId=paramMap.mId;
        this.projectSN=paramMap.projectSn;
        var method=paramMap.method;
        this.userId = BackCookie.getCookie("userid");
        //初始化会议列表
        this.findPMeetingInfo();
        //查询房间信息
        this.selectRoomById();
        //查询房间用户
        this.selectRoomMember();
    },
    methods:{
        findPMeetingInfo:function () {//查询会议详情
            var _self = this;
            console.log("查询会议详情");
            var parame = new FormData();
            parame.append("mId",this.mId)
            this.$http.post("/pcontact_api/findMeetingInfoById", parame).then(function (response) {
                if (response.data.code == 0) {
                    var result = response.data.result;
                    if (result != null) {
                        _self.form.meeting = result;
                        var status = _self.form.meeting.mstatus;
                        var timeShow = "";
                        var newDate = new Date().Format("yyyy-MM-dd");
                        var createDate = new Date( _self.form.meeting.mcreateDate).Format("yyyy-MM-dd");
                        var endDate = new Date( _self.form.meeting.mendDate).Format("yyyy-MM-dd");
                        var mm = new Date( _self.form.meeting.mcreateDate).Format("MM");
                        var dd = new Date( _self.form.meeting.mcreateDate).Format("dd");
                        var hours = new Date( _self.form.meeting.mcreateDate).Format("hh:mm");
                        if(status=='1'){
                            timeShow = mm+"月"+dd+"日  "+hours;
                            if(newDate==createDate){
                                timeShow = "今天  "+hours;
                            }
                        }else if(status=='2'){//已结束
                            var endmm = new Date( _self.form.meeting.mendDate).Format("MM");
                            var enddd = new Date( _self.form.meeting.mendDate).Format("dd");
                            var endHours = new Date( _self.form.meeting.mendDate).Format("hh:mm");
                            timeShow = mm+"月"+dd+"日  "+hours+"  -  "+endmm+"月"+enddd+"日  "+endHours;
                            if(newDate==createDate){
                                timeShow = "今天  "+hours+"-"+endHours;
                            }
                            if(createDate==endDate){
                                timeShow = mm+"月"+dd+"日  "+hours+" - "+endHours;
                            }


                        }
                        _self.form.meeting.mcreateDate = timeShow;
                    }
                    //判断会议是否结束
                    if(_self.form.meeting!=null&&_self.form.meeting.mstatus!=null&&_self.form.meeting.mstatus=='2'){
                        _self.findHuiyijiyao();
                    }
                }
            }).catch(function (error) {
                // msg(error)
                layer.open({
                    content: error
                    ,skin: 'msg'
                    ,time: 1 //2秒后自动关闭
                    ,anim:false
                });
                console.info(error);
            });

    },
        selectRoomById:function(){
            var _self = this;
            var formdata=new FormData();
            console.log(this.mId);
            formdata.append("roomId",this.mId);
            console.log(formdata);
            this.$http.post("/pcontact_api/getroominfo", formdata).then(function (response) {
                if(response.data.code==0){
                    _self.form.roomClass = response.data.result;
                }
            }).catch(function (error) {
                // msg(error)
                layer.open({
                    content: error
                    ,skin: 'msg'
                    ,time: 1 //2秒后自动关闭
                    ,anim:false
                });
                console.info(error);
            });

        },
        selectRoomMember:function(){//查询房间成员
            var _self = this;
            var formdata=new FormData();
            formdata.append("roomId",this.mId);
            formdata.append("memberType","12");
            formdata.append("projectSn",this.projectSN);
            this.$http.post("/pcontact_api/findRoomUsers", formdata).then(function (response) {
                if(response.data.code==0){
                    var result=response.data.result;
                    console.log("加载房间成员...",result)
                    _self.form.roomMember = result;
                }
            }).catch(function (error) {
                // msg(error)
                layer.open({
                    content: error
                    ,skin: 'msg'
                    ,time: 1 //2秒后自动关闭
                    ,anim:false
                });
                console.info(error);
            });
        },
        seeMeeting:function(see){
            var _self = this;
            if(see=="go"){
                //先判断当前用户是否是成员。
                var isUser = false;
                for(var i=0;i<_self.form.roomMember.length;i++){
                    if(_self.form.roomMember[i].userId==this.userId){
                        isUser= true;
                    }
                }
                if(!isUser){//当前用户不存在当前会议室，需要先将用户加入进会议室和环信群组中
                    var formdata=new FormData();
                    formdata.append("userIds",this.userId);
                    formdata.append("roomId",this.mId);
                    loading("请稍后...");
                    this.$http.post("/pcontact_api/addvisitors", formdata).then(function (response) {
                        setTimeout(function(){
                            appApi.broadcast("reLoad()");
                            appApi.openChat(_self.form.roomClass.roomImId,"/static/images/ico_project_memting.jpg",_self.form.roomClass.name,2);},500)
                        return ;
                    }).catch(function (error) {
                    });
                }else{
                    appApi.openChat(_self.form.roomClass.roomImId,"/static/images/ico_project_memting.jpg",_self.form.roomClass.name,2);
                }
            }else if(see=="see"){
                //appApi.openNewWindow(getUrl()+'/static/webstatic/meeting/meetingsChatRecord.html?mId='+mId);
                // msg("攻城狮正在努力攻击。。。敬请期待")
                layer.open({
                    content: '攻城狮正在努力攻击。。。敬请期待'
                    ,skin: 'msg'
                    ,time: 1 //2秒后自动关闭
                    ,anim:false
                });
            }
        },
        createMeetingHuiyi:function(){//添加会议纪要
            var _self = this;
            appApi.openNewWindow(getUrl()+'/static/newwebstatic/huiyijiyao/work_content.html?'+window.location.href.split("?")[1]);
        },
        findMeetingSummary:function(){
            var _self = this;
            appApi.openNewWindow(getUrl()+'/static/newwebstatic/huiyijiyao/transfer.html?id='+_self.form.jiyaoInfo.id)
        },
        findHuiyijiyao:function(){//查询会议纪要
            var _self = this;
            var formdata = new FormData();
            formdata.append("meetingId",this.mId)
            this.$http.post("/pcontact_api/findHuiyijiyao", formdata).then(function (response) {
                if(response.data.code==0){
                    var result=response.data.result;
                    if(result!=null&&result!=""){
                        _self.form.jiyaoStatus = "1";
                        _self.form.jiyaoInfo = result;
                    }else{
                        _self.form.jiyaoStatus = "0";
                    }
                }
            }).catch(function (error) {
                // msg(error)
                layer.open({
                    content: error
                    ,skin: 'msg'
                    ,time: 1 //2秒后自动关闭
                    ,anim:false
                });
                console.info(error);
            });
        }
    },
    mounted(){
        function reLoad() {
            window.history.go(0)
        }
    }
}
</script>

<style>

</style>
