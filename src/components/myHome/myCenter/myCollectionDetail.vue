<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title">详情</h1>
            <a class="mui-icon iconfont icon-more mui-pull-right" id="mui_right" @click="muiRight"></a>
        </header>
        <section class="mui-content" id="collection_detail">
            <!--文本详情-->
            <div class="c-detail-box" >
                <div class="user-box">
                    <img class="user-header" v-bind:src="result.bigImg">
                    <div class="user-name">
                        <span v-text="result.gourpNick"></span>
                        <span v-if="result.gourpNick!=''&&result.gourpNick!=null">-</span>
                        <span v-text="result.fromUser"></span>
                    </div>
                </div>
                <!--判断此条消息是否是链接-->
                <div class="c-detail-content" v-if="ishref=='true'">
                    <a v-bind:href="result.msg"> {{result.msg}}</a>
                </div>
                <div class="c-detail-content" v-else>{{result.msg}}</div>
                <p class="secondary">收藏于{{addTime | formDate}}</p>
            </div>

            <!--  &lt;!&ndash;图片详情&ndash;&gt;
            <div class="c-detail-box" style="display: none;">
                <div class="user-box">
                    <img class="user-header" src="../../static/images/defualt.png">
                    <div class="user-name">伟峰sass开发组</div>
                </div>
                <div class="c-detail-content"><img src="../../static/images/bgr-mycenter.jpg"></div>
                <p class="secondary">收藏于2018-03-31</p>
            </div>-->
        </section>

        <!--遮罩层-->
        <div class="mui-backdrop" id="backdrop" style="display: none;z-index: 999;"></div>

        <!--more-->
        <div class="pop-up" id="pop-up" style="display: none;">
            <div class="pop-content">
                <ul class="pop-content mui-table-view eg-table-view mui-text-center">
                    <li class="mui-table-view-cell" id="forwarding" @click="forwarding">发送给朋友</li>
                    <li class="mui-table-view-cell" id="delete" @click="deleteCollect">删除</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                result: {},
                addTime:"",
                ishref:false
            }
        },
        created(){
            var _self = this;
            _self.$data.addTime=this.$route.query.addTime;
            _self.$data.ishref=this.$route.query.ishref;
            this.$http.get("/collect/get_msg_one?id="+this.$route.query.msgId
            ).then(function (response) {
                if (response.data.code == 0||response.data.code==200) {
                    _self.$data.result = response.data.result;
                } else {
                    Toast('此条消息已失效');
                }
            }).catch(function (error) {
                console.log(error);
            })
            if(this.$route.query.ishref){
                document.getElementById("collection_detail").onclick = function () {
                    window.open(this.$route.query.msg);
                }
            }
        },
        methods:{
            muiRight:function() {
                document.getElementById("backdrop").style.display = "block";
                document.getElementById("pop-up").style.display = "block";
            },
            backdrop:function() {
                var backdrop = document.getElementById("backdrop");
                if(backdrop.style.display=="block"){
                    backdrop.style.display = "none"
                    document.getElementById("pop-up").style.display = "none";
                }
            },
            deleteCollect:function (params) {
                document.getElementById("backdrop").style.display = "none";
                document.getElementById("pop-up").style.display = "none";
                //删除
                // var msg = "确定要取消收藏吗？"
                // if(!confirm(msg)){
                //     return false;
                // }
                MessageBox.confirm('确定执行此操作?').then(action => {
                    this.$http.get("/collect/do", {
                        params: {id:this.$route.query.msgId,type:this.$route.query.type}
                    }).then(function (response) {
                        if(response.data.code==403){
                            el.parentNode.removeChild(el);
                            // layer.open({
                            //     content: response.data.message
                            //     ,skin: 'msg'
                            //     ,time: 2 //2秒后自动关闭
                            // });
                            Toast(response.data.message)
                        }
                        // window.appApi.openNewWindow(getUrl()+"/static/webstatic/mycenter/my_collect.html");
                        _self.$router.push({path:'//myCollect'})
                    })
                });
            },
            forwarding:function (params) {
                var _self = this;
                document.getElementById("backdrop").style.display = "none";
                document.getElementById("pop-up").style.display = "none";
                //拼接转发选人页面需要的参数
                var param = "types="+4+"&msg="+_self.result.msg+"&url=";
                //打开转发选人页面
                // _self.$router.push({path:'/selectMemberShare',query:{types:4,msg:_self.result.msg,url:""}})
                window.appApi.openNewWindow("/selectMemberShare?"+param);
            }
        },
        filters: {
            formDate: function (timestamps) {
                var timestamps = Number(timestamps);
                var originalTime = new Date(timestamps),
                    currentTime = (new Date()).getTime(),
                    interval = currentTime - timestamps,
                    days,
                    hours,
                    minutes,
                    seconds,
                    timeHtml = '';

                days = Math.floor(interval / (24 * 3600 * 1000)); //相差天数
                hours = Math.floor(interval / (3600 * 1000)); //相差小时数
                minutes = Math.floor(interval / (60 * 1000)); //相差分钟
                seconds = Math.floor(interval / 1000); //相差秒数

                var adjustedYear = originalTime.getFullYear(),
                    adjustedMonth = formatNumber((originalTime.getMonth() + 1)),
                    adjustedDate = formatNumber(originalTime.getDate()),
                    adjustedHours = formatNumber(originalTime.getHours()),
                    adjustedMinutes = formatNumber(originalTime.getMinutes()),
                    adjustedSeconds = formatNumber(originalTime.getSeconds());

                var nowTime = new Date;

                if(originalTime.getFullYear() == nowTime.getFullYear() && originalTime.getMonth() == nowTime.getMonth() && originalTime.getDate() == nowTime.getDate()) {
                    if(seconds < 60) {
                        timeHtml = '刚刚';
                    } else if (minutes < 60) {
                        timeHtml = minutes + '分钟前';
                    } else {
                        timeHtml = '今天'
                    }
                } else if(originalTime.getFullYear() == nowTime.getFullYear() && originalTime.getMonth() == nowTime.getMonth() && originalTime.getDate() == (nowTime.getDate() - 1)) {
                    timeHtml = '昨天'
                } else {
                    var yearHtml = '';

                    /*if(adjustedYear != (new Date()).getFullYear()) {
                        yearHtml = adjustedYear + '年'
                    }*/

                    timeHtml += adjustedYear + '年'+
                        adjustedMonth + '月' +
                        adjustedDate + '日'/* +
					adjustedHours + ':' +
					adjustedMinutes;*/
                }
                return timeHtml;
            }
        }
    }
    function formatNumber(num,places) {
        if(isNaN(num) )//|| num==null)
            num=0;
        if(isNaN(places))
            places=2;
        num = (parseFloat(num) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
        num = num=="NaN"?"0.00":num;
        return num;
    }
</script>
<style type="text/css">

</style>

