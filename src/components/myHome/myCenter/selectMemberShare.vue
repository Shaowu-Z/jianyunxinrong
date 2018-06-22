<template>
	<div id="app">
		<div id="app_div" class="mui-views">
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
				<h1 class="mui-center mui-title">选择人员</h1>
			</div>
			<div id="head_1" class="mui-navbar-inner mui-bar mui-bar-nav" style="display: block;">
				<button id="btn-referrer2" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left" onclick="controlUpdate(2);" style="display: none;">
					<span class="mui-icon"></span>取消
				</button>
				<!-- 第一次进入此页面显示-->
				<button id="btn-referrer3" class="mui-action-back mui-btn mui-btn-link mui-btn-nav mui-pull-left" style="display: none;">
					<span class="mui-icon mui-icon-back"></span>取消
				</button>
				<h1 class="mui-center mui-title">选择联系人</h1>
				<button class="mui-btn mui-btn-nav mui-btn-primary mui-pull-right mui-disabled ok-btn" @click="trueSelectUser">完成</button>
			</div>
			<div id="member_div1" class="mui-page-content" style="display: block;">
				<div id="listScroll" class="mui-scroll-wrapper">
					<div class="mui-scroll">
						<section class="mui-content" id="">
							<div id="tabbar-with-contact" class="mui-control-content address-list mui-active">
								<!--
                                	描述：项目列表
                                -->
								<a href="javascript:if(isHideProjectList=='y'){isHideProjectList = 'n';$('#project_list_id').show();}else{isHideProjectList = 'y';$('#project_list_id').hide();}">
									<h5 class="mui-content-padded">项目列表(点击收缩或展开)</h5>
								</a>
								<div id="project_list_id" style="display:block;">
									<ul class="mui-table-view" v-for="(item,index) in projects" :key="index">
										<li class="mui-table-view-cell mui-collapse fold-title">
											<a @click ="clickshow">
												<div class="mui-slider-cell">
													<div class="oa-contact-cell mui-table">
														<div class="oa-contact-avatar mui-table-cell">
															<img src="../../../assets/images/ico_connect_project.jpg" />
														</div>
														<div class="oa-contact-content mui-table-cell">
															<h4 class="oa-contact-name" v-text="item.ProjectName"></h4>
														</div>
													</div>
												</div>
											</a>
											<ul class="mui-table-view" v-show="true">
												<li class="mui-table-view-cell">
													<div class="mui-slider-cell">
														<div class="oa-contact-cell mui-table">
															<div class="oa-contact-avatar mui-table-cell">
																<img src="../../../assets/images/ico_second.gif" />
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
								<!--
                                	描述：团队列表
                                -->
								<a href="javascript:if(isHideTeamList=='y'){isHideTeamList = 'n';$('#team_list_id').show();}else{isHideTeamList = 'y';$('#team_list_id').hide();}">
									<h5 class="mui-content-padded">团队列表(点击收缩或展开)</h5>
								</a>
								<div id="team_list_id" style="display:block;">
									<ul class="mui-table-view" v-for="(item,index) in items" :key="index">
										<li class="mui-table-view-cell mui-collapse fold-title">
											<a @click ="clickshow">
												<div class="mui-slider-cell">
													<div class="oa-contact-cell mui-table">
														<div class="oa-contact-avatar mui-table-cell">
															<img src="../../../assets/images/ico_org.gif" />
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
																<img src="../../../assets/images/ico_second.gif" />
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
								<!--
                                	描述：群聊列表
                                -->
								<a href="javascript:if(isHideGroupChatList=='y'){isHideGroupChatList = 'n';$('#group_chat_list_id').show();}else{isHideGroupChatList = 'y';$('#group_chat_list_id').hide();}">
									<h5 class="mui-content-padded">群聊列表(点击收缩或展开)</h5>
								</a>
								<div id="group_chat_list_id" class="address-list" style="display:block;" >
									<div class="mui-indexed-list-alert"></div>
									<div class="mui-indexed-list-inner">
										<ul class="mui-table-view">
											<li v-if="groupChat1.length>0" v-for="(item,index) in groupChat1" :key="index" class="mui-table-view-cell mui-indexed-list-item mui-checkbox">
												<div class="mui-slider-cell">
													<div class="oa-contact-cell mui-table">
														<div class="oa-contact-input mui-table-cell">
															<input v-if="item.avatar0!=null&&item.avatar0.length>0" type="checkbox" onchange="selEvent(this)" data-type="group" :value="item.sdkChatId" :data-name="item.groupName" :data-img="imgUrl+item.avatar0.split(',')[0]"/>
															<input v-else type="checkbox" onchange="selEvent(this)" data-type="group" :value="item.sdkChatId" :data-name="item.groupName" data-img="http://res.winfreeinfo.com:8000/user/2018/03/15/abfc43ce8f734a92ab5fb614b084bf14__960x960.jpg"/>
														</div>
														<div class="oa-contact-avatar mui-table-cell">
															<!--<img v-if="item.avatar0!=null&&item.avatar0.length>0" :src="app.imgUrl+item.avatar0.split(',')[0]"/>-->
															<img src="../../../assets/images/ico_groupchat.png">
														</div>
														<div class="oa-contact-content mui-table-cell">
															<h4 class="oa-contact-name" v-text="item.groupName"></h4>
															<!--<p class="oa-contact-email" v-text="item.phone"></p>-->
														</div>
													</div>
												</div>
											</li>
											<li v-if="groupChat2.length>0" v-for="(item,index) in groupChat2" :key="index" class="mui-table-view-cell mui-indexed-list-item mui-checkbox">
												<div class="mui-slider-cell">
													<div class="oa-contact-cell mui-table">
														<div class="oa-contact-input mui-table-cell">
															<input v-if="item.avatar0!=null&&item.avatar0.length>0" type="checkbox" onchange="selEvent(this)" data-type="group" :value="item.sdkChatId" :data-name="item.groupName" :data-img="imgUrl+item.avatar0.split(',')[0]"/>
															<input v-else type="checkbox" onchange="selEvent(this)" data-type="group" :value="item.sdkChatId" :data-name="item.groupName" data-img="http://res.winfreeinfo.com:8000/user/2018/03/15/abfc43ce8f734a92ab5fb614b084bf14__960x960.jpg"/>
														</div>
														<div class="oa-contact-avatar mui-table-cell">
															<!--<img v-if="item.avatar0!=null&&item.avatar0.length>0" :src="app.imgUrl+item.avatar0.split(','[0])"/>-->
															<img src="../../../assets/images/ico_groupchat.png">
														</div>
														<div class="oa-contact-content mui-table-cell">
															<h4 class="oa-contact-name" v-text="item.groupName"></h4>
															<!--<p class="oa-contact-email" v-text="item.phone"></p>-->
														</div>
													</div>
												</div>
											</li>
										</ul>
									</div>
								</div>
								<!-- 好友列表 -->
								<h5 class="mui-content-padded"></h5>
								<div id='list' class="address-list">
									<div class="mui-indexed-list-alert"></div>
									<div class="mui-indexed-list-inner">
										<ul class="mui-table-view">
											<div v-for="(items,index) in friendsList" :key="index">
												<div v-for="(item,i) in items" :key="i+10000">
													<li v-if="item.name" :data-value="item.first" class="mui-table-view-cell mui-indexed-list-item mui-checkbox">
														<div class="mui-slider-cell">
															<div class="oa-contact-cell mui-table">
																<div v-if="selectArr.contains(item.friendsUserId +'')">
																	<input  v-if="myId == item.friendsUserId" type="checkbox" checked="checked" disabled="disabled" onchange="selEvent(this)" data-type="user" :value="item.friendsUserId"/>
																	<input v-else type="checkbox" checked="checked" onchange="selEvent(this)" data-type="user" :value="item.friendsUserId"/>
																</div>
																<input v-else type="checkbox" onchange="selEvent(this)" data-type="user" :value="item.friendsUserId"/>
																<div class="oa-contact-avatar mui-table-cell">
																	<img :src="item.headerImage">
																</div>
																<div class="oa-contact-content mui-table-cell">
																	<h4 class="oa-contact-name" v-text="item.name"></h4>
																	<p class="oa-contact-email" v-text="item.phone"></p>
																</div>
															</div>
														</div>
													</li>
												</div>
											</div>
										</ul>
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
		        <!--完成弹出的弹框-->
			</div>
		
			<!--<div id="member_div2" style="display: none;">
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
							<div class="mui-table-cell"><div onclick="javascript:controlUpdate(1);"><img src="../../../assets/images/ico_add.png"></div></div>
							<div class="mui-table-cell"><img src="../../images/header3.jpg"></div>
							<div class="mui-table-cell"><img src="../../images/header4.jpg"></div>
							<div class="mui-table-cell"><img src="../../images/header5.jpg"></div>
							<div class="mui-table-cell"><span class="oa-pic-default bgr3">陈晨</span></div>
							<div class="mui-table-cell"><img src="../../images/ico_add.png"></div>
							<div class="mui-table-cell"><img src="../../images/ico_reduce.png"></div>
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
						<div class="mui-table-cell"><button onclick="createGroup()" type="button" class="mui-btn mui-btn-primary">完成创建</button></div>
					</div>
				</div>
			</div>-->
		</div>
		<div id="select_children" class="mui-page">
			<div class="mui-navbar-inner mui-bar mui-bar-nav">
				<div class="mui-navbar-inner mui-bar mui-bar-nav">
					<button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left">
						<span class="mui-icon mui-icon-left-nav"></span>返回
					</button>
					<h1 class="mui-center mui-title">组织架构</h1>
					<button class="mui-btn mui-btn-nav mui-btn-primary mui-pull-right mui-disabled ok-btn" @click="trueSelectUser()">完成</button>
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
										<div v-for="(obj,index) in navList" :key="index">
											<div v-if="index == 0">
												<div v-if="index == (navList.length-1)" class="mui-control-item mui-active enabled" href="javascript:;" v-text="obj.teamName"></div>
												<div v-else class="mui-control-item selected" :data-team-id="obj.teamId" :data-team-name="obj.teamName"  v-text="obj.teamName + '&gt;'"></div>
											</div>
											<div v-if="index > 0">
												<div v-if="index == (navList.length-1)" class="mui-control-item mui-active enabled" href="javascript:;" v-text="obj.deptName"></div>
												<div v-else class="mui-control-item selected" :data-dept-id="obj.deptId" :data-dept-name="obj.deptName"  v-text="obj.deptName + '&gt;'"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="mui-control-content address-list mui-active">
								<h5 v-if="deptList.length > 0" class="mui-content-padded">子部门列表</h5>
								<ul class="mui-table-view group-list" v-for="(item,index) in deptList" :key="index">
									<li class="mui-table-view-cell mui-checkbox">
										<a @click ="clickshow" class="">
											<div class="oa-contact-cell mui-table">
												<div class="oa-contact-input mui-table-cell">
													<!--<template v-if="selDept.contains(item.deptId +'')">
														<input type="checkbox" checked="checked"  onchange="selEvent(this)" data-type="dept" :value="item.deptId" class="member-select"/>
													</template>
													<template v-else>
														<input type="checkbox" onchange="selEvent(this)" data-type="dept" :value="item.deptId" class="member-select"/>
													</template>-->
													<input type="checkbox" onchange="selEvent(this)" data-type="dept" :value="item.deptId" class="dept-select"/>
												</div>
												<div class="oa-contact-content mui-table-cell">
													<h4 class="oa-contact-name" v-text="item.deptName"></h4>
												</div>
											</div>
										</a>
									</li>
									<div class="sub-btn" @click="selectDept(item.deptId,item.deptName,$event)"><span class="mui-icon iconfont icon-sub"></span>下级</div>
								</ul>
								<h5 class="mui-content-padded" v-if="memberList.length > 0">部门成员</h5>
								<div class="address-list" v-if="memberList.length > 0">
									<div class="">
										<ul class="mui-table-view">
											<li class="mui-table-view-cell mui-indexed-list-item mui-checkbox" v-for="(item,index) in memberList" :key="index">
												<div class="mui-slider-cell">
													<div class="oa-contact-cell mui-table">
														<div class="oa-contact-input mui-table-cell">
															<div v-if="selectArr.contains(item.userId +'')">
																<input v-if="myId == item.userId" type="checkbox" checked="checked" disabled="disabled" onchange="selEvent(this)" data-type="user" :value="item.userId"/>
																<input v-else type="checkbox" checked="checked" onchange="selEvent(this)" data-type="user" :value="item.userId"/>
															</div>
															<input v-else type="checkbox" onchange="selEvent(this)" data-type="user" :value="item.userId"/>
														</div>
														<div class="oa-contact-avatar mui-table-cell">
															<img :src="item.userAvatar">
														</div>
														<div class="oa-contact-content mui-table-cell">
															<h4 class="oa-contact-name" v-text="item.memberName"></h4>
															<p class="oa-contact-email" v-text="item.phoneNumber"></p>
														</div>
													</div>
												</div>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</section>
					</div>
					<!--<div class="no-group"v-if="deptList.length == 0 && memberList.length == 0">
						<div class="no-record-img"></div>
						<p>该部门暂无成员</p>
					</div>-->
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
					<button class="mui-btn mui-btn-nav mui-btn-primary mui-pull-right mui-disabled ok-btn" @click="trueSelectUser()">完成</button>
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
												<div v-if="index == (navList.length-1)" class="mui-control-item mui-active enabled" href="javascript:;" v-text="obj.teamName"></div>
												<div v-else class="mui-control-item selected" :data-team-id="obj.teamId" :data-team-name="obj.teamName"  v-text="obj.teamName + '&gt;'"></div>
											</div>
											<div v-if="index > 0">
												<div v-if="index == (navList.length-1)" class="mui-control-item mui-active enabled" href="javascript:;" v-text="obj.deptName"></div>
												<div v-else class="mui-control-item selected" :data-dept-id="obj.deptId" :data-dept-name="obj.deptName"  v-text="obj.deptName + '&gt;'"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="mui-control-content address-list mui-active">
								<h5 v-if="selDept.length > 0" class="mui-content-padded">项目联系人</h5>
								<ul class="mui-table-view" v-if="selDept.length > 0">
									<div  v-for="(item,index) in selDept" :key="index">
										<div v-if="item.type==2&&item.memberNumber>0" class="oa-contact-input mui-table-cell mui-checkbox select-checkbox-x">
											<input v-if="selectGroupId.contains(item.roomImId)" type="checkbox" checked="checked"  onchange="selEvent(this)" data-type="group" :value="item.roomImId" :data-name="item.roomName" :data-img="item.iconUrl"/>
											<input v-else type="checkbox" onchange="selEvent(this)" data-type="group" :value="item.roomImId" :data-name="item.roomName" :data-img="item.iconUrl"/>
										</div>
										<li class="mui-table-view-cell" v-if="item.type==2&&item.memberNumber>0">
											<a class="mui-navigate-right" @click="getRoomMembers(index,-1,item.roomClassName)">
												<div class="oa-contact-cell mui-table" style="left: 35px;">
													<div class="oa-contact-avatar mui-table-cell">
														<img :src="item.iconUrl">
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
														<img :src="item.iconUrl">
													</div>
													<div class="oa-contact-content mui-table-cell">
														<h4 class="oa-contact-name" v-text="item.roomClassName"></h4>
													</div>
												</div>
											</a>
											<div class="mui-collapse-content" style="padding-top: 0px;">
												<ul class="mui-table-view" style="margin-top: 0px;">
													<div v-for="(it,i) in item.items" :key="i">
														<div class="oa-contact-input mui-table-cell mui-checkbox select-checkbox">
															<input v-if="selectGroupId.contains(it.roomImId)" type="checkbox" checked="checked"  onchange="selEvent(this)" data-type="group" :value="it.roomImId" :data-name="it.roomName" :data-img="item.iconUrl"/>
															<input v-else type="checkbox" onchange="selEvent(this)" data-type="group" :value="it.roomImId" :data-name="it.roomName" :data-img="item.iconUrl"/>
														</div>
														<li class="mui-table-view-cell mui-indexed-list-item " v-if="it.roomMembers.items.length>0">
															<a class="mui-navigate-right" @click="getRoomMembers(index,i,it.roomName)">
																<div class="oa-contact-cell mui-table" style="left: 20px;">
																	<div class="oa-contact-avatar mui-table-cell">
																		<img :src="item.iconUrl"/>
																	</div>
																	<div class="oa-contact-content mui-table-cell" style="left: 15px;">
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
								<h5 class="mui-content-padded" v-if="memberList.length > 0">部门成员</h5>
								<div class="address-list" v-if="memberList.length > 0">
									<div class="">
										<ul class="mui-table-view">
											<li v-for="(item,index) in memberList" :key="index" class="mui-table-view-cell mui-indexed-list-item mui-checkbox">
												<div class="mui-slider-cell">
													<div class="oa-contact-cell mui-table">
														<div class="oa-contact-input mui-table-cell">
															<div v-if="selectArr.contains(item.userId +'')">
																<input v-if="myId == item.userId" type="checkbox" checked="checked" disabled="disabled" onchange="selEvent(this)" data-type="user" :value="item.userId"/>
																<input v-else type="checkbox" checked="checked" onchange="selEvent(this)" data-type="user" :value="item.userId"/>
															</div>
															<input v-else type="checkbox" onchange="selEvent(this)" data-type="user" :value="item.userId"/>
														</div>
														<div class="oa-contact-avatar mui-table-cell">
															<img :src="item.userIcon">
														</div>
														<div class="oa-contact-content mui-table-cell">
															<h4 class="oa-contact-name" v-text="item.nickName"></h4>
															<p class="oa-contact-email" v-text="item.cellPhone"></p>
														</div>
													</div>
												</div>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</section>
					</div>
					<!--<template v-if="deptList.length == 0 && memberList.length == 0">
						<div class="no-group">
							<div class="no-record-img"></div>
							<p>该项目暂无成员</p>
						</div>
					</template>-->
				</div>
			</div>
		</div>
		<!--遮罩层-->
		<div class="mui-backdrop"  id="backdrop" style="display:none;z-index: 999;"></div>
		<div class="mui-popup mui-popup-in" id ="send_collect" style="display:none;">
		    <div class="send-box">
		        <div class="send-title">发送给：</div>
		
		        <!--<div class="oa-contact-cell mui-table">
		            <div class="oa-contact-avatar mui-table-cell">
		                <img src="../../static/images/ico_project-sg.jpg">
		            </div>
		            <div class="oa-contact-content mui-table-cell">
		                <h4 class="oa-contact-name">深圳建工</h4>
		                <p class="oa-contact-email">12人</p>
		            </div>
		        </div>-->
		        <ul class="mui-table-view mui-table-view-striped member-table-view">
		            <!--<li class="mui-table-view-cell col-5">
		                <div class="oa-contact-cell mui-table">
		                    <div class="oa-contact-avatar mui-table-cell">
		                        <img src="../../static/images/ico_project-sg.jpg">
		                    </div>
		                </div>
		            </li>
		            <li class="mui-table-view-cell col-5">
		                <div class="oa-contact-cell mui-table">
		                    <div class="oa-contact-avatar mui-table-cell">
		                        <img src="../../static/images/ico_project-js.jpg">
		                    </div>
		                </div>
		            </li>-->
		            <li class="mui-table-view-cell col-5"  v-for="(obj,index) in items" :key="index">
		                <div class="oa-contact-cell mui-table" ref='divs' id='divs'>
		                    <div class="oa-contact-avatar mui-table-cell">
		                        <img v-bind:src="obj.toAvatarUrl">
		                    </div>
		                </div>
		            </li>
		
		        </ul>
		
		        <div class="send-con">
		            <div class="mui-ellipsis-2 mui-text-left" v-if="types==2">
						<div class="img-content video-content" v-if="types==2">
							<img v-if="thumb!=''&&thumb!=null" v-bind:src="thumb"/>
							<img v-if="thumb==''||thumb==null" src="../../../assets/images/detals.jpg">
						</div>
		            </div>
		            <p class="mui-ellipsis-2 mui-text-left" v-if="types==3">
		                [文件]{{filename}}
		            </p>
		            <div class="mui-ellipsis-2 mui-text-left" v-if="types==1">
						<div class="img-content longer" v-if="types==1">
							<img @click="window.common.initImgPreview()" style="margin-left:15%" v-bind:src="url"/>
						</div>
					</div>
					<p class="mui-ellipsis-2 mui-text-left" v-if="types==5">
						[位置]{{addr}}
					</p>
					<p class="mui-ellipsis-2 mui-text-left" v-if="types==4">
						{{msg}}
					</p>
					<p class="mui-ellipsis-2 mui-text-left" v-if="types==6">
						{{msg}}的名片
					</p>
		        </div>
		
		        <ul class="mui-table-view input-box">
		            <li class="mui-table-view-cell mui-input-row">
		                <input type="text" id="note" placeholder="我想说"/>
		            </li>
		        </ul>
		        <div class="footer">
		            <button id="mui-btn mui-btn-link btn-normal" class="mui-btn mui-btn-link btn-normal">取消</button>
		            <button id="mui-btn mui-btn-link" class="mui-btn mui-btn-link">发送</button>
		        </div>
		    </div>
		</div>
	</div>
