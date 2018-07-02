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
		<button id="btn-referrer2" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left" onclick="controlUpdate(2);" style="display: none;">
			<span class="mui-icon"></span>取消
		</button>
		<!-- 第一次进入此页面显示-->
		<button id="btn-referrer3" class="mui-action-back mui-btn mui-btn-link mui-btn-nav mui-pull-left" style="display: none;">
			<span class="mui-icon mui-icon-back"></span>取消
		</button>
		<h1 class="mui-center mui-title">选择联系人</h1>
		<button class="mui-btn mui-btn-nav mui-btn-primary mui-pull-right mui-disabled ok-btn" @click="trueSelectUser">发送</button>
	</div>
	<div id="member_div1" class="mui-page-content" style="display: block;">
		<div id="listScroll" class="mui-scroll-wrapper">
			<div class="mui-scroll">
				<section class="mui-content text" id="">
					<div id="tabbar-with-contact" class="mui-control-content address-list mui-active">
						<a @click="showProjectList">
							<h5 class="mui-content-padded" style="margin-top:44px">项目列表(点击收缩或展开)</h5>
						</a>
						<div v-if="select_member.projectListStatus" id="project_list_id" style="display:block;">
							<div v-for="(item,index) in select_member.projects" :key="index">
								<ul class="mui-table-view">
									<li class="mui-table-view-cell mui-collapse" style="    border-bottom: 1px solid #efeff4;">
										 <a @click ="clickProshow(index)" style="border-bottom: 1px solid #ccc;">
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
										<ul class="mui-table-view" :class="{'dis' : select_member.proListshow.indexOf(index) !== -1}">
											<li class="mui-table-view-cell">
												<div class="mui-slider-cell">
													<div class="oa-contact-cell mui-table">
														<div class="oa-contact-avatar mui-table-cell">
															<img src="../../assets/images/ico_second.gif" />
														</div>
														<div class="oa-contact-content mui-table-cell" @click="openChind('select_project',item)">
															<a   :data-project-id="item.serialNum"  :data-project-name="item.ProjectName" class="oa-contact-name"><span class="oa-contact-content mui-table-cell">所有参与人员</span></a>
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
						<div v-if="select_member.teamListStatus" style="display:block;">
							<div v-for="(item,index) in select_member.items" :key="index">
								<ul class="mui-table-view">
									<li class="mui-table-view-cell mui-collapse fold-title">
										<a @click ="clickTeamshow(index)">
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
										<ul class="mui-table-view" :class="{'dis' : select_member.teamListshow.indexOf(index) !== -1}">
											<li class="mui-table-view-cell">
												<div class="mui-slider-cell">
													<div class="oa-contact-cell mui-table">
														<div class="oa-contact-avatar mui-table-cell">
															<img src="../../assets/images/ico_second.gif" />
														</div>
														<div class="oa-contact-content mui-table-cell">
															<a @click="openChind('select_children',item)"  :data-team-id="item.teamId" :data-team-name="item.teamName"  class="oa-contact-name"><span class="oa-contact-content mui-table-cell">组织架构</span></a>
														</div>
													</div>
												</div>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</div>

						<h5 class="mui-content-padded text">好友列表</h5>
                                <div id='list' class="address-list">
                                    <!--<div class="mui-indexed-list-search mui-input-row mui-search hide">
                                        <input type="search" v-model="key" class="" placeholder="搜索">
                                    </div>
                                    <div class="mui-indexed-list-bar">
                                        <div class="align-middle">
                                            <div v-for="items in friendsList">
                                                <div v-for="item in items">
                                                    <div v-if="item.name && item.isp == 1">
                                                        <a v-text="item.first"></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>-->
                                    <div class="mui-indexed-list-alert"></div>
                                    <div class="mui-indexed-list-inner">
                                        <ul class="mui-table-view">
                                            <div v-for="(items,index) in select_member.friendsList" :key="index">
                                                <div v-for="(item,indexone) in items" :key="indexone">
                                                    <div v-if="item.name">
                                                      <li :data-value="item.first" class="mui-table-view-cell mui-indexed-list-item mui-checkbox" @click="selEvent($event,item)"  data-type="user" :value="item.friendsUserId">
													<div class="mui-slider-cell">
														<div class="oa-contact-cell mui-table">
															<div class="oa-contact-input mui-table-cell" style="z-index:0">
																<div v-if="select_member.selectArr.indexOf(item.userId +'')!=-1">
																	<div v-if="myId == item.friendsUserId || thirdUserId == item.friendsUserId">
																		<input  class="friend" type="checkbox" checked="checked" disabled="disabled"  data-type="user" :value="item.friendsUserId"/>
																	</div>
																	<div v-else>
																		<input  class="friend" type="checkbox" checked="checked"  data-type="user" :value="item.friendsUserId"/>
																	</div>
																</div>
																<div v-else>
																	<input class="friend" type="checkbox"  data-type="user" :value="item.friendsUserId"/>
																</div>
															</div>
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
                                            </div>
                                        </ul>
                                    </div>
                                </div>
					</div>
				</section>
			</div>
		</div>
	</div>
