<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <button id="btn-referrer" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left"  @click="goBack">
                <span class="mui-icon mui-icon-back"></span>联系人
            </button>
            <h1 class="mui-title">团队管理</h1>
        </header>

        <section class="mui-content address-list" id="team_manage">
            <div class="group-head" onclick="appApi.openNewWindow(pagepath+'/contacts/team_update.html?teamId='+teamId)">
                <!--<div class="group-score"><span class="score">5</span><small>分</small></div>-->
                <div class="group-name text" v-text="none.teamName"></div>
                <!--<span class="label-certification" id="authenticateStatus" v-text="none.authenticateStatus"></span>-->
                <span v-if="none.authenticateStatus=='未认证'" class="label-certification posi"><span class="iconfont icon-certification"></span> <span v-text="none.authenticateStatus"></span></span>
                <span v-if="none.authenticateStatus=='认证中'" class="label-certification posi"><span class="iconfont icon-certification"></span> <span v-text="none.authenticateStatus"></span></span>
                <span v-if="none.authenticateStatus=='已认证'" class="label-certification certified posi"><span class="iconfont icon-certification"></span> <span v-text="none.authenticateStatus"></span></span>
            </div>
            <h5 class="mui-content-padded text">通用设置</h5>
            <ul class="mui-table-view mui-table-view-striped">
                <li class="mui-table-view-cell">
                    <a class="mui-navigate-right" @click="staff"><div class="mui-slider-cell">
                        <div class="oa-contact-cell mui-table">
                            <div class="oa-contact-avatar mui-table-cell">
                                <span class="oa-pic-default mui-icon iconfont icon-contact" style="color:#09f;"></span>
                            </div>
                            <div class="oa-contact-content mui-table-cell">
                                <h4 class="oa-contact-name">员工/部门管理</h4>
                            </div>
                        </div>
                    </div></a>
                </li>


                <li class="mui-table-view-cell">
                    <a class="mui-navigate-right" href="javascript:appApi.openNewWindow(pagepath+'/contacts/group_chat_set.html?hasGroup=1&teamId='+app.none.teamId)"><div class="mui-slider-cell">
                        <div class="oa-contact-cell mui-table">
                            <div class="oa-contact-avatar mui-table-cell">
                                <span class="oa-pic-default mui-icon iconfont icon-group-chat" style="color:#09f;"></span>
                            </div>
                            <div class="oa-contact-content mui-table-cell">
                                <h4 class="oa-contact-name">群聊设置</h4>
                            </div>
                        </div>
                    </div></a>
                </li>
            </ul>
            <h5 class="mui-content-padded text">专属服务</h5>
            <ul class="mui-table-view mui-table-view-striped">
                <li class="mui-table-view-cell">
                    <a class="mui-navigate-right" href="javascript:window.appApi.openNewWindow(pagepath+'/contacts/teamcert/team_issue.html?teamId='+teamId)">
                        <div class="mui-slider-cell">
                            <div class="oa-contact-cell mui-table">
                                <div class="oa-contact-avatar mui-table-cell">
                                    <span class="oa-pic-default mui-icon iconfont icon-group-certificatiion" ></span>
                                </div>
                                <div class="oa-contact-content mui-table-cell">
                                    <h4 class="oa-contact-name">资质等级</h4>
                                </div>
                            </div>
                        </div>
                        <span class="mui-badge mui-badge-inverted" v-text="none.issueCount + '份'"></span>
                    </a>
                </li>

                <li class="mui-table-view-cell">
                    <a class="mui-navigate-right" href="javascript:window.appApi.openNewWindow(pagepath+'/contacts/select_team_admin.html?teamId='+teamId)">
                        <div class="mui-slider-cell">
                            <div class="oa-contact-cell mui-table">
                                <div class="oa-contact-avatar mui-table-cell">
                                    <span class="oa-pic-default mui-icon iconfont icon-manager" ></span>
                                </div>
                                <div class="oa-contact-content mui-table-cell">
                                    <h4 class="oa-contact-name">管理员设置</h4>
                                </div>
                            </div>
                        </div>
                    </a>
                </li>

                <li class="mui-table-view-cell" style="display: none">
                    <a class="mui-navigate-right" href="javascript:appApi.openNewWindow(pagepath+'/contacts/group_set_project.html?teamId='+teamId)">
                        <div class="mui-slider-cell">
                            <div class="oa-contact-cell mui-table">
                                <div class="oa-contact-avatar mui-table-cell">
                                    <span class="oa-pic-default mui-icon mui-icon-gear"></span>
                                </div>
                                <div class="oa-contact-content mui-table-cell">
                                    <h4 class="oa-contact-name">项目权限设置</h4>
                                </div>
                            </div>
                        </div>
                    </a>
                </li>


                <li class="mui-table-view-cell">
                    <a class="mui-navigate-right" href="javascript:appApi.openNewWindow(pagepath+'/dish/sign_list.html?type=0&teamId='+teamId+'&code='+code)">
                        <div class="mui-slider-cell">
                            <div class="oa-contact-cell mui-table">
                                <div class="oa-contact-avatar mui-table-cell">
                                    <span class="oa-pic-default mui-icon mui-icon-gear"></span>
                                </div>
                                <div class="oa-contact-content mui-table-cell">
                                    <h4 class="oa-contact-name">企业印章设置</h4>
                                </div>
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
            <h5 class="mui-content-padded text">更多设置</h5>
            <ul class="mui-table-view mui-table-view-striped">
                <li class="mui-table-view-cell" @click="jsTeam">
                    <!--<a class="mui-navigate-right" href="javascript:window.appApi.openNewWindow(pagepath+'/qiyerenzh/group_certification_company_info.html?teamId='+teamId);">-->
                    <a class="mui-navigate-right">
                        <div class="mui-slider-cell">
                            <div class="oa-contact-cell mui-table">
                                <div class="oa-contact-avatar mui-table-cell">
                                    <span class="oa-pic-default mui-icon iconfont icon-jiesan"></span>
                                </div>
                                <div class="oa-contact-content mui-table-cell">
                                    <h4 class="oa-contact-name">解散团队</h4>
                                </div>
                            </div>
                        </div>
                    </a>
                </li>
            </ul>

            <!--遮罩层-->
            <div class="mui-popup-backdrop" style="display: none; opacity: 0.5" v-show="shade" v-on:click="hide_shade"></div>
            <!--输入密码弹框开始-->
            <div id="updateMember" class="mui-popup popup-pure mui-popup-in" style="display: none" v-show="jsTeamDiv">
                <div class="mui-popup-title">解散团队</div>
                <form class="mui-input-group">
                    <div class="sppd-5">
                        <div class="mui-input-row">
                            <label class="mui-text-left">密码</label>
                            <input type="password" class="mui-input-clear mui-input" placeholder="请输入密码"  id="pwd">
                        </div>
                    </div>
                    <!--<p class="content-note"><i>国际手机号需添加国家码，如+1-xxxxxx</i></i></p>-->
                    <div class="mui-button-row mui-table">
                        <button type="button" class="mui-table-cell mui-btn" @click="dissolutionTeam">解散</button>
                        <!--<button type="button" class="mui-table-cell mui-btn" @click="save_member(0)">保存并继续添加</button>-->
                    </div>
                </form>
            </div>
            <!--输入密码弹框结束-->
        </section>
    </div>
