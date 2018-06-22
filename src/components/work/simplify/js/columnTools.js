/**
 * Created by Administrator on 2017-10-24.
 * 版本号 v7
 * 功能与事件的实现方法
 * 兼容多表查询及，多模块链接
 * 2018年3月28日：新增变量
 * $param.path（url传递过来的参数，带入到详细页面中去）
 * memberType:"",//从房间过来的，判断是否是房主：1：房主 2：成员  3：访客
 * currRoomId:"",//从房间过来的，当前房间id
 * isRoomId:"",//从房间过来的，所属房间id
 *
 */
// 只有手机上，可以下来刷新；
// appApi.setPullRefresh(true);
// 与日期相关的函数=====================================================================================================
/** 日期，时间初始化
 style = "yyyy-mm-dd" 输出 2017-08-01
 style = "yyyy-mm-dd hh:mm:ss" 输出 2017-08-01 12：01：01
 */
import setting from "../../../../playform/config"
import { Toast } from 'mint-ui'
import {getParam,cmApi} from '../../../../playform/common'
import {$show_status,$date_show,$id_show,$top_changed,$zhankaiShouqi,$tiaojian_change,$list,$search_list_show,$information} from "./columnJiegou_show"
import {$id,$sideslip,$create} from "./columnJiegou_create"
var _self;
var $comm = {
    initVue:function(){
        _self = $comm.vue;
    },
    formatDate:function(now, style) {

        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        var output;

        if (style.indexOf("-mm") > 0 && month < 10)
            month = "0" + month;
        if (style.indexOf("dd") > 0 && date < 10)
            date = "0" + date;
        if (style.indexOf("hh") > 0 && hour < 10)
            hour = "0" + hour;
        if (style.indexOf(":mm") > 0 && minute < 10)
            minute = "0" + minute;
        if (style.indexOf(":ss") > 0 && second < 10)
            second = "0" + second;

        switch (style) {
            case "yyyy-mm-dd":
                output = year + "-" + month + "-" + date;
                break;
            case "yyyy-mm-dd hh:mm:ss":
                // if(month <10 )
                //     month="0"+month;
                output = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
                break;
            case "yyyy-mm":
                output = year + "-" + month;
                break;
        }
        return output
    },

    subStr:function(str, sstart, send) {
        if (str != null) {
            if (send != null && send != undefined && send != "undefined")
                str = str.substring(str.indexOf(sstart), send);
            else
                str = str.substring(str.indexOf(sstart));
        }
        return str;
    },

    /**
     *  格式化字符，超出length，改为....
     * @param string
     * @param length
     * @returns {*}
     */
    $formatString:function(string, length) {
        length = length == "" || length == undefined ? 0 : length;
        if (string != "" && string != undefined) {
            if (string.length <= length)
                return string;
            else
                return string.substring(0, length) + "..."
        } else {
            return "";
        }
    },
    /**
     * 数值类型数据格式化
     */
    formatNumber:function(num, places) {
        if (isNaN(num))//|| num==null)
            num = 0;
        if (isNaN(places))
            places = 2;
        num = (parseFloat(num).toFixed(places) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
        num = num == "NaN" ? "0.00" : num;
        return num;
    },
    // 修改选择标签颜色-------------------------------------------------------------------------------------------------
     money_chang:function(color, nums, decide, classname) {
        //获取所有数据对象
        var changCo = document.getElementsByClassName("changco");
        //遍历处理对象
        for (var i = 0; i < changCo.length; i++) {
            //增加className
            if (decide == 1) {
                if (changCo[i].className.indexOf(classname) == -1) {
                    changCo[i].className = changCo[i].className + classname;
                }
            }
            //删除className
            else if (decide == 0)
                changCo[i].className = changCo[i].className.replace(classname, "");
            //颜色还原
            if (i == 0)
                changCo[i].getElementsByClassName("sec-txt")[0].style.color = "#f15a4a";
            else
                changCo[i].getElementsByClassName("sec-txt")[0].style.color = "#777";
        }
        //改变选择的数值的颜色
        switch (nums) {
            case 1:
                changCo[2].getElementsByClassName("sec-txt")[0].style.color = color;
                break;
            case 0:
                changCo[0].getElementsByClassName("sec-txt")[0].style.color = color;
                break;
            case "all":
                changCo[1].getElementsByClassName("sec-txt")[0].style.color = color;
                break;
        }
    },

    //-------------------------------------------------------------------------------------------------------------------------
     substr:function(str, len) {
        if (str != undefined && str.length > len) {
            str = str.substring(0, len) + "...";
        }
        return str;
    },

    //冒泡排序 倒序
    sortarr:function(arr, arr1) {
        for (i = 0; i < arr.length - 1; i++) {
            for (j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j] * 1 > arr[j + 1] * 1) {
                    var temp = arr[j];
                    var temp1 = arr1[j];
                    arr[j] = arr[j + 1];
                    arr1[j] = arr1[j + 1];
                    arr[j + 1] = temp;
                    arr1[j + 1] = temp1;
                }
            }
        }
        var ar = new Array();
        ar[0] = arr;
        ar[1] = arr1;
        return ar;
    },
    //冒泡排序 顺序
    reorder:function(arr, arr1) {
        for (i = 0; i < arr.length - 1; i++) {
            for (j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j] * 1 < arr[j + 1] * 1) {
                    var temp = arr[j];
                    var temp1 = arr1[j];
                    arr[j] = arr[j + 1];
                    arr1[j] = arr1[j + 1];
                    arr[j + 1] = temp;
                    arr1[j + 1] = temp1;
                }
            }
        }
        var ar = new Array();
        ar[0] = arr;
        ar[1] = arr1;
        return ar;
    },

    user:function() {
        this.url = "",//获取数据的URL
            this.flag = "",//特殊标识
            // this.xItem = new Array(),//X轴显示的数据

            this.currUserType = "",//当前用户类型
            this.projectSN = "",  //项目内的
            this.whoseType = "", //被查询的角色类型（输入数据表字段名）
            this.whoseID = "",  //被查询的角色的ID （一般从页面获取）
            this.whereDate = "", // 被查询的时间日期范围，
            this.whereDateType = "",    // 用来控制拼接时间的具体字段，默认值为“createDate”
            this.whereDateStart = "", // 被查时间范围的开始时间点
            this.whereDateEnd = "",  // 被查时间范围的结束时间点
            this.whereNumber = "",//被查询的数字信息字段名，如金额、数量等字段
            this.whereStatus = "",//被查询的有关状态的字段名与值
            this.whereOther = "",//其他被查询条件
            this.groupby = "",   //按照哪个字段汇总的字段名
            this.orderby = "",   //按照哪个字段排序的字段名与排序方式
            this.orderbyType = "",//按照哪个字段排序的排序方式 ，默认值为“desc”
            this.limit = "",   //需要显示的条数
            this.used = "",     //根据used，输出查询输出的内容（这个要在方法中定义）
            this.usedType = ""// 用来控制输出，如果是xiaolanmu就输出 l.get(0)
        this.companySupplierID = ""
    }
}
var format_number = {
    //阿拉伯数字转换为简写汉字
    Arabia_To_SimplifiedChinese: function (Num) {
        for (i = Num.length - 1; i >= 0; i--) {
            Num = Num.replace(",", "")//替换Num中的“,”
            Num = Num.replace(" ", "")//替换Num中的空格
        }
        if (isNaN(Num)) { //验证输入的字符是否为数字
            //alert("请检查小写金额是否正确");
            return;
        }
        //字符处理完毕后开始转换，采用前后两部分分别转换
        part = String(Num).split(".");
        newchar = "";
        //小数点前进行转化
        for (i = part[0].length - 1; i >= 0; i--) {
            if (part[0].length > 10) {
                //alert("位数过大，无法计算");
                return "";
            }//若数量超过拾亿单位，提示
            tmpnewchar = ""
            perchar = part[0].charAt(i);
            switch (perchar) {
                case "0":
                    tmpnewchar = "零" + tmpnewchar;
                    break;
                case "1":
                    tmpnewchar = "一" + tmpnewchar;
                    break;
                case "2":
                    tmpnewchar = "二" + tmpnewchar;
                    break;
                case "3":
                    tmpnewchar = "三" + tmpnewchar;
                    break;
                case "4":
                    tmpnewchar = "四" + tmpnewchar;
                    break;
                case "5":
                    tmpnewchar = "五" + tmpnewchar;
                    break;
                case "6":
                    tmpnewchar = "六" + tmpnewchar;
                    break;
                case "7":
                    tmpnewchar = "七" + tmpnewchar;
                    break;
                case "8":
                    tmpnewchar = "八" + tmpnewchar;
                    break;
                case "9":
                    tmpnewchar = "九" + tmpnewchar;
                    break;
            }
            switch (part[0].length - i - 1) {
                case 0:
                    tmpnewchar = tmpnewchar;
                    break;
                case 1:
                    if (perchar != 0) tmpnewchar = tmpnewchar + "十";
                    break;
                case 2:
                    if (perchar != 0) tmpnewchar = tmpnewchar + "百";
                    break;
                case 3:
                    if (perchar != 0) tmpnewchar = tmpnewchar + "千";
                    break;
                case 4:
                    tmpnewchar = tmpnewchar + "万";
                    break;
                case 5:
                    if (perchar != 0) tmpnewchar = tmpnewchar + "十";
                    break;
                case 6:
                    if (perchar != 0) tmpnewchar = tmpnewchar + "百";
                    break;
                case 7:
                    if (perchar != 0) tmpnewchar = tmpnewchar + "千";
                    break;
                case 8:
                    tmpnewchar = tmpnewchar + "亿";
                    break;
                case 9:
                    tmpnewchar = tmpnewchar + "十";
                    break;
            }
            newchar = tmpnewchar + newchar;
        }
        //替换所有无用汉字，直到没有此类无用的数字为止
        while (newchar.search("零零") != -1 || newchar.search("零亿") != -1 || newchar.search("亿万") != -1 || newchar.search("零万") != -1) {
            newchar = newchar.replace("零亿", "亿");
            newchar = newchar.replace("亿万", "亿");
            newchar = newchar.replace("零万", "万");
            newchar = newchar.replace("零零", "零");
        }
        //替换以“一十”开头的，为“十”
        if (newchar.indexOf("一十") == 0) {
            newchar = newchar.substr(1);
        }
        //替换以“零”结尾的，为“”
        if (newchar.lastIndexOf("零") == newchar.length - 1) {
            newchar = newchar.substr(0, newchar.length - 1);
        }
        return newchar;
    }
}

// ---------------------------------------------------------------------------------------------------------------------
var $url = {
    recorder_type: "",//haosi或者sunline
    module_path: [],
    query_path: [],
    java_path_group: "",
    java_path_table: "",

    java_path_group_duo: [],
    java_path_table_duo: [],
    //E:\svnWorkSpace\saas\sunline-web-app\src\main\webapp\static\webstatic\work\laowu\laowu_qian_gongtou_duobiao.html
    // E:\svnWorkSpace\saas\sunline-web-app\src\main\webapp\static\webstatic\work\laowu\laowu_qian_mingong_duobiao.html
    // 目前只有这里引用，不是所有的都引用
    to_query: function (No, chanshu) {
        var url = $url.query_path[No];
        url = url + "?"
        url = url + ("whereDate=" + $param.whereDate);
        url = url + ("&whereDateType=" + $param.whereDateType);
        url = url + ("&whereDateStart=" + $param.whereDateStart);
        url = url + ("&whereDateEnd=" + $param.whereDateEnd);
        if (chanshu != undefined && chanshu != "")
            url = url + chanshu
        window.appApi.openNewWindow(url);
    },

    get_recorder_list: function (url_type, yewu_name, chanshus) {
        var u
        //获得module Path；
        var path = "";
        if ($url.module_path.length == 1) {
            if (chanshus == "" || chanshus == undefined)
                path = $url.module_path[0]
            else
                path = $url.module_path[0] + "?" + chanshus
        } else {
            for (var i = 0; i < $url.module_path.length; i++) {
                if (yewu_name == $url.module_path[i].name)
                    path = $url.module_path[i].path
            }
        }
        switch (url_type) {
            case "haosi":
                u = HAOSI_SERVER_ADDRESS + path + "!open.mdo?__SESSIONID_=" + setting.getCookie("sessionid") + "&id="
                break;
            case "sunline":
                u = setting.getUrl() + path;
                break;
        }
        return u
    },
    /**
     * 获取当前相对路径的方法
     * 首先获取 Url，然后把 Url 通过 // 截成两部分，再从后一部分中截取相对路径。如果截取到的相对路径中有参数，则把参数去掉。
     * 调用方法：GetUrlRelativePath();
     */
    GetUrlRelativePath: function () {
        var url = document.location.toString();
        var arrUrl = url.split("//");

        var start = arrUrl[1].indexOf("/");
        var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

        if (relUrl.indexOf("?") != -1) {
            relUrl = relUrl.split("?")[0];
        }
        return relUrl;
    }
}

