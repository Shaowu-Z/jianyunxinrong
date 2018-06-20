<template>
  <div>
      <header class="mui-bar mui-bar-nav">
		<!-- <a class="mui-action-back mui-icon iconfont icon-back"></a> -->
		<h1 class="mui-title">施工日历</h1>
	</header>

   	<section class="mui-content" >
			<!-- 容器布局 -->
			<div class="rili_box">
				<div id="calendar" class="calendar-box demo-box"></div>
			</div>
			<div style="text-align: center" class="rili_box">

				<ul class="mui-table-view">
					<li class="mui-table-view-cell">
						<a class="" style="color:#fa344b;">1h=上班一个小时</a>
					</li>
					<li class="mui-table-view-cell jiaban">
						<a class="" style="color: deepskyblue;">1h=加班一个小时</a>
					</li>
				</ul>
			</div>
		</section>
  </div>
</template>
	
<script>
import laowu_common from "./js/laowu_common.js";
import calendar_manage from "./js/calendar_manage.js";
var paramMap=null;
export default {
  data () {
    return {

    }
  },created:function(){
	  paramMap=laowu_common.paramMap;
	  calendar_manage.initData(laowu_common,this);
	  this.initCalendar();
  },methods:{
	  initCalendar:function(){
		   var queryType=paramMap.queryType;
			if(!queryType){
				queryType='manager';//项目管理人员或外部人员
			}
		calendar_manage.calendar({
			ele : '.demo-box', //依附
			title : '',
			beginDate : '1970-01-10',  //开始日期
			endDate : '2037-01-10',   //结束日期
			data : [
				{date:'2017-9-17',data:''}

			],
             queryType:queryType,


        });
	  }
  }
}
</script>
		<style>
			.ht-rili-td {
				width: 14.25%;
				width: calc(14.25% - 4px);
				margin: 2px;
				float: left;
				text-align: center;
				padding: 5px 2px;
				border-radius: 3px;
				border:1px solid #fff;
				cursor: pointer;
				height: 64px;
				position: relative;
			}
			/*有数据日期的类名*/
			.ht-rili-td-active{
				border:1px solid #fa6f14;
			}
			.ht-rili-td-nouthing-active{/*无记录背景框*/
				border: 1px solid #ddd;
				background-color: #f0ad4e;
			}
			.ht-rili-money {
				font-family: Arial;
				height: 14px;
				display: block;
				width: 50%;
				font-size: 12px;
				letter-spacing: -1px;
				line-height: 1;
				color: #777;
				text-align: left;
				padding: 2px 0;
				clear: both;
			}

			.ht-rili-day {
				font-family: Arial;
				font-size: 16px;
				display: inline-block;
				height: 24px;
				/* float: left; */
				line-height: 24px;
				 width: auto;
			}
			.ht-rili-right{
				float: right;
				margin-top: 4px;
				height:15px;
				display: block;
			}

			.ht-rili-onclick:before{
				position: absolute;
				top: 0px;
				left: 50%;
				z-index: 2;
				font-size:13px;
				display: block;
				content: "";
				display: none;
				color: #fff;
				background: #4ba9e9;
				height: 30px;
				width: 30px;
				line-height: 30px;
				border-radius: 50%;
				text-align: center;
				margin-left:-15px;
			}
			.workfontcolor{
				color: red;
			}
			.overfontcolor{
				color: #007aff;
			}
			.rightb_icon{
				position: absolute;
				bottom: 5px;
				right: 2px;
				height: 20px;
				line-height: 20px;
			}
			.rili_box .mui-table-view-cell{
				width: 50%;
				float: left;
				background: #fff;
			}
			.rili_box .jiaban{
				width: calc(50% - 1px);
				border-left: 1px solid #ccc;
			}

		</style>