<template>
    <div id="app">
        <section id="" >
            <!---->
            <!--mui-draggable-->
            <!--侧滑菜单容器-->
            <div id="offCanvasWrapper" class="mui-off-canvas-wrap mui-slide-in">
                <div id='offCanvasSide' class='mui-right' :class= 'sideslip.param.hetongmove ? "move-left" : "move-right"'>
                </div>
                <div id='backdrop' class='mask' @click='sideslip.mask' :class='sideslip.param.hetongmove ? "move-leftmask" : "move-rightmask"'>

                </div>
                <!--信息主页面     start-->
                <div id="homepage" class="mui-inner-wrap">
                    <header id="id_hearder" class="mui-bar mui-bar-nav" style="position:fixed!important;top:0"></header>
                    <!--日期、排序、分组　功能栏-->
                    <div id="gongneng" class="tab-box" ></div>
                    <!--以下信息内容-->
                    <div id="div_information_data" >
                        <!--top 汇总信息-->
                        <div class="sift-content"   >
                            <div id="id_Top" class="gather-item fixed-top">
                                <!--筛选条件栏显示-->
                                <ul id="id_tiaojian" class="sift_topb" style="display: none"><!---筛选条件栏显示 动态生成--></ul>
                                <!--汇总信息-->
                                <!--小汇总-->
                                <div id="id_mini_top" class="gather-item-header tight" style="display: none;background: #eee;" >
                                    <div v-for="(item,index) in items_top" :key="index">
                                        <span class="mui-pull-right"> 工单明细条数:<strong v-text="comm.formatNumber(item.tiao,0)"></strong></span>
                                        <div id="mini_top_tiao" style="display: none">
                                            <span class="secondary"  v-if="group.No!='无分组'" v-text="data_number"></span>
                                            <span class="secondary" v-else >共<strong v-text="item.tiao"></strong> <span v-text="label.no_group_danwei "></span></span>
                                        </div>
                                    </div>
                                </div>
                                <!--大汇总-->
                                <div id="group_top_full" v-show="show_status.gongneng.need_top_show">
                                    <!--<div class="" id="group_top"  style="display: block" >								-->
                                    <div id="group_top"  class="gather-item-con">
                                        <div v-for="(item,index) in items_top" :key="index" style="display: block" >
                                            <p class="title">汇总信息</p>
                                            <div class="mui-table">
                                                <div class="mui-table-cell mui-text-center strong" >
                                                    <span class="num" v-text="comm.formatNumber(item.tiao,0)"></span>
                                                    <p class="sec-txt" >工单明细条数</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--</div>-->
                                    <!--展开收起按钮-->
                                    <div id="id_zhankaishouqi" click="divClick.zhankaiShouqi('group_top')" class="fold-btn cusclick" style="display:block">
                                        <div v-for="(item,index) in items_top" :key="index">
                                            <span id="top_tiao_have_group" class="secondary"  v-if="group.No!='无分组'" v-text="data_number"></span>
                                            <span id="top_tiao_no_group" class="secondary" v-else >共<strong v-text="item.tiao"></strong> <span v-text="label.no_group_danwei "></span></span>
                                            <span id="btn_zhankaisouqi" class="cus_toggle" >查看明细</span><span id="id_zhankaisouqi_icon" class="mui-icon mui-icon-arrowup cus_icon"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--汇总信息 end-->
                        <!--明细信息-->
                        <div id="id_list" class="mui-scroll-wrapper"  style="padding-top:0;display: none;position:initial;">
                            <div id="mui-scroll" class="mui-scroll" style="position:initial;">
                                <!--recorder list  要加懒加载-->
                                <div id="recorder_list" class="prolist-line project-list cus_data" style="display: none">
                                    <div v-for="(item,index) in items_recorder_list" :key="index" class="list-item" @click="divClick.onclick_recorder_list(item.id)">
                                        <a class="" href="javascript:void(0)">
                                            <div class="product-info-box text">
                                                <div class="labor-name">
                                                    <span class="list-num" >{{index+1}}.</span>
                                                    <span class="name mui-ellipsis" v-text="item.mingcheng"></span>
                                                </div>
                                                <p class="gray-pro-info sec-txt">计划量：<strong class="mui-pull-right"  v-text="item.shuliang"></strong></p>
                                                <p class="gray-pro-info sec-txt">已报量：<strong class="mui-pull-right"  v-text="item.withShuliang"></strong></p>
                                                <p class="gray-pro-info sec-txt">单位：<strong class="mui-pull-right"  v-text="item.danwei"></strong></p>
                                                <p class="gray-pro-info sec-txt">完成比例：<strong class="mui-pull-right"  v-text="item.proportion"></strong></p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <!--group list -->
                                <div id="group_list" class="prolist-line project-list cus_data" >
                                    <div v-for="(item,index) in litems_group_list" :key="index" class="list-item" @click="divClick.group_list([[item.companySaleRoomID,item.companySaleName],[item.companyBuyRoomID,item.companyBuyName]])">
                                        <div class="product-info-box">
                                            <div class="labor-name" ><span class="list-num" >{{index+1}}.</span>
                                                <span class="name mui-ellipsis "  v-if ="group.No==0" v-text="item.companySaleName" ></span>
											    <span class="name mui-ellipsis "  v-if ="group.No==1" v-text ="item.companyBuyName"></span>
                                                <span class="mui-pull-right" v-text="'共计'+item.tiao+label.no_group_danwei"></span>
                                            </div>
                                            <p class="gray-pro-info sec-txt">工单明细条数：<strong class="mui-pull-right" style="font-size: 17px;" v-text="comm.formatNumber(item.tiao,0)"></strong></p>
                                        </div>
                                    </div>
                                </div>
                                <!--group list -end- -->
                            </div>
                        </div>
                        <!--列表信息 -->
                    </div>
                    <!--无数据显示-->
                    <div id="div_information_noData" class="no-group" style="display: none">
                        <div class="no-record-img no-record-txt"></div>
                        <p>无数据显示</p>
                    </div>
                    <!-- off-canvas backdrop -->
                    <div class="mui-off-canvas-backdrop"></div>
                    <!-- 自定义遮罩 -->
                    <div id="cus-backdrop" class="cus-backdrop cusclick"></div>
                </div>
            </div>
            <!-- 选择日期 -->
            <mt-datetime-picker ref="picker" type="date" v-model="selDate.dateValue" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="selDate.handleChange"> </mt-datetime-picker>
        </section>
    </div>
