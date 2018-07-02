<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon iconfont icon-back mui-pull-left" style="font-size:13px;line-height:28px;" @click="goBack">联系人</a>
            <div class="search-box" style="padding :6px 3px">
                <button type="button" class="btn-search" @click="onSearch">搜索</button>
                <div class="search-inner input-row">
                    <span class=" mui-icon mui-icon-search"></span>
                    <input type="search" id="searchStr" class=" search-input" placeholder="搜索" value="" ref="searchStr">
                </div>
            </div>
        </header>
        <section class="mui-content" id="team_search">

            <!--没有搜索到企业-->
            <div v-if="isNull" class="control-content">
                <div class="no-group">
                    <div class="no-record-img no-shop"></div>
                    <p>没有相关的企业</p>
                </div>
            </div>
            <div v-else>
                <ul class="mui-table-view eg-table-view group-list">
                    <li v-for="(item,index) in items" :key="index" class="mui-table-view-cell item">
                        <button v-if="item.applyState==1" class="mui-btn mui-btn-primary" @click="apply(item.teamId)">申请加入</button>
                        <button v-if="item.applyState==2" class="mui-btn mui-btn-link gray">已申请</button>
                        <button v-if="item.applyState==3" class="mui-btn mui-btn-link gray">已加入</button>
                        <div class="oa-contact-cell mui-table">
                            <!--<div class="oa-contact-avatar mui-table-cell">-->
                                <!--<img class="square" src="../../images/defualt.png" />-->
                            <!--</div>-->
                            <div class="oa-contact-content mui-table-cell">
                                <h4 class="oa-contact-name" v-text="item.teamName"></h4>
                            </div>
                        </div>
                    </li>

                </ul>
            </div>

        </section>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data(){
        return{
            searchStr:"",//用来搜索的字符串
            teamId:"",//团队信息表id
            teamName:"",//团队名称
            applyState:"",//申请状态
            isNull:false,
            items:{},
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        },
        //申请加入
        apply (teamId) {
            let formData = new FormData
            formData.append('teamId',teamId)
            let data="{teamId:5666}"
            var obj=new Object()
            obj.teamId=teamId
            this.$http.post("/project_team_info/send_add_team_News",formData).then(function(response){
                console.log(response);
                (function success(){
                    if(response.data.code==200||response.data.code==0){
                        // mui.toast("申请成功！")
                        Toast({
                            message: '申请成功！',
                            position: 'center',
                            duration: 1000
                        });
                    }else if(response.data.code==201){
                        // mui.toast(data.message)
                        Toast({
                            message: response.data.message,
                            position: 'center',
                            duration: 1000
                        });
                    }
                }())
            }).catch(function (error) {
		        console.log("申请失败！");
	        });
        },
        onSearch(){
            console.log(this.$refs.searchStr.value)
            let formData = new FormData
            formData.append('teamName',this.$refs.searchStr.value)
            // let data ={teamName:parseInt(this.$refs.searchStr.value)}
            let _self = this
            // console.log(formData);
            this.$http.post("/project_team_info/search_list",formData).then(function(response){
                console.log(response);
                (function success (){
                    console.log(response.data.code);
                    if(response.data.code === 200 || response.data.code === 0){
                        var result = response.data.result;
                        if(result==null||result.length<=0){
                            _self.isNull = true;
                        }else{
                            _self.isNull = false;
                            _self.items = result;
                            console.log(_self.items)
                        }
                    }
                }())
            }).catch(function (error) {
		        console.log("申请失败！");
	        });
        }
    },
}
</script>

<style scoped>

</style>
