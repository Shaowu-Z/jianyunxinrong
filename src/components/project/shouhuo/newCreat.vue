
<template>
    <div class="mui-fullscreen" >
			<!-- 菜单容器 -->
			<!-- <div class="mui-off-canvas-wrap mui-draggable mui-slide-in " :class="hetongmove? 'move-left' : 'move-right'"> -->
			<mt-popup v-model="popupVisible"  position="right">
                <div class="mui-off-canvas-wrap mui-draggable mui-slide-in" ref="mui_slide">
                    <header class="mui-bar mui-bar-nav">
                        <h1 class="mui-title">选择合同</h1>
                    </header>
                    <div class="mui-scroll-wrapper" :class="tapyewu? 'listup':'listdown'">
                        <!-- <div class="mui-scroll"> -->
                            <!-- 合同类别 -->
                            <ul class="mui-table-view eg-table-view category-table" style="margin-bottom: 0;">
                                <li class="mui-table-view-cell" v-for="(n,index) in hetongx" :key="index">
                                    <a v-text="n.contractName" @click="hetongmore(n)"></a>
                                </li>
                            </ul>
                        <!-- </div> -->
                    </div>
			    </div>
            </mt-popup>
			<!-- <div id="backdrop" class="mask" @click="mask" :class="hetongmove ? 'move-leftmask' : 'move-rightmask'"></div> -->
			<!-- 主页面容器 -->

			<div class="mui-inner-wrap">
				<!-- 主页面标题 -->
				<header class="mui-bar mui-bar-nav">
					<h1 class="mui-title">收货</h1>
					<a class="mui-action-back mui-icon iconfont icon-back" style="display: none;" v-show="backicon!=0" @click="back"></a>
					<a class="mui-action-back mui-icon iconfont icon-help2 mui-pull-right" v-show="backicon==1" style="margin-left:0;display: none;"></a>
					<button class="mui-btn mui-btn-link mui-pull-right" style="margin-left:0;margin-right:0;padding-right:0;display: none;" @click="showSelectdFile" v-show="backicon==1">导入Excel</button>
					<input id="excelFile" type="file" class="upfile" style="display: none;" @click="pushexcel"  v-on:change="excelAnalysis" ref="eve"/>
				</header>
				<div class="mui-content fix_content" v-if='fixcont==1'>
					<div v-if="backicon==0">
						<div class="step step1 ">
							<ul class="mui-table-view eg-table-view">
								<li class="mui-table-view-cell mui-input-row">
									<a class="mui-navigate-right" href="#" @click="changeht">
										<label>合同名称</label>
										<input type="text" placeholder="必填" class="" name="contractName" v-model="contractName" readonly="readonly" />
									</a>
								</li>
								<li class="mui-table-view-cell mui-input-row">
									<label>购买单位</label>
									<input type="text" placeholder="必填" class="" name="companyBuyName" v-model="companyBuyName" readonly="readonly" />
								</li>
								<li class="mui-table-view-cell mui-input-row">
									<label>销售单位</label>
									<input type="text" placeholder="必填" class="" name="companySaleName" v-model="companySaleName" readonly="readonly" />
								</li>
								<li class="mui-table-view-cell mui-input-row">
									<label>到货日期</label>
									<input type="text" name="form.MissionStartDate" v-model="form.MissionStartDate" @click="danjuApi.openPicker" readonly="readonly" placeholder="请选择">
                                    <mt-datetime-picker  ref="picker"  
                                      v-model="pickerVisible"
                                      type="date"
                                      year-format="{value} 年"
                                      month-format="{value} 月"
                                      date-format="{value} 日"
                                      @confirm="danjuApi.handleConfirm"
                                      >
  
                                    </mt-datetime-picker>
								</li>
								<li class="mui-table-view-cell mui-input-row">
									<label>详细说明</label>
									<textarea class="m-block" rows="6" v-model="beizhu" placeholder="请输入说明内容…"></textarea>
								</li>
							</ul>

							<div class="btn-box">
								<button class="mui-btn mui-btn-primary mui-btn-block" @click="next(1)">下一步</button>
							</div>
						</div>
					</div>
					<div v-if="backicon==2">
						<section class="mui-content publish-box mycenter-content">
							<div class="step">
								<ul class="list-content mui-table-view tight-table-view">
									<!--<li class="mui-table-view-cell mui-input-row">
											<label>无税金额(元)</label>
											<input type="number" placeholder="选填" class="money" name="originalTotal" v-model="money1">
										</li>
										<li class="mui-table-view-cell mui-input-row">
											<label>税额(元)</label>
											<input type="number" placeholder="选填" class="money" name="taxTotal" v-model="money2">
										</li>-->
									<li class="mui-table-view-cell mui-input-row">
										<label>金额合计(元)</label>
										<input type="number" placeholder="选填" class="money" name="moneyTotal" v-model="money">
										<!--<input type="number" placeholder="选填" class="money" name="moneyTotal" v-model="moneyTotal">-->
									</li>
								</ul>
								<div class="btn-box">
									<button class="mui-btn mui-btn-primary mui-btn-block" @click="next(3)">下一步</button>
								</div>
							</div>
						</section>
					</div>
					<!-- 第四步  -->
				</div>
				<div class="mui-content fix_content" id="scrpll2">
					<div class="">
						<div v-if="backicon==3">
							<div class="step step3 ">
								<div class="publish-container">
									<div class="title">图片</div>
									<ul class="container-average container-average-img">
											<li class="img-item" v-for="(img,number) in imgs" :key="number">
												<div class="img-item-inner">
													<img v-bind:src="img.src">
												</div>
												<span class="btn-roll btn-delete" @click="danjuApi.moveimg(number+1)"></span>
											</li>
										<li class="upload-btn">
											<div class="img-item-inner mui-icon mui-icon-plusempty"><input type="file" accept="image/*" class="upimg" id="file" v-on:change="danjuApi.upfile" multiple="multiple" /></div>
										</li>
									</ul>
								</div>

								<div class="publish-container">
									<div class="title">附件</div>
									<ul class="mui-table-view mui-table-view-striped container-average container-file">
											<li class="mui-table-view-cell" v-for="(img,number) in fujians" :key="number">
												<span class="btn-roll btn-delete" @click="danjuApi.movefj(number+1)"></span>
												<div class="oa-contact-cell mui-table">
													<div class="oa-contact-avatar mui-table-cell">
														<span :class="'my-list-icon '+ danjuApi.fileType(img.name)"></span>
													</div>
													<div class="oa-contact-content mui-table-cell">
														<h4 class="oa-contact-name" v-text="img.name"></h4>
														<!--<p class="oa-contact-email"><span>196.4KB</span></p>-->
													</div>
												</div>
											</li>
										<li class="upload-btn">
											<div class="img-item-inner mui-icon mui-icon-plusempty"><input type="file" class="upfile" id="files" v-on:change="danjuApi.upfile" multiple="multiple" /></div>
										</li>
									</ul>
								</div>
								<div class="mui-table mult-btn-box">
									<div class="mui-table-cell"><button type="button" class="mui-btn mui-btn-primary" @click="initData(1)">保&nbsp;&nbsp;存</button></div>
									<div class="mui-table-cell space"></div>
									<div class="mui-table-cell"><button type="button" class="mui-btn mui-btn-primary" @click="initData(2)">提&nbsp;&nbsp;交</button></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="mui-content fix_content" id="scrpll1">
					<div class="">
						<!--------第二步---------->
						<div v-if="backicon==1">
							<section class="mui-content publish-box mycenter-content">
								<div class="step">
									<div class="list-container">
											<div class="list-item" v-for="(tab,number) in tabs" :key="number">
												<div class="list-title">收货清单（<span class="numn" v-text="number+1"></span>）<button class="mui-btn mui-btn-link"><span class="iconfont icon-delete" @click="deleat(number)"></span></button></div>
												<ul class="list-content mui-table-view tight-table-view">
													<li class="mui-table-view-cell mui-input-row">
														<label>品牌</label>
														<input type="text" placeholder="选填" name="pinpai" v-model="tab.pinpai" />
													</li>
													<li class="mui-table-view-cell mui-input-row">
														<label>规格</label>
														<input type="text" placeholder="选填" name="guigexinghao" v-model="tab.guigexinghao" />
													</li>
													<li class="mui-table-view-cell mui-input-row">
														<label>名称</label>
														<input type="text" placeholder="必填" name="mingcheng" v-model="tab.mingcheng" />
													</li>

													<li class="mui-table-view-cell mui-input-row">
														<label>单价</label>
														<input type="number" placeholder="必填" name="danjia" v-model="tab.danjia" />
														<span class="mui-badge mui-badge-inverted">元</span>
													</li>
													<li class="mui-table-view-cell mui-input-row cell-shuliang" @click="showSl(tab)">
														<!--<a class="mui-navigate-right">-->
														<label>数量</label>
														<input type="number" placeholder="必填" name="shuliang" v-model="tab.shuliang" />
														<span class="mui-icon mui-icon-clear mui-hidden"></span>
														<button @click="showUnits(number)" class="shulaingbtn">{{tab.danwei}}<span class="mui-icon mui-icon-arrowdown"></span></button>
														<!--</a>-->
													</li>
												</ul>
											</div>
										<div class="bill-more">
											<button @click="addli" class="mui-btn mui-btn-primary mui-btn-outlined"><span class="mui-icon mui-icon-plusempty"></span><span>手动添加清单</span></button>
										</div>
									</div>
									<div class="btn-box">
										<button class="mui-btn mui-btn-primary mui-btn-block" @click="next(2)">下一步</button>
									</div>
								</div>
							</section>
						</div>
						<!-- 选数量 -->
						<!--<template v-else-if="backicon==2">
							<section class="mui-content">
								<div class="singlebox mui-input-row input-row-unit">
									<input type="number" class="mui-input-clear" v-model="selectdTab.shuliang" value="" placeholder="填写数量" />
									<span class="mui-icon mui-icon-clear mui-hidden"></span>
									<button @click="showUnits()" class="mui-btn btn-unit">{{selectdTab.danwei}}<span class="mui-icon mui-icon-arrowdown"></span></button>
								</div>
							</section>
						</template>-->

						<!-- 第三步 -->

					</div>

					<!--单位-->
					<div class="pop-up" v-show="isUnitShow" style="display: none;">
						<div class="pop-title"><span class="title">选择单位</span><span class="btn-title iconfont icon-close" @click="isUnitShow=false"></span></div>
						<div class="pop-content unit-box col-xs-4 mui-clearfix">
								<span v-for="(item,index) in units" :key="index" @click="selectdUnit(item)" class="item" :class="{current : item.value==selectdTab.danwei}">
                                    <span class="con" v-text="item.value"></span>
                                </span>

						</div>
					</div>
				</div>
			</div>
		</div>
