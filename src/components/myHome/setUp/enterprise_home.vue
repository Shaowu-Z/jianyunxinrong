<template>
    <div id='main_content'>
        <header class="mui-bar mui-bar-nav">
            <div>
                <button class="mui-btn mui-btn-link mui-pull-left" @click="goBack"><span class="mui-icon iconfont icon-back"></span>返回</button>
                <!-- {{lastlog.zhiyeCompany[lastlog.zy.zhiyetagid].teamName | substring(6)}} -->
                <h1 class="mui-title "><label>{{companyList.teamName}}</label></h1>
            </div>
        </header>
        <!--分组图标-->
        <div class="module01 top">
            <div class="module01-head" style="padding:21px 15px"><span class="title line-title abso">项目列表</span></div>
            <ul class="mui-table-view">
                <li class="mui-table-view-cell" @click="onFuwuclick(item)" v-for="(item,index) in projectList" :key="index">
                    <div class="div">
                        <div class="oa-contact-cell mui-table">
                            <div class="oa-contact-avatar mui-table-cell">
                                <img v-if='!item.img_url' src="../../../assets/images/defualt.png">
                                <img v-if="item.img_url" :src="item.img_url">
                            </div>
                            <div class="oa-contact-content mui-table-cell">
                                <h4 class="oa-contact-name">{{item.ProjectName}}</h4>
                                <p class="oa-contact-email mui-clearfix">
                                    <span class="mui-pull-left">开工日期：
                                        <span class="data"></span>
                                    </span>
                                    <span class="mui-pull-right project-data">
                                        <span class="data">{{item.Zaojia || 0}}万</span>
                                    </span>
                                </p>
                                <p>
                                    <span class="mui-pull-left">
                                        <span class="data">{{item.name}}</span>
                                    </span>
                                    <span class="mui-pull-right project-data">
                                        <span class="data">{{item.roomUserName || "null"}}</span>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { Toast  } from 'mint-ui';
export default {
    data () {
        return {
            companyList:[],
            ModulesList:[],
            projectList:[]
        }
    },
    created(){
        // this.Occupation()
        this.queryCompany()
        // this.queryModules()
        this.queryProjectlist()
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        },
        //查询当前用户的职业标签
        Occupation(){
            this.$http.post('/work_api/queryTag',).then(function(res){
                console.log(res);
            }).catch(function(error){
                Toast({
                    message: "网络异常",
                    position: 'bottom',
                    duration: 1000
                });
            })
        },
        // 获取公司信息
        queryCompany(){
            let _self = this
            var formData=new FormData()
            formData.append("teamId",this.$route.query.teamId)
            this.$http.post('/concats_api/query_team',formData).then(function(res){
                // console.log(res);
                _self.companyList = res.data.result[0]
                console.log(res.data.result[0])
            }).catch(function(error){
                Toast({
                    message: "网络异常",
                    position: 'bottom',
                    duration: 1000
                });
            })
        },
        // 获取展示信息列表
        // queryModules(){
        //     let item ={zhiyetag:'',homePage:''}
        //     let _self = this
        //     this.$http.get("/work_api/findOneselfHome?zhiyetag=company_leader&homePage=2").then(function(res){
        //         _self.ModulesList = res.data.result[0]
        //         console.log(_self.ModulesList)
        //     }).catch(function(error){

        //     })
        // },
        queryProjectlist(){
            let item = 'used=getConPro&whereOther='+this.$route.query.teamCode
            let _self = this
            this.$http.post("/chart/column/table_swprojectinfo",item).then(function(res){
                _self.projectList = res.data.result
                console.log(_self.projectList)
            }).catch(function(error){

            })
        },
        onFuwuclick: function (item) {//点击分组服务
            console.log(this.$route.query.tagName)
            this.$router.push({path:'/static/webstatic/work/project_application.html',query:{projectSN:item.serialNum,tagName:this.$route.query.tagName,teamCode:item.identifyNo,room_id:item.room_id}})
        },
    }
}
</script>

<style type="text/css" scoped>
    .top {
        margin-top: 45px;
    }
    .abso{
        position: absolute!important;
        left: 10px;
        top: 10px;
    }
    .div{
        position: relative;
        display: block;
        overflow: hidden;
        margin: -11px -15px;
        padding: inherit;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: inherit;
    }
</style>