</template>

<script>
	
	var userId = "10632";
	export default {
	  	data () {
	    	return {
	    		items:[],
				friendsList:[],
				key:"",
				selArr:[],
				myId:userId,
				selDept:[],
				selectNumStr:"",
				groupName:"",
				projects:[],
				groupChat1:[],
				groupChat2:[],
				imgUrl : "http://res.winfreeinfo.com:8000",
				deptList:[],
				memberList:[],
				navList:[],
				selArr:[],
				selDept:[],
				types:0,
				
	    	}
	    },
	    created(){
	   		var _self = this;
			_self.$http.post("/chart/column/table_swprojectinfo?used=getPro", {}).then(function (response) {
	//          console.log("数据",response.data.result)
	            _self.$data.projects = response.data.result;
	        }).catch(function (error) {
	            console.info(error);
	        });
	        setTimeout(function(){
	        	_self.$http.post("/concats_api/find_team_list", {}).then(function (response) {
					_self.$data.items = response.data.result;
				}).catch(function (error) {
					console.info(error);
				});
	        },200);
			
			setTimeout(function(){
	        	_self.$http.post("/concats_api/query_group_list?queryType=0", {}).then(function (response) {
	//				console.log(response.data.result)
					_self.$data.groupChat1 = response.data.result;
				}).catch(function (error) {
					console.info(error);
				});
	        },400);
	        
	        setTimeout(function(){
	        	_self.$http.post("/concats_api/query_group_list?queryType=1",{}).then(function (response) {
					_self.$data.groupChat2 = response.data.result;
	//				console.log(response.data.result)
				}).catch(function (error) {
					console.info(error);
				});
	        },600);
			
			var param = new FormData();
			param.append("userId", "");
			setTimeout(function(){
				_self.$http.post("/concats_api/find_eg_list", param).then(function (response) {
					_self.$data.friendsList = _self.convertData(response.data.result);
//					_self.updated();
				}).catch(function (error) {
					console.info(error);
				});
			},800);
	    },
	    methods:{
	   		getImageUrl: function (val) {
				if(val==null || val=="") return ".../../../assets/images/60x60.gif";
				return val;
			},
			clickshow: function () {
				return true;
			},
//			updated:function () {//DOM更新时，进行调用的方法
//				document.getElementById("list").style.display = "block";
//				mui.ready(function () {
//					window.indexedList = new mui.IndexedList(list)
//				});
//			},
//			//确定选中的userIds
			trueSelectUser: function () {
//				/**
//				 * 必须选人
//				 */
//				if(selectArr.length<1&&selectGroup.length<1){
//					return;
//				}
//				var jsonStr = "";
//				var jsonStrs = [];
//				jsonStrs.push("[")
//	            var l = loading("加载中...");
//	            for(var i=0;i<selectArr.length;i++){
//	                var cardUserId = selectArr[i];
//	//              var nickName;//名片昵称
//	//              var avatarUrl;//名片头像地址
//	//              var imId;//环信ID
//	                $.ajax({
//				        type: "post",
//				        url: getUrl()+"/concats_api/query_contacts_info",
//				        data: {
//				        	"userId":cardUserId
//				        },
//				        datatype: "json",
//				        success: function(data) {
//							console.log(data)
//							var result = data.result.contactsInfoVO;
//	//						jsonStrs.push("{'name':'"+result.imId+"','nick':'"+result.nickName+"','avatar':'"+result.userAvatar+"'},");
//							//chatType:1单聊，2群聊
//							jsonStrs.push('{"toImId":"'+result.imId+'","toNickName":"'+result.nickName+'","toAvatarUrl":"'+result.userAvatar+'","chatType":1},');
//	//						jsonStr += ;
//	//			        	console.log(jsonStr)
//				        },
//				        error:function(){
//				        	mui.toast("获取数据失败");
//				        }
//				    });
//	            }
//	            setTimeout(function () {
//	            	layer.close(l)
//	            	var jsonStr = jsonStrs.join('')+selectGroup.toString();
//	//          	console.log(selectGroup.toString())
//	//          	alert(jsonStr.substring(0,jsonStr.length-1)+"]")
//	//	            appApi.sendCardSetData(jsonStr.substring(0,jsonStr.length-1));
//					if (selectGroup.length>0) {
//						jsonStr = jsonStr+"]";
//					}else{
//						jsonStr = jsonStr.substring(0,jsonStr.length-1)+"]";
//					}
//	//				alert(jsonStr)
//					console.log(JSON.parse(jsonStr));
//					//完成弹出弹框
//	                send_collect.$data.items=JSON.parse(jsonStr);
//	                var paramMap= getParam(window.location.href);//获取地址栏参数1=图片 2=视频 3=文件 4=纯文本 5=位置
//	                send_collect.$data.msg = paramMap.msg;
//	                send_collect.$data.types = paramMap.types;
//					send_collect.$data.filename = paramMap.filename;
//	                send_collect.$data.addr = paramMap.addr;
//					/*alert(paramMap.url);*/
//	                var url =paramMap.url;
//	                if(url!=null&&url!=undefined&&url!=''){
//	                    url = url.replace(/sangjie/g,'&');
//	                    url = url.replace('WhErE','?');
//	                    send_collect.$data.url = url;
//					}
//					var thumb = paramMap.thumb
//					if(thumb!=null&&thumb!=undefined&&thumb!=''){
//	                    thumb = paramMap.thumb.replace(/sangjie/g,'&');
//	                    thumb = thumb.replace('WhErE','?');
//	                    send_collect.$data.thumb = thumb;
//					}
//	               	var list = send_collect.$data.items;
//					document.getElementById("send_collect").style.display = "block";
//	                document.getElementById("backdrop").style.display = "block";
//	                document.activeElement.blur();
//	                //取消
//					document.getElementById("mui-btn mui-btn-link btn-normal").onclick=function() {
//	                    document.getElementById("send_collect").style.display = "none";
//	                    document.getElementById("backdrop").style.display = "none";
//					}
//	                //发送
//	                document.getElementById("mui-btn mui-btn-link").onclick=function() {
//	                    //获取备注
//	                var note = document.getElementById("note").value;
//	                    //循环给选择的每人发送
//	                    for(var i=0;i<list.length;i++){
//	                        send_collect.sendMessageNew(list[i].toImId,list[i].toAvatarUrl,list[i].toNickName
//	                            ,list[i].chatType,paramMap.types,paramMap.lat,paramMap.lng,paramMap.addr,
//	                            paramMap.msg,paramMap.filename,url,paramMap.lengthSize);
//	                        //如果输入备注则发送
//	                        if(note!=null&&note!=undefined&&note!=''){
//	                            send_collect.sendMessageNew(list[i].toImId,list[i].toAvatarUrl,list[i].toNickName
//	                                ,list[i].chatType,4,'','','',note,'','','');
//	                        }
//						}
//	                    document.getElementById("send_collect").style.display = "none";
//	                    document.getElementById("backdrop").style.display = "none";
//	                    mui.toast("发送成功");
//	                    function st(){
//	                        //发送成功关闭当前转发的页面
//							//广播关闭收藏页面
//	                        window.appApi.broadcast("closeMyCollect()"); //刷新页面
//	                        setTimeout(function () {
//	                            window.appApi.closeNewWindow();
//	                        },200);
//	                    }
//	                    setTimeout(st, 500);
//	
//	                }
//					/*window.appApi.transpondSetData(JSON.parse(jsonStr))*/
//	        	},1500);
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
</style>