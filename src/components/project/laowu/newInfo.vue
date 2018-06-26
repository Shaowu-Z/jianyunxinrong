<template>
    <div id="app">
			<header class="mui-bar mui-bar-nav">
				<h1 class="mui-title">报量</h1>
				<a class="mui-action-back mui-icon iconfont icon-back"></a>
				<!--<button class="mui-btn mui-btn-link mui-pull-right">编辑</button>-->
			</header>
			<div v-for="(n,index) in jieshou" :key="index">
				<div class="fixed-bottom" v-if="qianshou==1">
					<div v-if="userId==creatorId">
						<div class="mui-table mui-text-center v-line-half">
							<div class="mui-table-cell">
								<button type="button" class="mui-btn mui-btn-link" @click="pin">评论</button>
							</div>
						</div>
					</div>
					<div v-else>
						<div v-if="okshow==1">
							<div class="mui-table mui-text-center v-line-half">
								<div class="mui-table-cell">
									<button type="button" class="mui-btn mui-btn-link" @click="pin">评论</button>
								</div>
							</div>
						</div>
						<div v-else>
							<div class="mui-table mui-text-center v-line-half">
								<div class="mui-table-cell"><button class="mui-btn mui-btn-link" @click="yes">确认</button></div>
								<div class="mui-table-cell"><button class="mui-btn mui-btn-link" @click="no">退回</button></div>
								<div class="mui-table-cell"><button class="mui-btn mui-btn-link" @click="pin">评论</button></div>
							</div>
						</div>
					</div>
				</div>
				<div class="fixed-bottom" v-else>
					<div class="mui-table mui-text-center v-line-half">
						<div class="mui-table-cell">
							<button type="button" class="mui-btn mui-btn-link" @click="pin">评论</button>
						</div>
					</div>
				</div>

			</div>
			<div v-if="okshow==1 || confirm==2">
				<!-- <img class="zhuangtai" src="../../images/approval-by.png" /> -->
			</div>

			<section class="mui-content show-contain">
				<div class="show-item">
					<ul class="mui-table-view mui-table-view-striped user-box">
						<li class="mui-table-view-cell">
							<div class="oa-contact-cell mui-table">
								<div class="oa-contact-avatar mui-table-cell">
									<img v-bind:src="creatorpic" >
								</div>
								<div class="oa-contact-content mui-table-cell">
									<h4 class="oa-contact-name"><span v-text="content.userName"></span><span class="secondary mui-pull-right" style="color:#aaa" v-text="content.createDate"></span></h4>
									<p class="oa-contact-email"><span v-text="fromRoomClass"></span>&nbsp;&nbsp;<span v-text="fromRoomName"></span></p>
								</div>
							</div>
						</li>
					</ul>
				</div>

				<div class="show-item">
					<dl class="item">
						<dt class="label">报量区间</dt>
						<dd class="con" v-text="content.startDate.split(' ')[0]+' 至 '+content.endDate.split(' ')[0]"></dd>
					</dl>
					<!--<dl class="item">
						<dt class="label">结束日期</dt>
						<dd class="con" v-text="content.endDate.split(' ')[0]"></dd>
					</dl>-->
					<dl class="item">
						<dt class="label">专业</dt>
						<dd class="con" v-text="content.zhuanye">
							<div v-if="content.zhuanye=='' || content.zhuanye==null">
								无
							</div>
						</dd>
					</dl>
					<dl class="item">
						<dt class="label">报量给</dt>
						<dd class="con">
							<ul class="mui-table-view mui-table-view-striped container-average address-item">
								<li class="mui-table-view-cell" v-for="(n,index) in jieshou" :key="index">
									<div class="oa-contact-cell mui-table">
										<div class="oa-contact-avatar mui-table-cell">
											<img v-bind:src="n.icon" />
										</div>
										<div class="oa-contact-content mui-table-cell">
											<h4 class="oa-contact-name" v-text="n.roomName"></h4>
											<div class="oa-contact-email">
												<div v-if="userId==creatorId">
													<span class="sta " v-if="n.signStatus==1">已签收</span>
													<span class="sta " v-else-if='n.signStatus==0'>未签收</span>
												</div>
												<div v-if="userId!=creatorId">
													<div v-if="n.roomId==currroomid">
														<span class="sta ">已签收</span>
													</div>
													<div v-else-if="n.roomId!=currroomid">
														<span class="sta" v-if="n.signStatus==1">已签收</span>
														<span class="sta" v-else-if='n.signStatus==0'>未签收</span>
													</div>
												</div>
												&nbsp;&nbsp;&rarr;&nbsp;&nbsp;
												<span class="sta" v-if="n.confirmStatus==1">已确认</span>
												<span class="sta" v-else>未确认</span>
											</div>
										</div>
									</div>
								</li>
							</ul>
						</dd>
					</dl>
				</div>

				<div class="show-item">
					<dl class="item">
						<dt class="label">报量清单</dt>
						<dd class="con">
							<table class="table table-block table-record" style="margin-top:-5px;">
								<thead>
									<tr>
										<th>工作项</th>
										<th>数量/单位</th>
									</tr>
								</thead>
								<tbody>
										<tr id="two" v-for="(tab,i) in qingdan" :key="i">
											<td align="center" style="width:50%;" v-text="tab.mingcheng"></td>
											<td align="center" v-text="tab.shuliang + ' '+ tab.danwei"></td>
										</tr>
								</tbody>
							</table>
						</dd>
					</dl>
				</div>

				<!--<div class="show-item">
					<section style="display: block;" class="mui-content publish-box mycenter-content">
						<div class="list-container">
							<table class="table table-block table-record">
								<thead>
									<tr id="one">
										<th style="width:50%;"> 工作项</th>
										<th>数量 / 单位</th>
									</tr>
								</thead>
								<tbody>
									<div v-for="(tab,i) in qingdan">
										<tr id="two">
											<td style="width:50%;"><input class="tb-input" type="text" v-model="tab.mingcheng" readonly="readonly" /></td>
											<td><input class="tb-input select-input" type="number" v-model="tab.shuliang" value="99" readonly="readonly" /><span class="unit" @tap="showUnits(tab)"><span v-text="tab.danwei"></span></span>
											</td>
										</tr>
									</div>
								</tbody>
							</table>
						</div>
					</section>
				</div>-->

				<!--<div class="show-item">
					<dl class="item">
						<dt class="label">接收方</dt>
						<dd class="con">
							<ul class="mui-table-view mui-table-view-striped container-average address-item">
								<li class="mui-table-view-cell" v-for="n in jieshou">
									<div class="oa-contact-cell mui-table">
										<div class="oa-contact-avatar mui-table-cell">
											<img v-bind:src="geturl+n.icon" />
										</div>
										<div class="oa-contact-content mui-table-cell">
											<h4 class="oa-contact-name" v-text="n.roomName"></h4>
											<p class="oa-contact-email">
												<div v-if="userId==creatorId">
													<span class="sta " v-if="n.signStatus==1">已签收</span>
													<span class="sta " v-else='n.signStatus==0'>未签收</span>
												</div>
												<div v-if="userId!=creatorId">
													<div v-if="n.roomId==currroomid">
														<span class="sta ">已签收</span>
													</div>
													<div v-else="n.roomId!=currroomid">
														<span class="sta" v-if="n.signStatus==1">已签收</span>
														<span class="sta" v-else='n.signStatus==0'>未签收</span>
													</div>
												</div>
												&nbsp;&nbsp;&rarr;&nbsp;&nbsp;
												<span class="sta" v-if="n.confirmStatus==1">已确认</span>
												<span class="sta" v-else>未确认</span>
											</p>
										</div>
									</div>
								</li>
							</ul>
						</dd>
					</dl>
				</div>-->
				<div class="show-item">
					<dl class="item">
						<dt class="label">图片</dt>
						<dd class="con">
							<ul class="container-average container-average-img">
								<div v-for="(n,index) in site_img" :key="index">
									<li class="img-item" @click="disposeLogImg(index,site_img)">
										<div class="img-item-inner">
											<img v-bind:src="n.thumbnailurl">
										</div>
									</li>
								</div>
							</ul>
						</dd>
					</dl>
					<dl class="item publish-container cloud-content">
						<dt class="label">附件</dt>
						<dd class="con">
							<ul class="mui-table-view mui-table-view-striped container-average">
								<div v-for="(n,index) in site_fj" :key="index">
									<li class="mui-table-view-cell" @click="open_file(n.id)">
										<div class="oa-contact-cell mui-table">
											<div class="oa-contact-avatar mui-table-cell">
												<span :class="'my-list-icon '+ common.fileType(n.filename)"></span>
											</div>
											<div class="oa-contact-content mui-table-cell">
												<h4 class="oa-contact-name" v-text="n.filename"></h4>
												<p class="oa-contact-email"><span v-text='parseFloat(n.filesize/1024).toFixed(2)+" kb"'></span></p>
											</div>
										</div>
									</li>
								</div>
							</ul>
						</dd>
					</dl>
				</div>
				<!--日志-->
				<div class="show-item" style="margin-top: 10px;">
					<dl class="item">
						<dd class="con">
							<div class="process-contain process-shenpi">
								<div class="process-list">
									<!--提交人日志-->
									<!--<dl class="process-item">
										<dt class="process-label" @click="userimg(fromuserId)">
				        					<div class="img-header"><img v-bind:src="creatorpic"/></div>
				        				</dt>
										<dd class="process-con">
											<div class="title"><span v-text="content.userName"></span><span class="txt-statue">提交</span><span class="secondary mui-pull-right" v-text='(new Date(timeshenqing)).Format("MM.dd hh:mm")'></span></div>
											<div class="secondary"><span v-text="fromRoomClass"></span>&nbsp;&nbsp;<span class="txt-statue" v-text="fromRoomName"></span></div>
										</dd>
									</dl>-->

									<div v-for="(item,index) in noteList" :key="index">
										<dl class="process-item">
											<dt class="process-label">
							        			<div class="img-header" @click="userimg(item.userId)"><img v-bind:src="item.userAvatar"/></div>
							        		</dt>
											<dd class="process-con">
												<div class="title"><span v-text="item.userName"></span>
													<span class="txt-statue" v-if="item.noteType==0">提交</span>
													<span class="txt-statue" v-else-if="item.noteType==1">确认</span>
													<span class="txt-statue" v-else-if="item.noteType==3">评论</span>
													<span class="txt-statue" v-else-if="item.noteType==4">退回</span>
													<span class="txt-statue" v-else-if="item.noteType==5">签收</span>
													<span class="secondary mui-pull-right" v-text='util.fnFormat(item.creatDate,"MM.dd hh:mm")'></span>
												</div>
												<div class="secondary"><span v-text="item.roomClassName"></span>&nbsp;<span v-text="item.roomName"></span></div>
												<div class="txt-content" v-text="item.content"></div>
												<!--<div v-for="(n,index) in item.attachments">-->
												<div class="contain-img" v-if="item.noteType!=0">
													<ul class="list-con col-xs-4">
														<li class="list-item" @click="disposeLogImg(index,item.attachments)" v-for="(n,index) in item.attachments" :key="index" v-if="n.type==1">
															<div class="item-img">
																<img v-bind:src="n.thumbnailurl">
															</div>
														</li>
													</ul>
												</div>
												<ul class="mui-table-view mui-table-view-striped container-average cloud-content" v-if="item.noteType!=0">
													<li class="mui-table-view-cell" @click="open_file(n.id)" v-for="(n,index) in item.attachments" :key="index" v-if="n.type==2">
														<div class="oa-contact-cell mui-table">
															<div class="oa-contact-avatar mui-table-cell">
																<span :class="'my-list-icon '+ common.fileType(n.filename)"></span>
															</div>
															<div class="oa-contact-content mui-table-cell">
																<h4 class="oa-contact-name" v-text="n.filename"></h4>
																<p class="oa-contact-email"><span v-text="parseFloat((n.filesize)/1024).toFixed(2)+'kb'"></span></p>
															</div>
														</div>
													</li>
												</ul>
												<!--</div>-->
											</dd>
										</dl>
									</div>
									<!--<dl class="process-item">
										<dt class="process-label">
					        			<div class="img-header"><img src="../../static/images/header3.jpg"/></div>
					        		</dt>
										<dd class="process-con">
											<div class="title">董丽<span class="txt-statue">评论</span><span class="secondary mui-pull-right">03:23&nbsp;15:42</span></div>
											<div class="secondary">施工单位&nbsp;招商地产</div>
											<div class="txt-content">部分细节需要优化</div>
											<div class="contain-img">
												<ul class="list-con col-xs-4">
													<li class="list-item">
														<div class="item-img"><img src="../../static/images/defualt.png"></div>
													</li>
													<li class="list-item">
														<div class="item-img"><img src="../../static/images/defualt.png"></div>
													</li>
													<li class="list-item">
														<div class="item-img"><img src="../../static/images/defualt.png"></div>
													</li>
													<li class="list-item">
														<div class="item-img"><img src="../../static/images/defualt.png"></div>
													</li>
													<li class="list-item">
														<div class="item-img"><img src="../../static/images/defualt.png"></div>
													</li>
												</ul>
											</div>
										</dd>
									</dl>-->
									<dl class="process-item last-item">
										<dt class="process-label">
						        			<span class="item-node"></span>
						        		</dt>
										<dd class="process-con">
											<div class="title">没有更多了~</div>
										</dd>
									</dl>
								</div>
							</div>
						</dd>
					</dl>
				</div>
			</section>
		</div>
