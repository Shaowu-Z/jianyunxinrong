<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title">我的下游</h1>
            <a href="#" class="mui-action-back mui-icon iconfont icon-back mui-pull-left" @click="goBack"></a>
        </header>
        <section class="mui-content">
            <div class="address-list address-project" id="app">
                <ul  v-for="(roomclass,index) in form.roomclass" :key="index" class="mui-table-view address-item">
                    <li  class="mui-table-view-cell mui-collapse fold-title">
                        <a class="mui-navigate-right" href="javascript:void(0)">
                        <div class="mui-slider-cell">
                            <div class="oa-contact-cell mui-table">

                                <div class="oa-contact-avatar mui-table-cell">
                                    <img v-if="roomclass.iconurl==null" src="../../../assets/images/60x60.gif" alt="" />
                                    <img v-if="roomclass.iconurl!=null" v-bind:src="roomclass.iconurl" alt="..." />
                                </div>
                                <div class="oa-contact-content mui-table-cell">
                                    <h4 class="oa-contact-name" v-text="roomclass.roomclassname"></h4>
                                </div>
                            </div>
                        </div>
                        </a>

                        <ul v-for="(room,index) in form.rooms" :key="index" class="mui-table-view mui-table-view-chevron sub-chevron adaptive-chevron">
                            <li v-if="room.roomclass==roomclass.roomclass" class="mui-table-view-cell">

                                <div class="mui-slider-cell">
                                    <div class="oa-contact-cell mui-table">
                                        <!--<div class="oa-contact-avatar mui-table-cell">
                                            <img src="../../static/images/defualt.png" />
                                        </div>-->
                                        <div class="oa-contact-content mui-table-cell">
                                            <h4 class="oa-contact-name">{{room.roomname}}  <span class="num">（{{room.roomsize}}人）</span></h4>
                                            <p v-if="room.shareNames!=''" class="oa-contact-email">已共享:&nbsp;&nbsp;{{room.shareNames}}</p>
                                            <p v-if="room.shareNames==''" class="oa-contact-email">无共享</p>
                                        </div>
                                    </div>
                                </div>
                                <button class="mui-btn mui-btn-link btn-invite" @click="setroomshaer(room.roomid)"><span class="mui-icon iconfont icon-sharing"></span>共享</button>
                            </li>
                        </ul>

                    </li>
                </ul>
            </div>
        </section>
    </div> 
</template>
<script>
import {getParam} from '../../../playform/common'
export default {
    data () {
        return {
            form:{
                rooms: {},
                roomclass: {}
            },
            paramMap:{}
        }
    },
    created() {
        this.paramMap= getParam(window.location.href);
        var projectSN = this.paramMap.projectSn;
        var roomId = this.paramMap.isRoomId;
        //获取所有下游组织数据
        this.findDownstreamRoom();
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        },
        findDownstreamRoom:function () {
            var projectSN = this.paramMap.projectSn;
            var roomId = this.paramMap.isRoomId;
            var _self = this;
            var parame = new FormData();
            parame.append("projectSN",projectSN);
            parame.append("roomId",roomId);
            this.$http.post("/pcontact_api/finddownstreamroom", parame).then(function (response) {
                var result=response.data.result;
                if(response.data.code=="200") {
                    _self.form.roomclass = result.roomclass;
                    _self.form.rooms = result.rooms;
                    console.log(_self.form.roomclass);
                    console.log(_self.form.rooms);
                }
            }).catch(function (error) {
                // msg(error)
                console.info(error);
            });
        },
        setroomshaer:function(shaerroomid,roomId){
            //alert(roomId);//主id
            // alert(shaerroomid);//设置共享的id
            appApi.openNewWindow(getUrl()+'/static/webstatic/roomshare/room_set_shaer.html?roomId='+roomId+"&shaerroomid="+shaerroomid);
        }

    },
    mounted(){
        function reLoad() {
            window.history.go(0)
        }
    }
}
</script>

<style>

</style>
