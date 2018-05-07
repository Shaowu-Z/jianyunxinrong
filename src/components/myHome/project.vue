<template>
  <div id="app">
      <header class="mui-bar mui-bar-nav">
		<!--<a class="mui-action-back mui-icon iconfont icon-close"></a>-->
		<h1 class="mui-title">我的项目</h1>
	</header>
	<section class="mui-content" id="app" >
		<ul class="mui-table-view eg-table-view search-list">
			<div v-for="(item,index) in list" :key="index">
				<li class="mui-table-view-cell" >
					<div @click="onProjectDetail(item)">
						<div class="view-pic">
							<img src="../../assets/images/defualt.png">
						</div>
						<h4 class="oa-title" v-text="item.projectName"></h4>
						<section>
							<p class="mui-clearfix"><span class="mui-pull-left"><span class="data">{{item.ProjectName}}</span></span></p>
							<p class="mui-clearfix"><span class="mui-pull-left">开工日期：<span class="data">{{item.MissionStartDateOriginal}}</span></span></p>
						</section>
					</div>
				</li>
			</div>
		</ul>
	</section>
  </div>
</template>

<script>
export default {
    data(){
        return{
			list:[],
        }
    },
    methods:{

    },
    created(){
			const _self=this
            this.$http.post("/api/chart/column/table_swprojectinfo?used=getMyPro",{}).then(function (response) {
				console.log(response);
				_self.list = response.data.result;
				console.log(_self.list);
            }).catch(function (error) {
                console.info(error);
            });
    }
}
</script>

<style>
.mui-table-view-cell div{
	display: flex;
	
}
.view-pic{
	width:60px;
	height:60px;
	margin-right: 10px;
}
.view-pic img{
	width:60px;
	height:60px;
}
</style>
