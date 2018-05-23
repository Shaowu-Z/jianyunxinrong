<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title">部门信息</h1>
            <button id="btn-referrer" class="mui-action-back mui-btn mui-btn-link mui-btn-nav mui-pull-left" @click="goBack"><span
                    class="mui-icon mui-icon-back"></span>返回
            </button>
            <a id="menu" v-show="show" style="display: none;" class="mui-btn mui-btn-link mui-btn-nav mui-pull-right" href="#popover-more">批量操作</a>
            <button id='done' v-show="false" style="display: none" class="mui-btn mui-btn-nav mui-btn-primary mui-pull-right mui-disabled" onclick="groupChat(window.location.href.split('?')[1].split('=')[2].split('&')[0])">确定</button>
        </header>

        <div class="fixed-bottom" id="operate_div" v-show="show" style="display: none;">
            <div class="mui-table mui-text-center">
                <!--<div class="mui-table-cell"><a class="" href="javascript:appApi.openNewWindow(getUrl()+'/static/webstatic/contacts/add_manually.html?type=1&teamId='+window.location.href.split('?')[1].split('=')[1].split('&')[0]+'&deptId='+window.location.href.split('?')[1].split('=')[2])">添加员工</a></div>-->
                <div class="mui-table-cell"><a href="#add_type">添加员工</a></div>
                <div class="mui-table-cell"><a class="" href="javascript:appApi.openNewWindow(getUrl()+'/static/webstatic/contacts/add_subdivision.html?teamId='+teamId+'&deptId='+deptId)">添加子部门</a></div>
                <div class="mui-table-cell"><a class="" href="javascript:appApi.openNewWindow(getUrl()+'/static/webstatic/contacts/branch_set.html?teamId='+teamId+'&hasMember='+hasMember+'&deptId='+deptId)">部门设置</a></div>
            </div>
        </div>
        <section class="mui-content" id="dept_member_list">
            <!-- 计算数量用到，start -->
            <!--<div class="mui-indexed-list-search mui-input-row mui-search hide">
                <input type="search" class="mui-input-clear mui-indexed-list-search-input" placeholder="搜索">
            </div>
            <div class="mui-indexed-list-bar hide">
                <div class="align-middle" id="zm_id">
                    <a class="mui-hidden">A</a>
                </div>
            </div>
            <div class="mui-indexed-list-alert"></div>
            <div class="mui-indexed-list-inner hide">
                <div class="mui-indexed-list-empty-alert">没有数据</div>
                <ul class="mui-table-view" id="strHtml">

                </ul>
            </div>-->
            <!-- 计算数量用到，end -->
                <div class="group-header" id="dept_head">
                    <li class="mui-table-view-cell text">
                        <span>{{none.teamName}}</span>
                        </li>
                </div>
                <div class="mui-indexed-list-inner group-box" >
                    <!--<div class="group-header"><a href="#">伟峰saas开发组</a>&nbsp;&nbsp;>&nbsp;&nbsp;<span>设计组</span></div>-->
                    <!--<div class="singlebox tip-box">
                        <a class="mui-navigate-right">
                            <p class="tip-con">当前部门还没有设置主管</p>
                            <p class="secondary">主管用于日主、审批、考勤查看与操作权限</p>
                        </a>
                    </div>-->
                    <ul class="mui-table-view">
                    </ul>
                    <ul class="mui-table-view eg-table-view eg-detail-list" id="deptHtml">
                    </ul>

                    <ul class="mui-table-view" v-for="(item,index) in items" :key="index">
                        <li v-if="org=='x'" class="mui-table-view-cell" >    
                            <div class="oa-contact-cell mui-table" @click="edit(index)">
                                <div class="oa-contact-avatar mui-table-cell"><img :src="item.userAvatar | getImageUrl"></div>
                                <div class="oa-contact-content mui-table-cell"><h4 class="oa-contact-name" v-text="item.memberName"></h4></div>
                            </div>
                        </li>
                        <li v-if="org=='n' || org=='y'" class="mui-table-view-cell" >
                            <div class="oa-contact-cell mui-table" @click="edit(index)">
                                <div class="oa-contact-avatar mui-table-cell"><img :src="item.userAvatar | getImageUrl"></div>
                                <div class="oa-contact-content mui-table-cell"><h4 class="oa-contact-name" v-text="item.memberName"></h4></div>
                            </div>
                            <span id="edit_member" v-show="show" class="mui-icon iconfont icon-edit2 post" @click="edit(index)"></span>
                        </li>
                        <li v-if="org=='g'" class="mui-table-view-cell mui-checkbox" >
                            <div class="oa-contact-cell mui-table">
                                <div class="oa-contact-input mui-table-cell"><input type="checkbox" :value="item.userId"/></div>
                                <div class="oa-contact-avatar mui-table-cell"><img :src="item.userAvatar | getImageUrl"></div>
                                <div class="oa-contact-content mui-table-cell"><h4 class="oa-contact-name" v-text="item.memberName"></h4></div>
                            </div>
                        </li>
                    </ul>
                </div>
            
            <!--添加员工开始-->
            <!--<div class="mui-popup mui-popup-in">
                <div class="mui-popup-title mui-text-left">选择添加成员的方式</div>
                <ul class="mui-popup-content mui-table-view mui-text-left eg-table-view">
                    <li class="mui-table-view-cell">手动输入添加</li>
                    <li class="mui-table-view-cell">从手机通讯录添加</li>
                    <li class="mui-table-view-cell">邀请同事加入本部门</li>
                </ul>
            </div>-->
            <!--添加员工结束-->

            <!--右上角弹出菜单-->
            <div id="popover-more" class="mui-popover top-menu">
                <div class="mui-popover-arrow"></div>
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell"><a href="javascript:appApi.openNewWindow(getUrl()+'/static/webstatic/contacts/batchOpeMember.html?type=4&teamId='+window.location.href.split('?')[1].split('=')[2]+'='+window.location.href.split('?')[1].split('=')[3])"><span class="mui-icon iconfont icon-piliang-add"></span>好友中批量添加</a>
                    </li>
                    <li class="mui-table-view-cell"><a href="javascript:appApi.openNewWindow(getUrl()+'/static/webstatic/contacts/batchOpeMember.html?type=6&teamId='+window.location.href.split('?')[1].split('=')[2]+'='+window.location.href.split('?')[1].split('=')[3])"><span class="mui-icon iconfont icon-piliang-move"></span>批量转移成员</a>
                    </li>
                    <li class="mui-table-view-cell"><a href="javascript:appApi.openNewWindow(getUrl()+'/static/webstatic/contacts/batchOpeMember.html?type=7&teamId='+window.location.href.split('?')[1].split('=')[2]+'='+window.location.href.split('?')[1].split('=')[3])"><span class="mui-icon iconfont icon-piliang-delete"></span>批量删除成员</a>
                    </li>
                </ul>
            </div>

            <!--选择方式弹框开始-->
            <div id="add_type" class="mui-popover top-menu">
                <div class="mui-popup-title mui-text-left">请选择添加成员的方式</div>
                <ul class="mui-popup-content mui-table-view mui-text-left eg-table-view">
                    <li class="mui-table-view-cell"><a href="javascript:appApi.openNewWindow(getUrl()+'/static/webstatic/contacts/select_phone_list.html?type=1&teamId='+window.location.href.split('?')[1].split('=')[2].split('&')[0]+'&deptId='+window.location.href.split('?')[1].split('=')[3])">从通讯录批量选择</a></li>
                    <li class="mui-table-view-cell"><a href="javascript:appApi.openNewWindow(getUrl()+'/static/webstatic/contacts/add_manually.html?type=1&teamId='+window.location.href.split('?')[1].split('=')[2].split('&')[0]+'&deptId='+window.location.href.split('?')[1].split('=')[3])" class="">手动输入</a></li>
                </ul>
            </div>
            <!--选择方式弹框结束-->

        </section>
    </div>
