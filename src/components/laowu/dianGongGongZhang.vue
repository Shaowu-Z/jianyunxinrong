<template>
  <div>
    <header class="mui-bar mui-bar-nav">
	<button id="btn-referrer" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left hide">
		<span class="mui-icon mui-icon-back"></span>
	</button>
	<h1 class="mui-title">记点工</h1>
</header>
     
<div id="app">

	<section class="mui-content" style="margin-top:44px;text-align:left">
		<ul class="mui-table-view eg-table-view">
			<li class="mui-table-view-cell mui-input-row" @click="selectDate('s')">
				<a class="mui-navigate-right">
					<label>日期<small>*</small></label>
					<input type="text" name="createTimeStr" v-model="form.createTimeStr" readonly="readonly" placeholder="请选择日期">
				</a>
			</li>
			<li class="mui-table-view-cell mui-input-row">
				<label>项目<small>*</small></label>
				<input type="text" name="projectName" readonly="readonly" value="" placeholder="请输入(必填)" v-model="form.projectName"/>
			</li>
		</ul>

		<div  class="eg-header zreg-header"  >
			<h4 class="oa-title">记工工人<small class="small">*</small></h4>
			<div v-for="(user,index) in data.selectUserList" :key="index" >
			<div class="oa-contact-cell mui-table">
				<div class="oa-contact-avatar mui-table-cell square"><!--imghost-->
					<span class="user-header"><img v-bind:src="user.ucon" alt="..." /></span>
				</div>
				<div class="oa-contact-content mui-table-cell" >
					<h4 class="oa-contact-name">
						<span class="" v-text="user.userName"></span>
						<small @click="openNormalHtml(user,2)" class="color-primary">工资标准</small>
						<a v-if="user.datePrice==null||user.datePrice==''" style="    font-size: 20px;" class="mui-icon mui-icon-info"></a>
					</h4>
				</div>
				<div class="oa-contact-content mui-table-cell">
					<a @click="deleteAry(user);setMoney(2)" class="mui-icon mui-icon-trash mui-pull-right"></a>
				</div>
			</div>
			<div class="oa-contact-cell mui-table">
				<div class="oa-contact-avatar mui-table-cell square">
					评分
				</div>
				<div class="oa-contact-content mui-table-cell" :id="user.userId">
					<!-- <span @click="selectStarMulti(1,user.userId);stopEvt(event)" ><img class="imgx" src="../../images/wuxing1.png" /></span>
					<span @click="selectStarMulti(2,user.userId);stopEvt(event)" ><img class="imgx" src="../../images/wuxing1.png" /></span>
					<span @click="selectStarMulti(3,user.userId);stopEvt(event)" ><img class="imgx" src="../../images/wuxing1.png" /></span>
					<span @click="selectStarMulti(4,user.userId);stopEvt(event)" ><img class="imgx" src="../../images/wuxing1.png" /></span>
					<span @click="selectStarMulti(5,user.userId);stopEvt(event)" ><img class="imgx" src="../../images/wuxing1.png" /></span> -->
				</div>
			</div>
			</div>
		</div>
		<div  class="eg-header" @click="openGongrenList(1)">
			<div class="upfujian">
				<div class="addimg">
					<div class="mui-icon mui-icon-plusempty scimg"></div>
				</div>

			</div>
		</div>
		<ul class="mui-table-view eg-table-view">

			<li class="mui-table-view-cell mui-input-row" @click="open_time_popver(1)">
				<a class="mui-navigate-right">
				<label>上班时长<small>*</small></label>
				<input type="text" name="workHourName" readonly="readonly" value="" placeholder="请选择时长" v-model="form.workHourName"/>
				</a>
			</li>
			<li class="mui-table-view-cell mui-input-row" @click="open_time_popver(2)">
				<a class="mui-navigate-right">
				<label>加班时长</label>
				<input type="text" name="overHourName"  readonly="readonly" value="" placeholder="请选择时长" v-model="form.overHourName"/>
				</a>
			</li>
			<li class="mui-table-view-cell mui-input-row">
				<label>备注</label>
				<input type="text" name="remark" value="" placeholder="请输入(选填)" v-model="form.remark"/>
			</li>
		</ul>
		<div class="fixed-bottom">
			<div class="confirm-box">
				<div class="count-con">工资金额：￥<span id="money" class="num">0.00</span></div>
				<div class="btn-con"><button @click="saveDataMutil(1)" class="mui-btn mui-btn-primary">保存</button></div>
			</div>
		</div>
	</section>
	<div id="cus_time_popver" v-show="select_time" class="mui-popover mui-popover-action mui-popover-bottom">
		<div class="pop-up2">
			<div class="pop-title" v-text="select_name"></div>
			<div class="pop-content select-box mui-clearfix">
				<div id="cus_zhiye_popver_sc" class="mui-scroll-wrapper">
					<div class="mui-scroll">
						<div class="col-xs-8 mui-clearfix">
							<div class="mui-input-row mui-checkbox mui-left">
								<div class="filtrate-body filtrate-primary">
									<div v-for="(time,index) in data.timeList" :key="index">
										<div class="item" @click="timeClick(time,2)" >
											<span v-if="select_hour==time.baseId" class="mui-active" v-text="time.baseName"></span>
											<span v-else class=""  v-text="time.baseName"></span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>

