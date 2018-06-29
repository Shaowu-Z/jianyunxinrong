<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <button id="btn-referrer" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left hide">
                <span class="mui-icon mui-icon-back"></span>返回
            </button>
            <h1 class="mui-title">组织架构</h1>
            <button id='done' style="display: none" class="mui-btn mui-btn-nav mui-btn-primary mui-pull-right mui-disabled" onclick="groupChat(window.location.href.split('?')[1].split('=')[2].split('&')[0])">确定</button>
        </header>
        <section class="mui-content" id="member_list" style="display:none;">
            <!--<div id="list" class="address-list hide" style="overflow: scroll">-->

            <!-- 计算数量用到，start -->
            <div class="mui-indexed-list-search mui-input-row mui-search hide">
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
            </div>
            <!-- 计算数量用到，end -->

            <div class="mui-indexed-list-inner group-box">
                <ul class="mui-table-view">
                    <div class="group-header text" id="dept_head"></div>
                </ul>
                <!--子部门列表-->
                <ul class="mui-table-view eg-table-view eg-detail-list" id="deptHtml">

                </ul>
                <ul class="mui-table-view" v-for="(item,index) in items" :key="index">
                    <li v-if="from==0" class="mui-table-view-cell">
                        <a :href="['javascript:appApi.openNewWindow(pagepath+\'/contacts/eg_details.html?userId='+item.userId+'\')']">
                            <div class="oa-contact-cell mui-table">
                                <div class="oa-contact-avatar mui-table-cell"><img :src="item.userAvatar | getImageUrl"></div>
                                <div class="oa-contact-content mui-table-cell">
                                    <h4 class="oa-contact-name" v-text="item.memberName"></h4>
                                    <p>手机号：{{item.phoneNumber}}</p>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li v-if="from==1" class="mui-table-view-cell">
                        <a :href="['javascript:sendCard(\''+item.imId+'\',\''+item.userAvatar+'\',\''+item.memberName+'\','+item.userId+')']">
                            <div class="oa-contact-cell mui-table">
                                <div class="oa-contact-avatar mui-table-cell"><img :src="item.userAvatar | getImageUrl"></div>
                                <div class="oa-contact-content mui-table-cell">
                                    <h4 class="oa-contact-name" v-text="item.memberName"></h4>
                                    <p>手机号：{{item.phoneNumber}}</p>
                                </div>
                            </div>
                        </a>
                    </li>

                    <!-- 发起群聊 -->
                    <li v-if="from==2" class="mui-table-view-cell mui-indexed-list-item mui-checkbox">
                        <div class="mui-slider-cell">

                            <div class="oa-contact-cell mui-table">
                                <div class="oa-contact-input mui-table-cell"><input type="checkbox" :value="item.userId"/></div>
                                <div class="oa-contact-avatar mui-table-cell">
                                    <img :src="item.userAvatar | getImageUrl">
                                </div>
                                <div class="oa-contact-content mui-table-cell">
                                    <h4 class="oa-contact-name" v-text="item.memberName"></h4>
                                    <p class="oa-contact-email" v-text="item.phoneNumber"></p>
                                </div>
                            </div>
                        </div>
                    </li>

                </ul>
            </div>

        </section>
    </div>
</template>

