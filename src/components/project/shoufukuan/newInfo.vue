<template>
    <div>
        <header class="mui-bar mui-bar-nav">
				<h1 class="mui-title">收付款</h1>
				<!--<a class="mui-action-back mui-icon iconfont icon-back"></a>-->
				<!--<button class="mui-btn mui-btn-link mui-pull-right">编辑</button>-->
			</header>
			<div v-for="(n,index) in jieshou" :key="index">
				<div class="fixed-bottom" v-if="qianshou==1">
					<template v-if="userId==creatorId">
						<div class="mui-table mui-text-center v-line-half">
							<div class="mui-table-cell">
								<button type="button" class="mui-btn mui-btn-link" @click="pin">评论</button>
							</div>
						</div>
					</template>
					<template v-else>
						<template v-if="okshow==1">
							<div class="mui-table mui-text-center v-line-half">
								<div class="mui-table-cell">
									<button type="button" class="mui-btn mui-btn-link" @click="pin">评论</button>
								</div>
							</div>
						</template>
						<template v-else>
							<div class="mui-table mui-text-center v-line-half">
								<div class="mui-table-cell"><button class="mui-btn mui-btn-link" @click="yes">确认</button></div>
								<div class="mui-table-cell"><button class="mui-btn mui-btn-link" @click="no">退回</button></div>
								<div class="mui-table-cell"><button class="mui-btn mui-btn-link" @click="pin">评论</button></div>
							</div>
						</template>
					</template>
				</div>
				<div class="fixed-bottom" v-else>
					<div class="mui-table mui-text-center v-line-half">
						<div class="mui-table-cell">
							<button type="button" class="mui-btn mui-btn-link" @click="pin">评论</button>
						</div>
					</div>
				</div>
				<template v-if="n.confirmStatus==1">
					<!-- <img class="zhuangtai" src="../../images/approval-by.png" /> -->
				</template>

			</div>
			<template v-if="confirm==2">
				<div class="fixed-bottom">
					<div class="mui-table mui-text-center v-line-half">
						<div class="mui-table-cell">
							<button type="button" class="mui-btn mui-btn-link" @click="pin">评论</button>
						</div>
					</div>
				</div>
			</template>
			<!--<template v-if="okshow==1">
				<img class="zhuangtai" src="../../images/approval-by.png" />
			</template>-->

			<section class="mui-content show-contain">
				<div class="show-item">
					<ul class="mui-table-view mui-table-view-striped user-box">
						<li class="mui-table-view-cell">
							<div class="oa-contact-cell mui-table">
								<div class="oa-contact-avatar mui-table-cell" @click="userimg(fromuserId)">
									<img v-bind:src="creatorpic" >
								</div>
								<div class="oa-contact-content mui-table-cell">
									<h4 class="oa-contact-name"><span v-text="decodeURI(content.userName)"></span><span class="secondary mui-pull-right" style="color:#aaa" v-text="content.createDate"></span></h4>
									<p class="oa-contact-email"><span v-text="fromRoomClass"></span>&nbsp;&nbsp;<span v-text="fromRoomName"></span></p>
								</div>
							</div>
						</li>
					</ul>
				</div>

				<div class="show-item">
					<dl class="item">
						<dt class="label">日期</dt>
						<dd class="con" v-text="dateFasheng"></dd>
					</dl>
					<dl class="item">
						<dt class="label">金额</dt>
						<dd class="con" v-text="content.htTotal"></dd>
					</dl>
					<dl class="item">
						<dt class="label">合同</dt>
						<dd class="con" v-text="content.contractName"></dd>
					</dl>
					<dl class="item">
						<dt class="label">支出单位</dt>
						<dd class="con" v-text="content.companySaleName"></dd>
					</dl>
					<dl class="item">
						<dt class="label">收入单位</dt>
						<dd class="con" v-text="content.companyBuyName"></dd>
					</dl>
					<dl class="item">
						<dt class="label">详细说明</dt>
						<!-- <dd class="con" v-html="content.beizhu.replace(/\n|\r\n/g,'<br/>')"></dd> -->
					</dl>
				</div>
				<div class="show-item">
					<dl class="item">
						<dt class="label">接收方</dt>
						<dd class="con">
							<ul class="mui-table-view mui-table-view-striped container-average address-item">
								<!--<template v-for="n in jieshou">-->
								<li class="mui-table-view-cell" v-for="(n,index) in jieshou" :key="index">
									<div class="oa-contact-cell mui-table">
										<div class="oa-contact-avatar mui-table-cell">
											<!--<span class="oa-pic-default bgr5 p-label">材</span>-->
											<!-- <img  v-bind:src="geturl+n.icon" /> -->
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
								<div v-for="(n,index) in site_img" :key="index">
									<li class="img-item"  @click="disposeLogImg(index,site_img)">
										<div class="img-item-inner">
											<img v-bind:src="n.thumbnailurl">
										</div>
									</li>
								</div>
							</ul>
						</dd>
					</dl>
					<dl class="item ">
						<dt class="label">附件</dt>
						<dd class="con">
							<ul class="mui-table-view mui-table-view-striped container-average cloud-content">
								<div v-for="(n,index) in site_fj" :key="index">
									<li class="mui-table-view-cell" @click="open_file(n.id)">
										<div class="oa-contact-cell mui-table">
											<div class="oa-contact-avatar mui-table-cell">
												<!--<span class="my-list-icon label-word"></span>-->
												<!-- <span :class="'my-list-icon '+ common.fileType(n.filename)"></span> -->
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
				<div class="show-item" >
					<dl class="item">
						<dd class="con">
							<div class="process-contain process-shenpi">
								<div class="process-list">

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
													<!-- <span class="secondary mui-pull-right" v-text='(new Date(item.creatDate)).Format("MM.dd hh:mm")'></span> -->
                                                    <span class="secondary mui-pull-right" v-text='zrrizhi.fnFormat(item.creatDate,"MM.dd hh:mm")'></span>
                                                    <!-- <span class="secondary mui-pull-right" v-text='rizhi'></span> -->
												</div>
												<div class="secondary"><span v-text="item.roomClassName"></span>&nbsp;<span v-text="item.roomName"></span></div>
												<!-- <div class="txt-content" v-html="item.content.replace(/#.%#/g, '<br/>')"></div> -->
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
																<!--<span class="my-list-icon label-word"></span>-->
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
import setting from '../../../playform/config.js'
import util from '../../../playform/util.js'
import pswipe from '../js/photoSwipe'
export default {
    data(){
        return{
            // geturl:this.$route.query,
                    userid: setting.getCookie("userid"),
                    userId:setting.getCookie("userid"),
                    username: setting.getCookie("username"),
                    imgid:[],
                    fujianid:[],
                    zrrizhi:util,

					qingdan: [],
					title: '',
					yewu: "",
                    fashengdata: '',
                    dateFasheng: '',
					shenqingdata: '',
					beizhu: '',
					jieshou: [],
					site_fj: [],
					site_img: [],
					// userId: userid,
					roomName :"",
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
					fromRoomName :'',
					timeshenqing: '',
					noteList: [],
					fromroomImid: '',
					fromuserId: '',
                    confirm:'',
                    rizhi:""
        }
    },
    created: function() {
        // console.log("//////2222222222222////"+cc.datafo)
        // alert(nes.nes.cdas(15941165525,"MM.dd hh:mm"))
        appApi.showBack()
        this.initdata()
        // this.fordata()
        appApi.imgPreview.init();
        // console.log("/?????????s/"+window.location.href)
    },
    methods: {
        // fordata:function(mms){
        //     var fmt=mms
        //     Date.prototype.Format = function(fmt) {
        //         var o = {
        //             "M+": this.getMonth() + 1, //月份
        //             "d+": this.getDate(), //日
        //             "h+": this.getHours(), //小时
        //             "m+": this.getMinutes(), //分
        //             "s+": this.getSeconds(), //秒
        //             "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        //             "S": this.getMilliseconds() //毫秒
        //         };
        //         if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        //         for(var k in o)
        //             if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        //         return fmt;
        //     }
        //    return new Date(fmt).Format("MM.dd hh:mm")
        //     // console.log("dadad"+ new Date(15899599999).Format("MM.dd hh:mm"))
        // },
        initdata: function() {
            var _self = this;
            _self.site_img=[]
            _self.site_fj=[]
            var param = {
                id: this.$route.query.id,
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
                    _self.confirm=data.confirm

                    //清单
                    _self.qingdan = JSON.parse(response.data.result.contentJson).subtable;
                    //房间
                    _self.roomName = response.data.result.roomName
                    //头像 ，标题，业务，日期，详细说明
                    _self.creatorpic = data.creatorAvatar
                    _self.title=content.userName
                    //申请日期  mm.dd hh:mm
                    // var timeshen = content.dateShenqing.split(" ")
                    _self.timeshenqing = content.dateShenqing
                    //发生日期
                     _self.dateFasheng=content.dateFasheng.split(' ')[0]

                    _self.beizhu = content.beizhu
                    //接受方
                    _self.jieshou = data.flowList
                    //发送方
                    _self.fromRoomClass = noral.currRoomClassName
                    _self.fromRoomName = noral.curRoomName
                    _self.fromroomImid = noral.currRoomImId
                    _self.fromuserId = noral.table.userId
                    //日志
                    _self.noteList = data.noteList
                //    _self.rizhi= nes.nes.cdas(_self.noteList[0].creatDate,"MM.dd hh:mm")
                    // console.log(">>>>>>>>>>>>>>"+_self.fordata(15899599999,"MM.dd hh:mm"))
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
                    //当前用户房间信息
                    _self.usermain(response.data.result.flowList, JSON.parse(response.data.result.noralJson).table.projectid)
                    //图片  附件
                    //其他信息
                    _self.projectid = noral.table.projectid
                    _self.currRoomImId = noral.currRoomImId
                }
            })
        },
        //点击头像
        userimg: function(userid) {
            app.lookUserInfo(userid);
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
            window.appApi.openNewWindow(getPagePath() + "/contacts/eg_details.html?userId=" +  _self.userId);
        },
        //查询当前用户信息
        usermain: function(seeimg, sn) {
            var _self = this
            this.$http.post("/pcontact_api/getroombyprojectsn?projectSn=" + sn + "&userId=" + _self.userid).then(function(response) {
                var result = response.data.result;
                if(response.data.code == 0) {
                    _self.toroomid = response.data.result.roomId
                    _self.curoomname = response.data.result.roomName
                    _self.currroomid = response.data.result.roomId
                    _self.nowroomImId = response.data.result.roomImId
                    _self.tuifromcurrRoomName=response.data.result.roomClass
//								var n = response.data.result.roomClass
//								if(n == 1) {
//									_self.tuifromcurrRoomName = "施工单位"
//								} else if(n == 2) {
//									_self.tuifromcurrRoomName = "建设单位"
//								} else if(n == 3) {
//									_self.tuifromcurrRoomName = "勘察单位"
//								} else if(n == 4) {
//									_self.tuifromcurrRoomName = "设计单位"
//								} else if(n == 5) {
//									_self.tuifromcurrRoomName = "监理单位"
//								} else if(n == 6) {
//									_self.tuifromcurrRoomName = "质检单位"
//								} else if(n == 7) {
//									_self.tuifromcurrRoomName = "材料商"
//								} else if(n == 8) {
//									_self.tuifromcurrRoomName = "劳务分包商"
//								} else if(n == 9) {
//									_self.tuifromcurrRoomName = "劳务班组"
//								} else if(n == 11) {
//									_self.tuifromcurrRoomName = "总包单位"
//								}
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
                                        docid: this.$route.query.id,
                                        //												uid: _self.uid,
                                        roomid: _self.currroomid,
                                        projectid: _self.projectid,
                                    }
                                    console.log(par)
                                    this.$http.post("/contract/set_sign", par).then(function (res_) {
                                        if (res_.data.code == 200) {
                                            var parm = {
                                                "toImId": _self.currRoomImId,
                                                "chatType": "2",
                                                "toNickName": "",
                                                "toAvatarUrl": "",
                                                //														myExtType: 'notify_type',
                                                "content": roomname + "已签收" + _self.fromRoomName + "的收付款",
                                            }
                                            console.log(parm)
                                            appApi.sendNotifyMsg(parm)
                                            _self.initdata();
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
            window.location.href="/static/newwebstatic/shoufukuan/ttp.html?id=" + this.$route.query.id + "&projectid=" + _self.projectid + "&roomid=" + _self.toroomid + "&roomname=" + _self.curoomname + "&typ=1" + "&nowroomImId=" + _self.nowroomImId+ "&formroomimid=" + _self.fromroomImid +"&fromRoomName=" + _self.fromRoomName 
//						appApi.openNewWindow(getUrl() + "/static/newwebstatic/shoufukuan/ttp.html?id=" + this.$route.query.id + "&projectid=" + _self.projectid + "&roomid=" + _self.toroomid + "&roomname=" + _self.curoomname + "&typ=1" + "&nowroomImId=" + _self.nowroomImId+ "&formroomimid=" + _self.fromroomImid +"&fromRoomName=" + _self.fromRoomName )
        },
        no: function() {
            var _self = this
            window.location.href="/static/newwebstatic/shoufukuan/ttp.html?id=" + this.$route.query.id + "&projectid=" + _self.projectid + "&roomid=" + _self.toroomid + "&roomname=" + _self.fromRoomName + "&typ=4" + "&nowroomImId=" + _self.nowroomImId + "&formroomimid=" + _self.fromroomImid + "&title=" + _self.title + "&roomclass=" + _self.fromRoomClass + "&leibie=" + _self.content.contractName
//						appApi.openNewWindow(getUrl() + "/static/newwebstatic/shoufukuan/ttp.html?id=" + this.$route.query.id + "&projectid=" + _self.projectid + "&roomid=" + _self.toroomid + "&roomname=" + _self.fromRoomName + "&typ=4" + "&nowroomImId=" + _self.nowroomImId + "&formroomimid=" + _self.fromroomImid + "&title=" + _self.title + "&roomclass=" + _self.fromRoomClass + "&leibie=" + _self.content.contractName)
        },
        pin: function() {
            var _self = this
            window.location.href="/static/newwebstatic/shoufukuan/ttp.html?id=" + this.$route.query.id + "&projectid=" + _self.projectid + "&roomid=" + _self.toroomid + "&roomname=" + _self.curoomname + "&typ=3" + "&nowroomImId=" + _self.nowroomImId
//						appApi.openNewWindow(getUrl() + "/static/newwebstatic/shoufukuan/ttp.html?id=" + this.$route.query.id + "&projectid=" + _self.projectid + "&roomid=" + _self.toroomid + "&roomname=" + _self.curoomname + "&typ=3" + "&nowroomImId=" + _self.nowroomImId)
            //						window.location.href=getUrl() + "/static/newwebstatic/lianxi/ttp.html?id=" + this.$route.query.id + "&projectid=" + _self.projectid + "&roomid=" + _self.toroomid + "&roomname=" + _self.curoomname + "&typ=3"+"&nowroomImId="+_self.nowroomImId
        },
    }
}
</script>
<style>
        .mui-content {
            background: #fff;
            text-align: left;
            padding-bottom: 50px;
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
        .process-label{
            float: left;
        }
        .item .process-list{
            position: relative;
        }
        .process-label .img-header{
            position: relative;
            z-index: 2;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            overflow: hidden;
        }
        .process-label .img-header img{
            display: block;
            width: 100%;
            height: 100%;
            border:0;
        }
        .process-con{
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
            content: '';
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
        .oa-contact-email{
            font-size: 14px;
        }
        .oa-contact-email span:nth-child(1){
            float: left;
        }
        .con .oa-contact-email .sta {
            color: #ccc;
        }
</style>
