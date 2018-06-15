<template>
    <div id='main_content'>
        <header class="mui-bar mui-bar-nav">
            <div>
                <!-- {{lastlog.zhiyeCompany[lastlog.zy.zhiyetagid].teamName | substring(6)}} -->
                <h1 class="mui-title "><label>{{lastlog.zhiyeCompany[lastlog.zy.zhiyetagid].teamName}}</label></h1>
            </div>
        </header>
        <div>
            <!--个人主页-->
            <personal v-if="lastlog.homeType==0" :modules="modules" :initval="initval" :lastlog="lastlog"></personal>

            <!--企业主页-->
            <company v-else-if="lastlog.homeType==2" :modules="modules" :initval="initval" :lastlog="lastlog"></company>

            <!--工人、工头的项目主页-->
            <personal v-else-if='lastlog.homeType==1 && (lastlog.zy.zhiyetagid=="supplier_baogongtou" || lastlog.zy.zhiyetagid=="supplier_minggong")' :modules="modules" :initval="initval" :lastlog="lastlog"></personal>

            <!--项目主页-->
            <project v-else-if='lastlog.homeType==1' ref="project" :modules="modules" :initval="initval" :lastlog="lastlog" :columnparam="columnparam" ></project>

            <section class="mui-content" v-else>
                <div class="module01" >
                    <div class="module-body">
                        <div class="project01 mui-clearfix">
                            <div class="mui-table" style="text-align: center">
                                此职业主页正在建设中，敬请期待！
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!--遮罩层-->
        <div>

            <div class="mui-loading" v-if="valid.loading">
                <div class="mui-spinner"></div>
            </div>
            <div  style="background-color:rgba(0,0,0,.0);z-index: 998;" class="mui-backdrop" :class="{'hide':!valid.loading}"></div>
            <div  class="mui-backdrop" :class="{'hide':!valid.backdropshow}" onClick="javascript:backdropClick()" style="z-index: 900;"></div>
        </div>


<script id="company_home" type="text/template">
<section class="mui-content">
    <div v-for="(m,index) in modules" :key="index">
        <!--展示格-->
        <div  v-if="m.code==1">
            <div class="index-top" v-if="it.focus_type==0" v-for="(it,index) in m.items" :key="index" @click="moreClick(it.moreUrl)">
                <div class="primary-data">
                    <span class="tooltips">{{it.text_top}}</span>
                    <span :id="it.id" class="data" v-if='it.text_number_first!=null && it.text_number_second!=null && it.text_number_first!="" && it.text_number_second!=""'><label>&nbsp;</label><small>{{it.text_number_first}}<span class="line">/</span><span class="sec-data"><label>&nbsp;</label></span>{{it.text_number_second}}</small></span>
                    <span :id="it.id" class="data" v-else-if="it.text_number_second!=null && it.text_number_second!=''"><small><span class="sec-data"><label>&nbsp;</label></span>{{it.text_number_second}}</small></span>
                    <span :id="it.id" class="data" v-else-if="it.text_number_first!=null && it.text_number_first!=''"><label>&nbsp;</label><small>{{it.text_number_first}}</small></span>
                </div>
            </div>
            <div class="mui-table ex-case">
                <div class="mui-table-cell" v-if="ite.focus_type!=0" v-for="(ite,index) in m.items" :key="index" @click="moreClick(ite.moreUrl)">
                    <span class="data" :id="ite.id"><label>&nbsp;</label></span>
                    <span class="tooltips">{{ite.text_bottom}}</span>
                </div>
            </div>
        </div>

        <!--分组图标-->
        <div class="floor2 module01" v-else-if="m.code==2">
            <div class="module01-head"><span class="title line-title">{{m.fenzutitle}}</span></div>
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" @click="onFuwuclick(item.url,item.urlType)" v-for="(item,index) in m.items" :key="index">
                    <div class="menu-item">
                        <span :class="['mui-icon iconfont '+ (item.iconname==''?'icon-zixun':item.iconname)]"></span>
                        <span class="menu-item-name" v-text="item.mingcheng"></span>
                    </div>
                </li>
            </ul>
        </div>

        <!--展示窗口-->
        <div class="module01" v-else-if="m.code==3">
            <div class="module01-head" v-if="m.ContentWindow_name!=null && m.ContentWindow_name!=''">
                <span class="title line-title" v-text="m.ContentWindow_name"></span>
                <a class="mui-btn mui-btn-link" v-if="m.moreUrl!=null && m.moreUrl!=''" @click="moreClick(m.moreUrl)">更多</a>
            </div>
            <div :id="m.id" class="module-body" :style="m.height | setStyleHeight">
                <div class="mui-loading">
                    <div class="mui-spinner"></div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="initval.nodata">
        <div class="module01">
            <div class="module-body">
                <div class="project01 mui-clearfix">
                    <div class="mui-table" style="text-align: center">
                        此职业标签下没有相关企业公司
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

</script>





    </div>
</template>

<script>
export default {
    data () {
        return {

        }    
    },
}
</script>

