<template>
  <div>
    <header class="mui-bar mui-bar-nav">
	<button id="btn-referrer" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left hide">
		<span class="mui-icon mui-icon-back"></span>
	</button>
	<h1 class="mui-title">{{title}}</h1>
</header>

<div class="fixed-bottom" v-if="save_type=='update'||save_type=='save'">
        <div class="mui-table mui-text-center">
            <div class="mui-table-cell" id="save_div"><button type="button" class="mui-btn mui-btn-primary" @click="saveData()">保存</button></div>
            <div class="mui-table-cell"  id="delete_div" ><button type="button" class="mui-btn" @click="deleteObj(form.id)">删除</button></div>
        </div>
    </div>
	<div class="fixed-bottom" v-if="save_type==''||save_type==null">
		<div class="confirm-box">
			<div class="count-con">点工工钱：<span class="num" id="money">￥0.00</span>元</div>
			<div class="btn-con"><button @click="saveData()" class="mui-btn mui-btn-primary">保存</button></div>
		</div>
	</div>
	<section class="mui-content main-left" >
		<ul class="mui-table-view eg-table-view">

			<li class="mui-table-view-cell mui-input-row">
				<label>工长<small>*</small></label>
				<input type="text" name="gongzhangName" readonly="readonly" value=""  placeholder="请选择工长" v-model="form.gongzhangName"/>
			</li>
			<li v-if="save_type==''||save_type==null" class="mui-table-view-cell mui-input-row"   >
				<a class="mui-navigate-right">
					<!-- <label>日期<small>*</small></label> -->
          <data-bar :title="datetitle" :datanow='form.createTimeStr' @upup="change"></data-bar>
				<!-- <input type="text" name="createTimeStr" v-model="form.createTimeStr" readonly="readonly" placeholder="请选择日期"> -->
				</a>
			</li>
			<li v-else class="mui-table-view-cell mui-input-row" >
				<label>日期<small>*</small></label>
				<input type="text" name="createTimeStr" v-model="form.createTimeStr" readonly="readonly" placeholder="请选择日期">
			</li>

     
    <li class="mui-table-view-cell mui-input-row">
				<label>项目<small>*</small></label>
				<input type="text" name="projectName" readonly="readonly" value="" placeholder="请输入(必填)" v-model="form.projectName"/>
			</li>
   
   
      <li v-if="form.recordType==1" class="mui-table-view-cell mui-input-row" @click="openNormalHtml(null,1)">
          <a class="mui-navigate-right">
              <div class="oa-contact-cell mui-table namelist">
                  <div class="oa-contact-avatar mui-table-cell square">
                      <label>工资<small>*</small></label>
                  </div>
                  <div class="oa-contact-content mui-table-cell">
                      <h4 class="oa-contact-name" v-text="form.datePriceName"></h4>
                      <p class="oa-contact-email">
                          <span v-text="form.workNormalHour"></span>小时(上班)/
                          <span v-text="form.overNormalHour"></span>小时(加班)
                      </p>
                  </div>
              </div>
          </a>
      </li>

			<li v-if="form.recordType==1" class="mui-table-view-cell mui-input-row"  >
         <area-bar :datanow="form.workHourName" :starindex="sindex" :title="worktitle" :timeType=1 :areatype="areatype" @toParent="childValue"  :shuju="solt"></area-bar>
			</li>
			<li v-if="form.recordType==1" class="mui-table-view-cell mui-input-row" >
         <area-bar :datanow="form.overHourName" :starindex="oindex" :title="overtitle" :timeType=2 :areatype="areatype" @toParent="childValue"  :shuju="solt"></area-bar>
			</li>

          <li v-if="form.recordType==2" class="mui-table-view-cell mui-input-row">
				<label>分项<small>*</small></label>
				<input type="text" name="fenxiangName" value="" placeholder="请输入(必填)" v-model="form.fenxiangName"/>
			</li>
			<li v-if="form.recordType==2" class="mui-table-view-cell mui-input-row">
				<label>单价<small>*</small></label>
				<input type="number" name="price" v-on:input="setBaoGongMoney();" value="" placeholder="请输入(必填)" v-model="form.price"/>
			</li>
      <div v-if="form.recordType==2" class="singlebox mui-input-row input-row-unit">
				<label>数量</label>
				<input type="number" name="number" v-on:input="setBaoGongMoney();" v-model="form.number" class="mui-input-clear" value="" placeholder="数量(必填)"/>
				<span class="mui-icon mui-icon-clear"></span>
				<button @click="open_unit_popver()" class="mui-btn btn-unit">
					<span name="unit" v-text="form.unit"></span><span  class="mui-icon mui-icon-arrowdown"></span>
				</button>
			</div>
    
      <li v-if="form.recordType==3" class="mui-table-view-cell mui-input-row">
				<label>借支金额<small>*</small></label>
				<input type="number" name="money" value="" v-on:input="setJiZhangMoney()" placeholder="请输入" v-model="form.money"/>
			</li>
      <li v-if="form.recordType==4" class="mui-table-view-cell mui-input-row">
				<label>结算金额<small>*</small></label>
				<input type="number" name="money" value="" v-on:input="setJiZhangMoney()" placeholder="请输入" v-model="form.money"/>
			</li>
    
			<li v-if="save_type=='update'||save_type=='save'" class="mui-table-view-cell mui-input-row" >
				<label>工资金额</label>
				<input type="number" name="money" readonly="readonly" value=""  v-model="form.money"/>
			</li>

			<li v-if="loginType==0 && form.score!=null && form.score!='' && form.score!='0' " class="mui-table-view-cell mui-input-row">
				<label>评分</label>
				<div class="oa-contact-content mui-table-cell pingfen" id="pingfen">
					<span><img class="imgx" :src="imgxurl" /></span>
					<span><img class="imgx" :src="imgxurl" /></span>
					<span><img class="imgx" :src="imgxurl" /></span>
					<span><img class="imgx" :src="imgxurl" /></span>
					<span><img class="imgx" :src="imgxurl" /></span>
				</div>
			</li>
			<li v-if="loginType==1" class="mui-table-view-cell mui-input-row">
				<label>评分<small>*</small></label>
				<div class="oa-contact-content mui-table-cell pingfen" id="pingfen">
					<span @click.stop="selectStar(1);" ><img class="imgx" :src="imgxurl" /></span>
					<span @click.stop="selectStar(2);" ><img class="imgx" :src="imgxurl" /></span>
					<span @click.stop="selectStar(3);" ><img class="imgx" :src="imgxurl" /></span>
					<span @click.stop="selectStar(4);" ><img class="imgx" :src="imgxurl" /></span>
					<span @click.stop="selectStar(5);" ><img class="imgx" :src="imgxurl" /></span>
				</div>
			</li>
			<li class="mui-table-view-cell mui-input-row">
				<label>备注</label>
				<input type="text" name="remark" value="" placeholder="请输入(选填)" v-model="form.remark"/>
			</li>
		</ul>

	</section>
	

  <mt-popup v-model="unitpopup" position="bottom">
  	<div class="pop-up2">
			<div class="pop-title" >选择单位</div>
			<div class="pop-content select-box mui-clearfix">
				<div  class="mui-scroll-wrapper">
					<div class="mui-scroll">
						<div class="col-xs-8 mui-clearfix">
							<div class="mui-input-row mui-checkbox mui-left">
								<div class="filtrate-body filtrate-primary">
									<div v-for="(unit,index) in data.unitList" :key="index">
										<div class="item" @click="unitClick(unit)" >
											<span v-if="select_unit==unit.baseName" class="mui-active" v-text="unit.baseName"></span>
											<span v-else class=""  v-text="unit.baseName"></span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

