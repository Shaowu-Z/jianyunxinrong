<template>
  <div>
    <header class="mui-bar mui-bar-nav">
		<h1 class="mui-title">确认详情</h1>
		<button id="btn-referrer" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left hide">
			<span class="mui-icon mui-icon-back"></span>
		</button>

	</header>
   <div id="app" >


						<div v-if="select_user_type==1"><!--点工窗口-->
							<div class="pop-content select-box col-xs-6 mui-clearfix" style="min-height: 340px;height:380px;">
								<div class="mui-table mui-text-center">
									<div class="mui-table-cell"><a class=""></a></div>
									<div class="mui-table-cell"><a class="" >我记录的</a></div>
									<div v-if="selectobj!=null && selectobj.operateStatus==3" class="mui-table-cell"><a class="" v-text="select_user_name+'(已删除)'"></a></div>
									<div v-else class="mui-table-cell"><a class="" v-text="select_user_name"></a></div>
								</div>
								<div class="mui-table mui-text-center">
									<div class="mui-table-cell"><a class="">上班时长</a></div>
                                    <!--我的记录-->
									<div class="mui-table-cell" v-if="myobj!=null" >
                                        <span v-if="myobj.operateStatus!=3" class=""  v-text="myobj.workHourName"></span>
                                        <span v-if="myobj.operateStatus==3" class="" >--</span>
                                    </div>
									<div class="mui-table-cell" v-if="myobj==null">
                                        <span class=""  >--</span>
                                    </div>
                                    <!--别人的记录-->
									<div class="mui-table-cell" v-if="selectobj!=null">
                                        <span v-if="selectobj.operateStatus!=3" class=""  v-text="selectobj.workHourName"></span>
                                        <span v-if="selectobj.operateStatus==3" class="" >--</span>
                                    </div>
									<div class="mui-table-cell" v-if="selectobj==null">
                                        <span class=""  >--</span>
                                    </div>
								</div>
								<div class="mui-table mui-text-center">
									<div class="mui-table-cell"><a class="">加班时长</a></div>
                                    <!--我的记录-->
									<div class="mui-table-cell" v-if="myobj!=null">
                                        <span class="" v-if="myobj.operateStatus!=3"  v-text="myobj.overHourName"></span>
                                        <span v-if="myobj.operateStatus==3" class="" >--</span>
                                    </div>
									<div class="mui-table-cell" v-if="myobj==null"><span class=""  >--</span></div>
                                    <!--别人的记录-->
									<div class="mui-table-cell" v-if="selectobj!=null">
                                        <span class="" v-if="selectobj.operateStatus!=3"  v-text="selectobj.overHourName"></span>
                                        <span v-if="selectobj.operateStatus==3" class="" >--</span>
                                    </div>
									<div class="mui-table-cell" v-if="selectobj==null"><span class=""  >--</span></div>
								</div>
								<div class="mui-table mui-text-center">
									<div class="mui-table-cell"><a class="">点工金额</a></div>
                                    <!--我的记录-->
									<div class="mui-table-cell" v-if="myobj!=null">
                                        <span class="" v-if="myobj.operateStatus!=3"  v-text="myobj.money"></span>
                                        <span v-if="myobj.operateStatus==3" class="" >--</span>
                                    </div>
									<div class="mui-table-cell" v-if="myobj==null"><span class=""  >--</span></div>
                                    <!--别人的记录-->
									<div class="mui-table-cell" v-if="selectobj!=null">
                                        <span class="" v-if="selectobj.operateStatus!=3"  v-text="selectobj.money"></span>
                                        <span v-if="selectobj.operateStatus==3" class="" >--</span>
                                    </div>
									<div class="mui-table-cell" v-if="selectobj==null"><span class=""  >--</span></div>
								</div>
								<div class="mui-table mui-text-center">
									<div class="mui-table-cell"><a class="">工资标准</a></div>
									<div class="mui-table-cell"><a class=""></a></div>
									<div class="mui-table-cell"><a class=""></a></div>
								</div>
								<div class="mui-table mui-text-center">
									<div class="mui-table-cell"><p class="">上班时长</p></div>
                                    <!--我的记录-->
									<div class="mui-table-cell" v-if="myobj!=null">
                                        <span class=""  v-if="myobj.operateStatus!=3" v-text="myobj.workNormalHourName"></span>
                                        <span class=""  v-if="myobj.operateStatus==3" >--</span>
                                    </div>
									<div class="mui-table-cell" v-if="myobj==null"><span class=""  >--</span></div>
                                    <!--别人的记录-->
									<div class="mui-table-cell" v-if="selectobj!=null">
                                        <span class=""  v-if="selectobj.operateStatus!=3"  v-text="selectobj.workNormalHourName"></span>
                                        <span class=""  v-if="selectobj.operateStatus==3" >--</span>
                                    </div>
									<div class="mui-table-cell" v-if="selectobj==null"><span class=""  >--</span></div>
								</div>
								<div class="mui-table mui-text-center">
									<div class="mui-table-cell"><p class="">加班时长</p></div>
                                    <!--我的记录-->
									<div class="mui-table-cell" v-if="myobj!=null">
                                        <span class="" v-if="myobj.operateStatus!=3" v-text="myobj.overNormalHourName"></span>
                                        <span class=""  v-if="myobj.operateStatus==3" >--</span>
                                    </div>
									<div class="mui-table-cell" v-if="myobj==null"><span class=""  >--</span></div>
                                    <!--别人的记录-->
									<div class="mui-table-cell" v-if="selectobj!=null">
                                        <span class="" v-if="selectobj.operateStatus!=3"  v-text="selectobj.overNormalHourName"></span>
                                        <span class=""  v-if="selectobj.operateStatus==3" >--</span>
                                    </div>
									<div class="mui-table-cell" v-if="selectobj==null"><span class=""  >--</span></div>
								</div>
								<!--评分窗口-->
								<div class="mui-table mui-text-center">
									<div class="mui-table-cell" style="width:30%;">
										<a class="">评分</a><!--点工评分-->
									</div>
									<div class="mui-table-cell" v-if="selectobj!=null">
										<!--工头看到评分（可修改）-->
										<div style="display: block" v-if="selectobj.operateStatus!=3 && loginType==1" class="oa-contact-content mui-table-cell pingfen" :name="selectobj.serialNum">
											<span @click.stop="selectStarDetail(1,selectobj.serialNum);" ><img class="imgx_agree" :src="imgxurl" /></span>
											<span @click.stop="selectStarDetail(2,selectobj.serialNum);" ><img class="imgx_agree" :src="imgxurl" /></span>
											<span @click.stop="selectStarDetail(3,selectobj.serialNum);" ><img class="imgx_agree" :src="imgxurl" /></span>
											<span @click.stop="selectStarDetail(4,selectobj.serialNum);" ><img class="imgx_agree" :src="imgxurl" /></span>
											<span @click.stop="selectStarDetail(5,selectobj.serialNum);" ><img class="imgx_agree" :src="imgxurl" /></span>
										</div>
										<!--工人看到评分（不可修改）-->
										<div style="display: block"  v-if="selectobj.operateStatus!=3 && loginType==0" class="oa-contact-content mui-table-cell pingfen" :name="selectobj.serialNum">
											<span><img class="imgx_agree" :src="imgxurl" /></span>
											<span><img class="imgx_agree" :src="imgxurl" /></span>
											<span><img class="imgx_agree" :src="imgxurl" /></span>
											<span><img class="imgx_agree" :src="imgxurl" /></span>
											<span><img class="imgx_agree" :src="imgxurl" /></span>
										</div>
										<!--别人的记录已删除-->
										<div style="display: block"  v-if="selectobj.operateStatus==3" class="oa-contact-content mui-table-cell pingfen" :name="selectobj.serialNum">
											<span><img class="imgx_agree" :src="imgxurl" /></span>
											<span><img class="imgx_agree" :src="imgxurl" /></span>
											<span><img class="imgx_agree" :src="imgxurl" /></span>
											<span><img class="imgx_agree" :src="imgxurl" /></span>
											<span><img class="imgx_agree" :src="imgxurl" /></span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div v-if="select_user_type==2"><!--包工窗口-->
							<div class="pop-content select-box col-xs-6 mui-clearfix" style="height:340px;">
								<div class="mui-table mui-text-center">
									<div class="mui-table-cell"><a class=""></a></div>
									<div class="mui-table-cell"><a class="" >我记录的</a></div>
									<div v-if="selectobj!=null && selectobj.operateStatus==3" class="mui-table-cell"><a class="" v-text="select_user_name+'(已删除)'"></a></div>
									<div v-else class="mui-table-cell"><a class="" v-text="select_user_name"></a></div>
								</div>
								<div class="mui-table mui-text-center">
									<div class="mui-table-cell"><a class="">分项名称</a></div>
									<!--我的记录-->
									<div class="mui-table-cell" v-if="myobj!=null">
										<span v-if="myobj.operateStatus!=3" class=""  v-text="myobj.fenxiangName"></span>
										<span v-if="myobj.operateStatus==3" class="" >--</span>
									</div>
									<div class="mui-table-cell" v-if="myobj==null"><span class=""  >--</span></div>
									<!--别人的记录-->
									<div class="mui-table-cell" v-if="selectobj!=null">
										<span v-if="selectobj.operateStatus!=3" class=""  v-text="selectobj.fenxiangName"></span>
										<span v-if="selectobj.operateStatus==3" class="" >--</span>
									</div>
									<div class="mui-table-cell" v-if="selectobj==null"><span class=""  >--</span></div>
								</div>
								<div class="mui-table mui-text-center">
									<div class="mui-table-cell"><a class="">单价</a></div>
									<!--我的记录-->
									<div class="mui-table-cell" v-if="myobj!=null">
										<span v-if="myobj.operateStatus!=3" class=""  v-text="myobj.price"></span>
										<span v-if="myobj.operateStatus==3" class="">--</span>
									</div>
									<div class="mui-table-cell" v-if="myobj==null"><span class=""  >--</span></div>
									<!--别人的记录-->
									<div class="mui-table-cell" v-if="selectobj!=null">
										<span v-if="selectobj.operateStatus!=3" class=""  v-text="selectobj.price"></span>
										<span v-if="selectobj.operateStatus==3" class="">--</span>
									</div>
									<div class="mui-table-cell" v-if="selectobj==null"><span class=""  >--</span></div>
								</div>
								<div class="mui-table mui-text-center">
									<div class="mui-table-cell"><a class="">数量</a></div>
									<!--我的记录-->
									<div class="mui-table-cell" v-if="myobj!=null">
										<span v-if="myobj.operateStatus!=3" class=""  v-text="myobj.numberName"></span>
										<span v-if="myobj.operateStatus==3" class="" >--</span>
									</div>
									<div class="mui-table-cell" v-if="myobj==null"><span class=""  >--</span></div>
									<!--别人的记录-->
									<div class="mui-table-cell" v-if="selectobj!=null">
										<span v-if="selectobj.operateStatus!=3" class=""  v-text="selectobj.numberName"></span>
										<span v-if="selectobj.operateStatus==3" class="" >--</span>
									</div>
									<div class="mui-table-cell" v-if="selectobj==null"><span class=""  >--</span></div>
								</div>
								<div class="mui-table mui-text-center">
									<div class="mui-table-cell"><a class="">包工金额</a></div>
									<!--我的记录-->
									<div class="mui-table-cell" v-if="myobj!=null">
										<span  v-if="myobj.operateStatus!=3" class=""  v-text="myobj.money"></span>
										<span v-if="myobj.operateStatus==3" class="" >--</span>
									</div>
									<div class="mui-table-cell" v-if="myobj==null"><span class=""  >--</span></div>
									<!--别人的记录-->
									<div class="mui-table-cell" v-if="selectobj!=null">
										<span v-if="selectobj.operateStatus!=3" class="" v-text="selectobj.money"></span>
										<span v-if="selectobj.operateStatus==3" class="" >--</span>
									</div>
									<div class="mui-table-cell" v-if="selectobj==null"><span class=""  >--</span></div>
								</div>
								<!--评分窗口-->
								<div class="mui-table mui-text-center">
									<div class="mui-table-cell" style="width:30%;">
										<a class="">评分</a><!--包工评分-->
									</div>
									<div class="mui-table-cell" v-if="selectobj!=null">
										<!--工头看到评分（可修改）-->
										<div style="display: block" v-if="selectobj.operateStatus!=3 && loginType==1" class="oa-contact-content mui-table-cell pingfen" :name="selectobj.serialNum">
											<span @click.stop="selectStarDetail(1,selectobj.serialNum);" ><img class="imgx_agree" :src="imgxurl" /></span>
											<span @click.stop="selectStarDetail(2,selectobj.serialNum);" ><img class="imgx_agree" :src="imgxurl" /></span>
											<span @click.stop="selectStarDetail(3,selectobj.serialNum);" ><img class="imgx_agree" :src="imgxurl" /></span>
											<span @click.stop="selectStarDetail(4,selectobj.serialNum);" ><img class="imgx_agree" :src="imgxurl" /></span>
											<span @click.stop="selectStarDetail(5,selectobj.serialNum);" ><img class="imgx_agree" :src="imgxurl" /></span>
										</div>
										<!--工人看到评分（不可修改）-->
										<div style="display: block"  v-if="selectobj.operateStatus!=3 && loginType==0" class="oa-contact-content mui-table-cell pingfen" :name="selectobj.serialNum">
											<span><img class="imgx_agree" :src="imgxurl" /></span>
											<span><img class="imgx_agree" :src="imgxurl" /></span>
											<span><img class="imgx_agree" :src="imgxurl" /></span>
											<span><img class="imgx_agree" :src="imgxurl" /></span>
											<span><img class="imgx_agree" :src="imgxurl" /></span>
										</div>
										<!--别人的记录已删除-->
										<div style="display: block"  v-if="selectobj.operateStatus==3" class="oa-contact-content mui-table-cell pingfen" :name="selectobj.serialNum">
											<span><img class="imgx_agree" :src="imgxurl" /></span>
											<span><img class="imgx_agree" :src="imgxurl" /></span>
											<span><img class="imgx_agree" :src="imgxurl" /></span>
											<span><img class="imgx_agree" :src="imgxurl" /></span>
											<span><img class="imgx_agree" :src="imgxurl" /></span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div v-if="select_user_type==3"><!--借支窗口-->
							<div class="pop-content select-box col-xs-6 mui-clearfix" style="height:340px;">
								<div class="mui-table mui-text-center">
									<div class="mui-table-cell"><a class=""></a></div>
									<div class="mui-table-cell"><a class="" >我记录的</a></div>
									<div v-if="selectobj!=null && selectobj.operateStatus==3" class="mui-table-cell"><a class="" v-text="select_user_name+'(已删除)'"></a></div>
									<div v-else class="mui-table-cell"><a class="" v-text="select_user_name"></a></div>
								</div>
								<div class="mui-table mui-text-center">
									<div class="mui-table-cell"><a class="">借支金额</a></div>
									<!--我的记录-->
									<div class="mui-table-cell" v-if="myobj!=null">
										<span class="" v-if="myobj.operateStatus!=3" v-text="myobj.money"></span>
										<span class="" v-if="myobj.operateStatus==3" >--</span>
									</div>
									<div class="mui-table-cell" v-if="myobj==null"><span class=""  >--</span></div>
									<!--别人的记录-->
									<div class="mui-table-cell" v-if="selectobj!=null">
										<span class="" v-if="selectobj.operateStatus!=3" v-text="selectobj.money"></span>
										<span class="" v-if="selectobj.operateStatus==3">--</span>
									</div>
									<div class="mui-table-cell" v-if="selectobj==null"><span class=""  >--</span></div>
								</div>

							</div>
						</div>
						<div v-if="select_user_type==4"><!--结算窗口-->
							<div class="pop-content select-box col-xs-6 mui-clearfix" style="height:340px;">
								<div class="mui-table mui-text-center">
									<div class="mui-table-cell"><a class=""></a></div>
									<div class="mui-table-cell"><a class="" >我记录的</a></div>
									<div v-if="selectobj!=null && selectobj.operateStatus==3" class="mui-table-cell"><a class="" v-text="select_user_name+'(已删除)'"></a></div>
									<div v-else class="mui-table-cell"><a class="" v-text="select_user_name"></a></div>
								</div>
								<div class="mui-table mui-text-center">
									<div class="mui-table-cell"><a class="">结算金额</a></div>
									<!--我的记录-->
									<div class="mui-table-cell" v-if="myobj!=null">
										<span class="" v-if="myobj.operateStatus!=3"  v-text="myobj.money"></span>
										<span class="" v-if="myobj.operateStatus==3">--</span>
									</div>
									<div class="mui-table-cell" v-if="myobj==null"><span class=""  >--</span></div>
									<!--别人的记录-->
									<div class="mui-table-cell" v-if="selectobj!=null">
										<span class="" v-if="selectobj.operateStatus!=3"  v-text="selectobj.money"></span>
										<span class="" v-if="selectobj.operateStatus==3">--</span>
									</div>
									<div class="mui-table-cell" v-if="selectobj==null"><span class=""  >--</span></div>
								</div>

							</div>
						</div>

						<div class=" fixed-bottom">
							<div class="mui-table mui-text-center">
								<div v-if="myobj!=null" class="mui-table-cell"><button @click="update(myobj.id,'update',select_user_type,'todo')" class="mui-btn">修改</button></div>
								<div v-if="myobj==null" class="mui-table-cell"><button @click="update(selectobj.id,'save',select_user_type,'todo')" class="mui-btn">修改</button></div>
								<div class="mui-table-cell"><button class="mui-btn mui-btn-primary" @click="agree_confirm(selectobj,myobj)">同意</button></div>
							</div>
						</div>


		</div>
  </div>
