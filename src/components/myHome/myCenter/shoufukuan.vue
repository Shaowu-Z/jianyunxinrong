<template>
    <div class="mui-fullscreen">
    
        <!-- 侧滑导航根容器 -->
    
        <div class="mui-off-canvas-wrap mui-draggable mui-slide-in ">
    
            <!-- 菜单容器 -->
    <!-- aside -->
            <div class="mui-right" :class="hetongmove ? 'move-left' : 'move-right'">
    
                <header class="mui-bar mui-bar-nav">
    
                    <h1 class="mui-title">选择合同</h1>
    
                </header>
    
                <div class="mui-scroll-wrapper" :class="tapyewu? 'listup':'listdown'">
    
                    <div class="mui-scroll">
    
                        <!-- 合同类别 -->
    
                        <ul class="mui-table-view eg-table-view category-table" style="margin-bottom: 0;">
    
                            <li class="mui-table-view-cell" v-for="(n,index) in hetongx" :key="index">
    
                                <a v-text="n.contractName" @click="hetongmore(n)"></a>
    
                            </li>
    
                        </ul>
    
                    </div>
    
                </div>
    <!-- aside -->
            </div>
    
            <!-- <div id="backdrop" class="mui-off-canvas-backdrop" @click="mask"></div> -->
             <div id="backdrop" class="mask" @click="mask" :class="hetongmove ? 'move-leftmask' : 'move-rightmask'"></div>
    
            <!-- 主页面容器 -->
    
    
    
            <div class="mui-inner-wrap">
    
                <!-- 主页面标题 -->
    
                <header class="mui-bar mui-bar-nav">
    
                    <h1 class="mui-title">收付款</h1>
    
                    <a class="mui-action-back mui-icon iconfont icon-back" style="display: none;" v-show="backicon!=0" @click="back"></a>
    
                </header>
    
                <div class="mui-content mui-scroll-wrapper">
    
                    <div class="mui-scroll">
    
                        <div v-if="backicon==0" class="step step1">
    
                            <ul class="mui-table-view eg-table-view">
    
                                <li class="mui-table-view-cell mui-input-row">
    
                                    <label>日期</label>
    
                                    <input type="text" name="receiptDate" v-model="form.MissionStartDate" @click="app.selectDate()" readonly="readonly" placeholder="请选择">
    
                                </li>
    
                                <li class="mui-table-view-cell mui-input-row">
    
                                    <label>金额(元)</label>
    
                                    <input type="number" placeholder="选填" class="" name="companySaleName" v-model="jine" />
    
                                </li>
    
                                <li class="mui-table-view-cell mui-input-row">
    
                                    <a class="mui-navigate-right" href="#" @click="hetong">
    
                                        <label>合同名称</label>
    
                                        <input type="text" placeholder="必填" class="" name="contractName" v-model="htong" readonly="readonly" />
    
                                    </a>
    
                                </li>
    
                                <li class="mui-table-view-cell mui-input-row">
    
                                    <label>支出单位</label>
    
                                    <input type="text" placeholder="必填" class="" name="companyBuyName" v-model="companyBuyName" readonly="readonly" />
    
                                </li>
    
                                <li class="mui-table-view-cell mui-input-row">
    
                                    <label>收入单位</label>
    
                                    <input type="text" placeholder="必填" class="" name="companySaleName" v-model="companySaleName" readonly="readonly" />
    
                                </li>
    
    
    
                                <li class="mui-table-view-cell mui-input-row">
    
                                    <label>详细说明</label>
    
                                    <textarea class="m-block" rows="6" v-model="beiz" placeholder="请输入说明内容…"></textarea>
    
                                </li>
    
                            </ul>
    
    
    
                            <div class="btn-box">
    
                                <button class="mui-btn mui-btn-primary mui-btn-block" @click="jump5">下一步</button>
    
                            </div>
    
                        </div>
    
    
    
                        <!-- 第四步  -->
    
                        <div v-else-if="backicon==1">
    
                            <div class="step step3 ">
    
                                <div class="publish-container">
    
                                    <div class="title">图片</div>
    
                                    <ul class="container-average container-average-img">
    
                                        <li class="img-item" v-for="(img,number) in imgs" :key="number">
    
                                            <div class="img-item-inner">
    
                                                <img v-bind:src="img.src">
    
                                            </div>
    
                                            <span class="btn-roll btn-delete" @click="moveimg(number+1)"></span>
    
                                        </li>
    
                                        <li class="upload-btn">
    
                                            <div class="img-item-inner mui-icon mui-icon-plusempty"><input type="file" accept="image/*" class="upimg" id="file" v-on:change="upfile" multiple="multiple" /></div>
    
                                        </li>
    
                                    </ul>
    
                                </div>
    
    
    
                                <div class="publish-container">
    
                                    <div class="title">附件</div>
    
                                    <ul class="mui-table-view mui-table-view-striped container-average container-file">
    
                                        <li class="mui-table-view-cell" v-for="(img,number) in fujians" :key="number">
    
                                            <span class="btn-roll btn-delete" @click="movefj(number+1)"></span>
    
                                            <div class="oa-contact-cell mui-table">
    
                                                <div class="oa-contact-avatar mui-table-cell">
    
                                                    <span :class="'my-list-icon '+ fileType(img.name)"></span>
    
                                                </div>
    
                                                <div class="oa-contact-content mui-table-cell">
    
                                                    <h4 class="oa-contact-name" v-text="img.name"></h4>
    
                                                    <!--<p class="oa-contact-email"><span>196.4KB</span></p>-->
    
                                                </div>
    
                                            </div>
    
                                        </li>
    
                                        <li class="upload-btn">
    
                                            <div class="img-item-inner mui-icon mui-icon-plusempty"><input type="file" class="upfile" id="files" v-on:change="upfile" multiple="multiple" /></div>
    
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
    
    </div>
