import laowu_common from "./laowu_common.js"
import laowu_confirm from "./laowu_confirm.js";
var d2 = new Date(); // 月是从0开始计数， 需要减一
d2.getFullYear(); // 年
d2.getMonth(); // 月
d2.getDate(); //天
d2.getDay() // 周3
d2.toLocaleDateString();
var date_now = new Date().getDate()
var paramMap=null
var _self=null
var calendar_short = {

    initVue:function(vue){
        _self=vue;
        console.log("_seslf",_self)
    },
    initData: function () {
        //传入日期
        var fromdata = "";
        var paramMap = laowu_common.paramMap;//获取地址栏参数
        if (paramMap != null) {
            fromdata = paramMap.queryTime;
        }
        if (!fromdata) {
            alert("日期查询出错")
        }
        var chuanY = Number(fromdata.split("-")[0])
        var chuanM = Number(fromdata.split("-")[1])
        var chuanD = Number(fromdata.split("-")[2])
        var chaY = chuanY - d2.getFullYear()
        var chaM = 12 * chaY
        var nowM = chuanM + chaM - 1
        var nowD = parseInt(chuanD)
       // setTimeout(function(){
            calendar_short.rlmake(nowM, nowD)
        //},100)

        $(".cc").text(d2.getMonth() + 1)
    },

    rlmake: function (k, v) {
        console.log(k, v)
        $(".mui-slider-group").empty()
        var date_one = new Date(d2.getFullYear(), k, 1).getDay()
        var datasp = new Date(d2.getFullYear(), k, 1).toLocaleDateString()
        var dataY = datasp.split("/")[0]
        var dataM = datasp.split("/")[1]
        if (dataM < 10) {
            dataM = "0" + dataM
        }
        $(".data").text(dataY + "-" + dataM)
        var date_all = new Date(d2.getFullYear(), k + 1, 0).getDate();
        //最后一天周几
        var date_lastone = new Date(d2.getFullYear(), k, date_all).getDay()
        var sd = 7 - date_one
        _self.fordata=date_one
        console.log("设置",_self)
        var zhou = Math.ceil((date_all - sd) / 7) + 1
        //	var Mou = new Date(d2.getFullYear(), k + 1, 1).getMonth()
        var startdata = v + new Date(d2.getFullYear(), k, 1).getDay() - 1
        var movestepq = parseInt(startdata / 7)
        //		var datanowr = d2.getDay() - startdata + 2
        var datanowr = new Date(d2.getFullYear(), k, v).getDay()
       
        for (var j = 0; j < zhou; j++) {
            $(".mui-slider-group").append('<div class="mui-slider-item itm' + j + '"><ul class="mui-table-view mui-grid-view mui-grid-9 itx' + j + '"></div></div>')
            for (var i = 0; i < 7; i++) {
                $(".itm" + j).find(".itx" + j).append('<li onclick="clickDate(this)" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"></li>')
                $(".itm" + j).find(".itx" + j).find("li").eq(i).text(new Date(d2.getFullYear(), k, i - date_one + 1 + 7 * j).getDate())
            }   
            $(".itm" + movestepq).addClass("mui-active")
            $(".itm0").find("li").eq(date_one).prevAll().css("color", "#ccc")
            $(".itm0").find("li").eq(date_one).prevAll().addClass("preM nonnow")
            $(".itm" + (zhou - 1)).find("li").eq(date_lastone).nextAll().css("color", "#ccc")
            $(".itm" + (zhou - 1)).find("li").eq(date_lastone).nextAll().addClass("nexM nonnow")
            $(".itm" + movestepq).find("li").eq(datanowr).css("background", "#4ba9e9")
            $(".itm" + movestepq).find("li").eq(datanowr).css("color", "#fff")
        }
        // alert(_self.$route.query.queryTime.split("-")[2])
    },
    /**
 * 选择下一月
 */
    nextMonth: function () {
        var cunt = 0
        $(".mui-slider-group").css("transform", " translate3d(0px, 0px, 0px)")
        $(".mui-slider-group").css("left", "0px")
        cunt++
        var num = Number($(".cc").text()) + cunt
        $(".cc").text(num)
        calendar_short.rlmake(num - 1)
    },
    /**
     * 选择上一月
     */
    lastMonth: function () {
        var cunt = 0
        $(".mui-slider-group").css("transform", " translate3d(0px, 0px, 0px)")
        $(".mui-slider-group").css("left", "0px")
        cunt--
        var num = Number($(".cc").text()) + cunt
        $(".cc").text(num)
        calendar_short.rlmake(num - 1)
    },

   

}

export default calendar_short;

 //点击日期
 window.clickDate=function (obj) {
     console.log("当前值："+obj.innerHTML)
    var day = obj.innerHTML;
    if (day < 10) {
        day = "0" + day
    }
    var dayri = $(".data").text();
    var conY = Number(dayri.split("-")[0])
    var conM = Number(dayri.split("-")[1])
    console.log(dayri)
    var selectdate = "";
    if (obj.getAttribute('class').indexOf("preM") > -1) {//上一月数据
        if (conM == 1) {
            conY = conY - 1
            conM = "12"
        } else {
            conM = conM - 1
            if (conM < 10) {
                conM = "0" + conM
            }
        }
        selectdate = conY + "-" + conM + "-" + day;
    } else if (obj.getAttribute('class').indexOf("nexM") > -1) {//下一月数据

        if (conM == 12) {
            conY = conY + 1
            conM = "01"
        } else {
            conM = conM + 1
            if (conM < 10) {
                conM = "0" + conM
            }
        }
        selectdate = conY + "-" + conM + "-" + day;
    } else {//当月数据
        selectdate = dayri + "-" + day;
    }
    console.log("日期", selectdate)

    //点击切换当前央视
    var li = obj.getAttribute("class").split(" ")[1]
    $("." + li).css({ "background": "#fff", "color": "#000" })
    $(".nonnow").css({ "background": "#fff", "color": "#ccc" })
    obj.setAttribute("style", "background:#4ba9e9");

    //显示列表数据
    laowu_confirm.clickCalendar(selectdate)

}







