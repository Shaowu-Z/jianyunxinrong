<template>
    <div id="app">
			<header class="mui-bar mui-bar-nav">
				<h1 class="mui-title">微承诺</h1>
				<!--<a class="mui-action-back mui-icon iconfont icon-back"></a>-->
				<!--<button class="mui-btn mui-btn-link mui-pull-right">编辑</button>-->
			</header>
			<!-- <template v-for="n in jieshou"> -->

				<div class="fixed-bottom" v-for="(values,index) in jieshou" :key="index">
					<div v-if="userId==creatorId">
						<div class="mui-table mui-text-center v-line-half">
							<div class="mui-table-cell">
								<button type="button" class="mui-btn mui-btn-link" @click="pin(3)">评论</button>
							</div>
							<div v-if="type=='双方承诺' && values.confirmStatus==1">
								<div class="mui-table-cell" >
									<button type="button" class="mui-btn mui-btn-link" @click="pin(6)">评价</button>
								</div>
							</div>
						</div>
					</div>
					<div v-else-if="acceptid==userId">
						<div v-if="okshow==1">
							<div class="mui-table mui-text-center v-line-half">
								<div class="mui-table-cell">
									<button type="button" class="mui-btn mui-btn-link" @click="pin(3)">评论</button>
								</div>
								<div class="mui-table-cell" >
									<button type="button" class="mui-btn mui-btn-link" @click="pin(6)">评价</button>
								</div>
							</div>
						</div>
						<div v-else>
							<div class="mui-table mui-text-center v-line-half">
								<div class="mui-table-cell"><button class="mui-btn mui-btn-link" @click="yes">确认</button></div>
								<div class="mui-table-cell"><button class="mui-btn mui-btn-link" @click="no">退回</button></div>
								<div class="mui-table-cell"><button class="mui-btn mui-btn-link" @click="pin(3)">评论</button></div>
							</div>
						</div>
					</div>
						<div class="mui-table mui-text-center v-line-half" v-else>
								<div class="mui-table-cell">
									<button type="button" class="mui-btn mui-btn-link" @click="pin(3)">评论</button>
								</div>
								<!--<div class="mui-table-cell" >
									<button type="button" class="mui-btn mui-btn-link" @click="pin(6)">评价</button>
								</div>-->
							</div>
                    <div v-if="values.confirmStatus==1">
					<!-- <img class="zhuangtai" src="../../images/approval-by.png" /> -->
				    </div>
				</div>
				<!--<div class="fixed-bottom" v-else>
					<div class="mui-table mui-text-center v-line-half" v-if="sites.type=='单方承诺'">
						<div class="mui-table-cell">
							<button type="button" class="mui-btn mui-btn-link" @click="pin(3)">评论</button>
						</div>
					</div>
					<div class="mui-table mui-text-center v-line-half" v-else>
						<div class="mui-table-cell">
							<button type="button" class="mui-btn mui-btn-link" @click="pin(3)">评论</button>
						</div>
						<div class="mui-table-cell" v-if="jieshou.confirmStatus==1">
							<button type="button" class="mui-btn mui-btn-link" @click="pin(6)">评价</button>
						</div>
					</div>
				</div>-->
				<!--<div v-if="value.confirmStatus==1">
					 <img class="zhuangtai" src="../../images/approval-by.png" />
				</div>
			 </template> -->-->
			<div v-if="confirm==2">
				<div class="fixed-bottom">
					<div class="mui-table mui-text-center v-line-half">
						<div class="mui-table-cell">
							<button type="button" class="mui-btn mui-btn-link" @click="pin">评论</button>
						</div>
					</div>
				</div>
			</div>
			<section class="mui-content show-contain">
				<div class="show-item">
					<ul class="mui-table-view mui-table-view-striped user-box">
						<li class="mui-table-view-cell">
							<div class="oa-contact-cell mui-table">
								<div class="oa-contact-avatar mui-table-cell">
									<!--<img v-bind:src="creatorpic" onerror="javascript:this.src='../../images/ico_leader.png';this.onerror=null">-->
									<img src="" class="logo" v-lazy="creatorpic">
									<div class="bg-company" v-lazy:background-image="imgIcon"></div>
								</div>
								<div class="oa-contact-content mui-table-cell">
									<h4 class="oa-contact-name"><span v-text="content.userName"></span><span class="secondary mui-pull-right" style="color:#aaa" v-text='util.fnFormat(content.dateShenqing,"MM.dd hh:mm")'></span></h4>
									<p class="oa-contact-email"><span v-text="fromRoomClass"></span>&nbsp;&nbsp;<span v-text="noral.ludancompanyName"></span></p>
								</div>
							</div>
						</li>
					</ul>
				</div>

				<div class="show-item">
					<!--<dl class="item">
						<dt class="label">标题</dt>
						<dd class="con" v-text="title"></dd>
					</dl>-->
					<dl class="item">
						<dt class="label">承诺人</dt>
						<dd class="con" v-text="sites.personAccept"></dd>
					</dl>
					<dl class="item">
						<dt class="label">被承诺人</dt>
						<dd class="con" v-text="sites.personDistribute"></dd>
					</dl>
					<dl class="item">
						<dt class="label">承诺类型</dt>
						<dd class="con" v-text="sites.type"></dd>
					</dl>
					<dl class="item">
						<dt class="label">承诺完成日期</dt>
						<dd class="con" v-text='dateChengnuo'></dd>
					</dl>
					<!--<dl class="item">
						<dt class="label">录入日期</dt>
						<dd class="con" v-text="shenqingdata"></dd>
					</dl>-->
					<dl class="item">
						<dt class="label">承诺内容</dt>
						<dd class="con">
							<div class="m-block" name="" rows="" cols="" v-text="beizhu" style="border: 0;padding: 0;white-space: pre-wrap;"></div>
						</dd>
					</dl>
				</div>
				<div class="show-item">
					<dl class="item">
						<dt class="label">接收方</dt>
						<dd class="con">
							<ul class="mui-table-view mui-table-view-striped container-average address-item">
								<!--<template v-for="n in jieshou">-->
								<li class="mui-table-view-cell" v-for="(value,index) in jieshou" :key="index">
									<div class="oa-contact-cell mui-table">
										<div class="oa-contact-avatar mui-table-cell">
											<!-- <img  v-bind:src="geturl+n.icon" /> -->
										</div>
										<div class="oa-contact-content mui-table-cell">
											<h4 class="oa-contact-name" v-text="value.roomName"></h4>
											<div class="oa-contact-email">
												<div v-if="userId==creatorId">
													<span class="sta " v-if="value.signStatus==1">已签收</span>
													<span class="sta " v-else-if='value.signStatus==0'>未签收</span>
												</div>
												<div v-if="userId!=creatorId">
													<div v-if="value.roomId==currroomid">
														<span class="sta ">已签收</span>
													</div>
													<div v-else-if="value.roomId!=currroomid">
														<span class="sta" v-if="value.signStatus==1">已签收</span>
														<span class="sta" v-else-if='value.signStatus==0'>未签收</span>
													</div>
												</div>
												&nbsp;&nbsp;&rarr;&nbsp;&nbsp;
												<span class="sta" v-if="value.confirmStatus==1">已确认</span>
												<span class="sta" v-else>未确认</span>
											</div>
										</div>
									</div>
								</li>
								<!--</template>-->
							</ul>
						</dd>
					</dl>
				</div>
				<div class="show-item">
					<dl class="item">
						<dt class="label">图片</dt>
						<dd class="con">
							<ul class="container-average container-average-img">
								<!-- <template v-for="(n,index) in site_img" :key="index"> -->
									<li class="img-item"   v-for="(value,index) in site_img" :key="index">
										<div class="img-item-inner" @click="disposeLogImg(index,site_img)">
											<img  class="logo" v-bind:src="value.thumbnailurl">
											<!-- <div class="bg-company" v-lazy:background-image="imgIcon"></div>  -->
											<!--<img v-bind:src="n.thumbnailurl">-->
										</div>
									 </li>
								<!--</template> -->
							</ul>
						</dd>
					</dl>
					<dl class="item  ">
						<dt class="label">附件</dt>
						<dd class="con">
							<ul class="mui-table-view mui-table-view-striped container-average cloud-content">
								<!-- <template v-for="n in site_fj"> -->
									<li class="mui-table-view-cell" v-for="(n,index) in site_fj" :key="index">
										<div class="oa-contact-cell mui-table" @click="open_file(n.id)" >
											<div class="oa-contact-avatar mui-table-cell">
												<span :class="'my-list-icon '+ danjuApi.fileType(n.filename)"></span>
											</div>
											<div class="oa-contact-content mui-table-cell">
												<h4 class="oa-contact-name" v-text="n.filename"></h4>
												<p class="oa-contact-email"><span v-text='parseFloat(n.filesize/1024).toFixed(2)+" kb"'></span></p>
											</div>
										</div>
									</li>
								<!-- </template> -->
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
				        					<div class="img-header">
				        						<!<img v-bind:src="creatorpic"/>-->
				        						<!-- <img src="" class="logo" v-lazy="creatorpic">
												<div class="bg-company" v-lazy:background-image="imgIcon"></div>
				        					</div>
				        					<div class="img-header">
				        						<img src="" class="logo" v-lazy="creatorpic">
												<div class="bg-company" v-lazy:background-image="imgIcon"></div>
				        					</div>
				        				</dt>
										<dd class="process-con">
											<div class="title"><span v-text="content.userName"></span><span class="txt-statue">提交</span><span class="secondary mui-pull-right" v-text='(new Date(timeshenqing)).Format("MM.dd hh:mm")'></span></div>
											<div class="secondary"><span v-text="fromRoomClass"></span>&nbsp;&nbsp;<span class="txt-statue" v-text="fromRoomClassname"></span></div>
										</dd> -->
									<!-- </dl>-->

									<!--判断时候显示签收日志-->
									<!--v-for="n in jieshou"
									<template v-if="userId!=creatorId">
										<template v-if="n.roomId==currroomid">
											<span class="sta ">已签收</span>
										</template>
										<template v-else="n.roomId!=currroomid">
											<span class="sta" v-if="n.signStatus==1">已签收</span>
											<span class="sta" v-else='n.signStatus==0'>未签收</span>
										</template>
									</template>
									-->
									<!--<dl class="process-item" v-if="first==2"  v-for="item in noteList">
										<dt class="process-label" @click="userimg(item.userId)">
				        					<div class="img-header"><img v-bind:src="item.userAvatar"/></div>
				        				</dt>
										<dd class="process-con" >
											<div class="title"><span v-text="decodeURI(username)"></span><span class="txt-statue">签收</span><span class="secondary mui-pull-right" v-text='(new Date(timeshenqing)).Format("MM.dd hh:mm")'></span></div>
											<div class="secondary"><span v-text="fromRoomClass"></span>&nbsp;&nbsp;<span class="txt-statue" v-text="curoomname"></span></div>
										</dd>
									</dl>-->

									<!-- <template v-for="item in noteList"> -->
										<dl class="process-item" v-for="(item,index) in noteList" :key="index">
											<dt class="process-label">
							        			<div class="img-header" @click="userimg(item.userId)"><img v-bind:src="item.userAvatar"/></div>
							        		</dt>
											<dd class="process-con">
												<div class="title"><span v-text="item.userName"></span>
													<span class="txt-statue" v-if="item.noteType==0">提交</span>
													<span class="txt-statue" v-else-if="item.noteType==1">确认</span>
													<span class="txt-statue" v-else-if="item.noteType==3">评论</span>
													<span class="txt-statue" v-else-if="item.noteType==6">评价</span>
													<span class="txt-statue" v-else-if="item.noteType==4">退回</span>
													<span class="txt-statue" v-else-if="item.noteType==5">签收</span>
													<span class="secondary mui-pull-right" v-text='util.fnFormat(item.creatDate,"MM.dd hh:mm")'></span>
												</div>
												<div class="secondary"><span v-text="item.roomClassName"></span>&nbsp;<span v-text="item.roomName"></span></div>
												<div class="txt-content" v-html="item.content.replace(/#.%#/g, '<br/>')"></div>
												<!--<div v-for="(n,index) in item.attachments">-->
												<!--评分-->
												<div v-if="item.noteType==6">
													<!--<ul class="list-con col-xs-4">
														<li class="mui-table-view-cell rzcont xingji">
															<div>星级</div>
															<div class="xingxing">
																<template v-for="n in Number(item.score)">
																	<img src="../../images/wuxing.png" />
																</template>
																<template v-for="n in 5-Number(item.score)">
																	<img src="../../images/wuxing1.png" />
																</template>
															</div>
														</li>
													</ul>-->
													<div class="txt-content comment-score">
														<div class="item-score">
															<!--<label>合同守信：</label>-->
															<div class="score-box">
																<div v-for="(n,index) in Number(item.score)" :key="index">
																	<i class="ystar_1"></i>
																</div>
																<div v-for="(n,index) in 5-Number(item.score)" :key="index">
																	<i class="ystar_3"></i>
																</div>
																<!--<i class="ystar_1"></i>
																<i class="ystar_1"></i>
																<i class="ystar_1"></i>
																<i class="ystar_1"></i>
																<i class="ystar_3"></i>-->
															</div>
															<span class="txt-evaluation" style="font-size:16px;" v-text="item.score+'分'"></span>
														</div>
													</div>
												</div>

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
													<li class="mui-table-view-cell" @click="open_file(n.id)" v-for="(n,index) in item.attachments" :key="index" v-if="n.type!=1">
														<div class="oa-contact-cell mui-table">
															<div class="oa-contact-avatar mui-table-cell">
																<span :class="'my-list-icon '+ danjuApi.fileType(n.filename)"></span>
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
									<!-- </template> -->

									<dl class="process-item" v-if="first==2">
										<dt class="process-label" @click="userimg(userid)">
				        					<div class="img-header"><img v-bind:src="usericon"/></div>
				        				</dt>

										<dd class="process-con">
											<div class="title"><span v-text="decodeURI(username)"></span><span class="txt-statue">签收</span><span class="secondary mui-pull-right" v-text='util.fnFormat(timeshenqing,"MM.dd hh:mm")'></span></div>
											<div class="secondary"><span v-text="curoomclass"></span>&nbsp;&nbsp;<span class="txt-statue" v-text="curoomname"></span></div>
										</dd>
									</dl>
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
            usericon: 'http://res.winfreeinfo.com:8000' + setting.getCookie("usericon"),
					imgurl: "http://res.winfreeinfo.com:8000",
					imgIcon: '../../images/ico_image.png',
					title: '',
					yewu: "",
					//					fashengdata: '',
					shenqingdata: '',
					dateChengnuo: '',
					beizhu: '',
					type: '',
					sites: [],
					jieshou: [],
					jieshous: [],
					site_fj: [],
					site_img: [],
					// userId: userid,
					creatorId: '',
					currroomid: "",
					qianshou: "",
					okshow: "",
					toroomid: "",
					curoomname: "",
					creatorpic: '',
					content: [],
					noral:[],
					projectid: '',
					currRoomImId: '',
					nowroomImId: '',
					fromRoomClass: '',
					fromRoomClassname:'',
					timeshenqing: '',
					noteList: [],
					fromroomImid: '',
					fromuserId: '',
					fromRoomname: '',
					first: '',
					curoomclass: '',
					img: '',
					pingjiaToimid:'',
					tuifromcurrRoomName:'',
					tuititle:'',
					acceptid:'',
                    confirm:'',
                     userid: setting.getCookie("userid"),
                    userId: setting.getCookie("userid"),
        }
    },
    created(){
        danjuApi.vue = this;
        danjuApi.initVue()
        this.initdata()
					appApi.imgPreview.init();
    },
    methods: {
					initdata: function() {
						var _self = this;
						var param = {
							id: _self.$route.query.id,
							//														uid: "10395",
						}
						//获取单据信息
						this.$http.post( "/contract/get_content", param).then(function(response) {
							if(response.data.code == 200) {
                                console.log("单据信息",response.data.result)
								var result = response.data.result;
								console.log(response.data.result)
								var data = response.data.result
								var content = JSON.parse(response.data.result.contentJson)
								var noral = JSON.parse(response.data.result.noralJson)
								_self.sites = content
								_self.confirm=data.confirm
								if(content.dateChengnuo!=null){
									_self.dateChengnuo = content.dateChengnuo.split(" ")[0]
								}

								_self.type = content.type
								_self.jieshou = result.flowList
								//判断承诺类型  确认评价推送方
								if(_self.type=='双方承诺'){
									_self.pingjiaToimid=noral.toroomimid+","+noral.currRoomImId
								}else{
									_self.pingjiaToimid=noral.toroomimid
								}
								//判断接收人
								if(content.personDistributeID==data.creatorId){
									_self.acceptid=content.personAcceptID
								}else{
									_self.acceptid=content.personDistributeID
								}

								//								console.log(_self.sites)
								_self.content = JSON.parse(response.data.result.contentJson)
								_self.noral = JSON.parse(response.data.result.noralJson)

								_self.creatorId = data.creatorId
								//头像 ，标题，业务，日期，详细说明
								_self.creatorpic = data.creatorAvatar
								_self.title = content.userName
								_self.yewu = content.type
								//								_self.fashengdata = content.createDate.split(" ")[0]
								_self.shenqingdata = content.dateShenqing.split(" ")[0]
								//申请日期  mm.dd hh:mm
								var timeshen = content.dateShenqing.split(" ")
								_self.timeshenqing = content.dateShenqing
								//退回时候的推送title
								if(content.type=='单向承诺'){
									_self.tuititle=noral.tablefields.personAccept+"退回向"+noral.tablefields.personDistribute+'的微承诺'
								}else{
									_self.tuititle=noral.tablefields.personAccept+"退回与"+noral.tablefields.personDistribute+'的双向承诺'
								}


								content.beizhu = content.beizhu.replace(/#.%#/g, "\n");
								_self.beizhu = content.beizhu
								//接受方
								//								_self.jieshou= response.data.result.flowList
								//发送方
								_self.fromRoomClass = noral.curRoomName
								_self.fromRoomClassname=noral.ludancompanyName
								_self.fromRoomname = noral.tablefields.companySaleName
								_self.fromroomImid = noral.currRoomImId
								_self.fromuserId = noral.table.userId
								_self.tuifromcurrRoomName=noral.curRoomName
								_self.fromuser=noral.tablefields.personDistribute
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
						this.lookUserInfo(userid);
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
						appApi.openFile('/sass_api/file/download?id=' + id);
					},
					//头像信息
					lookUserInfo: function(userId) { //查看用户资料
						window.appApi.openNewWindow(getPagePath() + "/contacts/eg_details.html?userId=" + userId);
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
								_self.curoomclass = response.data.result.roomClassName
								//判断签收状态
								for(var i = 0; i < seeimg.length; i++) {
									if(seeimg[i].roomId == _self.toroomid) {
										//签收弹窗
										if(seeimg[i].signStatus == 0) {
											ludan("打开即签收", 1, 2)
											_self.first = 2
										}
										_self.qianshou = 1
										var content;
										var toImId;
										var toAvatarUrl;
										var toNickName;
										var chatType;
										//签收状态
										if(seeimg[i].signStatus == 0) {
											var roomname = seeimg[i].roomName
											var par = {
												docid: _self.$route.query.id,
												//												uid: _self.uid,
												roomid: _self.currroomid,
												projectid: _self.projectid,
											}
											console.log(par)
											this.$http.post("/contract/set_sign", par).then(function(res_) {
												if(res_.data.code == 200) {
													var parm = {
														"toImId": _self.currRoomImId,
														"chatType": "2",
														"toNickName": "",
														"toAvatarUrl": "",
														//														myExtType: 'notify_type',
														"content": roomname + "已签收" + _self.fromRoomClassname + "的收发件",
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
									if(seeimg[i].roomId == _self.currroomid) {
										if(seeimg[i].confirmStatus == 1) {
											_self.okshow = 1
										}
									}

								}
							}
						})
					},
					yes: function() {
						var _self = this
						//						appApi.openNewWindow(getUrl() + "/static/newwebstatic/lianxi/ttp.html?id=" + _self.$route.query.id + "&projectid=" + _self.projectid + "&roomid=" + _self.toroomid + "&roomname=" + _self.curoomname + "&typ=1"+"&formroomimid=" + _self.tuiroomimid+"&roomName=" + _self.roomName+"&fromusername"+ _self.tuifromcurrRoomName+"&nowroomImId="+_self.nowroomImId)
						// appApi.openNewWindow(getUrl() + "/static/newwebstatic/chengnuo/ttp.html?id=" + _self.$route.query.id + "&projectid=" + _self.projectid + "&roomid=" + _self.toroomid + "&roomname=" + _self.curoomname + "&typ=1" + "&nowroomImId=" + _self.nowroomImId + "&formroomimid=" + _self.fromroomImid + "&formroomname=" + _self.fromRoomname+"&pingjiaToimid="+_self.pingjiaToimid+"&title=" + _self.title+ "&roomclass=" + _self.tuifromcurrRoomName+ "&leibie=" + _self.yewu+"&fromuser="+  _self.fromuser +"&tuititle="+_self.tuititle)
//						alert(getUrl() + "/static/newwebstatic/chengnuo/ttp.html?id=" + _self.$route.query.id + "&projectid=" + _self.projectid + "&roomid=" + _self.toroomid + "&roomname=" + _self.curoomname + "&typ=1" + "&nowroomImId=" + _self.nowroomImId + "&formroomimid=" + _self.fromroomImid + "&formroomname=" + _self.fromRoomname+"&pingjiaToimid="+_self.pingjiaToimid+"&title=" + _self.title+ "&roomclass=" + _self.tuifromcurrRoomName+ "&leibie=" + _self.yewu+"&fromuser="+  _self.fromuser+  _self.fromuser+"&tuititle="+_self.tuititle)
						// window.location.href="/static/newwebstatic/chengnuo/ttp.html?
						// id=" + _self.$route.query.id + 
						// "&projectid=" + _self.projectid + 
						// "&roomid=" + _self.toroomid + 
						// "&roomname=" + _self.curoomname + 
						// "&typ=1" + 
						// "&nowroomImId=" + _self.nowroomImId + 
						// "&formroomimid=" + _self.fromroomImid + 
						// "&formroomname=" + _self.fromRoomname+
						// "&pingjiaToimid="+_self.pingjiaToimid+
						// "&title=" + _self.title+ 
						// "&roomclass=" + _self.tuifromcurrRoomName+ 
						// "&leibie=" + _self.yewu+
						// "&fromuser="+  _self.fromuser +
						// "&tuititle="+_self.tuititle
						var urlmain={
							id: _self.$route.query.id , 
							projectid: _self.projectid , 
							roomid: _self.toroomid , 
							roomname: _self.curoomname , 
							typ:1,
							nowroomImId: _self.nowroomImId , 
							formroomimid: _self.fromroomImid , 
							formroomname: _self.fromRoomname,
							pingjiaToimid:_self.pingjiaToimid,
							title: _self.title, 
							roomclass: _self.tuifromcurrRoomName, 
							leibie: _self.yewu,
							fromuser:  _self.fromuser ,
							tuititle:_self.tuititle
						}
						_self.$router.push({ path: '/static/newwebstatic/chengnuo/ttp.html', query:urlmain})
					},
					no: function() {
						var _self = this
						// appApi.openNewWindow(getUrl() + "/static/newwebstatic/chengnuo/ttp.html?id=" + _self.$route.query.id + "&projectid=" + _self.projectid + "&roomid=" + _self.toroomid +"&fromroomname="+_self.fromRoomname+ "&roomname=" + _self.curoomname + "&typ=4" + "&nowroomImId=" + _self.nowroomImId + "&formroomimid=" + _self.fromroomImid + "&title=" + _self.title + "&roomclass=" + _self.tuifromcurrRoomName + "&leibie=" + _self.yewu+"&fromuser="+  _self.fromuser+"&tuititle="+_self.tuititle)
						var urlmain={
							id: _self.$route.query.id ,
							projectid: _self.projectid , 
							roomid: _self.toroomid ,
							fromroomname:_self.fromRoomname, 
							roomname: _self.curoomname , 
							typ:4, 
							nowroomImId: _self.nowroomImId , 
							formroomimid: _self.fromroomImid , 
							title: _self.title , 
							roomclass: _self.tuifromcurrRoomName , 
							leibie: _self.yewu,
							fromuser:  _self.fromuser,
							tuititle:_self.tuititle
						}
						_self.$router.push({ path: '/static/newwebstatic/chengnuo/ttp.html', query:urlmain})

					},
					pin: function(n) {
						var _self = this
						var urlmain={
							id: _self.$route.query.id , 
							projectid: _self.projectid , 
							roomid: _self.toroomid , 
							roomname: _self.curoomname , 
							typ: n , 
							nowroomImId: _self.nowroomImId
						}
					_self.$router.push({ path: '/static/newwebstatic/chengnuo/ttp.html', query:urlmain})
					
					},
					//					yes: function() {
					//						var _self = this
					//						//						localStorage.removeItem("kantype")
					//						//						localStorage.setItem("kantype", '1')
					//						appApi.openNewWindow(getUrl() + "/static/newwebstatic/lianxi/ttp.html?id=" + _self.$route.query.id + "&projectid=" + _self.projectid + "&roomid=" + _self.toroomid + "&roomname=" + _self.curoomname + "&typ=1"+"&formroomimid=" + _self.tuiroomimid+"&roomName=" + _self.roomName+"&fromusername"+ _self.tuifromcurrRoomName+"&nowroomImId="+_self.nowroomImId)
					//						//						window.location.href = getUrl() + "/static/newwebstatic/lianxi/ttp.html?" + _self.urlcan + "&fromusername=" + _self.formusername + "&typ=1"
					////						$(".mask").css({
					////							"display": "none",
					////							"opacity": "0.6"
					////						})
					//					},
					//					no: function() {
					//						var _self = this
					//						//						localStorage.removeItem("kantype")
					//						//						localStorage.setItem("kantype", '4')
					//						appApi.openNewWindow(getUrl() + "/static/newwebstatic/lianxi/ttp.html?typ=4" + "&name=" + _self.tuiname + "&fromcurrRoomName=" + _self.tuifromcurrRoomName + "&roomName=" + _self.roomName + "&formroomimid=" + _self.tuiroomimid + "&id=" + _self.$route.query.id + "&projectid=" + _self.projectid + "&roomid=" + _self.toroomid + "&roomname=" + _self.curoomname+"&nowroomImId="+_self.nowroomImId)
					//						//						window.location.href = getUrl() + "/static/newwebstatic/lianxi/ttp.html?" + _self.urlcan + "&name=" + _self.name + "&typ=4" + "&projectName=" + _self.projectName + "&isRoomName=" + _self.roomName + "&isRoomId=" + _self.currroomid + "&cfgid=" + _self.contractId + "&currRoomClassName=" + _self.roomName + "&currRoomImId=" + _self.currRoomImId + "&numberpic=" + _self.picnumer
					////						$(".mask").css({
					////							"display": "none",
					////							"opacity": "0.6"
					////						})
					//					},

				}
}
</script>

<style type="text/css">
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
</style>
