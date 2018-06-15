<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title">子管理员</h1>
            <!--<a class="mui-action-back mui-icon iconfont icon-back"></a>-->
            <button class="mui-btn mui-btn-nav mui-btn-primary mui-pull-right" @click="returnXiangMuInfo()">确定</button>
        </header>
        <section class="mui-content">

            <div class="module01" style="margin-top:10px;">
                <div class="module-body sppd-content add-manager" @click="addProjectMember()">
                    <div class="oa-contact-cell mui-table">
                        <div class="oa-contact-avatar mui-table-cell">
                            <img src="../../assets/images/ico_plus.gif" />
                        </div>
                        <div class="oa-contact-content mui-table-cell">
                            <h4 class="oa-contact-name">添加子管理员</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="module01">
                <div class="module-body">
                    <ul class="mui-table-view group-list">
                        <li v-for="(user,index) in data.recivememberList" :key="index" class="mui-table-view-cell">
                            <div class="mui-slider-cell">
                                <div class="oa-contact-cell mui-table">
                                    <div class="oa-contact-avatar mui-table-cell">
                                        <img v-if="user.userIcon==null" src="../../assets/images/60x60.gif" alt="" />
                                        <img v-if="user.userIcon!=null" v-bind:src="user.userIcon" alt="..." />
                                    </div>
                                    <div class="oa-contact-content mui-table-cell">
                                        <h4 class="oa-contact-name"><span v-text="user.nickName"></span></h4>
                                        <p class="oa-contact-email"><span v-text="user.cellPhone"></span></p>
                                    </div>
                                </div>
                            </div>
                                <span class="btn-roll btn-delete iconfont icon-delete" @click="deleteMember(user)"></span>
                        </li>
                    </ul>
                </div>
            </div>

            <!--未设置子管理员-->
            <!--<div class="control-content">
                <div class="no-group">
                    <div class="no-record-img no-manage"></div>
                    <p>未设置子管理员</p>
                </div>
            </div>-->
        </section>
    </div>
</template>

<script>
import setting from '../../playform/config'
import {getParam,BackCookie} from '../../playform/common'
export default {
    data () {
        return {
            form:{
            },
            data:{
                memberList:[],//项目成语列表
                recivememberList:[],//项目成语列表
                selectIdList:[],
                selectUserList:[],
            },
            selectSize:0,
            createDate:"",
            recordType:"",
            imghost:setting.UPLOAD_SERVER_ADDRESS,
            paramMap : {},
            projectSN: '',
            method:'',
        }
    },
    created() {//初始化方法
        this.paramMap = getParam(window.location.href)//获取地址栏参数
        this.projectSN=this.paramMap.projectSN;
        this.method=this.paramMap.method;
    },
    methods:{
        findroomuserlist () {//查询项目子管理员

            var _self = this;
            var formdata = new FormData();
            var ary = this.paramMap.project;
            ary = decodeURIComponent(ary);
            ary = JSON.parse(ary);
            if(ary.length>0){
                for(var i=0;i<ary.length;i++){
                    if(ary[i]!=null){
                        _self.data.recivememberList.push(ary[i]);
                    }
                }
            }
            if(ary.length==0){
                formdata.append("projectSn", this.projectSN)
                this.$http.post("/pcontact_api/findprojectmanage", formdata).then(function (response) {
                    if (response.data.code == 0) {
                        var result = response.data.result;
                        if (result != null && result.length > 0) {
                            _self.data.recivememberList = result;
                        }
                    }
                }).catch(function (error) {
                    msg(error)
                    console.info(error);
                });
            }
        },
        addprojectmanage () {//查询所有子管理员
            var _self=this;
            var formdata=new FormData();
            formdata.append("projectSn",projectSN)
            this.$http.post("/pcontact_api/findprojectmember",formdata).then(function (response) {
                if(response.data.code==0){
                    var result=response.data.result;
                    if(result!=null&&result.length>0){
                        _self.data.memberList=result;
                        var userIdList=JSON.parse(this.paramMap.param);
                        for (var i=0;i<userIdList.length;i++){
                            _self.data.memberList.removeUser(userIdList[i]);
                        }

                    }



                }
            }).catch(function (error) {
                msg(error)
                console.info(error);
            });

        },
        returnXiangMuInfo(){//返回管理员列表
            var _self=this;
            var ary=_self.data.recivememberList

            setTimeout(function(){
                appApi.broadcast("setProjectManageChildList("+JSON.stringify(ary)+")");//返回上一页并设置标准工资页面
                appApi.closeNewWindow();

            },100);

        },
        addProjectMember(){
            var _self=this;
            var selectuserIdList=[];
            var param=null;
            var select = _self.data.recivememberList;
            for(var i in select){
                if(select[i].userId){
                    selectuserIdList.push(select[i].userId);
                }

            }

            // appApi.openNewWindow(setting.pagepath+'/chatroom/project_member_add.html?projectSN='+this.projectSN+"&method=add&param="+JSON.stringify(selectuserIdList));
            this.$router.push({path:'/static/webstatic/chatroom/project_member_add.html',query:{projectSN:this.projectSN,method:'add',param:JSON.stringify(selectuserIdList)}})
        },


        selectUser () {//选择工人
            var _self=this;
            setTimeout(function () {
                _self.data.selectIdList=_self.getSelectVal();
                document.getElementById("selectSize").innerHTML=_self.data.selectIdList.length;
            },200)

        },
        cancel () {//取消选中
            var _self=this;
            _self.data.selectIdList=[];
            _self.selectSize=0;
        },
        getSelectVal() {//选择工人
            var _self=this
            //获取所有返回的值
            var obj = document.getElementsByName("selectItem");
            var select_arr = [];
            _self.data.selectUserList=[];
            for(var k in obj) {
                if(obj[k].checked && undefined != obj[k].value){
                    var userobj=new Object();
                    userobj.userId=obj[k].value;
                    userobj.cellPhone=obj[k].getAttribute("cellPhone");
                    userobj.imId=obj[k].getAttribute("imId");
                    userobj.nickName=obj[k].getAttribute("nickName");
                    userobj.userIcon=obj[k].getAttribute("userIcon");
                    _self.data.selectUserList.push(userobj);
                    select_arr.push(obj[k].value);
                }

            }
            console.info(select_arr);
            return select_arr;
        },
        popup(content){
            msg(content);
        },
        deleteMember(val){
            var _self=this;
            _self.data.recivememberList.remove(val);
        },
    },
    mounted(){
        /**
         * 确认
         */
        window.confirm=function () {
            if(app.data.selectUserList.length<=0){
                msg("请选择工人")
                return;
            }
            localStorage.setItem("lastname", JSON.stringify(app.data.selectUserList));
            setTimeout(function () {
                appApi.closeNewWindow();
                appApi.broadcast("setMemberList("+JSON.stringify(app.data.selectUserList)+")");//返回上一页并设置标准工资页面
            },100);
        }






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


        /**
         * 接收选择的项目成员列表
         * @param ary
         */
        function setMemberList(ary) {
            if(ary.length>0){
                for(var i=0;i<ary.length;i++){
                    if(ary[i]!=null){
                        app.data.recivememberList.push(ary[i]);
                    }
                }
            }

        }
    }
}
</script>

<style>

</style>
