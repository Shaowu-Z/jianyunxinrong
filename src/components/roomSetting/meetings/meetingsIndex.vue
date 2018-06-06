<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title">项目内群聊</h1>

            <button class="mui-btn mui-btn-link mui-pull-right" @click="createMeeting()">发起群聊</button>
        </header>
        <section class="mui-content massage-list">
            <ul class="mui-table-view mui-table-view-striped massage-table">
                <li v-for="(meeting,index) in form.meetingList" :key="index" class="mui-table-view-cell" @click="showMeetingInfo(meeting.mid)">
                    <div class="mui-slider-cell">
                        <div class="oa-contact-cell mui-table">
                            <!--<div class="oa-contact-avatar mui-table-cell">
                                <div class="group-pic col-xs-4">
                                    <span class="item-head oa-pic-default bgr2">施</span>
                                    <span class="item-head oa-pic-default bgr5">建</span>
                                    <span class="item-head oa-pic-default bgr5">总</span>
                                    <span class="item-head oa-pic-default bgr4">材</span>
                                </div>
                            </div>-->
                            <div class="oa-contact-avatar mui-table-cell">
                                <img src="../../../assets/images/ico_project_memting.jpg"/>
                            </div>
                            <div class="oa-contact-content mui-table-cell">
                                <h4 class="oa-contact-name"><span class="title mui-ellipsis">{{ meeting.mmain}}</span><span class="secondary date-time">{{meeting.mcreateDate}}</span></h4>
                                <p class="oa-contact-email"><span>微承诺:{{meeting.commitmentSize}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>会议纪要:{{meeting.meetingSummarySize}}</span></p>
                                <!--<p class="oa-contact-email"><span>王建国:项目一期即将完成</span></p>-->
                            </div>
                        </div>
                    </div>
                </li>
            </ul>

            <!--没有会议-->
            <div class="no-group"  style="display: none;" id="noMeeting">
                <div class="no-record-img no-meeting"></div>
                <p>没有项目内群聊记录</p>
            </div>
        </section>
    </div>
</template>

<script>
import {getParam,BackCookie} from '../../../playform/common'
export default {
    data () {
        return {
            paramMap: {},
            form:{
                meetingList:[],
            },
            data:{
            },
            param:{}
        }
    },
    created() {
        this.paramMap = getParam(window.location.href);
        var projectSN=this.paramMap.projectSn;
        if(!projectSN){
            projectSN=this.paramMap.projectSN;
        }
        var userstatus=this.paramMap.status;
        var method=this.paramMap.method;
        //初始化会议列表
        this.findPMeetingList();
    },
    methods:{
        findPMeetingList (projectSN,userstatus) {
            var _self = this;
            console.log("查询会议列表");
            var parame = new FormData();
            var userId = BackCookie.getCookie("userid")
            parame.append("roomId",projectSN)
            if(userstatus==null){
                userstatus = 1;
            }
            parame.append("status",userstatus)
            this.$http.post("/pcontact_api/findPMeetingList", parame).then(function (response) {
                if (response.data.code == 0) {
                    var result = response.data.result;
                    if (result != null && result.length > 0) {
                            _self.form.meetingList = result;
                            for(var i=0;i<_self.form.meetingList.length;i++){
                                console.log(_self.form.meetingList[i])
                                var status = _self.form.meetingList[i].mstatus;
                                var timeShow = "";
                                var newDate = new Date().Format("yyyy-MM-dd");
                                var createDate = new Date( _self.form.meetingList[i].mcreateDate).Format("yyyy-MM-dd");
                                var mm = new Date( _self.form.meetingList[i].mcreateDate).Format("MM");
                                var dd = new Date( _self.form.meetingList[i].mcreateDate).Format("dd");
                                var hours = new Date( _self.form.meetingList[i].mcreateDate).Format("hh:mm");
                                if(status=='1'){//进行中
                                    //timeShow = mm+"月"+dd+"日  "+hours;
                                    timeShow = mm+"月"+dd+"日";
                                    if(newDate==createDate){
                                        //timeShow = "今天  "+hours;
                                        timeShow = hours;
                                    }
                                }else if(status=='2'){//已结束
                                    var endHours = new Date( _self.form.meetingList[i].mendDate).Format("hh:mm");
                                    //timeShow = mm+"月"+dd+"日  "+hours+"-"+endHours;
                                    timeShow = mm+"月"+dd+"日";
                                    if(newDate==createDate){
                                        //timeShow = "今天  "+hours+"-"+endHours;
                                        timeShow = hours;
                                    }
                                }
                                _self.form.meetingList[i].mcreateDate = timeShow;
                            }
                    }else {
                        setTimeout(function () {
                            document.getElementById("noMeeting").style.display="block";
                        },500)
                    }
                    setTimeout(function () {
                        document.getElementById("app").style.display="block";
                    },500)
                }

            }).catch(function (error) {
                // msg(error)
                layer.open({
                    content: error
                    ,skin: 'msg'
                    ,time: 1 //2秒后自动关闭
                    ,anim:false
                });
            });


        },
        createMeeting:function(projectSN){
            // appApi.openNewWindow(getUrl()+'/static/webstatic/meeting/meeting_launch.html?projectSN='+projectSN);
            this.$router.push({path:'/static/webstatic/meeting/meeting_launch.html',query:{projectSN:projectSN}});
        },
        createMeetingMember:function(projectSN){
            appApi.openNewWindow(getUrl()+'/static/webstatic/meeting/project_contact_select.html?projectSN='+projectSN);
        },
        saveMeeting:function(){
            //初始化房间
            var roomdata=new FormData();
            roomdata.append("projectSN",result.projectSN);
            roomdata.append("roomName",result.roomName);
            roomdata.append("roomClass",result.roomClass);
            roomdata.append("companyName",result.companyName);
            roomdata.append("companyCreditCode",result.companyCreditCode);
            this.$http.post("/pcontact_api/initprojectcontact",roomdata).then(function (response) {
                console.log("房间初始化完成",response.data)
                setTimeout(function () {
                    layer.closeAll();
                    appApi.closeNewWindow();

                },500);
            }).catch(function (error) {
                console.info(error);
            });
        },
        showMeetingInfo:function(mId){
            // appApi.openNewWindow(getUrl()+'/static/webstatic/meeting/meeting_info.html?mId='+mId+"&"+window.location.href.split("?")[1]);
            this.$router.push({path:'/static/webstatic/meeting/meeting_info.html',query:{mId:this.$route.query.mId,loginType:this.$route.query.loginType}});
        }
    }
}
</script>

<style>

</style>
