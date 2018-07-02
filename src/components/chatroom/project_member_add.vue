<template>
    <div id='app'>
        <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title">添加子管理员</h1>
            <button id="btn-referrer" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left hide">
                <span class="mui-icon mui-icon-back"></span>
            </button>
        </header>
        <div class="fixed-bottom">
            <div class="confirm-box">
                <div class="count-con text">已选择<span class="num" id="selectSize">0</span>人</div>
                <div class="btn-con"><button @click="confirm()" class="mui-btn mui-btn-primary">确定</button></div>
            </div>
        </div>
        <section class="mui-content">
            <div id="app">
                <!--所有子管理员-->

                    <ul class="mui-table-view eg-table-view">
                        <li v-for="(user,index) in data.memberList" :key="index" class="mui-table-view-cell mui-checkbox" @click="selectUser(index)">
                            <div class="mui-slider-cell">
                                <div class="oa-contact-cell mui-table">
                                    <div class="oa-contact-input mui-table-cell" style="z-index:0">
                                        <input type="checkbox"
                                            name="selectItem"
                                            :cellPhone="user.cellPhone"
                                            :nickName="user.nickName"
                                            :value="user.userId"
                                            :imId="user.imId"
                                            :userIcon="user.userIcon"
                                            v-model="data.selectIdList" />
                                    </div>
                                    <div class="oa-contact-avatar mui-table-cell">
                                        <img v-if="user.userIcon==null" src="../../assets/images/60x60.gif" alt="" />
                                        <img v-if="user.userIcon!=null" v-bind:src="user.userIcon" alt="..." />
                                    </div>
                                    <div class="oa-contact-content mui-table-cell">
                                        <h4 class="oa-contact-name user-name" v-text="user.nickName"></h4>
                                        <p class="oa-contact-email text"><span v-text="user.cellPhone"></span></p>
                                    </div>
                                </div>
                            </div>
                        </li>

                    </ul>

        </div>
        </section>
        <!--遮罩层-->
        <div class="mui-backdrop" style="display: none;z-index: 999;"></div>
    </div>
</template>

<script>
import setting from '../../playform/config'
import {getParam,BackCookie} from '../../playform/common'
import { Toast } from 'mint-ui';
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
            select_arr:[]
        }
    },
    created() {//初始化方法
        this.paramMap = getParam(window.location.href)//获取地址栏参数
        this.projectSN=this.paramMap.projectSN;
        this.method=this.paramMap.method;
        var _self = this;
        if(this.method=="list"){
            _self.findroomuserlist();
        }
        if(this.method=="add"){
            $("#selectSize").innerHTML=0;
            _self.addprojectmanage();
        }
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
            formdata.append("projectSn",this.projectSN)
            this.$http.post("/pcontact_api/findprojectmember",formdata).then(function (response) {
                if(response.data.code==0){
                    var result=response.data.result;
                    if(result!=null&&result.length>0){
                        _self.data.memberList=result;
                        var userIdList=JSON.parse(_self.paramMap.param);
                        for (var i=0;i<userIdList.length;i++){
                            _self.data.memberList.removeUser(userIdList[i]);
                        }

                    }



                }
            }).catch(function (error) {
                // msg(error)
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

            appApi.openNewWindow(setting.pagepath+'/chatroom/project_member_add.html?projectSN='+this.projectSN+"&method=add&param="+JSON.stringify(selectuserIdList));
        },


        selectUser (index) {//选择工人
            var _self=this;
            setTimeout(function () {
                _self.data.selectIdList=_self.getSelectVal(index);
                document.getElementById("selectSize").innerHTML=_self.data.selectIdList.length;
            },200)

        },
        cancel () {//取消选中
            var _self=this;
            _self.data.selectIdList=[];
            _self.selectSize=0;
        },
        getSelectVal(index) {//选择工人
            var _self=this
            //获取所有返回的值
            var obj = document.getElementsByName("selectItem");
            // var select_arr = [];
            _self.data.selectUserList=[];


                console.log(obj[index])
                if(obj[index].checked && undefined != obj[index].value){
                    var userobj=new Object();
                    userobj.userId=obj[index].value;
                    userobj.cellPhone=obj[index].getAttribute("cellPhone");
                    userobj.imId=obj[index].getAttribute("imId");
                    userobj.nickName=obj[index].getAttribute("nickName");
                    userobj.userIcon=obj[index].getAttribute("userIcon");
                    _self.data.selectUserList.push(userobj);
                    this.select_arr.push(obj[index].value);
                }
            // console.info(select_arr);
            return this.select_arr;
        },
        popup(content){
            msg(content);
        },
        deleteMember(val){
            var _self=this;
            _self.data.recivememberList.remove(val);
        },
        confirm:function () {
            let _self = this
            if(this.data.selectUserList.length<=0){
                // msg("请选择工人")
                Toast({
                    message: '请选择工人',
                    position: 'bottom',
                    duration: 1000
                });
                return;
            }
            localStorage.setItem("lastname", JSON.stringify(this.data.selectUserList));
            setTimeout(function () {
                appApi.closeNewWindow();

                appApi.broadcast("setMemberList("+JSON.stringify(_self.data.selectUserList)+")");//返回上一页并设置标准工资页面
            },100);
        }
    },
    mounted(){
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

<style type="text/css" scoped>

</style>