</div>
<mt-popup
  v-model="popupTeamVisible"
  position="right" :modal="false">
<div id="select_children" class="mui-page" style="display:none">
	<div class="mui-navbar-inner mui-bar mui-bar-nav">
		<div class="mui-navbar-inner mui-bar mui-bar-nav">
			<button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left" @click="returnback('team')">
				<span class="mui-icon mui-icon-left-nav" ></span>返回
			</button>
			<h1 class="mui-center mui-title">组织架构</h1>
            <button class="mui-btn mui-btn-nav mui-btn-primary mui-pull-right mui-disabled ok-btn" @click="trueSelectUser">发送</button>
		</div>
	</div>
	<div class="mui-page-content">
		<div class="mui-scroll-wrapper">
			<div class="mui-scroll">
				<section class="mui-content">
					<div id="dept_head" class="group-header">
						<div id="select_children_scroll" class="mui-scroll-wrapper member mui-segmented-control mui-segmented-control-inverted">
							<div id="children_scroll" class="mui-scroll">
								<div class="mui-control-item selected teamback1"  @click="firstback('team')">
									联系人&gt;
								</div>
								<div v-for="(obj,index) in select_children.navList" :key="index">
									  
										<div v-if="index == 0 && index == (select_children.navList.length-1)">
											<div class="mui-control-item mui-active enabled" href="javascript:;" v-text="obj.teamName"></div>
										</div>
										<div v-if="index == 0 && index != (select_children.navList.length-1)">
											<div @click="secondback('team',obj,index)" class="mui-control-item selected teamback2" :data-team-id="obj.teamId" :data-team-name="obj.teamName"  v-text="obj.teamName + '&gt;'">{{index}}</div>
										</div>
									
										<div v-if="index > 0">
											<div v-if="index == (select_children.navList.length-1)">
												<div class="mui-control-item mui-active enabled" href="javascript:;" v-text="obj.deptName"></div>
											</div>
											<div v-else>
												<div @click="secondback('team',obj,index)" class="mui-control-item selected teamback2" :data-dept-id="obj.deptId" :data-dept-name="obj.deptName"  v-text="obj.deptName + '&gt;'">{{index}}</div>
											</div>
										</div>
								  </div>
							</div>
						</div>
					</div>
					
					<div class="mui-control-content address-list mui-active">
						<div v-if="select_children.deptList.length > 0">
							<h5 class="mui-content-padded">子部门列表</h5>
						</div>
						<div  v-for="(item,index) in select_children.deptList" :key="index">
							<ul class="mui-table-view group-list">

								<!--以下是单选操作-->
								<!-- <li class="mui-table-view-cell mui-indexed-list-item">
									<a  onchange="selEvent(this)">
										<div class="mui-slider-cell">
											<div class="oa-contact-cell mui-table">
												<div class="oa-contact-content mui-table-cell">
													<h4 class="oa-contact-name" v-text="item.deptName"></h4>
												</div>
											</div>
										</div>
									</a>
								</li> -->
                                <!-- 以下是多选 -->
                                <li class="mui-table-view-cell mui-checkbox" @click="selEvent($event,item)" >
									<a class="">
										<div class="oa-contact-cell mui-table">
											<div class="oa-contact-input mui-table-cell">
												<input type="checkbox"   data-type="dept" :value="item.deptId" class="dept-select friend"/>
											</div>
											<div class="oa-contact-content mui-table-cell">
												<h4 class="oa-contact-name" v-text="item.deptName"></h4>
											</div>
										</div>
									</a>
								</li>
								
								<div class="sub-btn" @click="selectDept(item.deptId,item.deptName,$event)"><span class="mui-icon iconfont icon-sub"></span>下级</div>
							</ul>
						</div>
						<div v-if="select_children.memberList.length > 0">
							<h5 class="mui-content-padded">部门成员</h5>
							<div class="address-list">
								<div class="">
									<ul class="mui-table-view">
										<div v-for="(item,index) in select_children.memberList" :key="index">

											<!--以下是单选-->
											<!-- <li class="mui-table-view-cell mui-indexed-list-item">
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
											</li> -->

                                            <!-- 以下是多选 -->
                                            <li class="mui-table-view-cell mui-indexed-list-item mui-checkbox" @click="selEvent($event,item)">
												<div class="mui-slider-cell">
													<div class="oa-contact-cell mui-table">
														<div class="oa-contact-input mui-table-cell">
															<template v-if="select_member.selectArr.indexOf(item.userId +'')!=-1">
																<template v-if="myId == item.userId || thirdUserId == item.userId">
																	<input class="friend" type="checkbox" checked="checked" disabled="disabled"  data-type="user" :value="item.userId"/>
																</template>
																<template v-else>
																	<input class="friend" type="checkbox" checked="checked"  data-type="user" :value="item.userId"/>
																</template>
															</template>
															<template v-else>
																<input class="friend" type="checkbox"  data-type="user" :value="item.userId"/>
															</template>
														</div>
														<div class="oa-contact-avatar mui-table-cell">
															<img :src="item.userAvatar"/>
														</div>
														<div class="oa-contact-content mui-table-cell">
															<h4 class="oa-contact-name" v-text="item.memberName"></h4>
															<p class="oa-contact-email" v-text="item.phoneNumber"></p>
														</div>
													</div>
												</div>
											</li>
										</div>
									</ul>
								</div>
							</div>
						</div>
						<!-- </mt-popup> -->
					</div>
				</section>
			</div>
			<div v-if="select_children.deptList.length == 0 && select_children.memberList.length == 0">
				<div class="no-group">
					<div class="no-record-img"></div>
					<p>该部门暂无成员</p>
				</div>
			</div>
		</div>
	</div>