</div>

  </div>
</template>

<script>
import { DatetimePicker } from "mint-ui";
import laowu_main from "./js/laowu_main.js";
export default {
  data() {
    return {
      form: {
        id: "",
        userId: "",
        userName: "",
        userPhone: "",
        projectId: "",
        projectName: "",
        remark: "",
        confirmId: "",
        confirmName: "",
        confirmPhone: "",
        gongzhangId: "", //工长ID
        gongzhangName: "", //工长姓名
        recordType: "", //记账类型（1是点工；2是包工；3是借支；4是结算）
        identityType: "", //身份（0是工人；1是工头）
        gongrenId: "", //工人ID
        gongrenName: "", //工头NAME
        correlationId: "", //关联记录ID
        createTime: "",
        createTimeStr: "",
        operateStatus: "",
        money: "", //金额，所有类型都需要该字段
        //以下是记点工内容***********************
        workHour: "", //上班时长
        overHour: "", //加班时长
        workHourName: "", //上班时常名称
        overHourName: "", //加班时长名称
        normalId: "", //标准工资ID
        normalName: "", //标准工资名称
        datePrice: "", //日工资
        datePriceName: "", //日工资（名称）
        workNormalHour: "", //正常上班几个小时算一个工
        overNormalHour: "", //加班几个小时算一个工
        workNormalHourName: "", //上班时长（标准）名称
        overNormalHourName: "", //加班时长（标准）名称
        gongzhongId: "", //工种ID
        gongzhongName: "", //工种名称
        //以下是记包工内容***********************
        fenxiangName: "",
        price: "",
        number: "",
        numberName: "",
        unit: "", //单位
        score: "" //评分（点工和包工需要）
      },
      data: {
        timeList: [], //时间标签列表
        unitList: [], //单位标签列表
        selectUserList: [], //选择多人列表
        deleteForm: {},
        attform: []
      },
      reqParams: {
        gongzhangId: "",
        userId: "",
        id: ""
      },
      normalParams: {
        gongzhangId: "",
        userId: "",
        projectId: ""
      },
      reqWorkParamsVO: {
        userId: "",
        confirmId: "",
        queryTime: "",
        queryType: "",
        loginType: "",
        saveType: ""
      },
      userinfoParams: {
        list: []
      },

      select_time: false,
      select_hour: "", //当前选中的时间值
      select_unit: "", //当前选中的单位值
      select_name: "", //选择时间标签窗口标题
      select_type: "", //加班或正常上班
      show_button: "", //显示保存或者删除按钮
      save_type: "",
      loginType: "",
      checkNormalFlag: false
    };
  },
  created: function() {
    //初始化表单

    laowu_main._self = this;
    laowu_main.initVue();
    laowu_main.initData();
  },
  methods: {
    openPicker: function() {
      this.$refs.picker.open();
    },
    openGongrenList:function(){
      
      laowu_main.openGongrenList();
    },
    openNormalHtml:function(user, type){
      laowu_main.openNormalHtml(user, type);
    }
  }
};
</script>
<style>
		section{
			padding-bottom: 40px;
		}
		.confirm-box {
			font-size: 18px;
		}

		.confirm-box .btn-con {
			padding: 0;
			height: 100%;
		}

		.confirm-box .btn-con .mui-btn {
			height: 100%;
			width: 100px;
			font-size: 18px;
			border-radius: 0;
		}
		.ex-case .mui-table-cell{
			padding: 0;
		}
		.ex-case{
			margin-bottom: 0;
		}
		.imgx{
			width: 20px;
			height: 20px;
		}
		.eg-header{
			margin-bottom: 0;
		}
		.scimg {
			height: 50px;
			width: 50px;
			position: relative;
			border:1px solid  #666;
			text-align: center;
			line-height: 50px;
			font-size: 40px;
			color: #666;
			font-weight: bold;
			/* overflow: hidden; */
			display: inline-block;
		}
		.zreg-header>div{
			padding: 10px 0;
			border-top: 1px dashed #ccc 	;
		}
		.zreg-header .oa-title{
			padding-bottom: 3px;
		}
		.small{
			color: #f15a4a;
		}
	</style>
	<style>
		.cus-icon-pst{  float: left;width: 25px;height: 25px;margin-right: 16px;margin-top:12px}
	</style>
