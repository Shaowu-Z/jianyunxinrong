<template>
  <div>
    

  <div id="app" class="mui-views">
	<div class="mui-view">
		<div class="mui-navbar">
		</div>
		<div class="mui-pages">
		</div>
	</div>
</div>
<div id="select_member" class="mui-page">
	<div id="head_2" class="mui-navbar-inner mui-bar mui-bar-nav" style="display: none;">
		<button id="btn-referrer" class="mui-action-back mui-btn mui-btn-link mui-btn-nav mui-pull-left hide">
			<span class="mui-icon mui-icon-back"></span>取消
		</button>
		<h1 class="mui-center mui-title">群组创建</h1>
	</div>

	<div id="head_1" class="mui-navbar-inner mui-bar mui-bar-nav" style="display: block;">
		<h1 class="mui-center mui-title">选择联系人</h1>
	</div>
	<div id="member_div1" class="mui-page-content" style="display: block;">
		<div id="listScroll" class="mui-scroll-wrapper">
			<div class="mui-scroll">
				<section class="mui-content text" id="">
					<div id="tabbar-with-contact" class="mui-control-content address-list mui-active">
						<a @click="showProjectList">
							<h5 class="mui-content-padded" style="margin-top:44px">项目列表(点击收缩或展开)</h5>
						</a>
						<div v-if="projectListStatus" id="project_list_id" style="display:block;">
							<div v-for="(item,index) in projects" :key="index">
								<ul class="mui-table-view">
									<li class="mui-table-view-cell mui-collapse" style="    border-bottom: 1px solid #efeff4;">
										 <a @click ="clickshow(index)" style="border-bottom: 1px solid #ccc;">
											<div class="mui-slider-cell">
												<div class="oa-contact-cell mui-table">
													<div class="oa-contact-avatar mui-table-cell">
														<img src="../../assets/images/ico_connect_project.jpg" />
													</div>
													<div class="oa-contact-content mui-table-cell">
														<h4 class="oa-contact-name" v-text="item.ProjectName"></h4>
													</div>
												</div>
											</div>
										</a>
										<ul class="mui-table-view" :class="{'dis' : Listshow.indexOf(index) !== -1}">
											<li class="mui-table-view-cell">
												<div class="mui-slider-cell">
													<div class="oa-contact-cell mui-table">
														<div class="oa-contact-avatar mui-table-cell">
															<img src="../../assets/images/ico_second.gif" />
														</div>
														<div class="oa-contact-content mui-table-cell">
															<a href="#select_project"  :data-project-id="item.serialNum"  :data-project-name="item.ProjectName" class="oa-contact-name"><span class="oa-contact-content mui-table-cell">所有参与人员</span></a>
														</div>
													</div>
												</div>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</div>

						<a @click="showTeamList">
							<h5 class="mui-content-padded">团队列表(点击收缩或展开)</h5>
						</a>
						<div v-if="teamListStatus" style="display:block;">
							<div v-for="(item,index) in items" :key="index">
								<ul class="mui-table-view">
									<li class="mui-table-view-cell mui-collapse fold-title">
										<a @click ="clickshow">
											<div class="mui-slider-cell">
												<div class="oa-contact-cell mui-table">
													<div class="oa-contact-avatar mui-table-cell">
														<img src="../../assets/images/ico_org.gif" />
													</div>
													<div class="oa-contact-content mui-table-cell">
														<h4 class="oa-contact-name" v-text="item.teamName"></h4>
													</div>
												</div>
											</div>
										</a>
										<ul class="mui-table-view" v-show="true">
											<li class="mui-table-view-cell">
												<div class="mui-slider-cell">
													<div class="oa-contact-cell mui-table">
														<div class="oa-contact-avatar mui-table-cell">
															<img src="../../assets/images/ico_second.gif" />
														</div>
														<div class="oa-contact-content mui-table-cell">
															<a href="#select_children"  :data-team-id="item.teamId" :data-team-name="item.teamName"  class="oa-contact-name"><span class="oa-contact-content mui-table-cell">组织架构</span></a>
														</div>
													</div>
												</div>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</div>

						<h5 class="mui-content-padded">好友列表</h5>
						<div id='list' class="address-list">
							<div class="mui-indexed-list-alert"></div>
							<div class="mui-indexed-list-inner">
								<ul class="mui-table-view">
									<div v-for="(items,index) in friendsList" :key="index">
										<div v-for="(item,index) in items" :key="index">
											<div v-if="item.name">
												<!--以下是单选-->
												<li class="mui-table-view-cell mui-indexed-list-item" style="border-bottom: 1px solid #ccc;">
													<a @click="selectUser(item,'friends')">
														<div class="mui-slider-cell">
															<div class="oa-contact-cell mui-table">
																<div class="oa-contact-avatar mui-table-cell">
																	<img :src="item.headerImage">
																</div>
																<div class="oa-contact-content mui-table-cell">
																	<h4 class="oa-contact-name" v-text="item.name"></h4>
																	<p class="oa-contact-email" v-text="item.phone"></p>
																</div>
															</div>
														</div>
													</a>
												</li>
											</div>
										</div>
									</div>
								</ul>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	</div>

	<div id="member_div2" style="display: none;">
		<ul class="mui-table-view eg-table-view eg-detail-list">
			<li class="mui-table-view-cell mui-input-row">
				<label>群名称</label>
				<input id="group_name_id" type="text" v-model="groupName" />
			</li>
			<li class="member-box box-border">
				<div class="member-header mui-table-view-cell">
					<div class="mui-navigate-right">群成员<span class="mui-badge mui-badge-inverted" v-text="selectNumStr"></span></div>
				</div>
				<div id="member_image_id" class="member-list">
					<div class="mui-table-cell"><div onclick="javascript:controlUpdate(1);"><img src="../../assets/images/ico_add.png"></div></div>
				</div>
			</li>
		</ul>
		<ul class="mui-table-view eg-table-view eg-detail-list">
			<li class="mui-table-view-cell">
				群类型<span class="mui-badge mui-badge-inverted">普通群</span>
			</li>
		</ul>

		<div class="fixed-bottom">
			<div id="toastBtn" class="mui-table mui-text-center">
				<div class="mui-table-cell"><button onclick="app.createGroup()" type="button" class="mui-btn mui-btn-primary">完成创建</button></div>
			</div>
		</div>
	</div>