</template>
<script>
    import setting from "../../../playform/config"
    /**
     * 同一文件下相对路径引入需要在前面加./
     */
    import {$id, $create,$sideslip} from "./js/columnJiegou_create";
    import {$top_changed,$list,$tiaojian_change,$information,$show_status,$zhankaiShouqi,$search_list_show,$id_show} from "./js/columnJiegou_show";
    import {$comm,format_number,$url,opt,sel_date,$date,$group,$order,$label,$tiaojian,$search,$search_list,$whereOther,$param,$data,$onclick} from "./js/columnTools";
    //***************************************************需要修改的部分*************************************************
    // 点击recorder list 跳转的链接用，链接业务表单
    // alert(setting.getCookie("userid"))
    $url.recorder_type="sunline";// haosi 或者 sunline
    $url.module_path=["/static/newwebstatic/gongdan/newInfo.html?id="];// 这个根据不同的业务模块需要更改；
    // js链接java的链接配置
    $url.java_path_group = "/chart/column/group_w_paigongdan_mingxi";
    $url.java_path_table = "/chart/column/table_w_paigongdan_mingxi";
    /**
     * 主页页面
     */
    // 时间范围筛选
    $label.date_fanwei=["all",30,180,365] //v4 值域 ： all 3 7 30 60 90 180 365 thisWeek thisMonth thisSeason thisYear
    $param.default.whereDateType="dateShenqing"// 默认时间范围的字段
    $param.default.whereDate="all"
    // 配置分组
    $group.by=["companySaleRoomID","companyBuyRoomID"];// 对应字段
    $label.group=["执行单位分组","派工单位分组"];// 配置分组标题
    $label.group_danwei=["执行单位","派工单位"]; // 分组后记录条数的单位
    $label.no_group_danwei="份"    //无汇总的情况下，记录条数的单位
    //配置排序
    $label.order=["派工日期","计划数量","已报数量","完成比例"]; //排序的标题
    $order.by=["dateShenqing","shuliang","withShuliang","(withShuliang*100/ shuliang)"]; //排序对应字段
    $label.order_default=$label.order[0]; //默认排序
    $param.default.orderby=$order.by[0];   // 默认排序的标题
    //条件显示框里的名称
    $label.tiaojian=["派工日期","工作项"];
    /**
     * 筛选页面
     */
    $label.sel_date=["派工日期"];
    //筛选页面的选项的名称