/**
 *  筛选框里，跳出日期选择框
 * @param t
 */
var sel_date = {
    dateValue:cmApi.dateFormat(new Date()),
    dateType:"",
    openDate:function(t){
        this.dateType = t;
        if (t == "s") {
            if ($date.sel_dateStart != "-") {
                sel_date.dateValue = $date.sel_dateStart;
            }
        } else if (t === 'e') {
            if ($date.sel_dateEnd != "-") {
                sel_date.dateValue = $date.sel_dateEnd;
            }
        }
        _self.$refs["picker"].open();
    },
    handleChange:function(value) {
        var dataStr = cmApi.dateFormat(new Date(value));
        if (sel_date.dateType == "s") {

            if (new Date(value) > new Date($date.sel_dateEnd)) {
                Toast({
                    message: '不能大于结束日期',
                    position: 'bottom'
                })
                // layer.open({
                //     content: '不能小于开始日期'
                //     , skin: 'msg'
                //     , time: 2 //2秒后自动关闭
                // });
                return;
            }
            $date.sel_dateStart = dataStr;
            $date_show.sel_dateStart_main(true)
        } else if (sel_date.dateType == 'e') {

            if (new Date($date.sel_dateStart) > new Date(value)) {
                Toast({
                    message: '不能小于开始日期',
                    position: 'bottom'
                })
                return;
            }
            $date.sel_dateEnd = dataStr;
            $date_show.sel_dateEnd_main(true)
        }
    }
};

/**
 *
 */
var $date = {
    url_had_date: false,//如果url 里有whereDateStart 和whereDateEnd 则返回值为true；否则为false
    saixuan_fanwei: [],// 值域 ： all 3 7 30 60 90 180 365 thisWeek thisMonth thisSeason thisYear
    fanwei_show: "", // 主页日期筛选内显示内容
    //查询筛选页面内的日期显示
    sel_dateStart: "-",
    sel_dateEnd: "-",

    sel_dateStart_last: "",
    sel_dateEnd_last: "",
    // 用于存放上一个月，下一个月的显示month------------------------
    year: 0,
    month: 0,
    yyyy_mm: "",
    get_now: function () {
        var date = new Date();
        $date.yy_mm = $comm.formatDate(date, "yyyy-mm")
        $date.year = date.getFullYear();
        $date.month = date.getMonth() + 1;
    },
    month_change: function (fangxiang) {
        if (fangxiang == "up") {
            $date.month = $date.month - 1
            if ($date.month == 0) {
                $date.month = 12;
                $date.year = $date.year - 1;
            }
        } else {
            $date.month = $date.month + 1
            if ($date.month == 13) {
                $date.month = 1;
                $date.year = $date.year + 1;
            }
        }
        return $date.year + "-" + $date.month;
    },
    get_month_fanwei: function (month) {
        var day = $date.getLastDayOf.month_lastday(month);

        $date.sel_dateEnd = $date.yyyy_mm + "-" + day;
        $date.sel_dateStart = $date.yyyy_mm + "-01";
        // 主页日期范围显示
        $date.fanwei_show = $label.sel_date + " ：" + $date.group_top($date.sel_dateStart, $date.sel_dateEnd);
        if (document.getElementById("li_date_fanwei")) {
            document.getElementById("li_date_fanwei").innerHTML = $date.fanwei_show;
        }
        //筛选页面日期范围显示
        $date_show.sel_dateStart_main(true);
        $date_show.sel_dateEnd_main(true)

        $param.whereDateStart = $date.sel_dateStart == "-" ? "" : $date.sel_dateStart;
        $param.whereDateEnd = $date.sel_dateEnd == "-" ? "" : $date.sel_dateEnd;
    },
    //----------------------------------------------------------------

    /**
     * 进入页面时候，初始化日期范围
     */
    get_date_fanwei: function (days, used) {
        // console.info(used)
        var date = new Date();
        if (days == "all" || days == "全部") {
            $date.sel_dateStart = "-";
            $date.sel_dateEnd = "-";
        } else {
            switch (days) {
                case "本年":
                case "thisYear":
                    $date.sel_dateEnd = $comm.formatDate(date, "yyyy-mm-dd");
                    $date.sel_dateStart = $date.getFirstDayOf.year(date);
                    break;
                case "本季度":
                case "thisSeason":
                    $date.sel_dateEnd = $comm.formatDate(date, "yyyy-mm-dd");
                    $date.sel_dateStart = $date.getFirstDayOf.season(date);
                    break;
                case "本月":
                case "thisMonth":
                    $date.sel_dateEnd = $comm.formatDate(date, "yyyy-mm-dd");
                    $date.sel_dateStart = $date.getFirstDayOf.month(date);
                    break;
                case "本周":
                case "thisWeek":
                    $date.sel_dateEnd = $comm.formatDate(date, "yyyy-mm-dd");
                    $date.sel_dateStart = $date.getFirstDayOf.week(date);

                    break;
                case "today":
                case "今天":
                    $date.sel_dateEnd = $comm.formatDate(date, "yyyy-mm-dd");
                    $date.sel_dateStart = $date.sel_dateEnd;
                    break;
                case "本年末":
                    $date.sel_dateStart = $date.getFirstDayOf.year(date);
                    $date.sel_dateEnd = $date.getLastDayOf.year(date);
                    break;
                case "本季度末":
                    $date.sel_dateStart = $date.getFirstDayOf.season(date);
                    $date.sel_dateEnd = $date.getLastDayOf.season(date);
                    break;
                case "本月末":
                    $date.sel_dateStart = $date.getFirstDayOf.month(date);
                    $date.sel_dateEnd = $date.getLastDayOf.month(date);
                    break;
                case "本周末":
                    $date.sel_dateStart = $date.getFirstDayOf.week(date);
                    $date.sel_dateEnd = $date.getLastDayOf.week(date);
                    break;
                default:
                    if (days != "") {
                        $date.sel_dateEnd = $comm.formatDate(date, "yyyy-mm-dd");
                        $date.sel_dateStart = $comm.formatDate($date.before(date, parseInt(days)), "yyyy-mm-dd");
                    }
                    break;
            }
        }
        //
        $param.whereDateStart = $date.sel_dateStart == "-" ? "" : $date.sel_dateStart;
        $param.whereDateEnd = $date.sel_dateEnd == "-" ? "" : $date.sel_dateEnd;

    },

    /**
     * 被选中的日期
     * @param days
     * @param id
     * @param p_id
     * @param className
     */
    date_saixuaned: function (days, id, p_id, className) {
        $onclick.onclicked.change_class(id, p_id, className)
        var myDate = new Date();
        // 功能栏里的日期范围
        document.getElementById("id_saixuan").innerHTML = $date.fanwei(days);
        // 筛选窗体的日期显示内容
        if (days == "all" || days == "全部") {
            // 主页面时间范围
            $date.fanwei_show = $label.sel_date + " ：" + $date.group_top("-", "-");
            if (document.getElementById("li_date_fanwei")) {
                document.getElementById("li_date_fanwei").innerHTML = $date.fanwei_show;
            }
            //筛选页面的时间
            $date_show.sel_date_main(false)
        } else {
            // 主页面时间范围
            $date.fanwei_show = $label.sel_date + " ：" + $date.group_top($date.sel_dateStart, $date.sel_dateEnd);
            if (document.getElementById("li_date_fanwei")) {
                document.getElementById("li_date_fanwei").innerHTML = $date.fanwei_show;
            }
            //筛选页面的时间
            $date_show.sel_date_main(true)
        }
    },
    /**
     * 日期范围筛选，用于查询主页
     * @param {Object} Date
     */
    fanwei: function (date) {
        var a
        switch (date) {
            case "3":
            case 3:
                a = "近三天";
                break;
            case "7":
            case 7:
                a = "近一周";
                break;
            case "30":
            case 30:
                a = "近一月";
                break;
            case "90":
            case 90:
                a = "近三月";
                break;
            case "180":
            case 180:
                a = "近半年";
                break;
            case "365":
            case 365:
                a = "近一年";
                break;
            case "all":
            case "全部":
                a = "全部";
                break;
            case "thisWeek":
            case "本周":
            case "本周末":
                a = "本周";
                break;
            case "thisMonth":
            case "本月":
            case "本月末":
                a = "本月";
                break;
            case "thisSeason":
            case "本季度":
            case "本季度末":
                a = "本季度";
                break;
            case "thisYear":
            case "本年":
            case "本年末":
                a = "本年";
                break;
            default:
                if (date < 100)
                    a = "近" + format_number.Arabia_To_SimplifiedChinese(date) + "天";
                else
                    a = "近" + date + "天";
                break;
        }
        return a;
    },
    /**
     * 返回指定日期前n天的日期
     * @param n,
     * @returns {Date}
     */
    before: function (d, n) {
        d.setDate(d.getDate() - (n + 0));
        return d;
    },
    /**
     *  在查询页面汇总里显示日期
     * @param whereDateStart
     * @param whereDateEnd
     * @returns {*}
     */
    group_top: function (whereDateStart, whereDateEnd) {
        // console.info("$date.group_top.whereDateStart="+whereDateStart+"\n"+"$date.group_top.whereDateEnd="+whereDateEnd)
        if (whereDateStart != "") {
            if (whereDateEnd != "") {
                if (whereDateStart == "-" && whereDateEnd == "-") {
                    return "(不限）"
                    // return "- 至 -   （全部）";
                } else {
                    try {
                        return $comm.formatDate(whereDateStart, "yyyy-mm-dd") + " 至 " + formatDate(whereDateEnd, "yyyy-mm-dd");
                    } catch (e) {
                        return whereDateStart + " 至 " + whereDateEnd;
                    }
                }
                // }
            } else {
                try {
                    return $comm.formatDate(whereDateStart, "yyyy-mm-dd") + " 之后";
                } catch (e) {
                    return whereDateStart + " 之后";
                }
            }
        } else {
            if (whereDateEnd != "") {
                try {
                    return $comm.formatDate(whereDateEnd, "yyyy-mm-dd") + " 之前";
                } catch (e) {
                    return whereDateEnd + " 之前";
                }
            } else {
                return "(不限）";
            }
        }
    },
    /**
     * 获取指定日期的周的第一天、月的第一天、季的第一天、年的第一天
     * @param date new Date()形式，或是自定义参数的new Date()
     * @returns 返回值为格式化的日期，yy-mm-dd
     */
    getFirstDayOf: {
        //获取这周的周一
        week: function (date) {
            var weekday = date.getDay() || 7; //获取星期几,getDay()返回值是 0（周日） 到 6（周六） 之间的一个整数。0||7为7，即weekday的值为1-7
            date.setDate(date.getDate() - weekday + 1);//往前算（weekday-1）天，年份、月份会自动变化
            return $comm.formatDate(date, "yyyy-mm-dd");
        },
        //获取当月第一天
        month: function (date) {
            date.setDate(1);
            return $comm.formatDate(date, "yyyy-mm-dd");
        },
        //获取当季第一天
        season: function (date) {
            var month = date.getMonth();
            if (month < 3) {
                date.setMonth(0);
            } else if (2 < month && month < 6) {
                date.setMonth(3);
            } else if (5 < month && month < 9) {
                date.setMonth(6);
            } else if (8 < month && month < 11) {
                date.setMonth(9);
            }
            date.setDate(1);
            return $comm.formatDate(date, "yyyy-mm-dd");
        },
        //获取当年第一天
        year: function (date) {
            date.setDate(1);
            date.setMonth(0);
            return $comm.formatDate(date, "yyyy-mm-dd");
        },
    },
    /**
     * 获取指定日期的周的最后一天、月的最后一天、季的最后一天、年的最后一天
     * @param date new Date()形式，或是自定义参数的new Date()
     * @returns 返回值为格式化的日期，yy-mm-dd
     */
    getLastDayOf: {
        //获取这周的最后一天
        week: function (date) {
            var weekday = date.getDay() || 7; //获取星期几,getDay()返回值是 0（周日） 到 6（周六） 之间的一个整数。0||7为7，即weekday的值为1-7
            weekday = 7 - weekday
            date.setDate(date.getDate() + weekday);//往后算（weekday-1）天，年份、月份会自动变化
            return $comm.formatDate(date, "yyyy-mm-dd");
        },
        //获取当月最后一天
        month: function (date) {
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            // alert(date +"-----"+month+"-----"+year)
            // if(month==1 || month==3|| month==5|| month==7|| month==8|| month==10|| month==12)
            //     date.setDate(31);
            // if(month || month==4|| month==6|| month==9|| month==11)
            //     date.setDate(30);
            // if(month == 2){
            //     if(year%4 !=0)
            //         date.setDate(28);
            //     else
            //         date.setDate(29);
            // }
            date.setDate($date.getLastDayOf.month_lastday(month))
            return $comm.formatDate(date, "yyyy-mm-dd");
        },
        month_lastday: function (month) {
            var day;
            if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
                day = 31;
            if (month || month == 4 || month == 6 || month == 9 || month == 11)
                day = 30;
            if (month == 2) {
                if (year % 4 != 0)
                    day = 28;
                else
                    day = 29;
            }
            return day;
        },
        //获取当季最后一天
        season: function (date) {
            var month = date.getMonth();
            if (month < 3) {
                date.setMonth(2);
                date.setDate(31);
            } else if (2 < month && month < 6) {
                date.setMonth(5);
                date.setDate(30);
            } else if (5 < month && month < 9) {
                date.setMonth(8);
                date.setDate(30);
            } else if (8 < month && month < 11) {
                date.setMonth(11);
                date.setDate(31);
            }
            return $comm.formatDate(date, "yyyy-mm-dd");
        },
        //获取当年最后一天
        year: function (date) {
            date.setDate(31);
            date.setMonth(11);
            return $comm.formatDate(date, "yyyy-mm-dd");
        },
    },
}

