<template>
  <div id="app">
    <header class="mui-bar mui-bar-nav">
    <!--<button id="btn-referrer" class="mui-btn mui-btn-link mui-action-back mui-btn-nav mui-pull-left hide">-->
      <!--<span class="mui-icon mui-icon-back"></span>-->
      <!--返回-->
    <!--</button>-->
    <button id="btn_referrer" class="mui-btn mui-btn-link mui-action-back mui-pull-left" @click="goBack"><span class="mui-icon iconfont icon-back"></span>返回</button>
    <h1 class="mui-title">我的企业</h1>
    <!--<a class="mui-icon iconfont icon-add02 mui-pull-right" onclick="javascript:appApi.openNewWindow(pagepath+'/mycenter/team_info_create.html')"></a>-->
  </header>

  <section class="mui-content" id="project_personnel_list">
    <!--<div id="pullrefresh" class="mui-content mui-scroll-wrapper"  style="padding-top: 44px">-->

      <!--v-if="item.type==0"-->
      <ul class="mui-table-view group-list list-clearance">
        <div v-if="items.length>0" v-for="(item,index) in items" :key="index">
          <li class="mui-table-view-cell item top">
            <a class="mui-navigate-right" @click="enterprise(item)">
              <div class="oa-contact-content mui-table-cell">
                <h4 class="oa-contact-name" v-text="item.teamName"></h4>
                <p class="oa-contact-email mui-clearfix"><span class="mui-pull-le ft">项目数量：<span class="data" v-text="item.projectNum"></span></span></p>
              </div>
            </a>
          </li>
        </div>
      </ul>
      <!--<a  v-if="item.type==1">-->
        <!--<div class="multi-con" >-->
          <!--<p v-text="item.teamName"></p>-->
          <!--<p class="secondary" v-text="item.teamCode"></p>-->
        <!--</div>-->
        <!--<span class="mui-badge mui-badge-inverted" v-text=""></span>-->
      <!--</a>-->
    <!--</div>-->
  </section>
  </div>
</template>

<script>
import {BackCookie} from '../../../playform/common.js'
import setting from '../../../playform/config.js'
export default {
  data () {
    return {
      items:[]
    }
  },
  mounted(){
    // var webPath = setting.getUrl();
    // var pagepath = setting.getPagePath();
    appApi.setPullRefresh(true);
    //获取参数
    var urlParam = window.location.href.split("?")[1];
    var map = {};
    if(urlParam){
        var arrays= urlParam.split("&");
        for(i=0; i<arrays.length; i++){
            var param = arrays[i].split("=");
            map[param[0]] = decodeURI(param[1]);
        }
    }

    function reLoad(){
        window.location.reload();
    }
  },
  created() {
    appApi.hideMenu()
      this.loadData();
      var _self = this;
      var formparam = new FormData();
      formparam.append("userId",BackCookie.getCookie("userid"))
      this.$http.post("/concats_api/query_team_list_info",formparam).then(function (response) {
        _self.$data.items = response.data.result;
        console.log("结果",response.data.result)
      }).catch(function (error) {
          console.info(error);
      });
  },
  methods:{
    enterprise(item){
      this.$router.push({path:'/static/webstatic/mycenter/enterprise_home.html',query:{teamId:item.id,teamCode:item.teamCode,tagName:item.tagName}})
    },
    hide_shade: function(){
        this.jsTeamDiv = false;
        this.shade = false;
    },
    loadData: function(){
    },
    goBack(){
      this.$router.go(-1)
    }
  }
}
</script>

<style type="text/css" scoped>
  .top{
     margin-bottom:10px
  }
</style>
