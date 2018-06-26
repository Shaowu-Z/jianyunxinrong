<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title">公告</h1>
            <button id="btn-referrer" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left hide" @click="goback">
            <a class="mui-action-back mui-icon iconfont icon-back"></a>
        </button>
            <button class="mui-btn mui-btn-link mui-pull-right" style="display: block;"><span @click="addNotice()">发布公告</span></button>
        </header>
        <section class="mui-content">
            <div id="segmentedControl" class="mui-segmented-control mui-segmented-control-inverted border-bottom segmented-control-vline">
                <a class="mui-control-item mui-active" @click="getNotice(1,$event)">群内公告</a>
                <a class="mui-control-item" @click="getNotice(0,$event)">项目公告</a>
            </div>
            <div id="item1" class="mui-control-content mui-active">
                <ul class="mui-table-view table-view-line">

                    <div v-for="(notice,index) in notices" :key="index">
                        <li class="mui-table-view-cell" @click="seeNotice(notice.id)">
                            <h4 class="oa-title mui-ellipsis-2 text">{{notice.noticeContent}}</h4>
                            <p class="secondary text">{{notice.createDate|formatDate}}</p>
                        </li>
                    </div>
                    <!--<li class="mui-table-view-cell">
                    <h4 class="oa-title mui-ellipsis-2">2018年春节放假时间为2月10日至2月25日，请各位同事提前计划好工作事项</h4>
                    <p class="secondary">今天</p>
                </li>
                <li class="mui-table-view-cell">
                    <h4 class="oa-title mui-ellipsis-2">由于年底工作任务比较重，经总经办研究决定，今天的年会延后至春节假期以后再择期举办。由于年底工作任务比较重，经总经办研究决定，今天的年会延后至春节假期以后再择期举办。</h4>
                    <p class="secondary">昨天</p>
                </li>
                <li class="mui-table-view-cell">
                    <h4 class="oa-title mui-ellipsis-2">2018年1月1日至3日，元旦放假三天</h4>
                    <p class="secondary">
                        2017-12-12</span>
                    </p>
                </li>-->
                </ul>
            </div>
        </section>
    </div>
</template>

<script>
import {getParam} from '../../../playform/common'
export default {
    data(){
        return{
            href: window.location.href,
            //公告存储
            notices: [],
            param:{}
        }
    },
    //过滤器定义区
    filters: {
        //时间过滤
        formatDate(value) {
            var getTime = new Date();
            var nowTime = getTime.toLocaleDateString()
            var currentDateString = Date.parse(nowTime+" 23:59")
            var currentDate =new Date(currentDateString); 
            var fallDate = currentDate.getTime() - new Date(value).getTime(); //时间差的毫秒数        
            //计算出相差天数  
            var days = Math.floor(fallDate / (24 * 3600 * 1000))
            if(days == 0) {
                return "今天";
            } else if(days == 1) {
                return "昨天";
            } else {
                return new Date(value).toLocaleDateString().replace(/\//g, '-');;
            }
        }
    },
    created(){
        this.param = getParam(this.href);
        this.getNotice(1);
    },
    //定义方法区
    methods: {
        goback(){
            this.$router.go(-1)
        },
        //发布公告
        addNotice() {
            // console.log(this.param);
            // this.$router.push({path:'/static/newwebstatic/gonggao/gonggao_sent.html',query:{param:this.param}})
            var param = window.location.href.split("?")[1]
			window.location.href = "gonggao_sent.html?" + param
        },
        //查看公告
        seeNotice (id){
            // window.location.href="gonggao_detail.html?id="+id;
            this.$router.push({path:'/static/newwebstatic/gonggao/gonggao_detail.html',query:{id:id}})
        },
        getNotice(type,event) {
            console.log(event);
            if(event!=null){
                $(event.target).addClass("mui-active");
                $(event.target).siblings().removeClass("mui-active");
            }
            var _self = this;
            let param = {
                getType: type,
                projectSn: this.$route.query.projectSn,
                roomId: this.$route.query.isRoomId,
            }
            this.$http.post("/notice_api/getNotice", param).then(function(response) {
                console.log(response)
                if(response.data.code == 200) {
                    console.log(response)
                    _self.notices = response.data.result
                } else {
                    //							msg("获取云盘目录信息失败")
                }
            })
        }
    }
}
</script>

<style scoped>
    body,
    .mui-content {
        background: #ffffff;
    }
</style>
