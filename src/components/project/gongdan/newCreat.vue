<template>
    <div class="" id="app">
			<!-- 遮盖层 -->
			<div class="mui-backdrop" style="display: none;z-index: 900;" @click="mask()"></div>

			<!--单位选择-->
			<div class="pop-up" v-show="isUnitShow" style="display: none;">
				<div class="pop-title"><span class="title">选择单位</span><span class="btn-title iconfont icon-close" @click="mask"></span></div>
				<div class="pop-content unit-box col-xs-4 mui-clearfix">
						<span  v-for="(item,index) in units" :key="index" @click="selectdUnit(item)" class="item" :class="{current : item.value==selectdTab.danwei}"><span class="con" v-text="item.value"></span></span>
				</div>
			</div>

			<!-- 主页面容器 -->

			<div class="mui-inner-wrap">
				<!-- 主页面标题 -->
				<header class="mui-bar mui-bar-nav">
					<h1 class="mui-title">工单</h1>
					<a class="mui-action-back mui-icon iconfont icon-back" style="display: none;" v-show="backicon!=0" @click="back"></a>
					<a class="mui-action-back mui-icon iconfont icon-help2 mui-pull-right" v-show="backicon==0" style="margin-left:0;display: none;"></a>
					<button class="mui-btn mui-btn-link mui-pull-right" style="margin-left:0;margin-right:0;padding-right:0;display: none;" @click="showSelectdFile" v-show="backicon==0">导入Excel</button>
					<input id="excelFile" type="file" class="upfile" style="display: none;"   @change="excelAnalysis" />
				</header>

				<div class=" fixed-bottom" v-show="backicon==0">
					<div class="mui-table mui-text-center">
						<div class="mui-table-cell"><button class="mui-btn mui-btn-primary" @click="next(1)">下一步</button></div>
					</div>
				</div>

				<div class="mui-content mui-scroll-wrapper" id="mui-scroll-wrapper">
					<div class="mui-scroll">
						<!--------第一步---------->
						<div v-if="backicon==0">
							<section style="display: block;" class="mui-content publish-box mycenter-content">
								<div class="list-container">
									<table class="table table-block table-record">
										<thead>
											<tr id="one">
												<th style="width:50%;"> 工作项</th>
												<th>数量 / 单位</th>
												<th style="width:50px;">移除</th>
											</tr>
										</thead>
										<tbody>
												<tr id="two" v-for="(tab,i) in tabs" :key="i">
													<td ><input class="tb-input" type="text" v-model="tab.mingcheng" placeholder="请输入" /></td>
													<td><input class="tb-input select-input" type="number" v-model="tab.shuliang" value="99" placeholder="请输入" /><span class="unit" @click="showUnits(tab)"><span v-text="tab.danwei"></span><span class="mui-icon mui-icon-arrowdown"></span></span>
													</td>
													<td style="width:50px;"><span class="btn-roll btn-delete" @click="deleat(i+1)"></span></td>
												</tr>
										</tbody>
									</table>
									<div class="bill-more">
										<!--<button class="mui-btn mui-btn-primary mui-btn-outlined"><span class="mui-icon mui-icon-plusempty"></span><span>手动增加一行</span></button>-->
										<div @click="addli">
											<span class="mui-icon mui-icon-plusempty"></span><span>手动增加一行</span>
										</div>
									</div>
								</div>
							</section>
						</div>

						<!--------第二步---------->
						<div v-else-if="backicon==1">
							<div class="step step2 ">
								<div class="publish-container">
									<div class="title">接收方</div>
									<ul class="mui-table-view mui-table-view-striped container-average address-item">
										<div v-if="companySaleClassName!=''">
											<li class="mui-table-view-cell">
												<span class="btn-roll btn-delete" @click="delroom"></span>
												<div class="oa-contact-cell mui-table">
													<div class="oa-contact-avatar mui-table-cell companypic">
														<p v-text="companySaleClassName.split('')[0]"></p>
													</div>
													<div class="oa-contact-content mui-table-cell">
														<h4 class="oa-contact-name" v-text="companySaleClassName"></h4>
														<p class="oa-contact-email" v-text="companySaleName"></p>
													</div>
												</div>
											</li>
										</div>
										<div v-if="companySaleClassName==''">
											<li class="upload-btn">
												<div class="img-item-inner mui-icon mui-icon-plusempty" @click="changRoom"></div>
											</li>
										</div>
									</ul>
								</div>
								<div class="btn-box">
									<button class="mui-btn mui-btn-primary mui-btn-block" @click="next(2)">下一步</button>
								</div>
							</div>
						</div>

						<!-- 第三步  -->
						<div v-else-if="backicon==2">
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
											<div class="img-item-inner mui-icon mui-icon-plusempty"><input type="file" accept="image/*" class="upimg" id="file" v-on:change="danjuApi.upfile" /></div>
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
				</div>
			</div>