/**
 * 分组
 */
var $group = {
    No: "无分组", // 分组序号，0 为默认无分组
    by: [], // 分组的具体内容
}
/**
 * 排序
 */
var $order = {
    by: [],
    default: "",
}
/**
 * 各个地方用的标签
 */
var $label = {
    // 查询主页----------------------------------
    title: "",//页面标题
    tiaojian: [],//条件显示框里的名称
    // 功能栏
    date_fanwei: [],// 时间范围筛选 值域 ： all(全部) 3 7 30 60 90 180 365 thisWeek(本周) thisMonth(本月) thisSeason(本季度) thisYear(本年)
    order: [],// 排序
    group_titel: "无分组",
    group: [],// top与分组的名称
    group_danwei: [],//top的共几条的单位
    no_group_danwei: "",// top无分组时候的单位
    btn_zhankaisouqi: "查看明细",
    //数量
    group_list_number: "",
    recorder_list_number: "",
    // 查询筛选页面 -----------------------------
    sel_date: [],//第一个日期标题，一般只有这一个，如果有多个日期筛选器的话，其他的用sel_other_date[]变量定义
    sel_other_date: [],//如果有多个日期筛选器的话，其他的用sel_other_date[]变量定义
    title_search_list: [],// 查询列表的标题
    sel: [],//筛选页面的选项的名称
    sel_other: [],//sel[]的扩充，
    sel_all: [],//筛选页面的选项的名称的全部，等于sel[]。concat（sel_other[]）
    sel_like: [],//筛选页面的模糊查询名称
    sel_qujian_number: [],//筛选页面的区间查询的名称

    // 方法---------------------------------------------------------------------
    set: {
        title: function () {
            // 设置标题，固定写法
            $("title1").innerHTML = $param.windowTitle;
        },
        /**
         *设置分组项内容
         */
        fenzuxiang: function () {
            for (var i = 0; i < $label.group.length; i++) {
                if (document.getElementById("lab_fenzuxiang" + i))
                    document.getElementById("lab_fenzuxiang" + i).innerHTML = $label.group[i];
            }
        },
        /**
         * 设置分组的名称
         */
        orderby: function () {
            for (var i = 0; i < $label.order.length; i++) {
                if (document.getElementById("li_order" + i))
                    document.getElementById("li_order" + i).innerHTML = $label.order[i];
            }
        },
        /**
         *  设置顶部的汇总条数的单位，共几条
         * @param group_No
         */
        top_number: function (val, group_No, used) {
            // if(used!=""||used!="undefined")
            //     alert(used)
            var number
            if (group_No == "无分组" || used == "group_list_onclicked")
                number = "共" + val + $label.no_group_danwei;
            // number = "共"++ $label.no_group_danwei;
            else
                number = "共" + val + $label.group_danwei[group_No];
            return number;
        }
    }
}
/**
 * 主页条件框用变量
 */
var $tiaojian = {
    name_long: [],
    name_short: [],
    changed: false, //条件是否改变，时间范围改变，点击group_list后，筛选条件发生变化后
    ID: [],
    set_name_long: function () {
        for (var i = 0; i < 2; i++) {
            $tiaojian.name_long[i] = $tiaojian.name_long[i] == "" || $tiaojian.name_long[i] == undefined ? "请选择" : $tiaojian.name_long[i]
        }
    },
}

/**
 * 查询页面的选择框
 *
 */
var $search = {
    No: "",// 查询选项序号
    list_used: [], // 查询选项列表
    list_No: '', // 对应的查询选项列表的序号
    selected_Name: [],
    selected_Name_short: [],
    list_name_selected: "",
    selected_ID: [],
    like: [], //筛选页面的模糊查询对应的字段
    like_last: [],
    qujian_number: [], // 筛选页面的数字区间查询对应的字段
    qujian_number_min: [], //数字区间的最小值
    qujian_number_max: [],//数字区间的最大值

    last: {
        like: [], //筛选页面的模糊查询对应的字段
        qujian_number_min: [], //数字区间的最小值
        qujian_number_max: [],//数字区间的最大值
    },
    had_selected: false, //查询条件是否有内容
    /**
     * 查询总的查询按钮显示状态：
     */
    button_show: function (show_always) {
        if (show_always == true)
            return true;
        else {
            var b = $param.inProject == 1 ? false : true;
            return b;
        }
    },
    /**
     * 筛选查询页面有内容时候，查询筛选按钮改变class
     * @param tf
     */
    change_btn_search: function (tf) {
        if (tf == true) {
            if (document.getElementById($id.btn_search).className.indexOf(" active") == -1)
                document.getElementById($id.btn_search).className = document.getElementById($id.btn_search).className + " active";
        } else {
            document.getElementById($id.btn_search).className = document.getElementById($id.btn_search).className.replace(" active", "");
        }
    },
    /**
     * 遍历筛选页面是否有内容，时间区间除外；
     * @returns {boolean}
     */
    get_had_selected: function () {
        // 查询选项
        for (var i = 0; i < $search.selected_Name.length; i++) {
            if ($search.selected_Name[i] != "请选择") {
                return true;
            }
        }
        //模糊查询
        for (var i = 0; i < $search.like.length; i++) {
            if (document.getElementById("sel_like_input" + i).value != "")
                return true;
        }
        // 数字区间
        for (var i = 0; i < $search.qujian_number.length; i++) {
            if (document.getElementById("qujian_min" + i).value != "")
                return true;
            if (document.getElementById("qujian_max" + i).value != "")
                return true;
        }
        return false;
    },
    fuzzy_query_changed: function (id_No) {
        var a = document.getElementById("sel_like_input" + id_No).value
        if (a.length > 0) {
            document.getElementById("clear_fuzzy_query" + id_No).style.display = "block";
        } else {
            document.getElementById("clear_fuzzy_query" + id_No).style.display = "none";
        }
    },
    qujian_min_changed: function (id_No) {
        var a = document.getElementById("qujian_min" + id_No).value
        if (a.length > 0) {
            document.getElementById("qujian_min_clear" + id_No).style.display = "block";
        } else {
            document.getElementById("qujian_min_clear" + id_No).style.display = "none";
        }
    },
    qujian_max_changed: function (id_No) {
        var a = document.getElementById("qujian_max" + id_No).value
        if (a.length > 0) {
            document.getElementById("qujian_max_clear" + id_No).style.display = "block";
        } else {
            document.getElementById("qujian_max_clear" + id_No).style.display = "none";
        }
    },
}
/**
 * 查询选项列表页用
 */
var $search_list = {
    No: "",
    No_val: [],
    used: [],
    name: [],
    selected: [],//被选择的
    clicked: [], // 是否点击过，值为true或者false,
    had_data: true, // 如果有值为true，
    fuzzy_inputed: [],//模糊搜索的值,
    others: [],//预警条件
    used_other: [],
    name_other: [],

    /**
     *  获得被选择的那条数据
     */
    get_selected: function (No) {
        document.getElementById("sel_list_clear").style.display = $search.selected_Name[No] != "请选择" ? "block" : "none";
        // app.selected_val[No]=$search.selected_Name[No];
    },
    fuzzy: function (used) {
        var s
        switch (used) {
            case 1:
                s = document.getElementById("search_list_input").value;
                if (s.length > 0) {
                    document.getElementById("search_list_input_clear").style.display = "block"
                    $param.search_list.whereOther = $whereOther.FuzzyQuery(s, $search_list.name[$search.list_No]);
                } else {
                    document.getElementById("search_list_input_clear").style.display = "none"
                    $param.search_list.whereOther = "";
                }
                $search_list.fuzzy_inputed[$search.list_No] = s;
                break;
            case 2:
                s = "";
                document.getElementById("search_list_input_clear").style.display = "none"
                document.getElementById("search_list_input").value = "";
                $param.search_list.whereOther = "";
                break;
        }
        $search_list.fuzzy_inputed[$search.list_No] = s;
        // $data.get_data_search_list($search.list_No)
    },
    input_changed: function (used) {
        $search_list.fuzzy(used);
        $data.get_data_search_list($search.list_No)
    }
}

/**
 *
 */
var $whereOther = {
    tiaojian: "",
    search_frame: "",
    No_from_group_list: [],
    No_from_sel: [],
    No_from_sel_like: [],
    No_from_qujian_number: [],

    from_group_list: function () {
        var whereOther = "";
        for (var i = 0; i < $whereOther.No_from_group_list.length; i++) {
            if ($whereOther.No_from_group_list[i] != undefined)
                whereOther = whereOther + $whereOther.No_from_group_list[i];
        }
        return whereOther;
    },
    from_sel: function () {
        var whereOther = "";
        for (var i = 0; i < $whereOther.No_from_sel.length; i++) {
            if ($whereOther.No_from_sel[i] != undefined)
                whereOther = whereOther + $whereOther.No_from_sel[i];
        }
        return whereOther;
    },
    from_sel_like: function () {
        var whereOther = "";
        for (var i = 0; i < $whereOther.No_from_sel_like.length; i++) {
            if ($whereOther.No_from_sel_like[i] != undefined)
                whereOther = whereOther + $whereOther.No_from_sel_like[i];
        }
        return whereOther;
    },
    from_sel_qujian_number: function () {
        var whereOther = "";
        for (var i = 0; i < $whereOther.No_from_qujian_number.length; i++) {
            if ($whereOther.No_from_qujian_number[i] != undefined)
                whereOther = whereOther + $whereOther.No_from_qujian_number[i];
        }
        // whereOther= whereOther==undefined?"":whereOther;
        return whereOther;
    },


    /**
     * 模糊查询,拼装成为 name like ‘%a%’
     * @param a
     * @param Name
     * @returns {string}
     * @constructor
     */
    FuzzyQuery: function (a, Name) {
        var sFuzzyQuery = "" // 模糊查询条件
        if (a != "") {
            a = a.replace(/(^\s*)|(\s*$)/g, "");//去除两端的空额
            var b = a.split(" ")//把字符串变为数组
            if (b.length != 0) {
                if (a.length == 1) {
                    sFuzzyQuery = " and " + Name + " like '%" + a + "%' ";
                }
                else {
                    sFuzzyQuery = " and (" + Name + " like '%" + b[0].replace(/(^\s*)|(\s*$)/g, "") + "%' ";
                    for (var j = 1; j < b.length; j++) {
                        if (b[j].length != 0)
                            sFuzzyQuery = sFuzzyQuery + " and " + Name + " like '%" + b[j].replace(/(^\s*)|(\s*$)/g, "") + "%' ";
                    }
                    sFuzzyQuery = sFuzzyQuery + ")";
                }
            }
            return sFuzzyQuery;
        }
        return ""
    }
}