</template>

<script>
import setting from "../../../playform/config.js";
import util from "../../../playform/util.js";
import pswipe from "../js/photoSwipe";
import danjuApi from "../js/danjuAPi.js";
export default {
    data(){
        return{
            util:util,
            danjuApi:danjuApi,
					qingdan: [],
					title: '',
					yewu: "",
					fashengdata: '',
					shenqingdata: '',
					beizhu: '',
					jieshou: [],
					site_fj: [],
					site_img: [],
                    userId: setting.getCookie("userid"),
                    userid: setting.getCookie("userid"),
                    username: setting.getCookie("username"),
					roomName: "",
					creatorId: '',
					currroomid: "",
					qianshou: "",
					okshow: "",
					toroomid: "",
					curoomname: "",
					creatorpic: '',
					content: [],
					projectid: '',
					currRoomImId: '',
					nowroomImId: '',
					fromRoomClass: '',
					fromRoomName: '',
					timeshenqing: '',
					noteList: [],
					fromroomImid: '',
					fromuserId: '',
					confirm: '0',
        }
    },
    created: function() {
        danjuApi.vue = this;
        danjuApi.initVue()
                    appApi.showBack()
					this.initdata()
					appApi.imgPreview.init();
				},
				mounted: function() {},
				methods: {
					initdata: function() {
						var _self = this;
						var param = {
							id: _self.$route.query.id,
							//														uid: "10395",
						}
						//获取单据信息
						this.$http.post( "/contract/get_content", param).then(function(response) {
							var result = response.data.result;
							if(response.data.code == 200) {
								console.log(response.data.result)
								var data = response.data.result
								var content = JSON.parse(response.data.result.contentJson)
								var noral = JSON.parse(response.data.result.noralJson)
								_self.content = JSON.parse(response.data.result.contentJson)
								_self.creatorId = data.creatorId
								//清单
								_self.qingdan = JSON.parse(response.data.result.contentJson).subtable;
								//房间
								_self.roomName = response.data.result.roomName
								//头像 ，是否确认，标题，业务，日期，详细说明
								_self.creatorpic = data.creatorAvatar
								_self.confirm = data.confirm
								//申请日期  mm.dd hh:mm
								var timeshen = content.dateShenqing.split(" ")
								//								_self.timeshenqing = timeshen[0].split('-')[1] + "." + timeshen[0].split('-')[2] + " " + timeshen[1].split(':')[0] + ":" + timeshen[1].split(':')[1]
								_self.timeshenqing = content.dateShenqing
								_self.beizhu = content.beizhu
								//接受方
								_self.jieshou = data.flowList
								//发送方
								_self.fromRoomClass = noral.currRoomClassName
								_self.fromRoomName = noral.curRoomName
								_self.fromroomImid = noral.currRoomImId
								_self.fromuserId = noral.table.userId
								//当前用户房间信息
								_self.usermain(response.data.result.flowList, JSON.parse(response.data.result.noralJson).table.projectid)
								//图片  附件
								//其他信息
								_self.projectid = noral.table.projectid
								_self.currRoomImId = noral.currRoomImId
								//日志
								_self.noteList = data.noteList
								var attachments
								if(data.attachments == null) {
									attachments = []
								} else {
									attachments = data.attachments
								}
								_self.site_img = []
								_self.site_fj = []
								for(var i = 0; i < attachments.length; i++) {
									if(attachments[i].type == 1) {
										_self.site_img.push(attachments[i])
									} else {
										_self.site_fj.push(attachments[i])
									}
								}
							}
						})
					},
					//点击头像
					userimg: function(userid) {
						this.lookUserInfo(this.$http);
					},
					disposeLogImg: function(index, datas) {
						var _self = this;
						var imgsData = [];
						for(var i in datas) {
							// 图片
							if(datas[i].type == 1) {
								imgsData.push(datas[i].longurl);
							}
						}
						appApi.imgPreview.open(index, imgsData);
					},
					open_file: function(id) {
						appApi.openFile( '/sass_api/file/download?id=' + id);
					},
					//头像信息
					lookUserInfo: function(userId) { //查看用户资料
						window.appApi.openNewWindow(getPagePath() + "/contacts/eg_details.html?userId=" + this.userId);
					},
					//查询当前用户信息
					usermain: function(seeimg, sn) {
						var _self = this
						this.$http.post( "/pcontact_api/getroombyprojectsn?projectSn=" + sn + "&userId=" + _self.userid).then(function(response) {
							var result = response.data.result;
							if(response.data.code == 0) {
								_self.toroomid = response.data.result.roomId
								_self.curoomname = response.data.result.roomName
								_self.currroomid = response.data.result.roomId
								_self.nowroomImId = response.data.result.roomImId
								var n = response.data.result.roomClass
								if(n == 1) {
									_self.tuifromcurrRoomName = "施工单位"
								} else if(n == 2) {
									_self.tuifromcurrRoomName = "建设单位"
								} else if(n == 3) {
									_self.tuifromcurrRoomName = "勘察单位"
								} else if(n == 4) {
									_self.tuifromcurrRoomName = "设计单位"
								} else if(n == 5) {
									_self.tuifromcurrRoomName = "监理单位"
								} else if(n == 6) {
									_self.tuifromcurrRoomName = "质检单位"
								} else if(n == 7) {
									_self.tuifromcurrRoomName = "材料商"
								} else if(n == 8) {
									_self.tuifromcurrRoomName = "分包商"
								} else if(n == 9) {
									_self.tuifromcurrRoomName = "班组"
								} else if(n == 11) {
									_self.tuifromcurrRoomName = "总包单位"
								}
								//判断签收状态
                                if(_self.confirm==1) {
                                    for (var i = 0; i < seeimg.length; i++) {
                                        if (seeimg[i].roomId == _self.toroomid) {
                                            //签收弹窗
                                            if (seeimg[i].signStatus == 0) {
                                                ludan("打开即签收", 1, 2)
                                            }
                                            _self.qianshou = 1
                                            var content;
                                            var toImId;
                                            var toAvatarUrl;
                                            var toNickName;
                                            var chatType;
                                            //签收状态
                                            if (seeimg[i].signStatus == 0) {
                                                var roomname = seeimg[i].roomName
                                                var par = {
                                                    docid: _self.$route.query.id,
                                                    //												uid: _self.uid,
                                                    roomid: _self.currroomid,
                                                    projectid: _self.projectid,
                                                }
                                                console.log(par)
                                                this.$http.post( "/contract/set_sign", par).then(function (res_) {
                                                    if (res_.data.code == 200) {
                                                        _self.initdata()
                                                        var parm = {
                                                            "toImId": _self.currRoomImId,
                                                            "chatType": "2",
                                                            "toNickName": "",
                                                            "toAvatarUrl": "",
                                                            //														myExtType: 'notify_type',
                                                            "content": roomname + "已签收" + _self.fromRoomName + "的报量",
                                                        }
                                                        console.log(parm)
                                                        appApi.sendNotifyMsg(parm)
                                                    } else {
                                                        msg("签收状态验证失败")
                                                    }
                                                })
                                            } else {

                                            }
                                        }
                                        //判断确认状态
                                        if (seeimg[i].roomId == _self.currroomid) {
                                            if (seeimg[i].confirmStatus == 1) {
                                                _self.okshow = 1
                                            }
                                        }

                                    }
                                }
							}
						})
					},
					yes: function() {
						var _self = this
						window.location.href= "/static/newwebstatic/laowu/ttp.html?id=" + _self.$route.query.id + "&projectid=" + _self.projectid + "&roomid=" + _self.toroomid + "&roomname=" + _self.curoomname + "&typ=1" + "&nowroomImId=" + _self.nowroomImId + "&formroomimid=" + _self.fromroomImid + "&fromRoomName=" + _self.fromRoomName
						//appApi.openNewWindow( "/static/newwebstatic/laowu/ttp.html?id=" + _self.$route.query.id + "&projectid=" + _self.projectid + "&roomid=" + _self.toroomid + "&roomname=" + _self.curoomname + "&typ=1" + "&nowroomImId=" + _self.nowroomImId + "&formroomimid=" + _self.fromroomImid + "&fromRoomName=" + _self.fromRoomName)
						_self.$router.push({ path: '/static/newwebstatic/lianxi/ttp.html', query:urlmain})
					},
					no: function() {
						var _self = this
						window.location.href= "/static/newwebstatic/laowu/ttp.html?id=" + _self.$route.query.id + "&projectid=" + _self.projectid + "&roomid=" + _self.toroomid + "&roomname=" + _self.curoomname + "&typ=4" + "&nowroomImId=" + _self.nowroomImId + "&formroomimid=" + _self.fromroomImid + "&title=" + _self.content.userName + "&roomclass=" + _self.tuifromcurrRoomName + "&leibie=" + _self.content.zhuanye
//						appApi.openNewWindow( "/static/newwebstatic/laowu/ttp.html?id=" + _self.$route.query.id + "&projectid=" + _self.projectid + "&roomid=" + _self.toroomid + "&roomname=" + _self.curoomname + "&typ=4" + "&nowroomImId=" + _self.nowroomImId + "&formroomimid=" + _self.fromroomImid + "&title=" + _self.content.userName + "&roomclass=" + _self.tuifromcurrRoomName + "&leibie=" + _self.content.zhuanye)
					},
					pin: function() {
						var _self = this
						window.location.href= "/static/newwebstatic/laowu/ttp.html?id=" + _self.$route.query.id + "&projectid=" + _self.projectid + "&roomid=" + _self.toroomid + "&roomname=" + _self.curoomname + "&typ=3" + "&nowroomImId=" + _self.nowroomImId
//						appApi.openNewWindow( "/static/newwebstatic/laowu/ttp.html?id=" + _self.$route.query.id + "&projectid=" + _self.projectid + "&roomid=" + _self.toroomid + "&roomname=" + _self.curoomname + "&typ=3" + "&nowroomImId=" + _self.nowroomImId)
						//						window.location.href= "/static/newwebstatic/lianxi/ttp.html?id=" + _self.$route.query.id + "&projectid=" + _self.projectid + "&roomid=" + _self.toroomid + "&roomname=" + _self.curoomname + "&typ=3"+"&nowroomImId="+_self.nowroomImId
                    },
                }
}
</script>

