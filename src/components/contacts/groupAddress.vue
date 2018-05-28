<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title">管理部门和成员</h1>
            <button id="btn-referrer" class="mui-action-back mui-btn mui-btn-link mui-btn-nav mui-pull-left" @click="goBack"><span
                    class="mui-icon mui-icon-back"></span>返回
            </button>
            <a id="menu" class="mui-btn mui-btn-link mui-btn-nav mui-pull-right" href="#popover-more">批量操作</a>
        </header>


        <div class="fixed-bottom">
            <div class="mui-table mui-text-center">
                <!--<div class="mui-table-cell"><a href="javascript:appApi.openNewWindow(getUrl()+'/static/webstatic/contacts/add_manually.html?type=0&teamId='+window.location.href.split('?')[1].split('=')[1])" class="">添加员工</a></div>-->
                <div class="mui-table-cell"><a @click="join">添加员工</a></div>
                <div class="mui-table-cell"><a class="" @click="department">添加子部门</a></div>
            </div>
        </div>
        <section class="mui-content" id="member_list">
            <!--div class="mui-indexed-list-search mui-input-row mui-search">
                <input type="search" class="mui-input-clear mui-indexed-list-search-input" placeholder="搜索">
            </div-->
            <div class="mui-indexed-list-inner group-box">
                <ul class="mui-table-view">
                    <div class="group-header text" id="dept_head">{{none.teamName}}</div>
                </ul>
                <!--子部门列表-->
                <ul class="mui-table-view eg-table-view eg-detail-list">
                    <li class="mui-table-view-cell text" v-for="(item,index) in newJson" :key="index">
                        <a class="mui-navigate-right" @click="subd(index)">{{item.deptName}}<span class="mui-badge mui-badge-inverted">{{item.memberNum}}</span></a>
                    </li>
                    <!--<li class="mui-table-view-cell">
                        <a class="mui-navigate-right" href="javascript:appApi.openNewWindow(getUrl()+'/static/webstatic/contacts/subdivision.html?deptId=')">开发组<span class="mui-badge mui-badge-inverted"></span></a>
                    </li>
                    <li class="mui-table-view-cell">
                        <a class="mui-navigate-right">设计组<span class="mui-badge mui-badge-inverted"></span></a>
                    </li>-->
                </ul>
                <ul class="mui-table-view" v-for="(item,index) in items" :key="index">
                    <li class="mui-table-view-cell">
                        <div class="oa-contact-cell mui-table">
                            <div class="oa-contact-avatar mui-table-cell"><img :src="item.userAvatar | getImageUrl"></div>
                            <div class="oa-contact-content mui-table-cell"><h4 class="oa-contact-name" v-text="item.memberName"></h4></div>
                        </div>
                        <span class="mui-icon iconfont icon-edit2 post" @click="edit(index)"></span>
                    </li>

                </ul>
            </div>

            <!--<div class="pop-up" style="display: ;" id="select_major" v-show="select_major">
                &lt;!&ndash;<div class="pop-title"><a href="javascript:app.select_major = false;">取消</a>     选择专业（多选）</div>
                <div class="pop-content select-box col-xs-6 mui-clearfix" id="majorHtml">

                </div>
                <div class="pop-footer btn-contain">
                    <button type="button" class="mui-btn mui-btn-primary mui-btn-block" @click="save_major">确定</button>
                </div>&ndash;&gt;
                <ul class="mui-popup-content mui-table-view mui-text-left eg-table-view">
                    <li class="mui-table-view-cell">手动添加员工</li>
                    <li class="mui-table-view-cell">通讯录添加员工</li>
                    <li class="mui-table-view-cell">邀请员工加入</li>
                    <li class="mui-table-view-cell">取消</li>
                </ul>
            </div>-->
        </section>

        <!--右上角弹出菜单-->
        <div id="popover-more" class="mui-popover top-menu">
            <div class="mui-popover-arrow"></div>
            <ul class="mui-table-view">
                <li class="mui-table-view-cell"><a href="javascript:appApi.openNewWindow(getUrl()+'/static/webstatic/contacts/batchOpeMember.html?type=1&teamId='+window.location.href.split('?')[1].split('=')[1])"><span class="mui-icon iconfont icon-piliang-add"></span>好友中批量添加</a>
                </li>
                <li class="mui-table-view-cell"><a href="javascript:appApi.openNewWindow(getUrl()+'/static/webstatic/contacts/batchOpeMember.html?type=2&teamId='+window.location.href.split('?')[1].split('=')[1])"><span class="mui-icon iconfont icon-piliang-move"></span>批量转移成员</a>
                </li>
                <li class="mui-table-view-cell"><a href="javascript:appApi.openNewWindow(getUrl()+'/static/webstatic/contacts/batchOpeMember.html?type=3&teamId='+window.location.href.split('?')[1].split('=')[1])"><span class="mui-icon iconfont icon-piliang-delete"></span>批量删除成员</a>
                </li>
            </ul>
        </div>
        <div :class="{'mui-backdrop mui-active' : this.add_type == true }" @click="join"></div>
        <!--选择方式弹框开始-->
        <div id="add_type" class="mui-popover top-menu" style="display:block; top: 460px; left: 5px;" :class="{'mui-active' : this.add_type == true }">
            <div class="mui-popup-title mui-text-left">请选择添加成员的方式</div>
            <ul class="mui-popup-content mui-table-view mui-text-left eg-table-view">
                <li class="mui-table-view-cell"><a @click="mailList">从通讯录批量选择</a></li>
                <li class="mui-table-view-cell"><a @click="manual" class="">手动输入</a></li>
            </ul>
            <div class="mui-popover-arrow mui-bottom" style="left:82px"></div>
        </div>
    </div>