<script>
import setting from '../../playform/config.js'
export default {
    data () {
        return {
            items:[],
            from:'',
            teamId:'',  
            userId:''
        }
    },
    created: function () {
        var _self = this;
        this.from = this.$route.query.from;
        if(this.from==1){//名片发送
            this.teamId = this.$route.query.teamId;
            this.userId = this.$route.query.userId;
            this.setDeptHead('x','n',this.teamId,0,this.userId);//获取头部信息
        }else if(this.from==0){//组织架构
            this.teamId = this.$route.query.teamId;
            this.setDeptHead('y','n',this.teamId,0,this.userId);//获取头部信息
        }else if(this.from==2){//发起群聊
            this.teamId = this.$route.query.teamId;
            this.userId = this.$route.query.userId;
            this.setDeptHead('x','n',this.teamId,0,this.userId);//获取头部信息
            $("#done").show();//显示确认操作按钮
        }

        var param = {teamId:this.teamId};
        this.$http.post("/concats_api/query_team_members",param).then(function (response) {
            _self.this.$httpitems = response.data.result;
            console.info("team",response.data.result);
        }).catch(function (error) {
            console.info(error);
        });

        //deptHtml 获取一级部门
        //var teamId = window.location.href.split('?')[1].split('=')[1];
        var par = {deptId:0,teamId:this.teamId,isOrg:"y"};
        console.info(par);
        this.$http.post("/concats_api/query_dept_list",par).then(function (response) {
            var newJson =response.data.result;
            console.info(newJson);
            var deptHtml = '';
            for(var j=0;j<newJson.length;j++){
                var arrJ = newJson[j];
                var teamId = arrJ.teamId;
                var deptId = arrJ.deptId;
                var deptName = arrJ.deptName;
                var urlPram = 'y';//默认为组织架构进入
                if(_self.from==1){//发送名片
                    urlPram='x&userId='+_self.userId;
                }else if(_self.from==2){//发起群聊(userId做为群聊成员临时ID)
                    urlPram='g&tempId='+_self.userId;
                }
                deptHtml+='<li class="mui-table-view-cell text">'+
                        '<a class="mui-navigate-right" href="javascript:appApi.openNewWindow(\'/subdivision?org='+
                        urlPram+
                        '&teamId='+teamId+'&deptId='+deptId+'\')">'+deptName+'<span class="mui-badge mui-badge-inverted"></span></a>'+
                        '</li>';
            }
            document.getElementById("deptHtml").innerHTML=deptHtml;
            document.getElementById("member_list").style.display = "block";
        }).catch(function (error) {
            //alert("获取部门信息失败,请联系管理员!");
            console.info(error);
        });

    },
    methods:{
        //设置部门页头部信息 (org:是否组织管理进入，is_dept:是否在部门中调用) userId:名片userId或者群聊临时表ID
        setDeptHead(org,is_dept,teamId,deptId,userId){
            var par = {deptId:deptId,teamId:teamId};
            this.$http.post("/concats_api/query_team_dept",par).then(function (response) {
                console.log(11111111111,response)
                var newJson =response.data.result;
                console.info("info=="+newJson);
                console.info(newJson.regionName,111111111111111111);
                var rTeamId = newJson.teamId;//团队ID
                var rDeptId = newJson.deptId;
                var rTeamName = newJson.teamName;
                var deptHtml = '';
                var teamUrl = "";

                if(org=='y'){//组织架构进入
                    var hostUrl = setting.getPagePath()+"/contacts/address_list.html";
                    deptHtml += '<a href="javascript:appApi.openNewWindow(\''+hostUrl+'\')">联系人</a>  >';
                    teamUrl = setting.getPagePath()+"/contacts/org_structure.html?from=0&teamId="+rTeamId;
                }else if(org=='x'){//发送名片
                    teamUrl = setting.getPagePath()+"/contacts/org_structure.html?from=1&userId="+userId+"&teamId="+rTeamId;
                }else if(org=='n'){
                    teamUrl = setting.getPagePath()+"/contacts/group_address_m.html?teamId="+rTeamId;
                }else if(org=='g'){
                    teamUrl = setting.getPagePath()+"/contacts/org_structure.html?from=2&tempId="+userId+"&teamId="+rTeamId;
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
                                deptUrl = setting.getPagePath()+"/contacts/subdivision.html?org=y&teamId="+rTeamId+"&deptId="+deptIdI;
                            }else if(org=='x'){//发送名片
                                deptUrl = setting.getPagePath()+"/contacts/subdivision.html?org=x&userId="+userId+"&teamId="+rTeamId+"&deptId="+deptIdI;
                            }else if(org=='n'){//管理页面
                                deptUrl = setting.getPagePath()+"/contacts/subdivision.html?org=n&teamId="+rTeamId+"&deptId="+deptIdI;
                            }else if(org=='g'){//发起群聊
                                deptUrl = setting.getPagePath()+"/contacts/subdivision.html?org=g&tempId="+userId+"&teamId="+rTeamId+"&deptId="+deptIdI;
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
            }).catch(function (error) {
                //alert("获取部门信息失败,请联系管理员!");
                console.info(error);
            });
        },
        clickshow: function () {
            return true;
        }
    },
    filters: {
        getImageUrl: function (val) {
            if(val==null || val=="") return getUrl()+"/static/images/60x60.gif";
            return val;
        }
    }
}
</script>

<style>

</style>
