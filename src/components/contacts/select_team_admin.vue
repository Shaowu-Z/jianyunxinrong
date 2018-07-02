<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title">管理员设置</h1>
            <button id="btn-referrer" class="mui-action-back mui-btn mui-btn-link mui-btn-nav mui-pull-left" @click="goBack"><span
                    class="mui-icon mui-icon-back"></span>返回
            </button>
            <a id="menu" class="mui-btn mui-btn-link mui-btn-nav mui-pull-right" @click="showhide">批量操作</a>
        </header>
        <section class="mui-content" id="admin_list">
            <!--div class="mui-indexed-list-search mui-input-row mui-search">
                <input type="search" class="mui-input-clear mui-indexed-list-search-input" placeholder="搜索">
            </div-->
            <div class="mui-indexed-list-inner group-box">
                <ul class="mui-table-view" v-for="(item,index) in items" :key="index">
                    <li class="mui-table-view-cell">
                        <div class="oa-contact-cell mui-table">
                            <div class="oa-contact-avatar mui-table-cell"><img :src="item.userAvatar | getImageUrl"></div>
                            <div class="oa-contact-content mui-table-cell"><h4 class="oa-contact-name" v-text="item.memberName"></h4></div>
                        </div>
                        <!--<span class="mui-icon iconfont icon-edit2" :onclick="['javascript:appApi.openNewWindow(getUrl()+\'/static/webstatic/contacts/contact_edit.html?memberId='+item.memberId+'\')']"></span>-->
                    </li>

                </ul>
            </div>
        </section>
        <div :class="{'mui-backdrop mui-active' : show == true}" @click="showhide"></div>
        <div id="popover-more" class="mui-popover top-menu" :class="{'show' : this.show === true}">
            <div class="mui-popover-arrow" style="left: 154px;"></div>
            <ul class="mui-table-view">
                <li class="mui-table-view-cell"><a @click="add"><span class="mui-icon iconfont icon-piliang-add"></span>批量增加管理员</a>
                </li>
                <li class="mui-table-view-cell"><a @click="edit"><span class="mui-icon iconfont icon-piliang-delete"></span>批量删除管理员</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            add_type:false,
			shade:false,
            items:[],
            show:false,
        }
    },
    created: function () {
		var _self = this;
        var teamId = this.$route.query.teamId;
        var param = {teamId:teamId,queryType:2};//查询团队管理员列表
        this.$http.post("/concats_api/query_team_members",param).then(function (response) {
            _self.items = response.data.result;
            console.info(response.data.result);
        }).catch(function (error) {
            console.info(error);
        });
    },
    methods:{
        showhide(){
            this.show = !this.show
        },
        goBack(){
            this.$router.go(-1)
        },
        hide_shade:function () {
            this.shade=true;
        },
        add(){
            // '/static/webstatic/contacts/batchOpeMember.html?type=8&teamId='+window.location.href.split('?')[1].split('=')[1])
            this.$router.push({path:'/batchOpeMember',query:{type:8,teamId:this.$route.query.teamId}});
        },
        edit(){
            //  '/static/webstatic/contacts/batchOpeMember.html?type=9&teamId='+window.location.href.split('?')[1].split('=')[1])
            this.$router.push({path:'/batchOpeMember',query:{type:9,teamId:this.$route.query.teamId}});
        }
    },
    filters: {
        getImageUrl: function (val) {
            if(val==null || val=="") return "/static/images/60x60.gif";
            return val;
        }
    }
}
</script>

<style type="text/css" scoped>
    .show{
        opacity: 1!important;
        display: block;
        right: 5px;
        top: 55px;
    }
</style>
