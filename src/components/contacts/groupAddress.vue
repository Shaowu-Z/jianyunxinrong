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
                <div class="mui-table-cell"><a href="#add_type">添加员工</a></div>
                <div class="mui-table-cell"><a class="" href="javascript:appApi.openNewWindow(getUrl()+'/static/webstatic/contacts/add_subdivision.html?teamId='+window.location.href.split('?')[1].split('=')[1]+'&deptId=0')">添加子部门</a></div>
            </div>
        </div>
        <section class="mui-content" id="member_list">
            <!--div class="mui-indexed-list-search mui-input-row mui-search">
                <input type="search" class="mui-input-clear mui-indexed-list-search-input" placeholder="搜索">
            </div-->
            <div class="mui-indexed-list-inner group-box">
                <ul class="mui-table-view">
                    <div class="group-header text" id="dept_head"></div>
                </ul>
                <!--子部门列表-->
                <ul class="mui-table-view eg-table-view eg-detail-list" id="deptHtml">
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

        <!--选择方式弹框开始-->
        <div id="add_type" class="mui-popover top-menu">
            <div class="mui-popup-title mui-text-left">请选择添加成员的方式</div>
            <ul class="mui-popup-content mui-table-view mui-text-left eg-table-view">
                <li class="mui-table-view-cell"><a href="javascript:appApi.openNewWindow(getUrl()+'/static/webstatic/contacts/select_phone_list.html?type=0&teamId='+window.location.href.split('?')[1].split('=')[1])">从通讯录批量选择</a></li>
                <li class="mui-table-view-cell"><a href="javascript:appApi.openNewWindow(getUrl()+'/static/webstatic/contacts/add_manually.html?type=0&teamId='+window.location.href.split('?')[1].split('=')[1])" class="">手动输入</a></li>
            </ul>
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
            items:[] 
        }
    },
    created() {
        var _self = this;
        var teamId = window.location.href.split("?")[1].split("=")[1];

        // contacts.setDeptHead('n','n',teamId,0,0);//获取头部信息
        //设置部门页头部信息 (org:是否组织管理进入，is_dept:是否在部门中调用) userId:名片userId或者群聊临时表ID
        var org ='n';
        var is_dept = 'n';
        var deptId = 0;
        var userId = 0;
        function setDeptHead(org,is_dept,teamId,deptId,userId){
            var par = {deptId:deptId,teamId:teamId};
            let _this=this;
            _this.$http.post("/api/concats_api/query_team_dept",par).then(function(response){
                var newJson =response.data.result;
                console.info("info=="+newJson);
                console.info(newJson.regionName);
                var rTeamId = newJson.teamId;//团队ID
                var rDeptId = newJson.deptId;
                var rTeamName = newJson.teamName;
                var deptHtml = '';
                var teamUrl = "";

                if(org=='y'){//组织架构进入
                    var hostUrl = getPagePath()+"/contacts/address_list.html";
                    deptHtml += '<a href="javascript:appApi.openNewWindow(\''+hostUrl+'\')">联系人</a>  >';
                    teamUrl = getPagePath()+"/contacts/org_structure.html?from=0&teamId="+rTeamId;
                }else if(org=='x'){//发送名片
                    teamUrl = getPagePath()+"/contacts/org_structure.html?from=1&userId="+userId+"&teamId="+rTeamId;
                }else if(org=='n'){
                    teamUrl = getPagePath()+"/contacts/group_address_m.html?teamId="+rTeamId;
                }else if(org=='g'){
                    teamUrl = getPagePath()+"/contacts/org_structure.html?from=2&tempId="+userId+"&teamId="+rTeamId;
                }

                if(is_dept=='y'){//团队的部门中
                    deptHtml += '<a href="javascript:appApi.openNewWindow(\''+teamUrl+'\')">'+rTeamName+'</a>  > ';
                }else{
                    deptHtml += rTeamName+' ';
                }

                var pDeptNames = newJson.regionName;//上级部门名称(所有上级部门)
                if(pDeptNames!=null && pDeptNames.split(",").length>1){
                    var deptNameArr = pDeptNames.split(",");
                    for(var i=deptNameArr.length-1;i>0;i--){
                        if(i>0){//当前部门往上
                            var arri = deptNameArr[i].split("=");
                            var deptIdI = arri[0];
                            var deptNameI = arri[1];
                            var deptUrl ="";
                            if(org=='y'){//组织架构进入
                                deptUrl = getPagePath()+"/contacts/subdivision.html?org=y&teamId="+rTeamId+"&deptId="+deptIdI;
                            }else if(org=='x'){//发送名片
                                deptUrl = getPagePath()+"/contacts/subdivision.html?org=x&userId="+userId+"&teamId="+rTeamId+"&deptId="+deptIdI;
                            }else if(org=='n'){//管理页面
                                deptUrl = getPagePath()+"/contacts/subdivision.html?org=n&teamId="+rTeamId+"&deptId="+deptIdI;
                            }else if(org=='g'){//发起群聊
                                deptUrl = getPagePath()+"/contacts/subdivision.html?org=g&tempId="+userId+"&teamId="+rTeamId+"&deptId="+deptIdI;
                            }
                            if(i==1){//当前部门
                                deptHtml += ' '+deptNameI;
                            }else{
                                deptHtml += '<a href="javascript:appApi.openNewWindow(\''+deptUrl+'\')">'+deptNameI+'</a>  > ';
                            }
                        }
                    }
                }
                document.getElementById("dept_head").innerHTML=deptHtml;
            }).catch(function(error) {
                //alert("获取部门信息失败,请联系管理员!");
                console.info(error);
            });
        };
        setDeptHead();

        var param = {teamId:teamId};
        this.$http.post("/api/concats_api/query_team_members",param).then(function (response) {
            _self.$data.items = response.data.result;
            console.info(response.data.result);
        }).catch(function (error) {
            console.info(error);
        });

        //deptHtml 获取一级部门
        //var teamId = window.location.href.split('?')[1].split('=')[1];
        var par = {deptId:0,teamId:teamId};
        console.info(par);
        this.$http.post("/api/concats_api/query_dept_list",par).then(function (response) {
            var newJson =response.data.result;
            console.info(newJson);
            var deptHtml = '';
            for(var j=0;j<newJson.length;j++){
                var arrJ = newJson[j];
                var teamId = arrJ.teamId;
                var deptId = arrJ.deptId;
                var deptName = arrJ.deptName;
                var memberNum = arrJ.memberNum;
                deptHtml+='<li class="mui-table-view-cell text">'+
                    '<a class="mui-navigate-right" href="javascript:appApi.openNewWindow(\'/api/static/webstatic/contacts/subdivision.html?org=n&teamId='+teamId+'&deptId='+deptId+'\')">'+deptName+'<span class="mui-badge mui-badge-inverted">'+memberNum+'</span></a>'+
                    '</li>';
            }
            document.getElementById("deptHtml").innerHTML=deptHtml;
        }).catch(function (error) {
            //alert("获取部门信息失败,请联系管理员!");
            console.info(error);
        });

    },
    methods:{
        edit(index){
            this.$router.push({path:'/contact_edit',query:{memberId:this.items[index].memberId}});
        },
        goBack(){
            this.$router.back(-1)
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
</style>