//    $label.sel=["工作项","派工单位"];
//    $search_list.used=["companySaleRoomID","companyBuyRoomID"];// 查询列表的名称，要和筛选页面的选项的名称对应
//    $search_list.name=["companySaleName","companyBuyName"]// 查询列表的name字段名，要$search_list.used[]对应
//    $label.title_search_list=["执行单位","派工单位"];//查询列表页面的标题
    $label.sel=["工作项"];
    $search_list.used=["mingcheng"];// 查询列表的名称，要和筛选页面的选项的名称对应
    $search_list.name=["mingcheng"]// 查询列表的name字段名，要$search_list.used[]对应
    $label.title_search_list=["工作项"];//查询列表页面的标题
    // 筛选页面的模糊查询项
    $label.sel_like = [];//筛选页面的模糊查询标题
    $search.like=[] //筛选页面的模糊查询对应字段
    //筛选页面的区间查询的名称
    $label.sel_qujian_number=[];
    $search.qujian_number=[];
    /**
     * //功能显示状态，可修改
     */
    $show_status.gongneng.search_always=true;// 是否项目内外都需要查询按钮;
    $show_status.gongneng.search_btn=true;
    $show_status.gongneng.top_show=true;// 顶部大汇总

    $show_status.gongneng.need_group_list=true; // 是否需要group_list
    $show_status.gongneng.need_top_show=true;// top 功能是否需要
    //筛选查询页面
    $show_status.gongneng.ul_search_combox=true;
    $show_status.gongneng.fuzzy_query=true;
    $show_status.gongneng.select_qunjian_number=true;

    // *****************************************************************************************************************
    //从链接中获得参数
    $param.get_param_from_url();
    //一切准备就绪，开始创建
    $create.all()
    // 显示状态
    //	$show_status.gongneng.get_show();
    /**
     * 创建页面vue，每个业务模块有不同的写法
     */
    export default {
        data(){
            return{
                tempAction:1,
                // 存放从数据库里读取的信息数据
                items_top:[],
                items_recorder_list:[],
                litems_group_list:[],
                data_number:"",
                items_search_list:[],
                show_status:$show_status,
                comm:$comm,
                group:$group,
                label:$label,
                divClick:$onclick,
                sideslip:$sideslip,
                /**
                 * 选择日期
                 */
                selDate:sel_date
            }
        },
        created(){
            $comm.vue=this;
            $comm.initVue();
            // console.log($show_status)
        },
        mounted(){

        },
        methods:{
            /**
             * 查询列表选中后
             */
            selected_list:function (name,sn) {
                closeWindow('search_list');
                this.$data.divClick.set_selected_val($search.list_No,name,sn);
            },
            input_changed:function(used){
                $search_list.input_changed(used)
            }
        }
    }

</script>
<style type="text/css">
    @import './css/common.css';
</style>