</template>
<script>
import { Picker } from 'mint-ui';
import { Popup } from 'mint-ui';
import { BackCookie } from "../../../playform/common.js";
import setting from "../../../playform/config.js";
import danjuApi from "../js/danjuAPi.js";
import tipApi from "../js/tipApi.js";
import dataBar from "../../common/dataBar"
export default {
    data () {
    return {
        imgid:[],
        fujianid:[],
        form: {
        MissionStartDate: ""
        },
        danjuApi:danjuApi,
        tipApi:tipApi,
        popupVisible:false,
        pickerVisible:'',
        id: "",
        hetongmove: false,
        userid: setting.getCookie("userid"),
        username: setting.getCookie("username"),
        units: [{
            value: "平方米"
        }, {
            value: "立方米"
        }, {
            value: "吨"
        }, {
            value: "米"
        }, {
            value: "个"
        }, {
            value: "次"
        }, {
            value: "天"
        }, {
            value: "块"
        }, {
            value: "组"
        }, {
            value: "捆"
        }, {
            value: "宗"
        }, {
            value: "项"
        }, {
            value: "株"
        }],
        isUnitShow: false,
        fixcont: 1,
        selectdTab: {},
        backicon: 0,
        tapyewu: false,
        listnumber: '',
        toImId: [],
        tabs: [],
        hetongx: [],
        //合同信息
        contractName: "",
        moneyTotal: 0,
        contractID: "",
        contractType: "",
        companyBuyName: "",
        companyBuyID: "",
        companyBuyRoomID: "",
        companyBuyRoomImID: "",
        companySaleName: "",
        companySaleID: "",
        companySaleRoomID: "",
        companySaleRoomImID: "",
        contractID: "",
        fashengDate: "",
        nowtime: "",
        sites: [],
        imgs: [],
        fujians: [],
        zrimg: [],
        zrfujian: [],
        //计数
        count: 0,
        beizhu: "",
        fapiaoTaxLv: "", //发票税率
        piao: "", //发票类型
        money: 0,
        cfgid: this.$route.query.cfgid,
        projectSn: this.$route.query.projectSn,
        isRoomId: this.$route.query.isRoomId,
        isRoomName: this.$route.query.isRoomName,
        currRoomName: this.$route.query.currRoomName,
        currRoomImId: this.$route.query.currRoomImId,
        currRoomClassName: this.$route.query.currRoomClassName,
        projectName: this.$route.query.projectName,
        projectSn: this.$route.query.projectSn,
        confirm: '',
        postType:'',
        attachmentIds: ''
    }
  },
  watch: {

        //列表监听
        tabs: {
            handler: function(newValue) {
                //console.log("change");
                $.each(newValue, function(index) {
                    this.shuliang = Number(this.shuliang)
                    this.danjia = Number(this.danjia)
                    this.money = Number(this.shuliang) *
                        Number(this.danjia)
                })
            },
            deep: true
        }
    },
    created: function() {
        danjuApi.vue = this;
    danjuApi.initVue()
					var _self = this
					var getTime = new Date()
					var nowTime = getTime.toLocaleDateString()
					var year = nowTime.split("/")[0]
					var mouth = nowTime.split("/")[1]
					var day = nowTime.split("/")[2]
					var nowshi = getTime.getHours()
					var noefen = getTime.getMinutes()
					var nowmiao = getTime.getSeconds()
					if(mouth < 10) {
						mouth = "0" + mouth
					}
					if(day < 10) {
						day = "0" + day
					}
					if(nowshi < 10) {
						nowshi = "0" + nowshi
					}
					if(noefen < 10) {
						noefen = "0" + noefen
					}
					if(nowmiao < 10) {
						nowmiao = "0" + nowmiao
					}
					_self.nowtime = nowshi + ":" + noefen + ":" +
						nowmiao
					var printTime = year + "-" + mouth + "-" + day
                    _self.printTime = printTime
                    function formDate(value) {
                        var Y,d,m,H,i,s,t
				var date = new Date(value);
				Y = date.getFullYear(), m = date.getMonth() + 1,
					d = date.getDate(), H = date.getHours(), i = date
					.getMinutes(), s = date.getSeconds();
				if(m < 10) {
					m = '0' + m;
				}
				if(d < 10) {
					d = '0' + d;
				}
				if(H < 10) {
					H = '0' + H;
				}
				if(i < 10) {
					i = '0' + i;
				}
				if(s < 10) {
					s = '0' + s;
				}
				//		<!-- 获取时间格式 2017-01-03 10:13:48 -->
				// var t = Y+'-'+m+'-'+d+' '+H+':'+i+':'+s;
				//		<!-- 获取时间格式 2017-01-03 -->
				var t = Y + '-' + m + '-' + d;
				return t;
			}
					_self.fashengDate = formDate(printTime);
					_self.form.MissionStartDate = formDate(printTime);
					//获取合同
					//获取合同
					if(this.$route.query.id != undefined) {
						this.starinfo()
					} else {
						_self.getHt()
					}
				},
				// 定义动态触发方法
				computed: {
					//					moneyTotal: function() {
					//						alert(0)
					//						var _self = this;
					//						var moneyTotal = 0;
					//						$.each(_self.tabs, function() {
					//							moneyTotal += Number(this.danjia) *
					//								Number(this.shuliang)
					//						})
					//						_self.money = moneyTotal
					//						return moneyTotal;
					//					}
                },
                mounted(){
            //         function formDate(value) {
			// 	var date = new Date(value);
			// 	Y = date.getFullYear(), m = date.getMonth() + 1,
			// 		d = date.getDate(), H = date.getHours(), i = date
			// 		.getMinutes(), s = date.getSeconds();
			// 	if(m < 10) {
			// 		m = '0' + m;
			// 	}
			// 	if(d < 10) {
			// 		d = '0' + d;
			// 	}
			// 	if(H < 10) {
			// 		H = '0' + H;
			// 	}
			// 	if(i < 10) {
			// 		i = '0' + i;
			// 	}
			// 	if(s < 10) {
			// 		s = '0' + s;
			// 	}
			// 	//		<!-- 获取时间格式 2017-01-03 10:13:48 -->
			// 	// var t = Y+'-'+m+'-'+d+' '+H+':'+i+':'+s;
			// 	//		<!-- 获取时间格式 2017-01-03 -->
			// 	var t = Y + '-' + m + '-' + d;
			// 	return t;
			// }
                },
				// 在 `methods` 对象中定义方法
				methods: {
                    pushexcel:function(){
                        // window.webactivity.setInputType(4,4,1)
                    },
					moneyTotals: function() {
						var _self = this;
						var moneyTotal = 0;
						$.each(_self.tabs, function() {
							moneyTotal += Number(this.danjia) *
								Number(this.shuliang)
						})
						_self.money = moneyTotal
						return moneyTotal;
					},
					//获取退回的数据
					starinfo: function() {
						var _self = this
						var param = {
							id: this.$route.query.id,
						}
						this.$http.post( "/contract/get_content", param).then(function(response) {
							if(response.data.code == 200) {
								console.log(response.data.result)
								var norl = JSON.parse(response.data.result.noralJson)
								var cont = JSON.parse(response.data.result.contentJson)
								var data = response.data.result
								//显示信息
								_self.contractName = norl.tablefields.contractName
								_self.companyBuyName = norl.tablefields.companyBuyName
								_self.companySaleName = norl.tablefields.companySaleName
								_self.form.MissionStartDate = norl.tablefields.dateFasheng.split(" ")[0]
								_self.beizhu = norl.tablefields.beizhu
								_self.projectSn = norl.table.projectid

								_self.tabs = norl.subtablefields

								//附件
								app.imgsrc(norl.attachment)
								//								++
								//提交信息
								_self.id = this.$route.query.id
								_self.cfgid = norl.table.id
								_self.projectSn = norl.table.projectid
								_self.isRoomId = norl.table.roomid
								_self.isRoomName = norl.table.roomname
								_self.currRoomImId = norl.currRoomImId
								_self.currRoomClassName = norl.currRoomClassName
								_self.currRoomName = norl.curRoomName
								_self.toImId.push(norl.toImid)
								_self.companyBuyID = norl.tablefields.companyBuyID
								_self.companyBuyRoomID = norl.tablefields.companyBuyRoomID
								_self.companySaleID = norl.tablefields.companySaleID
								_self.companySaleRoomID = norl.tablefields.companySaleRoomID
								_self.projectName = norl.tablefields.projectName
								_self.contractType = norl.tablefields.contractType
								_self.contractID = norl.tablefields.contractID
								_self.getHt()
							}
						})
					},
					imgsrc: function(n) {
						var _self = this
						this.$http.post( "/sass_api/ get_uploadfile_info?fileIdStr=" + n).then(function(response) {
							if(response.data.code == 200) {
								console.log(response.data.result)
								for(var i = 0; i < response.data.result.length; i++) {
									if(response.data.result[i].type == 1) { //imgs fujians name
										_self.imgs.push({
											src: response.data.result[i].thumbnailurl
										})
										_self.imgid.push(response.data.result[i].id)
									} else {
										_self.fujians.push({
											name: response.data.result[i].filename
										})
										_self.fujianid.push(response.data.result[i].id)
									}
								}

							}
						})
					},
					fileType: function(suffix) {
						var clazz = "label-";
						if(suffix && suffix.indexOf(".") > 0) {
							suffix = /\.[^\.]+$/.exec(suffix).toString()
						}
						switch(suffix) {
							case ".txt":
								clazz += "txt";
								break;
							case ".doc":
								clazz += "word";
								break;
							case ".docm":
								clazz += "word";
								break;
							case ".dotx":
								clazz += "word";
								break;
							case ".dotm":
								clazz += "word";
								break;
							case ".docx":
								clazz += "word";
								break;
							case ".rtf":
								clazz += "word";
								break;
							case ".pdf":
								clazz += "pdf";
								break;
							case ".xls":
								clazz += "excel";
								break;
							case ".ppt":
								clazz += "ppt";
								break;
							case ".pptx":
								clazz += "ppt";
								break;
							case ".xlsx":
								clazz += "excel";
								break;
							case ".xlsm":
								clazz += "excel";
								break;
							case ".xltx":
								clazz += "excel";
								break;
							case ".xltm":
								clazz += "excel";
								break;
							case ".xlsb":
								clazz += "excel";
								break;
							case ".xlam":
								clazz += "excel";
								break;
							case ".rm":
								clazz += "video";
								break;
							case ".rmvb":
								clazz += "video";
								break;
							case ".wmv":
								clazz += "video";
								break;
							case ".avi":
								clazz += "video";
								break;
							case ".mp4":
								clazz += "video";
								break;
							case ".3gp":
								clazz += "video";
								break;
							case ".mkv":
								clazz += "video";
								break;
							case ".navi":
								clazz += "video";
								break;
							case ".mov":
								clazz += "video";
								break;
							case ".asf":
								clazz += "video";
								break;
							case ".png":
								clazz += "img";
								break;
							case ".jpg":
								clazz += "img";
								break;
							case ".gif":
								clazz += "img";
								break;
							case ".zip":
								clazz += "zip";
								break;
							case ".rar":
								clazz += "zip";
								break;
							case ".arj":
								clazz += "zip";
								break;
							case ".z":
								clazz += "zip";
								break;
							case ".apk":
								clazz += "apk";
								break;
							case ".mmap":
								clazz += "mmap";
								break;
							case ".mpg":
								clazz += "mpg";
								break;
							case ".csv":
								clazz += "csv";
								break;
							case ".mpp":
								clazz += "mpp";
								break;
							case ".html":
								clazz += "html";
								break;
							case ".dwg":
								clazz += "dwg";
								break;
							default:
								clazz += "unkown";
								break;
						}
						return clazz;
					},
					/**
					 * 上一步事件
					 */
					back: function() {
						var _self = this
						console.log(_self.backicon)
						if(_self.backicon == 1) {
							_self.backicon = 0
							_self.fixcont = 1
							appApi.showBack()
						} else if(_self.backicon > 1 && _self.backicon < 2) {
							_self.backicon = _self.backicon - 1
						} else if(_self.backicon == 2) {
							_self.fixcont = 0
							$("#scrpll2").css("display", "none")
							$("#scrpll1").css("display", "block")
							_self.backicon = 1
						} else if(_self.backicon == 3) {
							$("#scrpll2").css("display", "none")
							$("#scrpll1").css("display", "block")
							_self.backicon = _self.backicon - 2
						}
					},
					/**
					 * 下一步事件
					 * @param {Object} pageIndex 页码
					 */
					next: function(pageIndex) {
						var _self = this;
						if(pageIndex == 1) {
							if(_self.contractName == '') {
                                tipApi.waring("请选择合同",2)
								// ludan("请选择合同!", 2, 1)
                                return false;
							} else {
								_self.fixcont = 0
							}
						} else if(pageIndex == 2) {
							_self.moneyTotals()
							var isNext = _self.checkTabs()
							if(!isNext) {
								return false;
							} else {
								_self.fixcont = 1
							}
						} else if(pageIndex == 3) {
							_self.fixcont = 0
							$("#scrpll1").css("display", "none")
							$("#scrpll2").css("display", "block")
						}
						appApi.hideBack()
						_self.backicon = pageIndex;

					},
					/**
					 * 打开excel选文件对话框
					 */
					showSelectdFile: function() {
						$("#excelFile").click();
					},
					/**
					 * 选择单位  
					 * @param {Object} item 清单对象
					 */
					selectdUnit: function(item) {
						var _self = this;
						//						_self.selectdTab.danwei = item.value;
						_self.selectdTab.danwei = '';
						_self.tabs[_self.listnumber].danwei = item.value
						_self.isUnitShow = false;
					},
					/**
					 * 展示所有单位
					 */
					showUnits: function(n) {
						var _self = this;
						_self.listnumber = n
						if(_self.isUnitShow)
							_self.isUnitShow = false
						else
							_self.isUnitShow = true
					},
					/**
					 * 展示选择单位页面
					 * @param {Object} tab 清单对象
					 */
					showSl: function(tab) {
						console.log(tab)
						var _self = this;
						_self.selectdTab = tab;
						//						_self.backicon = _self.backicon + 1;
					},
					/**
					 * 获取合同信息
					 */
					getHt: function() {
                        var _self = this
						this.$http
							.post(
								"/chart/column/table_w_contract?used=getContract&projectSN=" +
								_self.projectSn)
							.then(
								function(response) {
									if(response.data.code == 200) {
										console.log(response)
										_self.hetongx = response.data.result;
									} else {
										//							msg("获取云盘目录信息失败")
									}
								})
					},
					/**
					 * 弹出选择合同
					 */
					changeht: function() {
                        this.popupVisible=!this.popupVisible
                         this.hetongmove = !this.hetongmove;
                        //  if(this.hetongmove){
                        //      this.$refs.mui_slide.classList.add("move-left");
                        //      this.$refs.mui_slide.classList.remove("move-right");
                        //  }else{
                        //      this.$refs.mui_slide.classList.add("move-right");
                        //      this.$refs.mui_slide.classList.remove("move-left");
                        //  }
						// mui('.mui-off-canvas-wrap').offCanvas().show()
					},
					//excel表格解析
					//					excelAnalysis: function(e) {
					//						loading("解析中")
					//						var _self = this;
					//						var files = e.target.files;
					//						var fileReader = new FileReader();
					//						fileReader.onload = function(ev) {
					//							try {
					//								var data = ev.target.result,
					//									workbook = XLSX.read(data, {
					//										type: 'binary'
					//									}), // 以二进制流方式读取得到整份excel表格对象
					//									persons = []; // 存储获取到的数据
					//							} catch(e) {
					//								console.log('文件类型不正确');
					//								return;
					//							}
					//
					//							// 表格的表格范围，可用于判断表头是否数量是否正确
					//							var fromTo = '';
					//							// 遍历每张表读取
					//							for(var sheet in workbook.Sheets) {
					//								if(workbook.Sheets.hasOwnProperty(sheet)) {
					//									fromTo = workbook.Sheets[sheet]['!ref'];
					//									console.log(fromTo);
					//									console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]))
					//									persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
					//									// break; // 如果只取第一张表，就取消注释这行
					//								}
					//							}
					//							_self.tabs = persons
					//
					//							console.log(persons);
					//						};
					//
					//						_self.upfile(e)
					//
					//						// 以二进制方式打开文件
					//						fileReader.readAsBinaryString(files[0]);
					//					},
					//excel表格解析
					excelAnalysis: function() {
                        var e=event
						if(e.target.files[0] == null) {
							return false;
                        }
						alert("解析中")
                        console.log(event)
						var _self = this;
						var suffix = /\.[^\.]+$/.exec(e.target.files[0].name).toString()
						if(suffix == '.xlsx') {
							var files = e.target.files;
							var fileReader = new FileReader();
							fileReader.onload = function(ev) {
								console.log(ev)
								try {
									var data = ev.target.result,
										workbook = XLSX.read(data, {
											type: 'binary'
										}), // 以二进制流方式读取得到整份excel表格对象
										persons = []; // 存储获取到的数据
								} catch(e) {
									console.log('文件类型不正确');
									return;
								}
								// 表格的表格范围，可用于判断表头是否数量是否正确
								var fromTo = '';
								var excelname
								// 遍历每张表读取
								for(var sheet in workbook.Sheets) {
									if(workbook.Sheets.hasOwnProperty(sheet)) {
										fromTo = workbook.Sheets[sheet]['!ref'];
										if(JSON.stringify(XLSX.utils.sheet_to_json(workbook.Sheets[sheet])[0]).split(",")[1] != undefined) {
											excelname = JSON.stringify(XLSX.utils.sheet_to_json(workbook.Sheets[sheet])[0]).split(",")
										} else {
											excelname = []
										}
										console.log(excelname)
										excelname = excelname.toString()
										if(excelname.indexOf("mingcheng") != -1 && excelname.indexOf("guigexinghao") != -1 && excelname.indexOf("danwei") != -1 && excelname.indexOf("pinpai") != -1 && excelname.indexOf("shuliang") != -1 && excelname.indexOf("danjia") != -1) {
											persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
										} else {
                                            alert("解析中2")
											_self.excelok = 1
											alert("导入的模板格式不正确")

										}
										// break; // 如果只取第一张表，就取消注释这行
									}
								}
								_self.tabs = _self.tabs.concat(persons)
								//							console.log(persons);
							};
							danjuApi.upfile(e)

                            // 以二进制方式打开文件
							fileReader.readAsBinaryString(files[0]);
							danjuApi.upfile(e)
						} else {
                            // layer.close(loading("解析中"))
                            alert("导入的文件格式不正确")
						}

					},
					selectDate: function() {
						var _self = this
						// var dtpicker = new mui.DtPicker({
						// 	type: "date", //设置日历初始视图模式 
						// 	beginDate: new Date(2015, 04, 25), //设置开始日期 
						// 	endDate: new Date(2016, 04, 25), //设置结束日期 
						// 	labels: ['年', '月', '日'], //设置默认标签区域提示语 
						// })
						// dtpicker.show(function(e) {
						// 	_self.form.MissionStartDate = e.value
						// 	dtpicker.dispose()
						// })
					},
					//新增属性行
					addli: function() {
						var _self = this;
						_self.count++
							var tab = {
								pinpai: '',
								mingcheng: '',
								guigexinghao: "",
								danwei: '',
								danjia: '',
								shuliang: '',
								nub: _self.count
							}
						_self.tabs.push(tab)
						console.log(_self.tabs)
					},
					//删除属性行
					deleat: function(n) {
						var _self = this;
						_self.count--
							_self.tabs.splice(n, 1)
					},
					//检索属性行数据
					checkTabs: function() {
						var _self = this
						var isStatus = true;
						$.each(_self.tabs, function(index) {
							var isCue = true;
							var isname
							if(this.mingcheng == '') {
								isCue = false
								isname = "名称"
							} else if(this.danwei == '') {
								isCue = false
								isname = "单位"
							}
							//							else if(this.danjia == '') {
							//								isCue = false
							//							} 
							else if(this.shuliang == '') {
								isCue = false
								isname = "数量"
							}

							if(!isCue) {
                                tipApi.waring("请填写列表(" + (++index) + ")的" + isname + "!",2)
								// ludan("请填写列表(" + (++index) + ")的" + isname + "!", 2, 1)
								isStatus = false
							}
						})
						return isStatus;
					},
					initData: function(type) {
						//						 this.$options.methods.upfile(event)
						//获取数据
						var _self = this;
						if(type == 1) {
                            tipApi.waring("保存中")
							// ludan("保存中", 0, 1)
						} else {
                            tipApi.waring("提交中")
							// ludan("提交中", 0, 1)
						}
						//						var fjid = _self.imgid.toString()
						var fjid
						if(_self.attachmentIds == '') {
							_self.attachmentIds = ''
						} else {
							_self.attachmentIds = "," + _self.attachmentIds
						}
						if(_self.imgid.toString() == '') {
							fjid = _self.fujianid.toString()
						} else if(_self.fujianid.toString() == '') {
							fjid = _self.imgid.toString()
						} else {
							fjid = _self.imgid.toString() + "," + _self.fujianid.toString()
						}
						//						var id="5a6ecbda70474ea263ddfbb5";
						//		var uid='10392';
						var tablefield = {
							userName: decodeURI(_self.username),
							userID: _self.userid,
							dateShenqing: _self.fashengDate + " " +
								_self.nowtime, 
							dateFasheng: _self.form.MissionStartDate + " " + "00:00:00",
							projectName: _self.projectName,
							projectSN: _self.projectSn,
							contractName: _self.contractName,
							contractType: _self.contractType,
							companySaleName: _self.companySaleName,
							companySaleID: _self.companySaleID,
							companySaleRoomID: _self.companySaleRoomID,
							companyBuyName: _self.companyBuyName,
							companyBuyID: _self.companyBuyID,
							companyBuyRoomID: _self.companyBuyRoomID,
							contractID: _self.contractID,
							htTotal: _self.money,
							moneyTotal: _self.money,
							//							fapiaoTitle: _self.piao,
							//							fapiaoTaxLv: _self.fapiaoTaxLv,
							beizhu: _self.beizhu,
							confirmStatus: "确认",
							confirmPersonName: "确认人",
							confirmPersonID: "2235",
						}
						if(_self.id != '') {
							tablefield["id"] = _self.id
						}
						if(type == 2) {
							_self.confirm = '1';
                            _self.postType = '1';
						} else {
							_self.confirm = '0';
						}
						var param = {
							table: {
								id: _self.cfgid,
								projectid: _self.projectSn,
								roomid: _self.isRoomId,
								roomname: _self.isRoomName
							},
							confirm: _self.confirm,
                            postType: _self.postType ,
							attachment: fjid + _self.attachmentIds,
							toImid: _self.toImId.toString(),
							currRoomImId: _self.currRoomImId,
							currRoomClassName: _self.currRoomClassName,
							curRoomName: _self.currRoomName,
							uid: _self.userid,
							tablefields: tablefield,
							subtablefields: _self.tabs,
						}
						//alert(JSON.stringify(param))
						console.log(param)
						this.$http
							.post( "/contract/save", param)
							.then(
								function(response) {
									if(response.data.code == 200) {
										//console.log(response)
										console.log(response)
										_self.id = response.data.result.id
										_self.sites = response.data.result.tablefields;
										if(type == 2) {
                                            tipApi.close("waring")
											// layer.close(ludan("提交中", 0, 1))
                                            var titletype = encodeURIComponent(encodeURIComponent("收付款"));
                                            var title = encodeURIComponent(encodeURIComponent(decodeURI(_self.username)));
											var todojson = {
												"title": decodeURI(_self.username) + "的收货",
												"titileTwo": _self.currRoomClassName + "-" + _self.currRoomName,
												"content": "合同名称=" +
													_self.contractName +
													"|到货日期=" +
													_self.form.MissionStartDate +
													"|合计金额=" +
													_self.money + "元",
												"fileCount": "0",
												"url": 
													'/static/newwebstatic/shouhuo/transfer.html?id=' + response.data.result.id + "&formroomimid=" + _self.currRoomImId + "&fromcurrRoomName=" + _self.currRoomClassName,
												"colorString": "",
												"todoViewableMember": "0",
												"toImId": _self.toImId
													.toString(),
												"formuserid": _self.userid,
												"currentRoomImid": _self.currRoomImId,
												"chatType": "2",
												"relation": response.data.result.id,
												//"score" : "", //评分待办必要参数，设置分数
												//"confirmUrl" : "456", //有确认按钮必要参数
												//"refusedUrl" : "231", //有拒绝按钮必要参数
												"todoType": "3", //1评分待办，生成带有确认按钮待办，生成带有确认拒绝待办，必要参数
												"setButton": [{
													"type": 1, //按钮点击类型 1=请求url 2=打开url
													"name": "确认",
													"url":  "/contract/do_todobtu?type=1&pingfen=0&docid=" + _self.id + "&projectSn=" + _self.projectSn + "&userid=" + _self.userid+"&sendtype=1"
												}, {
													"type": 1, //按钮点击类型 1=请求url 2=打开url
													"name": "退回",
													"url":  "/contract/do_todobtu?type=4&pingfen=0&docid=" + _self.id + "&projectSn=" + _self.projectSn + "&userid=" + _self.userid+"&title="+title+"&titletype="+titletype+"&sendtype=1"
												}]
											}
											//alert(JSON.stringify(todojson))
											window.appApi.sendTodo(todojson, function(d) {
												//												alert(JSON.stringify(d))
												if(d.code == 200) {
                                                    tipApi.success("提交成功",2,function(){
                                                        appApi.refreshData(2);
                                                    })
                                                    
													// ludan("提交成功", 3, 2, function() {
                                                    //     appApi.refreshData(2);
													// 	/*window.appApi.closeNewWindow()*/
													// })
												}

											})
										} else {
                                            tipApi.close("waring")
                                            // layer.close(ludan("保存中", 0, 1))
                                            tipApi.success("保存成功",2)
											// ludan("保存成功", 3, 2)
										}

									} else {
										//							msg("获取云盘目录信息失败")
									}
								})
					},
					//点击遮罩层
					// mask: function() {
                    //     this.hetongmove = false;
					// 	// mui('.mui-off-canvas-wrap').offCanvas().close()
					// },
					hetongmore: function(event) {
						var _self = this
						console.log(event)
						_self.contractName = event.contractName
						_self.contractType = event.contractType
						_self.companyBuyName = event.companyBuyName
						_self.companyBuyID = event.companyBuyID
						_self.companyBuyRoomID = event.companyBuyRoomID
						_self.companyBuyRoomImID = event.companyBuyRoomImID
						_self.companySaleName = event.companySaleName
						_self.companySaleID = event.companySaleID
						_self.companySaleRoomID = event.companySaleRoomID
						_self.companySaleRoomImID = event.companySaleRoomImID
						_self.contractID = event.contractID
						_self.piao = event.fapiaoTitle
						_self.fapiaoTaxLv = event.fapiaoTaxLv
						_self.contractType = event.contractType
						if(_self.companySaleRoomImID != _self.currRoomImId) {
							_self.toImId
								.push(_self.companySaleRoomImID);
						}
						if(_self.companyBuyRoomImID != _self.currRoomImId) {
							_self.toImId
								.push(_self.companyBuyRoomImID);
                        }
                        this.popupVisible=!this.popupVisible
						// _self.mask()
					},
					//上传文件
					upfile: function(event) {
						alert("上传中")
						sessionStorage.removeItem("cunnews")
						var _self = this
						var file = document.getElementById(event.target.id).files;
						var zrid = document.getElementById(event.target.id).getAttribute("id")
						var url =  "/api/sass_api/upload_file";
						var form = new FormData();
						var forimg = []
						var forfile = []
						for(var i = 0; i < file.length; i++) {
							form.append("file", file[i]);
							//读取图片数据
							var f = document.getElementById(event.target.id).files[i];
							var imgtype = f.type.split('/')[0]
							if(zrid == "file") {
								var reader = new FileReader();
								reader.onload = function(e) {
									var data = e.target.result;
									//加载图片获取图片真实宽度和高度
									var image = new Image();
									image.onload = function() {
										var width = image.width;
										var height = image.height;

									};
									image.src = data;
									//									_self.imgs.push({
									//										src: image.src
									//									})
									forimg.push({
										src: image.src
									})
								};
								sessionStorage.setItem("cunnews", "1")
								reader.readAsDataURL(f);
							} else if(zrid == "files" || zrid == "excelFile") {
								sessionStorage.setItem("cunnews", "2")
								var na = file[i].name
								//								_self.fujians.push({
								//									name: f.name
								//								})
								forfile.push({
									name: f.name
								})
								console.log(_self.fujians)
							}
							//							reader.readAsDataURL(f);

						}
						if(sessionStorage.getItem("cunnews") == 1) {
							form.append("type", "1");
						} else {
							form.append("type", "2");
						}
						form.append("module", "contractnote");
						form.append("userid", _self.userid);
						var xhr = new XMLHttpRequest();
						xhr.open("post", url, true);
						xhr.onload = function(evt) {
							//请求完成
							//							var data = JSON.parse(evt.target.responseText);
							//							if(sessionStorage.getItem("cunnews") == 1) {
							//								_self.imgid.push(data.result.success)
							//								_self.zrimg = _self.imgid.toString().split(',')
							//							} else {
							//								_self.fujianid.push(data.result.success)
							//								_self.zrfujian = _self.fujianid.toString().split(',')
							//								console.log(_self.fujianid.toString())
							//							}
							// layer.close(loading("上传中"))
						};
						xhr.onreadystatechange = function(evt) {
							console.log(xhr)
							if(xhr.readyState == 4 && xhr.status == 200) {
								console.log(xhr.responseText);
								var data = JSON.parse(evt.target.responseText);
								// if(sessionStorage.getItem("cunnews") == 1) {
                                 //    _self.imgs = _self.imgs.concat(forimg)
                                 //    if(data.result.success.indexOf(",") == -1) {
                                 //        _self.imgid.push(data.result.success)
                                 //    } else {
                                 //        _self.imgid = _self.imgid.concat(data.result.success.split(","))
                                 //    }
                                //
                                 //    //										_self.imgid.push(data.result.success)
                                 //    console.log(_self.imgid)
                                 //    _self.zrimg = _self.imgid.toString().split(',')
                                // } else {
								// 	if(data.result.success.indexOf(",") == -1) {
								// 		_self.fujianid.push(data.result.success)
								// 	} else {
								// 		_self.fujianid = _self.fujianid.concat(data.result.success.split(","))
								// 	}
                                //
								// 	//										_self.fujianid.push(data.result.success)
								// 	_self.fujians = _self.fujians.concat(forfile)
								// 	_self.zrfujian = _self.fujianid.toString().split(',')
								// 	console.log(_self.fujianid.toString())
								// }
                                var rtnfiles = data.result.success;
                                if(sessionStorage.getItem("cunnews") == 1) {
                                    _self.imgs = _self.imgs.concat(rtnfiles)
                                    for(var i=0;i<rtnfiles.length;i++){
                                        _self.imgid.push(rtnfiles[i].fileId);
                                    }
                                    console.log(_self.imgid)
									if(_self.imgid.toString()){

                                        _self.zrimg = _self.imgid.toString().split(',')
                                    }
                                } else {
                                    for(var i=0;i<rtnfiles.length;i++){
                                        _self.fujianid.push(rtnfiles[i].fileId);
                                    }
                                    _self.fujians = _self.fujians.concat(forfile)
									if(_self.fujianid.toString()){

                                        _self.zrfujian = _self.fujianid.toString().split(',')
                                    }
                                    console.log(_self.fujianid.toString())
                                }

							} else if(xhr.readyState == 4 && xhr.status == 500) {
								msg("上传失败")
							}
						}
						xhr.onerror = function(evt) {
							//请求失败
							var data = JSON.parse(evt.target.responseText);
							console.log("data");
						};
						xhr.send(form);

					},
					moveimg: function(n) {
						var _self = this;
						console.log(n)
						this.$http.post( "/sass_api/delete_file?userId=userid&fileId=" + _self.zrimg[n - 1]).then(function(response) {
							if(response.data.code == 0) {
								console.log(response.data)
								ludan("删除成功", 1, 2)
							}
						}).catch(function(error) {
							ludan(error, 1, 3);
						})
						_self.imgid.splice(n - 1, 1)
						console.log(_self.imgid)
						console.log(_self.imgid.toString())
						//						console.log(_self.imgs)
						_self.imgs.splice(n - 1, 1)
						//						console.log(_self.imgs)
						//						console.log(n-1)
						//						console.log(_self.zrimg)
						_self.zrimg.splice(n - 1, 1)
						//						console.log(_self.zrimg)
						//						console.log(typeof JSON.stringify(_self.zrimg))
						//						console.log(_self.imgid[1])
						//						_self.imgid.remove(n-1)
					},
					movefj: function(n) {
						var _self = this;
						this.$http.post( "/sass_api/delete_file?userId=userid&fileId=" + _self.zrfujian[n - 1]).then(function(response) {
							if(response.data.code == 0) {
								console.log(response.data)
								ludan("删除成功", 1, 2)
							}
						}).catch(function(error) {
							ludan(error, 1, 3);
						})
						_self.fujianid.splice(n - 1, 1)
						_self.fujians.splice(n - 1, 1)
						//						console.log(n-1)
						_self.zrfujian.splice(n - 1, 1)
						console.log(_self.zrfujian)
						console.log(typeof JSON.stringify(_self.zrfujian))
						//						console.log(_self.imgid[1])
						//						_self.imgid.remove(n-1)
					}
				},
}
</script>
<style>