</template>
<script>
import { BackCookie } from "../../../playform/common.js";
import setting from "../../../playform/config.js";
import danjuApi from "../js/danjuAPi.js";
import tipApi from "../../../playform/tipApi.js";
export default {
    data(){
        return{
            danjuApi:danjuApi,
            tipApi:tipApi,
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
						selectdTab: {},
						backicon: 0,
						tapyewu: false,
						callbackCode: "", //回调code 111 选人  222选公司
						selectdTadIndex: "", //记录请求选人的列表框下标
						hetongs: [],
                        userName: setting.getCookie("username"),
                        username:setting.getCookie("username"),
                        userID: setting.getCookie("userid"),
                        userid:setting.getCookie("userid"),
						dateShenqing: '',
						companySaleName: "",
						companySaleClassName: "",
						companySaleID: "",
						companySaleRoomImID: "",
						companySaleRoomID: "",
						companyBuyName: "",
						companyBuyClassName: "",
						companyBuyID: "",
						companyBuyRoomImID: "",
						companyBuyRoomID: "",
						beizhu: "",
						tuisongimid: "",
						contractName: "",
						tabs: [],
						toImId: [],
						money: 0,
						sites: [],
						imgs: [],
						fujians: [],
						zrimg: [],
						zrfujian: [],
						atts: [],
						confirm:"",
                        postType:'',
						reponseId: undefined,
						attachmentIds:'',
						excelok:'',

						cfgid:this.$route.query.cfgid,
						projectName: this.$route.query.projectName,
						projectSn: this.$route.query.projectSn,
						isRoomId :this.$route.query.isRoomId,
						isRoomName : this.$route.query.isRoomName,
                        currRoomImId : this.$route.query.currRoomImId,
						currRoomName : this.$route.query.currRoomName,
                        currRoomClassName:this.$route.query.currRoomClassName,
                        currRoomCreditCode:this.$route.query.currRoomCreditCode,
                        imgid:[],
                        fujianid:[]

        }
    },
    created: function() {
        danjuApi.vue = this;
    danjuApi.initVue()
						var _self = this;
						if(this.$route.query.id != undefined) {
							this.informations()
						}
						_self.getnews()
						var getTime = new Date()
						var nowyear = getTime.getUTCFullYear()
						var nowmoth = parseInt(getTime.getMonth()) + 1
						var noeday = getTime.getDate()
						var nowshi = getTime.getHours()
						var noefen = getTime.getMinutes()
						var nowmiao = getTime.getSeconds()
						if(nowmoth < 10) {
							nowmoth = "0" + nowmoth
						}
						if(noeday < 10) {
							noeday = "0" + noeday
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
						_self.dateShenqing = nowyear + "-" + nowmoth + "-" + noeday + " " + nowshi + ":" + noefen + ":" + nowmiao
						//					_self.form.MissionStartDate = formDate("2018-02-05");
						//获取合同数据
//						_self.getHt()
                    },
                    methods: {

						//退回加载数据
						informations: function() {
						var _self = this
						var param = {
							id: this.$route.query.id,
						}
						this.$http.post("/contract/get_content", param).then(function(response) {
							if(response.data.code == 200) {
								var norl = JSON.parse(response.data.result.noralJson)
								var cont = JSON.parse(response.data.result.contentJson)
								var data = response.data.result
								console.log(response.data)
								_self.contractName = norl.tablefields.contractName
//								_self.contractType = norl.tablefields.contractType
//								_self.form.MissionStartDate = norl.tablefields.dateFasheng.split(" ")[0]
//								_self.beizhu = norl.tablefields.beizhu.replace(/#.%#/g, "\n")
//								_self.xsroomclassname = norl.currRoomClassName
//								_self.xsroomname = norl.curRoomName
//								_self.xsroomclassname1 = norl.fromRoomClassName
//								_self.xsroomname1 = norl.fromRoomName
								_self.tabs = norl.subtablefields
								_self.companySaleClassName  =norl.tablefields.companySaleName
								_self.companySaleName=norl.toclassname
								console.log(norl.subtablefields)
								app.imgsrc(norl.attachment)
								//提交数据
								_self.reponseId= this.$route.query.id
								_self.id = this.$route.query.id
								_self.cfgid = norl.table.id
								_self.projectSn = norl.table.projectid
								_self.isRoomId = norl.table.roomid
								_self.isRoomName = norl.table.roomname
								 _self.companySaleRoomImID=norl.toImid
								_self.currRoomImId = norl.currRoomImId
								_self.currRoomClassName = norl.currRoomClassName
								_self.companyBuyName=norl.companyBuyName,
								_self.currRoomName = norl.curRoomName
								_self.tuisongimid = norl.toImid
								_self.companyBuyRoomID=norl.tablefields.companySaleRoomID,
								_self.companyBuyClassName=norl.tablefields.companyBuyRoomClassName,

								_self.companyBuyRoomID=norl.tablefields.companySaleRoomID,
								_self.companyBuyClassName=norl.tablefields.companyBuyRoomClassName,
								_self.isRoomId=norl.tablefields.companyBuyRoomID,
								_self.isRoomName=norl.tablefields.companyBuyName,
								_self.isRoomCreditCode=norl.tablefields.companyBuyID,
								_self.companySaleRoomID=norl.tablefields.companySaleRoomID,
								_self.companySaleName=norl.tablefields.companySaleName,
								_self.companySaleID=norl.tablefields.companySaleID,

								_self.projectName = norl.tablefields.projectName
								_self.projectSN = norl.tablefields.projectSN
								_self.projectSn = norl.table.projectid

							}
						})
					},
					imgsrc: function(n) {
						var _self = this
						if(n!=''){
						this.$http.post("/sass_api/ get_uploadfile_info?fileIdStr=" + n).then(function(response) {
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
						}
					},
						/**
						 * 选择单位
						 * @param {Object} item 清单对象
						 */
						selectdUnit: function(item) {
							var _self = this;
							_self.selectdTab.danwei = item.value
							_self.mask();
						},
						/**
						 * 删除已选单位
						 */
						delroom: function() {
							var _self = this;
							_self.companySaleClassName = "";
						},
						/**
						 * 上一步事件
						 */
						back: function() {
							var _self = this
							if(_self.backicon == 1) {
								appApi.showBack()
							}
							if(_self.backicon > 0) {
								_self.backicon = _self.backicon - 1
							}

						},
						/**
						 * 下一步事件
						 * @param {Object} pageIndex 页码
						 */
						next: function(pageIndex) {
							var _self = this;
							if(pageIndex == 1) {
								var flag = _self.checkTabs()
								if(!flag) {
									return false;
								}
							} else if(pageIndex == 2) {
								if(_self.companySaleClassName == "") {
                                    // tipApi.waring("请选择接收单位!",2)
                                    // return false;
                                    _self.backicon = pageIndex;
								}
							}
							appApi.hideBack()
							_self.backicon = pageIndex;

						},
						/**
						 * 展示所有单位
						 */
						showUnits: function(tab) {
							var _self = this;
							_self.selectdTab = tab;
							$("input").blur();
							$(".mui-backdrop").show();
							_self.isUnitShow = true
						},
						/**
						 * 打开excel选文件对话框
						 */
						showSelectdFile: function() {
							$("#excelFile").click();
						},



						//excel表格解析
					excelAnalysis: function() {
						var e=event
						if(e.target.files[0] == null) {
							return false;
						}
						tipApi.waring("解析中")
						var _self = this;
						var suffix = /\.[^\.]+$/.exec(e.target.files[0].name).toString()
						if(suffix == '.xlsx') {
							var files = e.target.files;
							var fileReader = new FileReader();
							fileReader.onload = function(ev) {
								var bytes = new Uint8Array(fileReader.result);
									var length = bytes.byteLength;
									console.log("结果",fileReader.result)
									console.log(length)
								//console.log(ev.target.result)
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
										var excelnames=excelname
										console.log(excelnames.length)
										excelname = excelname.toString()
										if(excelname.indexOf("mingcheng") != -1 && excelname.indexOf("danwei") != -1 && excelname.indexOf("shuliang") != -1 && excelnames.length===3) {
											persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
											console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]))
											// layer.close(loading("解析中"))
											_self.excelok = 0
										} else {
											// layer.close(loading("解析中"))
                                            _self.excelok = 1
                                            tipApi.waring("导入的模板格式不正确", 2)
											// ludan("导入的模板格式不正确", 2, 3)
											persons=[]
										}
										// break; // 如果只取第一张表，就取消注释这行
									}
								}
								_self.tabs = _self.tabs.concat(persons)
								//							console.log(persons);
//								fileReader.readAsBinaryString(files[0]);
								if(_self.excelok===0){
									_self.upfile(e)
								}
							};
//							_self.upfile(e)

							// 以二进制方式打开文件
								fileReader.readAsBinaryString(files[0]);


						} else {
							// layer.close(loading("解析中"))
							tipApi.closeAll()
                            tipApi.waring("导入的文件格式不正确", 2)
							// ludan("导入的文件格式不正确", 2, 3)
						}

					},
						sx: function() {
							window.location.href = window.location.href;
						},
						getnews: function() {
							var _self = this
							this.$http.post( "/pcontact_api/findroombyroomclass?roomClass=xiangmubu&projectSn=" + _self.projectSn).then(function(response) {
								if(response.data.code == 0) {
									console.log(response.data.result)
									_self.shigong = response.data.result.roomName
									_self.tuisongimid = response.data.result.roomImId
								}
							})
						},
						//检索列表数据
						checkTabs: function() {
							var _self = this
							var isStatus = true;
							$.each(_self.tabs, function(index) {
								var isCue = true;
								if(this.mingcheng == '') {
									isCue = false
								} else if(this.danwei == '') {
									isCue = false
								}
								if(!isCue) {
									if(index > 8) {
										index = index - 9
										var y = 0 - (Number($("#one").height()) + (Number($("#two").height()) * index))
										// mui('.mui-scroll-wrapper').scroll().scrollTo(0, y, 100);
									} else {
										// mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);
                                    }
                                    tipApi.waring("请将数据填写完整", 1)
									// ludan("请将数据填写完整", 1, 1)
									isStatus = false
									return isStatus;
								}
							})
							return isStatus;
						},
						initData: function(type) {
							//获取数据
							var _self = this;
							if(type==1){
                                tipApi.waring("保存中")
								// ludan("保存中",0,1)
							}else{
                                tipApi.waring("提交中")
								// ludan("提交中",0,1)
							}
//							var fjid = _self.atts.toString()
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

							$.each(_self.tabs, function() {
								this.shuliang = Number(this.shuliang)
								this.withShuliang = 0
							})

							if(type==2){
	                            _self.confirm = '1';
                                _self.postType = '1';
							}else{
	                            _self.confirm = '0';

							}
							var param = {
								table: {
									id: _self.cfgid,
									projectid: _self.projectSn,
									roomid: _self.isRoomId,
									roomname:  _self.isRoomName,
								},
								confirm: _self.confirm,
                                postType: _self.postType ,
								attachment: fjid+ _self.attachmentIds,
								currRoomImId: _self.currRoomImId,
								companyBuyName:_self.companyBuyName,
								currRoomClassName: _self.currRoomClassName,
								toclassname:_self.companySaleClassName,
								curRoomName:  _self.currRoomName,
								toImid: _self.companySaleRoomImID,
								tablefields: {
									id: _self.reponseId,
									userName: _self.userName,
									userID: _self.userID,
									roomId: _self.isRoomId,
									companySaleRoomID: _self.companyBuyRoomID,
									companyBuyRoomClassName: _self.companyBuyClassName,
									companyBuyRoomID: _self.isRoomId,
									companyBuyName: _self.isRoomName,
									companyBuyID: _self.isRoomCreditCode,
									companySaleRoomID: _self.companySaleRoomID,
									companySaleName: _self.companySaleName,
									companySaleID: _self.companySaleID,
									dateShenqing: _self.dateShenqing,
									projectName: _self.projectName,
									projectSN: _self.projectSn,
								},
								subtablefields: _self.tabs,
							}
                            console.log(param)
                            // alert(JSON.stringify(param))
							this.$http.post( "/contract/save", param).then(function(response) {
								// alert(JSON.stringify(response))
								if(response.data.code == 200) {
									console.log(response)
									_self.sites = response.data.result.tablefields;
									_self.reponseId = response.data.result.id
									if(type == 2) {
                                        tipApi.close("waring")
										// layer.close(ludan("提交中",0,1))
										_self.pushMsg()
									} else {
                                         tipApi.close("waring")
                                        // layer.close(ludan("保存中",0,1))
                                        tipApi.success("保存成功", 2)
										// ludan("保存成功", 2, 2)

									}
								} else {
									alert("推送失败")
								}
							})
						},
						/**
						 * 推送消息函数
						 */
						pushMsg: function() {
							var _self = this;
							var content = "";
							for(var i = 0; i < _self.tabs.length; i++) {
								if(i == 2) {
									break
								}
								content = content + _self.tabs[i].mingcheng + _self.tabs[i].shuliang + _self.tabs[i].danwei + "|"
							}
                            content = content + "共" + _self.tabs.length + "项"
                            var titletype = encodeURIComponent(encodeURIComponent("工单"));
                            var title = encodeURIComponent(encodeURIComponent(decodeURI(setting.getCookie("username"))+ "的工单"));
							var todojson = {
								"title": decodeURI(_self.username) + "的工单",
								"titileTwo": _self.currRoomClassName + "-" +  _self.currRoomName,
								"content": content,
								"fileCount": '0',
								"url": '/static/newwebstatic/gongdan/transfer.html?id=' + _self.reponseId,
								"todoViewableMember": "0",
								"toImId": _self.companySaleRoomImID,
								'currentRoomImid': _self.currRoomImId,
								"formuserid":  _self.userid,
								"relation": _self.reponseId,
								"chatType": "2",
								//									"confirmUrl": "456", //有确认按钮必要参数
								//									"refusedUrl": "231", //有拒绝按钮必要参数
								"todoType": "3", //1评分待办，生成带有确认按钮待办，生成带有确认拒绝待办，必要参数
								"setButton": [{
									"type": 1, //按钮点击类型 1=请求url 2=打开url
									"name": "确认",
									"url": "/contract/do_todobtu?type=1&pingfen=0&docid=" + _self.id + "&projectSn=" + _self.projectSn + "&userid=" + _self.userid+"&sendtype=1"
								}, {
									"type": 1, //按钮点击类型 1=请求url 2=打开url
									"name": "退回",
									"url":  "/contract/do_todobtu?type=4&pingfen=0&docid=" + _self.id + "&projectSn=" + _self.projectSn + "&userid=" + _self.userid+"&title="+title+"&titletype="+titletype+"&sendtype=1"
								}]
                            }
                            // alert(JSON.stringify(todojson))
							window.appApi.sendTodo(todojson, function(d) {
								//alert(JSON.stringify(d))
								if(d.code == 200) {
                                    tipApi.success("提交成功", 3,function() {
                                        appApi.refreshData(2);
										/*window.appApi.closeNewWindow()*/
									})
									// ludan("提交成功", 3, 2, function() {
                                    //     appApi.refreshData(2);
									// 	/*window.appApi.closeNewWindow()*/
									// })
								} else {
                                    tipApi.failure("推送失败", 1)
									// ludan("推送失败", 1, 2)
								}

							})
						},
						fromroom: function(CONTENT) {
							var _self = this;
							if(_self.callbackCode == 111) {
								try {
									_self.tabs[_self.selectdTadIndex].gongren = xk_util.getArrayProperty(JSON.parse(CONTENT.result), "nickName").toString()
								} catch(err) {
									alert("错误了")
									alert(err)
								}
							} else if(_self.callbackCode == 222) {
								var room = JSON.parse(CONTENT.result)
								if(room.companyId == "" || room.companyId == null) {
									_self.companySaleID = room.roomName
								} else {
									_self.companySaleID = room.companyId
								}
								_self.companySaleName = room.roomName
								_self.companySaleClassName = room.roomClassName
								_self.companySaleRoomID = room.roomId
								_self.companySaleRoomImID = room.roomImId
							}
							/*var addname = '&'
							for(var i = 0; i < JSON.parse(CONTENT.result).length; i++) {
								addname += ","
								addname += JSON.parse(CONTENT.result)[i].roomName
							}*/
							_self.tabs[_self.nuberhang].mingcheng = addname.split("$,")[1]
						},
						mask: function() {
							var _self = this;
							_self.isUnitShow = false
							$(".mui-backdrop").hide();
						},
						//选工人
						changeman: function(n) {
							var _self = this
							_self.selectdTadIndex = n;
							_self.callbackCode = 111
                            window.appApi.openProjectContactSelectPage(_self.projectSn, '', '', 1, true)
                             window.appApi.callBackFun = function(callFlag, CONTENT) {
                                if (callFlag == appApi.callBackFlag.GONGSI) {
                                _self.fromroom(CONTENT);
                                }
                            };
						},
						//选房间
						changRoom: function(n) {
							var _self = this
							_self.callbackCode = 222
                            window.appApi.openProjectContactSelectPage(_self.projectSn, '', _self.currRoomCreditCode, 3, false)
                             window.appApi.callBackFun = function(callFlag, CONTENT) {
                                if (callFlag == appApi.callBackFlag.GONGSI) {
                                _self.fromroom(CONTENT);
                                }
                            };
						},
						moveimg: function(n) {
							var _self = this;
							this.$http.post("/sass_api/delete_file?userId=userid&fileId=" + _self.zrimg[n-1]).then(function(response) {
							if(response.data.code == 0) {
                                console.log(response.data)
                                tipApi.success("删除成功",1)
								// ludan("删除成功",1,2)
							}
						}).catch(function(error) {
                            tipApi.failure(error, 1)
							// ludan(error, 1, 3);
						})
							console.log(_self.imgs)
							_self.imgs.splice(n - 1, 1)
							console.log(_self.imgs)
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
							this.$http.post( "/sass_api/delete_file?userId=userid&fileId=" + _self.zrfujian[n-1]).then(function(response) {
							if(response.data.code == 0) {
								console.log(response.data)
								// ludan("删除成功",1,2)
							}
						}).catch(function(error) {
							// ludan(error, 1, 3);
						})
							_self.fujians.splice(n - 1, 1)
							//						console.log(n-1)
							_self.zrfujian.splice(n - 1, 1)
							console.log(_self.zrfujian)
							console.log(typeof JSON.stringify(_self.zrfujian))
							//						console.log(_self.imgid[1])
							//						_self.imgid.remove(n-1)
						},
						addli: function() {
							var _self = this;
							_self.tabs.push({
								mingcheng: "",
								danwei: "",
								shuliang: "",
								withShuliang: 0,
							})
						},
						deleat: function(n) {
							var _self = this;
							_self.tabs.splice(n - 1, 1)
						},
						//上传文件
						upfile: function(event) {
							tipApi.waring("上传中")
							sessionStorage.removeItem("cunnews")
							var _self = this
							var file = document.getElementById(event.target.id).files;
							var zrid = document.getElementById(event.target.id).getAttribute("id")
							var url =  "/sass_api/upload_file";
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
											width = image.width;
											height = image.height;

										};
										image.src = data;
										forimg.push({
											src: image.src
										})
									};
									sessionStorage.setItem("cunnews", "1")
									reader.readAsDataURL(f);
								} else if(zrid == "files" || zrid == "excelFile") {
									sessionStorage.setItem("cunnews", "2")
									var na = file[i].name
									forfile.push({
										name: f.name
									})
									console.log(_self.fujians)
								}
							}
							if(sessionStorage.getItem("cunnews") == 1) {
								form.append("type", "1");
							} else {
								form.append("type", "2");
							}
							form.append("module", "laowu");
							form.append("userid",  _self.userid);
							xhr = new XMLHttpRequest();
							xhr.open("post", url, true);
							xhr.onload = function(evt) {
								//请求完成
								tipApi.closeAll()
							};
							xhr.onreadystatechange = function(evt) {
								console.log(xhr)
								if(xhr.readyState == 4 && xhr.status == 200) {
									console.log(xhr.responseText);
									var data = JSON.parse(evt.target.responseText);
									// if(sessionStorage.getItem("cunnews") == 1) {
                                    // 	_self.imgs = _self.imgs.concat(forimg)
                                    // 	_self.imgid.push(data.result.success)
                                    // 	console.log(_self.imgid)
                                    // 	_self.zrimg = _self.imgid.toString().split(',')
                                    // } else {
                                    // 	_self.fujianid.push(data.result.success)
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
									_self.atts.push(data.result.success)
									// ludan("上传成功！", 2, 2)

								} else if(xhr.readyState == 4 && xhr.status == 500) {
									// ludan("上传失败！", 2, 1)
								}
							}
							xhr.onerror = function(evt) {
								//请求失败
								// ludan("请求失败！", 2, 1)
								var data = JSON.parse(evt.target.responseText);
								console.log("data");
							};
							xhr.send(form);

						}
					},
}




