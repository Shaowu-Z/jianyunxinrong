<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
			<h1 class="mui-title">发起项目内群聊</h1>
			<!--<a class="mui-action-back mui-icon iconfont icon-back"></a>-->
		</header>
		<section class="mui-content mycenter-content">
			<ul class="mui-table-view eg-table-view">
				<li class="mui-table-view-cell mui-input-row">
					<input type="text" name="mMain" v-model="form.mMain" value="" placeholder="项目内群聊主题"/>
				</li>
			</ul>
			<div class="publish-container">
				<div class="title">添加群聊成员</div>
				<ul class="mui-table-view mui-table-view-striped container-average">

					<li v-for="(user,index) in form.users" :key="index" class="mui-table-view-cell">
						<span class="btn-roll btn-delete iconfont icon-delete" @click="deleteMember(user)"></span>
						<a :href="['javascript:appApi.openNewWindow(pagepath+\'/contacts/eg_details.html?type=f&userId='+user.userId+'\')']">
						<div class="oa-contact-cell mui-table">
							<div class="oa-contact-avatar mui-table-cell">
								<img v-if="user.userIcon==null" src="../../../assets/images/60x60.gif" alt="" />
								<img v-if="user.userIcon!=null" v-bind:src="user.userIcon" alt="..." />
							</div>
							<div class="oa-contact-content mui-table-cell">
								<h4 class="oa-contact-name" v-text="user.nickName"></h4>
								<p class="oa-contact-email"><span class="oa-contact-email"  v-text="user.roomClassName"></span> - <span class="oa-contact-email"  v-text="user.roomName"></span></p>
							</div>
						</div>
						</a>
					</li>
					<!--<li class="mui-table-view-cell">
						<span class="btn-roll btn-delete iconfont icon-delete"></span>
						<div class="oa-contact-cell mui-table">
							<div class="oa-contact-avatar mui-table-cell">
								<img src="../../images/60x60.gif" />
							</div>
							<div class="oa-contact-content mui-table-cell">
								<h4 class="oa-contact-name">王建国</h4>
								<p class="oa-contact-email">匠心科技</p>
							</div>
						</div>
					</li>
					<li class="mui-table-view-cell">
						<span class="btn-roll btn-delete iconfont icon-delete"></span>
						<div class="oa-contact-cell mui-table">
							<div class="oa-contact-avatar mui-table-cell">
								<img src="../../images/60x60.gif" />
							</div>
							<div class="oa-contact-content mui-table-cell">
								<h4 class="oa-contact-name">吴迪</h4>
								<p class="oa-contact-email">珠海格力空调</p>
							</div>
						</div>
					</li>-->
					<li class="upload-btn" @click="createMeetingMember()">
						<div class="img-item-inner mui-icon mui-icon-plusempty"></div>
					</li>
				</ul>
			</div>
			<div class="btn-box">
				<button class="mui-btn mui-btn-block mui-btn-primary" @click="saveMeeting()">发起群聊</button>
			</div>
		</section>
    </div>
</template>

<script>
import setting from '../../../playform/config'
import {getParam,BackCookie} from '../../../playform/common'
export default {
    data () {
        return {
            paramMap: {},
            form:{
                mMain:"",
                memberList:[],
                users:[],
            },
            data:{
            },
        }
    },
    created:function() {
        this.paramMap = getParam(window.location.href);
        var projectSN=this.paramMap.projectSn;
        var method=this.paramMap.method;
        var pagepath=setting.getPagePath()
            var _self = this;
            setTimeout(function () {
                _self.test();
            },100)
    },
    methods:{
        saveMeeting:function (projectSN) {
            var _self = this;
            var roomdata=new FormData();
            /*if(_self.form.mMain==null||_self.form.mMain==""){
                msg("会议主题不能为空!");
                return ;
            }*/

            /*if(_self.form.users==null||_self.form.users.length<=0){
                msg("会议成员最少添加一名！");
                return ;
            }*/
            var userIds = "";
            //进行url转码问题
            var userNames = decodeURIComponent(BackCookie.getCookie("username"))+",";
            for(var i=0;i<_self.form.users.length;i++){
                var user = _self.form.users[i];
                if(i==(_self.form.users.length-1)){
                    userIds +=_self.form.users[i].userId;
                    userNames += _self.form.users[i].nickName;
                }else{
                    userIds +=_self.form.users[i].userId + ",";
                    userNames += _self.form.users[i].nickName + ",";
                }
            }
            if(_self.form.mMain==null||_self.form.mMain==""){
                _self.form.mMain = userNames;
            }
            roomdata.append("mMain",_self.form.mMain);//会议名称
            roomdata.append("mStatus","1");//会议状态 1=进行中 2=已结束
            roomdata.append("mOfficeId",projectSN);//办公室ID
            roomdata.append("mCreateUser",BackCookie.getCookie("userid"));//当前用户=创建者（主持人）
            roomdata.append("mCreateUserName",BackCookie.getCookie("username"));//当前用户=创建者名称（主持人）
            roomdata.append("userIds",userIds);
            appApi.showLoading();
            this.$http.post("/pcontact_api/savePMeeting", roomdata).then(function (response) {
                var roomClass = response.data.result;
                setTimeout(function () {
                    appApi.broadcast("reLoad()"); //刷新页面
                    appApi.closeNewWindow();
                    appApi.hideLoading();
                    appApi.openChat(roomClass.roomImId,"/static/images/ico_project_memting.jpg",roomClass.name,2);
                    layer.closeAll();

                },200)
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
        deleteMember:function(val){
            var _self = this;
            _self.form.users.remove(val);
        },
        createMeetingMember:function(projectSN){
            var _self = this;
            var userIds = "";
            if( _self.form.users!=null&&_self.form.users.length>0){
                for(var i = 0;i<_self.form.users.length;i++){
                    if(i<(_self.form.users.length-1)){
                        userIds += _self.form.users[i].userId+",";
                    }else{
                        userIds += _self.form.users[i].userId;
                    }
                }
            }
            appApi.openProjectContactSelectPage(projectSN,'',userIds,1,true,false);
            appApi.callBackFun = function(callFlag, CONTENT) {
                if(callFlag == appApi.callBackFlag.GONGSI) {
                    app.meetingMember(CONTENT);
                }
            }
        },
        meetingMember:function(CONTENT){

            var _self = this;
            var result = CONTENT;
            var users = result["result"];
            _self.form.users = JSON.parse(users);
            // alert(_self.form.users[0].nickName);
            // window.location.reload();
        },
        test:function(projectSN){
            var formdata=new FormData();
            var obj=new Object();
            obj.serialNum=projectSN;
            formdata.append("json",JSON.stringify(obj));
            this.$http.post("/project_room_api/find_project",formdata).then(function (response) {
                if(response.data.code==200){
                    var result=response.data.result;
                    if(result.length>0){
                        console.log(result);

                    }else {
                        // msg("未查询到项目信息，请核对记录ID是否正确!")
                        layer.open({
                            content: '未查询到项目信息，请核对记录ID是否正确!'
                            ,skin: 'msg'
                            ,time: 1 //2秒后自动关闭
                            ,anim:false
                        });
                        return
                    }

                    console.log(result)
                }else {
                    // msg("查询项目失败!")
                    layer.open({
                        content: '查询项目失败'
                        ,skin: 'msg'
                        ,time: 1 //2秒后自动关闭
                        ,anim:false
                    });
                }
            }).catch(function (error) {
                console.info(error);
            });
        }
    },
    mounted(){
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
    }
}
</script>

<style>

</style>
