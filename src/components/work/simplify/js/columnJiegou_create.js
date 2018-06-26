/**
 * Created by Administrator on 2017-12-18.
 *  版本号 ：v3
 *  说明： jquery 动态生成页面的功能内容
 *         较v1版本；将筛选页面与筛选列表页面，全部都自动生成，不在页面中手动生产了。
 */
import {getParam,cmApi} from '../../../../playform/common'
import { $label,$search_list,$search,$date,$param,$data,$group,$onclick,sel_date} from './columnTools'
import { $show_status,$date_show,$zhankaiShouqi} from './columnJiegou_show'


var $id = {
    //顶部的按钮
    btn_search:"btn_search_open", //查询按钮
    btn_inputUrl_show:"inputUrl_show" ,// 新建按钮
    //功能
    gongneng_saixuan:"div_saixuan",
    gongneng_orderby:"div_orderby",
    gongneng_fenzu:"div_fenzu",
    // 信息框整体
    information:"div_information_data",
    no_data:"div_information_noData",
    //信息的顶部汇总数据框
    top:"id_Top",
    tiaojian:"id_tiaojian",
    mini_top:"id_mini_top",
    group_top:"group_top",
    zhankaishouqi:"id_zhankaishouqi",
    btn_zhankaisouqi:"btn_zhankaisouqi",
    //信息的列表数据框
    list:"id_list",
    recorder_list:"recorder_list",
    group_list:"group_list",
    //查询筛选页面
    date:"id_date",
    search_combox:"id_search_combox",
    ul_FuzzyQuery:"ul_FuzzyQuery",
    ul_qujian_number:"ul_qujian_number",
};
// 创建
var $create = { 
    all:function () {
        // 设置标题，固定写法
        $label.set.title();

        $create.page_all();

        $create.fisrt_into()
    },
    fisrt_into:function () {
        setTimeout(function() {
//		appApi.showBack();
            appApi.hideBack();
        }, 100)

        // 筛选条件的其他非字段的条件，如预警条件，合并
        if($label.sel_other!=undefined)
            $label.sel_all=$label.sel.concat($label.sel_other);
        else
            $label.sel_all=$label.sel;
        if($search_list.used_other!=undefined)
            $search_list.used=$search_list.used.concat($search_list.used_other);
        if($search_list.name_other!=undefined)
            $search_list.name=$search_list.name.concat($search_list.name_other);
        // console.info($label.sel_all)
        // console.info($search_list.used)
        // console.info($search_list.name)
        // 初始化 筛选页面的条件选项的值
        for (var i=0;i<$label.sel_all.length;i++){
            $search.selected_Name[i]="请选择"
        }
        $date.get_now();
    },

    //----------------------------------------主页面的功能--------------------------------------------------------------
    page_all:function () {
        $(document).ready(function () {
            // 创建页面=================================================================================================
            // main_page
            $("#id_hearder").append($create.main_page.top_btn());
            $("#gongneng").append($create.main_page.gongnenglan());
            $("#saixuan_li").append($create.main_page.date_saixuan());
            $("#order_li").append($create.main_page.orderby_li());
            $("#fenzu_li").append($create.main_page.groupby_li());
            $("#id_tiaojian").append($create.main_page.tiaojian());
            //search_page
            $("#offCanvasSide").append($create.search_page.kuangjia())
            $("#id_date").append($create.search_page.select_date());
            $("#id_search_combox").append($create.search_page.search_combox());
            $("#ul_FuzzyQuery").append($create.search_page.fuzzy_query());
            $("#ul_qujian_number").append($create.search_page.select_qunjian_number());
            $("#select_ok_or_reset").append($create.search_page.btn_reset_and_ok());

            // search_list_page
            $("#search_list_main").append($create.search_list_page.section());// 选择项列表
            $("#search_list_main").append($create.search_list_page.header());// 头部标题与返回按钮
            $("#select_list_fuzzy").append($create.search_list_page.fuzzy());//模糊查询
            // 创建页面=================================================================================================
            //显示及赋值
            $create.main_page.show();
            $create.search_page.show();

            //时间
            $create.main_page.methods();
            $create.search_page.methods();
            $create.search_list_page.methods();
            // 滑动
            $('#offCanvasSideScroll').scroll();
            $('#id_list').scroll();
            $('#select_list').scroll(
                {
                    indicators: true, //是否显示滚动条
                    deceleration:0.0006,
                } //阻尼系数,系数越小滑动越灵敏
            );

            // 获取信息数据
            $data.get_all_data("create");
            if($param.groupby!=""||$param.groupby!=undefined){
                for(var i=0;i<$group.by.length;i++){
                    if($param.groupby==$group.by[i]){
                        $onclick.group(i,'li_group'+(i),'fenzu_li',' active');
                        $zhankaiShouqi.shouqi("fenzu_li");
                        // $data.get_all_data("group");
                    }
                }
            }
        })
    },
    main_page:{
        // all:function () {
        //     $create.main_page.top_btn();
        //     $create.main_page.gongnenglan();
        //     $create.main_page.date_saixuan();
        //     $create.main_page.orderby_li();
        //     $create.main_page.groupby_li();
        //     $create.main_page.tiaojian();
        // },
        methods:function(){
            // top_btn 事件
            // 返回按钮
            $("#btn_referrer").click(function () {
                appApi.closeNewWindow();
            });
            //查询按钮
            $("#btn_search_open").click(function () {
                $onclick.btn_search();
            });
            //新建按钮
            $("#inputUrl_show").click(function () {
                $onclick.inputNew()
            });
            //刷新按钮
            $("#shuaxing").click(function () {
                history.go(0)
            });
            //gongnenglan事件
            $("#div_saixuan").click(function () {
                $onclick.fenzhu_zhankai('saixuan_li')
            });
            $("#div_orderby").click(function () {
                $onclick.fenzhu_zhankai('order_li')
            });
            $("#div_fenzu").click(function () {
                $onclick.fenzhu_zhankai('fenzu_li')
            });

            //date_saixuan 事件
            $("#saixuan_li li").click(function () {
                var index=$(this).index();
                $onclick._date_saixuan($label.date_fanwei[index-1],'li_'+ $label.date_fanwei[index-1],'saixuan_li',' active')
            });
            // orderby 事件
            $("#order_li li").click(function () {
                var index=$(this).index();
                $onclick.orderby(index,"li_order"+index,'order_li');
            })
            //groupby_li 事件
            $("#fenzu_li li").click(function () {
                var index=$(this).index();
                if(index==0)
                    $onclick.group('无分组','li_group','fenzu_li',' active')
                else
                    $onclick.group(index-1,'li_group'+(index-1),'fenzu_li',' active')
            })
            // tiaojian 事件
            $("#id_tiaojian li").click(function () {
                var index=$(this).index();
                $onclick.del_tiaojian(index)
            });
            // 展开收起 事件
            $("#id_zhankaishouqi").click(function () {
                $onclick.zhankaiShouqi('group_top')
            })
        },
        show:function () {
            //新建按钮的显示
            if(document.getElementById("inputUrl_show"))
                document.getElementById("inputUrl_show").style.display=$param.inputUrl==""||$param.inputUrl==undefined ?"none":"";
            if(document.getElementById("btn_search_open"))
                document.getElementById("btn_search_open").style.display=$show_status.search_show($show_status.gongneng.search_always)==false ?"none":"";

            //gongnenglan 显示
            if(($param.inProject==1 && $label.group.length==1 && $label.group[0]=="项目分组" )|| $label.group.length==0){
                document.getElementById("div_fenzu").style.display ="none";
            }

            //時間範圍
            if($label.date_fanwei==undefined || $label.date_fanwei.length==0){
                document.getElementById("div_saixuan").style.display="none"
            }else{
                document.getElementById("div_saixuan").style.display=""
            }
            // //排序
            if($label.order==undefined || $label.order.length==0){
                document.getElementById("div_orderby").style.display="none"
            }else{
                document.getElementById("div_orderby").style.display=""
            }
            //分組
            if($label.group_danwei==undefined || $label.group_danwei.length==0){
                document.getElementById("div_fenzu").style.display="none"
            }else{
                document.getElementById("div_fenzu").style.display=""
            }
        },
        top_btn:function () {
            var a = "<h1 class='mui-title' id='title'>"+ $param.windowTitle+"</h1>"
                +"<!--返回-->"
                +"<button id='btn_referrer' class='mui-btn mui-btn-link mui-pull-left'><span class='mui-icon iconfont icon-back '></span>返回</button>"
                +"<!--查询-->"
                +"<a  id='btn_search_open' class='mui-icon mui-icon-search  mui-pull-right' href='javascript:void(0)' v-show='$show_status.gongneng.search_btn' ></a>"
                +"<!--新建-->"
                +"<a id='inputUrl_show' class='mui-icon iconfont icon-add02  mui-pull-right' href='javascript:void(0)' ></a>"
                +"<!--刷新-->"
                +"<a id='shuaxing' href='javascript:void(0)' class='mui-icon mui-icon-loop mui-pull-right' ></a>";
            return a;

        },
        gongnenglan:function () {
            var a="<div id='id_gongneng' class='sift-tab search-sort'>"
                //日期范围
                +"<div id='div_saixuan' class='tab-item ' >"
                +"<span id='id_saixuan' class='item'>筛选</span><span id='id_saixuan_icon' class='mui-icon mui-icon-arrowdown' ></span>"
                +"</div>"
                //排序
                +"<div id='div_orderby' class='tab-item  disabled' >"
                +"<span id='id_orderby' class='item'>"+$label.order_default+"</span>";
            if($param.orderbyType=="DESC"||$param.orderbyType=="desc"){
                a=a+"<span id='id_order_icon' class='mui-icon mui-icon-arrowthindown' ></span>"
            }else if($param.orderbyType=="ASC"||$param.orderbyType=="asc"){
                a=a+"<span id='id_order_icon' class='mui-icon mui-icon-arrowthinup' ></span>"
            }
            a=a+"</div>"
                // 分组
                +"<div id='div_fenzu' class='tab-item disabled' >"
                +"<span id='id_fenzu' class='item'>"+$label.group_titel+"</span><span id='id_fenzu_icon' class='mui-icon mui-icon-arrowdown' ></span>"
                +"</div>"
                +"</div>"
            a=a+"<ul class='mui-table-view sub-sort' style='display:none;' id ='fenzu_li'></ul>"//日期范围
            a=a+"<ul class='mui-table-view sub-sort' style='display:none;' id='order_li'></ul>"//排序
            a=a+"<ul class='mui-table-view sub-sort' style='display:none;' id='saixuan_li'></ul>"// 分组
            // console.info(a)
            return a;
        },
        //时间范围筛选
        date_saixuan:function () {
            // 时间筛选的显示
            var had_date;
            if($date.url_had_date==true){
                $date.sel_dateStart = $param.whereDateStart;
                $date.sel_dateEnd = $param.whereDateEnd;
                if(document.getElementById("id_saixuan"))
                    document.getElementById("id_saixuan").innerHTML="自定义";
            } else{
                if(document.getElementById("id_saixuan"))
                    document.getElementById("id_saixuan").innerHTML=$date.fanwei($param.whereDate);
                $date.get_date_fanwei($param.whereDate,"date_saixuan");
            }


            $date.sel_dateStart_last= $date.sel_dateStart
            $date.sel_dateEnd_last=$date.sel_dateEnd;

            $date.fanwei_show =$label.sel_date+" ："+  $date.group_top($date.sel_dateStart,$date.sel_dateEnd);

            var a = "<p class='mui-table-view-cell show-time' id='li_date_fanwei' >"+$date.fanwei_show+"</p>"
            var j = $label.date_fanwei.length;
            if(had_date==true){
                for (var i = 0; i < j; i++){
                    a=a+ "<li class='mui-table-view-cell item ' id='li_"+ $label.date_fanwei[i]+"'> "+$date.fanwei( $label.date_fanwei[i])+"</li>"
                }
            }else{
                for (var i = 0; i < j; i++){
                    if($date.fanwei($label.date_fanwei[i])==$date.fanwei($param.whereDate))
                        a=a+ "<li class='mui-table-view-cell item active' id='li_"+ $label.date_fanwei[i]+"'> "+$date.fanwei( $label.date_fanwei[i])+"</li>"
                    else
                        a=a+ "<li class='mui-table-view-cell item ' id='li_"+ $label.date_fanwei[i]+"'> "+$date.fanwei( $label.date_fanwei[i])+"</li>"
                }
            }
            return a;
        },
        // 创建排序
        orderby_li:function () {
            //初始化
            var a = "";
            var b = "";
            var j = $label.order.length;
            for (var i = 0; i < j; i++) {
                a = "<li id='li_order" + i + "' class='mui-table-view-cell item ";
                if ($label.order[i]  == $label.order_default)
                    if($param.orderbyType=="DESC" || $param.orderbyType=="desc")
                        a = a + " jiangxu";
                    else if($param.orderbyType=="ASC" || $param.orderbyType=="asc")
                        a = a + " shengxu";
                a = a + "'>" + $label.order[i] + "</li>" + "\n";
                b = b + a;
            }
            return b
        },
        // 创建分组
        groupby_li:function () {
            var a = "<li id='li_group' class='mui-table-view-cell item active'>"
                +"<span id='lab_fenzuxiang'>无分组</span>"
                +"</li>";
            var b = a;
            var j = $label.group.length;
            for (var i = 0; i < j; i++) {
                if($param.inProject==1){
                    if( $label.group[i].indexOf("项目")==-1) {
                        a="<li id='li_group"+i+"' class='mui-table-view-cell item '>"
                    }else {
                        a = "<li id='li_group"+i+"' class='mui-table-view-cell item '  style='display: none'>"
                    }
                }else{
                    a="<li id='li_group"+i+"' class='mui-table-view-cell item '>"
                }
                a = a +"<span id='lab_fenzuxiang"+i+"'>"+$label.group[i]+"</span>"
                    +"</li>";
                b = b + a;
            }
            return b
        },
        //条件栏
        tiaojian:function () {
            //初始化
            var a = "";
            var b = a;
            var j = $label.tiaojian.length;
            for (var i = 0; i < j; i++) {
                a = "<li class='tab-item' id='t"+i+"' style='display: none;'>"
                    +"<span class='sec_top' >"
                    +"<span class='mui-icon mui-icon-closeempty'></span>"
                    +"<span id='t_val"+i+"' class='heizi' ></span>"
                    + "</span>"
                    +"</li>"
                b = b + a;
            }
            return b;
        },
    },
    //--------------------------筛选查询页面----------------------------------------------------------------------------
    search_page:{
        all:function () {
            $create.search_page.chushihua()
        },
        chushihua:function () {
            $(document).ready(function () {
                // 创建Html文本
                $("#offCanvasSide").append($create.search_page.kuangjia())
                $("#id_date").append($create.search_page.select_date());
                $("#id_search_combox").append($create.search_page.search_combox());
                $("#ul_FuzzyQuery").append($create.search_page.fuzzy_query());
                $("#ul_qujian_number").append($create.search_page.select_qunjian_number());
                $("#select_ok_or_reset").append($create.search_page.btn_reset_and_ok());
                // 赋值及显示
                //判断初始化的时候是否全部
                if($date.url_had_date==false){
                    if($param.whereDate=="all" ||$param.whereDate=="全部" ){
                        $date_show.sel_date_main(false)
                    }else{
                        $date_show.sel_date_main(true)
                    }
                }
                //時間範圍
                if($label.date_fanwei==undefined || $label.date_fanwei.length==0){
                    document.getElementById("sel_date").style.display="none"
                    $show_status.gongneng.sel_date=false;
                }else{
                    document.getElementById("sel_date").style.display=""
                    $show_status.gongneng.sel_date=true;
                }
                $create.search_page.methods()
                $('#offCanvasSideScroll').scroll();
            })
        },
        show:function () {
            //判断初始化的时候是否全部
            if($date.url_had_date==false){
                if($param.whereDate=="all" ||$param.whereDate=="全部" ){
                    $date_show.sel_date_main(false)
                }else{
                    $date_show.sel_date_main(true)
                }
            }
            //時間範圍
            if($label.date_fanwei==undefined || $label.date_fanwei.length==0){
                document.getElementById("sel_date").style.display="none"
                $show_status.gongneng.sel_date=false;
            }else{
                document.getElementById("sel_date").style.display=""
                $show_status.gongneng.sel_date=true;
            }

        },
        methods:function(){
            //事件
            // 头部
            $("#btn_search_close").click(function () {
                // mui('#offCanvasWrapper').offCanvas('close');
                $sideslip.param.hetongmove = false;//打开筛选窗口
            });
            //时间筛选
            $("#dateStart").click(function () {
                sel_date.openDate('s');
            });
            $("#dateEnd").click(function () {
                sel_date.openDate('e');
            })
            //清除选择
            $("#btn_del_dateStart").click(function () {
                $onclick.del_date('start');
            });
            $("#btn_del_dateEnd").click(function () {
                $onclick.del_date("end");
            })
            //查询条件项
            $("#id_search_combox li" ).click(function () {
                var index=$(this).index();
                $onclick.search_list_open('search_list',index);
            });
            //创建模糊查询
            $("#ul_FuzzyQuery li").mouseenter(function () {
                var index=$(this).index();
                $("#clear_fuzzy_query"+index).click(function () {
                    $onclick.del_like(index)
                });
            });
            //创建数据区间查询
            $("#ul_qujian_number li").mouseenter(function () {
                var index=$(this).index();
                $("#qujian_min_clear"+index).click(function () {
                    $onclick.del_number_min(index)
                });
                $("#qujian_max_clear"+index).click(function () {
                    $onclick.del_number_max(index)
                });
            });
            // 重置 与 确定按钮
            $("#btn_reset").click(function () {
                $onclick.select_reset()
            });
            //确定按钮
            $("#btn_submmit").click(function () {
                $onclick.select_ok()
            })
        },
        /**
         * 筛选页面的框架
         * @returns {string}
         */
        kuangjia:function () {
            var a =
                "<div id='offCanvasSideScroll' class='mui-scroll-wrapper'>"
                +"<header id='search_title' class='filtrate-title'>"
                +"<button id='btn_search_close' class='mui-btn mui-btn-link mui-pull-left'><span class='mui-icon iconfont icon-back '></span>返回</button>"
                +"<h1 class='title'>筛选</h1>"
                +"</header>"
                +"<div id='search_full' class='mui-scroll'>"
                +"<div id='search_main' class='filtrate-content' >"
                +"<div id='sel_date' v-show='$show_status.gongneng.sel_date'>"
                +"<div class='filtrate-title-sub'><span class='title'>"+$label.sel_date[0]+"</span></div>"
                +"<div class='filtrate-body'>"
                +"<div class='time-frame' id='id_date'></div>"
                +"</div>"
                +"</div>"
                +"<ul id='ul_sel_date_other'></ul>" // 如果有其他日期范围，放在这个ul里
                +"<ul id='id_search_combox' class='mui-table-view eg-table-view search-condition text' ></ul>" //+"<!--条件查询-->"
                +"<ul id='ul_FuzzyQuery'></ul>" //+"<!--模糊查询-->"
                +"<ul id='ul_qujian_number'></ul>" //+"<!--数字区间查询-->"
                +"</div>"
                +"</div>"
                +"<!--查询选择项的list 列表-->"
                +"<div id='search_list_page' class='slide-block ng-scope ui_slide_out cus-whole-window' >"
                +"<div class='calendar-box demo-box'></div>"
                +"</div>"
                +"<div id='select_ok_or_reset' class='filtrate-footer'></div>" // 重置与确定
                +"<!--查询列表子窗体  start -->"
                +"<div class='slide-block ng-scope ui_slide_out cus-whole-window' id='search_list' >"
                +"<div class='mui-loading'>"
                +"<div class='mui-spinner'></div>"
                +"</div>"
                +"<div id='search_list_main' class='cus-window-content' style='display: none'>"
                +"<section id='section_sel_list' class='mui-content'></section>"
                +"</div>"
                +"</div>"
                +"</div>";
            return a;
        },
        //标题头部
        header:function () {
            var a="<header id='search_title' class='filtrate-title'>"
                +"<button id='btn_search_close' class='mui-btn mui-btn-link mui-pull-left'><span class='mui-icon iconfont icon-back '></span>返回</button>"
                +"<h1 class='title'>筛选</h1>"
                +"</header>"
            $(document).ready(function () {
                $("#offCanvasSideScroll").append(a);
                $("#btn_search_close").click(function () {
                    // mui('#offCanvasWrapper').offCanvas('close');
                    $sideslip.param.hetongmove = false;//打开筛选窗口
                })
            })
            return a
        },
        // 创建时间区间
        select_date:function () {
            //创建日期选择器
            if($date.url_had_date==true){
                $date.sel_dateStart = $param.whereDateStart;
                $date.sel_dateEnd = $param.whereDateEnd;
            }else {
                $date.get_date_fanwei($param.whereDate,"select_date");
            }
            var a=
                "<div class='f-date'>"
                +"<span id='dateStart' class='date-time start' >"
                // +"<span id='sel_dateStart' v-text='sel_dateStart'></span>"
                +"<span id='sel_dateStart'>"+$date.sel_dateStart+"</span>"
                +"<span id='val_del_dateStart' class='txt' style='display: none'>开始日期</span>"
                +"</span>"
                +"<span id='btn_del_dateStart' class='mui-icon mui-icon-clear'> </span>"
                +"</div>"
                +"<div class='data-w'>-</div>"
                +"<div class='r-date'>"
                +"<span id='dateEnd' class='date-time end' >"
                // +"<span id='sel_dateEnd' v-text='sel_dateEnd'></span>"
                +"<span id='sel_dateEnd'>"+ $date.sel_dateEnd+"</span>"
                +"<span id='val_del_dateEnd' class='txt' style='display: none'>截止日期</span>"
                +"</span>"
                +"<span id='btn_del_dateEnd' class='mui-icon mui-icon-clear' ></span>"
                +"</div>";

            return a;
        },
        //创建查询条件项
        search_combox:function () {
            var a="";
            for (var i=0;i<$label.sel_all.length;i++){
                if($param.inProject==1 ){
                    if($label.sel_all[i].indexOf("项目")==-1){
                        a=a+"<li id='select_"+i+"' class='mui-table-view-cell'  >"
                            +"<a class='mui-navigate-right'>"
                            +"<span id='sel_label"+i+"'>"+$label.sel_all[i]+"</span>"
                            +"<span id='sel_"+i+"' class='mui-badge mui-badge-inverted'>请选择</span>"
                            +"</a>"
                            +"</li>"
                    }else{
                        a=a+"<li id='select_"+i+"' class='mui-table-view-cell' style='display: none' >"
                            +"<a class='mui-navigate-right'>"
                            +"<span id='sel_label"+i+"'>"+$label.sel_all[i]+"</span>"
                            +"<span id='sel_"+i+"' class='mui-badge mui-badge-inverted'>请选择</span>"
                            +"</a>"
                            +"</li>"
                    }
                }else{
                    a=a+"<li id='select_"+i+"' class='mui-table-view-cell'  >"
                        +"<a class='mui-navigate-right'>"
                        +"<span id='sel_label"+i+"'>"+$label.sel_all[i]+"</span>"
                        +"<span id='sel_"+i+"' class='mui-badge mui-badge-inverted'>请选择</span>"
                        +"</a>"
                        +"</li>"
                }

            }
            return a
        },
        //创建模糊查询
        fuzzy_query:function () {
            //初始化
            var a = "";
            var b = "";
            var j = $label.sel_like.length;
            for (var i = 0; i < j; i++) {
                a = "<li>"
                    +"<div class='filtrate-title-sub'><span class='title' >"+$label.sel_like[i]+"</span></div>"
                    +"<div class='filtrate-body'>"
                    +"<div class='price-section'>"
                    +"<input id='sel_like_input"+i+"'class='item-input' type='text' value='' placeholder='请输入' >"
                    +"<span id='clear_fuzzy_query"+i+"' class='mui-icon mui-icon-clear' style='display: none'></span>"
                    +"</div>"
                    +"</div>"
                    +"</li>"
                b = b + a;
                $search.last.like[i]="";
                setTimeout(() => {
                    $("#sel_like_input"+i).keyup(function(){
                        $search.fuzzy_query_changed(i);
                    })
                }, 500);
            }
            
            return b;
        },
        //创建数据区间查询
        select_qunjian_number:function () {
            //初始化
            var a = "";
            var b = "";
            var j = $label.sel_qujian_number.length;
            for (var i = 0; i < j; i++) {
                a =
                    "<li id='li_qujian_number"+i+"'>"
                    +"<div class='filtrate-title-sub'>"
                    +"<span class='title'>"+$label.sel_qujian_number[i]+"</span>"
                    +"</div>"
                    +"<div class='filtrate-body'>"
                    +"<div class='price-section' id='sel_qujian_number"+i+"'>"
                    +"<div class='price-item'>"
                    +"<input id='qujian_min"+i+"' class='item-input' type='number' value='' pattern='[0-9]*' placeholder='最低价'>"
                    +"<span id='qujian_min_clear"+i+"' class='mui-icon mui-icon-clear' style='display: none'></span>"
                    +"</div>"
                    +"<span class='line'>-</span>"
                    +"<div class='price-item'>"
                    +"<input id='qujian_max"+i+"' class='item-input' type='number' value='' pattern='[0-9]*' placeholder='最高价'>"
                    +"<span id='qujian_max_clear"+i+"' class='mui-icon mui-icon-clear' style='display: none'></span>"
                    +"</div>"
                    +"</div>"
                    +"</div>"
                    +"</li>"
                b = b + a;
                $search.last.qujian_number_max[i]="";
                $search.last.qujian_number_min[i]="";
                setTimeout(() => {
                    $("#qujian_min"+i).keyup(function(){
                        $search.qujian_min_changed(i);
                    })
                }, 500);
                setTimeout(() => {
                    $("#qujian_max"+i).keyup(function(){
                        $search.qujian_max_changed(i);
                    })
                }, 500);
            }
            return b;
        },
        // 重置 与 确定按钮
        btn_reset_and_ok:function () {
            var a =
                "<div class='mui-table mui-text-center'>"
                +"<div id='reset' class='mui-table-cell'>"
                +"<button id='btn_reset' type='button' class='mui-btn'  >重置</button>"
                +"</div>"
                +"<div id='submit' class='mui-table-cell'>"
                +"<button id='btn_submmit' type='button' class='mui-btn mui-btn-primary ' >确定</button>"
                +"</div>"
                +"</div>";
            return a;
        }
    },
    //-------------------------查询条件项 list 子页面-------------------------------------------------------------------
    search_list_page:{
        // all:function () {
        //     $(document).ready(function () {
        //
        //
        //
        //
        //     })
        // },
        methods:function(){
            // 事件==========
            //返回按钮
            $("#btn_sel_list_close").click(function () {
                // closeWindow('search_list')
                document.getElementById("ul_search_list").innerHTML=""
                cmApi.newWindow.hide('search_list')
            })
            //模糊查询事件
            $("#search_list_input_clear").click(function () {
                $search_list.input_changed(2)
            });
            // 选择后，清除选择的事件
            $("#sel_list_clear").click(function () {
                $onclick.selected_list('','');
            })
        },
        // 头部标题与返回按钮
        header:function () {
            var a ="<header id='h_sel_list' class='mui-bar mui-bar-nav'>"
                +"<button id='btn_sel_list_close' class='mui-btn mui-btn-link mui-pull-left'><span class='mui-icon iconfont icon-back '></span>返回</button>"
                +"<h1 id='search_list_title' class='mui-title'></h1>"
                +"</header>"
            return a;
        },
        fuzzy:function () {
            // 模糊查询输入框
            var b =""
            b="	<div class='cloud-search search-input-box' >"
                +"<div class='search-inner'>"
                +"<span class='mui-icon mui-icon-search'></span>"
                +"<input id='search_list_input' type='search' class='search-input' placeholder='搜索'>"
                +"<span id='search_list_input_clear' class='mui-icon mui-icon-clear' style='display: none'></span>"
                +"</div>"
                +"</div>";
                setTimeout(() => {
                    $("#search_list_input").keyup(function(){
                        $search_list.input_changed(1)
                    })
                }, 500);
            return b
        },
        section:function () {
            var a="<div id='select_list_fuzzy'></div>"
                +"<div id='select_list' class='mui-scroll-wrapper' >"
                +"<div id='div_search_list' class='mui-table-view eg-table-view search-list text' v-show='is_show_search_list'>"


                +"<div id='sel_list_clear' class='mui-table-view-cell' style='display: none' >"
                +"<span class='mui-icon iconfont icon-item'></span>清除选择"
                +"</div>"
                +"<ul id='ul_search_list'><li></li></ul>"

                +"</div>"
                +"</div>"
                +"<div id='search_list_noNumber' class='no-group' v-show='!is_show_search_list'>"
                +"<div class='no-record-img no-record-txt'></div>"
                +"<p>无数据显示</p>"
                +"</div>";
            // $(document).ready(function () {
            //     $("#section_sel_list").append(a);
            //     $("#sel_list_clear").click(function () {
            //         $onclick.selected_list('','');
            //     })
            // })
            return a;
        },
        /**
         *
         * @param array
         * @param No 为$search.list_No ，是哪个选择项打开
         */
        list:function (array,No) {
            document.getElementById("ul_search_list").innerHTML="";
            // 条件列表
            $(document).ready(function () {
                var a= "";
                for(var i=0;i<array.length;i++){
                    // console.info("$search.selected_ID["+i+"]="+$search.selected_ID[No]+"    Name="+array[i].Name + "   ID="+ array[i].ID + "   long="+array[i].ID.length )

                    a=a+"<li class='mui-table-view-cell'>";
                    if($search.selected_ID[No]!=undefined && array[i].ID!='null'  && $search.selected_ID[No]==array[i].ID)
                        a=a+"<span class='mui-icon iconfont icon-item  active' ></span>"
                    else
                        a=a+"<span class='mui-icon iconfont icon-item' ></span>"
                    a=a+"<span id='list_val'"+i+">"+array[i].Name+"</span>"
                        +"</li>"
                    // console.info(array.name[i]+"\n")
                }
                $("#ul_search_list").append(a)
                // array.name.splice(0,array.name.length)
            });
            /**
             * 必须加setTimeout
             * 不然事件绑定不了
             */
            setTimeout(function(){
                $("#ul_search_list li").click(function () {
                    var index=$(this).index();
                    $onclick.selected_list(array[index].Name,array[index].ID)
                });
            },500)
           

            var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
            var nScrollTop = 0;   //滚动到的当前位置
            var nDivHight = $("#select_list").height();
            $("#div_search_list").scroll(function(){
                nScrollHight = $(this)[0].scrollHeight;
                nScrollTop = $(this)[0].scrollTop;
                console.info("nScrollTop="+nScrollTop+"    nScrollHight="+nScrollHight+"     nDivHight="+nDivHight)
                // if(nScrollTop + nDivHight >= nScrollHight)
                // console.info("nScrollTop="+nScrollTop+"    nScrollHight="+nScrollHight+"     nDivHight="+nDivHight)
            });
        },

    },

    mui:{
        all:function () {
            $create.mui.scorll();
        },
        scorll:function () {
            //侧滑容器父节点
            var offCanvasWrapper = mui('#offCanvasWrapper');
            //主界面容器
            var offCanvasInner = offCanvasWrapper[0].querySelector('.mui-inner-wrap');
            //菜单容器
            var offCanvasSide = document.getElementById("offCanvasSide");
            document.getElementById('btn_search_open').addEventListener('tap', function() {
                offCanvasWrapper.offCanvas('show');
                // 打开筛选页面的事件
                $onclick.btn_search();
            });
            //主界面和侧滑菜单界面均支持区域滚动；
            $('#offCanvasSideScroll').scroll();
            $('#id_list').scroll();
            $('#select_list').scroll();

            //实现ios平台的侧滑关闭页面；
            if (mui.os.plus && mui.os.ios) {
                offCanvasWrapper[0].addEventListener('shown', function(e) { //菜单显示完成事件
                });
                offCanvasWrapper[0].addEventListener('hidden', function(e) { //菜单关闭完成事件
                });
            }
            $("#app").on('tap','.cusclick',function(){
                var o = this.getAttribute("click");
                eval(o);
            });
        }
    }
}
var $sideslip = {
    param:{
        hetongmove:false
    },
    mask:function(){
        $sideslip.param.hetongmove = false;
    }
}
export {$id, $create,$sideslip}