</mt-popup>

   

  </div>
</template>

<script>
import {Picker,popover,DatetimePicker} from "mint-ui"
import laowu_main from "./js/laowu_main.js";
import dataBar from "../common/dataBar"
import areaBar from "../common/areaBar"
export default {
  name: '',
  components: { dataBar,areaBar},
  props: {},
  data() {
    return {
      sindex:0,
      oindex:0,
      titleriqi:"日期",
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
        unitList: [{"baseId":123,"baseName":333}], //单位标签列表
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
      title:"",
      unitpopup:false,
      select_time: false,
      select_hour: "", //当前选中的时间值
      select_unit: "", //当前选中的单位值
      select_name: "", //选择时间标签窗口标题
      select_type: "", //加班或正常上班
      show_button: "", //显示保存或者删除按钮
      save_type: "",
      loginType: "",
      imgxurl:"../../../static/images/wuxing1.png",
      checkNormalFlag: false,
      worktitle:"上班时长",
      overtitle:"加班时长",
      datetitle:"日期",
      areatype:"2",
      solt:[],
      // solt:[
      //     {
      //     flex: 1,
      //     defaultIndex: 0,
      //     values: [], //省份数组
      //     className: "slot1",
      //     textAlign: "center"
      //     }
      //     ]
    };
  },
  created: function() {
    //初始化表单

    laowu_main._self = this;
    laowu_main.initVue();
    laowu_main.initData();
  },
  mounted:function(){
    
    laowu_main.setTitle();
  },
  methods: {
    clickTime:function(){
      alert(3)
    },
    change(msg) {
      this.form.createTimeStr=msg;
    },
    openPicker: function() {
      this.$refs.picker.open();
    },
    openNormalHtml:function(user, type){
      laowu_main.openNormalHtml(user, type);
    },
    saveData:function(){
      laowu_main.saveData()
    },
    childValue:function(obj){
       laowu_main.timeClick(obj,obj.timeType,1)
    },
   
    open_unit_popver:function(){
       this.unitpopup=true
    },
    close_unit_popver:function(){
       this.unitpopup=false
    },
    unitClick:function(obj){
        laowu_main.unitClick(obj)
    },
    setBaoGongMoney:function(){
      laowu_main.setBaoGongMoney()
    },
    selectStar:function(v1){
      laowu_main.selectStar(v1,'pingfen')
    },
    deleteObj:function(v1){
      laowu_main.deleteObj(v1)
    },
  }
};
</script>

    <style>