.mui-fullscreen{
    overflow: hidden;
    z-index: 1;
}
.mui-inner-wrap{
    position: absolute;
    top: 0;
    width: 100%;
}
.mui-table-view{
    height: 100%;
}
.mui-scroll-wrapper .eg-table-view{
    padding-top: 44px;
}
.mask{
    position: fixed;
    z-index: 1000;
    top: 0
}
.mui-title{
    width: 100%
}
#scrpll1{
    padding-top:0
}
.mint-popup-right{
    width: 70%;
    height: 100%;
}
.mui-table-view-cell:last-child:after, .mui-table-view-cell:last-child:before {
    height: 1px;
}
.mui-action-back{
    float: left;
}
.list-container .list-item .list-title{
    background: #fff;
    text-align: left
}
.mui-table-view-cell.mui-input-row label{
    text-align: left
}
.cell-shuliang.mui-table-view-cell.mui-input-row input {
    width: 34%;
}
.shulaingbtn {
    width: 20%;
    height: 43px;
    border: 0;
    float: right;
    text-align: right;
    margin: 5px 0;
    border-left: 1px solid #ccc;
    border-radius: 0;
}
.unit-box .item{
    float: left;
}
.title{
    text-align: left
}
.mui-fullscreen{
  background:#efeff4
}
</style>