</div>

<div id="select_children" class="mui-page">
	<div class="mui-navbar-inner mui-bar mui-bar-nav">
		<div class="mui-navbar-inner mui-bar mui-bar-nav">
			<button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left">
				<span class="mui-icon mui-icon-left-nav"></span>返回
			</button>
			<h1 class="mui-center mui-title">组织架构</h1>
			<!--<button class="mui-btn mui-btn-nav mui-btn-primary mui-pull-right mui-disabled ok-btn" onclick="app.trueSelectUser()">完成</button>-->
		</div>
	</div>
	<div class="mui-page-content">
		<div class="mui-scroll-wrapper">
			<div class="mui-scroll">
				<section class="mui-content">
					<div id="dept_head" class="group-header">
						<div id="select_children_scroll" class="mui-scroll-wrapper member mui-segmented-control mui-segmented-control-inverted">
							<div id="children_scroll" class="mui-scroll">
								<div class="mui-control-item selected">
									联系人 &gt;
								</div>
								<div v-for="(obj,index) in select_children.navList" :key="index">
									<div v-if="index == 0">
										<div v-if="index == (select_children.navList.length-1)">
											<div class="mui-control-item mui-active enabled" href="javascript:;" v-text="obj.teamName"></div>
										</div>
										<div v-else>
											<div class="mui-control-item selected" :data-team-id="obj.teamId" :data-team-name="obj.teamName"  v-text="obj.teamName + '&gt;'"></div>
										</div>
									</div>
									<div v-if="index > 0">
										<div v-if="index == (select_children.navList.length-1)">
											<div class="mui-control-item mui-active enabled" href="javascript:;" v-text="obj.deptName"></div>
										</div>
										<div v-else>
											<div class="mui-control-item selected" :data-dept-id="obj.deptId" :data-dept-name="obj.deptName"  v-text="obj.deptName + '&gt;'"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="mui-control-content address-list mui-active">
						<div v-if="deptList.length > 0">
							<h5 class="mui-content-padded">子部门列表</h5>
						</div>
						<div  v-for="(item,index) in deptList" :key="index">
							<ul class="mui-table-view group-list">

								<!--以下是单选操作-->
								<li class="mui-table-view-cell mui-indexed-list-item">
									<a  onchange="selEvent(this)">
										<div class="mui-slider-cell">
											<div class="oa-contact-cell mui-table">
												<div class="oa-contact-content mui-table-cell">
													<h4 class="oa-contact-name" v-text="item.deptName"></h4>
												</div>
											</div>
										</div>
									</a>
								</li>
								
								<div class="sub-btn" @click="selectDept(item.deptId,item.deptName,$event)"><span class="mui-icon iconfont icon-sub"></span>下级</div>
							</ul>
						</div>
						<div v-if="memberList.length > 0">
							<h5 class="mui-content-padded">部门成员</h5>
							<div class="address-list">
								<div class="">
									<ul class="mui-table-view">
										<div v-for="(item,index) in memberList" :key="index">

											<!--以下是单选-->
											<li class="mui-table-view-cell mui-indexed-list-item">
												<a @click="selectUser(item,'team')">
													<div class="mui-slider-cell">
														<div class="oa-contact-cell mui-table">
															<div class="oa-contact-avatar mui-table-cell">
																<img :src="item.userAvatar">
															</div>
															<div class="oa-contact-content mui-table-cell">
																<h4 class="oa-contact-name" v-text="item.memberName"></h4>
																<p class="oa-contact-email" v-text="item.phoneNumber"></p>
															</div>
														</div>
													</div>
												</a>
											</li>

											
										</div>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
			<div v-if="deptList.length == 0 && memberList.length == 0">
				<div class="no-group">
					<div class="no-record-img"></div>
					<p>该部门暂无成员</p>
				</div>
			</div>
		</div>
	</div>