<style>
        .date-time{
            background: #fff;
            margin-bottom: 10px;
        }
        .date-head{
            font-size:16px;
            height:50px;
            line-height: 50px;
            text-align: center;
            border-bottom:1px solid #eee;
        }
        .date-head .label-left,
        .date-head .label-right{
            height:50px;
            width:50px;
            padding:0 12px;
            text-align: center;
        }
        .date-head .label-left{
            float:left;
        }
        .date-head .label-right{
            float:right;
        }
        .date-body{
            padding:20px 10px;
            overflow: hidden;
        }
        ul,li{margin:0;padding:0;list-style: none;}
        .date-weekday li{
            font-size:16px;
            color:#222;
            text-align: center;
        }
        .data-day{padding-top:10px;}
        .data-day li{
            float:left;
            width:14.2%;
            font-size:15px;
            color:#999;
            text-align: center;
            padding:5px 0;
        }
        .data-day li.over{
            color:#000;
        }

        .data-day li.over.sign-in{
            background: url(../../../assets/images/label_sign.png) center no-repeat;
            background-size: 22px;
        }
        .data-day .day{
            position: relative;
            display: block;
            width:38px;
            height:30px;
            line-height: 30px;
            border-radius: 14px;
            margin:0 auto;
        }
        .data-day .day:active{
            background: #eee;
        }
        .data-day li.today .day{
            position: relative;
        }
        .data-day li.today .day:before{
            position: absolute;
            left: 50%;
            display: block;
            width: 30px;
            height: 30px;
            content: "今";
            font-size: 15px;
            color:#fff;
            border-radius: 50%;
            background: #4ba9e9 ;
            margin-left: -15px;
        }
        .sign-num{
            position: absolute;
            bottom:-8px;
            left:50%;
            -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
            display: block;
            width: 14px;
            height: 14px;
            font-size: 12px;
            color: #777;
            line-height: 1.2;
        }
        .sign-num:empty{
            border-radius: 50%;
            background: url(../../../assets/images/btn-roll.png) no-repeat;
            background-size: 14px auto;
            background-position: 0 -172px;
        }
        #imgFile{
            position: absolute;
            left:0;
            opacity:0;
            height: 100%;
            width: 100%;
            top: 0;
            padding: 0;

        }
        iframe{
            width: 100%;
            height: 100%;
            border: 0
        }
        .layui-m-layersection{
            vertical-align: top;
        }
        .mui-table-views {
            overflow: scroll;
            max-height: 300px;
            position: relative;
        }
        /*.mui-bar{*/
            /*z-index: 998;*/
        /*}*/
        .state-rtop{
            margin-bottom: 0;
        }
        .che_box {
            width: 100%;
            min-height: 50px;
            position: relative;
            overflow: hidden;
            padding:0 12px;
            padding-bottom: 20px;
        }

        .che_scroll {
            height: 100%;
            position: relative;
            white-space: nowrap;
            width: 100%;
            overflow-y: hidden;
            font-size: 0;
        }

        .che_scroll>li {
            margin-top: 10px;
            width: 50px;
            position: relative;
            white-space: nowrap;
            list-style: none;
            display: inline-block;
            vertical-align: top;
        }

        .che_scroll .che_topxian {
            position: absolute;
            top: 0px;
            width: 100%;
            height: 10px;
        }

        .che_scroll>li .jian {
            height: 10px;
            width: calc(100% - 1px);
            margin: 0 auto;
            background: #009933 url(../../../assets/images/you.png) no-repeat center;
            background-size: auto 100%;
            position: absolute;
            z-index: 2;
        }

        .che_scroll>li h5 {
            height: 30px;
            width: 40px;
            margin: 0 auto;
            text-align: center;
            line-height: 30px;
            font-size: 16px;
            margin-top: 16px;
        }

        .che_scroll>li p {
            width: 20px;
            margin: 0 auto;
            line-height: 15px;
            font-size: 14px;
            text-align: center;
            white-space: pre-line;
        }

        .che_scroll .money {
            border-radius: 50%;
            height: 18px;
            width: 18px;
            background: #bbb;
            line-height:18px;
            color: gold;
            margin-top: 6px;
        }

        .b-gold {
            background: #009933 !important;
            color: gold !important;
        }
        .b-bbb {
            background-color: #bbb !important;
        }

        .b-red {
            background-color: red !important;
        }

        .che_scroll .weic {
            height: 18px;
            width: 18px;
            border-radius: 50%;
            overflow: hidden;
            margin: 0 auto;
            text-align: center;
            position: relative;
            margin-top: 6px;
        }

        .che_scroll .weic div:nth-child(1) {
            left: 0;
            width: 9px;
            height: 18px;
            float: left;
            background: #009933;
        }

        .che_scroll .weic div:nth-child(2) {
            right: 0;
            width: 9px;
            height: 18px;
            float: right;
            background: #bbb;
        }

        .che_scroll .weic div:nth-child(3) {
            position: absolute;
            width: 18px;
            color: gold;
            text-align: center;
            line-height: 18px;
            font-size: 16px;
        }
        .jian div {
            width: 66px;
            height: 10px;
            position: relative;
            left: -8px;
        }
        .sanjiao {
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 17px solid #1296db;
            position: absolute;
            top: -17px;
            display: none;
        }
        .close_content{
            max-height: 100px;
            overflow: hidden;
        }
        .close_content_2{
            max-height: 80px;
            overflow: hidden;
        }
        .close_content_3{
            max-height: 104px;
            overflow: hidden;
        }
        .module-body .video-item .video-pic{
            height: 200px;
        }
        .module-body .video-item .video-pic{
            padding-bottom: 0;
            line-height: 200px;
            text-align: center;
        }
        .module-body .video-item .video-pic img{
            position: relative;
            top: 0;
            left: 0;
            transform: translate(0);
            -webkit-transform: translate(0);
            width: auto;
            max-height: 250px;
            max-width: 100%;
            vertical-align: middle;
        }
        .module-body .mui-loading {
            position: relative;
            top: 25px;
        }
        .news_zr{
            position: absolute;border: 1px solid #ccc;z-index: 990;
            padding: 6px 20px;
            line-height: 50px;
            width: 280px;
            height:72px ;
            text-align: center;
            background: rgba(0,0,0,.75);
            border-radius: 5px;
            position: absolute; left: 0; top: 0; right: 0; bottom: 0;
            margin: auto;
            overflow: hidden;
        }
        .news_zr div{
            margin:  0 auto;
            text-align: center;
            line-height: 30px;
            height: 30px;
        }
        .news_zr div span{
            display: inline-block;
            text-align: center;
            line-height: 26px;
            color: #fff;
            font-size: 16px;
            float:left

        }
        section{
            height: 100%;
            overflow: scroll;
            position: relative;
        }
        .mui-popover .mui-table-views{
            overflow: scroll;
            max-height: 300px;
            position: relative;
        }
        /*.mui-bar{*/
            /*position: fixed;
            position: sticky;
        }*/
        .xf {
            position: absolute;
            /*top: 44px;*/
            width: 100%;
            left: 0;
            height: 44px;
            display: none;
            z-index: 998;
        }
        .sticky {position: -webkit-sticky;position: sticky;display: block;top:44px;}
        /*.xf li a:hover{color: #4680d1;}
        .xf li a.active {}*/
        .nav-height{
            width: 100%;
        	position: absolute;
        	height: 44px;
        }
        .nav-wrap {
            width: 100%;
            height: 44px;
            overflow: scroll;
        }
        .nav-wrap.navFix{position: fixed;top: 44px;left: 0;  box-shadow: 0 0 5px rgba(0,0,0, 0.2);border-bottom:1px solid #e3e3e3; z-index: 998;}
        .nav-wrap ul {
            padding: 0;
            margin: 0 auto;
            /*width: 1200px;*/
            overflow: scroll;
            white-space: nowrap;
            display: block;
        }
        .nav-wrap.navFix ul{ border-bottom: 0;}
        .nav-wrap li {
            height: 44px;
            line-height: 44px;
            /*float: left;*/
            display: inline-block;
            text-align: center;
        }
        .nav-wrap li + li{
            padding-left: 3px;
        }
        /*.nav-wrap li:nth-child(1){*/
        /*width: 0;*/
        /*}*/
        .nav-wrap li a {
        	position: relative;
            display: block;
            font-size: 15px;
            letter-spacing: 2px;
            padding: 0 15px;
            color: #333;
        }
        /*.nav-wrap li a:hover{color: #4680d1;}*/
        .nav-wrap li a.active {
            color: #fff;
        }
        .nav-wrap li a:after{
			position: absolute;
			left: 0;
			top: -42px;
			z-index: -1;
			content:"";
			display: block;
			width: 100%;
			height: 44px;
			background: #4ba9e9;
		}
		.nav-wrap li:nth-child(2) a:after,
		.nav-wrap li:nth-child(6) a:after,
		.nav-wrap li:nth-child(10) a:after{
			background: #eeb924;
		}
		.nav-wrap li:nth-child(3) a:after,
		.nav-wrap li:nth-child(7) a:after,
		.nav-wrap li:nth-child(11) a:after{
			background: #46B687;
		}
		.nav-wrap li:nth-child(4) a:after,
		.nav-wrap li:nth-child(8) a:after,
		.nav-wrap li:nth-child(12) a:after{
			background: #f03118;
		}
		.nav-wrap li:nth-child(5) a:after,
		.nav-wrap li:nth-child(9) a:after{
			background: #4ba9e9;
		}
		@-webkit-keyframes pulldown
		{
			0%{
				top: -42px;
			}
			100%{
				top: 0;
			}
		}
		.nav-wrap li a.active{
			color: #fff;
		}
		.nav-wrap li a.active:after{
			color: #fff;
			-webkit-animation: pulldown ease-in .25s;
			animation: pulldown ease-in .25s;
			top: 0
		}
        .nav-mobile {display: none;font-weight: bold;width: 100%;}
        .click-me {width: 150px;height: 30px; background: #4680d1;color: white; text-align: center;line-height: 30px;}
        .click-me a {display: block;color: white;}
</style>