.cus-icon-pst {
  float: left;
  width: 25px;
  height: 25px;
  margin-right: 16px;
  margin-top: 12px;
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
.ex-case .mui-table-cell {
  padding: 0;
}
.ex-case {
  margin-bottom: 0;
}
.oa-contact-avatar {
  width: 45%;
}
.oa-contact-content {
  width: auto;
}
.trend-list:before {
  top: 15px;
  height: calc(100% - 15px);
}

.quezr {
  color: #ff9900;
}

.trend-contain {
  background: #fff;
}

.prolist-line .list-item {
  border-bottom: 0;
}

.imgx {
  width: 20px;
  height: 20px;
}
.pingfen {
  height: 51px;
  line-height: 51px;
}
.main-left{
  text-align:left
}
.fixed-bottom{
  text-align:left
}
.mint-popup-bottom{
  width: 100%;
}
.btn-unit{
  width: 1px;
}
.mint-datetime-confirm{
    width: auto !important;
    height: auto !important;
    padding: 0 10px !important;
    margin: 3px 0 !important;
    line-height: 30px !important;
    border: 1px solid #ccc !important;
    border-radius: 5px !important;
    margin-right: 6px !important;
    background: #26a2ff !important;
    color: #fff !important;
}
.mint-datetime-cancel{
        width: auto !important;
    height: auto !important;
    color: #aaa !important;
    padding: 0 10px !important;
    margin: 3px 0 !important;
    line-height: 30px !important;
    border: 1px solid #ccc !important;
    border-radius: 5px !important;
    margin-left: 6px !important;
}
</style>
