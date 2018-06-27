<template>
  <div>
    <header class="mui-bar mui-bar-nav">
			<!--<a class="mui-action-back mui-icon iconfont icon-back"></a>-->
			<h1 class="mui-title">{{title}}详情</h1>
			<button v-if="save_type!='chartview'" name="need_hide_div" @click="updateObject(form.id,1)" class="mui-btn mui-btn-link mui-btn-nav mui-pull-right">我要修改</button>
		</header>
    <div class="mui-content" >
    <div class="mui-table-view address-item ">
				<!--项目部-->
				<div class="address-item-cell">
					<div class="mui-table-view-cell">
						<div class="mui-slider-cell">
							<div class="oa-contact-cell mui-table">
								<div class="oa-contact-avatar mui-table-cell">
									<span class="oa-pic-default bgr2 p-label" v-text="form.gongrenName"></span>
								</div>
								<div class="oa-contact-content mui-table-cell">
									<h4 class="oa-contact-name" v-text="form.gongrenName"></h4>
									<!--<p class="oa-contact-email">创建人&nbsp;&nbsp;<small v-text="form.userName"></small></p>-->
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="prolist-line project-list">
					<div class="list-item">
						<div class="product-info-box">
							<div class="gray-pro-info"><label class="mui-pull-left">记工日期</label>
								<div class="rg-con"><span class="value" v-text="form.createTimeStr"></span></div>
							</div>
							<div class="gray-pro-info"><label class="mui-pull-left">项目名称</label>
								<div class="rg-con"><span class="value" v-text="form.projectName"></span></div>
							</div>

              <div v-if="detailType==1">
		          <div class="gray-pro-info"><label class="mui-pull-left">上班时长</label>
								<div class="rg-con"><span class="value" v-text="form.workHourName"></span></div>
							</div>
							<div class="gray-pro-info"><label class="mui-pull-left">加班时长</label>
								<div class="rg-con"><span class="value" v-text="form.overHourName"></span></div>
							</div>
							<div class="gray-pro-info"><label class="mui-pull-left">工资</label>
								<div class="rg-con"><span class="value" v-text="form.money"></span>元</div>
							</div>
							<div class="gray-pro-info"><label class="mui-pull-left">备注</label>
								<div class="rg-con"><span class="value" v-text="form.remark"></span></div>
							</div>
							<div class="gray-pro-info"><label class="mui-pull-left">工资标准</label>
								<div class="rg-con"><span class="value">工种  <small v-text="form.gongzhongName"></small></span></div>
							</div>
							<div class="gray-pro-info"><label class="mui-pull-left">&nbsp;&nbsp;&nbsp;&nbsp;</label>
								<div class="rg-con"><span class="value">上班  <small v-text="form.workNormalHourName"></small></span></div>
							</div>
							<div class="gray-pro-info"><label class="mui-pull-left">&nbsp;&nbsp;&nbsp;&nbsp;</label>
								<div class="rg-con"><span class="value">加班  <small v-text="form.overNormalHourName"></small></span></div>
							</div>
							<div class="gray-pro-info"><label class="mui-pull-left">&nbsp;&nbsp;&nbsp;&nbsp;</label>
								<div class="rg-con"><span class="value">日薪  <small v-text="form.datePriceName"></small>1个工</span></div>
							</div>
							<div class="oa-contact-cell mui-table zr_wuxing gray-pro-info">
							<div class="oa-contact-avatar mui-table-cell square">
								评分
							</div>
							<div class="oa-contact-content mui-table-cell" id="pingfen">
								<span><img class="imgx" :src="imgxurl"></span>
								<span><img class="imgx" :src="imgxurl"></span>
								<span><img class="imgx" :src="imgxurl"></span>
								<span><img class="imgx" :src="imgxurl"></span>
								<span><img class="imgx" :src="imgxurl"></span>
							</div>
						</div>
              </div>

              <div v-if="detailType==2">
              <div class="gray-pro-info"><label class="mui-pull-left">分项名称</label>
								<div class="rg-con"><span class="value" v-text="form.fenxiangName"></span></div>
							</div>
							<div class="gray-pro-info"><label class="mui-pull-left">数量</label>
								<div class="rg-con"><span class="value" v-text="form.numberName"></span></div>
							</div>
							<div class="gray-pro-info"><label class="mui-pull-left">单价</label>
								<div class="rg-con"><span class="value" v-text="form.price"></span>元</div>
							</div>
							<div class="gray-pro-info"><label class="mui-pull-left">包工金额</label>
								<div class="rg-con"><span class="value" v-text="form.money"></span>元</div>
							</div>
							<div class="gray-pro-info"><label class="mui-pull-left">备注</label>
								<div class="rg-con"><span class="value" v-text="form.remark"></span></div>
							</div>
							<div class="oa-contact-cell mui-table zr_wuxing gray-pro-info">
							<div class="oa-contact-avatar mui-table-cell square">
								评分
							</div>
							<div class="oa-contact-content mui-table-cell" id="pingfen">
								<span><img class="imgx" :src="imgxurl"></span>
								<span><img class="imgx" :src="imgxurl"></span>
								<span><img class="imgx" :src="imgxurl"></span>
								<span><img class="imgx" :src="imgxurl"></span>
								<span><img class="imgx" :src="imgxurl"></span>
							</div>

							</div>
              </div>
              <div v-if="detailType==3">

          <div class="gray-pro-info"><label class="mui-pull-left">借支金额</label>
								<div class="rg-con"><span class="value" v-text="form.money"></span>元</div>
							</div>
							<div class="gray-pro-info"><label class="mui-pull-left">备注</label>
								<div class="rg-con"><span class="value" v-text="form.remark"></span></div>
							</div>

              </div>
              <div v-if="detailType==4">

              <div class="gray-pro-info"><label class="mui-pull-left">结算金额</label>
								<div class="rg-con"><span class="value" v-text="form.money"></span>元</div>
							</div>
							<div class="gray-pro-info"><label class="mui-pull-left">备注</label>
								<div class="rg-con"><span class="value" v-text="form.remark"></span></div>
							</div>

              </div>

					
						</div>
					</div>
			   </div>

			<div v-for="(item,index) in data.attform" :key="index" class="mui-table-view address-item">
				<!--项目部-->
				<div class="address-item-cell">
					<div class="mui-table-view-cell">
						<div class="mui-slider-cell">
							<div class="oa-contact-cell mui-table">
								<div class="oa-contact-avatar mui-table-cell">
									<img class="mui-action-preview" v-bind:src="item.photoAddress" alt="..." />
								</div>
								<div class="oa-contact-content mui-table-cell">
									<h4 class="oa-contact-name sign-time" v-text="item.userName"></h4>
									<p class="oa-contact-email " v-text="item.title"></p>
									<p class="oa-contact-email" v-text="item.gpsAddress"></p>
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
        unitList: [{ baseId: 123, baseName: 333 }], //单位标签列表
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
      title: "",
      detailType:"",
      unitpopup: false,
      select_time: false,
      select_hour: "", //当前选中的时间值
      select_unit: "", //当前选中的单位值
      select_name: "", //选择时间标签窗口标题
      select_type: "", //加班或正常上班
      show_button: "", //显示保存或者删除按钮
      save_type: "",
      loginType: "",
      imgxurl: "../../../static/images/wuxing1.png",
      checkNormalFlag: false,
      worktitle: "上班时长",
      overtitle: "加班时长",
      areatype: "2",
      solt: [
        {
          flex: 1,
          defaultIndex: 0,
          values: [], //省份数组
          className: "slot1",
          textAlign: "center"
        }
      ]
    };
  },
  created: function() {
    laowu_main._self = this;
    laowu_main.initVue();
    laowu_main.initData();
    laowu_main.setTitle();
  },
  methods: {
    updateObject: function(v1, v2) {
      laowu_main.updateObject(v1, v2);
    }
  }
};
</script>

<style scoped>
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
  text-align: left;
}

.imgx {
  width: 20px;
  height: 20px;
}
.mui-fullscreen {
  /*大图遮罩*/
  position: fixed;
  z-index: 20;
  background-color: #000;
}
</style>