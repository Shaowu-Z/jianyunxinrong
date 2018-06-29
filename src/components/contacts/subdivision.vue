<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title">部门信息</h1>
            <button id="btn-referrer" class="mui-action-back mui-btn mui-btn-link mui-btn-nav mui-pull-left" @click="goBack"><span
                    class="mui-icon mui-icon-back"></span>返回
            </button>
            <a id="menu" class="mui-btn mui-btn-link mui-btn-nav mui-pull-right" href="javascript:;" @click="showhide">批量操作</a>
            <button id='done' v-show="false" style="display: none" class="mui-btn mui-btn-nav mui-btn-primary mui-pull-right mui-disabled" onclick="groupChat(window.location.href.split('?')[1].split('=')[2].split('&')[0])">确定</button>
        </header>

        <div class="fixed-bottom" id="operate_div" v-show="show" style="display: none;">
            <div class="mui-table mui-text-center">
                <!--<div class="mui-table-cell"><a class="" href="javascript:appApi.openNewWindow(getUrl()+'/static/webstatic/contacts/add_manually.html?type=1&teamId='+window.location.href.split('?')[1].split('=')[1].split('&')[0]+'&deptId='+window.location.href.split('?')[1].split('=')[2])">添加员工</a></div>-->
                <div class="mui-table-cell" @click="join"><a href="javascript:;">添加员工</a></div>
                <div class="mui-table-cell"><a class="" @click="department" href="javascript:;">添加子部门</a></div>
                <div class="mui-table-cell"><a class="" @click="setUp" href="javascript:;">部门设置</a></div>
            </div>
        </div>
        <section class="mui-content" id="dept_member_list">
            <!-- 计算数量用到，start -->
            <!--<div class="mui-indexed-list-search mui-input-row mui-search hide">
                <input type="search" class="mui-input-clear mui-indexed-list-search-input" placeholder="搜索">
            </div>
            <div class="mui-indexed-list-bar hide">
                <div class="align-middle" id="zm_id">
                    <a class="mui-hidden">A</a>
                </div>
            </div>
            <div class="mui-indexed-list-alert"></div>
            <div class="mui-indexed-list-inner hide">
                <div class="mui-indexed-list-empty-alert">没有数据</div>
                <ul class="mui-table-view" id="strHtml">

                </ul>
            </div>-->
            <!-- 计算数量用到，end -->
                <div class="group-header" id="dept_head">
                    <li class="mui-table-view-cell text">
                        <span>{{none.teamName}}</span>
                        </li>
                </div>
                <ul id="deptHtml" class="mui-table-view eg-table-view eg-detail-list"></ul>
                <div class="mui-indexed-list-inner group-box" >
                    <!--<div class="group-header"><a href="#">伟峰saas开发组</a>&nbsp;&nbsp;>&nbsp;&nbsp;<span>设计组</span></div>-->
                    <!--<div class="singlebox tip-box">
                        <a class="mui-navigate-right">
                            <p class="tip-con">当前部门还没有设置主管</p>
                            <p class="secondary">主管用于日主、审批、考勤查看与操作权限</p>
                        </a>
                    </div>-->
                    <ul class="mui-table-view">
                    </ul>
                    <ul class="mui-table-view eg-table-view eg-detail-list" id="deptHtml">
                    </ul>

                    <ul class="mui-table-view" v-for="(item,index) in items" :key="index">
                        <li v-if="org=='x'" class="mui-table-view-cell" >    
                            <div class="oa-contact-cell mui-table" @click="edit(index,item)">
                                <div class="oa-contact-avatar mui-table-cell"><img :src="item.userAvatar | getImageUrl"></div>
                                <div class="oa-contact-content mui-table-cell"><h4 class="oa-contact-name" v-text="item.memberName"></h4></div>
                            </div>
                        </li>
                        <li v-if="org=='n' || org=='y'" class="mui-table-view-cell" >
                            <div class="oa-contact-cell mui-table" @click="edit(index)">
                                <div class="oa-contact-avatar mui-table-cell"><img :src="item.userAvatar | getImageUrl"></div>
                                <div class="oa-contact-content mui-table-cell"><h4 class="oa-contact-name" v-text="item.memberName"></h4></div>
                            </div>
                            <span id="edit_member" v-show="show" class="mui-icon iconfont icon-edit2 post" @click="edit(index,item)"></span>
                        </li>
                        <li v-if="org=='g'" class="mui-table-view-cell mui-checkbox" >
                            <div class="oa-contact-cell mui-table">
                                <div class="oa-contact-input mui-table-cell"><input type="checkbox" :value="item.userId"/></div>
                                <div class="oa-contact-avatar mui-table-cell"><img :src="item.userAvatar | getImageUrl"></div>
                                <div class="oa-contact-content mui-table-cell"><h4 class="oa-contact-name" v-text="item.memberName"></h4></div>
                            </div>
                        </li>
                    </ul>
                </div>
            
            <!--添加员工开始-->
            <!--<div class="mui-popup mui-popup-in">
                <div class="mui-popup-title mui-text-left">选择添加成员的方式</div>
                <ul class="mui-popup-content mui-table-view mui-text-left eg-table-view">
                    <li class="mui-table-view-cell">手动输入添加</li>
                    <li class="mui-table-view-cell">从手机通讯录添加</li>
                    <li class="mui-table-view-cell">邀请同事加入本部门</li>
                </ul>
            </div>-->
            <!--添加员工结束-->
            <div class="mui-backdrop" style="z-index: 999;" v-show="show1"  @click="showhide"></div>
            <!--右上角弹出菜单-->
            <div id="popover-more" class="mui-popover top-menu" v-show="show1" style="top:52px; right: 5px;opacity:1">
                <div class="mui-popover-arrow" style="left:142px"></div>
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell"><a @click="one" href="javascript:;"><span class="mui-icon iconfont icon-piliang-add"></span>好友中批量添加</a>
                    </li>
                    <li class="mui-table-view-cell"><a @click="tow" href="javascript:;"><span class="mui-icon iconfont icon-piliang-move"></span>批量转移成员</a>
                    </li>
                    <li class="mui-table-view-cell"><a @click="three" href="javascript:;"><span class="mui-icon iconfont icon-piliang-delete"></span>批量删除成员</a>
                    </li>
                </ul>
            </div>
            <div :class="{'mui-backdrop mui-active' : this.add_type == true }" @click="join"></div>
            <!--选择方式弹框开始-->
            <div id="add_type" class="mui-popover top-menu" style="top: 460px; left: 5px;" :class="{'mui-active' : this.add_type == true }">
                <div class="mui-popup-title mui-text-left">请选择添加成员的方式</div>
                <ul class="mui-popup-content mui-table-view mui-text-left eg-table-view">
                    <li class="mui-table-view-cell"><a @click="mailList" href="javascript:;">从通讯录批量选择</a></li>
                    <li class="mui-table-view-cell"><a @click="manual" href="javascript:;" class="">手动输入</a></li>
                </ul>
                <div class="mui-popover-arrow mui-bottom" style="left:51px"></div>
            </div>
            <!--选择方式弹框结束-->

        </section>
    </div>