</div>

<div id="select_project" class="mui-page">
	<div class="mui-navbar-inner mui-bar mui-bar-nav">
		<div class="mui-navbar-inner mui-bar mui-bar-nav">
			<button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left">
				<span class="mui-icon mui-icon-left-nav"></span>返回
			</button>
			<h1 class="mui-center mui-title">组织架构</h1>
			<!--<button class="mui-btn mui-btn-nav mui-btn-primary mui-pull-right mui-disabled ok-btn" onclick="app.trueSelectUser()">完成</button>-->
		</div>
	</div>
	<div class="mui-page-content">
		<div class="mui-scroll-wrapper">
			<div class="mui-scroll" id="sc">
				<section class="mui-content">
					<div id="dept_head" class="group-header">
						<div id="select_project_scroll" class="mui-scroll-wrapper member mui-segmented-control mui-segmented-control-inverted">
							<div id="project_scroll" class="mui-scroll">
								<div class="mui-control-item selected">
									联系人 &gt;
								</div>
								<div v-for="(obj,index) in navList" :key="index">
									<div v-if="index == 0">
										<div v-if="index == (navList.length-1)">
											<div class="mui-control-item mui-active enabled" href="javascript:;" v-text="obj.teamName"></div>
										</div>
										<div v-else>
											<div class="mui-control-item selected" :data-team-id="obj.teamId" :data-team-name="obj.teamName"  v-text="obj.teamName + '&gt;'"></div>
										</div>
									</div>
									<div v-if="index > 0">
										<div v-if="index == (navList.length-1)">
											<div class="mui-control-item mui-active enabled" href="javascript:;" v-text="obj.deptName"></div>
										</div>
										<div v-else>
											<div class="mui-control-item selected" :data-dept-id="obj.deptId" :data-dept-name="obj.deptName"  v-text="obj.deptName + '&gt;'"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="mui-control-content address-list mui-active">
						<div v-if="selDept.length > 0">
							<h5 class="mui-content-padded">项目联系人</h5>
						</div>
						<ul class="mui-table-view" v-if="selDept.length > 0">
							<div  v-for="(item,index) in selDept" :key="index">
								<li class="mui-table-view-cell" v-if="item.type==2&&item.memberNumber>0">
									<a class="mui-navigate-right" @click="getRoomMembers(index,-1,item.roomClassName)">
										<div class="oa-contact-cell mui-table">
											<div class="oa-contact-avatar mui-table-cell">
												<img :src="item.iconUrl"/>
											</div>
											<div class="oa-contact-content mui-table-cell">
												<h4 class="oa-contact-name" v-text="item.roomClassName"></h4>
												<p class="oa-contact-email"><span v-text="item.roomName"></span>（<span v-text="item.roomMembers.items.length"></span>）人</p>
											</div>
										</div>
									</a>
								</li>
								<li class="mui-table-view-cell mui-collapse" v-if="item.type==1&&item.items.length>0">
									<a class="mui-navigate-right">
										<div class="oa-contact-cell mui-table">
											<div class="oa-contact-avatar mui-table-cell">
												<img :src="item.iconUrl"/>
											</div>
											<div class="oa-contact-content mui-table-cell">
												<h4 class="oa-contact-name" v-text="item.roomClassName"></h4>
											</div>
										</div>
									</a>
									<div class="mui-collapse-content" style="padding-top: 0px;">
										<ul class="mui-table-view" style="margin-top: 0px;">
											<div v-for="(it,index) in item.items" :key="index">
												<li class="mui-table-view-cell" v-if="it.roomMembers.items.length>0">
													<a class="mui-navigate-right" @click="getRoomMembers(index,i,it.roomName)">
														<div class="oa-contact-cell mui-table">
															<div class="oa-contact-avatar mui-table-cell mui-col-xs-3">
																<img :src="item.iconUrl"/>
															</div>
															<div class="oa-contact-content mui-table-cell mui-col-xs-9">
																<h4 class="oa-contact-name" v-text="it.roomName"></h4>
																<p class="oa-contact-email"><span v-text="it.ownerName"></span>（<span v-text="it.roomMembers.items.length"></span>）人</p>
															</div>
														</div>
													</a>
												</li>
											</div>
										</ul>
									</div>
								</li>
								<!--<div class="sub-btn" @click="selectDept(item.deptId,item.deptName,$event)"><span class="mui-icon iconfont icon-sub"></span>下级</div>-->
							</div>
						</ul>
						
						<div v-if="memberList.length > 0">
							<h5 class="mui-content-padded">部门成员</h5>
							<div class="address-list">
								<div class="">
									<ul class="mui-table-view">
										<div v-for="(item,index) in memberList" :key="index">

											<!--以下是单选-->
											<li class="mui-table-view-cell mui-indexed-list-item">
												<a @click="selectUser(item,'project')">
													<div class="mui-slider-cell">
														<div class="oa-contact-cell mui-table">
															<div class="oa-contact-avatar mui-table-cell">
																<img :src="item.userIcon">
															</div>
															<div class="oa-contact-content mui-table-cell">
																<h4 class="oa-contact-name" v-text="item.nickName"></h4>
																<p class="oa-contact-email" v-text="item.cellPhone"></p>
															</div>
														</div>
													</div>
												</a>
											</li>

											
										</div>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
			
		</div>
	</div>
