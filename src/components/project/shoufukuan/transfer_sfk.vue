<template>
    <header></header>
</template>

<script>

import setting from '../../../playform/config.js'
export default {
    data() {
        return {
            creatorId:'',//录单人的id
            projectSn:"",
            currroomid:'',//当前人的roomid
            roomId:'',
            confirm:'',
            userid: setting.getCookie("userid"),
            username: setting.getCookie("username"),
        }
    },
    created: function() {
        var _self = this
        _self.initData();

    },
    methods: {
        initData: function(){
            var _self = this
            //获取地址栏信息id

            var seeid = window.location.search.split("?")[1]
            //获取地址栏信息附件id
            var param = {
                id: _self.$route.query.id,
//														uid: "10395",
            }
            //获取单据信息
            this.$http.post("/contract/get_content", param).then(function(response) {
                if(response.data.code == 200) {
                    var res=response.data.result
                    console.log(response.data.result)
                    _self.$data.creatorId=res.creatorId
                    _self.$data.projectSn=res.projectId
                    _self.$data.confirm=res.confirm
                    _self.$data.roomId=res.roomId
                    _self.referroomid(res.projectId)
//								if(res.confirm==2){//退回状态
//									if(res.roomId==_self.$data.currroomid){//判断当前房间是否是推送的房间
//										if(res.creatorId==userid){ //判断当前人是否是录入人
//											appApi.openNewWindow(getUrl()+"/static/newwebstatic/lianxi/work_content.html?id="+this.$route.query.id)
//										}
//									}else{
//										
//									}
//								}
                }
            })
        },
        referroomid:function(sn){//根据项目sn和用户id查询所属的房间
            var _self = this;
            this.$http.post("/pcontact_api/getroombyprojectsn?projectSn="+sn+"&userId="+_self.userid).then(function(response) {
                if(response.data.code == 0) {
                    console.log(response.data.result)
                    _self.$data.currroomid=response.data.result.roomId
                    if(_self.$data.confirm==0){//退回状态
                        if(_self.$data.roomId==_self.$data.currroomid){//判断当前房间是否是推送的房间
                            if(_self.$data.creatorId==_self.userid){ //判断当前人是否是录入人
                                history.replaceState(null, null,"work_content.html?id="+_self.$route.query.id)  //h5  替换当前页面url（手机上url替换但是页面没变）
                                // location.replace(''); //加载新url页面
                                _self.$router.replace({ path: '/static/newwebstatic/shoufukuan/newInfo.html', query: { id: _self.$route.query.id }})
//											window.location.replace(getUrl()+"/static/newwebstatic/lianxi/work_content.html?id="+this.$route.query.id)
                            }else{
                                history.replaceState(null, null,"newInfo.html?id="+_self.$route.query.id)  //h5  替换当前页面url（手机上url替换但是页面没变）
                                // location.replace(''); //加载新url页面
                                 _self.$router.replace({ path: '/static/newwebstatic/shoufukuan/newInfo.html', query: { id: _self.$route.query.id }})
                            }
                        }else{
                            history.replaceState(null, null,"newInfo.html?id="+_self.$route.query.id)  //h5  替换当前页面url（手机上url替换但是页面没变）
                                // location.replace(''); //加载新url页面
                                _self.$router.replace({ path: '/static/newwebstatic/shoufukuan/newInfo.html', query: { id: _self.$route.query.id }})
//										window.location.replace(getUrl()+"/static/newwebstatic/lianxi/newInfo.html?id="+this.$route.query.id)
                        }
                    }else{
                            history.replaceState(null, null,"newInfo.html?id="+_self.$route.query.id)  //h5  替换当前页面url（手机上url替换但是页面没变）
                            // location.replace(''); //加载新url页面
                            _self.$router.replace({ path: '/static/newwebstatic/shoufukuan/newInfo.html', query: { id: _self.$route.query.id }})
//									 window.location.replace(getUrl()+"/static/newwebstatic/lianxi/newInfo.html?id="+this.$route.query.id)

                    }
                }
            })
        },
    }
}
</script>
<style>

</style>