</div>
</mt-popup>
<mt-popup
  v-model="popupProVisible"
  position="right" :modal="false">
<div id="select_project" class="mui-page" style="display:none">
	<div class="mui-navbar-inner mui-bar mui-bar-nav">
		<div class="mui-navbar-inner mui-bar mui-bar-nav">
			<button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left" @click="returnback('pro')">
				<span class="mui-icon mui-icon-left-nav" ></span>返回
			</button>
			<h1 class="mui-center mui-title">组织架构</h1>
			<button class="mui-btn mui-btn-nav mui-btn-primary mui-pull-right mui-disabled ok-btn" @click="trueSelectUser">发送</button>
		</div>
	</div>
	<div class="mui-page-content">
		<div class="mui-scroll-wrapper">
			<div class="mui-scroll" id="sc">
				<section class="mui-content">
					<div id="dept_head" class="group-header">
						<div id="select_project_scroll" class="mui-scroll-wrapper member mui-segmented-control mui-segmented-control-inverted">
							<div id="project_scroll" class="mui-scroll">
								<div class="mui-control-item selected proback1" @click="firstback('pro')">
									联系人&gt;
								</div>
								<div  v-for="(obj,index) in select_project.navList" :key="index" class="text-right">
									<div v-if="index == 0 && index == (select_project.navList.length-1)">
										<div class="mui-control-item mui-active enabled" href="javascript:;" v-text="obj.teamName" ></div>
									</div>
									<div v-if="index == 0 && index != (select_project.navList.length-1)">
										<div @click="secondback('pro',obj,index)" class="mui-control-item selected proback2" :data-team-id="obj.teamId" :data-team-name="obj.teamName"  v-text="obj.teamName + '&gt;'"></div>
									</div>

									<div v-if="index > 0">
										
										<div v-if="index == (select_project.navList.length-1)">
											<div class="mui-control-item mui-active enabled" href="javascript:;" v-text="obj.deptName"></div>
										</div>
										<div v-else>
											<div @click="secondback('pro',obj,index)" class="mui-control-item selected proback2" :data-dept-id="obj.deptId" :data-dept-name="obj.deptName"  v-text="obj.deptName + '&gt;'"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					
					<div class="mui-control-content address-list mui-active">
						<div v-if="select_project.selDept.length > 0">
							<h5 class="mui-content-padded">项目联系人</h5>
						</div>
						<ul class="mui-table-view" v-if="select_project.selDept.length > 0">
							<div  v-for="(item,index) in select_project.selDept" :key="index">
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
								<li  @click="openProjectChild" class="mui-table-view-cell mui-collapse" v-if="item.type==1&&item.items.length>0">
									<a class="mui-navigate-right" :class="openProjectChildtrue? 'openProjectChilda':'openProjectChildb'">
										<div class="oa-contact-cell mui-table">
											<div class="oa-contact-avatar mui-table-cell">
												<img :src="item.iconUrl"/>
											</div>
											<div class="oa-contact-content mui-table-cell">
												<h4 class="oa-contact-name" v-text="item.roomClassName"></h4>
											</div>
										</div>
									</a>
									<div class="mui-collapse-content" style="padding-top: 0px;" v-if="openProjectChildtrue" @click="thirdback">
										<ul class="mui-table-view" style="margin-top: 0px;">
											<div v-for="(it,i) in item.items" :key="i">
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
						<mt-popup
					v-model="popupProVisible3"
					position="right" :modal="false">
						<div v-if="select_project.memberList.length > 0">
							<div id="dept_head" class="group-header">
						<div id="select_project_scroll" class="mui-scroll-wrapper member mui-segmented-control mui-segmented-control-inverted">
							<div id="project_scroll" class="mui-scroll">
								<div class="mui-control-item selected proback1" @click="firstback('pro')">
									联系人&gt;
								</div>
								<div  v-for="(obj,index) in select_project.navList" :key="index" class="text-right">
									<div v-if="index == 0 && index == (select_project.navList.length-1)">
										<div class="mui-control-item mui-active enabled" href="javascript:;" v-text="obj.teamName"></div>
									</div>
									<div v-if="index == 0 && index != (select_project.navList.length-1)">
										<div @click="secondback('pro',obj,index)" class="mui-control-item selected proback2" :data-team-id="obj.teamId" :data-team-name="obj.teamName"  v-text="obj.teamName + '&gt;'"></div>
									</div>
									<div v-if="index > 0">
										<div v-if="index == (select_project.navList.length-1)">
											<div class="mui-control-item mui-active enabled" href="javascript:;" v-text="obj.deptName"></div>
										</div>
										<div v-else>
											<div @click="secondback('pro',obj,index)" class="mui-control-item selected proback2" :data-dept-id="obj.deptId" :data-dept-name="obj.deptName"  v-text="obj.deptName + '&gt;'"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
							<h5 class="mui-content-padded">部门成员</h5>
							
							<div class="address-list">
								<div class="">
									<ul class="mui-table-view">
										<div v-for="(item,index) in select_project.memberList" :key="index">

											<!--以下是单选-->
											<!-- <li class="mui-table-view-cell mui-indexed-list-item">
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
											</li> -->
                                            <!-- 以下是多选 -->
                                            <li class="mui-table-view-cell mui-indexed-list-item mui-checkbox" @click="selEvent($event,item)" >
												<div class="mui-slider-cell">
													<div class="oa-contact-cell mui-table">
														<div class="oa-contact-input mui-table-cell">
															<div v-if="select_member.selectArr.indexOf(item.userId +'')!=-1">
																<div v-if="myId == item.userId || thirdUserId == item.userId">
																	<input class="friend" type="checkbox" checked="checked" disabled="disabled"  data-type="user" :value="item.userId"/>
																</div>
																<div v-else>
																	<input class="friend" type="checkbox" checked="checked"  data-type="user" :value="item.userId"/>
																</div>
															</div>
															<div v-else>
																<input class="friend" type="checkbox"  data-type="user" :value="item.userId"/>
															</div>
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

											
										</div>
									</ul>
								</div>
							</div>
						</div>
						</mt-popup>
					</div>
				</section>
			</div>
			
		</div>
	</div>
