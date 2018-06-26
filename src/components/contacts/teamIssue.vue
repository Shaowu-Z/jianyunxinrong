<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <button id="btn-referrer" class="mui-action-back mui-btn mui-btn-link mui-btn-nav mui-pull-left" @click="goBack">
                <span class="mui-icon mui-icon-back"></span>返回
            </button>
            <h1 class="mui-title">资质等级</h1>
            <!--<a class="mui-action-back mui-icon iconfont icon-back"></a>-->

            <a href="javascript:;" @click="openAdd" class="mui-icon mui-icon-plus mui-pull-right"></a>
        </header>
        <section id="team_issues" class="mui-content mycenter-content">
            <div v-for="(issue,index) in issue_list" :key="index">
                <ul class="mui-table-view eg-table-view">
                    <li class="mui-table-view-cell fold-title">
                        <a>
                            <div class="oa-contact-cell mui-table">
                                <div class="oa-contact-content mui-table-cell" 	@click="Issue(index)">
                                    <h4 class="oa-contact-name">{{issue.gradeNames}}</h4>
                                </div>
                                <div class="oa-contact-avatar mui-table-cell"><img  @click="stopEvt(event),disposeLogImg(0,issue.smallImg)" class=" pic-certificate" :src ="issue.issueUrl"/></div>
                            </div>
                        </a>
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
            teamId:"",
		    issue_list: [],
        }
    },
    created () {
		var _self = this;
		//获取参数
		var url_params = this.$route.query.teamId;
			_self.$data.teamId = url_params.teamId;
			this.$http.get("/app_team_rz/get_issues?teamId=" + url_params).then(function (response) {
				if (response.data.code == 0) {
                    var rs = response.data.result;  
					_self.issue_list = rs.issue_list;
                    _self.image_host = rs.image_host;
                    console.log(_self.issue_list);
				} else {
					msg(response.data.message);
				}
			}).catch(function (error) {
				console.info(error);
			});
        appApi.imgPreview.init();
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        },
        Issue(index){
            this.$router.push({path:'/addTeamIssue',query:{id:this.issue_list[index].id,teamId:this.issue_list[index].teamId}})
        },
        openAdd(index){
            console.log(this.issue_list);
            this.$router.push({path:'/addTeamIssue',query:{teamId:this.$route.query.teamId}})
        }
    }
}
</script>

<style scoped>
        .mui-fullscreen {
			position: fixed;
			z-index: 20;
			background-color: #000;
		}
		.oper{
			display: inline-block;
            float:right;
		}
</style>
