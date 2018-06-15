<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title">设置共享</h1>
            
            <a href="#" class="mui-action-back mui-icon iconfont icon-back mui-pull-left hide" @click="goBack"></a>
            <button class="mui-btn mui-btn-link mui-pull-right" @click="saveroomshaer()">保存</button>
        </header>
        <section class="mui-content" id="app">
            <div class="address-list address-project">
                <ul class="mui-table-view address-item">
                    <li v-for="(roomclass,index) in form.roomclass" :key="index" class="mui-table-view-cell mui-collapse fold-title">
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
                        <ul v-for="(room,index) in form.rooms" :key="index" class="mui-table-view mui-table-view-chevron sub-chevron no-btn">
                            <li   class="mui-table-view-cell mui-checkbox" v-if="room.roomclass==roomclass.roomclass" >
                                <div class="mui-slider-cell"  >
                                    <div class="oa-contact-cell mui-table"  @click="checkroom(room.roomid)" >
                                        <div class="oa-contact-input mui-table-cell"><input type="checkbox"/></div>
                                        <div class="oa-contact-content mui-table-cell">
                                            <h4 class="oa-contact-name">{{room.roomname}}<span class="num">（{{room.roomsize}}人）</span></h4>
                                        </div>
                                    </div>
                                </div>
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
                roomclass: {},
            },
            checkRoomIds:"",
            paramMap:{},
        }
    },
    created() {
        this.paramMap= getParam(window.location.href);
        var projectSN = this.paramMap.projectSN;
        var roomId = this.paramMap.isRoomId;
        //获取未共享的房间
        this.findroomnoshaer();
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        },
        findroomnoshaer (roomId) {
            var _self = this;
            var parame = new FormData();
            parame.append("thisRoomId",this.paramMap.roomId)
            parame.append("newRoomId",this.paramMap.shaerroomid)
            this.$http.post("/pcontact_api/findroomnoshaer", parame).then(function (response) {
                var result=response.data.result;
                if(response.data.code=="200") {
                    _self.form.roomclass = result.roomclass;
                    _self.form.rooms = result.rooms;
                    console.log(_self.form.roomclass);
                    console.log(_self.form.rooms);
                }
            }).catch(function (error) {
                // msg(error)
                layer.open({
                    content: 'error'
                    ,skin: 'msg'
                    ,time: 1 //2秒后自动关闭
                    ,anim:false
                });
                console.info(error);
            });
        },
        checkroom(checkroomid){
            if(this.checkRoomIds.indexOf(checkroomid)!=-1){
                this.checkRoomIds = this.checkRoomIds.replace(checkroomid+",","");
            }else{
                this.checkRoomIds+=checkroomid+",";
            }
        },
        saveroomshaer(roomId){
            this.checkRoomIds = this.checkRoomIds.substring(0, this.checkRoomIds.lastIndexOf(','));
            var parame = new FormData();
            parame.append("roomId",this.paramMap.roomId)
            parame.append("setRoomId",this.paramMap.shaerroomid)
            parame.append("setRoomIds",this.checkRoomIds)
            this.$http.post("/pcontact_api/saveroomshaer", parame).then(function (response) {
                //关闭当前页面并刷新数据
                // msg("共享成功!");
                layer.open({
                    content: '共享成功!'
                    ,skin: 'msg'
                    ,time: 1 //2秒后自动关闭
                    ,anim:false
                });
                setTimeout(function () {
                    appApi.broadcast("reLoad()"); //刷新页面
                    appApi.closeNewWindow();
                },200)
            }).catch(function (error) {
                // msg(error)
                layer.open({
                    content: 'error'
                    ,skin: 'msg'
                    ,time: 1 //2秒后自动关闭
                    ,anim:false
                });
                console.info(error);
            });
        }
    },
}
</script>

<style>

</style>