</template>

<script>
export default {
    data(){
        return{
            jsTeamDiv:false,
            shade:false,
            none:{},
            teamId: ''
        }
    },
    created () {
        var _self = this;
        this.teamId = this.$route.query.teamId;
        this.$http.post("/api/concats_api/find_team_info?teamId="+this.teamId).then(function (response) {
            _self.$data.none = response.data.result;
            var teamName = response.data.result.teamName;
        }).catch(function (error) {
            console.info(error);
        });
    },
    methods:{
        staff(){
            this.$router.push({path:'/groupAddress',query:{teamId:this.teamId}})
        },
        goBack(){
            this.$router.go(-1)
        },
        hide_shade(){
            this.jsTeamDiv = false;
            this.shade = false;
        },
        gorenzheng (teamId) {//进入企业认证
            var url = "/api/static/webstatic/qiyerenzh/group_certification_company.html?teamId="+teamId;
            window.appApi.openNewWindow(url);
        },
        jsTeam () {
            layer.open({
                content: '解散后，该团队的所有数据将被清除，请谨慎操作。确定要解散团队？',
                icon: 1
                ,btn: ['确认', '取消']
                ,yes: function(index, layero){
                    //remin(index);
                    var layerId = "layui-m-layer"+index;
                    document.getElementById(layerId).setAttribute("style","display:none;");

                    app.jsTeamDiv = true;
                    app.shade = true;
                    //remin("请输入密码!",2);
                    /*var param = {deleteType:"1",friendsUserId:userId};
                        axios.post(getUrl()+"/concats_api/delete_friend",param).then(function (response){
                        remin("好友删除成功!",2);
                        window.appApi.closeNewWindow();
                        }).catch(function (error) {
                        remin("好友删除失败,请联系管理员!",2);
                        });*/
                }
            });
        },
        dissolutionTeam () {
            var pwd = document.getElementById("pwd").value;
            var param = {teamId:teamId,teamName:this.none.teamName,password:pwd};
            this.$http.post("/api/concats_api/delete_team",param).then(function (response){
                var resp = response.data;
                if(resp.code==400){
                    layer.open({
                        content: "密码输入错误，请输入正确的密码!"
                        ,skin: 'msg'
                        ,time: 1 //2秒后自动关闭
                        ,anim:false
                    });
                    return;
                }
                remin("团队已解散!",2);
                window.appApi.closeNewWindow();
            }).catch(function (error) {
                remin("团队解散失败,请联系管理员!",2);
            });
        }
    }
}
</script>

<style scoped>
    .text{
        text-align:left;
    }
    .layui-m-layerbtn span{
        width:50%;
    }
    .posi{
        position: relative;
        left:-143px;
    }
    .layui-m-layerbtn span{
        width:50%;
    }
</style>
