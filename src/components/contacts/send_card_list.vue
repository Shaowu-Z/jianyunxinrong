<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <button id="btn-referrer" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left hide">
                <span class="mui-icon mui-icon-back"></span>取消
            </button>
            <h1 class="mui-title">选择联系人</h1>
            <!--<a class="mui-icon mui-icon-search mui-pull-right" href="javascript:appApi.openNewWindow(webPath+'/sear/index.htm')"></a>-->
            <button id='done' style="display: none" class="mui-btn mui-btn-nav mui-btn-primary mui-pull-right mui-disabled" onclick="groupChat(window.location.href.split('?')[1].split('=')[2])">确定</button>
        </header>
        <section class="mui-content" id="team_list">
            <div id="list" class="address-list" style="overflow: scroll">
                <div class="mui-indexed-list-search mui-input-row mui-search hide">
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
                </div>

                <div  v-for="(item,index) in items" :key="index">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell" @click ="open(item)">
                            <a>
                                <div class="mui-slider-cell">
                                    <div class="oa-contact-cell mui-table">
                                        <div class="oa-contact-avatar mui-table-cell">
                                            <img src="../../assets/images/ico_org.gif" />
                                        </div>

                                        <div class="oa-contact-content mui-table-cell">
                                            <!--<button v-if="item.memberType=='1'" :onclick="['appApi.openNewWindow(\'/static/webstatic/contacts/group_manage.html?teamId='+item.teamId+'\')']" class="mui-btn mui-btn-link btn-invite"><span class="mui-icon iconfont icon-invitation"></span>管理</button>-->
                                            <h4 class="oa-contact-name" v-text="item.teamName"></h4>
                                        </div>

                                    </div>
                                </div>
                            </a>
                            <!--<ul class="mui-table-view" v-show="true">
                                <li class="mui-table-view-cell" @click ="javascript:appApi.openNewWindow(pagepath+'/contacts/org_structure.html?teamId='+item.teamId)">
                                    <div class="mui-slider-cell">
                                        <div class="oa-contact-cell mui-table">
                                            <div class="oa-contact-avatar mui-table-cell">
                                                <img src="../../images/ico_second.gif" />
                                            </div>
                                            <div class="oa-contact-content mui-table-cell">
                                                <h4 class="oa-contact-name">组织结构</h4>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>-->
                        </li>
                    </ul>
                </div>
                <!--<h5 class="mui-content-padded content-added">以下为好友列表</h5>-->
                <h5 class="mui-content-padded content-added text">好友列表</h5>
                <div class="mui-indexed-list-inner">
                    <ul class="mui-table-view">
                        <div v-for="(items,index) in friendsList" :key="index">
                            <div v-for="(item,index) in items" :key="index">
                                <div v-if="item.name && from!='2'">
                                    <!--<div v-if="item.isp == 1">
                                        <li :data-group="item.first" class="mui-table-view-divider mui-indexed-list-group" v-text="item.first"></li>
                                    </div>-->
                                    <li :data-value="item.first" class="mui-table-view-cell mui-indexed-list-item mui-checkbox bor">
                                        <!--<a :href="['javascript:appApi.openNewWindow(pagepath+\'/contacts/eg_details.html?type=f&userId='+item.friendsUserId+'\')']">-->
                                        <a @click="sendCard(item.imId,item.headerImage,item.name,item.friendsUserId)">
                                            <!-- :href="['javascript:sendCard(\''+item.imId+'\',\''+item.headerImage+'\',\''+item.name+'\','+item.friendsUserId+')']" -->
                                            <div class="mui-slider-cell">
                                                <div class="oa-contact-cell mui-table">
                                                    <div class="oa-contact-avatar mui-table-cell">
                                                        <!--<span class="oa-pic-default bgr2" v-if="" v-text="item.name"></span>-->
                                                        <img :src="item.headerImage">
                                                    </div>
                                                    <div class="oa-contact-content mui-table-cell">
                                                        <h4 class="oa-contact-name" v-text="item.name"></h4>
                                                        <p class="oa-contact-email text" v-text="item.phone"></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </div>
                                <div v-if="item.name && from=='2'">
                                    <li :data-value="item.first" class="mui-table-view-cell mui-indexed-list-item mui-checkbox">
                                        <!--<a :href="['javascript:sendCard(\''+item.imId+'\',\''+item.headerImage+'\',\''+item.name+'\',0)']">-->
                                            <div class="mui-slider-cell">
                                                <div class="oa-contact-cell mui-table">
                                                    <div class="oa-contact-input mui-table-cell"><input type="checkbox" :value="item.friendsUserId"/></div>
                                                    <div class="oa-contact-avatar mui-table-cell">
                                                        <!--<span class="oa-pic-default bgr2" v-if="" v-text="item.name"></span>-->
                                                        <img :src="item.headerImage">
                                                    </div>
                                                    <div class="oa-contact-content mui-table-cell">
                                                        <h4 class="oa-contact-name" v-text="item.name"></h4>
                                                        <p class="oa-contact-email" v-text="item.phone"></p>
                                                    </div>
                                                </div>
                                            </div>
                                        <!--</a>-->
                                    </li>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data () {
        return {
            items:[],
			friendsList:[],
			userId:this.$route.query.userId,
			from:this.$route.query.from
        }
    },
    created: function () {
        let _self = this
        var from = this.$route.query.from;
        if(from==2){//创建群里进入
            $("#done").show();
        }
        this.$http.post("/concats_api/find_team_list",{}).then(function (response) {
            _self.items = response.data.result;
        }).catch(function (error) {
            console.info(error);
        });

        var param = new FormData();
        param.append("userId", "");
        this.$http.post("/concats_api/find_eg_list", param).then(function (response) {
            console.info(response.data.result);
            _self.friendsList = _self.convertData(response.data.result);
        }).catch(function (error) {
            console.info(error);
        });
    },
    methods:{
        open(item){
            // javascript:appApi.openNewWindow(pagepath+'/contacts/org_structure.html?from='+from+'&userId='+userId+'&teamId='+item.teamId)
            this.$router.push({path:'/org_structure',query:{from:this.from,userId:this.userId,teamId:item.teamId}})
        },
        //发送名片
        sendCard(imId,headerImage,rName,recUserId) {
            var cardUserId;
            /*if(from==1){//团队中
                cardUserId = window.location.href.split('?')[1].split('=')[2].split("&")[0];//名片userId
            }else{//好友
                cardUserId = window.location.href.split('?')[1].split('=')[1];//名片userId
            }*/
            cardUserId = window.location.href.split('?')[1].split('=')[2].split("&")[0];//名片userId

            var url="http://java.winfreeinfo.com/static/webstatic/contacts/eg_details.html?userId="+cardUserId;//名片地址
            var phone;//名片手机号
            var nickName;//名片昵称
            var avatarUrl;//名片头像地址
            var chatType = "1";//默认单聊

            var param = new FormData();
            param.append("userId", cardUserId);//根据名片userId查询名片名称、头像、手机号
            this.$http.post("/concats_api/query_contacts_info", param).then(function (response){
                var data = response.data.result.contactsInfoVO;
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
        //转换数据 wyj
	    convertData (friendArray) {
            if (friendArray && friendArray.length > 0) {

                var newArrs = new Array();
                for (var i = 0; i < 27; i++) {
                    newArrs[i] = new Array();
                }
                for (var j = 0; j < friendArray.length; j++) {

                    var f = friendArray[j].nameInitials.toUpperCase();
                    var headerImage = !friendArray[j].avatar|| friendArray[j].avatar=="" ? getUrl()+"/static/images/60x60.gif" : friendArray[j].avatar;
                    var obj = {name: friendArray[j].remarksName, phone:friendArray[j].cellPhone, friendsUserId: friendArray[j].friendsUserId, headerImage:headerImage,imId:friendArray[j].imId};
                    switch (f) {
                        case 'A' :
                            obj['first'] = 'A';
                            if (newArrs[0].length == 0) {
                                obj['isp'] = 1;
                            }
                            newArrs[0][newArrs[0].length] = obj;
                            break;
                        case 'B' :
                            obj['first'] = 'B';
                            if (newArrs[1].length == 0) {
                                obj['isp'] = 1;
                            }
                            newArrs[1][newArrs[1].length] = obj;
                            break;
                        case 'C' :
                            obj['first'] = 'C';
                            if (newArrs[2].length == 0) {
                                obj['isp'] = 1;
                            }
                            newArrs[2][newArrs[2].length] = obj;
                            break;
                        case 'D' :
                            obj['first'] = 'D';
                            if (newArrs[3].length == 0) {
                                obj['isp'] = 1;
                            }
                            newArrs[3][newArrs[3].length] = obj;
                            break;
                        case 'E' :
                            obj['first'] = 'E';
                            if (newArrs[4].length == 0) {
                                obj['isp'] = 1;
                            }
                            newArrs[4][newArrs[4].length] = obj;
                            break;
                        case 'F' :
                            obj['first'] = 'F';
                            if (newArrs[5].length == 0) {
                                obj['isp'] = 1;
                            }
                            newArrs[5][newArrs[5].length] = obj;
                            break;
                        case 'G' :
                            obj['first'] = 'G';
                            if (newArrs[6].length == 0) {
                                obj['isp'] = 1;
                            }
                            newArrs[6][newArrs[6].length] = obj;
                            break;
                        case 'H' :
                            obj['first'] = 'H';
                            if (newArrs[7].length == 0) {
                                obj['isp'] = 1;
                            }
                            newArrs[7][newArrs[7].length] = obj;
                            break;
                        case 'I' :
                            obj['first'] = 'I';
                            if (newArrs[8].length == 0) {
                                obj['isp'] = 1;
                            }
                            newArrs[8][newArrs[8].length] = obj;
                            break;
                        case 'J' :
                            obj['first'] = 'J';
                            if (newArrs[9].length == 0) {
                                obj['isp'] = 1;
                            }
                            newArrs[9][newArrs[9].length] = obj;
                            break;
                        case 'K' :
                            obj['first'] = 'K';
                            if (newArrs[10].length == 0) {
                                obj['isp'] = 1;
                            }
                            newArrs[10][newArrs[10].length] = obj;
                            break;
                        case 'L' :
                            obj['first'] = 'L';
                            if (newArrs[11].length == 0) {
                                obj['isp'] = 1;
                            }
                            newArrs[11][newArrs[11].length] = obj;
                            break;
                        case 'M' :
                            obj['first'] = 'M';
                            if (newArrs[12].length == 0) {
                                obj['isp'] = 1;
                            }
                            newArrs[12][newArrs[12].length] = obj;
                            break;
                        case 'N' :
                            obj['first'] = 'N';
                            if (newArrs[13].length == 0) {
                                obj['isp'] = 1;
                            }
                            newArrs[13][newArrs[13].length] = obj;
                            break;
                        case 'O' :
                            obj['first'] = 'O';
                            if (newArrs[14].length == 0) {
                                obj['isp'] = 1;
                            }
                            newArrs[14][newArrs[14].length] = obj;
                            break;
                        case 'P' :
                            obj['first'] = 'P';
                            if (newArrs[15].length == 0) {
                                obj['isp'] = 1;
                            }
                            newArrs[15][newArrs[15].length] = obj;
                            break;

                        case 'Q' :
                            obj['first'] = 'Q';
                            if (newArrs[16].length == 0) {
                                obj['isp'] = 1;
                            }
                            newArrs[16][newArrs[16].length] = obj;
                            break;
                        case 'R' :
                            obj['first'] = 'R';
                            if (newArrs[17].length == 0) {
                                obj['isp'] = 1;
                            }
                            newArrs[17][newArrs[17].length] = obj;
                            break;
                        case 'S' :
                            obj['first'] = 'S';
                            if (newArrs[18].length == 0) {
                                obj['isp'] = 1;
                            }
                            newArrs[18][newArrs[18].length] = obj;
                            break;
                        case 'T' :
                            obj['first'] = 'T';
                            if (newArrs[19].length == 0) {
                                obj['isp'] = 1;
                            }
                            newArrs[19][newArrs[19].length] = obj;
                            break;
                        case 'U' :
                            obj['first'] = 'U';
                            if (newArrs[20].length == 0) {
                                obj['isp'] = 1;
                            }
                            newArrs[20][newArrs[20].length] = obj;
                            break;
                        case 'V' :
                            obj['first'] = 'V';
                            if (newArrs[21].length == 0) {
                                obj['isp'] = 1;
                            }
                            newArrs[21][newArrs[21].length] = obj;
                            break;
                        case 'W' :
                            obj['first'] = 'W';
                            if (newArrs[22].length == 0) {
                                obj['isp'] = 1;
                            }
                            newArrs[22][newArrs[22].length] = obj;
                            break;
                        case 'X' :
                            obj['first'] = 'X';
                            if (newArrs[23].length == 0) {
                                obj['isp'] = 1;
                            }
                            newArrs[23][newArrs[23].length] = obj;
                            break;
                        case 'Y' :
                            obj['first'] = 'Y';
                            if (newArrs[24].length == 0) {
                                obj['isp'] = 1;
                            }
                            newArrs[24][newArrs[24].length] = obj;
                            break;
                        case 'Z' :
                            obj['first'] = 'Z';
                            if (newArrs[25].length == 0) {
                                obj['isp'] = 1;
                            }
                            newArrs[25][newArrs[25].length] = obj;
                            break;
                        default:
                            obj['first'] = '#';
                            if (newArrs[26].length == 0) {
                                obj['isp'] = 1;
                            }
                            newArrs[26][newArrs[26].length] = obj;

                    }
                }
                return newArrs;
            }else{
                return []
            }
        }
    }
}
</script>

<style scopde>
    .bor{
        border-bottom: 1px solid #ccc
    }
</style>
