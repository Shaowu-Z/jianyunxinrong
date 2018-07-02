<template>
    <div id='app'>
        <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title" id="title_id"></h1>
            <button id="btn-referrer" class="mui-action-back mui-btn mui-btn-link mui-btn-nav mui-pull-left hide"><span
                    class="mui-icon mui-icon-back"></span>返回
            </button>
            <button id='done' class="mui-btn mui-btn-nav mui-btn-primary mui-pull-right mui-disabled" @click="batchOperate()">确定</button>
        </header>
        <section class="mui-content" id="friend_list">
            <div id='list' class="mui-indexed-list address-list">
                <div class="mui-indexed-list-search mui-input-row mui-search" style="display: none;">
                    <input type="search" class="mui-input-clear mui-indexed-list-search-input" placeholder="搜索">
                </div>
                <div class="mui-indexed-list-alert"></div>
                <div class="mui-indexed-list-inner">
                    <div class="mui-indexed-list-empty-alert" v-show="newJson.length = 0">没有数据</div>
                    <ul class="mui-table-view" id="strHtml">

                        <!--<li class="mui-table-view-cell mui-checkbox">
                            <div class="mui-slider-cell">
                                <div class="oa-contact-cell mui-table">
                                    <div class="oa-contact-input mui-table-cell"><input type="checkbox" /></div>
                                    <div class="oa-contact-avatar mui-table-cell"><span class="oa-pic-default bgr3">陈晨</span></div>
                                    <div class="oa-contact-content mui-table-cell">
                                        <h4 class="oa-contact-name">陈晨</h4>
                                        <p class="oa-contact-email">13985218523</p>
                                        <span name="user_id">1</span>
                                    </div>
                                </div>
                            </div>
                        </li>-->

                    </ul>
                </div>

            </div>
        </section>
    </div>
</template>