</div>

<!--遮罩层-->
<div id="backdrop" class="mui-backdrop" style="display:none ;z-index: 999;"></div>

<!--长按收藏弹框-->
<div id="window" class="mui-popup mui-popup-in" style="display:none ;">
    <div class="send-box">
        <div class="send-title">发送给：</div>

        <div class="oa-contact-cell mui-table">
            <div class="oa-contact-avatar mui-table-cell">
                <img :src="ucon">
            </div>
            <div class="oa-contact-content mui-table-cell">
                <h4 class="oa-contact-name" v-text="name"></h4>
                <!--<p class="oa-contact-email" v-text="count"></p>-->
            </div>
        </div>

        <div class="send-con">
            <p class="mui-ellipsis-2 mui-text-left">您正在邀请<span v-text="name"></span>登记新项目</p>
        </div>

        <ul class="mui-table-view input-box">
            <li class="mui-table-view-cell mui-input-row">
                <input v-model="remark" type="text" autofocus placeholder="我想说"/>
            </li>
        </ul>
        <div class="footer">
            <button class="mui-btn mui-btn-link btn-normal" @click="cancel()">取消</button>
            <button class="mui-btn mui-btn-link" @click="confirm()">发送</button>
        </div>
    </div>
</div>

  </div>
</template>

<script>
import laowu_common from './js/laowu_common.js';
var paramMap;

