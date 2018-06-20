/**
 * 日历操作
 * @type {{}}
 */
import laowu_common from "./laowu_common.js";
import signSrc from '@/assets/images/sign.png'
import dagouSrc from '@/assets/images/dagou.png'
import gantanhaoSrc from '@/assets/images/gantanhao.png'
import { join } from "path";

var map = new Map();
var workmap = null;//上班时长
var overmap = null;//加班时长
var statusmap=null;//操作状态
var attstatusmap=null;//操作状态
var countmap = null;//上班人数
var laowu_calendar={

    initVue:function(vue){
        laowu_common.initVue(vue)
    },



    getDataByMonthForManage:function(month) {
        $.ajax({
            type: "get",
            url: "/api/attendance_api/calendar_commonList",
            async: false,
            data: {
                "userid":laowu_common.userId,
                "type":"shigongyuan",
                "month":month,
                "projectId":laowu_common.projectId,
            },
            datatype: "json",
            contentType : 'application/json',
            success: function(data) {
                var result=data.result;
                console.log("结果列表",result)
                if(result && result.length>0){
                    countmap = new Map();
                    laowu_calendar.showDataOnMonthForManage(result);
                }
            
        },error: function(error) {
            console.log(error)
        }
    
      })
    },

/**
 * 获取某月份的数据
 * @param month
 */
 getDataByMonth:function(month) {

    var queryType="";//查询类型
    var loginType=laowu_common.loginType
    var gongzhangId=laowu_common.gongzhangId
    var userId=laowu_common.userId
    var projectId=laowu_common.projectId
    if(loginType==1){
        queryType='gongzhang';
    }else {
        queryType='gongren';
    }
    
    var obj=new Object();
    obj.userId=userId;
    obj.confirmId=gongzhangId;
    obj.queryTime=month;
    obj.queryType=queryType;
    obj.queryStatus=3;
    obj.loginType=loginType;
    obj.projectId=projectId;

    $.ajax({
        type: "post",
        url: "/api/project_work_api/find_record_month",
        async: false,
        data: JSON.stringify(obj),
        datatype: "json",
        contentType : 'application/json',
        success: function(data) {
            var result=data.result;
            if(result){
            console.log("获取月份数据...",result)
            attstatusmap = new Map();
            laowu_calendar.getAttByMonth(month);
            setTimeout(function () {
                if(result.length>0){
                    workmap = new Map();
                    overmap = new Map();
                    statusmap = new Map();
                    laowu_calendar.showDataOnMonth(result);
                }
            },150)
                

            }
        },
        error: function() {
            console.log("err")
        }
    })
 


},



 getAttByMonth:function(month) {

    var userId=laowu_common.userId
    var gongzhangId=laowu_common.gongzhangId
    var loginType=laowu_common.loginType
    var projectId=laowu_common.projectId
    var obj=new Object();
    obj.userId=userId;
    obj.confirmId=gongzhangId;
    obj.queryTime=month;
    obj.queryType='month';
    obj.queryStatus=3;
    obj.loginType=loginType;
    obj.projectId=projectId;

    $.ajax({
        type: "post",
        url: "/api/project_work_api/find_att_record_month",
        async: false,
        data: JSON.stringify(obj),
        datatype: "json",
        contentType : 'application/json',
        success: function(data) {
            var result=data.result;
                console.log("打卡记录列表",result)
               
                if(result.length>0){
                    attstatusmap = new Map();
                    for(var i in result){
                        var attstatus=attstatusmap.get(result[i].title);//打卡记录
                        if(attstatus){
                            attstatusmap.set(result[i].title,attstatusmap.get(result[i].title)+","+"1")
                        }else {
                            console.log("attstatusmap",attstatusmap)
                            attstatusmap.set(result[i].title,"1")
                        }
                    }
    
                }
        },
        error: function() {
            console.log("err")
        }
    })
    

},

 showDataOnMonthForManage:function(resultData) {
    for (var i=0;i<resultData.length;i++){
        var date=countmap.get(resultData[i].dateStr);
        if(date){
            countmap.set(resultData[i].dateStr,countmap.get(resultData[i].dateStr)+1)
        }else {
            countmap.set(resultData[i].dateStr,1)
        }
    }
 },

/**
 * 详细把当月数据分到每一天进行显示
 * @param resultData
 */
  showDataOnMonth:function(resultData) {

         for (var i=0;i<resultData.length;i++){
         var workhour=workmap.get(resultData[i].createTimeStr);//获取上班时长
          if(workhour){
              workhour=Number(workhour);//转数字
              workmap.set(resultData[i].createTimeStr,workhour+Number(resultData[i].workHour));
         }else {
              workmap.set(resultData[i].createTimeStr,Number(resultData[i].workHour));
         }
         var overhour=overmap.get(resultData[i].createTimeStr);//获取上班时长
          if(overhour){
              overhour=Number(overhour);//转数字
              overmap.set(resultData[i].createTimeStr,overhour+Number(resultData[i].overHour));
         }else {
              overmap.set(resultData[i].createTimeStr,Number(resultData[i].overHour));
         }
         var status=statusmap.get(resultData[i].createTimeStr);//获取操作状态
         if(status){
             statusmap.set(resultData[i].createTimeStr,statusmap.get(resultData[i].createTimeStr)+","+resultData[i].operateStatus)
         }else {
             statusmap.set(resultData[i].createTimeStr,resultData[i].operateStatus)
         }
     }

},

 setDataForManage:function(calendarDate,j) {

    setTimeout(function () {

        var everyDate=laowu_calendar.getDay(calendarDate,j);//每一天日期
        var count=0;//上班人数
        $(".ht-rili-body div").eq(j).find("span").eq(0).addClass("col")
        if((countmap!=null && countmap.get(everyDate)!=null) ){//有记录则添加边框
            count=countmap.get(everyDate);
            $(".ht-rili-body div").eq(j).addClass("ht-rili-td-active");
            $(".ht-rili-body div").eq(j).find("span").eq(1).html(count+"人");
            var signHtml='<img src='+signSrc+' class="rightb_icon"></img>';
             $(".ht-rili-body div").eq(j).append(signHtml);

        }else {//设置无记录标记
            var checkHtml='<span style="display:none;" name="check">'+"无记录"+'</span>';
            $(".ht-rili-body div").eq(j).append(checkHtml);
        }

    },300)

},
 setData:function(calendarDate,j) {

    setTimeout(function () {
    console.log("设置...")
        var everyDate=laowu_calendar.getDay(calendarDate,j);//每一天日期
       
        var workhour=0;//上班时长
        var overhour=0;//上班时长
        var showstatus=0;//状态
        var showsatttatus=0;//状态
        $(".ht-rili-body div").eq(j).find("span").eq(0).addClass("col")
        if(statusmap!=null){
            if (statusmap.get(everyDate)!=null){
                var  status = statusmap.get(everyDate).split(",");
                showstatus = laowu_calendar.getStatus(status);

            }
        }
       if(attstatusmap!=null){
           if (attstatusmap.get(everyDate)!=null){
               var  status = attstatusmap.get(everyDate).split(",");
               showsatttatus= laowu_calendar.getattStatus(status);
           }
       }

        if((workmap!=null && workmap.get(everyDate)!=null) ||
            (overmap!=null && overmap.get(everyDate)!=null) ||
            (statusmap!=null && statusmap.get(everyDate)!=null) ||
            (attstatusmap!=null && attstatusmap.get(everyDate)!=null)){//有记录则添加边框

            $(".ht-rili-body div").eq(j).addClass("ht-rili-td-active");
            if(statusmap!=null&&statusmap.get(everyDate)!=null){//判断当天是否有记工记账操作
                if(showstatus==1){
                    $(".ht-rili-body div").eq(j).find("img").attr("src",gantanhaoSrc);
                }else {
                    $(".ht-rili-body div").eq(j).find("img").attr("src",dagouSrc);
                }
            }

            if(showsatttatus==1){//判断当天是否有打卡记录
                var overHtml='<img src='+signSrc+' class="rightb_icon"></img>';
                $(".ht-rili-body div").eq(j).append(overHtml);
            }
        }else {//设置无记录标记
            var checkHtml='<span style="display:none;" name="check">'+"无记录"+'</span>';
            $(".ht-rili-body div").eq(j).append(checkHtml);
        }
        if(workmap!=null && workmap.get(everyDate)!=null){
            workhour=workmap.get(everyDate);
            $(".ht-rili-body div").eq(j).find("span").eq(1).html(workhour+"h");
            $(".ht-rili-body div").eq(j).find("span").eq(1).addClass("workfontcolor");
        }
        if(overmap!=null && overmap.get(everyDate)!=null){
            overhour=overmap.get(everyDate);
            var overHtml='<span class="overfontcolor ht-rili-money">'+overhour+'h</span>';
            $(".ht-rili-body div").eq(j).append(overHtml);

        }


    },500)





},
   /**
 * 根据月份显示每天的日期
 * @param calendarDate
 * @param j
 * @returns {string}
 */
getDay:function(calendarDate, j) {
    var dayObj = $(".ht-rili-body div").eq(j);
    var Mo = "" + calendarDate.month
    var zr_moth, zr_day
    if (calendarDate.month < 10 && Mo.length < 2) {
        zr_moth = "0" + calendarDate.month
    } else {
        zr_moth = calendarDate.month
    }
    var Da = "" + dayObj.find("span").eq(0).text()
    if (dayObj.find("span").eq(0).text() < 10 && Da.length < 2) {
        zr_day = "0" + dayObj.find("span").eq(0).text()
    } else (
        zr_day = dayObj.find("span").eq(0).text()
    )

    var everyDate = calendarDate.year + "-" + zr_moth + "-" + zr_day;
    return everyDate;
   },

/**
 * 获取操作状态
 * @param status
 * @returns {number}
 */
  getStatus:function(status) {
    var rtnFlag=0;
    for (var i=0;i<status.length;i++){
        if (status[i]=='0' || status[i]=='1'){
            rtnFlag=0;
        }
        else if (status[i]=='2' || status[i]=='3'){
            rtnFlag=1;
            break;
        }
    }
   // console.log(rtnFlag)
    return rtnFlag
},

/**
 * 获取打卡状态
 * @param status
 * @returns {number}
 */
  getattStatus:function(status) {
    var rtnFlag=0;
    for (var i=0;i<status.length;i++){
        if (status[i]=='1'){
            rtnFlag=1;
        }
        break;
    }
    return rtnFlag
},

}




export default laowu_calendar
