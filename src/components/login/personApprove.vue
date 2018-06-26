<template>
  <div id="app">
    <header class="mui-bar mui-bar-nav">
        <button id="btn-referrer" class="mui-action-back mui-btn mui-btn-link mui-btn-nav mui-pull-left" @click="goback">
            <span class="mui-icon mui-icon-back"></span>返回
        </button>
        <h1 class="mui-title">个人认证</h1>
    </header>
    <section class="mui-content mycenter-content" id="user_auth">
        <ul class="mui-table-view eg-table-view eg-detail-list">
            <!--
                        <li class="mui-table-view-cell my-header-pic">头像<span class="mui-badge mui-badge-inverted"><img src="../../images/60x60.gif"></span><input type="file"></li>
            -->
            <li class="mui-table-view-cell mui-input-row">
                <label>姓名
                    <small>*</small>
                </label>
                <input type="text" id="nickName" name="nickName" placeholder="请填写您的真实姓名"/>
            </li>
            <li class="mui-table-view-cell mui-input-row">
                <label>手机号码
                    <small>*</small>
                </label>
                <input type="text" id="cellPhone" name="cellPhone" readonly="readonly"
                    placeholder="请填写您的手机号码"/>
                <input type="hidden" name="userId" id="userId">
            </li>
            <li class="mui-table-view-cell mui-input-row">
                <label>身份证号
                    <small>*</small>
                </label>
                <input type="text" id="idCard" name="idCard" value="" placeholder="请填写您的身份证号"/>
            </li>
            <!--<li class="mui-table-view-cell">
                <a class="mui-navigate-right">性别
                <span class="mui-badge mui-badge-inverted">
                    <input type="radio" name="gender" value="true" checked="checked">男
                    <input type="radio" name="gender" value="false">女
                </span></a>
            </li>
            <li class="mui-table-view-cell">
                <a class="mui-navigate-right">所在地区<span class="mui-badge mui-badge-inverted">请选择</span></a>
            </li>
            <li class="mui-table-view-cell mui-input-row">
                <label>详细地址</label>
                <input type="text" value="" placeholder="详细地址"/>
            </li>-->
        </ul>
        <div class="btn-box">
            <button class="mui-btn mui-btn-primary mui-btn-block" onclick="user_auth.doCheck()">立即认证</button>
        </div>
    </section>
  </div>
</template>

<script>
export default {
    data (){
        return {

        }
    },
    methods:{
        goback(){
            this.$router.go(-1)
        }
    },
    mounted(){

    },
}
</script>

<style leng='less' scoped>
    @import '../../assets/css/common/style.less';
    label{
        text-align: left
    }
</style>
