<template>
    <div id='app'>
        <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title" id="title_id"></h1>
            <button id="btn-referrer" class="mui-action-back mui-btn mui-btn-link mui-btn-nav mui-pull-left hide"><span
                    class="mui-icon mui-icon-back"></span>返回
            </button>
            <button id='done' class="mui-btn mui-btn-nav mui-btn-primary mui-pull-right mui-disabled" onclick="batchOperate()">确定</button>
        </header>
        <section class="mui-content" id="friend_list">
            <div id='list' class="mui-indexed-list address-list">
                <div class="mui-indexed-list-search mui-input-row mui-search" style="display: none;">
                    <input type="search" class="mui-input-clear mui-indexed-list-search-input" placeholder="搜索">
                </div>
                <div class="mui-indexed-list-bar">
                    <div class="align-middle" id="zm_id">
                        <a class="mui-hidden">A</a>
                        <a>B</a>
                        <a>C</a>
                        <a>D</a>
                        <a>E</a>
                        <a>F</a>
                        <a class="mui-hidden">G</a>
                        <a class="mui-hidden">H</a>
                        <a class="mui-hidden">I</a>
                        <a class="mui-hidden">J</a>
                        <a class="mui-hidden">K</a>
                        <a class="mui-hidden">L</a>
                        <a class="mui-hidden">M</a>
                        <a class="mui-hidden">N</a>
                        <a class="mui-hidden">O</a>
                        <a class="mui-hidden">P</a>
                        <a class="mui-hidden">Q</a>
                        <a class="mui-hidden">R</a>
                        <a class="mui-hidden">S</a>
                        <a class="mui-hidden">T</a>
                        <a class="mui-hidden">U</a>
                        <a class="mui-hidden">V</a>
                        <a class="mui-hidden">W</a>
                        <a class="mui-hidden">X</a>
                        <a class="mui-hidden">Y</a>
                        <a>Z</a>
                        <a>#</a>
                    </div>
                </div>
                <div class="mui-indexed-list-alert"></div>
                <div class="mui-indexed-list-inner">
                    <div class="mui-indexed-list-empty-alert">没有数据</div>
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
            teamId:'111',
        }
    },
    methods:{

    },
    mounted(){
        function setTitleAndId(type) {
            //type -- :1:团队部门主页-好友中批量添加,2:团队部门主页-批量转移，3:团队部门主页-批量删除，4:部门信息页-好友中批量添加:5：部门信息页-部门成员中批量添加，6:部门信息页-批量转移成员，7：部门信息页-批量删除成员
            if(type==1){
                $("#title_id").text("好友中批量添加");
                this.teamId = window.location.href.split('?')[1].split('=')[2];
            }
            if(type==2){
                $("#title_id").text("批量转移成员");
                this.teamId = window.location.href.split('?')[1].split('=')[2];
            }
            if(type==3){
                $("#title_id").text("批量删除成员");
                this.teamId = window.location.href.split('?')[1].split('=')[2];
            }
            if(type==4){
                $("#title_id").text("好友中批量添加");
                this.teamId = window.location.href.split('?')[1].split('=')[2].split("&")[0];
                this.deptId = window.location.href.split('?')[1].split('=')[3];
            }
            if(type==5){
                $("#title_id").text("部门成员中批量添加");
                this.teamId = window.location.href.split('?')[1].split('=')[2];
            }
            if(type==6){
                $("#title_id").text("批量转移成员");
                this.teamId = window.location.href.split('?')[1].split('=')[2].split("&")[0];
                this.deptId = window.location.href.split('?')[1].split('=')[3];
            }
            if(type==7){
                $("#title_id").text("批量删除成员");
                this.teamId = window.location.href.split('?')[1].split('=')[2].split("&")[0];
                this.deptId =window.location.href.split('?')[1].split('=')[3];
            }
            if(type==8){
                $("#title_id").text("批量新增管理员");
                        
                this.teamId = window.location.href.split('?')[1].split('=')[2].split("&")[0];
            }
            if(type==9){
                $("#title_id").text("批量删除管理员");
                this.teamId = window.location.href.split('?')[1].split('=')[2].split("&")[0];
            }

        }
        var requestUrl = "/concats_api/find_eg_list?userId=";
        //type -- :1:团队部门主页-好友中批量添加,2:团队部门主页-批量转移，3:团队部门主页-批量删除，4:部门信息页-好友中批量添加:
        // 5：部门信息页-部门成员中批量添加，6:部门信息页-批量转移成员，7：部门信息页-批量删除成员,8.新增管理员，9.删除管理员
        //标题和ID设置
        setTitleAndId(this.type);

        if(this.type==1){
            //var teamId = window.location.href.split('?')[1].split('=')[2];
            requestUrl="/concats_api/find_friend_not_in_team?teamId="+this.teamId;
            queryFriendList(this,requestUrl);
        }
        if(this.type==2 || this.type==3 || this.type==5){
            //var teamId = window.location.href.split('?')[1].split('=')[2];
            var param = {teamId:this.teamId};
            requestUrl="/concats_api/query_team_members";
            queryMember(this,requestUrl,param);
        }
        if(this.type==4){
            //var teamId = window.location.href.split('?')[1].split('=')[2].split("&")[0];
            //var deptId = window.location.href.split('?')[1].split('=')[3];
            //var param = {teamId:teamId};
            requestUrl="/concats_api/find_friend_not_in_team?teamId="+this.teamId;
            queryFriendList(this,requestUrl);
        }
        if(this.type==6 || this.type==7){
            //var deptId = window.location.href.split('?')[1].split('=')[3];
            var param = {deptId:this.deptId};
            requestUrl = "/concats_api/query_team_members";
            queryMember(this,requestUrl,param);
        }
        if(this.type==8){
            var param = {teamId:this.teamId,queryType:"1"};//查询所有非管理员的成员
            requestUrl = "/concats_api/query_team_members";
            queryMember(this,requestUrl,param);
        }
        if(this.type==9){
            var param = {teamId:this.teamId,queryType:"3"};//查询除自己外的管理员
            requestUrl = "/concats_api/query_team_members";
            queryMember(this,requestUrl,param);
        }
    },
    created () {
        
    },
}
</script>

<style>

</style>