</template>

<script>
import { BackCookie } from '../../../playform/common.js'
import setting from '../../../playform/config.js'
    export default {
    
        data() {
    
            return {
    
                id: '',
    
                backicon: 0,
    
                tapyewu: false,
    
                // urlnews: urlnews,
    
                cfgid: this.$route.query.cfgid,
    
                projectSn: this.$route.query.projectSn,
    
                isRoomId: this.$route.query.isRoomId,
    
                isRoomName: this.$route.query.isRoomName,
    
                currRoomName: this.$route.query.currRoomName,
    
                currRoomImId: this.$route.query.currRoomImId,
    
                currRoomClassName: this.$route.query.currRoomClassName,
    
                projectName: this.$route.query.projectName,
    
                // nes: neshref,
    
                toImId: [],
    
                sites: [],
    
                pinpai: '',
    
                mingcheng: "",
    
                form: {
    
                    // 开工日期
    
                    MissionStartDate: "",
    
                },
    
                hetongx: [],
    
    
    
                //合同信息
    
                htong: "",
    
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
    
                dateShenqing: "",
    
                jine: "0",
    
                beiz: "",
    
                imgs: [],
    
                nowtime: "",
    
                fujians: [],
    
                attachmentIds: "",
    
                confirm: '',
    
                postType: '',
    
                userid: setting.getCookie("userid"),
    
                username: setting.getCookie("username"),
    
                urlnews: location.href.split("?")[1],
    
                imgid: [], //全局变量获取attachment
    
                fujianid: [], //全局变量获取attachment
    
                opt: {
    
                    "type": "date",
    
                    "beginYear": 2000,
    
                    "endYear": new Date().getFullYear() + 10
    
                },
                hetongmove:false
    
            }
    
        },
    
        mounted() {
    
            // mui.init();
    
            // mui('.mui-scroll-wrapper').scroll({
    
            //     deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    
            // });
    
            document.getElementById("backdrop").addEventListener('click', function() {
    
                //阻止默认事件
    
                // event.detail.gesture.preventDefault();
    
                // 移除手势滑动
    
                //						mui('.mui-off-canvas-wrap').offCanvas().close()
    
            });
    
            //主界面容器
    
            // document.getElementsByClassName('mui-inner-wrap')[0].addEventListener('drag', function(event) {
    
            //     event.stopPropagation();
    
            // });
    
    
    
            window.addEventListener('touchmove', function(e) {
    
                var target = e.target;
    
                if (target && target.tagName === 'TEXTAREA') { //textarea阻止冒泡
    
                    e.stopPropagation();
    
                }
    
    
    
            }, true);
    
    
    
            
    
        },
    
        created() {
            function formDate(value) {
    
                var date = new Date(value);
                var Y,d,m,H,i,s
                 Y = date.getFullYear(), m = date.getMonth() + 1,
    
                     d = date.getDate(), H = date.getHours(), i = date .getMinutes(), s = date.getSeconds();
    
                if (m < 10) {
    
                    m = '0' + m;
    
                }
    
                if (d < 10) {
    
                    d = '0' + d;
    
                }
    
                if (H < 10) {
    
                    H = '0' + H;
    
                }
    
                if (i < 10) {
    
                    i = '0' + i;
    
                }
    
                if (s < 10) {
    
                    s = '0' + s;
    
                }
    
                //		<!-- 获取时间格式 2017-01-03 10:13:48 -->
    
                // var t = Y+'-'+m+'-'+d+' '+H+':'+i+':'+s;
    
                //		<!-- 获取时间格式 2017-01-03 -->
    
                var t = Y + '-' + m + '-' + d;
    
                return t;
    
            }
            // console.log("LLLLLLL"+formDate())
            var _self = this;
    
            var getTime = new Date()
    
            var nowTime = getTime.toLocaleDateString()
    
            var year = nowTime.split("/")[0]
    
            var mouth = nowTime.split("/")[1]
    
            var day = nowTime.split("/")[2]
    
            var nowshi = getTime.getHours()
    
            var noefen = getTime.getMinutes()
    
            var nowmiao = getTime.getSeconds()
    
            if (mouth < 10) {
    
                mouth = "0" + mouth
    
            }
    
            if (day < 10) {
    
                day = "0" + day
    
            }
    
            _self.$data.nowtime = nowshi + ":" + noefen + ":" +
    
                nowmiao
    
            var printTime = year + "-" + mouth + "-" + day
    
            _self.form.MissionStartDate = formDate(printTime);
    
            _self.$data.dateShenqing = formDate(printTime);
    
            //获取合同
    
            if (this.$route.query.id != undefined) {
    
                this.starinfo()
    
            } else {
    
                _self.getHt()
    
            }
    
    
    
        },
        methods:{
            
					//获取退回的数据
					starinfo: function() {
						var _self = this
						var param = {
							id: paramMap.id,
						}
						this.$http.post( "/contract/get_content", param).then(function(response) {
							if(response.data.code == 200) {
								console.log(response.data.result)
								var norl = JSON.parse(response.data.result.noralJson)
								var cont = JSON.parse(response.data.result.contentJson)
								var data = response.data.result
								//页面上显示信息
								_self.$data.form.MissionStartDate = norl.tablefields.dateFasheng.split(" ")[0]
								_self.$data.jine = norl.tablefields.money
								_self.$data.htong = norl.tablefields.contractName
								_self.$data.companyBuyName = norl.tablefields.companyBuyName
								_self.$data.companySaleName = norl.tablefields.companySaleName
								_self.$data.beiz = norl.tablefields.beizhu
								//附件
								_self.imgsrc(norl.attachment)
								//提交信息
								_self.$data.id = paramMap.id
								_self.$data.cfgid = norl.table.id
								_self.$data.projectSn = norl.table.projectid
								_self.$data.isRoomId = norl.table.roomid
								_self.$data.isRoomName = norl.table.roomname

								_self.$data.currRoomImId = norl.currRoomImId
								_self.$data.currRoomClassName = norl.currRoomClassName
								_self.$data.currRoomName = norl.curRoomName
								_self.$data.toImId.push(norl.toImid)

								_self.$data.fapiaoTaxLv = norl.tablefields.fapiaoTaxLv
								_self.$data.piao = norl.tablefields.fapiaoTitle
								_self.$data.projectName = norl.tablefields.projectName
								_self.$data.companyBuyID = norl.tablefields.companyBuyID
								_self.$data.companyBuyRoomID = norl.tablefields.companyBuyRoomID
								_self.$data.companySaleID = norl.tablefields.companySaleID
								_self.$data.companySaleRoomID = norl.tablefields.companySaleRoomID
								_self.$data.contractType = norl.tablefields.contractType
								_self.$data.contractID = norl.tablefields.contractID,

									_self.getHt()
							}
						})
					},
					imgsrc: function(n) {
						var _self = this
						this.$http.post("/sass_api/ get_uploadfile_info?fileIdStr=" + n).then(function(response) {
							if(response.data.code == 200) {
								console.log(response.data.result)
								for(var i = 0; i < response.data.result.length; i++) {
									if(response.data.result[i].type == 1) { //imgs fujians name
										_self.$data.imgs.push({
											src: response.data.result[i].longurl
										})
										imgid.push(response.data.result[i].id)
									} else {
										_self.$data.fujians.push({
											name: response.data.result[i].filename
										})
										fujianid.push(response.data.result[i].id)
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
						if(_self.$data.backicon == 1) {
							appApi.showBack()
						}
						if(_self.$data.backicon > 0) {
							_self.$data.backicon = _self.$data.backicon - 1
						}

					},
					selectDate: function(t) {
						var _self = this
						// var dtpicker = new mui.DtPicker({
						// 	type: "date", //设置日历初始视图模式 
						// 	beginDate: new Date(2015, 04, 25), //设置开始日期 
						// 	endDate: new Date(2016, 04, 25), //设置结束日期 
						// 	labels: ['年', '月', '日'], //设置默认标签区域提示语 
						// })
						// dtpicker.show(function(e) {
						// 	_self.$data.form.MissionStartDate = e.value
						// 	dtpicker.dispose()
						// })
					},
					initData: function(type) {
						//获取数据
						var _self = this;
						if(type == 1) {
							ludan("保存中", 0, 1)
						} else {
							ludan("提交中", 0, 1)
						}
						var fjid
						if(_self.$data.attachmentIds == '') {
							_self.$data.attachmentIds = ''
						} else {
							_self.$data.attachmentIds = "," + _self.$data.attachmentIds
						}
						if(imgid.toString() == '') {
							fjid = fujianid.toString()
						} else if(fujianid.toString() == '') {
							fjid = imgid.toString()
						} else {
							fjid = imgid.toString() + "," + fujianid.toString()
						}
						//						var id="5a6ecbda70474ea263ddfbb5";
						//						var uid='10392';
						if(_self.$data.jine == '') {
							_self.$data.jine = 0
						}
						var tablefield = {
							userName: decodeURI(username),
							userID: userid,
							dateShenqing: _self.$data.dateShenqing +
								" 00:00:00",
							projectName: _self.$data.projectName,
							projectSN: _self.$data.projectSn,
							contractName: _self.$data.htong,
							contractType: _self.$data.contractType,
							companySaleName: _self.$data.companySaleName,
							companySaleID: _self.$data.companySaleID,
							companySaleRoomID: _self.$data.companySaleRoomID,
							companyBuyName: _self.$data.companyBuyName,
							companyBuyID: _self.$data.companyBuyID,
							companyBuyRoomID: _self.$data.companyBuyRoomID,
							money: parseFloat(_self.$data.jine),
							htTotal: _self.$data.jine,
							fapiaoTitle: _self.$data.piao,
							fapiaoTaxLv: _self.$data.fapiaoTaxLv,
							dateFasheng: _self.form.MissionStartDate +
								" " + _self.$data.nowtime,
							beizhu: _self.$data.beiz,
							confirmStatus: "",
							confirmPersonName: "",
							confirmPersonID: "",
							contractType: _self.$data.contractType,
							contractID: _self.$data.contractID,
						}
						if(_self.$data.id != '') {
							tablefield["id"] = _self.$data.id
						}
						if(type == 2) {
							_self.$data.confirm = '1';
                            _self.$data.postType = '1';
						} else {
							_self.$data.confirm = '0';
						}
						var param = {
							table: {
								id: _self.$data.cfgid,
								projectid: _self.$data.projectSn,
								roomid: _self.$data.isRoomId,
								roomname: _self.$data.isRoomName
							},
							confirm: _self.$data.confirm,
                            postType: _self.$data.postType ,
							attachment: fjid + _self.$data.attachmentIds,
							toroomimid: _self.$data.toImId.toString(),
							currRoomImId: _self.$data.currRoomImId,
							currRoomClassName: _self.$data.currRoomClassName,
							curRoomName: _self.$data.currRoomName,
							toImid: _self.$data.toImId.toString(),
							tablefields: tablefield,
							subtablefields: [],
						}
						//alert(JSON.stringify(param))
						console.log(param);
						this.$http.post( "/contract/save", param).then(
							function(response) {
								//alert(JSON.stringify(response));
								if(response.data.code == 200) {
									//console.log(response)
									_self.$data.id = response.data.result.id
									_self.$data.sites = response.data.result.tablefields;
                                    var titletype = encodeURIComponent(encodeURIComponent("收付款"));
                                    var title = encodeURIComponent(encodeURIComponent(decodeURI(username)));
									var todojson = {
										"title": decodeURI(username) + "的收付款",
										"titileTwo": _self.$data.currRoomClassName + "-" + _self.$data.currRoomName,
										"content": "名称=" +
											_self.$data.htong +
											//											"|日期=" +
											//											_self.form.MissionStartDate +
											"|金额=" +
											_self.$data.jine + "元",
										"fileCount": "0",
										"url": getUrl() + '/static/newwebstatic/shoufukuan/transfer.html?id=' + response.data.result.id,
										"colorString": "",
										"todoViewableMember": "0",
										"toImId": _self.$data.toImId
											.toString(),
										"formuserid": userid,
										"currentRoomImid": _self.$data.currRoomImId,
										"chatType": "2",
										"relation": response.data.result.id,
										//"score" : "", //评分待办必要参数，设置分数
										//"confirmUrl" : "456", //有确认按钮必要参数
										//"refusedUrl" : "231", //有拒绝按钮必要参数
										"todoType": "3", //1评分待办，生成带有确认按钮待办，生成带有确认拒绝待办，必要参数
										"setButton": [{
											"type": 1, //按钮点击类型 1=请求url 2=打开url
											"name": "确认",
											"url": getUrl() + "/contract/do_todobtu?type=1&pingfen=0&docid=" + _self.$data.id + "&projectSn=" + _self.$data.projectSn + "&userid=" + userid+"&sendtype=1"
										}, {
											"type": 1, //按钮点击类型 1=请求url 2=打开url
											"name": "退回",
											"url": getUrl() + "/contract/do_todobtu?type=4&pingfen=0&docid=" + _self.$data.id + "&projectSn=" + _self.$data.projectSn + "&userid=" + userid+"&title="+title+"&titletype="+titletype+"&sendtype=1"
										}]
									}
									console.log(JSON.stringify(todojson))
									if(type == 2) {
										layer.close(ludan("提交中", 0, 1))
										window.appApi.sendTodo(todojson, function(d) {
											//											alert(JSON.stringify(d))
											if(d.code == 200) {
												ludan("提交成功", 3, 2, function() {
                                                    appApi.refreshData(2);
													/*window.appApi.closeNewWindow()*/
												})
											}

										})
									} else {
										layer.close(ludan("保存中", 0, 1))
										ludan("保存成功", 3, 2)
									}
								} else {
									//							msg("获取云盘目录信息失败")
								}
							})
					},
					//点击遮罩层
					mask: function() {
                        this.hetongmove=false
						// mui('.mui-off-canvas-wrap').offCanvas().close()
					},
					/**
					 * 获取合同
					 */
					getHt: function() {
						var _self = this
						this.$http.post("/chart/column/table_w_contract?used=getContract&projectSN=" +
								_self.$data.projectSn)
							.then(
								function(response) {
									if(response.data.code == 200) {
                                        _self.hetongx = response.data.result;
                                        console.log(":::::::::::0"+ response.data.result )
                                        
									} else {
										//							msg("获取云盘目录信息失败")
									}
								})
					},
					hetong: function() {
						var _self = this
                        // mui('.mui-off-canvas-wrap').offCanvas().show()
                        this.hetongmove=!this.hetongmove
                        // document.getElementsByClassName("mui-right")[0].className ="mui-right move-left"
						// console.log(getUrl() + "/chart/column/table_w_contract?used=getContract&projectSN=" + _self.$data.projectSn)
					},
					moveimg: function(n) {
						var _self = this;
						console.log(n)
						this.$http.post("/sass_api/delete_file?userId=userid&fileId=" + _self.$data.zrimg[n - 1]).then(function(response) {
							if(response.data.code == 0) {
								console.log(response.data)
								ludan("删除成功", 1, 2)
							}
						}).catch(function(error) {
							ludan(error, 1, 3);
						})
						imgid.splice(n - 1, 1)
						console.log(imgid)
						console.log(imgid.toString())
						//						console.log(_self.$data.imgs)
						_self.$data.imgs.splice(n - 1, 1)
						//						console.log(_self.$data.imgs)
						//						console.log(n-1)
						//						console.log(_self.$data.zrimg)
						_self.$data.zrimg.splice(n - 1, 1)
						//						console.log(_self.$data.zrimg)
						//						console.log(typeof JSON.stringify(_self.$data.zrimg))
						//						console.log(imgid[1])
						//						imgid.remove(n-1)
					},
					movefj: function(n) {
						var _self = this;
						this.$http.post(  "/sass_api/delete_file?userId=userid&fileId=" + _self.$data.zrfujian[n - 1]).then(function(response) {
							if(response.data.code == 0) {
								console.log(response.data)
								ludan("删除成功", 1, 2)
							}
						}).catch(function(error) {
							ludan(error, 1, 3);
						})
						fujianid.splice(n - 1, 1)
						_self.$data.fujians.splice(n - 1, 1)
						//						console.log(n-1)
						_self.$data.zrfujian.splice(n - 1, 1)
						console.log(_self.$data.zrfujian)
						console.log(typeof JSON.stringify(_self.$data.zrfujian))
						//						console.log(imgid[1])
						//						imgid.remove(n-1)
					},
					hetongmore: function(event) {
                        var _self = this
                        this.hetongmove=false
						console.log(event)
						_self.$data.htong = event.contractName
						_self.$data.contractType = event.contractType
						_self.$data.companyBuyName = event.companyBuyName
						_self.$data.companyBuyID = event.companyBuyID
						_self.$data.companyBuyRoomID = event.companyBuyRoomID
						_self.$data.companyBuyRoomImID = event.companyBuyRoomImID
						_self.$data.companySaleName = event.companySaleName
						_self.$data.companySaleID = event.companySaleID

						_self.$data.contractID = event.contractID
						_self.$data.companySaleRoomID = event.companySaleRoomID
						_self.$data.companySaleRoomImID = event.companySaleRoomImID
						_self.$data.contractID = event.contractID
						_self.$data.piao = event.fapiaoTitle
						_self.$data.fapiaoTaxLv = event.fapiaoTaxLv
						if(_self.$data.companySaleRoomImID != _self.$data.currRoomImId) {
							_self.$data.toImId
								.push(_self.$data.companySaleRoomImID);
						}
						if(_self.$data.companyBuyRoomImID != _self.$data.currRoomImId) {
							_self.$data.toImId
								.push(_self.$data.companyBuyRoomImID);
						}
						_self.mask()
					},
					jump5: function() {
						var _self = this
						if(_self.$data.htong == "") {
                            layer.open({
		                    content:"请选择合同"
		                    ,skin: 'msg'
		                    ,time: 2 //2秒后自动关闭
		                });
							// ludan("请选择合同", 2, 1)
						} else {
							appApi.hideBack()
							_self.$data.backicon = 1;
						}
					},
					jump1: function() {
						$(".section1").css("display", "block")
						$(".section1").siblings("section").css("display","none")
					},
					//上传文件
					upfile: function(event) {
						loading("上传中")
						sessionStorage.removeItem("cunnews")
						var _self = this
						var file = document.getElementById(event.target.id).files;
						var zrid = document.getElementById(event.target.id).getAttribute("id")
						var url = getUrl() + "/sass_api/upload_file";
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
									//									_self.$data.imgs.push({
									//										src: image.src
									//									})
									forimg.push({
										src: image.src
									})
								};
								sessionStorage.setItem("cunnews", "1")
								reader.readAsDataURL(f);
							} else if(zrid == "files") {
								sessionStorage.setItem("cunnews", "2")
								var na = file[i].name
								//								_self.$data.fujians.push({
								//									name: f.name
								//								})
								forfile.push({
									name: f.name
								})
								console.log(_self.$data.fujians)
							}
							//							reader.readAsDataURL(f);

						}
						if(sessionStorage.getItem("cunnews") == 1) {
							form.append("type", "1");
						} else {
							form.append("type", "2");
						}
						form.append("module", "contractnote");
						form.append("userid", userid);
						xhr = new XMLHttpRequest();
						xhr.open("post", url, true);
						xhr.onload = function(evt) {
							//请求完成
							//							var data = JSON.parse(evt.target.responseText);
							//							if(sessionStorage.getItem("cunnews") == 1) {
							//								imgid.push(data.result.success)
							//								_self.$data.zrimg = imgid.toString().split(',')
							//							} else {
							//								fujianid.push(data.result.success)
							//								_self.$data.zrfujian = fujianid.toString().split(',')
							//								console.log(fujianid.toString())
							//							}
							layer.close(loading("上传中"))
						};
						xhr.onreadystatechange = function(evt) {
							console.log(xhr)
							if(xhr.readyState == 4 && xhr.status == 200) {
								console.log(xhr.responseText);
								var data = JSON.parse(evt.target.responseText);
								if(sessionStorage.getItem("cunnews") == 1) {
									_self.$data.imgs = _self.$data.imgs.concat(forimg)
									if(data.result.success.indexOf(",") == -1) {
										imgid.push(data.result.success)
									} else {
										imgid = imgid.concat(data.result.success.split(","))
									}
									//										imgid.push(data.result.success)
									console.log(imgid)
									_self.$data.zrimg = imgid.toString().split(',')
								} else {
									if(data.result.success.indexOf(",") == -1) {
										fujianid.push(data.result.success)
									} else {
										fujianid = fujianid.concat(data.result.success.split(","))
									}
									//										fujianid.push(data.result.success)
									_self.$data.fujians = _self.$data.fujians.concat(forfile)
									_self.$data.zrfujian = fujianid.toString().split(',')
									console.log(fujianid.toString())
								}
								ludan("上传成功", 1, 2)
							} else if(xhr.readyState == 4 && xhr.status == 500) {
								ludan("上传失败", 1, 1)
							}
						}
						xhr.onerror = function(evt) {
							ludan("请求失败", 1, 1)
							//请求失败
							var data = JSON.parse(evt.target.responseText);
							console.log("data");
						};
						xhr.send(form);

					},
				
        }
    
    
    
    }
</script>

<style>
    body {
    
        background: #efeff4;
    
    }
    
    
    
    .mui-off-canvas-right {
    
        background: #fff;
    
    }
    
    
    
    .oa-contact-avatar p,
    
    .oa-contact-avatar .oa-pic-default {
    
        display: block;
    
        width: 40px;
    
        height: 40px;
    
        background: #4ba9e9;
    
        border-radius: 50%;
    
        text-align: center;
    
        line-height: 40px;
    
        color: #fff;
    
        font-size: 18px;
    
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
    
    
    
    
    
    /*.mui-scroll-wrapper{
    
    				margin-top: 44px;
    
    			}*/
    
    
    
    .add-contain {
    
        opacity: 0;
    
    }
    
    
    
    .listup {
    
        z-index: 1000;
    
        animation: listup .4s, 0ms ease;
    
        animation-fill-mode: forwards;
    
    }
    
    
    
    @keyframes listup {
    
        from {
    
            margin-top: 44px
    
        }
    
        to {
    
            margin-top: 106px
    
        }
    
    }
    
    
    
    .listdown {
    
        z-index: 1000;
    
        animation: listdown .4s, 0ms ease;
    
        animation-fill-mode: forwards;
    
    }
    
    
    
    @keyframes listdown {
    
        from {
    
            margin-top: 106px
    
        }
    
        to {
    
            margin-top: 44px
    
        }
    
    }
    
    
    
    .yewuup {
    
        z-index: 998;
    
        animation: yewuup .1s, 100ms ease;
    
        animation-fill-mode: forwards;
    
    }
    
    
    
    @keyframes yewuup {
    
        from {
    
            opacity: 0
    
        }
    
        to {
    
            opacity: 1
    
        }
    
    }
    
    
    
    .yewudown {
    
        z-index: 998;
    
        animation: yewudown .6s, 100ms ease;
    
        animation-fill-mode: forwards;
    
    }
    
    
    
    @keyframes yewudown {
    
        from {
    
            opacity: 1
    
        }
    
        to {
    
            opacity: 0
    
        }
    
    }
    .mui-table-view-cell label, .singlebox label,.publish-container .title{
        text-align: left;
    }
    .mui-bar-nav.mui-bar .mui-icon{
        position: absolute;
        left: 0;
    }
    .mui-right{
        height: 100%;
        width: 70%;
        position: absolute;
        z-index: 9;
        opacity: 1;
        transform: translate3d(143%, 0, 0) ;
    }
    .mui-scroll-wrapper{
        overflow: scroll;
    }
    .move-left{
        transform: translate3d(43%, 0, 0) ;  
        transition: all 0.75s;
    }
    .move-right{
        transform: translate3d(143%, 0, 0) ;  
        transition: all 0.75s;
    }
    .move-leftmask{
        opacity: 0.6;
        display: block;
        z-index: 8
    }
    .move-rightmask{
        opacity: 0;
        display: none;
        z-index: 8;
    }
</style>
