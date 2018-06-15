<template>
    <div id='main_content'>
        <header class="mui-bar mui-bar-nav">
            <div>
                <!-- {{lastlog.zhiyeCompany[lastlog.zy.zhiyetagid].teamName | substring(6)}} -->
                <h1 class="mui-title "><label>{{companyList.teamName}}</label></h1>
            </div>
        </header>
        <!--分组图标-->
        <div class="module01 top">
            <div class="module01-head" style="padding:21px 15px"><span class="title line-title abso">{{ModulesList.mingcheng}}</span></div>
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" @click="onFuwuclick(item.url,item.urlType)" v-for="(item,index) in projectList" :key="index">
                        <div class="menu-item">
                            <span :class="['mui-icon iconfont '+ (item.iconname==''?'icon-zixun':item.iconname)]"></span>
                            <span class="menu-item-name" v-text="item.mingcheng"></span>
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
        this.Occupation()
        this.queryCompany()
        this.queryModules()
        this.queryProjectlist()
    },
    methods:{
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
            let data={item:this.$route.query.teamId,}
            let _self = this
            this.$http.post('/concats_api/query_team',data).then(function(res){
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
        queryModules(){
            let item ={zhiyetag:'',homePage:''}
            let _self = this
            this.$http.get("/work_api/findOneselfHome?zhiyetag=company_leader&homePage=2").then(function(res){
                _self.ModulesList = res.data.result[0]
                console.log(_self.ModulesList)
            }).catch(function(error){

            })
        },
        queryProjectlist(){
            let item = 'used=getConPro&whereOther=123'
            let _self = this
            this.$http.post("/chart/column/table_swprojectinfo",item).then(function(res){
                _self.projectList = res.data.result
                console.log(_self.projectList)
            }).catch(function(error){

            })
        }
    }
}
</script>

<style scoped>
    .top {
        margin-top: 45px;
    }
    .abso{
        position: absolute!important;
        left: 10px;
        top: 10px;
    }
</style>
