<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <button id="btn-referrer" class="mui-btn mui-action-back mui-btn-link mui-btn-nav mui-pull-left" @click="goback">
                <span class="mui-icon mui-icon-back"></span>返回
            </button>
            <h1 class="mui-title">印章列表</h1>
            <!-- href="javascript:appApi.openNewWindow(pagepath+'/dish/sign_seal_save.html?sealType='+type+'&opType=0&teamId='+tpId)" -->
            <a id="menu" class="mui-icon iconfont icon-add02 mui-pull-right" @click="sign"></a>
        </header>
        <section class="mui-content" id="sign_list">
            <!--<div class="mui-indexed-list-search mui-input-row mui-search">
                <input type="search" class="mui-input-clear mui-indexed-list-search-input" placeholder="搜索">
            </div>-->
            <ul class="mui-table-view invita-list" >
                <li class="mui-table-view-cell" v-for="(item,index) in items" :key="index">
                    <!--<div class="oa-contact-cell mui-table">
                        <div class="oa-contact-avatar mui-table-cell">
                            <img :src="item.avatar | getImageUrl">
                        </div>
                        <div class="oa-contact-content mui-table-cell">
                            <h4 class="oa-contact-name" v-text="item.userName"></h4>
                            <p>手机号：<span v-text="item.cellPhone"></span></p>
                        </div>
                    </div>
                    <button v-if="item.applyType=='others' && item.status=='0'"  :onclick="['appNf.agreeFriends('+item.addId+','+item.addUserId+',\''+item.cellPhone+'\',\''+item.userName+'\')']" class="mui-btn mui-btn-success">接受</button>
                    <button v-if="item.applyType=='my' && item.status=='0'" class="mui-btn mui-btn-link mui-badge mui-badge-inverted">等待验证</button>
                    @click="javascript:appApi.openNewWindow(pagepath+'/dish/sign_seal_save.html?sealType='+type+'&opType=1&id='+item.id)"
                    <button v-if="item.status=='1'"  class="mui-btn mui-btn-link mui-badge mui-badge-inverted">已添加</button>-->
                    <div  style="text-align: center;">
                        <img :src="item.sealData" style="max-height: 10em;max-width: 10em;">
                        <span v-if="item.isDefaultSign=='1'" class="color-danger">默认</span>
                    </div>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
export default {
    data(){
        return{
            type:this.$route.query.type,
            tpId:this.$route.query.code,
            code:this.$route.query.code,
            items:[]
        }
    },
    created: function () {
        var _self = this;
        this.$http.post("/api/sign/query_seal_list",{sealType:this.type,businessId:this.tpId}).then(function (response) {
            
            _self.items = response.data.result;
            console.info(response.data.result);
        }).catch(function (error) {
            console.info(error);
        });
	},
    mounted(){
        appApi.setPullRefresh(true);
        // var sessionid = BackCookie.getCookie("sessionid");
        // var userid = BackCookie.getCookie("userid");
        var url="";
        try{
            url = $str.decodeURLComponent(window.location.href);// 加密过的rul
        }catch (e){
            url = window.location.href;// 未加密的rul
        }
    //	var type = window.location.href.split("?")[1].split("=")[1].split("&")[0];//类型(0企业，1项目)
    //	var tpId = window.location.href.split("?")[1].split("=")[2];//企业或者项目ID
        var teamName;//团队名称
        function reLoad(){
            window.location.reload();
        }
    },
    methods:{
        goback(){
            this.$router.go(-1)
        },
        sign(){
            // sealType='+type+'&opType=0&teamId='+tpId
            this.$router.push({path:'/signListsave',query:{sealType:this.type,opType:0,teamId:this.tpId}})
        }
    }
}
</script>

<style>

</style>