<style scope>
.mui-content {
  background: #fff;
  text-align: left;
  padding-bottom: 50px;
  position: absolute;
  top: 0;
}

.link-con {
  color: inherit;
}

.zhuangtai {
  position: absolute;
  right: 10px;
  top: 54px;
  z-index: 99;
}

.show-item .item .label {
  width: 80px;
}
.process-label {
  float: left;
}
.item .process-list {
  position: relative;
}
.process-label .img-header {
  position: relative;
  z-index: 2;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
}
.process-label .img-header img {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}
.process-con {
  padding-left: 45px;
  font-size: 14px;
}
.process-list .process-item {
  margin-top: 20px;
}
.process-list:before {
  position: absolute;
  left: 14px;
  top: 0;
  width: 1px;
  bottom: 12px;
  content: "";
  background-color: #ddd;
  z-index: 1;
}
.process-item.last-item .process-label .item-node {
  height: 10px;
  width: 10px;
  background: #4ba9e9;
  border-radius: 50%;
  border: 3px solid #4ba9e9;
  position: relative;
  z-index: 2;
  display: inline-block;
  vertical-align: middle;
}
.process-item .process-con .title .txt-statue {
  color: #f5b35d;
  margin-left: 15px;
}
.process-shenpi .process-item.last-item .process-label {
  padding-left: 10px;
}
.oa-contact-email {
  font-size: 14px;
}
.oa-contact-email span:nth-child(1) {
  float: left;
}
.con .oa-contact-email .sta {
  color: #ccc;
}
.contain-img .list-con.col-xs-4 .list-item {
  float: left;
  width: 23%;
  text-align: center;
  padding-top: 23%;
  margin-left: 2%;
  margin-top: 2%;
  position: relative;
}
.contain-img .list-con .list-item .item-img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: 1px solid #eee;
  background-color: #f7f7f7;
  overflow: hidden;
}
.contain-img .list-con {
  margin-left: -2%;
  overflow: hidden;
}
.contain-img .list-con .list-item .item-img img {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  display: block;
  max-width: 100%;
}
.process-item .process-con .contain-img,
.process-item .process-con .container-average {
  margin-top: 10px;
}
.table-record th {
    font-weight: normal;
    font-size: 15px;
    color: #777;
	text-align: center
}
.mui-action-back{
	float: left;
}
.show-item:nth-child(1){
padding: 0
}
.table tbody td{
	color: #000;
	font-size: 15px
}
.process-shenpi .process-item .process-con .title {
    font-size: 14px;
    color: #555;
}
</style>