export default {
  data () {
    return {
	
	select_member:{
		items:[],
		friendsList:[],
		key:"",
		selArr:[],
		myId:"",
		selDept:[],
		selectNumStr:"",
		groupName:"",
		projects:[],
		projectListStatus:true,
		teamListStatus:true,
		Listshow:[],
	},
	select_children:{
		deptList:[],
		memberList:[],
		navList:[],
		selArr:[],
		myId:"",
		selDept:[]
	  },
	window:{
		names:[],
		phones:[],
        ucons:[],
		userId:"",
        name:"",
        phone:"",
		ucon:"",
		count:0,
        remark:"",
	  },
	 select_project:{
		deptList:[],
		memberList:[],
		navList:[],
		selArr:[],
		myId:"",
		selDept:[],
	 } ,
    }
  },
  created: function () {
    var _self = this;
    paramMap=laowu_common.paramMap
    _self.myId=paramMap.userId
		_self.$http.post("/chart/column/table_swprojectinfo?used=getPro",{}).then(function (response) {
         console.log("数据1",response.data.result)
            _self.$data.projects = response.data.result;
        }).catch(function (error) {
            console.info(error);
        });
        setTimeout(function(){
        	_self.$http.post("/concats_api/find_team_list",{}).then(function (response) {
        _self.$data.items = response.data.result;
        console.log("数据2",response.data.result)
			}).catch(function (error) {
				console.info(error);
			});
        },200);
		var param = new FormData();
		param.append("userId", "");
		setTimeout(function(){
			_self.$http.post("/concats_api/find_eg_list", param).then(function (response) {
				_self.$data.friendsList = _self.convertData(response.data.result);
				console.log("好友列表",_self.$data.friendsList)
			}).catch(function (error) {
				console.info(error);
			});
		},400);
  },
  mounted:function(){
    //	document.getElementById("list").style.display = "block";
  },
  methods:{
	   selectUser:function(item,type) {
	if(type=='project'){
        windowVue.name=item.nickName;
        windowVue.phone=item.cellPhone;
        windowVue.ucon=item.userIcon;
        windowVue.userId=item.userId;
	}else if(type=='team'){
        windowVue.name=item.memberName;
        windowVue.phone=item.phoneNumber;
        windowVue.ucon=item.userAvatar;
        windowVue.userId=item.userId;
	}else if(type=='friends'){
        windowVue.name=item.name;
        windowVue.phone=item.phone;
        windowVue.ucon=item.headerImage;
        windowVue.userId=item.friendsUserId;
	}

	if(windowVue.userId==userId){
		msg("不能邀请自己")
		return
	}
    showbackdrop();
    showwindow();

},
    showProjectList:function(){
      this.projectListStatus=!this.projectListStatus
    },
    showTeamList:function(){
      this.teamListStatus=!this.teamListStatus
    },
    getImageUrl: function (val) {
			if(val==null || val=="") return getUrl()+"/static/images/60x60.gif";
			return val;
		},
		clickshow: function (index) {
			const newIndex = this.Listshow.indexOf(index);
                if (newIndex === -1) {
                    this.Listshow.push(index);
                    console.log('aaaaa',newIndex)
                } else {
                    this.Listshow.splice(newIndex);
                }
		},
		updated:function () {//DOM更新时，进行调用的方法
			document.getElementById("list").style.display = "block";
			// mui.ready(function () {
			// 	window.indexedList = new mui.IndexedList(list)
			// });
		},
		//确定选中的userIds
		trueSelectUser: function () {
			/**
			 * 必须选人
			 */
			if(selectArr.length<1){
				msg("请选择要邀请的人员")
				return;
			}
            showbackdrop();
            showwindow()
            var names=[];
            var ucons=[];
            windowVue.count=selectArr.length+"(人)";
            for (var i=0;i<selectArr.length;i++){
                names.push(selectArr[i].name);
                ucons.push(selectArr[i].ucon);
			}
            windowVue.name=names.join(",");
			console.log(selectArr)
			return
			var l = loading("创建中，请稍等");
			var selectUserIdsEvy = "";
			for(var i=0;i<selectArr.length;i++){
				if(i==selectArr.length-1){
					selectUserIdsEvy+=selectArr[i];
				}else{
					selectUserIdsEvy+=selectArr[i]+",";
				}
			}
			selectUserIds = selectUserIdsEvy;
			var param = {userIds:selectUserIds};//查询头像list返回
			var _self = this;
//			var groupName = this.groupName;
			var groupName = "";
			axios.post(getUrl()+"/concats_api/query_gms_info_select",param).then(function (response) {
				var reps = response.data.result;
				_self.$data.none = reps;
				var mList = reps.groupMemberTempVOList;
				var lengths = mList.length;
				for(var i=0;i<lengths;i++){
					if(i==lengths-1){
						groupName+=mList[i].nickName;
					}else{
						groupName+=mList[i].nickName+"、";
					}
				}
				if(groupName.length>18){
					groupName = groupName.substring(0,17)+"...";
				}
				console.log(groupName)
				_self.createGroup(groupName,l)
//				console.info(response.data.result);
			}).catch(function (error) {
				layer.close(l)
				console.info(error);
			});
			viewApi.back();//关闭选择子部门div
		},
		createGroup: function (groupName,l) {
			
//			if(groupName == null || groupName ==''){
//				layer.open({
//					content: "请填写群组名称"
//					,skin: 'msg'
//					,time: 1 //2秒后自动关闭
//					,anim:false
//				});
//				return;
//			}

			//创建群组
			//var tempId = window.location.href.split("?")[1].split("=")[1];
			var pram = {groupType:"2",userIds:selectUserIds,groupName:groupName};//自主创建群组
			axios.post(getUrl()+"/concats_api/create_group",pram).then(function (response) {
				console.log(response.data.result.sdkChatId)
				if(response.data.code==200){
					var userAvatar = getUrl()+"/static/images/ico_groupchat.png";
					appApi.openChat(response.data.result.sdkChatId,userAvatar,groupName,2);//群聊
//					layer.open({
//						content: "创建成功!"
//						,skin: 'msg'
//						,time: 1 //2秒后自动关闭
//						,anim:false
//					});
				}else{
					mui.toast("创建群组失败,请联系管理员!")
				}
				layer.close(l);
			}).catch(function (error) {
				layer.close(l)
//				alert("创建群组失败,请联系管理员!");
				mui.toast("创建群组失败,请联系管理员!")
				console.info(error);
			});
			viewApi.back();//关闭选择子部门div
    },
     convertData:function(friendArray) {
	    if (friendArray && friendArray.length > 0) {

		var newArrs = new Array();
		for (var i = 0; i < 27; i++) {
			newArrs[i] = new Array();
		}
		for (var j = 0; j < friendArray.length; j++) {

			var f = friendArray[j].nameInitials.toUpperCase();
			var headerImage = !friendArray[j].avatar || friendArray[j].avatar == "" ? getUrl() + "/static/images/60x60.gif" : friendArray[j].avatar;
			var obj = {
				name: friendArray[j].remarksName,
				phone: friendArray[j].cellPhone,
				friendsUserId: friendArray[j].friendsUserId,
				headerImage: headerImage,
				imId: friendArray[j].imId
			};
			switch (f) {
				case 'A' :
					obj['first'] = 'A';
					if (newArrs[0].length == 0) {
						obj['isp'] = 1;
					}
					newArrs[0][newArrs[0].length] = obj;
					break;
				case 'B' :
					obj['first'] = 'B';
					if (newArrs[1].length == 0) {
						obj['isp'] = 1;
					}
					newArrs[1][newArrs[1].length] = obj;
					break;
				case 'C' :
					obj['first'] = 'C';
					if (newArrs[2].length == 0) {
						obj['isp'] = 1;
					}
					newArrs[2][newArrs[2].length] = obj;
					break;
				case 'D' :
					obj['first'] = 'D';
					if (newArrs[3].length == 0) {
						obj['isp'] = 1;
					}
					newArrs[3][newArrs[3].length] = obj;
					break;
				case 'E' :
					obj['first'] = 'E';
					if (newArrs[4].length == 0) {
						obj['isp'] = 1;
					}
					newArrs[4][newArrs[4].length] = obj;
					break;
				case 'F' :
					obj['first'] = 'F';
					if (newArrs[5].length == 0) {
						obj['isp'] = 1;
					}
					newArrs[5][newArrs[5].length] = obj;
					break;
				case 'G' :
					obj['first'] = 'G';
					if (newArrs[6].length == 0) {
						obj['isp'] = 1;
					}
					newArrs[6][newArrs[6].length] = obj;
					break;
				case 'H' :
					obj['first'] = 'H';
					if (newArrs[7].length == 0) {
						obj['isp'] = 1;
					}
					newArrs[7][newArrs[7].length] = obj;
					break;
				case 'I' :
					obj['first'] = 'I';
					if (newArrs[8].length == 0) {
						obj['isp'] = 1;
					}
					newArrs[8][newArrs[8].length] = obj;
					break;
				case 'J' :
					obj['first'] = 'J';
					if (newArrs[9].length == 0) {
						obj['isp'] = 1;
					}
					newArrs[9][newArrs[9].length] = obj;
					break;
				case 'K' :
					obj['first'] = 'K';
					if (newArrs[10].length == 0) {
						obj['isp'] = 1;
					}
					newArrs[10][newArrs[10].length] = obj;
					break;
				case 'L' :
					obj['first'] = 'L';
					if (newArrs[11].length == 0) {
						obj['isp'] = 1;
					}
					newArrs[11][newArrs[11].length] = obj;
					break;
				case 'M' :
					obj['first'] = 'M';
					if (newArrs[12].length == 0) {
						obj['isp'] = 1;
					}
					newArrs[12][newArrs[12].length] = obj;
					break;
				case 'N' :
					obj['first'] = 'N';
					if (newArrs[13].length == 0) {
						obj['isp'] = 1;
					}
					newArrs[13][newArrs[13].length] = obj;
					break;
				case 'O' :
					obj['first'] = 'O';
					if (newArrs[14].length == 0) {
						obj['isp'] = 1;
					}
					newArrs[14][newArrs[14].length] = obj;
					break;
				case 'P' :
					obj['first'] = 'P';
					if (newArrs[15].length == 0) {
						obj['isp'] = 1;
					}
					newArrs[15][newArrs[15].length] = obj;
					break;

				case 'Q' :
					obj['first'] = 'Q';
					if (newArrs[16].length == 0) {
						obj['isp'] = 1;
					}
					newArrs[16][newArrs[16].length] = obj;
					break;
				case 'R' :
					obj['first'] = 'R';
					if (newArrs[17].length == 0) {
						obj['isp'] = 1;
					}
					newArrs[17][newArrs[17].length] = obj;
					break;
				case 'S' :
					obj['first'] = 'S';
					if (newArrs[18].length == 0) {
						obj['isp'] = 1;
					}
					newArrs[18][newArrs[18].length] = obj;
					break;
				case 'T' :
					obj['first'] = 'T';
					if (newArrs[19].length == 0) {
						obj['isp'] = 1;
					}
					newArrs[19][newArrs[19].length] = obj;
					break;
				case 'U' :
					obj['first'] = 'U';
					if (newArrs[20].length == 0) {
						obj['isp'] = 1;
					}
					newArrs[20][newArrs[20].length] = obj;
					break;
				case 'V' :
					obj['first'] = 'V';
					if (newArrs[21].length == 0) {
						obj['isp'] = 1;
					}
					newArrs[21][newArrs[21].length] = obj;
					break;
				case 'W' :
					obj['first'] = 'W';
					if (newArrs[22].length == 0) {
						obj['isp'] = 1;
					}
					newArrs[22][newArrs[22].length] = obj;
					break;
				case 'X' :
					obj['first'] = 'X';
					if (newArrs[23].length == 0) {
						obj['isp'] = 1;
					}
					newArrs[23][newArrs[23].length] = obj;
					break;
				case 'Y' :
					obj['first'] = 'Y';
					if (newArrs[24].length == 0) {
						obj['isp'] = 1;
					}
					newArrs[24][newArrs[24].length] = obj;
					break;
				case 'Z' :
					obj['first'] = 'Z';
					if (newArrs[25].length == 0) {
						obj['isp'] = 1;
					}
					newArrs[25][newArrs[25].length] = obj;
					break;
				default:
					obj['first'] = '#';
					if (newArrs[26].length == 0) {
						obj['isp'] = 1;
					}
					newArrs[26][newArrs[26].length] = obj;

			}
		}
		return newArrs;
	} else {
		return []
	}
}
  }
}
</script>

<style>

.oa-contact-input {
			width: 36px !important;
		}
		.mui-control-item.enabled{
			color: inherit !important;
			border:0  !important;
		}
		.mui-control-item.selected{
			color: #4ba9e9 !important;
			border-color: #4ba9e9  !important;
		}
		.mui-scroll-wrapper{
			overflow: scroll;
		}
		.fold-title{
			    border-bottom: 1px solid #efeff4;
		}
		.dis{
        display: block!important
    }
</style>