// ---------------------------------------------------------------------------------------------------------------------
/**
 *  与参数传递相关
 *
 */
var $param = {
    path: "",
    homepage_url: "",//
    java_path: "",// 链接的java的lujin
    currUserType: "",//当前用户类型
    inProject: "", //是否是项目内，1 为是，0为不是
    projectSN: "",
    whoseType: "",//被查询的角色类型（输入数据表字段名）
    whoseID: "",//被查询的角色的ID （一般从页面获取）
    whereDate: "",// 被查询的时间日期范围，
    whereDateType: "",//用来控制拼接时间的具体字段
    whereDateStart: "",// 被查询的时间日期范围，
    whereDateEnd: "",// 被查询的时间日期范围，
    whereNumber: "",//被查询的数字信息字段名，如金额、数量等字段
    whereStatus: "",//被查询的有关状态的字段名与值
    whereOther: "",//其他被查询条件
    whereLike: "",// 模糊查询用
    groupby: "",//按照哪个字段汇总的字段名
    orderby: "",//按照哪个字段排序的字段名
    orderbyType: "",//按照哪个字段排序的排序方式
    limit: "",//需要显示的条数
    used: "",//根据used，输出查询输出的内容（这个要在方法中定义）
    usedType: "",//用来控制输出，如果是xiaolanmu就输出 l.get(0)
    companyShigongID: "", //工程公司（甲方）id
    companySupplierID: "",//供应商（乙方）id
    inputUrl: "",// 新建业务模块用
    windowTitle: "",//标题名称
    type: "", // 好思 用于区别业务的参数
    memberType: "",//从房间过来的，判断是否是房主：1：房主 2：成员  3：访客
    currRoomId: "",//从房间过来的，当前房间id
    isRoomId: "",//从房间过来的，所属房间id
    userId: "",//当前查看的用户ID


    default: {
        homepage_url: "",//
        java_path: "",// 链接的java的lujin
        currUserType: "",//当前用户类型
        inProject: 0, //是否是项目内，1 项目内，0项目外
        projectSN: "",
        whoseType: "",//被查询的角色类型（输入数据表字段名）
        whoseID: "",//被查询的角色的ID （一般从页面获取）
        whereDate: 30,// 被查询的时间日期范围，
        whereDateType: "createDate",//用来控制拼接时间的具体字段
        whereDateStart: "",// 被查询的时间日期范围，
        whereDateEnd: "",// 被查询的时间日期范围，
        whereNumber: "",//被查询的数字信息字段名，如金额、数量等字段
        whereStatus: "",//被查询的有关状态的字段名与值
        whereOther: "",//其他被查询条件
        whereLike: "",// 模糊查询用
        groupby: "",//按照哪个字段汇总的字段名
        orderby: "createDate",//按照哪个字段排序的字段名
        orderbyType: "DESC",//按照哪个字段排序的排序方式
        limit: "",//需要显示的条数
        used: "query",//根据used，输出查询输出的内容（这个要在方法中定义）
        usedType: "",//用来控制输出，如果是xiaolanmu就输出 l.get(0)
        companyShigongID: "", //工程公司（甲方）id
        companySupplierID: "",//供应商（乙方）id
        inputUrl: "",// 新建业务模块用
        windowTitle: "",//标题名称
        type: "", // 好思 用于区别业务的参数
        memberType: "",//从房间过来的，判断是否是房主：1：房主 2：成员  3：访客
        currRoomId: "",//从房间过来的，当前房间id
        isRoomId: "",//从房间过来的，所属房间id
        userId: setting.getCookie("userid"),//当前查看的用户ID


    },
    search_list: {

        inProject: "",
        projectSN: "",
        companyShigongID: "", //工程公司（甲方）id
        companySupplierID: "",//供应商（乙方）id
        currUserType: "",//当前用户类型
        whereDateType: "",
        whereOther: ""
    },
    //记录上一次读取数据时候的参数
    last_load_data: {
        had_changed: true,
        projectSN: "",
        whoseType: "",//被查询的角色类型（输入数据表字段名）
        whoseID: "",//被查询的角色的ID （一般从页面获取）
        whereDate: "",// 被查询的时间日期范围，""
        whereDateType: "",//用来控制拼接时间的具体字段
        whereDateStart: "",// 被查询的时间日期范围，
        whereDateEnd: "",// 被查询的时间日期范围，
        whereNumber: "",//被查询的数字信息字段名，如金额、数量等字段
        whereStatus: "",//被查询的有关状态的字段名与值
        whereOther: "",//其他被查询条件
        whereLike: "",// 模糊查询用
    },
    // 如果本次读取数据的参数发生变化，则将本次读取数据的参数，传递给上一次读取的参数
    get_last_load_data: function (tf) {
        if (tf == true) {
            $param.last_load_data.projectSN = $param.projectSN;
            $param.last_load_data.whoseType = $param.whoseType;
            $param.last_load_data.whoseID = $param.whoseID;
            $param.last_load_data.whereDate = $param.whereDate;
            $param.last_load_data.whereDateStart = $param.whereDateStart;
            $param.last_load_data.whereDateEnd = $param.whereDateEnd;
            $param.last_load_data.whereNumber = $param.whereNumber;
            $param.last_load_data.whereStatus = $param.whereStatus;
            $param.last_load_data.whereOther = $param.whereOther;
            $param.last_load_data.whereLike = $param.whereLike;
            $param.last_load_data.had_changed = false;
        }
    },
    //判断本次读取数据的参数是否发生变，返回值 true 发生变化，flase 未发生变化
    had_changed: function () {
        if ($param.last_load_data.projectSN != $param.projectSN) return $param.last_load_data.had_changed = true;
        if ($param.last_load_data.whoseType != $param.whoseType) return $param.last_load_data.had_changed = true;
        if ($param.last_load_data.whoseID != $param.whoseID) return $param.last_load_data.had_changed = true;
        if ($param.last_load_data.whereDate != $param.whereDate) return $param.last_load_data.had_changed = true;
        if ($param.last_load_data.whereDateStart != $param.whereDateStart) return $param.last_load_data.had_changed = true;
        if ($param.last_load_data.whereDateEnd != $param.whereDateEnd) return $param.last_load_data.had_changed = true;
        if ($param.last_load_data.whereNumber != $param.whereNumber) return $param.last_load_data.had_changed = true;
        if ($param.last_load_data.whereStatus != $param.whereStatus) return $param.last_load_data.had_changed = true;
        if ($param.last_load_data.whereOther != $param.whereOther) return $param.last_load_data.had_changed = true;
        if ($param.last_load_data.whereLike != $param.whereLike) return $param.last_load_data.had_changed = true;
        return $param.last_load_data.had_changed = false;
    },
    /**
     * 给页面的全局变量赋值，非查询页面用
     * @param url
     */
    set_param: function (url) {
        // 获取给Java传递的参数值,固定写法----------------------------------------------------------------------------------
        var map = url
        $param.homepage_url = map.homepage_url === undefined || map.homepage_url == null ? $param.default.homepage_url : map.homepage_url;//当前用户类型
        $param.currUserType = map.currUserType == undefined || map.currUserType == null ? $param.default.currUserType : map.currUserType;//当前用户类型
        $param.inProject = map.inProject == undefined || map.inProject == null ? $param.default.inProject : map.inProject;  //是否是项目内，1 为是，0为不是
        $param.projectSN = map.projectSN == undefined || map.projectSN == null ? $param.default.projectSN : map.projectSN;
        $param.projectSN = map.projectSn == undefined || map.projectSn == null ? $param.projectSN : map.projectSn;
        $param.companyShigongID = map.companyShigongID == undefined || map.companyShigongID == null ? $param.default.companyShigongID : map.companyShigongID;//工程公司（甲方）id
        $param.companySupplierID = map.companySupplierID == undefined || map.companySupplierID == null ? $param.default.companySupplierID : map.companySupplierID;//供应商（乙方）id
        $param.whoseType = map.whoseType == undefined || map.whoseType == null ? $param.default.whoseType : map.whoseType; //被查询的角色类型（输入数据表字段名）
        $param.whoseID = map.whoseID == undefined || map.whoseID == null ? $param.default.whoseID : map.whoseID; //被查询的角色的ID （一般从页面获取）
        $param.whereDate = map.whereDate == undefined || map.whereDate == null ? $param.default.whereDate : map.whereDate; // 被查询的时间日期范围，
        $param.whereDateType = map.whereDateType == undefined || map.whereDateType == null ? $param.default.whereDateType : map.whereDateType; //用来控制拼接时间的具体字段
        $param.whereDateStart = map.whereDateStart == undefined || map.whereDateStart == null ? $param.default.whereDateStart : map.whereDateStart; // 被查询的时间日期范围，
        $param.whereDateEnd = map.whereDateEnd == undefined || map.whereDateEnd == null ? $param.default.whereDateEnd : map.whereDateEnd; // 被查询的时间日期范围，
        $param.whereNumber = map.whereNumber == undefined || map.whereNumber == null ? $param.default.whereNumber : map.whereNumber;//被查询的数字信息字段名，如金额、数量等字段
        $param.whereStatus = map.whereStatus == undefined || map.whereStatus == null ? $param.default.whereStatus : map.whereStatus;//被查询的有关状态的字段名与值
        $param.whereOther = map.whereOther == undefined || map.whereOther == null ? $param.default.whereOther : map.whereOther;//其他被查询条件
        $param.groupby = map.groupby == undefined || map.groupby == null ? $param.default.groupby : map.groupby;   //按照哪个字段汇总的字段名
        $param.orderby = map.orderby == undefined || map.orderby == null ? $param.default.orderby : map.orderby;   //按照哪个字段排序的字段名
        $param.orderbyType = map.orderbyType == undefined || map.orderbyType == null ? $param.default.orderbyType : map.orderbyType;   //按照哪个字段排序的排序方式
        $param.limit = map.limit == undefined || map.limit == null ? $param.default.limit : map.limit;   //需要显示的条数
        $param.used = map.used == undefined || map.used == null ? $param.default.used : map.used;   //根据used，输出查询输出的内容（这个要在方法中定义）
        $param.usedType = map.usedType == undefined || map.usedType == null ? $param.default.usedType : map.usedType;   //用来控制输出，如果是xiaolanmu就输出 l.get(0)

        $param.inputUrl = map.inputUrl == undefined || map.inputUrl == null ? $param.default.inputUrl : map.inputUrl;   //新建业务模块用
        $param.windowTitle = map.windowTitle == undefined || map.windowTitle == null ? $param.default.windowTitle : map.windowTitle;   //新建业务模块用windowTitle
        $param.memberType = map.memberType == undefined || map.memberType == null ? $param.default.memberType : map.memberType;   //memberType
        $param.memberType = map.loginType == undefined || map.loginType == null ? $param.memberType : map.loginType;   //loginType
        $param.currRoomId = map.currRoomId == undefined || map.currRoomId == null ? $param.default.currRoomId : map.currRoomId;   //currRoomId
        $param.isRoomId = map.isRoomId == undefined || map.isRoomId == null ? $param.default.isRoomId : map.isRoomId;   //isRoomId
        $param.userId = map.userId == undefined || map.userId == null ? $param.default.userId : map.userId;   //userId
        $param.type = map.type == undefined || map.type == null ? $param.default.type : map.type; // 好思 用于区别业务的参数

        $param.search_list.inProject = $param.inProject;
        $param.search_list.projectSN = $param.projectSN;
        $param.search_list.companyShigongID = $param.companyShigongID;
        $param.search_list.companySupplierID = $param.companySupplierID;
        $param.search_list.currUserType = $param.currUserType;
        //
        if ($param.whereDateStart != "" || $param.whereDateEnd != "") {
            $date.url_had_date = true;
        } else {
            $date.url_had_date = false;
        }

        $param.whereNumber = $param.whereNumber != "" && $param.whereNumber.substring(0, 3) != "and" ? "and " + $param.whereNumber : $param.whereNumber;
        $param.whereStatus = $param.whereStatus != "" && $param.whereStatus.substring(0, 3) != "and" ? "and " + $param.whereStatus : $param.whereStatus;
        $param.whereOther = $param.whereOther != "" && $param.whereOther.substring(0, 3) != "and" ? "and " + $param.whereOther : $param.whereOther;
    },
    get_param_from_url: function () {
        var url = "";
        try {
            url = $str.decodeURLComponent(window.location.href);// 加密过的rul
        } catch (e) {
            url = window.location.href;// 未加密的rul
        }
        if (url != undefined && url != "undefined")
            $param.path = "&" + url.substring(url.indexOf("?") + 1);
        //获得url中的参数,固定写法；----------------------------------------------------------------------------------------
        $param.set_param(getParam(url));
    },
    /**
     * 给从java获得数据，传递参数用
     * @returns {*}
     */
    data: function (isGroup) {

        var param = new FormData();
        param.append("currUserType", $param.currUserType);
        param.append("projectSN", $param.projectSN);
        param.append("companyShigongID", $param.companyShigongID);
        param.append("companySupplierID", $param.companySupplierID);
        param.append("whoseType", $param.whoseType);
        param.append("whoseID", $param.whoseID);
        param.append("whereDate", $param.whereDate);
        param.append("whereDateType", $param.whereDateType);
        param.append("whereDateStart", $param.whereDateStart);
        param.append("whereDateEnd", $param.whereDateEnd);
        param.append("whereNumber", $param.whereNumber);
        param.append("whereStatus", $param.whereStatus);
        param.append("whereOther", $param.whereOther);
        param.append("whereLike", $param.whereLike);
        if (isGroup == "isGroup")
            param.append("groupby", $param.groupby);
        param.append("orderby", $param.orderby);
        param.append("orderbyType", $param.orderbyType);
        param.append("limit", $param.limit);
        param.append("used", $param.used);
        param.append("usedType", $param.usedType);
        param.append("currRoomId", $param.currRoomId);
        param.append("isRoomId", $param.isRoomId);
        return param;
    },
    search_list_data: function (No) {
        var param = new FormData();
        param.append("groupby", $search_list.used[No]);
        param.append("used", "search_list_" + $search_list.used[No]);
        param.append("currUserType", $param.search_list.currUserType);
        if ($param.search_list.inProject == 1) param.append("projectSN", $param.search_list.projectSN);
        param.append("companyShigongID", $param.search_list.companyShigongID);
        param.append("companySupplierID", $param.search_list.companySupplierID);
        param.append("whereDateType", $param.search_list.whereDateType);
        param.append("orderby", $param.search_list.whereDateType);
        param.append("whereOther", $param.search_list.whereOther)
        param.append("currRoomId", $param.currRoomId);
        if ($param.currRoomId != "") param.append("projectSN", $param.search_list.projectSN);
        param.append("isRoomId", $param.isRoomId);
        return param;
    },
    /**
     * 给各种链接传递参数用
     * @returns {string}
     */
    url: function () {
        var param = ""
        param = param + ("homepage_url=" + setting.getUrl());
        param = param + ("&Relative_path=") + $url.GetUrlRelativePath(); // 相对路径
        try {
            param = param + ("&java_path=" + $param.java_path);
        } catch (e) {
        }
        // 给java传递的参数
        param = param + ("&currUserType=" + $param.currUserType);
        param = param + ("&inProject=" + $param.inProject);
        param = param + ("&projectSN=" + $param.projectSN);
        param = param + ("&whoseType=" + $param.whoseType );
        param = param + ("&whoseID=" + $param.whoseID);
        param = param + ("&whereDate=" + $param.whereDate);
        param = param + ("&whereDateType=" + $param.whereDateType);
        param = param + ("&whereDateStart=" + $param.whereDateStart);
        param = param + ("&whereDateEnd=" + $param.whereDateEnd);
        param = param + ("&whereNumber=" + $param.whereNumber );
        param = param + ("&whereStatus=" + $param.whereStatus);
        param = param + ("&whereOther=" + $param.whereOther);
        param = param + ("&orderby=" + $param.orderby);
        param = param + ("&orderbyType=" + $param.orderbyType);
        param = param + ("&limit=" + $param.limit );
        param = param + ("&used=" + $param.used );
        param = param + ("&usedType=" + $param.usedType );
        param = param + ("&currRoomId=" + $param.roomId );
        param = param + ("&isRoomId=" + $param.isRoomId );
        param = param + ("&__SESSIONID_=" + setting.getCookie("sessionid"));
        return param;
    },
    /**
     * 调试用，显示参数具体内容
     */
    view: function (d) {
        console.info(d + ":\===========================================" +
            " \n&homepage_url=" + setting.getUrl() +
            " \n&Relative_path=" + $url.GetUrlRelativePath() +
            " \n&java_path=" + ($param.java_path == undefined || $param.java_path == null ? "" : $param.java_path ) +
            " \n&inProject=" + ($param.inProject == undefined || $param.inProject == null ? "" : $param.inProject) +
            " \n&currUserType=" + ($param.currUserType == undefined || $param.currUserType == null ? "" : $param.currUserType ) +
            " \n&projectSN=" + ( $param.projectSN == undefined || $param.projectSN == null ? "" : $param.projectSN ) +
            " \n&whoseType=" + ( $param.whoseType == undefined || $param.whoseType == null ? "" : $param.whoseType  ) +
            " \n&whoseID=" + ($param.whoseID == undefined || $param.whoseID == null ? "" : $param.whoseID ) +
            " \n&whereDateType=" + ($param.whereDateType == undefined || $param.whereDateType == null ? "" : $param.whereDateType ) +
            " \n&whereDate=" + ($param.whereDate == undefined || $param.whereDate == null ? "" : $param.whereDate ) +
            "\n&whereDateStart=" + ( $param.whereDateStart == undefined || $param.whereDateStart == null ? "" : $param.whereDateStart) +
            "\n&whereDateEnd=" + ( $param.whereDateEnd == undefined || $param.whereDateEnd == null ? "" : $param.whereDateEnd) +
            " \n&whereNumber=" + ($param.whereNumber == undefined || $param.whereNumber == null ? "" : $param.whereNumber  ) +
            " \n&whereStatus=" + ($param.whereStatus == undefined || $param.whereStatus == null ? "" : $param.whereStatus ) +
            " \n&whereOther=" + ($param.whereOther == undefined || $param.whereOther == null ? "" : $param.whereOther  ) +
            " \n&whereLike=" + ($param.whereLike == undefined || $param.whereLike == null ? "" : $param.whereLike  ) +
            " \n&groupby=" + ($param.groupby == undefined || $param.groupby == null ? "" : $param.groupby  ) +
            " \n&groupClicked=" + ($param.groupClicked == undefined || $param.groupClicked == null ? "" : $param.groupClicked  ) +
            " \n&orderby=" + ($param.orderby == undefined || $param.orderby == null ? "" : $param.orderby ) +
            " \n&limit=" + ($param.limit == undefined || $param.limit == null ? "" : $param.limit  ) +
            " \n&used=" + ($param.used == undefined || $param.used == null ? "" : $param.used  ) +
            " \n&usedType=" + ($param.usedType == undefined || $param.usedType == null ? "" : $param.usedType  ) +
            "\n&wherelike=" + ($param.whereLike == undefined || $param.whereLike == null ? "" : $param.whereLike  )
        );
    }
}

