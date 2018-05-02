<template>
  <div id="app">
    <header class="mui-bar mui-bar-nav">
    <!--<button id="btn-referrer" class="mui-btn mui-btn-link mui-action-back mui-btn-nav mui-pull-left hide">-->
      <!--<span class="mui-icon mui-icon-back"></span>-->
      <!--返回-->
    <!--</button>-->
    <!--<button id="btn_referrer" class="mui-btn mui-btn-link mui-action-back mui-pull-left"><span class="mui-icon iconfont icon-back "></span>返回</button>-->
    <h1 class="mui-title">我的企业</h1>
    <!--<a class="mui-icon iconfont icon-add02 mui-pull-right" onclick="javascript:appApi.openNewWindow(pagepath+'/mycenter/team_info_create.html')"></a>-->
  </header>

  <section class="mui-content" id="project_personnel_list">
    <!--<div id="pullrefresh" class="mui-content mui-scroll-wrapper"  style="padding-top: 44px">-->
    <div class="singlebox" v-for="(item,index) in items" :key="index">

      <!--v-if="item.type==0"-->
      <a class="mui-navigate-right" :href="['javascript:appApi.openNewWindow(pagepath+\'/mycenter/enterprise_home.html?teamId='+item.id+'&teamCode='+item.teamCode+'&tagName='+item.tagName+'\')']">
        <div class="multi-con" >
          <p v-text="item.tagName"></p>
          <p v-text="item.teamName"></p>
          <p class="secondary" v-text="item.teamCode"></p>
        </div>
        <span class="mui-badge mui-badge-inverted"></span>
      </a>
      <!--<a  v-if="item.type==1">-->
        <!--<div class="multi-con" >-->
          <!--<p v-text="item.teamName"></p>-->
          <!--<p class="secondary" v-text="item.teamCode"></p>-->
        <!--</div>-->
        <!--<span class="mui-badge mui-badge-inverted" v-text=""></span>-->
      <!--</a>-->
    </div>
    <!--</div>-->
  </section>
  </div>
</template>

<script>
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
    created: ()=> {
            var _self = this;
            this.loadData();
    }
    function reLoad(){
        window.location.reload();
    }
  },
  methods:{
    hide_shade: function(){
        this.jsTeamDiv = false;
        this.shade = false;
    },
    loadData: function(){
      var _self = this;
      var formparam = new FormData();
      formparam.append("userId",BackCookie.getCookie("userid"))
      this.$http.post("http://java.winfreeinfo.com/concats_api/query_team_list_info",formparam).then(function (response) {
        console.log(1111);
          //console.log("结果",response.data.result)
          _self.$data.items = response.data.result;
      }).catch(function (error) {
          console.info(error);
      });
    }
  }
}
</script>

<style>

</style>
