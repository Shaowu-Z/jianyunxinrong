<template>
  <div id="app">
      <header class="mui-bar mui-bar-nav">
		<!--<a class="mui-action-back mui-icon iconfont icon-close"></a>-->
		<h1 class="mui-title">我的项目</h1>
	</header>
	<section class="mui-content" id="team_list" >
		<ul class="mui-table-view eg-table-view search-list">
	        <!--工头、材料采购商项目列表-->
			<ul>
				<li class="mui-table-view-cell">
					<a>
					<div class="view-pic">
						<!-- <img v-if="item.img_url!=undefined && item.img_url!='undefined'" v-bind:src=imgurl+item.img_url>
						<img v-if="item.img_url==undefined || item.img_url=='undefined'" src="../../assets/images/defualt.png"> -->
						<!--<img src="../../images/defualt.png">-->
					</div>
					<h4 class="oa-title"></h4>
					<p class="mui-clearfix"><span class="mui-pull-left">开工日期：<span class="data"></span></span></p>
					</a>
				</li>
			</ul>
		</ul>
	</section>
  </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{

    },
    created(){
            this.$http.post("http://java.winfreeinfo.com//chart/column/table_swprojectinfo?used=getMyPro",{}).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.info(error);
            });
    }
}
</script>

<style>

</style>
