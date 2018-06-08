/**
 * 配置常用参数
 * auth panzhenfei
 * 2018.6.7
 */
var opt = {"type": "date", "beginYear": 2000, "endYear": parseInt(new Date().getFullYear())+10};

import {getParam} from '../../playform/common.js'  
import setting from '../../playform/config.js'
var project={};
var projectImg={};
var paramMap= getParam(window.location.href);//获取地址栏参数
//alert(window.location.href)
var time_name="小时算一个工";
var gongzhangId=null
var gongzhangName=null;
var gongzhangPhone=null;
var gongrenId=null;
var gongrenName=null;
var gongrenPhone=null;
var loginType="";//身份（0是工人；1是工头）
var recordType=paramMap.recordType;//单据类型
var dataType=paramMap.dataType;//显示数据类型；calendar显示我创建的和待我确认的，confirm只显示待我确认的
var queryTime = paramMap.queryTime;
var mutil=paramMap.mutil;//判断是否是批量记工
var serialNum=paramMap.serialNum;//序列号
var localgps=paramMap.localgps;
var type=null;//判断是多人还是单人
var roomId="";
if(paramMap.roomId){
    roomId=paramMap.roomId;
}
var saveType=paramMap.saveType;//记录类型;//保存类型，add(默认新增)、save(创建关联单据)、del(删除)、update(修改自己的单据)、edit(修改自己的)
var userName = decodeURI(setting.getCookie("username"));

var userId = setting.getCookie("userid");
var date=null;//初始化当前日期

//由于ID不一样，需要分几种参数获取
//从地址栏获取项目ID**************
var projectId="";
var projectSn="";
var projectSN="";
if(paramMap.projectId){
    projectId=paramMap.projectId;//默认从链接获取
}
else if(paramMap.projectSn){//默认从链接获取
    projectSn=paramMap.projectSn;
    projectId=paramMap.projectSn;
}
else if(paramMap.projectSN){//默认从链接获取
    projectId=paramMap.projectSN;
    projectSN=paramMap.projectSN;
    projectSn=paramMap.projectSN;
}

//从地址栏获取项目ID**************

var projectName="";
if(paramMap.projectName){
    projectName = paramMap.projectName;//默认从链接获取
}
var confirmId=null;
if(paramMap.confirmId){//默认从链接获取
    confirmId=paramMap.confirmId;
}
var confirmName=null;
if(paramMap.confirmName){//默认从链接获取
    confirmName=paramMap.confirmName;
}
var confirmPhone=null;
var _self=null;
var axios=null;




