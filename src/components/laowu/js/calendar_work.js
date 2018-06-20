
import laowu_calendar from "./laowu_calendar.js";
var queryURL = "localhost:8080";
var queryType = "";
var datetype = "";
var calendarDate = {};
var riliHtml = '';
calendarDate.today = new Date();
calendarDate.year = calendarDate.today.getFullYear(); //当前年
calendarDate.month = calendarDate.today.getMonth() + 1; //当前月
calendarDate.date = calendarDate.today.getDate(); //当前日
calendarDate.day = calendarDate.today.getDay(); //当前几
var paramMap = null;
var laowu_common = null;
var _self = null;
var calendar_work = {

    initData: function (common, vue) {
        laowu_common = common;
        laowu_common.initVue(vue);
        laowu_calendar.initVue(vue);
        paramMap = common.paramMap;
    },

    //绘制
    getIndexDay: function () {
        calendar_work.isLeapYear();
        calendar_work.getDays();
        riliHtml = '';
        //本月一号几
        calendarDate.monthStart = new Date(calendarDate.year + "/" + calendarDate.month + "/1").getDay();
        //上个月所占空格数
        if (calendarDate.monthStart == 0) { //独占一行
            calendarDate.monthStart = 7;
        }
        //上月数据
        for (var i = calendarDate.monthStart; i > 0; i--) {
            var dataDateStr = calendarDate.lastYear + "-" + calendarDate.lastMonth + "-" + (calendarDate.lastDays - i + 1);
            riliHtml += '<div class="ht-rili-td ht-rili-td-disabled" name="weekplan" data-date="' + dataDateStr + '"><span class="ht-rili-day">' + (calendarDate.lastDays - i + 1) + '</span><img class=" ht-rili-day ht-rili-right"></img><span class="ht-rili-money"></span></div>'
        }

        //本月数据
        for (var k = 0; k < calendarDate.days; k++) {
            var flag
            var dataDateStr = calendarDate.year + "-" + calendarDate.month + "-" + (k + 1);
            for (var d in calendarDate.opt.data) {
                var nowDate = dataDateStr;
                var dataDate = calendarDate.opt.data[d].date;
                flag = calendar_work.checkDate(nowDate, dataDate);
                if (flag) {
                    riliHtml += '<div class="ht-rili-td ht-rili-onclick" name="weekplan" data-date="' + dataDateStr + '"><span class="ht-rili-day ">' + (k + 1) + '</span><img class=" ht-rili-day ht-rili-right"></img><span class="ht-rili-money" data-money="' + calendarDate.opt.data[d].data + '">' + '</span></div>';
                    break;
                }
            }
            if (!flag) {
                riliHtml += '<div class="ht-rili-td ht-rili-td-disabled" name="weekplan" data-date="' + dataDateStr + '"><span class="ht-rili-day ">' + (k + 1) + '</span><img class=" ht-rili-day ht-rili-right"></img><span class="ht-rili-money"></span></div>';
            }


        }
        //下月数据
        for (var j = 0; j < (42 - calendarDate.days - calendarDate.monthStart); j++) { //42-已占用表格数=剩余表格数
            var dataDateStr = calendarDate.nextYear + "-" + calendarDate.nextMonth + "-" + (j + 1);
            riliHtml += '<div class="ht-rili-td ht-rili-td-disabled" name="weekplan" data-date="' + dataDateStr + '"><span class="ht-rili-day">' + (j + 1) + '</span><img class=" ht-rili-day ht-rili-right"></img><span class="ht-rili-money"></span></div>';
        }
        $('.ht-rili-body').append(riliHtml);
        $('.ht-rili-onclick').on('click', function () {
            calendar_work.dateClick(this);
        })


        var diri = $(".ht-rili-date").text().split("年")
        //点击时候的年月拼成数字
        var dirip = Number(diri[0]) * 100 + Number(diri[1].split("月")[0])
        //当前日期年月拼成数字
        var date = new Date;
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" + month : month);
        var mydate = (year.toString() + month.toString());


        $('.ht-rili-td-disabled').on('click', function () {
            if (dirip < mydate) {
                calendar_work.dateClick(this);
            } else if (dirip == mydate) {
                if ($(this).find(".ht-rili-day").hasClass("col")) {
                    calendar_work.dateClick(this);
                }

            }
        })
    },

    //是否是闰年
    isLeapYear: function () {
        if ((calendarDate.year % 4 == 0) && (calendarDate.year % 100 != 0 || calendarDate.year % 400 == 0)) {
            calendarDate.isLeapYear = true;
        } else {
            calendarDate.isLeapYear = false;
        }
    },
    //选择某一天）
    dateClick: function (obj) {
        var checkNum = $(obj).find("span[name='check']").length;//查找当天是否有记录，无记录则提示并返回
        if (checkNum == 1) {
            $(obj).addClass('ht-rili-td-nouthing-active');
            msg("没有记录!");
            setTimeout(function () {
                $(obj).removeClass('ht-rili-td-nouthing-active');
            }, 500)
            return;
        }
        var number = obj.childNodes[0].innerHTML;
        if (!number) {
            alert("日期异常")
            return;
        }
        //个位数月和日加0
        var Mo = "" + calendarDate.month
        var zr_moth, zr_day
        if (calendarDate.month < 10 && Mo.length < 2) {
            zr_moth = "0" + calendarDate.month
        } else {
            zr_moth = calendarDate.month
        }
        var Da = "" + $(obj).find("span").eq(0).text()
        if ($(obj).find("span").eq(0).text() < 10 && Da.length < 2) {
            zr_day = "0" + $(obj).find("span").eq(0).text()
        } else (
            zr_day = $(obj).find("span").eq(0).text()
        )
        var date = calendarDate.year + "-" + zr_moth + "-" + zr_day;

        //**************页面跳转开始************

        var url = "";
        var pagepath = "/static/webstatic";
        var param = '&queryTime=' + date + "&projectId=" + laowu_common.projectId + "&isRoomId=" + laowu_common.roomId + "&projectName=" + laowu_common.projectName;
        if (queryType == 'worker') {
            url = "/new_laowu/project_record_list.html?dataType=calendar";
        } else if (queryType == 'manager') {
            url = "/new_laowu/project_manager_sign.html?dataType=manager";
        } else {
            msg("日历查询类型出错！");
            return
        }
        url += param;
        setTimeout(function () {
            appApi.openNewWindow(pagepath + url);
        }, 20)

        //**************页面跳转结束************
    },
    //获取上个月份，本月，下个月份信息
    getDays: function () {
        //上月天数
        if (parseInt(calendarDate.month) == 1) {
            calendarDate.lastDays = new Date(calendarDate.year - 1, 12, 0).getDate();
            calendarDate.lastMonth = new Date(calendarDate.year - 1, 12, 0).getMonth() + 1;
            calendarDate.lastYear = new Date(calendarDate.year - 1, 12, 0).getFullYear();
        } else {
            calendarDate.lastDays = new Date(calendarDate.year, calendarDate.month - 1, 0).getDate();
            calendarDate.lastMonth = new Date(calendarDate.year, calendarDate.month - 1, 0).getMonth() + 1;
            calendarDate.lastYear = new Date(calendarDate.year, calendarDate.month - 1, 0).getFullYear();
        }
        //下个月天数
        if (parseInt(calendarDate.month) == 12) {
            calendarDate.nextDays = new Date(calendarDate.year + 1, 1, 0).getDate();
            calendarDate.nextMonth = new Date(calendarDate.year + 1, 1, 0).getMonth() + 1;
            calendarDate.nextYear = new Date(calendarDate.year + 1, 1, 0).getFullYear();
        } else {
            calendarDate.nextDays = new Date(calendarDate.year, calendarDate.month + 1, 0).getDate();
            calendarDate.nextMonth = new Date(calendarDate.year, calendarDate.month + 1, 0).getMonth() + 1;
            calendarDate.nextYear = new Date(calendarDate.year, calendarDate.month + 1, 0).getFullYear();
        }
        //本月天数
        calendarDate.days = new Date(calendarDate.year, calendarDate.month, 0).getDate();
    },
    //检测时间是否一致
    checkDate: function (dateStr1, dateStr2) {
        var date1 = dateStr1.split("-"); //[0]year,[1]month,[2]date;
        var date2 = dateStr2.split("-"); //[0]year,[1]month,[2]date;
        if (date1[1] < 10 && date1[1].length < 2) {
            date1[1] = "0" + date1[1];
        }
        if (date1[2] < 10 && date1[2].length < 2) {
            date1[2] = "0" + date1[2];
        }
        if (date2[1] < 10 && date2[1].length < 2) {
            date2[1] = "0" + date2[1];
        }
        if (date2[2] < 10 && date2[2].length < 2) {
            date2[2] = "0" + date2[2];
        }
        date1 = date1.join("-");
        date2 = date2.join("-");
        return date1 == date2;
    },

    calendarWork: function (opt) {


        var result = laowu_common.findRoomData();
        console.log("返回房间信息", result)

        if (result) {
             setTimeout(function () {
                if ((opt.beginDate != undefined && opt.endDate != undefined) || (opt.data.length > 0)) {
                    var date = new Date;
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    var day = date.getDate();
                    var zr_date = '' + year + "-" + month + "-" + day
                    var zr_data = '0'
                    var pushdata = { date: zr_date, data: zr_data }
                    opt.data.push(pushdata)
                    opt.data.shift()

                    var beginDate = opt.data[0].date;
                    var endDate = opt.data[opt.data.length - 1].date;
                    calendarDate.beginYear = parseInt(beginDate.split('-')[0]); //起始年
                    calendarDate.beginMonth = parseInt(beginDate.split('-')[1]); //起始月
                    calendarDate.beginDate = parseInt(beginDate.split('-')[2]); //起始日

                    calendarDate.endYear = parseInt(endDate.split('-')[0]); //结束年
                    calendarDate.endMonth = parseInt(endDate.split('-')[1]); //结束月
                    calendarDate.endDate = parseInt(endDate.split('-')[2]); //结束日

                    calendarDate.year = parseInt(beginDate.split('-')[0]); //设置起始日期为当前日期
                    calendarDate.month = parseInt(beginDate.split('-')[1]); //设置起始日期为当前日期
                    calendarDate.date = parseInt(beginDate.split('-')[2]); //设置起始日期为当前日期
                    calendarDate.opt = opt;

                } else {
                    console.log('未传入beginDate或endDate！');
                }

                queryType = opt.queryType;
                datetype = opt.datetype;
                console.log("获取查询类型", queryType)
                // console.log("获取查询类型",datetype)
                //加载容器                                                                                                                                                    //<strong class="ht-rili-title">' + opt.title + '</strong>
                calendarDate.container = '<div class="ht-rili-querybox"><div class="ht-rili-datebox"><span class="ht-rili-leftarr"></span><span class="ht-rili-date"></span><span class="ht-rili-rightarr"></span></div></div><div class="ht-rili-head"><div class="ht-rili-th">日</div><div class="ht-rili-th">一</div><div class="ht-rili-th">二</div><div class="ht-rili-th">三</div><div class="ht-rili-th">四</div><div class="ht-rili-th">五</div><div class="ht-rili-th">六</div></div><div class="ht-rili-body"><!--<div class="ht-rili-td"><span class="ht-rili-day">1</span><span class="ht-rili-money">&yen;100</span></div>--></div>'
                $(opt.ele).append(calendarDate.container);
                $('.ht-rili-date').html(calendarDate.year + '年 ' + calendarDate.month + '月');

                calendar_work.getIndexDay();
                //点击上个月
                $('.ht-rili-leftarr').on('click', function () {
                    $('.ht-rili-body').html('');
                    if (calendarDate.month == 1) {
                        calendarDate.year -= 1;
                        calendarDate.month = 12;
                    } else {
                        calendarDate.month -= 1;
                    }
                    $('.ht-rili-date').html(calendarDate.year + '年 ' + calendarDate.month + '月');

                    calendar_work.getIndexDay();
                    //设置黑色字体
                    var daytime, zr_moth
                    var diri = $(".ht-rili-date").text().split("年")
                    //点击时候的年月拼成数字
                    var dirip = Number(diri[0]) * 100 + Number(diri[1].split("月")[0])
                    //当前日期年月拼成数字
                    var date = new Date;
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    month = (month < 10 ? "0" + month : month);
                    var mydate = (year.toString() + month.toString());
                    var Mo = "" + calendarDate.month
                    if (calendarDate.month < 10 && Mo.length < 2) {
                        zr_moth = "0" + calendarDate.month
                    } else {
                        zr_moth = calendarDate.month
                    }
                    var month = calendarDate.year + '-' + zr_moth;
                    //显示当月周计划
                    if (queryType == 'shigongyuan' && datetype == 'week') {
                        getWeekPlan();
                    }
                    console.log("点击上个月日期", month)
                    laowu_calendar.getDataByMonth(month);
                    setTimeout(function () {
                        if (dirip < mydate) {
                            for (var i = 0; i < 42; i++) {
                                if ($(".ht-rili-body div").eq(i).text() == 1) {
                                    //                 $(".ht-rili-body div").eq(i).find("span").eq(0).addClass("col")
                                    if (calendarDate.month == 4 || calendarDate.month == 6 || calendarDate.month == 9 || calendarDate.month == 11) {
                                        daytime = 30
                                    } else if ((calendarDate.year % 4 == 0) && (calendarDate.year % 100 != 0 || calendarDate.year % 400 == 0) && calendarDate.month == 2) {
                                        daytime = 29
                                    } else if (calendarDate.month == 1 || calendarDate.month == 3 || calendarDate.month == 5 || calendarDate.month == 7 || calendarDate.month == 8 || calendarDate.month == 10 || calendarDate.month == 12) {
                                        daytime = 31
                                    } else if (!((calendarDate.year % 4 == 0) && (calendarDate.year % 100 != 0 || calendarDate.year % 400 == 0)) && calendarDate.month == 2) {
                                        daytime = 28
                                    }
                                    for (var j = i; j < daytime + i; j++) {
                                        $(".ht-rili-body div").eq(j).find("span").eq(0).addClass("col")
                                        $(".ht-rili-body div").eq(j).find("span").eq(0).addClass("4444")
                                        $(".ht-rili-body div").eq(j).addClass("zrdian")
                                        laowu_calendar.setData(calendarDate, j);
                                    }
                                    break
                                }
                            }
                        }
                        //点击到当前月
                        if (dirip == mydate) {

                            for (var i = 0; i < 42; i++) {
                                if ($(".ht-rili-body div").eq(i).text() == 1) {
                                    var date = new Date;
                                    var day = date.getDate();
                                    if (calendarDate.month == 4 || calendarDate.month == 6 || calendarDate.month == 9 || calendarDate.month == 11) {
                                        daytime = 30
                                    } else if ((calendarDate.year % 4 == 0) && (calendarDate.year % 100 != 0 || calendarDate.year % 400 == 0) && calendarDate.month == 2) {
                                        daytime = 29
                                    } else if (calendarDate.month == 1 || calendarDate.month == 3 || calendarDate.month == 5 || calendarDate.month == 7 || calendarDate.month == 8 || calendarDate.month == 10 || calendarDate.month == 12) {
                                        daytime = 31
                                    } else if (!((calendarDate.year % 4 == 0) && (calendarDate.year % 100 != 0 || calendarDate.year % 400 == 0)) && calendarDate.month == 2) {
                                        daytime = 28
                                    }
                                    for (var j = i; j < day + i; j++) {
                                        $(".ht-rili-body div").eq(j).find("span").eq(0).addClass("col")
                                        laowu_calendar.setData(calendarDate, j);
                                        //$(".ht-rili-body div").eq(day+i-1).find(".col").css({"background":"#4ba9e9","border-radius":"50%"})
                                    }
                                    break

                                }
                            }
                        }
                    }, 500);

                })
                //点击下个月
                $('.ht-rili-rightarr').on('click', function () {
                    $('.ht-rili-body').html('');
                    if (calendarDate.month == 12) {
                        calendarDate.year += 1;
                        calendarDate.month = 1;
                    } else {
                        calendarDate.month += 1;
                    }
                    $('.ht-rili-date').html(calendarDate.year + '年 ' + calendarDate.month + '月');

                    getIndexDay();
                    var Mo = "" + calendarDate.month
                    var daytime, zr_moth
                    if (calendarDate.month < 10 && Mo.length < 2) {
                        zr_moth = "0" + calendarDate.month
                    } else {
                        zr_moth = calendarDate.month
                    }
                    var month = calendarDate.year + '-' + zr_moth;
                    //显示当月周计划
                    if (queryType == 'shigongyuan' && datetype == 'week') {
                        getWeekPlan();
                    }
                    console.log("点击下个月日期", month)
                    laowu_calendar.getDataByMonth(month);
                    var diri = $(".ht-rili-date").text().split("年")
                    //点击时候的年月拼成数字
                    var dirip = Number(diri[0]) * 100 + Number(diri[1].split("月")[0])
                    //当前日期年月拼成数字
                    var date = new Date;
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    month = (month < 10 ? "0" + month : month);
                    var mydate = (year.toString() + month.toString());
                    setTimeout(function () {
                        if (dirip < mydate) {
                            for (var i = 0; i < 42; i++) {

                                if ($(".ht-rili-body div").eq(i).text() == 1) {
                                    if (calendarDate.month == 4 || calendarDate.month == 6 || calendarDate.month == 9 || calendarDate.month == 11) {
                                        daytime = 30
                                    } else if ((calendarDate.year % 4 == 0) && (calendarDate.year % 100 != 0 || calendarDate.year % 400 == 0) && calendarDate.month == 2) {
                                        daytime = 29
                                    } else if (calendarDate.month == 1 || calendarDate.month == 3 || calendarDate.month == 5 || calendarDate.month == 7 || calendarDate.month == 8 || calendarDate.month == 10 || calendarDate.month == 12) {
                                        daytime = 31
                                    } else if (!((calendarDate.year % 4 == 0) && (calendarDate.year % 100 != 0 || calendarDate.year % 400 == 0)) && calendarDate.month == 2) {
                                        daytime = 28
                                    }
                                    for (var j = i; j < daytime + i; j++) {

                                        $(".ht-rili-body div").eq(j).find("span").eq(0).addClass("col")
                                        laowu_calendar.setData(calendarDate, j);
                                    }
                                    break

                                }
                            }
                        }
                        //点击到当月时候
                        if (dirip == mydate) {

                            for (var i = 0; i < 42; i++) {
                                if ($(".ht-rili-body div").eq(i).text() == 1) {

                                    var date = new Date;
                                    var day = date.getDate();
                                    if (calendarDate.month == 4 || calendarDate.month == 6 || calendarDate.month == 9 || calendarDate.month == 11) {
                                        daytime = 30
                                    } else if ((calendarDate.year % 4 == 0) && (calendarDate.year % 100 != 0 || calendarDate.year % 400 == 0) && calendarDate.month == 2) {
                                        daytime = 29
                                    } else if (calendarDate.month == 1 || calendarDate.month == 3 || calendarDate.month == 5 || calendarDate.month == 7 || calendarDate.month == 8 || calendarDate.month == 10 || calendarDate.month == 12) {
                                        daytime = 31
                                    } else if (!((calendarDate.year % 4 == 0) && (calendarDate.year % 100 != 0 || calendarDate.year % 400 == 0)) && calendarDate.month == 2) {
                                        daytime = 28
                                    }
                                    for (var j = i; j < day + i; j++) {

                                        $(".ht-rili-body div").eq(j).find("span").eq(0).addClass("col")
                                        $(".ht-rili-body div").eq(j).find("span").eq(1).addClass("200")

                                        laowu_calendar.setData(calendarDate, j);

                                        // $(".ht-rili-body div").eq(day+i-1).find(".col").css({"background":"#4ba9e9","border-radius":"50%"})
                                    }
                                    break

                                }
                            }
                        }
                    }, 500)


                })


                //显示当月周计划
                if (queryType == 'shigongyuan' && datetype == 'week') {
                    getWeekPlan();
                }
                var Mo = "" + calendarDate.month
                var month = calendarDate.year + '-' + calendarDate.month;
                if (calendarDate.month < 10 && Mo.length < 2) {
                    month = "0" + calendarDate.month
                } else {
                    month = calendarDate.month
                }
                month = calendarDate.year + '-' + month;
                console.log("查询当月数据")
                laowu_calendar.getDataByMonth(month);
                //当前月 加载
                setTimeout(function () {
                    for (var i = 0; i < 42; i++) {
                        if ($(".ht-rili-body div").eq(i).text() == 1) {
                            var date = new Date;
                            var day = date.getDate();
                            for (var j = i; j < day + i; j++) {
                                laowu_calendar.setData(calendarDate, j);
                            }
                            $(".ht-rili-body div").eq(day + i - 1).attr("class", "ht-rili-td ht-rili-onclick");
                            break

                        }
                    }
                }, 300)

            }, 300)


        } else {
            console.log("房间信息加载失败...")
        }

    },
    calendarGetActive: function () { //获取当前选中日期的值
        //未选中时返回undefined
        var data
        var activeEle = $(this).find(".ht-rili-td-active");
        var date = activeEle.attr("data-date");
        var money = activeEle.children(".ht-rili-money").attr("data-money");
        return data = {
            date: date,
            money: money
        }
    },
 



}




function reload() {
    history.go(0)
}

export default calendar_work;