<script>
export default {
    data () {
        return {
            items:[],
            type:this.$route.query.type,
            teamId:'',
            newJson : []
        }
    },
    mounted(){
        this.type = this.$route.query.type
        this.setTitleAndId()
        let requestUrl = "/concats_api/find_eg_list?userId=";
        if(this.type==1){
            //var teamId = window.location.href.split('?')[1].split('=')[2];
            requestUrl="/concats_api/find_friend_not_in_team?teamId="+this.teamId;
            this.queryFriendList(this,requestUrl);
        }
        if(this.type==2 || this.type==3 || this.type==5){
            //var teamId = window.location.href.split('?')[1].split('=')[2];
            var param = {teamId:this.teamId};
            requestUrl="/concats_api/query_team_members";
            this.queryMember(this,requestUrl,param);
        }
        if(this.type==4){
            //var teamId = window.location.href.split('?')[1].split('=')[2].split("&")[0];
            //var deptId = window.location.href.split('?')[1].split('=')[3];
            //var param = {teamId:teamId};
            requestUrl="/concats_api/find_friend_not_in_team?teamId="+this.teamId;
            this.queryFriendList(this,requestUrl);
        }
        if(this.type==6 || this.type==7){
            //var deptId = window.location.href.split('?')[1].split('=')[3];
            var param = {deptId:this.deptId};
            requestUrl = "/concats_api/query_team_members";
            this.queryMember(this,requestUrl,param);
        }
        if(this.type==8){
            var param = {teamId:this.teamId,queryType:"1"};//查询所有非管理员的成员
            requestUrl = "/concats_api/query_team_members";
            this.queryMember(this,requestUrl,param);
        }
        if(this.type==9){
            var param = {teamId:this.teamId,queryType:"3"};//查询除自己外的管理员
            requestUrl = "/concats_api/query_team_members";
            this.queryMember(this,requestUrl,param);
        }
    },
    methods:{
        batchOperate() {
            //type -- :1:团队部门主页-好友中批量添加,2:团队部门主页-批量转移，3:团队部门主页-批量删除，4:部门信息页-好友中批量添加:5：部门信息页-部门成员中批量添加，6:部门信息页-批量转移成员，7：部门信息页-批量删除成员
            //var type = window.location.href.split('?')[1].split('=')[1].split("&")[0];
            var checkedObj = list.querySelectorAll('input[type="checkbox"]:checked');
            if(checkedObj== undefined || checkedObj.length<1){
                return;
            }
            if(type==1 || type==4){//添加好友进团队或者部门
                var newJsonMember = [];
                //var teamId = 0;
                var userIds = "";

                for(var i=0; i<checkedObj.length;i++){
                    /*if(i==checkedObj.length-1){
                    userIds+=checkedObj[i].value;
                    }else{
                    userIds+=checkedObj[i].value+",";
                    }*/
                    var indexValue = checkedObj[i].value;

                    var objFriend = newJson[indexValue];//获取选中行的数组数据
                    if(type==4){//部门添加
                        //var deptId = window.location.href.split('?')[1].split('=')[3];
                        //teamId = window.location.href.split('?')[1].split('=')[2].split("&")[0];
                        newJsonMember.push({userId:objFriend.friendsUserId,teamId:teamId,deptId:deptId,memberName:objFriend.remarksName,phoneNumber:objFriend.cellPhone,memberType:"0",createDate:new Date(),lastUpdateDate:new Date()});
                    }else{
                        //teamId = window.location.href.split('?')[1].split('=')[2];
                        newJsonMember.push({userId:objFriend.friendsUserId,teamId:teamId,memberName:objFriend.remarksName,phoneNumber:objFriend.cellPhone,memberType:"0",createDate:new Date(),lastUpdateDate:new Date()});
                    }
                }
                console.info(newJsonMember);
                var newJsonTeamVo = {teamId:teamId,projectTeamMemberTList:newJsonMember};
                this.$http.post("/concats_api/batch_add_member_f",newJsonTeamVo).then(function (response) {
                    //_self.$data.items = response.data.result;
                    loading('批量操作成功！');
                    window.location.href="../contacts/group_address_m.html?teamId="+teamId;
                }).catch(function (error) {
                    console.info(error);
                    alert("系统异常，请联系管理员!");
                });
            }

            var operateUrl = "";
            var newJsonParam ={};
            if(type==2 || type==3 || type==5 || type==6 || type==7 || type==8 || type==9){//团队成员操作
                var memberIds = "";
                //var checkedObj = list.querySelectorAll('input[type="checkbox"]:checked');
                for(var i=0; i<checkedObj.length;i++){
                    /*if(i==checkedObj.length-1){
                    userIds+=checkedObj[i].value;
                    }else{
                    userIds+=checkedObj[i].value+",";
                    }*/
                    var indexValue = checkedObj[i].value;

                    var objFriend = newJson[indexValue];//获取选中行的数组数据
                    if(i==checkedObj.length-1){
                        memberIds+=objFriend.memberId;
                    }else{
                        memberIds+=objFriend.memberId+",";
                    }
                }

                if(type==2 || type==6){//批量转移
                    window.location.href="../contacts/select_group.html?teamId="+teamId+"&deptId="+deptId+"&memberIds="+memberIds;
                }

                var locationUrl = "../contacts/group_address_m.html?teamId="+teamId;
                if(type==3 || type==7){//批量删除
                    operateUrl="/concats_api/delete_member_batch";
                    newJsonParam={memberIds:memberIds};
                    locationUrl = "../contacts/group_address_m.html?teamId="+teamId;
                }
                if(type==8){
                    operateUrl="/concats_api/update_team_admin";
                    newJsonParam={operateType:"1",memberIds:memberIds};//新增管理员
                    locationUrl = "../contacts/select_team_admin.html?teamId="+teamId;
                }
                if(type==9){
                    operateUrl="/concats_api/update_team_admin";
                    newJsonParam={operateType:"2",memberIds:memberIds};//删除管理员
                    locationUrl = "../contacts/select_team_admin.html?teamId="+teamId;
                }

                console.info(newJsonParam);
                 this.$http.post(operateUrl,newJsonParam).then(function (response) {
                    //_self.$data.items = response.data.result;
                    loading('批量操作成功！');
                    window.location.href=locationUrl;
                }).catch(function (error) {
                    console.info(error);
                    alert("系统异常，请联系管理员!");
                });
            }


        },
        queryFriendList(thisObj,requestUrl){
            let _this = this
            var _self = thisObj;
            this.$http.post(requestUrl).then(function (response) {
                _self.$data.items = response.data.result;
                console.info(response.data.result);

                //封装页面数据
                _this.newJson = response.data.result;
                var indexSzmT = "";
                var strHtml = "";
                for(var j=0;j<_this.newJson.length;j++){
                    var arrJ = _this.newJson[j];
                    //var nameInitials = arrI.split("=")[0];
                    var remarksName = arrJ.remarksName;
                    var cellPhone = arrJ.cellPhone;
                    var nameInitials = arrJ.nameInitials;
                    var friendsUserId = arrJ.friendsUserId;
                    var userAvatar = arrJ.avatar;
                    if(userAvatar==null){
                        userAvatar= getUrl()+"/static/images/60x60.gif";
                    }

                    if(indexSzmT.indexOf(nameInitials)==-1){
                        strHtml+='<li data-group="'+nameInitials.toUpperCase()+'" class="mui-table-view-divider mui-indexed-list-group text" >'+nameInitials.toUpperCase()+'</li>';
                    }
                    indexSzmT+=nameInitials;
                    strHtml+='<li class="mui-table-view-cell mui-checkbox">'+
                            '<div class="mui-slider-cell">'+
                            '<div class="oa-contact-cell mui-table">'+
                            '<div class="oa-contact-input mui-table-cell"><input type="checkbox" value="'+j+'"/></div>'+
                            '<div class="oa-contact-avatar mui-table-cell"><img src="'+userAvatar+'"></div>'+
                            /*'<div class="oa-contact-avatar mui-table-cell"><span class="oa-pic-default bgr3">'+remarksName+'</span></div>'+*/
                            '<div class="oa-contact-content mui-table-cell">'+
                            '<h4 class="oa-contact-name">'+remarksName+'</h4>'+
                            '<p class="oa-contact-email text">'+cellPhone+'</p>'+
                            '<span name="user_id" class="hide">'+friendsUserId+'</span>'+
                            '</div>'+
                            '</div>'+
                            '</div>'+
                            '</li>';
                }

                document.getElementById("strHtml").innerHTML=strHtml;
                console.log(document.getElementById("strHtml"))
            //    $(".mui-checkbox").on("click",function($event){
            //     //    console.log($event)
            //     //     console.log($event.originalEvent.target.innerHTML)
            //     //     console.log($event.originalEvent.target.previousSibling.innerHTML)
            //     })
                var list = document.getElementById('list');
                var done = document.getElementById('done');
                $('.mui-indexed-list-inner').bind('click','input', function() {
                    // console.log(1111)
                    var count = list.querySelectorAll('input[type="checkbox"]:checked').length;
                    console.info(list.querySelectorAll('input[type="checkbox"]:checked'));
                    console.log(done.innerHTML)
                    var value = count ? "完成(" + count + ")" : "完成";
                    done.innerHTML = value;
                    if (count) {
                        if (done.classList.contains("mui-disabled")) {
                            done.classList.remove("mui-disabled");
                        }
                    } else {
                        if (!done.classList.contains("mui-disabled")) {
                            done.classList.add("mui-disabled");
                        }
                    }
                });
            }).catch(function (error) {
                console.info(error);
            });

        },
        queryMember(thisObj,requestUrl,param){
            $("#zm_id").hide();//
            let _this = this
            var _self = thisObj;
             this.$http.post(requestUrl,param).then(function (response) {
                _self.$data.items = response.data.result;
                console.info(response.data.result);

                //封装页面数据
                _this.newJson = response.data.result;
                var indexSzmT = "";
                var strHtml = "";
                for(var j=0;j<_this.newJson.length;j++){
                    var arrJ = _this.newJson[j];
                    //var nameInitials = arrI.split("=")[0];
                    var remarksName = arrJ.memberName;
                    var cellPhone = arrJ.phoneNumber;
                    //var nameInitials = arrJ.nameInitials;
                    var memberId = arrJ.memberId;
                    var memberType = arrJ.memberType;
                    var userAvatar = arrJ.userAvatar;
                    if(userAvatar==null){
                        userAvatar= getUrl()+"/static/images/60x60.gif";
                    }

                    if(memberType==1 && (_this.type==3 || _this.type==7)){//团队创建人员要做特殊处理
                        strHtml+='<li class="mui-table-view-cell mui-checkbox">'+
                                '<div class="mui-slider-cell">'+
                                '<div class="oa-contact-cell mui-table">'+
                                '<div class="oa-contact-input mui-table-cell"><input type="checkbox" value="'+j+'" disabled/></div>'+
                                '<div class="oa-contact-avatar mui-table-cell"><img src="'+userAvatar+'"></div>'+
                                '<div class="oa-contact-content mui-table-cell">'+
                                '<h4 class="oa-contact-name">'+remarksName+'</h4>'+
                                '<p class="oa-contact-email text">'+cellPhone+'</p>'+
                                '<span name="user_id" class="hide">'+memberId+'</span>'+
                                '</div>'+
                                '</div>'+
                                '</div>'+
                                '</li>';
                    }else{
                        strHtml+='<li class="mui-table-view-cell mui-checkbox">'+
                                '<div class="mui-slider-cell">'+
                                '<div class="oa-contact-cell mui-table">'+
                                '<div class="oa-contact-input mui-table-cell"><input type="checkbox" value="'+j+'"/></div>'+
                                '<div class="oa-contact-avatar mui-table-cell"><img src="'+userAvatar+'"></div>'+
                                '<div class="oa-contact-content mui-table-cell">'+
                                '<h4 class="oa-contact-name">'+remarksName+'</h4>'+
                                '<p class="oa-contact-email text">'+cellPhone+'</p>'+
                                '<span name="user_id" class="hide">'+memberId+'</span>'+
                                '</div>'+
                                '</div>'+
                                '</div>'+
                                '</li>';
                    }
                    /*if(indexSzmT.indexOf(nameInitials)==-1){
                        strHtml+='<li data-group="'+nameInitials.toUpperCase()+'" class="mui-table-view-divider mui-indexed-list-group" >'+nameInitials.toUpperCase()+'</li>';
                    }
                    indexSzmT+=nameInitials;*/
                    /*strHtml+="<li class=\"mui-table-view-cell mui-checkbox\"><div class=\"mui-slider-cell\"><div class=\"oa-contact-cell mui-table\">" +
                            "<div class=\"oa-contact-input mui-table-cell\"><input style type=\"checkbox\" value=\""+j+'"/></div>'+
                            '<div class="oa-contact-avatar mui-table-cell"><span class="oa-pic-default bgr3">'+remarksName+'</span></div>'+
                            '<div class="oa-contact-content mui-table-cell">'+
                            '<h4 class="oa-contact-name">'+remarksName+'</h4>'+
                            '<p class="oa-contact-email">'+cellPhone+'</p>'+
                            '<span name="user_id" class="hide">'+memberId+'</span>'+
                            '</div>'+
                            '</div>'+
                            '</div>'+
                            '</li>';*/
                    /*var mHtml = '<div class="mui-input-row mui-radio mui-left mui-disabled">'+
                            '<label>disabled radio</label>'+
                    '<input name="radio1" type="radio" disabled="disabled">'+
                            '</div>';*/


                }

                document.getElementById("strHtml").innerHTML=strHtml;
                $(".mui-checkbox").addEventListener("click",function(){
                    alert(5)
                })
            }).catch(function (error) {
                console.info(error);
            });
        },
        setTitleAndId() {
            //type -- :1:团队部门主页-好友中批量添加,2:团队部门主页-批量转移，3:团队部门主页-批量删除，4:部门信息页-好友中批量添加:5：部门信息页-部门成员中批量添加，6:部门信息页-批量转移成员，7：部门信息页-批量删除成员
            if(this.type==1){
                $("#title_id").text("好友中批量添加");
                this.teamId = this.$route.query.teamId;
            }
            if(this.type==2){
                $("#title_id").text("批量转移成员");
                this.teamId = this.$route.query.teamId;
            }
            if(this.type==3){
                $("#title_id").text("批量删除成员");
                this.teamId = this.$route.query.teamId;
            }
            if(this.type==4){
                $("#title_id").text("好友中批量添加");
                this.teamId = this.$route.query.teamId;
                this.deptId = this.$route.query.deptId;
            }
            if(this.type==5){
                $("#title_id").text("部门成员中批量添加");
                this.teamId = this.$route.query.teamId;
            }
            if(this.type==6){
                $("#title_id").text("批量转移成员");
                this.teamId = this.$route.query.teamId;
                this.deptId = this.$route.query.deptId;
            }
            if(this.type==7){
                $("#title_id").text("批量删除成员");
                this.teamId = this.$route.query.teamId;
                this.deptId = this.$route.query.deptId;
            }
            if(this.type==8){
                $("#title_id").text("批量新增管理员");
                this.teamId = this.$route.query.teamId;
            }
            if(this.type==9){
                $("#title_id").text("批量删除管理员");
                this.teamId = this.$route.query.teamId;
            }

        }
    },
    // mounted(){
    //
    //     //type -- :1:团队部门主页-好友中批量添加,2:团队部门主页-批量转移，3:团队部门主页-批量删除，4:部门信息页-好友中批量添加:
    //     // 5：部门信息页-部门成员中批量添加，6:部门信息页-批量转移成员，7：部门信息页-批量删除成员,8.新增管理员，9.删除管理员
    //     //标题和ID设置
    //     setTitleAndId(this.type);


}
</script>

<style type="text/css" scoped>

</style>