</template>

<script>
export default {
    data(){
        return{
            items: [],
            org: this.$route.query.org,
            teamId: this.$route.query.teamId,
            deptId: '',
            userId: '',
            hasMember: '',
            show: false,
            show1: false,
            none: [],
            add_type:false,
        }
    },
    created: function () {
        this.teamId = this.$route.query.teamId;
        this.$http.post("/concats_api/find_team_info?teamId="+this.teamId).then(function (response) {
            console.log(response.data.result);
            _self.none = response.data.result;
            var teamName = response.data.result.teamName;
        }).catch(function (error) {
            console.info(error);
        });
        var _self = this;
        var isOrg="";
        if(this.org=='y'){//组织架构进入
            this.deptId = this.$route.query.deptId,
            this.isOrg = "y";
        }else if(this.org=='x'){//发送名片进入
            this.deptId = this.$route.query.deptId;
            this.userId = this.$route.query.teamId
        }else if(this.org=='n'){//管理员进入
            this.show = !this.show;
            this.deptId = this.$route.query.deptId;
        }else if(this.org=='g'){//发起群聊进入
            this.deptId = this.$route.query.deptId;
            this.userId = this.$route.query.teamId
            // $("#done").show();//显示确认操作按钮
        }

        // setDeptHead(org,'y',0,deptId,userId);//获取头部信息

        var param = {deptId:this.deptId,isOrg:isOrg};
        this.$http.post("/concats_api/query_team_members",param).then(function (response) {
            var resp = response.data.result;
            if(resp.length>0){
                _self.hasMember = "y";
            }else{
                _self.hasMember = "n";
            }
            _self.items = resp;
            console.info(response.data.result);
        }).catch(function (error) {
            console.info(error);
        });
        console.info(param);
        this.$http.post("/concats_api/query_dept_list",param).then(function (response) {
            var newJson =response.data.result;
            var deptHtml = '';
            for(var j=0;j<newJson.length;j++){
                var arrJ = newJson[j];
                var teamId = arrJ.teamId;
                var deptId = arrJ.deptId;
                var deptName = arrJ.deptName;
                var memberNum = arrJ.memberNum;
                var urlPram = 'org=y';//默认为组织架构进入
                if(_self.org=='x'){//发送名片
                    urlPram='org=x&userId='+_self.userId+'&teamId='+teamId+'&deptId='+deptId;
                }else if(_self.org=='y'){//组织架构进入
                    urlPram = 'org=y&teamId='+teamId+'&deptId='+deptId;
                }else if(_self.org=='n'){//管理页面进入
                    urlPram = 'org=n&teamId='+teamId+'&deptId='+deptId;
                }else if(_self.org=='g'){//发起群聊页面进入
                    urlPram = 'org=g&tempId='+_self.userId+'&teamId='+teamId+'&deptId='+deptId;
                }
                if(_self.org=='x'){
                    deptHtml+='<li class="mui-table-view-cell text" style="margin-top:-10px;">'+
                        '<a class="mui-navigate-right" href="javascript:appApi.openNewWindow(\'/subdivision?'+urlPram+'\')">'
                        +deptName+'<span class="mui-badge mui-badge-inverted">'+memberNum+'</span></a>'+
                        '</li>';
                } else{
                    deptHtml+='<li class="mui-table-view-cell text" style="margin-top:-10px;">'+
                        '<a class="mui-navigate-right" href="javascript:appApi.openNewWindow(\'/subdivision?'+urlPram+'\')">'
                        +deptName+'<span class="mui-badge mui-badge-inverted">'+memberNum+'</span></a>'+
                        '</li>';
                }
                
            }
            document.getElementById("deptHtml").innerHTML=deptHtml;
        }).catch(function (error) {
            //alert("获取部门信息失败,请联系管理员!");
            console.info(error);
        });

    },
    filters: {
        getImageUrl: function (val) {
            if(val==null || val=="") return "/static/images/60x60.gif";
            return val;
        }
    },
    methods:{
        ccc(){
            console.log(1111)
        },
        one(){
            this.$router.push({path:'/batchOpeMember',query:{type:4,teamId:this.$route.query.teamId,deptId:this.$route.query.deptId}})
        },
        tow(){
            this.$router.push({path:'/batchOpeMember',query:{type:6,teamId:this.$route.query.teamId,deptId:this.$route.query.deptId}})
        },
        three(){
            this.$router.push({path:'/batchOpeMember',query:{type:7,teamId:this.$route.query.teamId,deptId:this.$route.query.deptId}})
        },
        showhide(){
            this.show1 = !this.show1
        },
        setUp(){
            console.log(1111)
            this.$router.push({path:'/branch_set',query:{teamId:this.$route.query.teamId,hasMember:this.hasMember,deptId:this.$route.query.deptId}})
        },
        department(){
            this.$router.push({path:'/addSubdivision',query:{teamId:this.$route.query.teamId,deptId:this.$route.query.deptId}});
        },
        manual(){
            this.$router.push({path:'/add_manually',query:{type:1,teamId:this.$route.query.teamId,deptId:this.$route.query.deptId}});
        },
        mailList(){
            this.$router.push({path:'/select_phone_list',query:{type:1,teamId:this.$route.query.teamId,deptId:this.$route.query.deptId}});
        },
        join(){
            console.log(1111)
            this.add_type = !this.add_type;
        },
        goBack(){
            this.$router.go(-1)
        },
        edit(index,item){
            if(this.org=='x'){
                // this.$router.push({path:'/contact_edit',query:{imId:this.items[index].imId,userAvatar:this.items[index].userAvatar,memberName:this.items[index].memberName,userId:this.items[index].userId}});
                this.sendCard(item.imId,item.headerImage,item.name,item.userId)
                console.log(item)
            }else if(this.org=='n' || this.org=='y'){
                // console.log(this.items[index]);
                this.$router.push({path:'/eg_details',query:{userId:this.items[index].userId}});
            }
        },
        sendCard(imId,headerImage,rName,recUserId) {
            var cardUserId;
            /*if(from==1){//团队中
                cardUserId = window.location.href.split('?')[1].split('=')[2].split("&")[0];//名片userId
            }else{//好友
                cardUserId = window.location.href.split('?')[1].split('=')[1];//名片userId
            }*/
            cardUserId = this.$route.query.userId;//名片userId

            var url="http://java.winfreeinfo.com/static/webstatic/contacts/eg_details.html?userId="+cardUserId;//名片地址
            var phone;//名片手机号
            var nickName;//名片昵称
            var avatarUrl;//名片头像地址
            var chatType = "1";//默认单聊

            var param = new FormData();
            param.append("userId", cardUserId);//根据名片userId查询名片名称、头像、手机号
            this.$http.post("/concats_api/query_contacts_info", param).then(function (response){
                var data = response.data.result.contactsInfoVO;
                console.log(data)
                nickName = data.nickName;
                avatarUrl = data.userAvatar;
                phone = data.cellPhone;
                var loginUserId = data.loginUserId;
                if(recUserId == loginUserId){
                    alert("名片不能发送给自己!");
                    return;
                }

                //var jsonStr = {phone:phone,nickName:nickName,avatarUrl:avatarUrl,url:url,toImId:imId,toAvatarUrl:headerImage,toNickName:rName,chatType:chatType};
                var jsonStr = '{"phone":"'+phone+'","nickName":"'+nickName+'","avatarUrl":"'+avatarUrl+'","url":"'+url+'","toImId":"'+imId+'","toAvatarUrl":"'+headerImage+'","toNickName":"'+rName+'","chatType":"'+chatType+'"}';
                console.info(jsonStr);
                appApi.sendVisitingCard(jsonStr);//发送名片
                appApi.openChat(imId,headerImage,rName,1);//打开聊天窗口
            }).catch(function (error) {
                console.info(error);
            });
        },
    }
}
</script>

<style scoped>
    .post{
        position: relative;
        left: -163px;
    }
    .text{
        text-align: left
    }
    .mui-popover{
        display: block
    }
</style>