// 基本功能 ------------------------------------------------------------------------------------------------------------
/**
 *  关于获取数据的方法
 */
var $data = {

    first_read: true, // 判断是否是第一次读取数据；
    have: {
        thisTime: true,
        lastTime: true,
        top_thisTime: true,
        top_lastTime: true,
        list_thisTime: true,
        list_lastTime: true,
        recorderlist_thisTime: true,
        recorederlist_lastTime: true,
        grouplist_thisTime: true,
        grouplist_lastTime: true,
    },
    /**
     *
     */
    get_all_data: function (used) {
        switch (used) {

            case "create": // 打开窗体时候
            case "saixuan_date"://时间范围筛选
            case "group_list"://点击group_list
            case "search": //
            case "del_tiaojian":// 删除条件栏的条件
            case "select_ok": // 点击筛选的确定
                if ($show_status.gongneng.need_top_show == true) {
                    $data.get_data("top", $url.java_path_group);
                }
            case "zhankaishouqi": // 点击展开收起
            case "group": //点击分组
            case "orderby":// 点击排序
                $data.get_list_data();
                break;
        }
    },
    /**
     *  获取列表数据
     */
    get_list_data: function () {

        if ($group.No == "无分组") {
            if ($id_show.list == true || $label.btn_zhankaisouqi != "查看明细")
                $data.get_data("recorder_list", $url.java_path_table);
        } else {
            if ($show_status.gongneng.need_group_list == true) {
                $data.get_data("group_list", $url.java_path_group, "isGroup");
            }
        }
    },

    get_data: function (use, java_path, isGroup) {
        var param = $param.data(isGroup);
        var path = java_path;
        // $param.usedType= use=="top"?"xiaolanmu":"";
        _self.$http.post(path, param).then(function (response) {
            console.info(use);
            console.info(response.data.result);
            var array = response.data.result;
            $data.search_homepage_data(use, array);//处理得到的数据
        }).catch(function (error) {
            console.error(error);
        });

    },
    search_homepage_data: function (use, array) {
        // var array= $data.get_data(use,java_path,isGroup)
        switch (use) {
            case "top":
                if (array == null || array.length == 0 || array[0].tiao == 0) {
                    $data.have.top_thisTime == false;
                    // console.info("无数据")
                    // console.info("$data.have.top_lastTime = "+ $data.have.top_lastTime)
                    if ($data.have.top_lastTime == true) {
                        // 记录上次有数据时的显示状态
                        if ($id_show.lastTime.had_recorded == false) {
                            $id_show.lastTime.get_isShow("$data.have.top_lastTime==false++");
                            $id_show.lastTime.had_recorded = true
                        }
                        // 设置为无数据的显示状态
                        $information.no_data_show("$data.have.top_lastTime");
                        $data.have.top_lastTime = false;
                        // console.info("$data.have.top_lastTime = "+ $data.have.top_lastTime)
                    }
                    $data.have.lastTime = false;
                } else {
                    _self.$data.items_top = array;
                    // //判断本次读取是否有数据
                    if ($data.have.top_lastTime == false) {
                        //恢复成无数据之前的显示状态
                        $information.have_data_lastTime_show("$data.have.top_lastTime==true++");
                        $data.have.top_lastTime = true;
                        $id_show.lastTime.had_recorded = false;
                        // console.info("$data.have.top_lastTime = "+ $data.have.top_lastTime)
                    }
                }
                break;
            case "recorder_list":
                if (array == null || array.length == 0) {
                    $data.have.recorderlist_thisTime = false;
                    if ($data.have.recorederlist_lastTime == true) {
                        // 记录上次有数据时的显示状态
                        if ($id_show.lastTime.had_recorded == false) {
                            $id_show.lastTime.get_isShow("$data.have.recorederlist_lastTime___________");
                            $id_show.lastTime.had_recorded = true
                        }
                        // 设置为无数据的显示状态
                        $information.no_data_show("recorder_list");
                        $data.have.recorederlist_lastTime = false;
                        // console.info("$data.have.top_lastTime = "+ $data.have.top_lastTime)
                        $data.have.lastTime = false;
                    }
                } else {
                    _self.$data.items_recorder_list = array;
                    // 数据条数
                    $label.recorder_list_number = array.length;
                    if ($label.group_titel == "无分组")
                        _self.$data.data_number = $label.set.top_number($label.recorder_list_number, "无分组");
                    else
                        _self.$data.data_number = $label.set.top_number($label.recorder_list_number, $group.No);
                    //显示状态
                    $data.have.recorderlist_thisTime = true;
                    if ($data.have.recorederlist_lastTime == false) {
                        $information.have_data_lastTime_show("$data.have.recorederlist_lastTime__________recorder_list");
                        $data.have.recorederlist_lastTime = true;
                        $id_show.lastTime.had_recorded = false;
                    }
                    $data.have.lastTime = true;
                }
                break;
            case "group_list":
                if (array == null || array.length == 0) {
                    $data.have.grouplist_thisTime = false;
                    if ($data.have.grouplist_lastTime == true) {
                        // 记录上次有数据时的显示状态
                        if ($id_show.lastTime.had_recorded == false) {
                            $id_show.lastTime.get_isShow("group_list_______ $id_show.lastTime.get_isShow");
                            $id_show.lastTime.had_recorded = true
                        }
                        // 设置为无数据的显示状态
                        $information.no_data_show("group_list");
                        $data.have.grouplist_lastTime = false;
                        // console.info("$data.have.top_lastTime = "+ $data.have.top_lastTime)
                        $data.have.lastTime = false;
                    }
                } else {
                    _self.$data.litems_group_list = array;
                    // 数据条数
                    $label.group_list_number = array.length;
                    _self.$data.data_number = $label.set.top_number($label.group_list_number, $group.No);
                    //显示状态
                    $data.have.grouplist_thisTime = true;
                    if ($data.have.grouplist_lastTime == false) {
                        $information.have_data_lastTime_show("$data.have.grouplist_lastTime___________group_list");
                        $data.have.grouplist_lastTime = true;
                        $id_show.lastTime.had_recorded = false;
                    }
                    $data.have.lastTime = true;
                }
                break;
        }
        //是数据回到头部 固定写法
        document.getElementById("mui-scroll").style.transform = "translate3d(0px, 0px, 0px)";
        $data.first_read = false;
    },

    // bak_get_data:function(use,java_path,isGroup) {
    //     var param = $param.data(isGroup)
    //     var path = getUrl()+ java_path;
    //     // $param.usedType= use=="top"?"xiaolanmu":"";
    //     axios.post(path, param).then(function (response) {
    //         console.info(use);
    //         console.info(response.data.result);
    //         var array = response.data.result;
    //         if(array==null || array.length==0){
    //             switch (use){
    //                 case "recorder_list" :
    //                     // $data.recorderlist_had=false;
    //                     $data.have.recorderlist_thisTime=false;
    //                     if($data.have.recorederlist_lastTime==true){
    //                         // 记录上次有数据时的显示状态
    //                         if($id_show.lastTime.had_recorded==false){
    //                             $id_show.lastTime.get_isShow("$data.have.recorederlist_lastTime___________");
    //                             $id_show.lastTime.had_recorded=true
    //                         }
    //                         // 设置为无数据的显示状态
    //                         $information.no_data_show("recorder_list");
    //                         $data.have.recorederlist_lastTime = false;
    //                         // console.info("$data.have.top_lastTime = "+ $data.have.top_lastTime)
    //                     }
    //                     break;
    //                 case "group_list":
    //                     // $data.grouplist_had=false;
    //                     $data.have.grouplist_thisTime=false;
    //                     if($data.have.grouplist_lastTime==true){
    //                         // 记录上次有数据时的显示状态
    //                         if($id_show.lastTime.had_recorded==false){
    //                             $id_show.lastTime.get_isShow("group_list_______ $id_show.lastTime.get_isShow");
    //                             $id_show.lastTime.had_recorded=true
    //                         }
    //                         // 设置为无数据的显示状态
    //                         $information.no_data_show("group_list");
    //                         $data.have.grouplist_lastTime = false;
    //                         // console.info("$data.have.top_lastTime = "+ $data.have.top_lastTime)
    //                     }
    //                     break;
    //             }
    //             $data.first_read = false;
    //             return;
    //         }else {
    //             switch (use){
    //                 case "top":
    //                     _self.$data.items_top = array;
    //                     //判断本次读取是否有数据
    //                     $data.have.top_thisTime= _self.$data.items_top[0].tiao==0?false:true;
    //                     // alert($data.have.top_thisTime)
    //                     if($data.have.top_thisTime==false){
    //                         // console.info("无数据")
    //                         // console.info("$data.have.top_lastTime = "+ $data.have.top_lastTime)
    //                         if($data.have.top_lastTime==true){
    //                             // 记录上次有数据时的显示状态
    //                             if($id_show.lastTime.had_recorded==false){
    //                                 $id_show.lastTime.get_isShow("$data.have.top_lastTime==false++");
    //                                 $id_show.lastTime.had_recorded=true
    //                             }
    //                             // 设置为无数据的显示状态
    //                             $information.no_data_show("$data.have.top_lastTime");
    //                             $data.have.top_lastTime = false;
    //                             // console.info("$data.have.top_lastTime = "+ $data.have.top_lastTime)
    //                         }
    //                     } else {
    //                         // console.info("有数据")
    //                         // console.info("$data.have.top_lastTime = "+ $data.have.top_lastTime)
    //                         if($data.have.top_lastTime==false){
    //                             //恢复成无数据之前的显示状态
    //                             $information.have_data_lastTime_show("$data.have.top_lastTime==true++");
    //                             $data.have.top_lastTime = true;
    //                             $id_show.lastTime.had_recorded=false;
    //                             // console.info("$data.have.top_lastTime = "+ $data.have.top_lastTime)
    //                         }
    //                     }
    //                     break;
    //                 case "recorder_list" :
    //                     _self.$data.items_recorder_list = array;
    //                     // 数据条数
    //                     $label.recorder_list_number = array.length;
    //                     if($label.group_titel=="无分组")
    //                         app.data_number=$label.set.top_number($label.recorder_list_number,"无分组");
    //                     else
    //                         app.data_number=$label.set.top_number($label.recorder_list_number,$group.No);
    //                     //显示状态
    //                     $data.have.recorderlist_thisTime=true;
    //                     if($data.have.recorederlist_lastTime==false){
    //                         $information.have_data_lastTime_show("$data.have.recorederlist_lastTime__________recorder_list");
    //                         $data.have.recorederlist_lastTime=true;
    //                         $id_show.lastTime.had_recorded=false;
    //                     }
    //                     break;
    //                 case "group_list":
    //                     _self.$data.litems_group_list = array;
    //                     // 数据条数
    //                     $label.group_list_number=array.length;
    //                     app.data_number=$label.set.top_number($label.group_list_number,$group.No);
    //                     //显示状态
    //                     $data.have.grouplist_thisTime=true;
    //                     if($data.have.grouplist_lastTime==false){
    //                         $information.have_data_lastTime_show("$data.have.grouplist_lastTime___________group_list");
    //                         $data.have.grouplist_lastTime=true;
    //                         $id_show.lastTime.had_recorded=false;
    //                     }
    //                     break;
    //             }
    //             //是数据回到头部 固定写法
    //             document.getElementById("mui-scroll").style.transform = "translate3d(0px, 0px, 0px)";
    //             $data.first_read = false;
    //
    //         }
    //     }).catch(function (error) {
    //         console.error(error);
    //     });
    // },// 获取数据end

    get_data_search_list: function (No, id) {
        
        if (No < $label.sel.length) {
            var param = $param.search_list_data(No);
            var path = $url.java_path_group;
            // 从java获得数据
            _self.$http.post(path, param).then(function (response) {
//					console.info(used);
                console.info(response.data.result);
                var array = response.data.result;
                if (array == null || array.length == 0) {
                    // app.is_show_search_list = false;
                    $search_list.had_data = false;
                    $search_list_show.isShow($search_list.had_data);
                } else {
                    $search_list.No_val[No] = array;
                    $search_list.had_data = true;
                    $search_list_show.isShow($search_list.had_data);
                    setTimeout(function () {
                        $create.search_list_page.list($search_list.No_val[No], $search.list_No);
                    }, 100)
                }
                //是数据回到头部 固定写法
                document.getElementById("div_search_list").style.transform = "translate3d(0px, 0px, 0px)";
                return array;
            }).catch(function (error) {
                console.error(error);
            });
        } else {
            $search_list.No_val[No] = $search_list.others[No - $label.sel.length]
            $search_list.had_data = true;
            $search_list_show.isShow($search_list.had_data);
            setTimeout(function () {
                $create.search_list_page.list($search_list.No_val[No], $search.list_No);
            }, 100)
            //是数据回到头部 固定写法
            document.getElementById("div_search_list").style.transform = "translate3d(0px, 0px, 0px)";
        }

    },// 获取数据end

    /**
     *  从java中获得数据的方法
     * @param use
     * @param java_path
     * @param param
     */
    get_data_from_java: function (java_path, param, use) {
        var path =  java_path;
        _self.$http.post(path, param).then(function (response) {
            console.info(use);
            console.info(response.data.result);
            var array = response.data.result;
            console.info("array");
            console.info(array);
            return array;
        }).catch(function (error) {
            console.error(error);
        });
    },
}