</script>
<style type="text/css" scoped>
#one{
    color: #777;
}
.list-container{
    min-height: auto
}
#two td:nth-child(1){
    width: 100%;
    float: left;
}
#two td:nth-child(2),#two td:nth-child(3){
    position: relative;
}
#two td:nth-child(2) .unit{
    position: absolute;
    right: 10px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    font-size: 14px;
}
.table-record .btn-delete {
    right: initial;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
}
#two td input{
    margin-bottom: 0
}
.unit-box .item .con{
    color: #333
}
.unit-box .item{
    float: left;
}
.mui-action-back{
    float: left;
}
.table-record thead {
    border-bottom: 1px solid #eee;
}
.table-record tbody tr {
    border-bottom: 1px solid #f8f8f8;
}
.title{
    text-align: left
}
.companypic{
    width: 50px;
}
.companypic p{
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #4ba9e9;
    text-align: center;
    line-height: 36px;
    font-size: 16px;
    color: #fff;
}
.container-average-img {
  padding-top: 10px;

  overflow: auto;
}

.publish-container .container-average .img-item .btn-roll {
  top: -12px;

  right: 1px;
}

.publish-container .container-average .img-item {
  overflow: visible;
}

.add-contain .mui-btn-primary {
  padding: initial;
}
.oa-contact-email{
    text-align: left
}
.mui-pull-right{
	float: right;
}
</style>
