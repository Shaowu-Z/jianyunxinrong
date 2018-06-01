let _this = this;
const contacts = {
_self : window,
//团队部门选择公用弹出
 getSubDept(teamId,parentDeptId) {//查询下级部门列表(部门ID为空或者0时，查询团队ID下的一级部门列表)
    var deptInId = 0;
    var par = {deptId:parentDeptId,teamId:teamId,parentDeptId:deptInId};
    console.info(par);
    this.$http.post("/concats_api/query_dept_list",par).then(function (response) {
        var newJson =response.data.result;
        console.info(newJson);
        var deptHtml = '<ul class="mui-table-view group-list">';
        for(var j=0;j<newJson.length;j++){
            var arrJ = newJson[j];
            var deptId = arrJ.deptId;
            var deptName = arrJ.deptName;
            deptHtml+='<li class="mui-table-view-cell mui-radio">'+
                '<div class="oa-contact-cell mui-table" onclick="app.save_dept()">'+
                '<div class="oa-contact-input mui-table-cell"><input type="radio" name="check1" value="'+deptId+'='+deptName+'"/></div>'+
                '<div class="oa-contact-content mui-table-cell">'+
                '<h4 class="oa-contact-name">'+deptName+'</h4>'+
                '</div>'+
                '</div>';

                //如果有下级部门才显示下级按钮
                var lowerDeptNum = arrJ.lowerDeptNum;
                if(lowerDeptNum>0){
                    deptHtml+='<div class="sub-btn" onclick="getSubDept('+teamId+','+deptId+')"><span class="mui-icon iconfont icon-sub"></span>下级</div>';
                }
                deptHtml+='</li>';
        }
        deptHtml=deptHtml+'</ul>';
        document.getElementById("deptHtml").innerHTML=deptHtml;
    }).catch(function (error) {
        //alert("获取部门信息失败,请联系管理员!");
        console.info(error);
    });
},

 cancelSelect(select_dept) {
    document.getElementById(select_dept).style.display="none";
},

//设置部门页头部信息 (org:是否组织管理进入，is_dept:是否在部门中调用) userId:名片userId或者群聊临时表ID
setDeptHead(org,is_dept,teamId,deptId,userId){
    var par = {deptId:deptId,teamId:teamId};
    console.log(11111,contacts._self);
    console.log(222222222,contacts)
    _this.$http.post("/concats_api/query_team_dept",par).then((response) => {
        var newJson =response.data.result;
        console.info("info=="+newJson);
        console.info(newJson.regionName);
        var rTeamId = newJson.teamId;//团队ID
        var rDeptId = newJson.deptId;
        var rTeamName = newJson.teamName;
        var deptHtml = '';
        var teamUrl = "";

        if(org=='y'){//组织架构进入
            var hostUrl = getPagePath()+"/contacts/address_list.html";
            deptHtml += '<a href="javascript:appApi.openNewWindow(\''+hostUrl+'\')">联系人</a>  >';
            teamUrl = getPagePath()+"/contacts/org_structure.html?from=0&teamId="+rTeamId;
        }else if(org=='x'){//发送名片
            teamUrl = getPagePath()+"/contacts/org_structure.html?from=1&userId="+userId+"&teamId="+rTeamId;
        }else if(org=='n'){
            teamUrl = getPagePath()+"/contacts/group_address_m.html?teamId="+rTeamId;
        }else if(org=='g'){
            teamUrl = getPagePath()+"/contacts/org_structure.html?from=2&tempId="+userId+"&teamId="+rTeamId;
        }

        if(is_dept=='y'){//团队的部门中
            deptHtml += '<a href="javascript:appApi.openNewWindow(\''+teamUrl+'\')">'+rTeamName+'</a>  > ';
        }else{
            deptHtml += rTeamName+' ';
        }

        var pDeptNames = newJson.regionName;//上级部门名称(所有上级部门)
        if(pDeptNames!=null && pDeptNames.split(",").length>1){
            var deptNameArr = pDeptNames.split(",");
            for(var i=deptNameArr.length-1;i>0;i--){
                if(i>0){//当前部门往上
                    var arri = deptNameArr[i].split("=");
                    var deptIdI = arri[0];
                    var deptNameI = arri[1];
                    var deptUrl ="";
                    if(org=='y'){//组织架构进入
                        deptUrl = getPagePath()+"/contacts/subdivision.html?org=y&teamId="+rTeamId+"&deptId="+deptIdI;
                    }else if(org=='x'){//发送名片
                        deptUrl = getPagePath()+"/contacts/subdivision.html?org=x&userId="+userId+"&teamId="+rTeamId+"&deptId="+deptIdI;
                    }else if(org=='n'){//管理页面
                        deptUrl = getPagePath()+"/contacts/subdivision.html?org=n&teamId="+rTeamId+"&deptId="+deptIdI;
                    }else if(org=='g'){//发起群聊
                        deptUrl = getPagePath()+"/contacts/subdivision.html?org=g&tempId="+userId+"&teamId="+rTeamId+"&deptId="+deptIdI;
                    }
                    if(i==1){//当前部门
                        deptHtml += ' '+deptNameI;
                    }else{
                        deptHtml += '<a href="javascript:appApi.openNewWindow(\''+deptUrl+'\')">'+deptNameI+'</a>  > ';
                    }
                }
            }
        }
        document.getElementById("dept_head").innerHTML=deptHtml;
    }).catch( (error) => {
        //alert("获取部门信息失败,请联系管理员!");
        console.info(error);
    });
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

    var url="/static/webstatic/contacts/eg_details.html?userId="+cardUserId;//名片地址
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

//发起群聊,创建群组(tempId等于0，表示第一次进入，临时表未添加数据,对临时表做insert操作，其他的情况，做增量更新)
groupChat(tempId){
    var userIds = "";//获取选中的userId
    //var checkedObj = list.querySelectorAll('input[type="checkbox"]:checked');
    var checkedObj = $('input[type="checkbox"]:checked'); 
    for(var i=0; i<checkedObj.length;i++){
        if(i==checkedObj.length-1){
            userIds+=checkedObj[i].value;
        }else{
            userIds+=checkedObj[i].value+",";
        }
    }
    var param={};
    if(tempId==0){
        //往临时表插入数据,返回ID
        param = {operateType:0,userIds:userIds};
    }else{
        //更新临时表
        param = {operateType:1,userIds:userIds,tempId:tempId};
    }

    this.$http.post("/concats_api/update_gm_temp",param).then(function (response) {
        var data = response.data.result;
        console.info(data);
        var url="/static/webstatic/contacts/group_create.html?tempId="+data.tempId;//
        appApi.openNewWindow(url);
    }).catch(function (error) {
        console.info(error);
    });

},

//手机通讯录转换数据 wyj
convertData (resultCon, resultPhone) {
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
}
export default contacts;