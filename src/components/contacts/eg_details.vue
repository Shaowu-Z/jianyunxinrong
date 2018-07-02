<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <button id="btn-referrer" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left" @click="goback">
                <span class="mui-icon mui-icon-back"></span>返回
            </button>
            <h1 class="mui-title">详细资料</h1>
            <a id="menu" class="mui-icon iconfont icon-more mui-pull-right" href="javascript:;" @click="showhide"></a>
        </header>
        <section class="mui-content" id="eg_details" style="display: none;">
            <div id="cont_div" style="display: block;">
                <!--按钮-->
                <div class="fixed-bottom" id="send_message_id">
                    <div class="mui-table mui-text-center">
                        <div v-show="is_register==0 || items.isFriend==0" class="mui-table-cell"><button type="button" @click="addFriends" class="mui-btn mui-btn-success" v-text="btnText"></button></div>
                        <!--<div v-show="is_register==0" class="mui-table-cell"><button type="button" @click="doShare" class="mui-btn mui-btn-primary">微信邀请</button></div>-->
                        <!--<div v-show="items.isFriend==0" class="mui-table-cell"><button @click="addFriends" type="button" class="mui-btn mui-btn-success">加为好友</button></div>-->
                        <div v-show="is_register==1" class="mui-table-cell"><button @click="chat()" class="mui-btn mui-btn-primary">发消息</button></div>
                    </div>
                </div>
                <!-- 主体内容-头像 -->
                <div class="eg-header">
                    <div class="oa-contact-cell mui-table">
                        <div class="oa-contact-avatar mui-table-cell" ><!--onclick="javascript:document.getElementById('maxImage_div').style.display='block';document.getElementById('cont_div').style.display='none';"-->
                            <img @click="stopEvt(event),disposeLogImg(0,items.smallImg)" class="my-pic" :src="items.userAvatar | getImageUrl" />
                        </div>
                        <div class="mui-table-cell">
                            <h4 class="oa-contact-name" v-text="items.nickName"></h4>
                        </div>
                        <div class="mui-table-cell">
                            <span style="float:right;" title="点击打开个人主页">
                                <!--<a href="javascript:app.openIndexPersonal()" style="font-size:15px;">→个人主页</a>-->
                                <!--<a href="javascript:remin('此功能正在开发中!',2);" style="font-size:15px;">→个人主页</a>-->
                            </span>
                        </div>
                    </div>
                </div>
                <h5 class="mui-content-padded text">基础信息</h5>
                <!-- 主体内容--已注册用户的信息列表 -->
                <ul class="mui-table-view eg-table-view eg-detail-list text" v-show="is_register==1">
                    <li class="mui-table-view-cell hide"><label>团队名称</label><label v-text="items.teamName"></label></li>
                    <li class="mui-table-view-cell"><label>手机号码</label><span v-text="items.cellPhone"></span></li>
                    <li class="mui-table-view-cell"><label>邮箱</label><span v-text="items.mailbox"></span></li>
                    <li class="mui-table-view-cell"><label>地区</label><span>{{items.regionName}}</span></li>
                    <li class="mui-table-view-cell hide">
                        <a class="mui-navigate-right" href="javascript:remin('功能暂未开放!',2);">更多</a>
                    </li>
                </ul>
                <!-- 主体内容--未注册的用户的信息 -->
                <ul class="mui-table-view eg-table-view eg-detail-list" v-show="is_register==0">
                    <li class="mui-table-view-cell"><label>手机号码</label><span v-text="items.cellPhone"></span></li>
                </ul>

                <h5 class="mui-content-padded text">企业信息</h5>
                <ul class="mui-table-view eg-table-view eg-detail-list text">
                    <!--<li class="mui-table-view-cell"><span>测试团队</span><span style="float:right;" title="点击打开企业主页"><a >→企业主页</a></span></li>-->
                    <li class="mui-table-view-cell" v-for="(team,index) in teamList" :key="index">
                        <span >{{team.teamName}}
                            <!--<a style="float:right;" :href="['javascript:appApi.openNewWindow(getPagePath()+\'/work/work_home.html?type=2&teamId='+team.teamId+'\')']">→企业主页</a>-->
                            <!--<a style="float:right;" href="javascript:remin('此功能正在开发中!',2);">→企业主页</a>-->
                        </span>
                        <!--<span style="float:right;" title="点击打开企业主页">
                            <a :href="['javascript:appApi.openNewWindow(getPagePath()+\'/work/work_home.html?type=2&teamId='+team.teamId+'\')']">→企业主页</a>
                        </span>-->
                    </li>
                </ul>

                <!--避免按钮最底部不挡住内容 style="position:fixed;bottom:0;left:0;"-->
                <h5 class="mui-content-padded content-added"></h5>
                <h5 class="mui-content-padded content-added"></h5>


                <div class="mui-backdrop" style="z-index: 998;" v-show="show"  @click="showhide"></div>
                <!--右上角的隐藏菜单-->
                <div id="popover-more" class="mui-popover top-menu" style="opacity:1;right:5px;top:55px;" v-show="show">
                    <div class="mui-popover-arrow" style="left:168px"></div>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell" @click="Sendout"><a class="text" href="javascript:;"><span class="mui-icon iconfont icon-share"></span>发送名片</a>
                        </li>
                        <li class="mui-table-view-cell text" v-show="items.isFriend==1" @click="deleteFriend"><a href="javascript:;"><span class="mui-icon iconfont icon-delete"></span>删除好友</a>
                        </li>
                    </ul>
                </div>

                <!--个人标签选择开始-->
                <div class="pop-up" style="display: none; height:100%;" id="select_tag" v-show="select_tag">
                    <div class="pop-title"><a href="javascript:app.select_tag = false;appApi.showBack();">取消</a>   请选择对应的标签跳转主页（单选）</div>
                        <div class="pop-content select-box col-xs-6 mui-clearfix" id="industryHtml">
                            <div class="mui-input-row mui-radio mui-left" v-for="(tag,index) in tags" :key="index">
                                <label v-text="tag.zhiyetagname"></label><input type="radio" name="radio1" :value="tag.zhiyetagid+'!='+tag.zhiyetagname"/>
                            </div>
                        </div>
                    <div class="pop-footer btn-contain">
                        <button type="button" class="mui-btn mui-btn-primary mui-btn-block" @click="selectTagOpenIndex">确定</button>
                    </div>
                </div>
                <!--标签选择结束-->
            </div>

            <div id="maxImage_div" class="pop-up" style="display:none ;width: 100%;height: 100%;background: #CDC5BF;text-align:center;padding-top:25%;" onclick="javascript:document.getElementById('maxImage_div').style.display='none';document.getElementById('cont_div').style.display='block';">
                <img id="maxImage_id" style="width: 100%;height: 81%;" class="my-pic" :src="items.userAvatar | getImageUrl" />
            </div>
        </section>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data(){
        return{
            teamList:[],
            select_tag:false,
            tags:[],
            items:{},
            is_register:0,  //是否注册 0 未注册  1 已注册
            btnText:""//,//按钮的内容
            //userInfo : window.appApi.getUserInfo()
            ,userInfo:{},
            addClickNum :0,
            show:false
        }
    },
    created: function () {

        // var paramMap = getParam(window.location.href);
        // userId = paramMap.userId==undefined ? "" : paramMap.userId;
        // var phone = paramMap.phone==undefined ? "" : paramMap.phone;
        // var name = paramMap.name==undefined ? "" : paramMap.name;
        var userId = this.$route.query.userId;
        var phone= ''
        var param = new FormData();
        param.append("userId", userId);
        param.append("cellPhone", phone);
        var _self = this;

        this.$http.post("/concats_api/query_contacts_info", param).then(function (response){
            var resp = response.data;
            console.info("res",resp);
            if(resp.code == 0){
                _self.$data.tags = resp.result.tags;//用户标签list
                _self.$data.teamList = resp.result.teamList;//相关企业列表
                var array = resp.result.contactsInfoVO;//用户基础信息
                if(!array.userId){
                    array['nickName']=name;
                    array['cellPhone']=phone;
                    _self.$data.btnText="短信邀请";
                }else{
                    _self.$data.is_register=1;
                    _self.$data.btnText="加为好友";
                    if(array.userId==array.loginUserId){
                        array['isFriend']=2;
                    }
                }
                _self.$data.items = array;
                document.getElementById("eg_details").style.display = "block";

            }else{
                remin(resp.message, 2);
            }
            //_self.$data.userInfo=window.appApi.getUserInfo();

        }).catch(function (error) {
            console.info(error);
        });
        setTimeout(function(){
            //_self.$data.userInfo = window.appApi.getUserInfo();
            if (appApi.isApp && appApi.isIphoneOs) {//IOS
                window.appApi.getUserInfo();
            } else if (appApi.isApp && appApi.isAndroid) {
                var userInfoAndroid = window.appApi.getUserInfo();
                _self.$data.userInfo = JSON.parse(userInfoAndroid)
                //alert(_self.$data.userInfo.userId);
            } else {
                console.info("设备不支持");
            }
        },500)
        appApi.imgPreview.init();
    },
    methods:{
        Sendout(){
            // appApi.openNewWindow(getUrl() + '/static/webstatic/contacts/send_card_list.html?from=1&userId='+userId)
            this.$router.push({path:'/send_card_list',query:{from:1,userId:this.$route.query.userId}})
        },
        showhide(){
            this.show = !this.show
        },
        chat() {
            // alert(this.items.imId)
            var imId = this.items.imId;
            if (appApi.isApp && appApi.isIphoneOs) {//IOS
            
            } else if (appApi.isApp && appApi.isAndroid) {
                
                window.webactivity.openChat(imId,this.items.userAvatar,this.items.nickName,1);
            }
                appApi.openChat(imId,this.items.userAvatar,this.items.nickName,1);
        },
        goback(){
            this.$router.go(-1)
        },
        deleteFriend: function () {
            let _self = this
            // $('.mui-popover').popover('toggle',document.getElementById("popover-more"));//隐藏右上角菜单
            this.show = !this.show
            var userId = this.$route.query.userId
            layer.open({
                content: '确定要删除好友关系麽？',
                item: 1,
                icon: 1
                ,btn: ['确认', '取消']
                ,yes: function(index, layero){
                    var param = {deleteType:"1",friendsUserId:userId};
                    _self.$http.post("/concats_api/delete_friend",param).then(function (response){
                        // remin("好友删除成功!",2);
                        layer.closeAll()
                        Toast({
                            message: '好友删除成功!',
                            position: 'center',
                            duration: 2000
                        });
                        window.appApi.closeNewWindow();
                    }).catch(function (error) {
                        layer.closeAll()
                        // remin("好友删除失败,请联系管理员!",2);
                        Toast({
                            message: '好友删除失败,请联系管理员!',
                            position: 'center',
                            duration: 2000
                        });
                    });
                }
            });
        },
        addFriends: function () {
            if(this.addClickNum++ > 0) return;
            var _self = this;
            var addVo = {cellPhone: this.items.cellPhone, receivedUserName: this.items.nickName};
            this.$http.post("/concats_api/insert_add_info", addVo).then(function (response) {
                if(response.data.code==0) {
                    var friendVO = response.data.result;
                    if (friendVO.isOwnOrFriend == "0") {
                        msg("不可添加自己为好友!");
                    } else if (friendVO.isOwnOrFriend == "1") {
                        msg("此用户已是你的好友!");
                    } else {
                        _self.$data.btnText = _self.$data.is_register == 0 ? "邀请短信已发送" : "好友请求已发送";
                    }
                }else{
                    msg(response.data.message);
                }

            }).catch(function (error) {
                remin("好友请求发送失败，请联系管理员!", 2);
                console.info(error);
            });
        },
        doShare:function () {
            var _self = this;
            var userId = _self.$data.userInfo.userId;
            var url = getUrl() + "/static/webstatic/register/share_reg.html?type=1&invUser=" + userId;
            var logo = getUrl() + "/static/images/app-logo.jpg";
            appApi.share(0,"您有一条好友申请","点击我进入注册吧",url,logo,null);
        },
        //打开个人主页跳转(一个标签直接跳转，多个标签时，)
        openIndexPersonal: function(){
            if(this.tags.length>1){
                this.select_tag=true;
                appApi.hideBack();
            }else{
                //只有一个或者没有职业标签
                var tag = this.tags[0];
                if(tag!=null || tag!=undefined){
                    var zhiyetagname = tag.zhiyetagname;
                    var zhiyetagid = tag.zhiyetagid;
                    window.location.href="../work/work_home.html?type=0&zhiyetagname="+zhiyetagname+"&zhiyetagid="+zhiyetagid;
                }else{
                    remin("该用户未注册或未配置职业标签，无法跳转到个人主页!", 2);
                }

            }
        },
        selectTagOpenIndex:function () {
            //this.select_tag=false;
            var tagNI = $('input:radio[name="radio1"]:checked').val();
            var tag = tagNI.split("!=");
            var zhiyetagname = tag[1];
            var zhiyetagid = tag[0];
            window.location.href="../work/work_home.html?type=0&zhiyetagname="+zhiyetagname+"&zhiyetagid="+zhiyetagid;
        }
    },
    filters: {
        getImageUrl: function (val) {
            if(val==null || val=="") return "/static/images/60x60.gif";
            return val;
        }
    },
    mounted(){
        window.appApi.callBackFun = function(callFlag, CONTENT) {
            if(callFlag == appApi.callBackFlag.USER_INFO) {
                this.userInfo = JSON.parse(CONTENT);
            }
        }
    }
}
</script>

<style scoped>
    .text{
        text-align: left
    }
    .mui-popover{
        display: block
    }
</style>