var laowu_common={


     project:project,
     projectImg:projectImg,
     paramMap:paramMap,//获取地址栏参数
     time_name:time_name,
     gongzhangId:gongzhangId,
     gongzhangName:gongzhangName,
     gongzhangPhone:gongzhangPhone,
     gongrenId:gongrenId,
     gongrenName:gongrenName,
     gongrenPhone:gongrenPhone,
     loginType:loginType,//身份（0是工人；1是工头）
     recordType:recordType,//单据类型
     dataType:dataType,//显示数据类型；calendar显示我创建的和待我确认的，confirm只显示待我确认的
     queryTime:queryTime,
     mutil:mutil,//判断是否是批量记工
     serialNum:serialNum,//序列号
     localgps:localgps,
     type:type,//判断是多人还是单人
     roomId:roomId,
     saveType:paramMap.saveType,//记录类型;//保存类型，add(默认新增)、save(创建关联单据)、del(删除)、update(修改自己的单据)、edit(修改自己的)
     userName:decodeURI(setting.getCookie("username")),
     userId:setting.getCookie("userid"),
     //date:laowu_commongetNowFormatDate(),//初始化当前日期
     projectId:paramMap.projectSN,
     projectSN:paramMap.projectSN,
     projectSn:paramMap.projectSN,
     projectName:paramMap.projectName,//默认从链接获取
     confirmId:paramMap.confirmId,
     confirmName:paramMap.confirmName,
     confirmPhone:confirmPhone,



/**
 * 加载房间信息
 */
 findRoomData:function() {
     _self=laowu_common._self;
     axios=laowu_common.axios;
    console.log("加载房间信息...")
    if(dataType=="tododetail"||dataType=="todoview"||dataType=="todosign"||dataType=='todowork'){//从待办入口进来，房间ID参数不一样
        if(paramMap.roomId==null||paramMap.roomId==""||paramMap.roomId=="null"){
            msg("房间参数异常,将使用默认的房间ID,roomId=198，房间名称为测试5");
            //roomId=1068;
           roomId=1342;
            // roomId=1056;
        }else {
            roomId=paramMap.roomId;//获取房间ID
        }
    }else {//从房间点击链接
        if(paramMap.isRoomId==null||paramMap.isRoomId==""||paramMap.isRoomId=="null"){
            msg("房间参数异常,将使用默认的房间ID,roomId=122，房间名称为测试5");
            roomId=1342;
            //roomId=1329;
            // roomId=1056;
        }else {
            roomId=paramMap.isRoomId;//获取房间ID
        }
    }
    var formdata=new FormData();
    formdata.append("roomId",roomId)
    formdata.append("userId",userId)
    axios.post("/pcontact_api/getroommember",formdata).then(function (response) {
        if(response.data.code==0){
            var result=response.data.result;
            console.log("房间信息加载完成...",result)
            if(result){
                projectId=result.projectSn;
                projectSn=result.projectSn;
                projectSN=result.projectSn;
                projectName=result.projectName;
                if(result.memberType==1){//房主
                    loginType=1;
                    gongzhangId=userId;
                    gongzhangName=userName;
                }else {//如果是工人记工，则需要查询房主信息（工长信息）
                    loginType=0;
                    laowu_common.findroomuserlist(1);//加载房间成员信息
                    gongrenId=userId;
                    gongrenName=userName;
                   // gongrenPhone=paramMap.currUserPhone;//工人手机号
                }

            }

        }else {
           // msg("房间信息加载失败！")
            console.log("房间信息加载失败...")
        }
    }).catch(function (error) {
       // msg(error)
        console.info(error);
    });
},


/**
 * 加载房间的成员列表
 * @param memberType
 */
 findroomuserlist:function(memberType) {//查询房间成员
    var formdata=new FormData();
    formdata.append("roomId",roomId)
    formdata.append("memberType",memberType);
    axios.post("/pcontact_api/findroomuserlist",formdata).then(function (response) {
        if(response.data.code==0){
            var result=response.data.result;
            console.log("加载房间成员...",result)
            if(result.length>0){
                if(memberType==1){
                    gongzhangId= result[0].userId;
                    gongzhangName= result[0].nickName;
                    gongzhangPhone= result[0].cellPhone;
                }
            }

        }
    }).catch(function (error) {
        msg(error)
        console.info(error);
    });
},

/**
 * 根据项目ID查询项目详细信息
 */
 findProjectData:function() {
    var formdata=new FormData();
    formdata.append("projectSN",projectId)
    formdata.append("usedType",'xiaolanmu');
    axios.post("/chart/column/table_swprojectinfo?used=getinfo",formdata).then(function (response) {
        project=response.data.result;

    }).catch(function (error) {
        msg(error)
        console.info(error);
    });
    return project;
},

/**
 * 根据项目ID查询项目图片
 */
 findProjectImg:function() {

    var formdata=new FormData();
    formdata.append("projectSN",projectId)
    formdata.append("usedType",'xiaolanmu');
    axios.post("/chart/column/w_swprojectimg?used=getPro",formdata).then(function (response) {
        projectImg=response.data.result[0];
        console.log("img",response)

    }).catch(function (error) {
        msg(error)
        console.info(error);
    });


    return projectImg;
},

/**
 * 查询与当前位置最近的项目
 * @returns {{}}
 */
 findNearPlaceProject:function() {

    var project=null;
    $.ajax({
        type: "post",
        url: getUrl()+"/project_work_api/find_common_record",
        async: false,
        data: {
            "userId":userId,
            "queryType":'nearplace',
            "loginType":0,
        },
        datatype: "json",
        success: function(data) {
            console.log("project",data)
        },
        error: function() {
            console.log("err")
        }
    });
    return project;
},
/**
 * 根据用户ID查询用户信息
 */
 findUserInfo:function(userId) {
    if(!userId){
        msg("用户ID不能为空")
        return
    }
    var obj=new Object();
    var userList=[];
    userList.push(userId);
    obj.list=userList;
    axios.post(getUrl()+"/project_work_api/find_user_info_by_id",obj).then(function (response) {
        if(response.data.code=200){
            if(response.data.result.length>0){
                console.log("用户信息",response.data.result)
            }
        }
    }).catch(function (error) {
        console.info(error);
    });
},

    /**
     *查询合作过的工长信息列表
     */
     findTotgetTherList:function(key) {
        var list=[];
        $.ajax({
            type: "post",
            url: getUrl()+"/project_work_api/find_torget_list",
            async: false,
            data: {
                "userId":userId,
                "keyword":key
            },
            datatype: "json",
            success: function(data) {
                console.log(data)
                var result=data.result;
                if(result.length>0){
                    list=result;
                }
            },
            error: function() {
                console.log("err")
            }
        });

        return list;

    },

    /**
     *查询我所属的劳务班组的项目列表
     */
     findWithMeList:function(key) {
        var list=[];
        $.ajax({
            type: "post",
            url: getUrl()+"/project_work_api/find_laour_member",
            async: false,
            data: {
                "userId":userId,
                "keyword":key,
                "queryType":"mypro"
            },
            datatype: "json",
            success: function(data) {
                console.log("项目",data)
                var result=data.result;
                if(result.length>0){
                    list=result;
                }
            },
            error: function() {
                console.log("err")
            }
        });
        return list;

    },
    /**
     *邀请工长创建项目，可邀请多人
     * userId 工长ID
     * phone 工长手机号
     */
     findTotgetinvite:function(phonelist,remark) {
        var formData=new FormData();
        formData.append("userId",userId)
        formData.append("name",userName)
        formData.append("list",phonelist)
        formData.append("data",remark)
        formData.append("url",getUrl()+"/static/webstatic/chatroom/xiangmu_add.html")
        axios.post(getUrl()+"/project_work_api/find_torget_invite",formData).then(function (response) {
            if(response.data.code==200){
                msg("邀请成功");
                hidewindow();
                hidebackdrop();
            }
        }).catch(function (error) {
            msg(error)
            console.info(error);
        });
    },

//查询所有参与过的项目
  findProjectList:function() {
    axios.post(getUrl()+"/chart/column/table_swprojectinfo?used=getPro",{}).then(function (response) {
        console.log("项目列表",response.data.result)
        _self.$data.items = response.data.result;
    }).catch(function (error) {
        console.info(error);
    });

},

    /**
     * 后台接口调用测试
     */
     testRequestServer:function() {
        //alert(1)
       var formData=new FormData();
       ///message_system/get_notice_todo
        ///project_work_api/test_request_server
        axios.post(getUrl()+"/message_system/get_notice_todo").then(function (response) {
            console.log(response)
            if(response.data.code==0){
                msg("接口调用成功！")
            }
        }).catch(function (error) {
            msg(error)
            console.info(error);
        });
    },


/**
 * 获取当前日期的年月日格式yyyy-mm-dd
 * @returns {string}
 */
 getNowFormatDate:function() {
    var dateObj=new Object();
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    //返回日期，精确到时分秒
    // var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    //  + " " + date.getHours() + seperator2 + date.getMinutes()
    //  + seperator2 + date.getSeconds();
    //返回日期
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate

    return currentdate;
},


 formDate :function(value){
    var date = new Date(value);
    Y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        H = date.getHours(),
        i = date.getMinutes(),
        s = date.getSeconds();
    if (m < 10) {
        m = '0' + m;
    }
    if (d < 10) {
        d = '0' + d;
    }
    if (H < 10) {
        H = '0' + H;
    }
    if (i < 10) {
        i = '0' + i;
    }
    if (s < 10) {
        s = '0' + s;
    }
    // <!-- 获取时间格式 2017-01-03 10:13:48 -->
    // // var t = Y+'-'+m+'-'+d+' '+H+':'+i+':'+s;
    // <!-- 获取时间格式 2017-01-03 -->
    // //  var t = Y + '-' + m + '-' + d;
    var t = H + ':' + i + ':' + s;

    return t;
},

//刷新页面
 reLoad:function() {
    setTimeout(function () {
        window.history.go(0);
    },1000)

},

//关闭窗口页面
  closeWindow:function() {
    setTimeout(function () {
       appApi.refreshData();
    },1500)
    closeLayer();
},

 closePop:function(id) {
    setTimeout(function () {
        mui('#'+id).popover('toggle');
    },100)
},

 closeLayer:function() {
    setTimeout(function () {
        layer.closeAll();
    },1000)
},

 showmsg:function(msg) {
    layer.open({
        content: msg
        ,skin: 'msg'
        ,time: 3 //2秒后自动关闭
    });
},
  checkMoney:function(money) {
    if(money==0){
        msg("金额不能为0")
        return false;
    }else {
        var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        if (reg.test(money)) {
            return true;
        }else{
            msg("金额格式错误")
            return false;
        }
    }

},


  showAppDiv:function() {
    if(document.getElementById("app")!=null)
    document.getElementById("app").style.display='block';
},
  showULDiv:function() {
    if(document.getElementById("uldiv")!=null)
    document.getElementById("uldiv").style.display='block';
},
  showWarning:function() {
    if(document.getElementById("warning")!=null)
    document.getElementById("warning").style.display='block';
},
  showtodayWarning:function() {
    if(document.getElementById("todayWarning")!=null)
    document.getElementById("todayWarning").style.display='block';
},
  showlastdayWarning:function() {
    if(document.getElementById("lastdayWarning")!=null)
    document.getElementById("lastdayWarning").style.display='block';
},
  hideWarning:function() {
    if(document.getElementById("warning")!=null)
    document.getElementById("warning").style.display='none';
},
  showNoProject:function() {
    if(document.getElementById("noproject")!=null)
    document.getElementById("noproject").style.display='block';
},
  showbackdrop:function() {
    if(document.getElementById("backdrop")!=null)
    document.getElementById("backdrop").style.display='block';
},
  showwindow:function() {
    if(document.getElementById("window")!=null)
    document.getElementById("window").style.display='block';
},
  showwindowDiv:function() {
    if(document.getElementById("windowdiv")!=null)
    document.getElementById("windowdiv").style.display='block';
},
  hidebackdrop:function() {
    if(document.getElementById("backdrop")!=null)
    document.getElementById("backdrop").style.display='none';
},
  hidewindow:function() {
    if(document.getElementById("window")!=null)
    document.getElementById("window").style.display='none';
},
  hidewindowDiv:function() {
    if(document.getElementById("windowdiv")!=null)
    document.getElementById("windowdiv").style.display='none';
},
  hideremind:function() {
    if(document.getElementById("remind")!=null)
    document.getElementById("remind").style.display='none';
},
  showremind:function() {
    if(document.getElementById("remind")!=null)
    document.getElementById("remind").style.display='block';
},


 confirmLayer:function(msg, Fn,cFn,cancelText,confirmText) {
    layer.open({
        content: msg
        , btn: [confirmText,cancelText]
        , yes: function (index) {
            //alert("确定");
            Fn && Fn();
        }, no: function (index) {
           // alert("取消");
            cFn && cFn();
        }
    });

},


/**
 * 坐标距离计算
 * @param localZuobiao //当前位置坐标
 * @param compareZuobiao  //要比较的坐标
 * @returns {number}
 */
 getGreatCircleDistance:function(localZuobiao, compareZuobiao) {

    var EARTH_RADIUS = 6378137.0; //单位M

    var l1Arr = localZuobiao.split(",");
    var l2Arr = compareZuobiao.split(",");

    var lat1 = l1Arr[1]; /*维度*/
    var lng1 = l1Arr[0]; /*经度*/
    var lat2 = l2Arr[1];
    var lng2 = l2Arr[0];

    var radLat1 = getRad(lat1);
    var radLat2 = getRad(lat2);

    var a = radLat1 - radLat2;
    var b = getRad(lng1) - getRad(lng2);

    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000.0;

    //console.log("坐标计算",s)
    //return true;
    return s ;
},


 getRad:function(d) {

    var PI = Math.PI;
    return d * PI / 180.0;
}

}
export default laowu_common