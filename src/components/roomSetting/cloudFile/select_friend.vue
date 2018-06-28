<template>
    <div id="app">
        <div id="head_2" class="mui-navbar-inner mui-bar mui-bar-nav" style="display: none;">
            <button id="btn-referrer" class="mui-action-back mui-btn mui-btn-link mui-btn-nav mui-pull-left hide">
                <span class="mui-icon mui-icon-back"></span>取消
            </button>
            <h1 class="mui-center mui-title">选择好友</h1>
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
						<a href="javascript:if(isHideTeamList=='y'){isHideTeamList = 'n';$('#team_list_id').show();}else{isHideTeamList = 'y';$('#team_list_id').hide();}">
							<h5 class="mui-content-padded">团队列表(点击收缩或展开)</h5>
						</a>
						<div id="team_list_id" style="display:block;">
							<div v-for="(item,index) in items" :key="index">
								<ul class="mui-table-view">
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
						</div>
						<h5 class="mui-content-padded">我创建的群组</h5>
						<div id="create_group_list" class="address-list">
							<div class="mui-indexed-list-inner">
								<ul class="mui-table-view">
									<div v-for="(item,index) in createGroup" :key="index">
										<li class="mui-table-view-cell mui-indexed-list-item mui-checkbox">
											<div class="mui-slider-cell">
												<div class="oa-contact-cell mui-table">
													<div class="oa-contact-input mui-table-cell">
														<div v-if="selArr.contains('C' + item.sdkChatId)">
															<input type="checkbox" checked="checked"  onchange="selEvent(this)" data-type="group" :value="'C' + item.sdkChatId" class="member-select"/>
														</div>
														<div v-else>
															<input type="checkbox" onchange="selEvent(this)" data-type="group" :value="'C' + item.sdkChatId" class="member-select"/>
														</div>
													</div>
													<div class="oa-contact-avatar mui-table-cell">
														<div class="group-pic">
															<img src="../../../assets/images/header.jpg">
															<img src="../../../assets/images/header2.jpg">
															<img src="../../../assets/images/header3.jpg">
															<img src="../../../assets/images/header4.jpg">
														</div>
													</div>
													<div class="oa-contact-content mui-table-cell">
														<h4 class="oa-contact-name" v-text="item.groupName"></h4>
														<p class="oa-contact-email" v-text="item.groupMemberNum + '人'"></p>
													</div>
												</div>
											</div>
										</li>
									</div>
								</ul>
							</div>
						</div>
						<h5 class="mui-content-padded">我加入的群组</h5>
						<div id="join_group_list" class="address-list">
							<div class="mui-indexed-list-inner">
								<ul class="mui-table-view">
									<div v-for="(item,index) in joinGroup" :key="index">
										<li class="mui-table-view-cell mui-indexed-list-item mui-checkbox">
											<div class="mui-slider-cell">
												<div class="oa-contact-cell mui-table">
													<div class="oa-contact-input mui-table-cell">
														<div v-if="selArr.contains('C' + item.sdkChatId)">
															<input type="checkbox" checked="checked"  onchange="selEvent(this)" data-type="group" :value="'C' + item.sdkChatId" class="member-select"/>
														</div>
														<div v-else>
															<input type="checkbox" onchange="selEvent(this)" data-type="group" :value="'C' + item.sdkChatId" class="member-select"/>
														</div>
													</div>
													<div class="oa-contact-avatar mui-table-cell">
														<div class="group-pic">
															<img src="../../../assets/images/header.jpg">
															<img src="../../../assets/images/header2.jpg">
															<img src="../../../assets/images/header3.jpg">
															<img src="../../../assets/images/header4.jpg">
														</div>
													</div>
													<div class="oa-contact-content mui-table-cell">
														<h4 class="oa-contact-name" v-text="item.groupName"></h4>
														<p class="oa-contact-email" v-text="item.groupMemberNum + '人'"></p>
													</div>
												</div>
											</div>
										</li>
									</div>
								</ul>
							</div>
						</div>
						<h5 class="mui-content-padded">好友列表</h5>
						<div class=" address-list">
							<!--<div class="mui-indexed-list-search mui-input-row mui-search hide">
								<input type="search" v-model="key" class="" placeholder="搜索">
							</div>-->
							<!--<div class="mui-indexed-list-bar">
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
									<div v-for="(items,index) in friendsList" :key="index">
										<div v-for="(item,index) in items" :key="index">
											<div v-if="item.name">
												<!--<div v-if="item.isp == 1">
													<li :data-group="item.first" class="mui-table-view-divider mui-indexed-list-group" v-text="item.first"></li>
												</div>-->
												<li :data-value="item.first" class="mui-table-view-cell mui-indexed-list-item mui-checkbox">
													<div class="mui-slider-cell">
														<div class="oa-contact-cell mui-table">
															<div class="oa-contact-input mui-table-cell">
																<div v-if="myId == item.userId">
																	<input type="checkbox" checked="checked" disabled="disabled" onchange="selEvent(this)" data-type="user" :value="item.friendsUserId"/>
																</div>
																<div v-else-if="selArr.contains(item.friendsUserId+'')">
																	<input type="checkbox" checked="checked"  onchange="selEvent(this)" data-type="user" :value="item.friendsUserId"/>
																</div>
																<div v-else>
																	<input type="checkbox" onchange="selEvent(this)" data-type="user" :value="item.friendsUserId"/>
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
        <div id="select_children" class="mui-page">
        <div class="mui-navbar-inner mui-bar mui-bar-nav">
            <div class="mui-navbar-inner mui-bar mui-bar-nav">
                <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left">
                    <span class="mui-icon mui-icon-left-nav"></span>返回
                </button>
                <h1 class="mui-center mui-title">组织架构</h1>
                <button class="mui-btn mui-btn-nav mui-btn-primary mui-pull-right mui-disabled ok-btn" onclick="app.trueSelectUser()">完成</button>
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
                            <div v-if="deptList.length > 0">
                                <h5 class="mui-content-padded">子部门列表</h5>
                            </div>
                            <div  v-for="(item,index) in deptList" :key="index">
                                <ul class="mui-table-view group-list">
                                    <li class="mui-table-view-cell mui-checkbox">
                                        <a @click ="clickshow" class="">
                                            <div class="oa-contact-cell mui-table">
                                                <div class="oa-contact-input mui-table-cell">
                                                    <!--<div v-if="selDept.contains(item.deptId +'')">
                                                        <input type="checkbox" checked="checked"  onchange="selEvent(this)" data-type="dept" :value="item.deptId" class="member-select"/>
                                                    </div>
                                                    <div v-else>
                                                        <input type="checkbox" onchange="selEvent(this)" data-type="dept" :value="item.deptId" class="member-select"/>
                                                    </div>-->
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
                            </div>
                            <div v-if="memberList.length > 0">
                                <h5 class="mui-content-padded">部门成员</h5>
                                <div class="address-list">
                                    <div class="">
                                        <ul class="mui-table-view">
                                            <div v-for="(item,index) in memberList" :key="index">
                                                <li class="mui-table-view-cell mui-indexed-list-item mui-checkbox">
                                                    <div class="mui-slider-cell">
                                                        <div class="oa-contact-cell mui-table">
                                                            <div class="oa-contact-input mui-table-cell">
                                                                <div v-if="myId == item.userId">
                                                                    <input type="checkbox" disabled="disabled" onchange="selEvent(this)" data-type="user" :value="item.userId"/>
                                                                </div>
                                                                <div v-else>
                                                                    <input type="checkbox" onchange="selEvent(this)" data-type="user" :value="item.userId"/>
                                                                </div>
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
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