</template>

<script>
export default {
    data(){
        return{
            items: [],
            org: this.$route.query.org,
            teamId: this.$route.query.teamId,
            deptId: '',
            userId: '',
            hasMember: '',
            show: false,
            none: []
        }
    },
    created: function () {
        this.teamId = this.$route.query.teamId;
        this.$http.post("/api/concats_api/find_team_info?teamId="+this.teamId).then(function (response) {
            console.log(response.data.result);
            _self.none = response.data.result;
            var teamName = response.data.result.teamName;
        }).catch(function (error) {
            console.info(error);
        });
        var _self = this;
        var isOrg="";
        if(this.org=='y'){//组织架构进入
            this.deptId = this.$route.query.deptId,
            this.isOrg = "y";
        }else if(this.org=='x'){//发送名片进入
            this.deptId = this.$route.query.deptId;
            this.userId = this.$route.query.teamId
        }else if(this.org=='n'){//管理员进入
            this.show = !this.show;
            this.deptId = this.$route.query.deptId;
        }else if(this.org=='g'){//发起群聊进入
            this.deptId = this.$route.query.deptId;
            this.userId = this.$route.query.teamId
            // $("#done").show();//显示确认操作按钮
        }

        // setDeptHead(org,'y',0,deptId,userId);//获取头部信息

        var param = {deptId:this.deptId,isOrg:isOrg};
        this.$http.post("/api/concats_api/query_team_members",param).then(function (response) {
            var resp = response.data.result;
            if(resp.length>0){
                _self.hasMember = "y";
            }else{
                _self.hasMember = "n";
            }
            _self.items = resp;
            console.info(response.data.result);
        }).catch(function (error) {
            console.info(error);
        });
        console.info(param);
        this.$http.post("/api/concats_api/query_dept_list",param).then(function (response) {
            var newJson =response.data.result;
            var deptHtml = '';
            for(var j=0;j<newJson.length;j++){
                var arrJ = newJson[j];
                var teamId = arrJ.teamId;
                var deptId = arrJ.deptId;
                var deptName = arrJ.deptName;
                var memberNum = arrJ.memberNum;
                var urlPram = 'org=y';//默认为组织架构进入
                if(org=='x'){//发送名片
                    urlPram='org=x&userId='+userId+'&teamId='+teamId+'&deptId='+deptId;
                }else if(org=='y'){//组织架构进入
                    urlPram = 'org=y&teamId='+teamId+'&deptId='+deptId;
                }else if(org=='n'){//管理页面进入
                    urlPram = 'org=n&teamId='+teamId+'&deptId='+deptId;
                }else if(org=='g'){//发起群聊页面进入
                    urlPram = 'org=g&tempId='+userId+'&teamId='+teamId+'&deptId='+deptId;
                }
            }
        }).catch(function (error) {
            //alert("获取部门信息失败,请联系管理员!");
            console.info(error);
        });

    },
    filters: {
        getImageUrl: function (val) {
            if(val==null || val=="") return "/api/static/images/60x60.gif";
            return val;
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        },
        edit(index){
            if(this.org=='x'){
                this.$router.push({path:'/contact_edit',query:{imId:this.items[index].imId,userAvatar:this.items[index].userAvatar,memberName:this.items[index].memberName,userId:this.items[index].userId}});
            }else if(this.org=='n' || this.org=='y'){
                // console.log(this.items[index]);
                this.$router.push({path:'/eg_details',query:{userId:this.items[index].userId}});
            }
        }
    }
}
</script>

<style scoped>
    .post{
        position: relative;
        left: -163px;
    }
    .text{
        text-align: left
    }
</style>
