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
            fromcome: 0, //判断那个地方打开的（房间或者组合查询）
            fromUserid: '', //组合查询打开人的id
            userid: setting.getCookie("userid"),
            username: setting.getCookie("username"),
            urlcan:'',
            url:window.location.href.split("?")[1]
            
        }
    },
    created: function() {
        var _self = this
        if(this.$route.query.currUserId != undefined) { //组合查询寄进来的
            _self.fromcome = 1
            _self.currroomid = this.$route.query.currRoomId
            if(this.$route.query.currUserId!=""){
                _self.fromUserid=this.$route.query.currUserId
            }else{
                _self.fromUserid=getCookie("userid");
            }
            _self.urlcan = "&currUserId=" + this.$route.query.currUserId + "&currRoomId=" + this.$route.query.currRoomId
        }
        _self.initData();

    },
    methods: {
        zuheInit: function() {
            var _self = this
            if(_self.confirm == 0) { //草稿状态
                if(userid == _self.creatorId) { //查询人是录单人
                    history.replaceState(null, null, "newCreat.html?id=" + +_self.$route.query.id + _self.urlcan) //h5  替换当前页面url（手机上url替换但是页面没变）
                    // location.replace(''); //加载新url页面
                    _self.$router.replace({ path: '/static/newwebstatic/shoufukuan/newCreat.html', query: { id: _self.$route.query.id+_self.urlcan }})
                } else {
                    history.replaceState(null, null, "newInfo.html?id=" + +_self.$route.query.id + _self.urlcan) //h5  替换当前页面url（手机上url替换但是页面没变）
                    // location.replace('');
                    _self.$router.replace({ path: '/static/newwebstatic/shoufukuan/newCreat.html', query: { id: _self.$route.query.id+_self.urlcan }})
                }
            } else if(_self.confirm == 1) {
                history.replaceState(null, null, "newInfo.html?id=" + +_self.$route.query.id + _self.urlcan) //h5  替换当前页面url（手机上url替换但是页面没变）
                // location.replace('')
                _self.$router.replace({ path: '/static/newwebstatic/shoufukuan/newCreat.html', query: { id: _self.$route.query.id+_self.urlcan }})
            } else {
                history.replaceState(null, null, "newInfo.html?id=" + +_self.$route.query.id) //h5  替换当前页面url（手机上url替换但是页面没变）
                // location.replace(''); //加载新url页面
                _self.$router.replace({ path: '/static/newwebstatic/shoufukuan/newInfo.html', query: { id: _self.$route.query.id+_self.urlcan }})
            }
        },
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
                    _self.creatorId=res.creatorId
                    _self.projectSn=res.projectId
                    _self.confirm=res.confirm
                    _self.roomId=res.roomId
                    if(_self.fromcome == 1) {
                        _self.zuheInit()
                    } else {
                        _self.referroomid(res.projectId)
                    }
                    // _self.referroomid(res.projectId)
//								if(res.confirm==2){//退回状态
//									if(res.roomId==_self.currroomid){//判断当前房间是否是推送的房间
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
                    _self.currroomid=response.data.result.roomId
                    if(_self.confirm==0){//退回状态
                        if(_self.roomId==_self.currroomid){//判断当前房间是否是推送的房间
                            if(_self.creatorId==_self.userid){ //判断当前人是否是录入人
                                history.replaceState(null, null,"work_content.html?id="+_self.$route.query.id)  //h5  替换当前页面url（手机上url替换但是页面没变）
                                // location.replace(''); //加载新url页面
                                _self.$router.replace({ path: '/static/newwebstatic/shoufukuan/work_content.html', query: { id: _self.$route.query.id }})
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
<style scoped>

</style>
