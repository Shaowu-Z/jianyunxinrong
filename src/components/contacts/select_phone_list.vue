<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <button id="btn-referrer" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left" @click="goBack">
                <span class="mui-icon mui-icon-back"></span>联系人
            </button>
            <h1 class="mui-title">手机通讯录批量选择</h1>
            <button id='done' class="mui-btn mui-btn-nav mui-btn-primary mui-pull-right mui-disabled" onclick="batchAddFromPhoneList()">确定</button>
        </header>

        <section class="mui-content" id="phone_list">
            <div id='list' class="mui-indexed-list address-list hide">
                <div class="mui-indexed-list-search mui-input-row mui-search">
                    <input type="search" class="mui-input-clear mui-indexed-list-search-input" placeholder="搜索">
                </div>
                <div class="mui-indexed-list-bar">
                    <div class="align-middle">
                        <a>A</a>
                        <a>B</a>
                        <a>C</a>
                        <a>D</a>
                        <a>E</a>
                        <a>F</a>
                        <a>G</a>
                        <a>H</a>
                        <a>I</a>
                        <a>J</a>
                        <a>K</a>
                        <a>L</a>
                        <a>M</a>
                        <a>N</a>
                        <a>O</a>
                        <a>P</a>
                        <a>Q</a>
                        <a>R</a>
                        <a>S</a>
                        <a>T</a>
                        <a>U</a>
                        <a>V</a>
                        <a>W</a>
                        <a>X</a>
                        <a>Y</a>
                        <a>Z</a>
                        <a>#</a>
                    </div>
                </div>
                <div class="mui-indexed-list-alert"></div>
                <div class="mui-indexed-list-inner">
                    <div id="empty-view" class="mui-indexed-list-empty-alert">没有数据</div>
                    <ul class="mui-table-view">
                        <div v-for="(items,index1) in phones" :key="index1">
                            <div v-for="(item,index2) in items" :key="index2">
                                <div v-if="item.name">
                                    <div v-if="item.isp == 1">
                                        <li :data-group="item.first" class="mui-table-view-divider mui-indexed-list-group">
                                            {{item.first}}
                                        </li>
                                    </div>
                                    <li :data-value="item.first" class="mui-table-view-cell mui-indexed-list-item mui-checkbox">
                                        <!--<a :href="['javascript:appApi.openNewWindow(pagepath+\'/contacts/eg_details.html?phone='+item.phone+'&name='+item.name+'\')']">-->
                                        <div class="mui-slider-cell">
                                            <div class="oa-contact-cell mui-table">
                                                <div class="oa-contact-input mui-table-cell"><input type="checkbox" :value="item.name+'='+item.phone"/></div>
                                                <div class="oa-contact-avatar mui-table-cell">
                                                    <span class="oa-pic-default bgr2" v-text="item.name"></span>
                                                </div>
                                                <div class="oa-contact-content mui-table-cell">
                                                    <h4 class="oa-contact-name" v-text="item.name"></h4>
                                                    <p class="oa-contact-email" v-text="item.phone"></p>
                                                </div>
                                            </div>
                                        </div>
                                        <!--</a>-->
                                        <!--<button v-show="item.is_add" @click="addFriends(index1, index2)" class="mui-btn">添加</button>
                                        <button v-show="!item.is_add" class="mui-btn mui-btn-link mui-badge mui-badge-inverted">已添加</button>-->
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
    data(){
        return{
            phones: []
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        },
        addFriends (index1, index2){
            var phoneMap = this.$data.phones[index1][index2];
            var addVo = {cellPhone: phoneMap.phone, receivedUserName: phoneMap.name};
            phoneMap.is_add= !(phoneMap.is_add);
            this.$http.post("/concats_api/insert_add_info", addVo).then(function (response) {
                var friendVO = response.data.result;
                if(friendVO.isOwnOrFriend=="0"){
                    msg("不可添加自己为好友!");
                }else if(friendVO.isOwnOrFriend=="1"){
                    msg("此用户已是你的好友!");
                }else{
                    msg('好友请求发送成功！');
                    // window.location.href = "../contacts/address_list.html";
                }

            }).catch(function (error) {
                remin("好友请求发送失败，请联系管理员!", 2);
                console.info(error);
            });
        },
        importPhones () {
            //loading("同步中...");
            appApi.getContacts()

        },
        // function updated () {//DOM更新时，进行调用的方法
        //     document.getElementById("list").style.display = "block";
        //     mui.ready(function () {
        //         var header = document.querySelector('header.mui-bar');
        //         var list = document.getElementById('list');
        //         list.style.height = (document.body.offsetHeight - header.offsetHeight) + 'px';
        //         // alert(list.innerHTML);
        //         window.indexedList = new mui.IndexedList(list)
        //     });
        // }
    },
    mounted(){
        function batchAddFromPhoneList() {
            var type = this.$route.query.type;
            var newJsonMember = [];
            var teamId = 0;
            var deptId;
            var locationUrl ="";
            if(type==1){//部门中添加
                teamId = this.$route.query.teamId; 
                deptId = this.$route.query.deptId;
                this.$router.push({path:'/subdivision',query:{teamId:teamId,deptId:deptId}})
            }else{
                teamId = this.$route.query.teamId;
                this.$router.push({path:'/groupAddress',query:{teamId:teamId}})
            }

            var checkedObj = list.querySelectorAll('input[type="checkbox"]:checked');
            for(var i=0; i<checkedObj.length;i++){
                var indexValue = checkedObj[i].value;

                var memberName = indexValue.split("=")[0];
                var cellPhone = indexValue.split("=")[1];

                if(type==1){//部门添加
                    newJsonMember.push({teamId:teamId,deptId:deptId,memberName:memberName,phoneNumber:cellPhone,memberType:"0",createDate:new Date(),lastUpdateDate:new Date()});
                }else{
                    newJsonMember.push({teamId:teamId,memberName:memberName,phoneNumber:cellPhone,memberType:"0",createDate:new Date(),lastUpdateDate:new Date()});
                }
            }
            console.info(newJsonMember);

            var newJsonTeamVo = {teamId:teamId,projectTeamMemberTList:newJsonMember};
            this.$http.post("/concats_api/batch_add_member_f",newJsonTeamVo).then(function (response) {
                //_self.$data.items = response.data.result;
                loading('批量操作成功！');
                window.location.href = locationUrl;
            }).catch(function (error) {
                console.info(error);
                alert("系统异常，请联系管理员!");
            });
        }
        /*---------------我的通讯录-----------------*/
        //转换数据 wyj
        function convertData (resultCon, resultPhone) {
            if (resultCon && resultCon != "") {

                //加载手机号码
                var phoneArray = resultCon.split(",");
                var newArrs = new Array();
                for (var i = 0; i < 27; i++) {
                    newArrs[i] = new Array();
                }
                for (var j = 0; j < phoneArray.length; j++) {
                    var personPhoneArray = phoneArray[j].split("=");
                    var remarksName = personPhoneArray[0];
                    var f = makePy(remarksName.charAt(0))[0].toUpperCase();
                    var obj = {name: remarksName, phone: personPhoneArray[1]};
                    if(resultPhone.indexOf(personPhoneArray[1])>-1){
                        obj['is_add']=false;
                    }else{
                        obj['is_add']=true;
                    }
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
        appApi.callBackFun = function (callFlag, CONTENT) {
            isLoginIm = true;
            if (callFlag == appApi.callBackFlag.CONTACTS) {
                //查询用户的好友
                var param = new FormData();
                param.append("userId", "");
                this.$http.post("/concats_api/find_eg_list", param).then(function (response) {
                    var resultArray = response.data.result;
                    var resultStr = ",";
                    for(var i in resultArray){
                        resultStr = resultStr + resultArray[i].cellPhone + ",";
                    }
                    appPl.$data.phones = convertData(CONTENT.result, resultStr);
                }).catch(function (error) {
                    console.info(error);
                });



            }
            /* if(callFlag == appApi.callBackFlag.HX_LOGIN){
            var result = CONTENT.result;
            if(result == true){
            if(window.appApi.saveUserInfo(JSON.stringify(resultJson),password)){
            // console.info('保存用户信息成功！');
            // warm('保存用户信息成功！');
            }else{
            // console.info('保存用户信息失败！');
            // warm('保存用户信息到本地失败！');
            }
            loading('登录成功！正在跳转到主页！');
            window.appApi.goHome();
            }else{
            layer.close(index);
            warm('登录失败，请重新登录!');
            }
            }*/
        }
    },
    created: function () {
        appApi.getContacts();
    },
}
</script>

<style>

</style>