</template>

<script>
import contacts from '../../playform/contacts_comm.js'
export default {
    data(){
        return {
            add_type:false,
            shade:false,
            items:[],
            newJson:[],
            none:[] 
        }
    },
    created() {
        var _self = this;
        var teamId =this.$route.query.teamId;

        // contacts.setDeptHead('n','n',teamId,0,0);//获取头部信息

        this.teamId = this.$route.query.teamId;
        this.$http.post("/api/concats_api/find_team_info?teamId="+this.teamId).then(function (response) {
            console.log(response.data.result);
            _self.none = response.data.result;
            var teamName = response.data.result.teamName;
        }).catch(function (error) {
            console.info(error);
        });

        var param = {teamId:teamId};
        this.$http.post("/api/concats_api/query_team_members",param).then(function (response) {
            _self.items = response.data.result;
            console.info(response.data.result,222222222222);
        }).catch(function (error) {
            console.info(error);
        });

        //deptHtml 获取一级部门
        let par = {deptId:0,teamId:teamId};
        console.info(par);
        this.$http.post("/api/concats_api/query_dept_list",par).then(function (response) {
            _self.newJson =response.data.result;
            console.info(_self.newJson,111111111111);
        }).catch(function (error) {
            //alert("获取部门信息失败,请联系管理员!");
            console.info(error);
        });

    },
    methods:{
        manual(){
            this.$router.push({path:'/add_manually',query:{teamId:this.$route.query.teamId,type:0}});
        },
        mailList(){
            this.$router.push({path:'/select_phone_list',query:{teamId:this.$route.query.teamId,type:0}});
        },
        department(){
            this.$router.push({path:'/addSubdivision',query:{teamId:this.$route.query.teamId,deptId:0}});
        },
        join(){
            this.add_type = !this.add_type;
        },
        subd(index){
            this.$router.push({path:'/subdivision',query:{org:'n',teamId:this.newJson[index].teamId,deptId:this.newJson[index].deptId}});
        },
        edit(index){
            this.$router.push({path:'/contact_edit',query:{memberId:this.items[index].memberId}});
        },
        goBack(){
            this.$router.push({path:'/groupManage',query:{teamId:this.$route.query.teamId}});
        },
        clickshow: function () {
            return true;
        },
        hide_shade:function () {
            this.shade=true;
        }
    },
    filters: {
        getImageUrl: function (val) {
            if(val==null || val=="") return "/api/static/images/60x60.gif";
            return val;
        }
    }
}
</script>

<style scoped>
    .text{
        text-align: left;
    }
    .post{
        position: relative;
        left: -163px;
    }
    .mui-active{
        display: block;
        opacity: 1;
    }
</style>