</template>

<script>
import laowu_confirm from "./js/laowu_confirm.js";
export default {
  data() {
    return {
      form: {
        workHour: "", //正常上班几个时长算一个工(ID)
        workHourName: "", //正常上班几个时长算一个工(名称)
        overHour: "", //加班几个时长算一个工(ID)
        overHourName: "", //加班几个时长算一个工(名称)
        money: "", //每日工资(ID)
        moneyName: "", //每日工资(名称)
        gongzhongId: "",
        gongzhongName: ""
      },
      data: {
        confirmList: [],
        attrecordList: []
      },
      select_pingfen: "",
      select_name: "",
      select_user_name: "",
      select_user_type: "",
      select_flag: false,
      createTimeStr: "",
      selectobj: null,
      myobj: null,
      score: "",
      loginType: "",
      reqParams: {
        id: "",
        confirmId: "",
        userId: "",
        queryTime: "",
        queryType: "",
        queryStatus: ""
      },
      agreeParams: {
        id: "",
        confirmId: "",
        otherId: "",
        userId: "",
        name: "",
        data: "", //备用字段，不指定传的值，根据业务相应的传值
        queryStatus: "" //状态，包含多种状态值
      },
      // imghost:UPLOAD_SERVER_ADDRESS,
      imgxurl: "../../../static/images/wuxing1.png"
    };
  },
  created: function() {
      laowu_confirm._self = this;
      laowu_confirm.initVue();
      laowu_confirm.initData();
     
    
  },
 methods: {
   selectStarDetail:function(v1,v2){
     laowu_confirm.selectStarDetail(v1,v2)
   },
   update:function(v1,v2,v3,v4){
    laowu_confirm.update(v1,v2,v3,v4)
   },
 }
};
</script>

<style>
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

.address-item {
  text-align: center;
}

.product-info-box .namelist {
  margin-bottom: 15px;
}

.namelist .mui-pull-left {
  height: 33px;
  line-height: 33px;
  font-size: 18px;
  color: #000;
}

.namelist .mui-btn {
  float: right;
}

.pop-up {
  display: none;
}

.fixed-bottom {
  position: absolute;
  margin-bottom: 0;
}

.mui-clearfix .mui-table-cell {
  padding: 8px 0;
}

.zr-left {
  padding-left: 55px;
}

.imgx {
  width: 20px;
  height: 20px;
}
.imgx_agree {
  width: 25px;
  height: 25px;
}

.zr_wuxing {
  background: #fff;
  padding: 0 15px;
  border-top: 1px dashed #ccc;
}
.sign-view .mui-table-view-cell label {
  width: 30%;
}
</style>