</div>
</mt-popup>
<!--遮罩层-->
<div id="backdrop" class="mui-backdrop" style="display:none ;"></div>

<!--长按收藏弹框-->
<div id="member_div2" style="display: none;">
		<ul class="mui-table-view eg-table-view eg-detail-list">
			<li class="mui-table-view-cell mui-input-row">
				<label>群名称</label>
				<input id="group_name_id" type="text" v-model="select_member.groupName" />
			</li>
			<li class="member-box box-border">
				<div class="member-header mui-table-view-cell">
					<div class="mui-navigate-right">群成员<span class="mui-badge mui-badge-inverted" v-text="select_member.selectNumStr"></span></div>
				</div>
				<div id="member_image_id" class="member-list">
                    <!-- <img src="../../images/ico_add.png"> -->
					<div class="mui-table-cell"><div onclick="javascript:controlUpdate(1);"></div></div>
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
  
</template>

<script>
import { Popup } from 'mint-ui';

import setting from '../../playform/config.js'
import tipApi from '../../playform/tipApi.js'
import {getParam,BackCookie} from '../../playform/common'
var paramMap;
var historyArr = new Array();
var selectDept = new Array();
var selectArr = new Array();
var userId=null;
var proCount=1;
var teamCount=1;
var selectUserIds;//选中的userIds
export default {
  data () {
    return {
		// modal:false,
		popupProVisible:false,
		popupProVisible3:false,
		popupTeamVisible:false,
		popupTeamVisible3:false,
		openProjectChildtrue:false,
		thirdbackVisible:false,
        cunt:0,
        thirdUserId:"",
        myId:"",

	select_member:{
		
		items:[],
		friendsList:[],
		key:"",
		selArr:[],
		selDept:[],
		selectNumStr:"",
		groupName:"",
		projects:[],
		projectListStatus:true,
        teamListStatus:true,
        isCurrentUser:false,
		proListshow:[],
        teamListshow:[],
        selectArr:[],
        
	},
	select_children:{
		deptList:[],
		memberList:[],
		navList:[],
		selArr:[],
		selDept:[],
        test:[],
        
	  },
	invite_user:{
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
		selDept:[],
		test:[],
	 } ,
    }
  },
  created: function () {
    var _self = this;
    userId=setting.getCookie("userid");
    paramMap=getParam(window.location.href)
        _self.thirdUserId=paramMap.userId;
        _self.myId=userId
		_self.$http.post("/chart/column/table_swprojectinfo?used=getPro",{}).then(function (response) {
        //  console.log("数据1",response.data.result)
            _self.$data.select_member.projects = response.data.result;
        }).catch(function (error) {
            console.info(error);
        });
        setTimeout(function(){
            _self.$http.post("/concats_api/find_team_list",{}).then(function (response) {
            _self.$data.select_member.items = response.data.result;
            // console.log("数据2",response.data.result)
                }).catch(function (error) {
				console.info(error);
			});
        },200);
		var param = new FormData();
		param.append("userId", "");
		setTimeout(function(){
		    	_self.$http.post("/concats_api/find_eg_list", param).then(function (response) {
				_self.$data.select_member.friendsList = _self.convertData(response.data.result);
				// console.log("好友列表",_self.$data.select_member.friendsList)
			}).catch(function (error) {
				console.info(error);
			});
        },400);

       
  },
  mounted:function(){
   this.init();
  },
  methods:{
     
     init:function () {
         var _self=this;
        // alert("用户ID"+userId)
        _self.selectInArr(true,userId);
        if(_self.thirdUserId!=undefined&&_self.thirdUserId!=null){
            //如果是单聊点进来的就把单聊人也加进来
           _self.selectInArr(true,_self.thirdUserId);
        }else{
           _self.thirdUserId = "";
        }

    },
     selEvent:function(e,item) {
     var _self=this;   
     var obj=e.currentTarget.getElementsByClassName("friend")
     if(obj==null){
          alert("数据有误！")
         return
     }
   
    var target=obj[0];
    console.log("target",target)
    var type = target.getAttribute("data-type");
	var value = target.value;
	var phone=target.getAttribute("phone");
	var ucon=target.getAttribute("ucon");
    var name=target.name;
    if(value!=userId){
        obj[0].checked=!obj[0].checked
    }
	if(type == "user"){
		console.log(target.name)
		_self.selectInArr(target.checked,value,phone,name,ucon);
	}else{
       
		  var par = {deptId:value};
		  _self.$http.post("/concats_api/query_team_members",par).then(function (response) {
			var memberList = response.data.result;
			console.log("成员",memberList)
			for(var i= 0;i<memberList.length;i++){
				_self.selectInArr(target.checked,memberList[i].userId,memberList[i].phoneNumber,memberList[i].memberName,memberList[i].userAvatar);
			}
		}).catch(function (error) {
			console.info(error);
        });
		if(target.checked){
			if(selectDept.indexOf(value)==-1){
				selectDept.push(value);
			}
		}else{
			 remove(selectDept,value);
		}
		_self.select_children.selDept = selectDept;
		_self.select_member.selDept = selectDept;
	    }
    },

  
        trueSelectUser: function () {
            var _self=this;


            if(_self.select_member.selectArr.length<1){
                return;
            }
			var ary=_self.select_member.selectArr;
            var userIds="";
            //需要移除当前登陆用户
            if(ary.length>0){
                for(var i=0;i<ary.length;i++){
                    if(ary[i]!=userId){
                        if(i==ary.length-1){
                            userIds+=ary[i]
                        }else{
                             userIds+=ary[i]+","
                        }
                    }
                }
            }
            
            console.log("当前发送的人员",userIds)
            return 

            if(selectType==3){//发送名片
                var jsonStr = "";
                var jsonStrs = [];
				jsonStrs.push("[")
                var l = tipApi.load("加载中...");
                for(var i=0;i<selectArr.length;i++){
                    var cardUserId = selectArr[i];
                    var url;
                    var phone;//名片手机号
                    var nickName;//名片昵称
                    var avatarUrl;//名片头像地址
                    var param = new FormData();
                    param.append("userId", cardUserId);//根据名片userId查询名片名称、头像、手机号
                    axios.post(getUrl()+"/concats_api/query_contacts_info", param).then(function (response){
                        var data = response.data.result.contactsInfoVO;
                        nickName = data.nickName;
                        avatarUrl = data.userAvatar;
                        phone = data.cellPhone;
                        url=getUrl()+"/static/webstatic/contacts/eg_details.html?userId="+data.userId;//名片地址
                        //var jsonStr = {phone:phone,nickName:nickName,avatarUrl:avatarUrl,url:url,toImId:imId,toAvatarUrl:headerImage,toNickName:rName,chatType:chatType};
//                      jsonStr = jsonStr+'{"phone":"'+phone+'","nickName":"'+nickName+'","avatarUrl":"'+avatarUrl+'","url":"'+url+'"}'+',';
                        jsonStrs.push('{"phone":"'+phone+'","nickName":"'+nickName+'","avatarUrl":"'+avatarUrl+'","url":"'+url+'"},');
                    }).catch(function (error) {
                    	layer.close(l)
                        console.info(error);
                    });
                }
                setTimeout(function () {
                    layer.close(l)
                    var jsonStr = jsonStrs.join('');
//          		alert(jsonStr.substring(0,jsonStr.length-1)+"]")
					jsonStr = jsonStr.substring(0,jsonStr.length-1)+"]";
//					alert(JSON.parse(jsonStr))
// 					console.log(jsonStr)
                    window.appApi.sendCardSetData(JSON.parse(jsonStr));
                },1500);
            }else if(selectType==2){//项目部门人员设置(此功能应该已不用)
                appApi.showBack();//显示返回按钮

                this.selectNumStr = selectArr.length+"人";

                var selectUserIdsEvy = "";
                for(var i=0;i<selectArr.length;i++){
                    if(i==selectArr.length-1){
                        selectUserIdsEvy+=selectArr[i];
                    }else{
                        selectUserIdsEvy+=selectArr[i]+",";
                    }
                }

                window.parent.userIds = selectUserIdsEvy;//给父页面对象赋值
                selectUserIds = selectUserIdsEvy;
                var param = {userIds:selectUserIds};//查询头像list返回
                var _self = this;
                axios.post(getUrl()+"/concats_api/query_gms_info_select",param).then(function (response) {
                    var reps = response.data.result;
                    _self.$data.none = reps;
                    var mList = reps.groupMemberTempVOList;
                    var userNames = "";
                    for(var i=0;i<mList.length;i++){
                        if(i==mList.length-1){
                            userNames+=mList[i].nickName;
                        }else{
                            userNames+=mList[i].nickName+" ";
                        }
                    }
                    window.parent.document.getElementById("userNames").innerText=userNames;//给父页面对象赋值

                    console.info(response.data.result);
                    parent.closeWindow(module_id);//关闭iframe
                }).catch(function (error) {
                    console.info(error);
                });

                viewApi.back();//关闭选择子部门div
            }

        },

       selectInArr:function(bool,val) {
           
        var _self=this;
        val = val + "";
        if(bool){
          
        if(_self.select_member.selectArr.indexOf(val)==-1){
        _self.select_member.selectArr.push(val);
            
          }
            
        }else{
            if(userId != val){ //自己不能删除
            remove(_self.select_member.selectArr,val);
            }
        }
        console.log("当前值",_self.select_member.selectArr)
        var lastary=_self.select_member.selectArr;
        //remove(lastary,userId)
        var count = lastary.length;
        if(count>=1 && lastary.indexOf(userId)!=-1){
            count--;
        }
        var text = count ? "发送(" + count + ")" : "发送";
        console.log($(".ok-btn"))
        var btn = $(".ok-btn");
        btn.text(text);
        if (count>0) {
            if (btn.hasClass("mui-disabled")) {
                btn.removeClass("mui-disabled");
            }
        } else {
            if (!btn.hasClass("mui-disabled")) {
                btn.addClass("mui-disabled");
            }
        }
        _self.select_member.selArr =  _self.select_member.selectArr;
    },
	 
	  thirdback:function(){
		   if(!this.popupProVisible3){
			   this.popupProVisible3=true
		   }
	  },
	  firstback:function(type){
		  if(type=='pro'){
		    this.popupProVisible=!this.popupProVisible
			$("#select_project").show()
		  }else if(type=='team'){
			   this.popupTeamVisible=!this.popupTeamVisible
			   $("#select_children").show()
		  }
		  this.backFun()
	
	  },
	    returnback:function(type){//点击返回按钮返回
		  if(type=='pro'){
			  this.proback();
		  }else if(type=='team'){
			  this.teamback();
		  }
		
	
	  },
	  proback:function(){
		   if(proCount==2){//如果当前是第二层，返回第一层
				document.getElementsByClassName("proback1")[0].click()
				proCount=1;
			  }else{
				document.getElementsByClassName("proback2")[0].click()
				proCount=2;
			  }
	  },
	  teamback:function(){
			historyArr.pop();
			var obj = historyArr[historyArr.length-1];
			if(obj){//一级一级往上返回
				this.initChildDept(obj.teamId,obj.deptId,obj.deptName);
				this.popupTeamVisible=true;
				$("#select_children").show();
			}else{//直接返回首页
				 this.popupTeamVisible=!this.popupTeamVisible
			    $("#select_children").show()
			}
	    },
	  secondback:function(type,team,index){//选择导航进行跳转对应页面
		  
		  if(type=='pro'){
  			this.select_project.selDept=this.select_project.test;
			this.popupProVisible=true;
			this.popupProVisible3=false;
			historyArr.pop();
			proCount=2;
			$("#select_project").show()
		  }else if(type=='team'){
			
			if(team.teamId){//第二层 
			    historyArr.splice(1,historyArr.length)
			
			}else{//第二层往后
				var index = this.getIndex(team.deptId);
				historyArr.splice(index+1,historyArr.length)
			}
				this.initChildDept(team.teamId,team.deptId,team.deptName);
				this.popupTeamVisible=true;
				$("#select_children").show();
			
		  }
		
	  },
	  getIndex:function(deptId){
		  var index
            for(var i=0;i<historyArr.length;i++){
				if(deptId==historyArr[i].deptId){
					index=i
					break;
				}
			}
			return index;
	  },
	  openProjectChild:function(){
		  this.openProjectChildtrue=!this.openProjectChildtrue
	  },
	  openChind:function(type,item){
		    var _self=this
			if(type== "select_project"){
					var obj = {teamId:item.serialNum,teamName:item.ProjectName,type:1}
					_self.getProjectMembers(obj.teamId, obj.teamName);
					 appApi.hideBack();
					_self.popupProVisible=!_self.popupProVisible;
					_self.popupProVisible3=false;
					$("#select_project").show();
					proCount=2;
					
				}
			else if (type == "select_children") {
				
				   _self.popupTeamVisible=!_self.popupTeamVisible
					var obj = {teamId:item.teamId,teamName:item.teamName,deptId:item.deptId,deptName:item.deptName,type:2}
					var teamId=item.teamId;
					historyArr.push(obj);
					 _self.select_children.navList = historyArr;
					_self.initChildDept(obj.teamId, obj.deptId, obj.deptName);//type2表示时团队，1表示时项目
					$("#select_children").show()
					appApi.hideBack();
				
				};
	 		 },
	
			backFun:function () {
			
				historyArr = new Array();
			},
	
	   initChildDept:function(teamId,deptId,deptName) {
		   var _self = this;
		if(undefined == teamId){
			teamId = 0;
		}
		if(undefined == deptId){
			deptId = 0;
		}
		//清除原有选中
		_self.select_children.selDept = selectDept;
		_self.select_member.selDept = selectDept;
		var par = {deptId:deptId,teamId:teamId};
		this.$http.post("/concats_api/query_dept_list",par).then(function (response) {
			_self.select_children.deptList = response.data.result;
		
			setTimeout(function () {
               // console.log("selectDept",selectDept)
                
				$(".dept-select").each(function(){
                    var id = $(this).val();
					if(selectDept.indexOf(id)!=-1){
						$(this)[0].checked=true;
					}else{
						$(this)[0].checked=false;
					}
				});
		
			},100)
			
		}).catch(function (error) {
			console.info(error);
		});
		if(deptId!=0){
			par = {deptId:deptId};
		}else{
			par = {teamId:teamId};
		}
		this.$http.post("/concats_api/query_team_members",par).then(function (response) {
			_self.select_children.memberList = response.data.result;
		}).catch(function (error) {
			console.info(error);
		});
	

	},
	selectDept:function (deptId,deptName,event) {
           
			var obj = {teamId:undefined,deptId:deptId,deptName:deptName,type:2};//type2表示时团队，1表示时项目
			//i=0为联系人页面
			var flag = false;
			var nArr = new Array();
			for(var i=0;i<historyArr.length;i++){
				nArr.push(historyArr[i]);
				if(undefined != deptId && deptId == historyArr[i].deptId){
					flag = true;
					break;
				}

			}
			if(!flag){
				nArr.push(obj);
			}
			historyArr = nArr;
			var _self = this;
			_self.select_children.navList = historyArr;
			
			_self.initChildDept(undefined,deptId,deptName);
			if(event){
				event.preventDefault();
			   event.stopPropagation();
			}
            
           

		},
	  /**
		 * 获取房间数据
		 * @param {Object} leave1 第一层
		 * @param {Object} leave2 第二层 当只有第一层时为-1
		 */
		getRoomMembers:function(leave1,leave2,className){
			
			this.popupProVisible3=true
			var obj = {teamId:undefined,deptId:undefined,deptName:className,type:1};//type2表示时团队，1表示时项目
			//i=0为联系人页面
			
			var _self = this;
			var lengths = historyArr.length-1;
			if (lengths>0) {
				for(var i=0 ; i<lengths;i++){
					historyArr.pop();
				}
			}
			historyArr.push(obj)
			_self.select_project.navList = historyArr;
			var deptList = _self.select_project.deptList;
			
			_self.select_project.selDept = [];
			if (leave2==-1) {
				_self.select_project.memberList = deptList[leave1].roomMembers.items;
			}else{
				_self.select_project.memberList = deptList[leave1].items[leave2].roomMembers.items;
			}
			console.log("联系人",_self.select_project.memberList.length)
			//解决上拉太多点击后回不到顶部问题
			document.getElementById("sc").style.transform="translate3d(0px, 0px, 0px) translateZ(0px)";
			proCount=3;

		},
	  getProjectMembers:function(projectSN,projectName){
		 
			var _self = this;
			_self.select_project.memberList = [];
			var obj = {teamId:projectSN,teamName:projectName,type:1};
			var lengths = historyArr.length;
			if (lengths>0) {
				for(var i=0 ; i<lengths;i++){
					historyArr.pop();
				}
			}
			historyArr.push(obj)
			_self.select_project.navList = historyArr;
			document.getElementById("sc").style.transform="translate3d(0px, 0px, 0px) translateZ(0px)";
			$.ajax({
	            type: "post",
	            url: "/api/pcontact_api/findallroomlist",
	            data: {
	                "projectSn":projectSN,
	                "flag":2,//1: 包涵会议室、招聘室 2 不包含会议室和招聘室
	                "isQueryMember":1//isQueryMember 是否返回成员信息  1：返回  2：不返回
	            },
	            datatype: "json",
	            success: function(data) {
	            	console.log(data)
	            	if(data.code==0){
	            		_self.select_project.deptList = data.result.roomItems;
	            		_self.select_project.selDept = data.result.roomItems;
	            		_self.select_project.test = data.result.roomItems;
					}
					console.log("部门",_self.select_project.selDept)

	            },
	            error:function(error){
	            	
	            }
	        });
		},
 	selectUser:function(item,type) {
		 var _self=this;
		 console.log(type,item)
		if(type=='project'){
			_self.invite_user.name=item.nickName;
			_self.invite_user.phone=item.cellPhone;
			_self.invite_user.ucon=item.userIcon;
			_self.invite_user.userId=item.userId;
		}else if(type=='team'){
			_self.invite_user.name=item.memberName;
			_self.invite_user.phone=item.phoneNumber;
			_self.invite_user.ucon=item.userAvatar;
			_self.invite_user.userId=item.userId;
		}else if(type=='friends'){
			_self.invite_user.name=item.name;
			_self.invite_user.phone=item.phone;
			_self.invite_user.ucon=item.headerImage;
			_self.invite_user.userId=item.friendsUserId;
		}
		

	if(_self.invite_user.userId==userId){
		alert("不能邀请自己")
		return
	}


},
    showProjectList:function(){
      this.select_member.projectListStatus=!this.select_member.projectListStatus
    },
    showTeamList:function(){
      this.select_member.teamListStatus=!this.select_member.teamListStatus
    },
    getImageUrl: function (val) {
			if(val==null || val=="") return getUrl()+"/static/images/60x60.gif";
			return val;
		},
	clickProshow: function (index) {
	
		const newIndex = this.select_member.proListshow.indexOf(index);
			if (newIndex === -1) {
				this.select_member.proListshow.push(index);
			} else {
				this.select_member.proListshow.splice(newIndex);
			}
	},
	clickTeamshow: function (index) {
	
		const newIndex = this.select_member.teamListshow.indexOf(index);
			if (newIndex === -1) {
				this.select_member.teamListshow.push(index);
			} else {
				this.select_member.teamListshow.splice(newIndex);
			}
	},
		updated:function () {//DOM更新时，进行调用的方法
			document.getElementById("list").style.display = "block";
			// mui.ready(function () {
			// 	window.indexedList = new mui.IndexedList(list)
			// });
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

window.remove = function(ary,val) { 
var index = ary.indexOf(val); 
if (index > -1) { 
ary.splice(index, 1); 
} 
};


</script>

<style scoped>



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
	.mui-page{
		display: inline;
		top:44px;
		/* height:auto; */
	}
	.mui-content-padded{
		text-align: left
	}
  .mui-segmented-control.mui-scroll-wrapper {
    height: 40px;
    border-bottom: 0;
		}
	.text-right{
		float: right;
	}	
	.mui-table-view-cell.mui-collapse .mui-collapse-content{
		display: block
	}
	.mui-table-view-cell.mui-collapse .mui-collapse-content .mui-table-view{
		display: block
	}
	.openProjectChilda{
		background: #eee
	}
	.openProjectChildb{
		background: #fff
	}
	.mint-popup {
		width:100%;
		height:100%;	
	}
	.text-right,.selected{
		float: left;
	}
	.mui-table-view-cell:after{
		height:1px
	}
	/* #select_children_scroll div{
		float:left
	} */
	.oa-contact-email{
		text-align: left
	}
	.mui-popup{
		z-index:9999
	}
	.mui-backdrop{
		z-index:9998
	}
	.group-list .sub-btn{
		top:4px
	}
	#dept_head{
		width: 100%;
    overflow: hidden;
    position: relative;
	}
	#select_children_scroll{
		width: 100%;
    overflow: hidden;
    position: relative;
	}
	#children_scroll{
		left: 0;
    position: absolute;
    width: auto;
    overflow: scroll;
	}
	/* 	children_scroll */
	#select_children_scroll div{
		display: inline-block
	}
	.group-header {
    color: #999;
    line-height: 34px;
    padding:0px;
    background-color: #fff;
    margin-bottom: 10px;
}
</style>