// 页面onclick方法------------------------------------------------------------------------------------------------------
// 关闭当前页面 ----------------------------------------------------------------------------------------------------
/**
 *  关闭列表页面 固定写法
 * @param id
 */
function closeWindow(id) {
    cmApi.newWindow.hide(id);
}

var $onclick = {
    onclicked: {
        had_frist: false,

        frist_time: function () {
            if ($onclick.onclicked.had_frist == false) {
                $onclick.onclicked.had_frist = true;
            }
        },
        /**
         *  被点击，或者被选择后,修改class 样式
         */
        change_class: function (c_id, p_id, cName) {
            $onclick.onclicked.clear_selected(p_id, cName)
            // 选择后,被选择的修改className
            if (document.getElementById(c_id))
                document.getElementById(c_id).className = document.getElementById(c_id).className + cName;
        },
        // 删除被选择标记
        clear_selected: function (p_id, cName) {
            var doclist = document.getElementById(p_id).childNodes;
            for (var i = 0; i < doclist.length; i++) {
                if (doclist[i].className && doclist[i].className.indexOf(cName) != -1) {
                    doclist[i].className = doclist[i].className.replace(cName, "");
                }
            }
        }
    },
    /**
     *  点击“＋”,新建模块
     */
    inputNew: function () {

        if ($param.inputUrl != "") {
            var url = $param.inputUrl;
            // if(url.indexOf("!new.mdo") ==-1)
            //     url = url + "!new.mdo?";
            url = url + "?";
            url = url + "&__SESSIONID_=" + setting.getCookie("sessionid");
            if ($param.inProject == 1 || app.t_projectName != "")
                url = url + "&projectSN=" + $param.projectSN;
            url = url + "&type=" + $param.type;
            window.appApi.openNewWindow(url);
        }
    },
    //页面分组、日期筛选、排序的下拉的公用方法
    /**
     * 点击展开 的按钮，固定写法
     */
    zhankaiShouqi_first: true,// 第一次点击展开收起；
    zhankaiShouqi: function () {
        $onclick.onclicked.frist_time();
        $id_show.get_isShow("进入zhankaiShouqi___");
        if ($id_show.mini_top == false) {
            $top_changed.mini_top_show("zhankaiShouqi_____$top_changed.mini_top_show");

            if ($onclick.zhankaiShouqi_first == true || $tiaojian.changed == true) {
                $data.get_all_data("zhankaishouqi");
                $onclick.zhankaiShouqi_first = false;
                // $tiaojian.changed= false;
            }
        } else {
            $top_changed.group_top_show("zhankaiShouqi_____$top_changed.group_top_show");
        }
        document.getElementById($id.btn_zhankaisouqi).innerHTML = $label.btn_zhankaisouqi
        console.log($label.btn_zhankaisouqi)
    },

    /**
     * 点击分组按钮 ,使得相应的分组展开或者闭合固定写法
     * @param groupby
     */
    fenzhu_zhankai: function (id) {
        $onclick.onclicked.frist_time();
        switch (id) {
            case "fenzu_li":
                $zhankaiShouqi.shouqi("order_li");
                $zhankaiShouqi.shouqi("saixuan_li");
                // 分组选项显示状态
                $show_status.fenzuxiang();
                if ($label.btn_zhankaisouqi != "查看明细")
                    $zhankaiShouqi.zhankaiShouqi(id);
                break;
            case "order_li":
                $zhankaiShouqi.shouqi("fenzu_li");
                $zhankaiShouqi.shouqi("saixuan_li");
                if ($label.btn_zhankaisouqi != "查看明细")
                    $zhankaiShouqi.zhankaiShouqi(id);
                //排序选项显示状态
                // oreder_isShow()
                break;
            case "saixuan_li":
                $zhankaiShouqi.shouqi("order_li");
                $zhankaiShouqi.shouqi("fenzu_li");
                $zhankaiShouqi.zhankaiShouqi(id);
                break;
        }
    },
    /**
     * 点击具体筛选,日期筛选,固定写法
     */
    _date_saixuan: function (date, id, p_id, className) {
        $zhankaiShouqi.zhankaiShouqi("saixuan_li");
        $date.get_date_fanwei(date, "_date_saixuan");
        if ($date.sel_dateStart_last != $date.sel_dateStart || $date.sel_dateEnd_last != $date.sel_dateEnd) {//发生变化了
            $tiaojian.changed = true;
            $data.get_all_data("saixuan_date")
            $date.date_saixuaned(date, id, p_id, className);
            $date.sel_dateStart_last = $date.sel_dateStart;
            $date.sel_dateEnd_last = $date.sel_dateEnd;
        }
    },

    /**
     * 点击排序
     * @orderby 为要排序的字段名
     * @id 被点击行的id
     * @p_id li所在ul的id
     */
    orderbyType: function (id, p_id) {
        $zhankaiShouqi.shouqi(p_id);
        var o = document.getElementById(id)
        if (o.className.indexOf("shengxu") != -1) {  //当前排序为升序
            $param.orderbyType = "desc";
        } else if (o.className.indexOf("jiangxu") != -1) { //当前排序为降序
            $param.orderbyType = "asc"
        } else { //当前未选择该排序
            $param.orderbyType = "desc";
        }
        //清空同级排序标签
        var doclist = document.getElementById(p_id).childNodes;
        for (var i = 0; i < doclist.length; i++) {
            if (doclist[i].className && doclist[i].className.indexOf("shengxu") != -1) {
                doclist[i].className = doclist[i].className.replace("shengxu", "");
            } else if (doclist[i].className && doclist[i].className.indexOf("jiangxu") != -1) {
                doclist[i].className = doclist[i].className.replace("jiangxu", "");
            }
        }
        //根据当前排序方式修改class
        if ($param.orderbyType == "asc") {
            o.className = o.className + " shengxu";
            $zhankaiShouqi.jiantoufangxiang("id_order_icon", "up");
        } else {
            o.className = o.className + " jiangxu";
            $zhankaiShouqi.jiantoufangxiang("id_order_icon", "down");
        }
    },
    /**
     * @orderby 为要排序的字段名
     * @id 被点击行的id
     * @p_id li所在ul的id
     * 固定写法
     */
    orderby: function (No, id, p_id) {

        document.getElementById("id_orderby").innerHTML = document.getElementById(id).innerHTML;
        $onclick.orderbyType(id, p_id);
        $param.orderby = $order.by[No];
        //获得数据
        $data.get_list_data();
        // 调整页面
        // $zhankaiShouqi.tiaojianlan($show_status.tiaojianlan(_self.$data.t_val));
        $tiaojian_change.show($tiaojian_change.isShow($tiaojian.name_long))
    },
    /**
     * 点击具体分组选择项
     * @param groupby
     */
    group: function (groupNo, id, p_id, className) {
        $group.No = groupNo;
        if (groupNo == '无分组') { //取消分组，或者无分组

            $param.groupby = "";
            $label.group_titel = "无分组";
            _self.$data.data_number = $label.set.top_number($label.recorder_list_number, "无分组");
            //list 显示
            $list.show()

            if (_self.$data.items_recorder_list.length == 0)
                $data.get_all_data("group");
        } else {
            $param.groupby = $group.by[groupNo];
            $label.group_titel = $label.group[groupNo];
            //list 显示
            $list.show();
            $data.get_all_data("group");
        }

        if (document.getElementById("id_fenzu"))
            document.getElementById("id_fenzu").innerHTML = $label.group_titel;
        // 收起分组
        $onclick.onclicked.change_class(id, p_id, className);
        $zhankaiShouqi.zhankaiShouqi(p_id);
    },
    //==================================================================================================================
    /**
     *  点击状态数字，可以通过数字对状态进行筛选
     */
    number_status: function (status) {
        var status_temp = $param.whereStatus;
        $param.whereStatus = "and " + whereStatusType + "=" + status + "\n";
        // 给获取列表数据
        if (_self.$data.recorder_list_show == true)
            $data.get_data("recorder_list", $url.java_path_table);
        $param.whereStatus = status_temp;
        //取消分组时，点击金额改变样式
        if (_self.$data.recorder_list_show == true)
            $comm.money_chang("#4ba9e9", status);
    },
    // 点击页面列表的点击事件===========================================================================================
    /**
     * 有　业务模块
     * 点击 recorder_list,获取业务模块的链接的方法；固定写法
     * @recorderID 是recorder 对应的模块记录的id
     */
    recorderID_last: "",//记录上一次点击时候，传进来的业务页面ID
    onclick_recorder_list: function (recorderID, yewu_name, chanshus) {
        console.info("recorderID=" + recorderID);
        console.info("recorderID_last=" + $onclick.recorderID_last);
        var child_url = $url.get_recorder_list($url.recorder_type, yewu_name, chanshus) + recorderID; //+ $param.path;
        child_url = child_url +"&currUserId="+$param.userId+"&currRoomId="+$param.currRoomId;
        console.info(child_url);
        window.appApi.openNewWindow(child_url);
    },
    //E:\svnWorkSpace\saas\sunline-web-app\src\main\webapp\static\webstatic\work\zonghe\zonghe_swprojectinfo.html
    //目前只为这个页面引用
    // recorder_list_for_projectInfo:function (path,name,ID) {
    //     var u=getUrl();
    //     u=u+path+"?homeType=1&projectName"+name+"&projectSN"+ID;
    //     window.appApi.openNewWindow(u);
    // },

    /**
     * 点击group_list,根据不同的分组情况下，改变数据的where
     * 多一个分组项目，就要增加对应的参数，（ID、name）
     */
    group_list: function (val) {
        $tiaojian.changed = true;

        // 分组项为无选择
        $onclick.onclicked.change_class('li_group', 'fenzu_li', ' active')
        $label.group_titel = "无分组";
        if (document.getElementById("id_fenzu"))
            document.getElementById("id_fenzu").innerHTML = $label.group_titel;
        // 给变量赋值
        var i = $group.No;
        $tiaojian.name_long[i] = val[i][1];
        $tiaojian.name_short[i] = $comm.$formatString($tiaojian.name_long[i], 3);
        $tiaojian.ID[i] = val[i][0];
        $whereOther.No_from_group_list[i] = "and " + $group.by[i] + "='" + $tiaojian.ID[i] + "'\n";

        $search.selected_Name[i] = $tiaojian.name_long[i];
        $search.selected_Name_short[i] = $tiaojian.name_short[i]
        $search.selected_ID[i] = $tiaojian.ID[i]

        $whereOther.tiaojian = $whereOther.from_group_list()
        $param.whereOther = $whereOther.from_group_list();
        // console.info($whereOther.tiaojian)

        $group.No = "无分组"
        $list.show()
        $data.get_all_data("group_list")

        // 条件栏页面
        $tiaojian_change.show($tiaojian_change.isShow($tiaojian.name_long));
        document.getElementById("t" + i).style.display = "";
        if (document.getElementById("t_val" + i))
            document.getElementById("t_val" + i).innerHTML = $tiaojian.name_long[i];
        // 给筛选页面的选项赋值，并改变按钮状态
        if (document.getElementById("sel_" + i))
            document.getElementById("sel_" + i).innerHTML = $tiaojian.name_long[i]
        $search.change_btn_search($search.get_had_selected());
    },

    /**
     *  条件栏里删除条件,
     */
    del_tiaojian: function (val) {
        $tiaojian.changed = true
        console.info("del_select===============" + $tiaojian.ID);
        //如果增加内容，
        if (_self.$data.group_list_show == false) {
            $label.group_titel = "无分组"
            if (document.getElementById("id_fenzu"))
                document.getElementById("id_fenzu").innerHTML = $label.group_titel;
        }

        $tiaojian.name_long[val] = ""
        $tiaojian.name_short[val] = "";
        $tiaojian.ID[val] = "";
        $whereOther.No_from_group_list[val] = "";
        $search.selected_Name[val] = "请选择";
        $search.selected_Name_short[val] = $tiaojian.name_short[val]
        $search.selected_ID[val] = $tiaojian.ID[val]

        //关闭当前条件项
        document.getElementById("t" + (val)).style.display = "none";
        //条件栏显示状态
        $tiaojian_change.show($tiaojian_change.isShow($tiaojian.name_long));

        // 获取顶部汇总数据 固定写法
        $whereOther.tiaojian = $whereOther.from_group_list();
        $param.whereOther = $whereOther.tiaojian;
        console.info("del_select===============" + $param.whereOther);
        $data.get_all_data("del_tiaojian")
        // 给筛选页面的选项赋值，并改变按钮状态
        if (document.getElementById("sel_" + val))
            document.getElementById("sel_" + val).innerHTML = "请选择"
        $search.change_btn_search($search.get_had_selected());
    },

    // 筛选页面=========================================================================================================
    /**
     * 删除模糊查询输入框内容
     * @param No
     */
    del_like: function (No) {
        if (document.getElementById("sel_like_input" + No))
            document.getElementById("sel_like_input" + No).value = "";
        document.getElementById("clear_fuzzy_query" + No).style.display = "none";
        $whereOther.No_from_sel_like[No] = ""
    },
    /**
     *
     * @param No
     */
    del_number_max: function (No) {
        if (document.getElementById("qujian_max" + No))
            document.getElementById("qujian_max" + No).value = "";
        document.getElementById("qujian_max_clear" + No).style.display = "none";
    },
    del_number_min: function (No) {
        if (document.getElementById("qujian_min" + No))
            document.getElementById("qujian_min" + No).value = "";
        document.getElementById("qujian_min_clear" + No).style.display = "none";
    },
    /**
     * 清除时间选择
     * @param val 值域 start 按 end
     */
    del_date: function (val) {
        switch (val) {
            case "start":
                $date.sel_dateStart = "-";
                _self.$data.sel_dateStart = "-";
                $date_show.sel_dateStart_main(false);
                break;
            case "end":
                $date.sel_dateEnd = "-";
                _self.$data.sel_dateEnd = "-";
                $date_show.sel_dateEnd_main(false);
                break;
        }
    },
    /**
     * 主页点击查询筛选的放大镜按钮
     */
    btn_search: function () {
        // mui('#offCanvasWrapper').offCanvas('show');//打开筛选窗口
        $sideslip.param.hetongmove = true;//打开筛选窗口
        //收起、分组、排序、日期下拉框
        $zhankaiShouqi.shouqi("fenzu_li");
        $zhankaiShouqi.shouqi("order_li");
        $zhankaiShouqi.shouqi("saixuan_li");
    },
    /**
     * 点击筛选页面的确认按钮
     */
    select_ok: function () {
        $onclick.onclicked.frist_time();
        // 对日期时间的处理，固定写法
        if ($show_status.gongneng.sel_date == true) {
            if ($date.sel_dateStart_last != $date.sel_dateStart || $date.sel_dateEnd_last != $date.sel_dateEnd) {// 发生变化了

                //功能栏标题改为自定义
                document.getElementById("id_saixuan").innerHTML = $date.sel_dateStart == "-" && $date.sel_dateEnd == "-" ? "全部" : "自定义";
                $onclick.onclicked.clear_selected("saixuan_li", " active")
                //
                $param.whereDateStart = $date.sel_dateStart == "-" ? "" : $date.sel_dateStart;
                $param.whereDateEnd = $date.sel_dateEnd == "-" ? "" : $date.sel_dateEnd;
                // app.date_qujian = $date.group_top($param.whereDateStart,$param.whereDateEnd);
                // 给top里的时间显示赋值
                $date.fanwei_show = $label.sel_date + " ：" + $date.group_top($param.whereDateStart, $param.whereDateEnd);
                if (document.getElementById("li_date_fanwei")) {
                    document.getElementById("li_date_fanwei").innerHTML = $date.fanwei_show;
                }
                $date.sel_dateStart_last = $date.sel_dateStart
                $date.sel_dateEnd_last = $date.sel_dateEnd;
            }
        }
        // 选择框
        if ($show_status.gongneng.ul_search_combox == true) {
            for (var i = 0; i < $search.selected_Name.length; i++) {
                if ($search.selected_Name[i] == "请选择") {
                    // _self.$data.t_val[i] = "";
                    $tiaojian.name_long[i] = "";
                    $tiaojian.name_short[i] = "";
                    $tiaojian.ID[i] = "";
                    $whereOther.No_from_sel[i] = "";
                    if (document.getElementById("t" + (i)))
                        document.getElementById("t" + (i)).style.display = "none";
                } else {
                    if (i < $label.sel.length) {
                        $whereOther.No_from_sel[i] = " and " + $search_list.used[i] + "='" + $search.selected_ID[i] + "'\n";
                        if (i <= $tiaojian.ID.length) {

                            $tiaojian.name_long[i] = $search.selected_Name[i];
                            $tiaojian.name_short[i] = $search.selected_Name_short[i];
                            $tiaojian.ID[i] = $search.selected_ID[i];
                            // _self.$data.t_val[i] = $tiaojian.name_long[i];

                            $whereOther.No_from_group_list[i] = $whereOther.No_from_sel[i];

                            if (document.getElementById("t" + (i)))
                                document.getElementById("t" + (i)).style.display = "";
                            if (document.getElementById("t_val" + i))
                                document.getElementById("t_val" + i).innerHTML = $tiaojian.name_long[i];
                        }
                    } else {
                        $whereOther.No_from_sel[i] = " and " + $search.selected_ID[i] + "\n";
                    }
                    console.info($whereOther.No_from_sel[i])
                }
            }
            $whereOther.search_frame = $whereOther.from_sel();
            $param.whereOther = $whereOther.search_frame;
        }
        //模糊查询
        if ($show_status.gongneng.fuzzy_query == true) {
            var s = "";
            // var a = $whereOther.FuzzyQuery(s,"testName")
            for (var i = 0; i < $search.like.length; i++) {
                if (document.getElementById("sel_like_input" + i))
                    s = document.getElementById("sel_like_input" + i).value;
                $whereOther.No_from_sel_like[i] = $whereOther.FuzzyQuery(s, $search.like[i]);
                $search.last.like[i] = s;
            }
            $param.whereLike = $whereOther.from_sel_like();
            // $param.whereLike="and 1=1";
            console.info("whereLike=" + $param.whereLike)
        }
        //数字区间查询
        if ($show_status.gongneng.select_qunjian_number == true) {
            var min = "";
            var max = "";
            var whereNumber_min = "";
            var whereNumber_max = "";
            for (var i = 0; i < $search.qujian_number.length; i++) {
                if (document.getElementById("qujian_min" + i))
                    min = document.getElementById("qujian_min" + i).value;
                if (min != "")
                    whereNumber_min = " and " + $search.qujian_number[i] + ">" + parseFloat(min);
                else whereNumber_min = "";
                ;
                if (document.getElementById("qujian_max" + i))
                    max = document.getElementById("qujian_max" + i).value;
                if (max != "")
                    whereNumber_max = " and " + $search.qujian_number[i] + "<" + parseFloat(max);
                else whereNumber_max = ""
                if (min > max && max != "") {
                    alert($label.sel_qujian_number[i] + "最大值不能小于最小值！");
                    $param.whereNumber = "";
                    return;
                } else {
                    $whereOther.No_from_qujian_number[i] = whereNumber_min + whereNumber_max
                    console.info($whereOther.No_from_qujian_number[i])
                }
                $search.last.qujian_number_max[i] = max;
                $search.last.qujian_number_min[i] = min;
            }
            $param.whereNumber = $whereOther.from_sel_qujian_number();
        }

        console.info("onclick_select===============" + $param.whereOther)
        //获取数据
        $data.get_all_data("select_ok")
        // }
        $whereOther.tiaojian = $whereOther.from_group_list()
        // 以下 固定写法
        // mui('#offCanvasWrapper').offCanvas('close');//关闭筛选窗口
        $sideslip.param.hetongmove = false;//关闭筛选窗口
        // 收起、分组、排序、日期下拉框
        $zhankaiShouqi.shouqi("fenzu_li");
        $zhankaiShouqi.shouqi("order_li");
        $zhankaiShouqi.shouqi("saixuan_li");
        //条件栏 显示状态
        // $zhankaiShouqi.tiaojianlan($show_status.tiaojianlan(_self.$data.t_val));
        $tiaojian_change.show($tiaojian_change.isShow($tiaojian.name_long))
        $search.change_btn_search($search.get_had_selected());
    },
    /**
     *    筛选项初始化，需要修改或者增加
     *    重置按钮
     */
    select_reset: function () {
        // 重置时间选择
        if ($show_status.gongneng.sel_date == true) {
            $date.sel_dateStart = $date.sel_dateStart_last;
            $date.sel_dateEnd = $date.sel_dateEnd_last;
            $param.whereDateStart = $date.sel_dateStart == "-" ? "" : $date.sel_dateStart;
            $param.whereDateEnd = $date.sel_dateEnd == "-" ? "" : $date.sel_dateEnd;
            //筛选页面的时间
            if ($date.sel_dateStart != "-")
                $date_show.sel_dateStart_main(true)
            else
                $date_show.sel_dateStart_main(false)

            if ($date.sel_dateEnd != "-")
                $date_show.sel_dateEnd_main(true)
            else
                $date_show.sel_dateEnd_main(false)
        }
        //重置条件选择项目
        if ($show_status.gongneng.ul_search_combox == true) {
            var j = $search.selected_Name.length;
            for (var i = 0; i < j; i++) {
                $search.selected_Name[i] = $tiaojian.name_long[i] == "" || $tiaojian.name_long[i] == undefined ? "请选择" : $tiaojian.name_long[i];
                $search.selected_Name_short[i] = $tiaojian.name_long[i] == "" || $tiaojian.name_long[i] == undefined ? "" : $tiaojian.name_long[i];
                ;
                $search.selected_ID[i] = $tiaojian.ID[i] == "" || $tiaojian.ID[i] == undefined ? "" : $tiaojian.ID[i];

                if (document.getElementById("sel_" + i))
                    document.getElementById("sel_" + i).innerHTML = $search.selected_Name[i];
            }
        }
        //清除模糊查询
        if ($show_status.gongneng.fuzzy_query == true) {
            for (var i = 0; i < $search.like.length; i++) {
                if (document.getElementById("sel_like_input" + i))
                    document.getElementById("sel_like_input" + i).value = "";
                var a = document.getElementById("sel_like_input" + i).value.length
                if (a.length > 0) {
                    document.getElementById("clear_fuzzy_query" + i).style.display = "block";
                } else {
                    document.getElementById("clear_fuzzy_query" + i).style.display = "none";
                }
                $whereOther.No_from_sel_like[i] = ""
            }
            $param.whereLike = "";
        }
        //清除数字范围
        if ($show_status.gongneng.select_qunjian_number == true) {
            for (var i = 0; i < $search.qujian_number.length; i++) {
                if (document.getElementById("qujian_min" + i))
                    document.getElementById("qujian_min" + i).value = "";
                document.getElementById("qujian_min_clear" + i).style.display = "none";
                if (document.getElementById("qujian_max" + i))
                    document.getElementById("qujian_max" + i).value = "";
                document.getElementById("qujian_max_clear" + i).style.display = "none";
                $whereOther.No_from_qujian_number[i] = ""
            }
            $param.whereNumber = "";
        }
    },
    /**
     * 点击选择项，进入选择列表-
     */

    search_list_open: function (id, No) {

        var content = document.querySelector("#" + id + " .cus-window-content");
        content.style.display = "none";
        cmApi.newWindow.show(id);

        $search.list_No = No;
        $search_list.get_selected(No); // 是否有被选择的

        document.getElementById("search_list_title").innerHTML = $label.title_search_list[No];// 页面标题
        $search_list_show.fuzzy(No < $label.sel.length);// 模糊查询显示情况
        if ($search_list.fuzzy_inputed[No] == undefined)
            document.getElementById("search_list_input").value = "";
        else
            document.getElementById("search_list_input").value = $search_list.fuzzy_inputed[No];

        setTimeout(function () {
            // 读数据之前先显示loading  隐藏内容   待内容加载完毕之后再显示
            var loading = document.querySelector("#" + id + " .mui-loading");
            loading.style.display = "";
            // 获取数据
            if ($search_list.No_val[No] == undefined) {
                document.getElementById("div_search_list").style.display = "none";//2018年4月19日16 临时处理过滤条件遮罩层bug
                document.getElementById("search_list_noNumber").style.display = "";//2018年4月19日16 临时处理过滤条件遮罩层bug
                console.info("-------" + $search_list.No_val[No]);
                $search_list.input_changed(1)
                $search_list.clicked[No] = true;
                document.getElementById("div_search_list").style.transform = "translate3d(0px, 0px, 0px)";
            } else {
                document.getElementById("div_search_list").style.display = "";//2018年4月19日16 临时处理过滤条件遮罩层bug
                document.getElementById("search_list_noNumber").style.display = "none";//2018年4月19日16 临时处理过滤条件遮罩层bug
                // console.info("--有数据-----" + $search_list.No_val[No])
                $search_list_show.btn_clear();
                $create.search_list_page.list($search_list.No_val[No], $search.list_No);
                document.getElementById("div_search_list").style.transform = "translate3d(0px, 0px, 0px)";
            }
            // 内容加载完毕  显示内容  隐藏loading
            var loading = document.querySelector("#" + id + " .mui-loading");
            loading.style.display = "none";
            var content = document.querySelector("#" + id + " .cus-window-content");
            content.style.display = "";
        }, 100)
    },
    /**
     * 查询列表选中后
     */
    selected_list: function (name, sn) {
        closeWindow('search_list');
        $onclick.set_selected_val($search.list_No, name, sn);
    },
    /**
     * 查询list页面，给筛选页面赋值用
     * @param used
     * @param name
     * @param sn
     */
    set_selected_val: function (No, name, sn) {
        // _self.$data.sel[No]= name==""?"请选择":name;
        $search.list_name_selected = name == "" ? "请选择" : name;


        $search.selected_Name[No] = name == "" ? "请选择" : name;
        $search.selected_Name_short[No] = $comm.$formatString(name, 3)
        $search.selected_ID[No] = sn != "" & sn != undefined ? sn : "";
        if (document.getElementById("sel_" + No))
            document.getElementById("sel_" + No).innerHTML = $search.selected_Name[No];
    },
}

//时间格式化 调用：var time1 = new Date().Format("yyyy-MM-dd");
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


export {$comm,format_number,$url,opt,sel_date,$date,$group,$order,$label,$tiaojian,$search,$search_list,$whereOther,$param,$data,$onclick}

