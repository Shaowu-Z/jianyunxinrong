<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <button id="btn-referrer" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left" @click="goBack">
                <span class="mui-icon mui-icon-back"></span>返回
            </button>
            <h1 class="mui-title">新的好友</h1>
        </header>


        <section class="mui-content" id="new_friends">
            <!--<div class="mui-indexed-list-search mui-input-row mui-search">
                <input type="search" class="mui-input-clear mui-indexed-list-search-input" placeholder="搜索">
            </div>-->
            <ul class="mui-table-view invita-list" >
                <li class="mui-table-view-cell" v-for="(item,index) in items" :key="index">
                    <div class="oa-contact-cell mui-table">
                        <div class="oa-contact-avatar mui-table-cell">
                            <!--<span class="oa-pic-default bgr2" v-text="item.userName"></span>-->
                            <img :src="item.avatar | getImageUrl">
                        </div>
                        <div class="oa-contact-content mui-table-cell">
                            <h4 class="oa-contact-name" v-text="item.userName"></h4>
                            <p style="text-align:left">手机号：<span v-text="item.cellPhone"></span></p>
                        </div>
                    </div>
                    <button v-if="item.applyType=='others' && item.status=='0'"  @click="agreeFriends(item.addId,item.addUserId,item.cellPhone,item.userName)" class="mui-btn mui-btn-success">接受</button>
                    <button v-if="item.applyType=='my' && item.status=='0'" class="mui-btn mui-btn-link mui-badge mui-badge-inverted">等待验证</button>
                    <button v-if="item.status=='1'"  class="mui-btn mui-btn-link mui-badge mui-badge-inverted">已添加</button>
                </li>
                <!--<li v-if="item.applyType=='others' && item.status=='0'" class="mui-table-view-cell">
                    <div class="oa-contact-cell mui-table">
                        <div class="oa-contact-avatar mui-table-cell"><span class="oa-pic-default bgr2" v-text="item.userName"></span></div>
                        <div class="oa-contact-content mui-table-cell">
                            <h4 class="oa-contact-name" v-text="item.userName"></h4>
                            <p>手机号：<span v-text="item.cellPhone"></span></p>
                        </div>
                    </div>
                    <button :onclick="['appNf.agreeFriends('+item.addId+','+item.addUserId+',\''+item.cellPhone+'\',\''+item.userName+'\')']" class="mui-btn mui-btn-success">接受</button>

                </li>
                <li v-if="item.applyType=='my' && item.status=='0'" class="mui-table-view-cell">
                    <div class="oa-contact-cell mui-table">
                        <div class="oa-contact-avatar mui-table-cell"><span class="oa-pic-default bgr2" v-text="item.userName"></span></div>
                        <div class="oa-contact-content mui-table-cell">
                            <h4 class="oa-contact-name" v-text="item.userName"></h4>
                            <p>手机号：<span v-text="item.cellPhone"></span></p>
                        </div>
                    </div>
                    <button class="mui-btn mui-btn-link mui-badge mui-badge-inverted">等待验证</button>
                </li>
                <li v-if="item.status=='1'" class="mui-table-view-cell">
                    <div class="oa-contact-cell mui-table">
                        <div class="oa-contact-avatar mui-table-cell"><span class="oa-pic-default bgr2" v-text="item.userName"></span></div>
                        <div class="oa-contact-content mui-table-cell">
                            <h4 class="oa-contact-name" v-text="item.userName"></h4>
                            <p>手机号：<span v-text="item.cellPhone"></span></p>
                        </div>
                    </div>
                    <button class="mui-btn mui-btn-link mui-badge mui-badge-inverted">已添加</button>
                </li>-->

            </ul>
            <!--<p class="no-group"  >当前没有申请信息</p>-->
        </section>
    </div>
</template>

<script>
export default {
    data(){
        return{
            items:[]
        }
    },
    created: function () {
        var _self = this;
        this.$http.post("/concats_api/find_new_friends").then(function (response) {
             _self.$data.items = response.data.result;
             console.info(response.data.result);
         }).catch(function (error) {
            console.info(error);
         });

    },
    methods:{
        goBack(){
            this.$router.go(-1)
        },
        agreeFriends(addId,addUserId,cellPhone,userName) {
            //alert(addId+'--'+'--'+addUserId+'----'+cellPhone+'-----'+userName);
            var addVo = {addId:addId,addUserId:addUserId,cellPhone:cellPhone,userName:userName};
            console.info(addVo);
            this.$http.post("/concats_api/insert_friend_info",addVo).then(function (response) {
                loading('好友添加成功！');
                window.location.href="../contacts/address_list.html";
            }).catch(function (error) {
                console.info(error);
            });
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

</style>
