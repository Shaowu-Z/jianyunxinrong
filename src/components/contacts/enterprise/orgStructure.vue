<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <button id="btn-referrer" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left" @click="goBack">
                <span class="mui-icon mui-icon-back"></span>返回
            </button>
            <h1 class="mui-title">组织架构</h1>
            <button id='done' style="display: none" class="mui-btn mui-btn-nav mui-btn-primary mui-pull-right mui-disabled" onclick="groupChat(window.location.href.split('?')[1].split('=')[2].split('&')[0])">确定</button>
        </header>
        <section class="mui-content" id="member_list">
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
                    <div class="group-header text" id="dept_head">{{none.teamName}}</div>
                </ul>
                <!--子部门列表-->
                <ul class="mui-table-view eg-table-view eg-detail-list" id="deptHtml">
                    <li class="mui-table-view-cell text" v-for="(item,index) in newJson" :key="index" @click="department(index)">
                        <a class="mui-navigate-right">{{item.deptName}}<span class="mui-badge mui-badge-inverted"></span></a>
                        </li>
                </ul>
                <ul class="mui-table-view" v-for="(item,index) in items" :key="index">
                    <li v-show="from==0" class="mui-table-view-cell text" @click="detailed(index)">
                        <a>
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
export default {
    data(){
        return{
            items:[],
            from: this.$route.query.from,
            none: [],
            newJson:[],
            urlPram: ''
        }
    },
    created() {
        var _self = this;
        this.from = this.$route.query.from;
        console.log(this.from);
        if(this.from==1){//名片发送
            let teamId = this.$route.query.teamId;
            let userId = this.$route.query.userId;
            // setDeptHead('x','n',teamId,0,userId);//获取头部信息
            this.$http.post("/api/concats_api/find_team_info?teamId=" + this.$route.query.teamId).then(function (response) {
                console.log(response.data.result);
                _self.none = response.data.result;
                var teamName = response.data.result.teamName;
            }).catch(function (error) {
                console.info(error);
            });
        }else if(this.from==0){//组织架构
            let teamId = this.$route.query.teamId;
            // setDeptHead('y','n',teamId,0,userId);//获取头部信息
            this.$http.post("/api/concats_api/find_team_info?teamId=" + this.$route.query.teamId).then(function (response) {
                console.log(response.data.result);
                _self.none = response.data.result;
                var teamName = response.data.result.teamName;
            }).catch(function (error) {
                console.info(error);
            });
        }else if(this.from==2){//发起群聊
            let teamId = this.$route.query.teamId;
            let userId = this.$route.query.userId;
            // setDeptHead('x','n',teamId,0,userId);//获取头部信息
            this.$http.post("/api/concats_api/find_team_info?teamId=" + this.$route.query.teamId).then(function (response) {
                console.log(response.data.result);
                _self.none = response.data.result;
                var teamName = response.data.result.teamName;
            }).catch(function (error) {
                console.info(error);
            });
            //$("#done").show();//显示确认操作按钮
        }

        var param = {teamId:this.$route.query.teamId};
        this.$http.post("/api/concats_api/query_team_members",param).then(function (response) {
            _self.items = response.data.result;
            console.info("team",response.data.result);
        }).catch(function (error) {
            console.info(error);
        });

        //deptHtml 获取一级部门
        //var teamId = window.location.href.split('?')[1].split('=')[1];
        var par = {deptId:0,teamId:this.$route.query.teamId,isOrg:"y"};
        console.info(par);
        this.$http.post("/api/concats_api/query_dept_list",par).then(function (response) {
            _self.newJson =response.data.result;
            console.info(_self.newJson);

            // var deptHtml = '';
            // for(var j=0;j<newJson.length;j++){
            //     var arrJ = newJson[j];
            //     var teamId = arrJ.teamId;
            //     var deptId = arrJ.deptId;
            //     var deptName = arrJ.deptName;
                _self.urlPram = 'y';//默认为组织架构进入
                if(_self.from==1){//发送名片
                    urlPram='x&userId='+userId;
                }else if(_self.from==2){//发起群聊(userId做为群聊成员临时ID)
                    urlPram='g&tempId='+userId;
                }
                // deptHtml+='<li class="mui-table-view-cell" style="text-align:left">'+
                //         '<a class="mui-navigate-right" v-on:clcik="department(urlPram,teamId,deptId)">'+deptName+'<span class="mui-badge mui-badge-inverted"></span></a>'+
                //         '</li>';
                //         // <a class="mui-navigate-right" ></a>
            // }
            // document.getElementById("deptHtml").innerHTML=deptHtml;
            // document.getElementById("member_list").style.display = "block";
        }).catch(function (error) {
            //alert("获取部门信息失败,请联系管理员!");
            console.info(error);
        });

    },
    methods:{
        detailed(index){
            this.$router.push({path:'/eg_details',query:{userId:this.items[index].userId}})
        },
        department(index){
            console.log(index)
            this.$router.push({path:'/subdivision',query:{org:this.urlPram,teamId:this.newJson[index].teamId,deptId:this.newJson[index].deptId}})
        },
        clickshow: function () {
            return true;
        },
        goBack(){
            this.$router.go(-1)
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
        text-align:left;
    }
</style>
