/**
 * Created by Administrator on 2017-10-24.
 *  版本号 ：v1
 *  说明： jquery 动态生成页面的功能内容
 *
 *  2017-11-29
 *          增加功能栏的显示值超长会自动产生省略号
 *  2017-12-2
 *          筛选页面的条件选项的条件列表，升级为自动生成
 * 2017-12-5
 *          筛选页面的条件选项的条件列表，增加了模糊搜索
 *          標題與功能圖標按鈕 自動生成，
 *          增加了刷新按鈕及功能實現
 *          修改筛选页面，与筛选页面的返回
 *          功能栏可以根据配置动态显示与隐藏，不再需要设置变量
 * 2017-12-6
 *          增加查询主页，筛选页面，筛选列表页面的头部
 *          统一返回按钮的样式
 *          筛选页面的重置与确定
 */
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
    fisrt_into:function () {
        setTimeout(function() {
//		appApi.showBack();
            appApi.hideBack();
        }, 100)

        for (var i=0;i<$label.sel.length;i++){
            $search.selected_Name[i]="请选择"
        }
    },
    all:function () {
        // 设置标题，固定写法

        $label.set.title();
        $create.main_page.all()
        $create.search_page.all();
        $create.search_list_page.all();

        $create.fisrt_into()
    },
    //----------------------------------------主页面的功能--------------------------------------------------------------
    main_page:{
        all:function () {
            $create.main_page.top_btn();
            $create.main_page.gongnenglan();
            $create.main_page.date_saixuan();
            $create.main_page.orderby_li();
            $create.main_page.groupby_li();
            $create.main_page.tiaojian();
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
                    +"<a id='shuaxing' href='javascript:void(0)' class='mui-icon mui-icon-loop mui-pull-right' ></a>"
            $(document).ready(function(){
                $("#id_hearder").append(a);
                //新建按钮的显示
                document.getElementById("inputUrl_show").style.display=$param.inputUrl==""||$param.inputUrl==undefined ?"none":"";
                document.getElementById("btn_search_open").style.display=$show_status.search_show($show_status.gongneng.search_always)==false ?"none":"";
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
            })
        },
        gongnenglan:function () {
            $(document).ready(function () {
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
                $("#gongneng").prepend(a)
                $("#gongneng").append("<ul class='mui-table-view sub-sort' style='display:none;' id ='fenzu_li'></ul>") //日期范围
                $("#gongneng").append("<ul class='mui-table-view sub-sort' style='display:none;' id='order_li'></ul>")//排序
                $("#gongneng").append("<ul class='mui-table-view sub-sort' style='display:none;' id='saixuan_li'></ul>")// 分组

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
            });
            //事件
            $(document).ready(function(){
                $("#div_saixuan").click(function () {
                    $onclick.fenzhu_zhankai('saixuan_li')
                });
                $("#div_orderby").click(function () {
                    $onclick.fenzhu_zhankai('order_li')
                });
                $("#div_fenzu").click(function () {
                    $onclick.fenzhu_zhankai('fenzu_li')
                });
            });
        },
        //时间范围筛选
        date_saixuan:function () {
            $(document).ready(function(){
                // 时间筛选的显示
                console.info("date_saixuan")
                var had_date;
                if($date.url_had_date==true){
                    $date.sel_dateStart = $param.whereDateStart;
                    $date.sel_dateEnd = $param.whereDateEnd;
                    document.getElementById("id_saixuan").innerHTML="自定义";
                } else{
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
                // console.info(a)
                $("#saixuan_li").append(a);
            });
            //事件
            $(document).ready(function(){
                $("#saixuan_li li").click(function () {
                    var index=$(this).index();
                    $onclick._date_saixuan($label.date_fanwei[index-1],'li_'+ $label.date_fanwei[index-1],'saixuan_li',' active')
                });
            });
        },
        // 创建排序
        orderby_li:function () {
            //初始化
            $(document).ready(function() {
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
                $("#order_li").prepend(b);
            });
            // 事件
            $(document).ready(function(){
                $("#order_li li").click(function () {
                    var index=$(this).index();
                    $onclick.orderby(index,"li_order"+index,'order_li');
                })
            });
        },
        // 创建分组
        groupby_li:function () {
            //初始化
            $(document).ready(function() {
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
                $("#fenzu_li").prepend(b);
            });
            // 事件
            $(document).ready(function(){
                $("#fenzu_li li").click(function () {
                    var index=$(this).index();
                    if(index==0)
                        $onclick.group('无分组','li_group','fenzu_li',' active')
                    else
                        $onclick.group(index-1,'li_group'+(index-1),'fenzu_li',' active')
                })
            });
        },
        //条件栏
        tiaojian:function () {
            //初始化
            $(document).ready(function() {
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
                $("#id_tiaojian").prepend(b);
            });
            // 事件
            $(document).ready(function(){
                $("#id_tiaojian li").click(function () {
                    var index=$(this).index();
                    $onclick.del_tiaojian(index)
                })
            });
        },
    },
    //--------------------------筛选查询页面----------------------------------------------------------------------------
    search_page:{
        all:function () {
            $create.search_page.header();
            // $create.search_page.kuangjia();
            $create.search_page.select_date();
            $create.search_page.search_combox();
            $create.search_page.fuzzy_query();
            $create.search_page.select_qunjian_number();
            $create.search_page.btn_reset_and_ok();
        },
        kuangjia:function () {
            var a = "<div id='sel_date' v-show='$show_status.gongneng.sel_date'>"
                        +"<div class='filtrate-title-sub'><span class='title'"+$label.sel_date[0]+"日期</span></div>"
                        +"<div class='filtrate-body'>"
                            +"<div class='time-frame' id='id_date'></div>"
                        +"</div>"
                    +"</div>"
                    +"<ul id='ul_sel_date_other'></ul>"
                    +"<ul id='id_search_combox' class='mui-table-view eg-table-view search-condition' ></ul>" //+"<!--条件查询-->"
                    +"<ul id='ul_FuzzyQuery'></ul>" //+"<!--模糊查询-->"
                    +"<ul id='ul_qujian_number'></ul>" //+"<!--数字区间查询-->"
            $(document).ready(function () {
                $("#search_main").append(a)
            })
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
                    mui('#offCanvasWrapper').offCanvas('close');
                })
            })
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
                +"</div>"

                $("#id_date").append(a)


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
            //创建点击事件
            $(document).ready(function() {
                $("#dateStart").click(function () {
                    sel_date('s');
                });
                $("#dateEnd").click(function () {
                    sel_date('e');
                })
                //清除选择
                $("#btn_del_dateStart").click(function () {
                    $onclick.del_date('start');
                });
                $("#btn_del_dateEnd").click(function () {
                    $onclick.del_date("end");
                })
            })
        },
        //创建查询条件项
        search_combox:function () {
            var a="";
            for (var i=0;i<$label.sel.length;i++){
                if($param.inProject==1 ){
                    if($label.sel[i].indexOf("项目")==-1){
                        a=a+"<li id='select_"+i+"' class='mui-table-view-cell'  >"
                            +"<a class='mui-navigate-right'>"
                            +"<span id='sel_label"+i+"'>"+$label.sel[i]+"</span>"
                            +"<span id='sel_"+i+"' class='mui-badge mui-badge-inverted'>请选择</span>"
                            +"</a>"
                            +"</li>"
                    }else{
                        a=a+"<li id='select_"+i+"' class='mui-table-view-cell' style='display: none' >"
                            +"<a class='mui-navigate-right'>"
                            +"<span id='sel_label"+i+"'>"+$label.sel[i]+"</span>"
                            +"<span id='sel_"+i+"' class='mui-badge mui-badge-inverted'>请选择</span>"
                            +"</a>"
                            +"</li>"
                    }
                }else{
                    a=a+"<li id='select_"+i+"' class='mui-table-view-cell'  >"
                        +"<a class='mui-navigate-right'>"
                        +"<span id='sel_label"+i+"'>"+$label.sel[i]+"</span>"
                        +"<span id='sel_"+i+"' class='mui-badge mui-badge-inverted'>请选择</span>"
                        +"</a>"
                        +"</li>"
                }

            }
            // console.info(a)
            $("#id_search_combox").append(a)
            //创建点击事件
            $(document).ready(function() {
                $("#id_search_combox li" ).click(function () {
                    var index=$(this).index();
                    $onclick.search_list_open('search_list',index);
                });
            })
        },
        //创建模糊查询
        fuzzy_query:function () {
            //初始化
            $(document).ready(function() {
                var a = "";
                var b = "";
                var j = $label.sel_like.length;
                for (var i = 0; i < j; i++) {
                    a =
                        "<li>"
                        +"<div class='filtrate-title-sub'><span class='title' >"+$label.sel_like[i]+"</span></div>"
                        +"<div class='filtrate-body'>"
                        +"<div class='price-section'>"
                        +"<input id='sel_like_input"+i+"'class='item-input' type='text' value='' placeholder='请输入'  onkeyup='$search.fuzzy_query_changed("+i+")'>"
                        +"<span id='clear_fuzzy_query"+i+"' class='mui-icon mui-icon-clear' style='display: none'></span>"
                        +"</div>"
                        +"</div>"
                        +"</li>"
                    b = b + a;
                    $search.last.like[i]="";
                }
                $("#ul_FuzzyQuery").prepend(b);
            });
            // 事件
            $(document).ready(function(){
                $("#ul_FuzzyQuery li").mouseenter(function () {
                    var index=$(this).index();
                    $("#clear_fuzzy_query"+index).click(function () {
                        $onclick.del_like(index)
                    });
                });
            });
        },
        //创建数据区间查询
        select_qunjian_number:function () {
            //初始化
            $(document).ready(function() {
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
                                        +"<input id='qujian_min"+i+"' class='item-input' type='number' value='' pattern='[0-9]*' placeholder='最低价' onkeyup='$search.qujian_min_changed("+i+")'>"
                                        +"<span id='qujian_min_clear"+i+"' class='mui-icon mui-icon-clear' style='display: none'></span>"
                                    +"</div>"
                                    +"<span class='line'>-</span>"
                                    +"<div class='price-item'>"
                                        +"<input id='qujian_max"+i+"' class='item-input' type='number' value='' pattern='[0-9]*' placeholder='最高价' onkeyup='$search.qujian_max_changed("+i+")'>"
                                        +"<span id='qujian_max_clear"+i+"' class='mui-icon mui-icon-clear' style='display: none'></span>"
                                    +"</div>"
                                +"</div>"
                            +"</div>"
                        +"</li>"
                    b = b + a;
                    $search.last.qujian_number_max[i]="";
                    $search.last.qujian_number_min[i]="";
                }
                $("#ul_qujian_number").append(b);
            });
            // 事件
            $(document).ready(function(){
                $("#ul_qujian_number li").mouseenter(function () {
                    var index=$(this).index();
                    $("#qujian_min_clear"+index).click(function () {
                        $onclick.del_number_min(index)
                    });
                    $("#qujian_max_clear"+index).click(function () {
                        $onclick.del_number_max(index)
                    });
                });
            });
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
            $(document).ready(function () {
                $("#select_ok_or_reset").append(a) ;
                //重置按钮事件
                $("#btn_reset").click(function () {
                    $onclick.select_reset()
                });
                //确定按钮
                $("#btn_submmit").click(function () {
                    $onclick.select_ok()
                })
            })
        }
    },
    //-------------------------查询条件项 list 子页面-------------------------------------------------------------------
    search_list_page:{
        all:function () {
            $(document).ready(function () {
                // 创建
                $("#search_list_main").append($create.search_list_page.section());// 选择项列表
                $("#search_list_main").append($create.search_list_page.header());// 头部标题与返回按钮
                $("#select_list_fuzzy").append($create.search_list_page.fuzzy());//模糊查询
                // 事件==========
                //返回按钮
                $("#btn_sel_list_close").click(function () {
                    // closeWindow('search_list')
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
                mui('#select_list').scroll();
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
                +"<input id='search_list_input' type='search' class='search-input' placeholder='搜索' onkeyup='$search_list.input_changed(1)'>"
                +"<span id='search_list_input_clear' class='mui-icon mui-icon-clear' style='display: none'></span>"
                +"</div>"
                +"</div>";
            return b
        },
        section:function () {
            var a="<div id='select_list_fuzzy'></div>"
                +"<div id='select_list' class='mui-scroll-wrapper'>"
                    +"<div id='div_search_list' class='mui-table-view eg-table-view search-list ' v-show='is_show_search_list' >"
                        +"<div id='sel_list_clear' class='mui-table-view-cell' style='display: none' >"
                        +"<span class='mui-icon iconfont icon-item'></span>清除选择"
                        +"</div>"
                        +"<ul id='ul_search_list'></ul>"
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
            $("#ul_search_list li").click(function () {
                var index=$(this).index();
                $onclick.selected_list(array[index].Name,array[index].ID)
            })
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
            mui('#offCanvasSideScroll').scroll();
            mui('#id_list').scroll();
            mui('#select_list').scroll();

            //实现ios平台的侧滑关闭页面；
            if (mui.os.plus && mui.os.ios) {
                offCanvasWrapper[0].addEventListener('shown', function(e) { //菜单显示完成事件
                });
                offCanvasWrapper[0].addEventListener('hidden', function(e) { //菜单关闭完成事件
                });
            }
            mui("#app").on('tap','.cusclick',function(){
                var o = this.getAttribute("click");
                eval(o);
            });
        }
    }
}




